/**
 * Fixed header layout — sum matches the `<nav>` box (border-box): vertical padding,
 * inner row (logo + actions), and bottom border. Use NAVBAR_HEIGHT everywhere you need
 * the offset from the viewport top (sticky top, content padding under the bar).
 */
export const NAVBAR_BORDER_PX = 1;
export const NAVBAR_PADDING_Y = 16;
export const NAVBAR_INNER_ROW_HEIGHT = 47;

export const NAVBAR_HEIGHT =
  NAVBAR_PADDING_Y + NAVBAR_INNER_ROW_HEIGHT + NAVBAR_PADDING_Y + NAVBAR_BORDER_PX;

/** Hero / navbar “Talk to founders” button (Calendly). */
export const FOUNDERS_CALENDLY_URL = 'https://calendly.com/cameoo-kmb';

/**
 * Document scroll layout — each sticky section occupies 1.8×vh
 * (100vh content + 80vh spacer for breathing room).
 *   0×vh  → 1×vh    : Hero
 *   1×vh  → 2.8×vh  : ScriptToVideo  (sticky, z-20, incl. 80vh spacer)
 *   2.8×vh → 4.6×vh : DirectorMode   (sticky, z-30, incl. 80vh spacer)
 *   4.6×vh → 6.4×vh : CreativeSuite  (sticky, z-40, incl. 80vh spacer)
 *   6.4×vh → ...    : HorizontalGallery inner sticky (z-50)
 */
export const SECTION_START_VH: Record<string, number> = {
  scriptToVideo: 1,
  directorMode: 2.8,
  creativeSuite: 4.6,
  gallery: 6.4,
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
