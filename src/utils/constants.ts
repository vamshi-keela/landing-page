/** Height of the fixed navbar in pixels. Used by StickySection to prevent content clipping. */
export const NAVBAR_HEIGHT = 80;

/**
 * Document scroll layout — each sticky section occupies exactly one viewport height.
 *   0×vh → 1×vh  : Hero
 *   1×vh → 2×vh  : ScriptToVideo  (sticky, z-20)
 *   2×vh → 3×vh  : DirectorMode   (sticky, z-30)
 *   3×vh → 4×vh  : CreativeSuite  (sticky, z-40)
 *   4×vh → ...   : HorizontalGallery inner sticky (z-50)
 */
export const SECTION_START_VH: Record<string, number> = {
  scriptToVideo: 1,
  directorMode: 2,
  creativeSuite: 3,
  gallery: 4,
};

export const Z_INDEX: Record<string, number> = {
  navbar: 100,
  gallery: 50,
  creativeSuite: 40,
  directorMode: 30,
  scriptToVideo: 20,
  hero: 10,
  footer: 60,
  particles: 5,
  modal: 1000,
};
