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
      className="final"
      id="cta"
      style={{ scale, opacity }}
    >
      <div className="bg"><div className="strips" /></div>
      <div className="aperture" aria-hidden="true"><div className="blade" /></div>

      <div className="content">

        <ClapText as="h2" text="Your next film is [[already written.]] Let's shoot it." />

        <motion.div
          className="ctas"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <a href="#" className="btn btn-primary">Start free beta <span className="arrow">→</span></a>
          <a href="#" className="link-tertiary">Talk to our team →</a>
        </motion.div>

        <motion.div
          className="note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Rolling access · Priority for production teams and agencies
        </motion.div>
      </div>
    </motion.section>
  );
}
