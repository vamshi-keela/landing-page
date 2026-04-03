import React from "react";
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

/**
 * Wraps a section in a sticky container with scroll-driven scale + opacity.
 *
 * Design decisions:
 * - `top-0 h-screen` (not top-[80px]) keeps each section covering the full
 *   viewport, which is required for the "slide-over" stacking illusion.
 * - `paddingTop: NAVBAR_HEIGHT` pushes inner content below the fixed navbar (sum of
 *   NAVBAR_PADDING_Y + inner row + NAVBAR_PADDING_Y + NAVBAR_BORDER_PX) without
 *   shrinking the section's height — so sticky breakpoints stay at exact vh
 *   multiples.
 * - `bg-surface overflow-hidden` ensures solid background coverage (no
 *   transparency bleed between stacked sections).
 */
const StickySection = ({ index, children }: StickySectionProps) => {
  const { scale, opacity } = useScrollScaleFade(index);

  return (
    <motion.section
      style={{
        zIndex: Z_BY_INDEX[index],
        scale,
        opacity,
      }}
      className="sticky top-0 h-screen w-full bg-surface overflow-hidden flex flex-col"
      // paddingTop pushes children clear of the fixed navbar
      // kept as inline style so NAVBAR_HEIGHT is the single source of truth
      // and avoids a Tailwind arbitrary-value class spread across files
      // eslint-disable-next-line react/no-unknown-property
    >
      <div
        style={{ paddingTop: NAVBAR_HEIGHT }}
        className="w-full h-full max-md:overflow-y-auto md:overflow-hidden md:flex md:items-center md:justify-center"
      >
        {children}
      </div>
    </motion.section>
  );
};

export default StickySection;
