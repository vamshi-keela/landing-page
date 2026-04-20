import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import filmmakersVid from '../assets/built for everyone/filmmakers.mp4';
import agenciesVid from '../assets/built for everyone/Agencies and enterprises.mp4';
import creatorsVid from '../assets/built for everyone/creators.mp4';

const ease = [0.16, 1, 0.3, 1] as const;

const AUDIENCES = [
  { title: 'Filmmakers',            video: filmmakersVid },
  { title: 'Agencies & enterprises', video: agenciesVid   },
  { title: 'Creators',              video: creatorsVid   },
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

function AudCard({ title, video, index }: { title: string; video: string; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isMobile || !videoRef.current) return;
    const el = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (!isMobile) videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (!isMobile) {
      const v = videoRef.current;
      if (v) { v.pause(); v.currentTime = 0; }
    }
  };

  return (
    /* aud-card + is-hovered classes drive video scale + cta reveal via CSS */
    <motion.div
      className={`aud-card relative overflow-hidden cursor-pointer rounded${hovered ? ' is-hovered' : ''}`}
      variants={cardVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative [aspect-ratio:3/4] overflow-hidden bg-[#080808] max-lg:[aspect-ratio:4/5]">
        {/* aud-video class retained for .aud-card.is-hovered .aud-video CSS rule */}
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
          className="aud-video w-full h-full object-cover block transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.3)_45%,rgba(0,0,0,0.08)_100%)] pointer-events-none" />
        <div className="absolute inset-0 flex flex-col justify-between p-5 pb-7 pointer-events-none">
          <span className="font-mono text-[11px] tracking-[0.18em] text-[rgba(255,255,255,0.45)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-[10px]">
            <h3 className="font-display font-normal text-[clamp(22px,2.2vw,32px)] tracking-[-0.02em] m-0 text-white leading-[1.1]">
              {title}
            </h3>
            {/* aud-cta class retained for .aud-card.is-hovered .aud-cta CSS rule */}
            <span className="aud-cta font-mono text-[11px] tracking-[0.14em] text-primary">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Audiences() {
  return (
    <section className="section" id="solutions">
      <div className="container">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
        >
          <h2 className="font-display font-light text-[clamp(36px,4.6vw,72px)] tracking-[-0.025em] leading-[1.0] m-0 max-w-[14ch]">
            Built for Everyone.
          </h2>
        </motion.div>

        {/* aud-grid class retained for responsive scroll-snap override in CSS */}
        <motion.div
          className="aud-grid grid grid-cols-3 gap-[2px] max-lg:flex max-lg:flex-row max-lg:overflow-x-auto"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {AUDIENCES.map((a, i) => (
            <AudCard key={i} index={i} title={a.title} video={a.video} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
