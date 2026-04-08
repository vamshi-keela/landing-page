import React, { useState, useEffect } from "react";
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

/** Extra scroll distance (in vh) after each sticky section — the section
 *  stays pinned during this zone, giving it breathing room before the
 *  next section slides in. */
const SPACER_VH = 40;

/** Scroll span per section in vh units (1vh content + spacer). */
const SECTION_SPAN_VH = 1 + SPACER_VH / 100; // 1.4

/**
 * Wraps a section in a sticky container with scroll-driven scale + opacity.
 *
 * The `<motion.section>` is returned as a direct child of `<main>` (via
 * fragment) so `position: sticky` is constrained by `<main>`, NOT by a
 * wrapper div. A spacer div after it adds 40vh of extra scroll distance
 * where the section lingers before the next one appears.
 *
 * On mobile, `overflow-y: auto` is only enabled once the section is
 * pinned at the top of the viewport. Before that, overflow is hidden
 * so touch events fall through to the page scroll — preventing the
 * issue where scrolling within a partially-visible section would
 * scroll its internal content instead of bringing it fully into view.
 *
 * Design decisions:
 * - `top-0 h-screen` keeps each section covering the full viewport,
 *   required for the "slide-over" stacking illusion.
 * - `paddingTop: NAVBAR_HEIGHT` pushes inner content below the fixed navbar.
 * - `bg-surface overflow-hidden` ensures solid background coverage.
 */
const StickySection = ({ index, children }: StickySectionProps) => {
  const { scale, opacity } = useScrollScaleFade(index);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const checkPinned = () => {
      const vh = window.innerHeight;
      // Section N document position = hero (1vh) + (N-1) × 1.4vh
      const sectionStart = (1 + (index - 1) * SECTION_SPAN_VH) * vh;
      setIsPinned(window.scrollY >= sectionStart - 2); // 2px tolerance
    };

    window.addEventListener("scroll", checkPinned, { passive: true });
    window.addEventListener("resize", checkPinned);
    checkPinned();

    return () => {
      window.removeEventListener("scroll", checkPinned);
      window.removeEventListener("resize", checkPinned);
    };
  }, [index]);

  return (
    <>
      <motion.section
        style={{
          zIndex: Z_BY_INDEX[index],
          scale,
          opacity,
        }}
        className={`sticky top-0 h-screen w-full bg-surface ${
          isPinned ? "max-md:overflow-y-auto" : "max-md:overflow-y-hidden"
        } md:overflow-hidden flex max-md:items-start max-md:justify-center md:items-center md:justify-center`}
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
