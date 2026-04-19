import { useEffect, useRef, useState } from 'react';
import induceIcon from '../assets/induce_icon.svg';

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
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        aria-label="Scroll to top"
      >
        <img
          src={induceIcon}
          alt=''
          width={32}
          height={32}
          className='w-32 sm:w-42 shrink-0 object-contain'
          aria-hidden
        />
      </button>
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
