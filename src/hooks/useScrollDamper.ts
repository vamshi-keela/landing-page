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
 * Track signed scroll velocity. When a fast fling FIRST crosses a
 * section-start snap point, immediately interrupt the browser's
 * momentum and smooth-scroll to that point.
 *
 * Critical design constraints that informed every decision:
 *
 * 1. NO snapTimer / clearTimeout retry loop.
 *    During a fast fling, scroll events fire every 5–16 ms. If we
 *    use a delayed timer and cancel it on each new event, the snap
 *    for crossing section-2 gets cancelled by the event that crosses
 *    section-1, which itself gets cancelled — net result: nothing
 *    fires and the user flies past all sections to Hero.
 *    Fix: call doSnap() immediately on the FIRST crossing, then
 *    enter a cooldown so subsequent events are ignored.
 *
 * 2. Strict `prevY > sp` (not >=) for upward crossings.
 *    After snapping to exactly sp=2520, the next fling starts with
 *    prevY === 2520. The condition `prevY >= sp` would be true again,
 *    causing us to snap back to 2520 indefinitely.
 *    Fix: strict greater-than so the user can leave a snap point.
 *
 * 3. Always update lastY / lastTime even during cooldown.
 *    If we block all updates during cooldown, the first event after
 *    cooldown computes velocity from a stale baseline, producing a
 *    wrong direction and/or wrong velocity.
 *    Fix: track position on every event; only skip the snap logic.
 *
 * This handles BOTH directions:
 *   - Scrolling DOWN fast: stops at the first section it enters.
 *   - Scrolling UP fast: stops at the highest section start crossed,
 *     so each component reaches scale:1 before the user moves up.
 *
 * On desktop (non-touch, ≥1024px) this hook does nothing.
 */

/** Must match StickySection.tsx / useScrollScaleFade.ts */
const SECTION_SPAN_VH = 1.8;
const NUM_SECTIONS = 3;

/** Pixels/second above which we treat a scroll as a momentum fling. */
const VELOCITY_THRESHOLD = 2500;

/**
 * How long (ms) to ignore new crossings after a programmatic snap fires,
 * so our own smooth-scroll doesn't re-trigger the logic.
 */
const SNAP_COOLDOWN_MS = 750;

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
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let cooldownTimer: ReturnType<typeof setTimeout>;
    let inCooldown = false;

    const onResize = () => {
      snapPoints = computeSnapPoints();
    };

    /**
     * Smooth-scroll to `target`, interrupting any in-flight momentum.
     *
     * On iOS Safari and Android Chrome, calling window.scrollTo with
     * behavior:"smooth" during a momentum scroll natively cancels the
     * momentum and starts the programmatic scroll — no need for the
     * old two-step "instant stop → rAF → smooth" pattern, which was
     * the source of the visible hitch before this change.
     */
    const doSnap = (target: number) => {
      inCooldown = true;
      clearTimeout(cooldownTimer);
      window.scrollTo({ top: target, behavior: "smooth" });
      cooldownTimer = setTimeout(() => {
        inCooldown = false;
        lastY = window.scrollY;
        lastTime = performance.now();
      }, SNAP_COOLDOWN_MS);
    };

    const onScroll = () => {
      const now = performance.now();
      const dt = now - lastTime;
      const currentY = window.scrollY;
      const signedDy = currentY - lastY;
      const prevY = lastY;

      // Always keep position tracking current — even during cooldown.
      // If we skip this, the first event after cooldown has a stale
      // prevY and computes the wrong direction / velocity.
      lastY = currentY;
      lastTime = now;

      // Snap logic is suppressed while our smooth-scroll is running.
      if (inCooldown) return;
      if (dt <= 0) return;

      const velocity = (Math.abs(signedDy) / dt) * 1000; // px/s
      if (velocity < VELOCITY_THRESHOLD) return;

      const goingUp = signedDy < 0;

      // Check highest → lowest when going up so we stop at the
      // topmost section first. Lowest → highest for going down.
      const ordered = goingUp ? [...snapPoints].reverse() : snapPoints;

      for (const sp of ordered) {
        const justCrossed = goingUp
          // Strict `>` (not `>=`): after snapping to sp, prevY === sp.
          // Using >= would immediately re-snap the user back to sp on
          // the next fling, making it impossible to scroll past it.
          ? prevY > sp && currentY < sp
          : prevY < sp && currentY > sp;

        if (justCrossed) {
          // Fire immediately — no setTimeout. A delayed timer would be
          // cancelled by the next scroll event before it could fire.
          doSnap(sp);
          return; // inCooldown is now true; subsequent events ignored
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      clearTimeout(cooldownTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
