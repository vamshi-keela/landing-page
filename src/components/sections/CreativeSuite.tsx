import { motion } from "motion/react";
import { Network as Hub, Code, Shield } from "lucide-react";

const FEATURES = [
  { icon: Hub, title: "Multi-User Directing", desc: "Collaborate in real-time on renderings.", delay: 0.1 },
  { icon: Code, title: "API Access", desc: "Integrate directly into your production pipeline.", delay: 0.2 },
  { icon: Shield, title: "Ethical AI Guardrails", desc: "Enterprise-grade security and copyright safety.", delay: 0.3 },
] as const;

const CreativeSuite = () => (
  <div className="max-w-7xl mx-auto px-8 w-full py-20">
    <div className="text-center mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl font-headline font-bold mb-6"
      >
        The Creative Suite
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-on-surface-variant max-w-2xl mx-auto"
      >
        Scale your production with enterprise-grade collaboration tools designed for global studios.
      </motion.p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {FEATURES.map(({ icon: Icon, title, desc, delay }) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="p-10 rounded-2xl bg-surface-container-low border border-outline-variant/10 glow-border flex flex-col items-center text-center group"
        >
          <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Icon className="text-primary-container" size={32} />
          </div>
          <h3 className="text-2xl font-headline font-bold mb-4">{title}</h3>
          <p className="text-on-surface-variant text-sm">{desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default CreativeSuite;
