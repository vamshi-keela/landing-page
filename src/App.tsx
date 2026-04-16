/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Particles from "./components/layout/Particles";
import Hero from "./components/sections/Hero";
import ScriptToVideo from "./components/sections/ScriptToVideo";
import DirectorMode from "./components/sections/DirectorMode";
import CreativeSuite from "./components/sections/CreativeSuite";
import HorizontalGallery from "./components/sections/HorizontalGallery";
import FinalCta from "./components/sections/FinalCta";
import StickySection from "./components/shared/StickySection";
import { useScrollDamper } from "./hooks/useScrollDamper";

/**
 * Zero-height invisible div that registers a CSS scroll-snap anchor at its
 * exact DOM position. On desktop (hover:hover + pointer:fine), the html
 * element has `scroll-snap-type: y proximity` — placing one of these before
 * a section activates native compositor-level snapping.
 *
 * On touch devices (mobile), CSS scroll-snap is intentionally disabled
 * because it conflicts with position:sticky on iOS Safari. The JS-based
 * useScrollDamper handles the equivalent snapping via touch events instead.
 */
const SnapAnchor = () => (
  <div
    aria-hidden="true"
    style={{ height: 0, overflow: "visible", scrollSnapAlign: "start", scrollMarginTop: 0 }}
  />
);

/**
 * App — scroll layout:
 *
 *   0×vh → 1×vh  : Hero           (parallax, z-10)
 *   1×vh → 2×vh  : ScriptToVideo  (sticky z-20, scales out as next arrives)
 *   2×vh → 3×vh  : DirectorMode   (sticky z-30, scales out as next arrives)
 *   3×vh → 4×vh  : CreativeSuite  (sticky z-40, scales out as gallery arrives)
 *   4×vh → ...   : HorizontalGallery (inner sticky z-50, pans horizontally)
 *
 * Critical: The root div uses overflowX:'clip' (not 'hidden').
 * overflow:hidden creates a scroll container, which silently breaks
 * position:sticky on all descendants. clip visually clips without
 * creating a scroll container — preserving correct sticky behavior.
 */
export default function App() {
  useScrollDamper();

  return (
    <div
      className="bg-surface text-on-surface font-body selection:bg-primary-container/30"
      style={{ overflowX: "clip" }}
    >
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <SnapAnchor />
        <StickySection index={1}>
          <ScriptToVideo />
        </StickySection>
        <SnapAnchor />
        <StickySection index={2}>
          <DirectorMode />
        </StickySection>
        <SnapAnchor />
        <StickySection index={3}>
          <CreativeSuite />
        </StickySection>
        <SnapAnchor />
        <HorizontalGallery />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
