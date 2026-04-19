import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useMagnetic } from './motion';
import React from 'react';
import noirImg from '../assets/hero/Noir.png';
import dramaImg from '../assets/hero/Drama set in 1950s.png';
import spaceportImg from '../assets/hero/colossal spaceport.png';
import templeImg from '../assets/hero/Ancient Temple.png';
import warriorImg from '../assets/hero/Warrior.png';

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
  { image: noirImg, slug: 'NIGHT CALL', scene: 'SC 12', genre: 'NOIR', tone: '01:12:04' },
  { image: dramaImg, slug: 'TRANSIT / 03', scene: 'SC 04', genre: 'DRAMA', tone: '00:41:22' },
  { image: spaceportImg, slug: 'THE LONG ROAD', scene: 'SC 28', genre: 'DRAMA', tone: '02:03:11' },
  { image: templeImg, slug: 'EVERY STREET', scene: 'SC 07', genre: 'DOC', tone: '00:18:43' },
  { image: warriorImg, slug: 'COPPER SUN', scene: 'SC 01', genre: 'COMMERCIAL', tone: '00:00:28' },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const magneticRef = useMagnetic(0.22) as React.RefObject<HTMLAnchorElement>;

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI(n => (n + 1) % HERO_REEL.length), 4200);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <header className="hero">
      {/* background reel — unchanged */}
      <div className="hero-reel" aria-hidden="true">
        {HERO_REEL.map((s, idx) => {
          const prev = (i - 1 + HERO_REEL.length) % HERO_REEL.length;
          const cls = idx === i ? 'active' : (idx === prev ? 'exit' : '');
          return (
            <div key={idx} className={`slide scrub ${cls}`}>
              <div className="still-v2">
                <div className="still-art">
                  <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="still-grain" />
                <div className="still-vignette" />
                <div className="still-slate">{s.slug ? `/ ${s.slug}` : ''}</div>
                <div className="still-meta">
                  <span className="dot" /><span>{s.scene}</span>
                  <span>·</span><span>{s.genre}</span>
                </div>
                <div className="still-meta tr"><span>{s.tone}</span></div>
              </div>
            </div>
          );
        })}
        <div className="overlay" />
        <div className="vig" />
      </div>

      {/* page-load stagger entrance */}
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="hero-label">
          AI Media Infrastructure
        </motion.div>

        <motion.h1 variants={item} className="hero-headline">
          Write your vision.<em>Watch it manifest.</em>
        </motion.h1>

        <motion.p variants={item} className="hero-sub">
          Upload a screenplay. Get a cinematic cut. Induce reads your script and
          generates every shot with continuity, composition, and directorial intent.
        </motion.p>

        <motion.div variants={item} className="hero-ctas">
          <a ref={magneticRef} href="#cta" className="btn btn-primary">
            Start free beta <span className="arrow">→</span>
          </a>
          <a href="#contact" className="btn btn-ghost">Book a demo</a>
        </motion.div>

        <motion.div variants={item} className="hero-note">
          For filmmakers, enterprises, and indie creators.
        </motion.div>
      </motion.div>

      {/* reel controls — unchanged */}
      <div className="reel-controls">
        <button onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause reel' : 'Play reel'}>
          {playing
            ? <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect width="3" height="12" fill="currentColor" /><rect x="7" width="3" height="12" fill="currentColor" /></svg>
            : <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M0 0 L10 6 L0 12 Z" fill="currentColor" /></svg>}
        </button>
        <div className="dots">
          {HERO_REEL.map((_, idx) => <div key={idx} className={`d ${idx === i ? 'on' : ''}`} onClick={() => setI(idx)} />)}
        </div>
        <div className="reel-timecode">REEL {String(i + 1).padStart(2, '0')} / {String(HERO_REEL.length).padStart(2, '0')} · {HERO_REEL[i].slug}</div>
      </div>

    </header>
  );
}
