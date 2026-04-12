import { useScroll, useTransform, MotionValue } from "motion/react";
import { lerp01 } from "../utils/lerp";

interface ScrollScaleFade {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}

/**
 * Total scroll span per sticky section (in vh units):
 * 1vh of content + 0.8vh spacer = 1.8vh.
 * Must match SPACER_VH (80vh) in StickySection.tsx.
 */
const SECTION_SPAN_VH = 1.8;

/**
 * Returns scale and opacity MotionValues driven by window scrollY.
 *
 * @param sectionIndex  1-based index:
 *   1 = ScriptToVideo, 2 = DirectorMode, 3 = CreativeSuite
 *
 * Each section occupies 1.4×vh of scroll (100vh + 40vh spacer).
 * The scale-out animation runs over the 1×vh window when the NEXT
 * section slides in from the bottom — identical to the original effect,
 * just shifted by the spacer's extra scroll distance.
 */
export const useScrollScaleFade = (sectionIndex: number): ScrollScaleFade => {
  const { scrollY } = useScroll();

  // Section N starts at: hero (1vh) + (N-1) × 1.4vh
  // Next section enters viewport at: sectionStart + spacer (0.4vh)
  // Next section pins (covers this one) at: sectionStart + 1.4vh
  // Scale-out range = [nextEntersViewport, nextPins] = 1vh window
  const scale = useTransform(scrollY, (v) => {
    const vh = window.innerHeight;
    const sectionStart = (1 + (sectionIndex - 1) * SECTION_SPAN_VH) * vh;
    const scaleStart = sectionStart + (SECTION_SPAN_VH - 1) * vh; // after spacer
    const scaleEnd = sectionStart + SECTION_SPAN_VH * vh; // next section pins
    return lerp01(v, scaleStart, scaleEnd, 1, 0.95);
  });

  const opacity = useTransform(scrollY, (v) => {
    const vh = window.innerHeight;
    const sectionStart = (1 + (sectionIndex - 1) * SECTION_SPAN_VH) * vh;
    const scaleStart = sectionStart + (SECTION_SPAN_VH - 1) * vh;
    const scaleEnd = sectionStart + SECTION_SPAN_VH * vh;
    return lerp01(v, scaleStart, scaleEnd, 1, 1);
  });

  return { scale, opacity };
};
