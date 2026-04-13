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

/** Extra scroll distance (in vh) after each sticky section — the section
 *  stays pinned during this zone, giving it breathing room before the
 *  next section slides in.
 *
 *  Increased from 40vh to 80vh to prevent fast-scroll / momentum-scroll
 *  from skipping past sections on both desktop and mobile. */
const SPACER_VH = 80;

/** Scroll span per section in vh units (1vh content + spacer). */
const SECTION_SPAN_VH = 1 + SPACER_VH / 100; // 1.8

/**
 * Wraps a section in a sticky container with scroll-driven scale + opacity.
 *
 * Performance fix: the old version used `useState` + a `scroll` listener to
 * toggle `overflow-y` via a class swap. That caused a full React re-render on
 * every scroll frame (×3 sections), which was a major contributor to frame
 * drops during fast scrolling.
 *
 * The new version uses a ref + direct DOM mutation (`classList.toggle`) inside
 * a passive scroll listener. This bypasses React's reconciliation entirely,
 * applying the same visual change as a pure DOM operation that the browser can
 * batch with its own scroll compositing.
 */
const StickySection = ({ index, children }: StickySectionProps) => {
  const { scale, opacity } = useScrollScaleFade(index);
  const sectionEl = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionEl.current;
    if (!el) return;

    const checkPinned = () => {
      const vh = window.innerHeight;
      const sectionStart = (1 + (index - 1) * SECTION_SPAN_VH) * vh;
      const pinned = window.scrollY >= sectionStart - 2;

      // Direct DOM mutation — no React re-render.
      // Toggle between overflow-y:auto and overflow-y:hidden on mobile.
      el.classList.toggle("max-md:overflow-y-auto", pinned);
      el.classList.toggle("max-md:overflow-y-hidden", !pinned);
    };

    window.addEventListener("scroll", checkPinned, { passive: true });
    window.addEventListener("resize", checkPinned, { passive: true });
    checkPinned();

    return () => {
      window.removeEventListener("scroll", checkPinned);
      window.removeEventListener("resize", checkPinned);
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
