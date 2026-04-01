/**
 * Clamp-and-lerp for scroll-driven transforms.
 * Maps `v` from [start, end] → [from, to], clamped at both ends.
 */
export const lerp01 = (
  v: number,
  start: number,
  end: number,
  from: number,
  to: number
): number => {
  const t = Math.max(0, Math.min(1, (v - start) / (end - start || 1)));
  return from + (to - from) * t;
};
