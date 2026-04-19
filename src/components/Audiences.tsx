import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import filmmakersVid from '../assets/built for everyone/filmmakers.mp4';
import agenciesVid from '../assets/built for everyone/Agencies and enterprises.mp4';
import creatorsVid from '../assets/built for everyone/creators.mp4';

const ease = [0.16, 1, 0.3, 1] as const;

const AUDIENCES = [
  { title: 'Filmmakers', video: filmmakersVid },
  { title: 'Agencies & enterprises', video: agenciesVid },
  { title: 'Creators', video: creatorsVid },
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
        if (entry.isIntersecting) el.play().catch(() => { });
        else el.pause();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (!isMobile) videoRef.current?.play().catch(() => { });
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (!isMobile) {
      const v = videoRef.current;
      if (v) { v.pause(); v.currentTime = 0; }
    }
  };

  return (
    <motion.div
      className={`aud-card${hovered ? ' is-hovered' : ''}`}
      variants={cardVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aud-media">
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
          className="aud-video"
        />
        <div className="aud-scrim" />
        <div className="aud-overlay">
          <span className="aud-index">{String(index + 1).padStart(2, '0')}</span>
          <div className="aud-bottom">
            <h3 className="aud-title">{title}</h3>
            <span className="aud-cta">Explore →</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Audiences() {
  return (
    <section className="audiences section" id="solutions">
      <div className="container">
        <motion.div
          className="head"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
        >
          <h2>Built for Everyone.</h2>
        </motion.div>

        <motion.div
          className="aud-grid"
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
