import { useScroll, useTransform, MotionValue } from "motion/react";
import { lerp01 } from "../utils/lerp";

interface ScrollScaleFade {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}

/**
 * Returns scale and opacity MotionValues driven by window scrollY.
 *
 * @param sectionIndex  1-based index matching SECTION_START_VH:
 *   1 = ScriptToVideo (1×vh → 2×vh)
 *   2 = DirectorMode  (2×vh → 3×vh)
 *   3 = CreativeSuite (3×vh → 4×vh)
 *
 * The section scales from 1 → 0.95 as the NEXT section slides over it.
 * Using window.innerHeight inside the transform fn keeps values accurate
 * after resize without needing extra state or re-subscriptions.
 */
export const useScrollScaleFade = (sectionIndex: number): ScrollScaleFade => {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, (v) => {
    if (window.innerWidth < 768) return 1;
    return lerp01(
      v,
      sectionIndex * window.innerHeight,
      (sectionIndex + 1) * window.innerHeight,
      1,
      0.95
    );
  });

  const opacity = useTransform(scrollY, (v) => {
    if (window.innerWidth < 768) return 1;
    return lerp01(
      v,
      sectionIndex * window.innerHeight,
      (sectionIndex + 1) * window.innerHeight,
      1,
      1
    );
  });

  return { scale, opacity };
};
