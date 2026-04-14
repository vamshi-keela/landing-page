import { useEffect } from "react";

/**
 * Section-aware scroll-velocity damper (touch / small-screen only).
 *
 * Direction-aware snap points
 * ──────────────────────────
 * Scrolling DOWN  →  snap at section ENDS   [2520, 4140, 5760] px
 *   Each section must "reach its end" (scale → 0.95, next section starting)
 *   before the fling can continue.  No snap at section STARTS going down —
 *   the user can naturally slide in and see the section at full scale.
 *
 * Scrolling UP    →  snap at section STARTS [900, 2520, 4140] px
 *   Each section must "reach its start" (scale = 1, heading visible) before
 *   the fling can continue upward to the previous section.
 *
 * Why two different arrays?
 *   A section END equals the NEXT section's START (they share the same
 *   scroll position — e.g. 2520px is ScriptToVideo's exit point AND
 *   DirectorMode's entry point).  Using a single shared array would
 *   mis-snap going down: it would stop at 900 (ScriptToVideo's start)
 *   instead of letting the user scroll in, then stop at 2520 (its end).
 *
 * Critical design constraints
 * ───────────────────────────
 * 1. Momentum must be stopped before smooth-scrolling to target.
 *    Without the instant scrollTo(0, y) call first, momentum continues
 *    during the 750 ms cooldown and silently carries the page past the
 *    next snap point.  After cooldown, lastY is already past that point
 *    so the crossing is never detected.
 *    Fix: window.scrollTo(0, scrollY) (instant) → rAF → scrollTo(smooth).
 *
 * 2. No snapTimer / clearTimeout retry loop.
 *    Fast flings generate scroll events every 5–16 ms.  A delayed timer
 *    gets cancelled by every subsequent event before it fires.
 *    Fix: call doSnap() immediately on the FIRST crossing, then enter
 *    cooldown so subsequent events are ignored until we arrive.
 *
 * 3. Strict `prevY > sp` (not >=) for upward crossings.
 *    After snapping to exactly sp, prevY === sp on the next fling.
 *    `>= sp` would immediately re-snap back to the same point.
 *    Fix: strict greater-than so the user can leave a snap point.
 *
 * 4. Always update lastY / lastTime even during cooldown.
 *    Skipping updates makes the first post-cooldown event compute
 *    velocity from a stale baseline → wrong direction / velocity.
 *
 * On desktop (non-touch, ≥1024 px) this hook does nothing.
 */

/** Must match StickySection.tsx / useScrollScaleFade.ts */
const SECTION_SPAN_VH = 1.8;
const NUM_SECTIONS = 3;

/** Pixels / second above which a scroll is treated as a momentum fling. */
const VELOCITY_THRESHOLD = 2000;

/**
 * ms to suppress new snap logic after a programmatic snap fires.
 * Smooth-scroll typically takes 300–600 ms; 750 ms gives a comfortable
 * buffer so we don't re-trigger while still animating.
 */
const SNAP_COOLDOWN_MS = 750;

export function useScrollDamper() {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;

    if (!isTouchDevice && !isSmallScreen) return;

    /**
     * DOWN snap points — every section boundary (start AND end).
     * (1 + i * SECTION_SPAN_VH) * vh  for i = 0..NUM_SECTIONS   (inclusive)
     *   = [1.0, 2.8, 4.6, 6.4] × vh  = [900, 2520, 4140, 5760] at 900 px
     *
     * Includes section STARTS (900, 2520, 4140) so each component gets to
     * "spin up" — appear at scale:1 with heading visible and internal scroll
     * ready — before the fling can continue to the section's END.
     * Also includes the gallery start (5760) as the final down checkpoint.
     */
    const computeDownSnapPoints = (): number[] => {
      const vh = window.innerHeight;
      return Array.from({ length: NUM_SECTIONS + 1 }, (_, i) =>
        (1 + i * SECTION_SPAN_VH) * vh
      );
    };

    /**
     * UP snap points — section starts only.
     * (1 + i * SECTION_SPAN_VH) * vh  for i = 0..NUM_SECTIONS-1
     *   = [1.0, 2.8, 4.6] × vh  = [900, 2520, 4140] at 900 px viewport
     *
     * When scrolling up from the gallery, skips the 5760 intermediate stop
     * and snaps directly to CreativeSuite's start (4140) in one swipe.
     */
    const computeUpSnapPoints = (): number[] => {
      const vh = window.innerHeight;
      return Array.from({ length: NUM_SECTIONS }, (_, i) =>
        (1 + i * SECTION_SPAN_VH) * vh
      );
    };

    let downSnapPoints = computeDownSnapPoints();
    let upSnapPoints = computeUpSnapPoints();
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let cooldownTimer: ReturnType<typeof setTimeout>;
    let inCooldown = false;

    const onResize = () => {
      downSnapPoints = computeDownSnapPoints();
      upSnapPoints = computeUpSnapPoints();
    };

    /**
     * Stop momentum then smooth-scroll to `target`.
     *
     * The two-step pattern is intentional:
     *   1. scrollTo(0, y)  — instant, synchronous; interrupts iOS/Android
     *      momentum at the current position.
     *   2. rAF → scrollTo({ smooth }) — waits one frame so the browser
     *      processes the stop before we start the programmatic animation.
     *
     * Without step 1, momentum continues during the 750 ms cooldown and
     * silently carries the page past the next snap point (see constraint 1).
     */
    const doSnap = (target: number) => {
      inCooldown = true;
      clearTimeout(cooldownTimer);
      window.scrollTo(0, window.scrollY); // interrupt momentum
      requestAnimationFrame(() => {
        window.scrollTo({ top: target, behavior: "smooth" });
      });
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
      lastY = currentY;
      lastTime = now;

      if (inCooldown) return;
      if (dt <= 0) return;

      const velocity = (Math.abs(signedDy) / dt) * 1000; // px/s
      if (velocity < VELOCITY_THRESHOLD) return;

      const goingUp = signedDy < 0;

      if (goingUp) {
        // Check highest → lowest: stop at the topmost section start crossed.
        const ordered = [...upSnapPoints].reverse();
        for (const sp of ordered) {
          if (prevY > sp && currentY < sp) {
            doSnap(sp);
            return;
          }
        }
      } else {
        // Check lowest → highest: stop at the first section end crossed.
        for (const sp of downSnapPoints) {
          if (prevY < sp && currentY > sp) {
            doSnap(sp);
            return;
          }
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
