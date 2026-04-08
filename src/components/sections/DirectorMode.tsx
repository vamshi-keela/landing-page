import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Lightbulb, Video } from "lucide-react";
import costelloVideo from "../../assets/images/costello.mp4";

const FEATURES = [
  { icon: Lightbulb, title: "Atmospheric Lighting", desc: "Control global illumination and volumetric fog.", delay: 0.2 },
  { icon: Video, title: "Virtual Cinematography", desc: "Define lens focal lengths and complex crane paths.", delay: 0.4 },
] as const;

const DirectorMode = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.15, once: true });

  return (
    <div
      ref={sectionRef}
      className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-stretch sm:items-center gap-8 sm:gap-10 md:gap-20 px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full md:w-1/2 order-2 md:order-1"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-1000" />
          <div className="relative bg-surface-container-high rounded-xl overflow-hidden aspect-video shadow-2xl">
            <video
              className="w-full h-full object-cover"
              src={costelloVideo}
              muted
              playsInline
              loop
              autoPlay
              aria-label="Director dashboard preview"
            />
            <motion.div
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 pointer-events-none"
            >

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

      <div className="w-full md:w-1/2 order-1 md:order-2">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="font-label text-primary-container tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-5 md:mb-6 block text-xs sm:text-sm"
        >
          Master Your Vision
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl font-headline font-bold mb-5 sm:mb-6 md:mb-8 leading-[1.15] sm:leading-tight"
        >
          Director Mode:<br />Absolute Control
        </motion.h2>
        <div className="space-y-4 sm:space-y-5 md:space-y-8">
          {FEATURES.map(({ icon: Icon, title, desc, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay }}
              className="flex gap-4 sm:gap-6 group cursor-default"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-all duration-300">
                <Icon className="text-primary-container group-hover:text-on-primary-container transition-colors size-[22px] sm:size-6" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="font-headline font-bold text-lg sm:text-xl mb-1.5 sm:mb-2">{title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DirectorMode;
