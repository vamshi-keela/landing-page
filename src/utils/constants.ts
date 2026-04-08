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
 * Document scroll layout — each sticky section occupies 1.4×vh
 * (100vh content + 40vh spacer for breathing room).
 *   0×vh  → 1×vh    : Hero
 *   1×vh  → 2.4×vh  : ScriptToVideo  (sticky, z-20, incl. 40vh spacer)
 *   2.4×vh → 3.8×vh : DirectorMode   (sticky, z-30, incl. 40vh spacer)
 *   3.8×vh → 5.2×vh : CreativeSuite  (sticky, z-40, incl. 40vh spacer)
 *   5.2×vh → ...    : HorizontalGallery inner sticky (z-50)
 */
export const SECTION_START_VH: Record<string, number> = {
  scriptToVideo: 1,
  directorMode: 2.4,
  creativeSuite: 3.8,
  gallery: 5.2,
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
