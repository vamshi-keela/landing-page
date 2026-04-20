import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ClapText } from './motion';

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const scale = useSpring(rawScale, { stiffness: 80, damping: 22, mass: 0.6 });
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <motion.section
      ref={sectionRef}
      id="cta"
      className="relative px-[clamp(24px,6vw,96px)] py-[clamp(120px,18vh,200px)] bg-[#050505] overflow-hidden"
      style={{ scale, opacity }}
    >
      {/* Decorative backgrounds */}
      <div className="final-bg"><div className="strips" /></div>

      {/* aperture class retained for blade's apertureSpin animation */}
      <div className="aperture absolute inset-0 pointer-events-none grid place-items-center z-[1] opacity-[0.55]" aria-hidden="true">
        <div className="blade" />
      </div>

      <div className="relative z-[2] max-w-[1200px] mx-auto text-left">
        <ClapText
          as="h2"
          text="Your next film is [[already written.]] Let's shoot it."
          className="font-display font-light text-[clamp(48px,8vw,140px)] leading-[0.92] tracking-[-0.035em] m-0 mb-9 max-w-[15ch] text-[#f2efea] [text-wrap:balance]"
        />

        <motion.div
          className="flex gap-4 items-center flex-wrap mb-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <a href="#" className="btn btn-primary">Talk to founders <span className="arrow">→</span></a>
          <a href="#" className="link-tertiary">Join Waitlist →</a>
        </motion.div>

        <motion.div
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-on-surface-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Rolling access · For production teams, Agencies and Creators
        </motion.div>
      </div>
    </motion.section>
  );
}
