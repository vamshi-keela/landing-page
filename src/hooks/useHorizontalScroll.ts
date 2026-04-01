import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, MotionValue } from "motion/react";

interface HorizontalScroll {
  containerRef: React.RefObject<HTMLDivElement>;
  outerHeight: number;
  x: MotionValue<number>;
}

/**
 * Drives a horizontal gallery that pins and pans as the user scrolls vertically.
 *
 * @param sectionStartVh  The viewport-height multiple at which the gallery's
 *   inner sticky panel reaches top:0 (e.g. 4 means scrollY = 4×vh).
 *
 * Returns:
 *   containerRef  — attach to the horizontally-scrolling flex container so we
 *                   can measure its scrollWidth after render.
 *   outerHeight   — the outer wrapper's height in px = scrollDist, giving
 *                   exactly enough scroll distance to pan the full gallery.
 *   x             — MotionValue applied as `style={{ x }}` to containerRef's
 *                   parent motion.div.
 */
export const useHorizontalScroll = (sectionStartVh: number): HorizontalScroll => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref (not state) so transform fn always reads the latest value without
  // stale closure issues.
  const scrollDistRef = useRef(1400);
  const [outerHeight, setOuterHeight] = useState(1400);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const dist = Math.max(1, containerRef.current.scrollWidth - window.innerWidth);
      scrollDistRef.current = dist;
      setOuterHeight(dist);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();

  const x = useTransform(scrollY, (v) => {
    const vh = window.innerHeight;
    const sd = scrollDistRef.current;
    const start = sectionStartVh * vh;
    const end = start + sd;
    const t = Math.max(0, Math.min(1, (v - start) / (end - start)));
    return -t * sd;
  });

  return { containerRef, outerHeight, x };
};
