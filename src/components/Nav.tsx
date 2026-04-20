import { useEffect, useRef, useState } from 'react';
import induceIcon from '../assets/induce_icon.svg';
import { FOUNDERS_CALENDLY_URL } from '../constants';

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
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center px-[clamp(24px,6vw,96px)] [backdrop-filter:blur(28px)_saturate(140%)] [-webkit-backdrop-filter:blur(28px)_saturate(140%)] transition-[background,padding] duration-[280ms] ${scrolled
      ? 'py-[10px] bg-[rgba(14,14,14,0.82)]'
      : 'py-[14px] bg-[rgba(14,14,14,0.55)]'
      }`}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        aria-label="Scroll to top"
      >
        <img
          src={induceIcon}
          alt=""
          width={32}
          height={32}
          className='w-32 sm:w-42 shrink-0 object-contain'
          aria-hidden
        />
      </button>

      {/* nav-links class retained for the a::after pseudo-element underline defined in CSS */}
      <div className="nav-links hidden lg:flex gap-7 mx-auto items-center">
        <a href="#product">Product</a>
        <a href="#solutions">Solutions</a>
        <a href="#pricing">Pricing</a>
        <a href="#resources">Resources</a>
      </div>

      <div className="ml-auto flex gap-3 items-center">
        <a href={FOUNDERS_CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary !px-3 !py-2 !text-[10px] sm:!px-5 sm:!py-[13px] sm:!text-[12px]">
          Talk to founders<span className="arrow">→</span>
        </a>
      </div>

      <div ref={progressRef} className="nav-progress" />
    </nav>
  );
}
