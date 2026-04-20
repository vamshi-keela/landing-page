import './index.css';
import { useRevealObserver } from './components/motion';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Positioning } from './components/Positioning';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Audiences } from './components/Audiences';
import { InfraStrip } from './components/InfraStrip';
import { Gallery } from './components/Gallery';
// import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import Footer from './components/Footer';
// import { Tweaks } from './components/Tweaks';

function App() {
  useRevealObserver();
  return (
    <>
      <Cursor />
      <div id="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Positioning />
        <Features />
        <HowItWorks />
        <Audiences />
        <InfraStrip />
        <Gallery />
        {/* <Testimonials /> */}
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      {/* <Tweaks /> */}
    </>
  );
}

export default App;
