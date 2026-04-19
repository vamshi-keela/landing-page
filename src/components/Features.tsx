import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shutter } from './motion';
import promptVid from '../assets/features/prompt efficiency video.mp4';
import memoryVid from '../assets/features/persistent memory.mp4';
import synthesisVid from '../assets/features/line-level-synthesis.mp4';
import cinematographyVid from '../assets/features/cinematography_video.mp4';
import directorVid from '../assets/features/director_video.mp4';

const ease = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  { n: 'Efficient', title: '5× prompting efficiency', body: '80% less prompting than legacy platforms. Upload your script, skip the prompt engineering. Induce handles the translation from story to screen.', meta: [['5×', 'less prompt overhead'], ['1', 'upload, one cut']], video: promptVid, reverse: false },
  { n: 'Agentic Memory', title: 'Persistent agentic memory', body: 'Your protagonist looks like your protagonist in every scene. Characters, wardrobe, locations, and mood persist across the entire timeline.', meta: [['∞', 'timeline continuity'], ['24+', 'character states']], video: memoryVid, reverse: true },
  { n: 'Scene Synthesis', title: 'Line-level scene synthesis', body: 'Every line of dialogue and every action cue becomes its own cinematic shot. Nothing gets flattened. Nothing gets glossed.', meta: [['L / L', 'line-to-shot'], ['0', 'compressed beats']], video: synthesisVid, reverse: false },
  { n: 'Cinematography', title: 'Autonomous cinematography', body: 'A virtual DP on every project. Agents compose framing, lensing, and blocking based on the emotional beat of each scene.', meta: [['DP', 'agent per project'], ['35mm', 'default stock']], video: cinematographyVid, reverse: true },
  { n: 'Shot Control', title: 'Director-grade shot control', body: 'Override any shot, angle, lighting, pacing, performance, without disrupting the continuity of surrounding scenes.', meta: [['Δ', 'local, not global'], ['01', 'shot at a time']], video: directorVid, reverse: false },
];

const textVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const lineVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

function FeatureItem({ f }: { f: (typeof FEATURES)[number] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <div ref={containerRef} className={`feature ${f.reverse ? 'reverse' : ''}`}>
      {/* scroll-driven parallax on the image */}
      <div className="f-still">
        <motion.div
          className="letterbox vignette"
          style={{ y: imgY, willChange: 'transform' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.2, ease }}
        >
          <Shutter label={`FEATURE / ${f.n}`}>
            <video
              src={f.video}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Shutter>
        </motion.div>
      </div>

      {/* stagger children for text */}
      <motion.div
        className="f-text"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={lineVariant} className="f-num">
          <span className="line" /> {f.n}
        </motion.div>
        <motion.h3 variants={lineVariant} className="f-title">{f.title}</motion.h3>
        <motion.p variants={lineVariant} className="f-body">{f.body}</motion.p>
        <motion.div variants={lineVariant} className="f-meta">
          {f.meta.map(([v, k], idx) => (
            <div className="m" key={idx}><b>{v}</b>{k}</div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Features() {
  return (
    <section className="section low" id="product">
      <div className="container">
        <motion.div
          className="features-head"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
        >
          <h2>Built like a <em>film crew.</em><br />Runs like infrastructure.</h2>
        </motion.div>

        {FEATURES.map(f => <FeatureItem key={f.n} f={f} />)}
      </div>
    </section>
  );
}
