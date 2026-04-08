import { motion } from "motion/react";
import { Sparkles, History as Timeline } from "lucide-react";
import scriptToVideoImg from "../../assets/images/script-to-video.jpeg";

const ScriptToVideo = () => (
  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10 sm:mb-12 md:mb-16"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold mb-3 sm:mb-4">Script-to-Video</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-primary-container to-transparent mb-6" />
      <p className="text-on-surface-variant max-w-xl">
        Deep semantic understanding turns your prose into frame-perfect scenes, automatically
        synchronized with cinematic timing.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 h-auto md:h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="md:col-span-8 relative overflow-hidden rounded-xl bg-surface-container-low group w-full max-md:aspect-video md:h-full md:-translate-x-4"
      >
        <img
          className="h-full w-full object-cover object-[center_42%] max-md:object-[center_48%] transition-all duration-1000"
          src={scriptToVideoImg}
          alt="Screenplay morphing"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8">
          <h3 className="text-xl sm:text-2xl font-headline font-bold mb-1.5 sm:mb-2">Automated Scene Synthesis</h3>
          <p className="text-on-surface-variant text-sm sm:text-base max-w-md">
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
          className="glass-card glow-border rounded-xl p-6 sm:p-8 flex flex-col justify-end relative overflow-hidden group"
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
          className="bg-surface-container-high glow-border rounded-xl p-6 sm:p-8 flex flex-col justify-end relative group"
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
