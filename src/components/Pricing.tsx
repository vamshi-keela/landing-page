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

function TierCard({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) {
  return (
    /* tier class retained for .tier.featured::before gradient-border pseudo-element */
    <motion.div
      className={`tier bg-surface-container rounded-[6px] p-8 flex flex-col min-h-[520px] relative transition-[transform,background,box-shadow] duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-container-high hover:-translate-y-[10px] hover:[box-shadow:0_40px_80px_-24px_rgba(0,0,0,0.7)] ${featured ? 'featured' : ''}`}
      variants={tierItem}
    >
      {children}
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section className="section low" id="pricing">
      <div className="container">
        <motion.div
          className="flex justify-between items-end gap-10 mb-14 max-md:flex-col max-md:items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
        >
          <h2 className="font-display font-light text-[clamp(36px,4.6vw,72px)] tracking-[-0.025em] m-0 max-w-[16ch] leading-[1.0]">
            Pricing that scales<br />with the production.
          </h2>
          <p className="body-lg max-w-[42ch]">
            Free for the entire beta. Paid tiers roll out as production teams go live.
            Choose the shape of the crew you already have.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1"
          variants={tierVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <TierCard>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary mb-[14px] flex gap-[10px] items-center">
              <span>TIER 01</span><span>· CREATOR</span>
            </div>
            <h3 className="font-display text-[36px] font-medium m-0 mb-[6px] tracking-[-0.015em]">Creator</h3>
            <p className="text-on-surface-variant text-[15px] leading-[1.5] m-0 mb-6 max-w-[32ch]">
              For indie filmmakers and solo creators shooting out of their own kit.
            </p>
            <div className="font-display text-[40px] font-light text-on-surface tracking-[-0.02em] mb-[6px]">
              Free<sub className="font-mono text-[11px] text-on-surface-muted tracking-[0.14em] uppercase align-middle ml-2">during beta</sub>
            </div>
            <ul className="list-none p-0 mt-6 flex flex-col gap-[14px] flex-1">
              {['Up to 20 min of rendered output / mo', 'Script-first editor + shot overrides', 'Community continuity models', 'Personal commercial licensing'].map(f => (
                <li key={f} className="text-[14px] text-on-surface-variant flex gap-3 leading-[1.5]">{f}</li>
              ))}
            </ul>
            <div className="mt-6"><a href="#" className="btn btn-ghost">Start free <span className="arrow">→</span></a></div>
          </TierCard>

          <TierCard featured>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary mb-[14px] flex gap-[10px] items-center">
              <span>TIER 02</span><span>· STUDIO</span><span className="text-on-surface-muted">· MOST CHOSEN</span>
            </div>
            <h3 className="font-display text-[36px] font-medium m-0 mb-[6px] tracking-[-0.015em]">Studio</h3>
            <p className="text-on-surface-variant text-[15px] leading-[1.5] m-0 mb-6 max-w-[32ch]">
              For agencies and production teams shipping branded work on a clock.
            </p>
            <div className="font-display text-[40px] font-light text-on-surface tracking-[-0.02em] mb-[6px]">
              Free<sub className="font-mono text-[11px] text-on-surface-muted tracking-[0.14em] uppercase align-middle ml-2">during beta</sub>
            </div>
            <ul className="list-none p-0 mt-6 flex flex-col gap-[14px] flex-1">
              {['Up to 10 hours of rendered output / mo', 'Brand continuity memory + style locks', 'Team workspaces, SSO, audit log', 'Priority render lane + Slack support'].map(f => (
                <li key={f} className="text-[14px] text-on-surface-variant flex gap-3 leading-[1.5]">{f}</li>
              ))}
            </ul>
            <div className="mt-6"><a href="#" className="btn btn-primary">Start free <span className="arrow">→</span></a></div>
          </TierCard>

          <TierCard>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary mb-[14px] flex gap-[10px] items-center">
              <span>TIER 03</span><span>· ENTERPRISE</span>
            </div>
            <h3 className="font-display text-[36px] font-medium m-0 mb-[6px] tracking-[-0.015em]">Enterprise</h3>
            <p className="text-on-surface-variant text-[15px] leading-[1.5] m-0 mb-6 max-w-[32ch]">
              Custom infrastructure, API, and dedicated support for studios and streamers.
            </p>
            <div className="font-display text-[40px] font-light text-on-surface tracking-[-0.02em] mb-[6px]">
              Custom<sub className="font-mono text-[11px] text-on-surface-muted tracking-[0.14em] uppercase align-middle ml-2">talk to us</sub>
            </div>
            <ul className="list-none p-0 mt-6 flex flex-col gap-[14px] flex-1">
              {['Unlimited rendered output, dedicated cluster', 'Private continuity models + VPC option', 'API, webhooks, pipeline integrations', 'Named engineer + 24/7 support'].map(f => (
                <li key={f} className="text-[14px] text-on-surface-variant flex gap-3 leading-[1.5]">{f}</li>
              ))}
            </ul>
            <div className="mt-6"><a href="#" className="btn btn-ghost">Talk to sales <span className="arrow">→</span></a></div>
          </TierCard>
        </motion.div>
      </div>
    </section>
  );
}
