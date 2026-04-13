import { useEffect, useRef } from "react";
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
 * Module-level cached viewport height, shared by all instances.
 * Updated on resize. Reading `window.innerHeight` inside every
 * scroll-driven transform callback was forcing layout reflows
 * (the browser must flush pending style changes to answer
 * "how tall is the viewport?"), which was the primary source
 * of frame drops during fast scrolling.
 */
let cachedVh = typeof window !== "undefined" ? window.innerHeight : 900;
let listenerCount = 0;

function onResize() {
  cachedVh = window.innerHeight;
}

/**
 * Returns scale and opacity MotionValues driven by window scrollY.
 *
 * @param sectionIndex  1-based index:
 *   1 = ScriptToVideo, 2 = DirectorMode, 3 = CreativeSuite
 */
export const useScrollScaleFade = (sectionIndex: number): ScrollScaleFade => {
  const { scrollY } = useScroll();
  const indexRef = useRef(sectionIndex);
  indexRef.current = sectionIndex;

  // Manage a single shared resize listener with ref-counting so
  // we don't leak listeners and we don't add one per instance.
  useEffect(() => {
    if (listenerCount === 0) {
      cachedVh = window.innerHeight;
      window.addEventListener("resize", onResize, { passive: true });
    }
    listenerCount++;
    return () => {
      listenerCount--;
      if (listenerCount === 0) {
        window.removeEventListener("resize", onResize);
      }
    };
  }, []);

  const scale = useTransform(scrollY, (v) => {
    const vh = cachedVh;
    const sectionStart = (1 + (indexRef.current - 1) * SECTION_SPAN_VH) * vh;
    const scaleStart = sectionStart + (SECTION_SPAN_VH - 1) * vh;
    const scaleEnd = sectionStart + SECTION_SPAN_VH * vh;
    return lerp01(v, scaleStart, scaleEnd, 1, 0.95);
  });

  const opacity = useTransform(scrollY, (v) => {
    const vh = cachedVh;
    const sectionStart = (1 + (indexRef.current - 1) * SECTION_SPAN_VH) * vh;
    const scaleStart = sectionStart + (SECTION_SPAN_VH - 1) * vh;
    const scaleEnd = sectionStart + SECTION_SPAN_VH * vh;
    return lerp01(v, scaleStart, scaleEnd, 1, 1);
  });

  return { scale, opacity };
};
