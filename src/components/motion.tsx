import { useEffect, useRef } from 'react';
import type { ReactNode, ElementType } from 'react';

/* Magnetic button — call as ref on any element */
export function useMagnetic(strength = 0.28) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength]);
  return ref;
}

/* Single-line reveal — wrap text in overflow:hidden, child slides up */
interface LineRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}
export function LineReveal({ children, as: Tag = 'div', className = '', delay = 0 }: LineRevealProps) {
  const innerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } });
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="lr-wrap">
      <Tag ref={innerRef} className={`lr ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
        {children}
      </Tag>
    </div>
  );
}

interface ClapTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  [key: string]: unknown;
}

export function ClapText({ text, as: Tag = 'h2', className = '', ...rest }: ClapTextProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { ref.current!.classList.add('in'); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const parts: { text: string; emph: boolean; br?: boolean }[] = [];
  const re = /\n|\[\[(.+?)\]\]|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m[0] === '\n') { parts.push({ text: '', emph: false, br: true }); continue; }
    parts.push({ text: m[1] || m[2], emph: !!m[1] });
  }

  return (
    <Tag ref={ref} className={`clap ${className}`} {...rest}>
      {parts.map((p, i) => p.br
        ? <br key={i} />
        : (
        <span key={i}>
          <span className="w">
            {p.emph ? <em className="wi">{p.text}</em> : <span className="wi">{p.text}</span>}
          </span>
          {i < parts.length - 1 && !parts[i + 1]?.br ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

interface ShutterProps {
  children: ReactNode;
  label?: string;
  className?: string;
  aspect?: string;
}

export function Shutter({ children, label, className = '', aspect = '2.35 / 1' }: ShutterProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => ref.current && ref.current.classList.add('open'), 120);
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`shutter ${className}`} style={{ aspectRatio: aspect }}>
      {label && <div className="sh-meta">{label}</div>}
      {children}
    </div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  scale?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.12, scale = 1, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const py = -(center - window.innerHeight / 2) * speed;
        ref.current.style.setProperty('--py', `${py}px`);
        ref.current.style.setProperty('--ps', String(scale));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed, scale]);
  return <div ref={ref} className={`parallax ${className}`}>{children}</div>;
}

export function useRevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
