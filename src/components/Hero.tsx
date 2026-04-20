import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useMagnetic } from './motion';
import React from 'react';
import noirImg from '../assets/hero/Noir.png';
import dramaImg from '../assets/hero/Drama set in 1950s.png';
import spaceportImg from '../assets/hero/colossal spaceport.png';
import templeImg from '../assets/hero/Ancient Temple.png';
import warriorImg from '../assets/hero/Warrior.png';
import { FOUNDERS_CALENDLY_URL } from '../constants';
import WaitlistModal from './WaitListModal';

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

const HERO_REEL = [
  { image: noirImg, slug: 'VINTAGE CAR', scene: 'SC 12', genre: 'NOIR', tone: '01:12:04' },
  { image: dramaImg, slug: 'MAN IN A BAR', scene: 'SC 04', genre: 'DRAMA', tone: '00:41:22' },
  { image: spaceportImg, slug: 'COLOSSAL SPACEPORT', scene: 'SC 28', genre: 'DRAMA', tone: '02:03:11' },
  { image: templeImg, slug: 'ANCIENT TEMPLE', scene: 'SC 07', genre: 'DOC', tone: '00:18:43' },
  { image: warriorImg, slug: 'WARRIOR', scene: 'SC 01', genre: 'COMMERCIAL', tone: '00:00:28' },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const magneticRef = useMagnetic(0.22) as React.RefObject<HTMLAnchorElement>;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI(n => (n + 1) % HERO_REEL.length), 4200);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <header className="relative min-h-screen px-[clamp(24px,6vw,96px)] pt-[140px] pb-24 flex flex-col justify-end overflow-hidden bg-black">

      {/* Background reel — slide states toggled by CSS via .scrub/.active/.exit */}
      <div className="hero-reel absolute inset-0" aria-hidden="true">
        {HERO_REEL.map((s, idx) => {
          const prev = (i - 1 + HERO_REEL.length) % HERO_REEL.length;
          const cls = idx === i ? 'active' : (idx === prev ? 'exit' : '');
          return (
            <div key={idx} className={`slide scrub ${cls}`}>
              {/* still-art class retained for CSS hover zoom via .letterbox:hover .still-art */}
              <div className="absolute inset-0 overflow-hidden bg-black">
                <div className="still-art absolute inset-0 scale-[1.06] transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(.2,.7,.2,1)] will-change-transform">
                  <img src={s.image} alt="" className="block w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
                  style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")", backgroundSize: '180px 180px' }} />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7)_100%)]" />
                <div className="absolute top-[14px] left-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(226,226,226,0.7)] z-[3]">
                  {s.slug ? `/ ${s.slug}` : ''}
                </div>
                <div className="absolute bottom-[14px] left-4 z-[3] font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(226,226,226,0.75)] flex gap-[10px] items-center">
                  <span className="w-[6px] h-[6px] bg-primary rounded-full inline-block [box-shadow:0_0_10px_var(--color-primary)] [animation:pulseDot_1.8s_ease-in-out_infinite]" />
                  <span>{s.scene}</span>
                  <span>·</span>
                  <span>{s.genre}</span>
                </div>
              </div>
            </div>
          );
        })}
        {/* Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.2)_40%,rgba(10,10,10,0.85)_85%,rgba(10,10,10,1)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Page-load stagger entrance */}
      <motion.div
        className="relative z-[2] max-w-[1440px] mx-auto w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="hero-headline inline-flex items-center gap-[10px] font-mono text-[11px] tracking-[0.22em] uppercase text-primary mb-7"
        >
          AI Media Infrastructure
        </motion.div>

        <motion.h1
          variants={item}
          className="hero-headline font-display font-light text-[clamp(48px,8vw,120px)] leading-[0.92] tracking-[-0.035em] text-[#f2efea] m-0 mb-7 max-w-[15ch] [text-wrap:balance]"
        >
          Write your vision.<em className="italic font-light text-primary">Watch it manifest.</em>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-[clamp(17px,1.3vw,20px)] text-on-surface max-w-[52ch] m-0 mb-10 leading-[1.5] font-light opacity-[0.86] [text-wrap:pretty]"
        >
          Upload a screenplay. Get a cinematic cut. Induce reads your script and
          generates every shot with continuity, composition, and directorial intent.
        </motion.p>

        <motion.div variants={item} className="flex gap-[14px] flex-wrap items-center">
          <a ref={magneticRef} href={FOUNDERS_CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Talk to founders <span className="arrow">→</span>
          </a>
          <button
            onClick={() => setIsModalOpen(true)}>
            Join Waitlist
          </button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-5 font-mono text-[11px] tracking-[0.1em] text-on-surface-muted uppercase"
        >
          For filmmakers, enterprises, and indie creators.
        </motion.div>
      </motion.div>

      {/* Reel controls */}
      <div className="absolute bottom-[22px] left-[clamp(24px,6vw,96px)] z-[3] flex items-center gap-4 font-mono text-[10px] tracking-[0.18em] text-on-surface-variant uppercase">
        <button
          onClick={() => setPlaying(p => !p)}
          aria-label={playing ? 'Pause reel' : 'Play reel'}
          className="bg-[rgba(255,255,255,0.06)] [backdrop-filter:blur(14px)] border border-[rgba(255,255,255,0.12)] text-on-surface w-[34px] h-[34px] rounded-full cursor-pointer grid place-items-center"
        >
          {playing
            ? <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect width="3" height="12" fill="currentColor" /><rect x="7" width="3" height="12" fill="currentColor" /></svg>
            : <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M0 0 L10 6 L0 12 Z" fill="currentColor" /></svg>}
        </button>
        <div className="flex gap-[6px]">
          {HERO_REEL.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setI(idx)}
              className={`w-[18px] h-[2px] cursor-pointer transition-colors duration-300 ${idx === i ? 'bg-primary' : 'bg-[rgba(255,255,255,0.18)]'}`}
            />
          ))}
        </div>
        <div className="text-on-surface-muted">
          REEL {String(i + 1).padStart(2, '0')} / {String(HERO_REEL.length).padStart(2, '0')} · {HERO_REEL[i].slug}
        </div>
      </div>
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}
