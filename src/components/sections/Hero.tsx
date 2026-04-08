import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FOUNDERS_CALENDLY_URL, Z_INDEX } from '../../utils/constants';
import WaitlistModal from './WaitListModal';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      ref={sectionRef}
      style={{ zIndex: Z_INDEX.hero }}
      className='relative h-screen flex items-center justify-center overflow-hidden bg-surface-container-lowest'
    >
      <motion.div style={{ scale: imgScale }} className='absolute inset-0 z-0'>
        <img
          className='w-full h-full object-cover opacity-70 '
          src='https://lh3.googleusercontent.com/aida-public/AB6AXuDDeRkSqx9zZOmkV1oYaNwnk5ytaV5A-l26ZhXBJQPvmISb1OHsV10NgWL_G0v5hxVi5zJYroGdxOtWPsCUBLlPIceJPbYSFDNqtDswaOuP10HWq22Ei2crwcJIwk_SwgtRsQ3YkrTmNfFFn2wFY2e9Q9TdXNoUYz1WSQsc86qgDd6kx_f4Jgegmy-Z2SFpBdhXaWU4UXXAO82ZL67SiiLCydXYn3MSFFyjs2M3eMnM76e5SrEOMIe-Pt7N4KBkRmpAxjKKWyluBM4'
          alt='Cinematic studio'
          referrerPolicy='no-referrer'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-surface-container-lowest/60 to-surface-container-lowest' />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className='relative z-10 max-w-7xl mx-auto px-8 text-center'
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-outline-variant/30 bg-surface-container-low/50 backdrop-blur-md mb-8'
        >
          <span className='w-2 h-2 rounded-full bg-primary-container animate-pulse' />
          <span className='text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant'>
            The AI Media Infrastructure
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className='text-6xl md:text-8xl font-headline font-bold tracking-tighter mb-8 leading-[0.9] text-on-surface'
        >
          Write your vision.
          <br />
          <span className='shimmer-text'>Watch it manifest.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed'
        >
          Translate raw script data into hyper-realistic cinematic experiences.
          Script-to-video technology meets granular directorial control.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='flex flex-col md:flex-row items-center justify-center gap-6'
        >
          <a
            href={FOUNDERS_CALENDLY_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-primary-container text-on-primary-container px-10 py-5 rounded-full font-headline font-bold text-lg tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 group inline-flex items-center justify-center gap-3 shadow-2xl shadow-primary-container/40'
          >
            Talk To Founders
            <ArrowRight className='group-hover:translate-x-1 transition-transform' />
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className='glass-card text-on-surface px-10 py-5 rounded-full font-headline font-bold text-lg tracking-wide hover:bg-on-surface/5 hover:scale-105 active:scale-95 transition-all cursor-pointer'
          >
            Join Waitlist
          </button>
        </motion.div>
      </motion.div>
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
