import { motion } from "motion/react";
import { Z_INDEX } from "../../utils/constants";

const FinalCta = () => (
  <section
    style={{ zIndex: Z_INDEX.footer - 10 }}
    className="relative py-40 bg-surface px-8"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-container/10 to-transparent" />
      <h2 className="text-5xl font-headline font-bold mb-8">Ready to take the chair?</h2>
      <p className="text-on-surface-variant text-lg mb-12 max-w-lg mx-auto">
        Join the elite rank of AI directors and bring your untold stories to life today.
      </p>
      <button className="bg-primary-container text-on-primary-container px-12 py-5 rounded-full font-headline font-bold text-xl tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary-container/30">
        Join waitlist
      </button>
    </motion.div>
  </section>
);

export default FinalCta;
