import { useEffect } from "react";

/**
 * Section-aware scroll-velocity damper (touch / small-screen only).
 *
 * Problem: On touch devices, momentum scrolling can fling through
 * hundreds of vh in one gesture, skipping sticky sections entirely.
 * Going back UP is especially bad — sections never reach scale:1
 * (their "starting point") before the user moves to the previous one.
 *
 * Approach:
 * Track signed scroll velocity. When a fast fling crosses a section
 * start snap point, interrupt the browser's momentum scroll and
 * smooth-scroll back to that snap point. A short cooldown prevents
 * re-triggering while the programmatic scroll is still running.
 *
 * This handles BOTH directions:
 *   - Scrolling DOWN fast: stops at the first section it enters.
 *   - Scrolling UP fast: stops at the highest section start it just
 *     crossed, so each component reaches scale:1 before leaving.
 *
 * On desktop (non-touch, ≥1024px) this hook does nothing — the
 * SPACER_VH in StickySection provides enough dwell time for mouse
 * or trackpad users.
 */

/** Must match StickySection.tsx / useScrollScaleFade.ts */
const SECTION_SPAN_VH = 1.8;
const NUM_SECTIONS = 3;

/** Pixels/second above which we treat a scroll as a momentum fling. */
const VELOCITY_THRESHOLD = 2500;

/**
 * Milliseconds to ignore new scroll events after we fire a programmatic
 * snap, so our own smooth-scroll doesn't re-trigger the logic.
 */
const SNAP_COOLDOWN_MS = 700;

export function useScrollDamper() {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;

    // Only activate on touch or small screens
    if (!isTouchDevice && !isSmallScreen) return;

    // Precompute snap points: the scroll-Y where each sticky section
    // first pins (i.e. where its component is at full scale:1).
    const computeSnapPoints = (): number[] => {
      const vh = window.innerHeight;
      return Array.from({ length: NUM_SECTIONS }, (_, i) =>
        (1 + i * SECTION_SPAN_VH) * vh
      );
    };

    let snapPoints = computeSnapPoints();
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let snapTimer: ReturnType<typeof setTimeout>;
    let cooldownTimer: ReturnType<typeof setTimeout>;
    let inCooldown = false;

    const onResize = () => {
      snapPoints = computeSnapPoints();
    };

    /**
     * Interrupt browser momentum then smooth-scroll to `target`.
     * Calling scrollTo(x,y) (non-smooth) is the standard technique
     * for stopping iOS/Android momentum before a programmatic scroll.
     */
    const doSnap = (target: number) => {
      inCooldown = true;
      clearTimeout(cooldownTimer);
      // Stop momentum at current position
      window.scrollTo(0, window.scrollY);
      // One rAF so the browser processes the stop before we re-scroll
      requestAnimationFrame(() => {
        window.scrollTo({ top: target, behavior: "smooth" });
      });
      cooldownTimer = setTimeout(() => {
        inCooldown = false;
      }, SNAP_COOLDOWN_MS);
    };

    const onScroll = () => {
      // Don't re-trigger while our own smooth-scroll is running
      if (inCooldown) return;

      const now = performance.now();
      const dt = now - lastTime;
      const currentY = window.scrollY;
      const signedDy = currentY - lastY;

      const prevY = lastY;
      lastY = currentY;
      lastTime = now;

      if (dt <= 0) return;

      const velocity = (Math.abs(signedDy) / dt) * 1000; // px/s
      if (velocity < VELOCITY_THRESHOLD) return;

      const goingUp = signedDy < 0;
      clearTimeout(snapTimer);

      // When going UP, check snap points from highest → lowest so we
      // always stop at the topmost one we just flew through.
      // When going DOWN, check lowest → highest for the same reason.
      const ordered = goingUp ? [...snapPoints].reverse() : snapPoints;
      let crossedSnap: number | null = null;

      for (const sp of ordered) {
        const justCrossed = goingUp
          ? prevY >= sp && currentY < sp // flew upward past sp
          : prevY <= sp && currentY > sp; // flew downward past sp

        if (justCrossed) {
          crossedSnap = sp;
          break; // Only handle the first crossing per scroll event
        }
      }

      if (crossedSnap !== null) {
        const target = crossedSnap;
        // Short delay so the current scroll event cycle finishes first
        snapTimer = setTimeout(() => doSnap(target), 30);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      clearTimeout(snapTimer);
      clearTimeout(cooldownTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
