import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useScrollScaleFade } from "../../hooks/useScrollScaleFade";
import { NAVBAR_HEIGHT } from "../../utils/constants";

interface StickySectionProps {
  /**
   * 1-based index of this section within the sticky stack.
   * Drives z-index (20/30/40) and scroll breakpoints automatically.
   *   1 = ScriptToVideo, 2 = DirectorMode, 3 = CreativeSuite
   */
  index: 1 | 2 | 3;
  children: React.ReactNode;
}

const Z_BY_INDEX: Record<1 | 2 | 3, number> = { 1: 20, 2: 30, 3: 40 };

/** Extra scroll distance (in vh) after each sticky section. */
const SPACER_VH = 80;

/** Scroll span per section in vh units (1vh content + spacer). */
const SECTION_SPAN_VH = 1 + SPACER_VH / 100; // 1.8

/** Module-level cached vh — updated on resize, never read inside scroll. */
let cachedVh = typeof window !== "undefined" ? window.innerHeight : 900;
let vhListenerCount = 0;

function onVhResize() {
  cachedVh = window.innerHeight;
}

/**
 * Wraps a section in a sticky container with scroll-driven scale + opacity.
 *
 * Performance:
 * - Uses cached viewport height (no per-frame `window.innerHeight`).
 * - Uses direct DOM classList.toggle instead of React state.
 * - Adds `will-change: transform` to promote to compositor layer.
 */
const StickySection = ({ index, children }: StickySectionProps) => {
  const { scale, opacity } = useScrollScaleFade(index);
  const sectionEl = useRef<HTMLElement>(null);

  useEffect(() => {
    // Ref-count the shared resize listener
    if (vhListenerCount === 0) {
      cachedVh = window.innerHeight;
      window.addEventListener("resize", onVhResize, { passive: true });
    }
    vhListenerCount++;

    const el = sectionEl.current;
    if (!el) return;

    let wasPinned = false;
    // True while scrollY is within the section's "start zone" — the narrow
    // band at the top of its sticky range where the heading should be visible.
    let wasInStartZone = false;

    const checkPinned = () => {
      const sectionStart = (1 + (index - 1) * SECTION_SPAN_VH) * cachedVh;
      const scrollY = window.scrollY;
      const pinned = scrollY >= sectionStart - 2;

      // Only touch the DOM if the pinned state actually changed.
      if (pinned !== wasPinned) {
        wasPinned = pinned;
        el.classList.toggle("max-md:overflow-y-auto", pinned);
        el.classList.toggle("max-md:overflow-y-hidden", !pinned);
      }

      // "Start zone": within 10 % of a vh above the section's entry point.
      // When the page scroll enters this zone (either scrolling down into the
      // section for the first time, or snapping back here from a lower section),
      // reset the section's own scrollTop so its heading is always visible.
      // The edge-triggered flag means we only fire once per zone entry, so the
      // user can still scroll internal content once they're past this band.
      const inStartZone = pinned && scrollY <= sectionStart + cachedVh * 0.1;
      if (inStartZone && !wasInStartZone) {
        el.scrollTop = 0;
      }
      wasInStartZone = inStartZone;
    };

    window.addEventListener("scroll", checkPinned, { passive: true });
    checkPinned();

    return () => {
      vhListenerCount--;
      if (vhListenerCount === 0) {
        window.removeEventListener("resize", onVhResize);
      }
      window.removeEventListener("scroll", checkPinned);
    };
  }, [index]);

  return (
    <>
      <motion.section
        ref={sectionEl}
        style={{
          zIndex: Z_BY_INDEX[index],
          scale,
          opacity,
          willChange: "transform",
        }}
        className="sticky top-0 h-screen w-full bg-surface max-md:overflow-y-hidden md:overflow-hidden flex max-md:items-start max-md:justify-center md:items-center md:justify-center"
      >
        <div
          style={{ paddingTop: NAVBAR_HEIGHT }}
          className="w-full min-h-min md:min-h-0 md:h-full flex max-md:items-start md:items-center justify-center max-md:pb-12 md:pb-0 md:overflow-hidden"
        >
          {children}
        </div>
      </motion.section>
      {/* Spacer: section stays pinned during this zone before next arrives */}
      <div style={{ height: `${SPACER_VH}vh` }} aria-hidden="true" />
    </>
  );
};

export default StickySection;
