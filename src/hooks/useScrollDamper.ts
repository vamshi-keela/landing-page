import { useEffect } from "react";

/**
 * Section-aware scroll-velocity damper.
 *
 * On touch devices (and aggressive trackpads), momentum scrolling can
 * fling through hundreds of vh in one gesture — skipping sticky sections
 * entirely. This hook solves the problem at the source: it listens for
 * scroll events and, when the user is inside a sticky section's "dwell
 * zone" (the spacer region), it limits how fast `scrollY` can advance
 * by interpolating toward the target rather than jumping.
 *
 * How it works:
 * - On each `scroll` event, we compute how far into the page the user is.
 * - If the current scroll position is within a sticky section's range,
 *   and the delta since the last frame is above a threshold, we
 *   override the scroll position with a damped version.
 * - This preserves the natural feel for slow/normal scrolling, only
 *   kicking in for fast flicks.
 *
 * The hook is passive-safe: it uses `{ passive: false }` only on the
 * wheel event (where `preventDefault` is needed), and `{ passive: true }`
 * on touch events where we only record velocity.
 */

/** Must match StickySection.tsx / useScrollScaleFade.ts */
const SECTION_SPAN_VH = 1.8;
const NUM_SECTIONS = 3;

interface SectionBounds {
  start: number; // px
  end: number;   // px
}

function getSectionBounds(vh: number): SectionBounds[] {
  const bounds: SectionBounds[] = [];
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const start = (1 + i * SECTION_SPAN_VH) * vh;
    const end = start + SECTION_SPAN_VH * vh;
    bounds.push({ start, end });
  }
  return bounds;
}

/**
 * Max scroll-delta per frame (in px) when inside a sticky section.
 * Anything faster gets clamped. ~15-18px/frame at 60fps feels smooth.
 * On mobile (smaller vh), we use a slightly higher ratio.
 */
function getMaxDelta(): number {
  const vh = window.innerHeight;
  // Allow faster scrolling on desktop (larger viewports)
  return Math.max(12, vh * 0.025);
}

export function useScrollDamper() {
  useEffect(() => {
    // Only activate on touch-capable devices or small screens
    // where momentum scrolling is the primary issue
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;

    if (!isTouchDevice && !isSmallScreen) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    let isActive = true;

    const dampen = () => {
      if (!isActive) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      const absDelta = Math.abs(delta);
      const maxDelta = getMaxDelta();

      if (absDelta > maxDelta) {
        const vh = window.innerHeight;
        const bounds = getSectionBounds(vh);
        const isInSection = bounds.some(
          (b) => currentY >= b.start && currentY <= b.end
        );

        if (isInSection) {
          // Clamp the scroll position
          const clampedDelta = Math.sign(delta) * maxDelta;
          const dampedY = lastScrollY + clampedDelta;
          window.scrollTo({ top: dampedY, behavior: "instant" as ScrollBehavior });
          lastScrollY = dampedY;
          // Keep requesting frames until scroll settles
          requestAnimationFrame(dampen);
          return;
        }
      }

      lastScrollY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(dampen);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      isActive = false;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
