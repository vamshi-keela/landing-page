import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Lightbulb, Video, Play } from "lucide-react";

const FEATURES = [
  { icon: Lightbulb, title: "Atmospheric Lighting", desc: "Control global illumination and volumetric fog.", delay: 0.2 },
  { icon: Video, title: "Virtual Cinematography", desc: "Define lens focal lengths and complex crane paths.", delay: 0.4 },
] as const;

const DirectorMode = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4, once: true });

  return (
    <div
      ref={sectionRef}
      className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row items-center gap-20 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:w-1/2 order-2 md:order-1"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-1000" />
          <div className="relative bg-surface-container-high rounded-xl overflow-hidden aspect-video shadow-2xl">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrZmAU28DFyqAIEeTWfGYO9K5roKXXFLa9hq_GQ0T_AqMhHvDloEpCFV4UykqvjDfBxlLHwFecOlWEjcmxXqKQqEt3LXApepD6K4-Eqq38dYNwm_rhh680u8ccqDUT8nC0psJtHXLz83IcXu2un-NM33LSZY2aImOZUNJ1OdudB54iZvAKQ759ge_hkfDydxI8UmwOo5AZYXKXNIb78Q9wnjSBSkbk-Bdho6GjxYp5jMrcWXg-KvzCZjHH4Y8SeIITu08EW4X-PFQ"
              alt="Director dashboard"
              referrerPolicy="no-referrer"
            />
            <motion.div
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur rounded text-[10px] font-mono border border-primary-container/30">
                REC <span className="text-primary-container animate-pulse">●</span> 00:04:12:15
              </div>
              <svg className="absolute inset-0 w-full h-full stroke-primary-container/20 stroke-1 fill-none">
                <motion.rect
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: inView ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  height="80%" width="80%" x="10%" y="10%"
                />
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: inView ? 1 : 0 }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                  x1="50%" x2="50%" y1="0" y2="100%"
                />
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: inView ? 1 : 0 }}
                  transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                  x1="0" x2="100%" y1="50%" y2="50%"
                />
              </svg>
            </motion.div>
            {/* <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm hover:scale-110 active:scale-90 transition-transform">
                <Play className="text-primary-container fill-primary-container" size={32} />
              </button>
            </div> */}
          </div>
        </div>
      </motion.div>

      <div className="md:w-1/2 order-1 md:order-2">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-label text-primary-container tracking-[0.3em] uppercase mb-6 block"
        >
          Master Your Vision
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-headline font-bold mb-8 leading-tight"
        >
          Director Mode:<br />Absolute Control
        </motion.h2>
        <div className="space-y-8">
          {FEATURES.map(({ icon: Icon, title, desc, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay }}
              className="flex gap-6 group cursor-default"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-all duration-300">
                <Icon className="text-primary-container group-hover:text-on-primary-container transition-colors" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-xl mb-2">{title}</h4>
                <p className="text-on-surface-variant text-sm">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DirectorMode;
