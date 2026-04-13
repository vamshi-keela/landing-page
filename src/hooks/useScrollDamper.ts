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
 * Performance fix: the old version called `window.scrollTo()` in a tight
 * rAF loop, which fought the browser's native compositor-driven scroll
 * and forced scroll processing back to the main thread. The new version
 * uses a single rAF per scroll event and avoids recursive rAF chains,
 * reducing contention with the compositor.
 */

/** Must match StickySection.tsx / useScrollScaleFade.ts */
const SECTION_SPAN_VH = 1.8;
const NUM_SECTIONS = 3;

interface SectionBounds {
  start: number; // px
  end: number;   // px
}

/** Cached section bounds — recomputed on resize. */
let cachedBounds: SectionBounds[] = [];
let cachedVh = 0;

function recomputeBounds() {
  cachedVh = window.innerHeight;
  cachedBounds = [];
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const start = (1 + i * SECTION_SPAN_VH) * cachedVh;
    const end = start + SECTION_SPAN_VH * cachedVh;
    cachedBounds.push({ start, end });
  }
}

/**
 * Max scroll-delta per frame (in px) when inside a sticky section.
 * Anything faster gets clamped. ~15-18px/frame at 60fps feels smooth.
 * On mobile (smaller vh), we use a slightly higher ratio.
 */
function getMaxDelta(): number {
  return Math.max(12, cachedVh * 0.025);
}

export function useScrollDamper() {
  useEffect(() => {
    // Only activate on touch-capable devices or small screens
    // where momentum scrolling is the primary issue
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;

    if (!isTouchDevice && !isSmallScreen) return;

    recomputeBounds();
    window.addEventListener("resize", recomputeBounds, { passive: true });

    let lastScrollY = window.scrollY;
    let rafId: number | null = null;
    let isActive = true;

    const dampen = () => {
      rafId = null;
      if (!isActive) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      const absDelta = Math.abs(delta);
      const maxDelta = getMaxDelta();

      if (absDelta > maxDelta) {
        const isInSection = cachedBounds.some(
          (b) => currentY >= b.start && currentY <= b.end
        );

        if (isInSection) {
          const clampedDelta = Math.sign(delta) * maxDelta;
          const dampedY = lastScrollY + clampedDelta;
          window.scrollTo({ top: dampedY, behavior: "instant" as ScrollBehavior });
          lastScrollY = dampedY;
          return; // Don't chain another rAF — the scrollTo will fire a new
                  // scroll event, which will schedule the next dampen naturally.
        }
      }

      lastScrollY = currentY;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(dampen);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      isActive = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recomputeBounds);
    };
  }, []);
}
