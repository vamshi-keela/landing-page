import { motion } from "motion/react";
import { Sparkles, History as Timeline } from "lucide-react";

const ScriptToVideo = () => (
  <div className="max-w-7xl mx-auto px-8 w-full py-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Script-to-Video</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-primary-container to-transparent mb-6" />
      <p className="text-on-surface-variant max-w-xl">
        Deep semantic understanding turns your prose into frame-perfect scenes, automatically
        synchronized with cinematic timing.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="md:col-span-8 relative overflow-hidden rounded-xl bg-surface-container-low group h-[400px] md:h-full"
      >
        <img
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCg8WOkNS_N6C5LAt4XunB0DJ27TND4qN0bV7espg-uzSjO3vivUPusxv1kgDdouNUBLk9Pk3tQDRSAqHKWgSXRLB4_5cSHVCcJWwyIPqe7NNT9lF4hVbezCp4dOI2qqXm350yRvzDphOoCVV9P-uDG4LSEWSHBT5U98yrGdBIBeGWPynDf_VF46kAAifg5jxnHIatikY2IJr3iZAaaLtI4WzyArLYxVEvgEgYsBap3yvV-ZZ1mDfRf45KG9qK1WEPOxbIn-B3BYk"
          alt="Screenplay morphing"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <h3 className="text-2xl font-headline font-bold mb-2">Automated Scene Synthesis</h3>
          <p className="text-on-surface-variant max-w-md">
            Every line of dialogue and action description generates a distinct visual beat.
          </p>
        </div>
      </motion.div>

      <div className="md:col-span-4 grid grid-rows-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="glass-card glow-border rounded-xl p-8 flex flex-col justify-end relative overflow-hidden group"
        >
          <Sparkles className="text-primary-container mb-4 group-hover:scale-110 transition-transform" size={40} />
          <h3 className="text-xl font-headline font-bold mb-2">Neural Composition</h3>
          <p className="text-sm text-on-surface-variant">
            AI-driven framing based on classic cinematography principles.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="bg-surface-container-high glow-border rounded-xl p-8 flex flex-col justify-end relative group"
        >
          <div className="absolute top-0 right-0 p-4">
            <span className="text-xs font-label text-primary-container tracking-widest uppercase">
              Live Process
            </span>
          </div>
          <Timeline className="text-primary-container mb-4 group-hover:rotate-12 transition-transform" size={40} />
          <h3 className="text-xl font-headline font-bold mb-2">Rhythmic Pacing</h3>
          <p className="text-sm text-on-surface-variant">
            Intelligent cutting that respects the emotional arc of your script.
          </p>
        </motion.div>
      </div>
    </div>
  </div>
);

export default ScriptToVideo;
