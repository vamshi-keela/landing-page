import { useEffect } from "react";

/**
 * Section-aware scroll-velocity damper (touch devices only).
 *
 * Problem: On iOS, momentum scrolling flings through hundreds of vh
 * in one gesture, skipping sticky sections entirely.
 *
 * iOS-specific challenges addressed:
 *
 * 1. `window.scrollTo({ behavior: "smooth" })` is unreliable during
 *    momentum — iOS Safari often ignores it or lets the momentum
 *    overwrite it immediately. Fix: use a manual rAF-based eased
 *    animation with `behavior: "instant"` per frame.
 *
 * 2. Scroll events fire at irregular intervals on iOS (batched by the
 *    compositor), making scroll-event-based velocity wildly inaccurate.
 *    Fix: measure velocity from `touchstart` / `touchmove` / `touchend`
 *    directly, and only decide whether to snap at `touchend`.
 *
 * 3. Interfering with iOS rubber-banding causes visual glitches.
 *    Fix: never call scrollTo during an active touch; only after
 *    `touchend` once the finger lifts.
 *
 * On desktop (non-touch, ≥1024px) this hook does nothing.
 */

/** Must match StickySection.tsx / useScrollScaleFade.ts */
const SECTION_SPAN_VH = 1.8;
const NUM_SECTIONS = 3;

/** Touch velocity (px/s) above which we treat a scroll as a momentum fling. */
const VELOCITY_THRESHOLD = 1800;

/** Duration of the manual snap animation (ms). */
const SNAP_DURATION_MS = 500;

/**
 * How long (ms) to ignore new snaps after one fires,
 * letting the animation finish undisturbed.
 */
const SNAP_COOLDOWN_MS = 600;

/** Simple ease-out cubic for the snap animation. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useScrollDamper() {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;

    if (!isTouchDevice && !isSmallScreen) return;

    const computeSnapPoints = (): number[] => {
      const vh = window.innerHeight;
      return Array.from({ length: NUM_SECTIONS }, (_, i) =>
        (1 + i * SECTION_SPAN_VH) * vh
      );
    };

    let snapPoints = computeSnapPoints();
    let inCooldown = false;
    let cooldownTimer: ReturnType<typeof setTimeout>;
    let activeRafId: number | null = null;

    // Touch tracking state
    let touchStartY = 0;
    let touchStartTime = 0;
    let lastTouchY = 0;
    let lastTouchTime = 0;
    let isTouching = false;

    const onResize = () => {
      snapPoints = computeSnapPoints();
    };

    /**
     * Animate to `target` using a manual rAF loop with easing.
     *
     * Why not `behavior: "smooth"`?
     * iOS Safari's programmatic smooth scroll is routinely overridden
     * by active momentum scrolling. Using per-frame `behavior: "instant"`
     * jumps gives us full control and works reliably on all platforms.
     */
    const animateSnap = (target: number) => {
      // Cancel any in-flight animation
      if (activeRafId !== null) {
        cancelAnimationFrame(activeRafId);
        activeRafId = null;
      }

      const startY = window.scrollY;
      const distance = target - startY;
      if (Math.abs(distance) < 2) return; // already there

      const startTime = performance.now();

      inCooldown = true;
      clearTimeout(cooldownTimer);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / SNAP_DURATION_MS, 1);
        const eased = easeOutCubic(progress);

        window.scrollTo({ top: startY + distance * eased, behavior: "instant" as ScrollBehavior });

        if (progress < 1) {
          activeRafId = requestAnimationFrame(step);
        } else {
          activeRafId = null;
          // End cooldown slightly after animation to absorb trailing events
          cooldownTimer = setTimeout(() => {
            inCooldown = false;
          }, SNAP_COOLDOWN_MS - SNAP_DURATION_MS);
        }
      };

      activeRafId = requestAnimationFrame(step);
    };

    /**
     * Find the snap target when a fast fling is detected.
     * Returns the snap point to animate to, or null if no snap is needed.
     */
    const findSnapTarget = (
      scrollY: number,
      velocity: number,
      goingUp: boolean
    ): number | null => {
      // Check highest → lowest when going up; lowest → highest going down
      const ordered = goingUp ? [...snapPoints].reverse() : snapPoints;

      for (const sp of ordered) {
        if (goingUp) {
          // Snap to the nearest section-start that's ABOVE current position
          if (scrollY <= sp + window.innerHeight * 0.3 && scrollY > sp - window.innerHeight * 0.3) {
            return sp;
          }
        } else {
          // Snap to the nearest section-start that's BELOW or near current position
          if (scrollY >= sp - window.innerHeight * 0.5 && scrollY < sp + window.innerHeight * 0.3) {
            return sp;
          }
        }
      }

      // Fallback: find the closest snap point in the direction of travel
      let best: number | null = null;
      let bestDist = Infinity;
      for (const sp of snapPoints) {
        const dist = goingUp ? scrollY - sp : sp - scrollY;
        if (dist > 0 && dist < bestDist) {
          bestDist = dist;
          best = sp;
        }
      }

      return best;
    };

    const onTouchStart = (e: TouchEvent) => {
      // Cancel any running snap animation when user touches
      if (activeRafId !== null) {
        cancelAnimationFrame(activeRafId);
        activeRafId = null;
        inCooldown = false;
        clearTimeout(cooldownTimer);
      }

      isTouching = true;
      const touch = e.touches[0];
      touchStartY = touch.clientY;
      touchStartTime = performance.now();
      lastTouchY = touch.clientY;
      lastTouchTime = touchStartTime;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      const touch = e.touches[0];
      lastTouchY = touch.clientY;
      lastTouchTime = performance.now();
    };

    const onTouchEnd = () => {
      if (!isTouching) return;
      isTouching = false;

      if (inCooldown) return;

      const now = performance.now();
      const dt = now - lastTouchTime;

      // Use the overall gesture if the last touchmove was too old
      const effectiveDt = dt < 100 ? now - lastTouchTime : now - touchStartTime;
      const effectiveDy = dt < 100
        ? touchStartY - lastTouchY  // positive = finger moved up = scrolling down
        : touchStartY - lastTouchY;

      if (effectiveDt <= 0) return;

      const velocity = (Math.abs(effectiveDy) / effectiveDt) * 1000; // px/s
      if (velocity < VELOCITY_THRESHOLD) return;

      const goingDown = effectiveDy > 0;

      // Use a small delay to let momentum start, then check position
      // This allows us to snap based on where momentum is actually heading
      setTimeout(() => {
        if (inCooldown) return;

        const currentY = window.scrollY;
        const target = findSnapTarget(currentY, velocity, !goingDown);

        if (target !== null && Math.abs(target - currentY) > 10) {
          animateSnap(target);
        }
      }, 80);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (activeRafId !== null) cancelAnimationFrame(activeRafId);
      clearTimeout(cooldownTimer);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
