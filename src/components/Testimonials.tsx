import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export function Testimonials() {
  return (
    <section className="section testi">
      <div className="container">
        {/* hero quote: scale + fade */}
        <motion.div
          className="hero-quote"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease }}
        >
          <motion.div
            className="mark"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.1 }}
          >
            "
          </motion.div>
          <div>
            <blockquote>
              We moved from script to first cut in an afternoon. The continuity just — held.
            </blockquote>
            <div className="attr">
              <span className="name">— A. Okafor</span>
              <span>·</span>
              <span>Director</span>
              <span>·</span>
              <span>Halflight Studio</span>
            </div>
          </div>
        </motion.div>

        {/* small cards: stagger */}
        <motion.div
          className="small-quotes"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div className="small" variants={cardItem}>
            <p>"The shot overrides feel like notes to an editor who actually listens. Nothing else downstream breaks."</p>
            <div className="who"><span className="nm">M. Reyes</span>Creative Director · Meridian/Co</div>
          </motion.div>
          <motion.div className="small" variants={cardItem}>
            <p>"We ran forty variants of a hero spot on-brand in a day. It would have been a month in the old pipeline."</p>
            <div className="who"><span className="nm">K. Ström</span>Head of Production · Northlight</div>
          </motion.div>
          <motion.div className="small" variants={cardItem}>
            <p>"The API dropped into our stack cleanly. It's the first AI video tool I've trusted past previs."</p>
            <div className="who"><span className="nm">D. Chen</span>VP Engineering · Caldera</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
