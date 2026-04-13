import { useEffect } from "react";

/**
 * Section-aware scroll-velocity damper (touch / small-screen only).
 *
 * Problem: On touch devices, momentum scrolling can fling through
 * hundreds of vh in one gesture, skipping sticky sections entirely.
 *
 * Approach:
 * Instead of fighting the browser by calling `window.scrollTo()` in a
 * rAF loop (which yanks scroll processing back to the main thread and
 * causes severe jank), this version uses CSS `scroll-snap-type` as a
 * native compositor-level solution. When the user enters a sticky
 * section zone, we temporarily enable scroll-snap on the HTML element,
 * and the browser's native deceleration handles the rest.
 *
 * On desktop (non-touch, ≥1024px), this hook does nothing — the SPACER_VH
 * in StickySection already provides enough dwell time.
 */

/** Must match StickySection.tsx / useScrollScaleFade.ts */
const SECTION_SPAN_VH = 1.8;
const NUM_SECTIONS = 3;

export function useScrollDamper() {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;

    // Only activate on touch or small screens
    if (!isTouchDevice && !isSmallScreen) return;

    const html = document.documentElement;

    // Precompute snap points: the start of each sticky section
    // These are the top positions where each section pins.
    const computeSnapPoints = (): number[] => {
      const vh = window.innerHeight;
      const points: number[] = [];
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const sectionStart = (1 + i * SECTION_SPAN_VH) * vh;
        points.push(sectionStart);
      }
      return points;
    };

    let snapPoints = computeSnapPoints();
    let scrollTimer: ReturnType<typeof setTimeout>;
    let isFlinging = false;
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const onResize = () => {
      snapPoints = computeSnapPoints();
    };

    const onScroll = () => {
      const now = performance.now();
      const dt = now - lastTime;
      const currentY = window.scrollY;
      const dy = Math.abs(currentY - lastY);
      
      lastY = currentY;
      lastTime = now;

      // Detect high velocity (>3000px/s = likely momentum fling)
      if (dt > 0 && (dy / dt) * 1000 > 3000) {
        if (!isFlinging) {
          isFlinging = true;
        }
        // Check if we're near a snap point
        const nearSnap = snapPoints.some(
          (sp) => Math.abs(currentY - sp) < window.innerHeight * 0.3
        );

        if (nearSnap) {
          // Find closest snap point
          let closest = snapPoints[0];
          let minDist = Math.abs(currentY - closest);
          for (let i = 1; i < snapPoints.length; i++) {
            const dist = Math.abs(currentY - snapPoints[i]);
            if (dist < minDist) {
              minDist = dist;
              closest = snapPoints[i];
            }
          }

          // Snap to the closest section start
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(() => {
            window.scrollTo({ top: closest, behavior: "smooth" });
            isFlinging = false;
          }, 100);
        }
      }

      // Reset fling detection after scroll settles
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isFlinging = false;
      }, 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
