import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const tierVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};
const tierItem = {
  hidden: { opacity: 0, y: 52, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease } },
};

export function Pricing() {
  return (
    <section className="section low pricing" id="pricing">
      <div className="container">
        <motion.div
          className="head"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
        >
          <h2>Pricing that scales<br />with the production.</h2>
          <p className="body-lg" style={{ maxWidth: '42ch' }}>
            Free for the entire beta. Paid tiers roll out as production teams go live.
            Choose the shape of the crew you already have.
          </p>
        </motion.div>

        <motion.div
          className="tiers"
          variants={tierVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div className="tier" variants={tierItem}>
            <div className="kicker"><span>TIER 01</span><span>· CREATOR</span></div>
            <h3>Creator</h3>
            <p className="for">For indie filmmakers and solo creators shooting out of their own kit.</p>
            <div className="price">Free<sub>during beta</sub></div>
            <ul className="feat">
              <li>Up to 20 min of rendered output / mo</li>
              <li>Script-first editor + shot overrides</li>
              <li>Community continuity models</li>
              <li>Personal commercial licensing</li>
            </ul>
            <div className="cta-wrap"><a href="#" className="btn btn-ghost">Start free <span className="arrow">→</span></a></div>
          </motion.div>

          <motion.div className="tier featured" variants={tierItem}>
            <div className="kicker"><span>TIER 02</span><span>· STUDIO</span><span style={{ color: 'var(--on-surface-muted)' }}>· MOST CHOSEN</span></div>
            <h3>Studio</h3>
            <p className="for">For agencies and production teams shipping branded work on a clock.</p>
            <div className="price">Free<sub>during beta</sub></div>
            <ul className="feat">
              <li>Up to 10 hours of rendered output / mo</li>
              <li>Brand continuity memory + style locks</li>
              <li>Team workspaces, SSO, audit log</li>
              <li>Priority render lane + Slack support</li>
            </ul>
            <div className="cta-wrap"><a href="#" className="btn btn-primary">Start free <span className="arrow">→</span></a></div>
          </motion.div>

          <motion.div className="tier" variants={tierItem}>
            <div className="kicker"><span>TIER 03</span><span>· ENTERPRISE</span></div>
            <h3>Enterprise</h3>
            <p className="for">Custom infrastructure, API, and dedicated support for studios and streamers.</p>
            <div className="price">Custom<sub>talk to us</sub></div>
            <ul className="feat">
              <li>Unlimited rendered output, dedicated cluster</li>
              <li>Private continuity models + VPC option</li>
              <li>API, webhooks, pipeline integrations</li>
              <li>Named engineer + 24/7 support</li>
            </ul>
            <div className="cta-wrap"><a href="#" className="btn btn-ghost">Talk to sales <span className="arrow">→</span></a></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
