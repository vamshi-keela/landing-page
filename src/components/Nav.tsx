import { useEffect, useRef, useState } from 'react';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progressRef.current?.style.setProperty('--scroll', `${pct}%`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-logo">
        <span className="mark">Induce<em>.</em></span>
        <span className="tag">AI Media Infrastructure</span>
      </a>
      <div className="nav-links">
        <a href="#product">Product</a>
        <a href="#solutions">Solutions</a>
        <a href="#pricing">Pricing</a>
        {/* <a href="#developers">Developers</a> */}
        <a href="#resources">Resources</a>
      </div>
      <div className="nav-actions">
        <a href="#" className="nav-signin">Sign in</a>
        <a href="#cta" className="btn btn-primary">Start free beta <span className="arrow">→</span></a>
      </div>
      <div ref={progressRef} className="nav-progress" />
    </nav>
  );
}
