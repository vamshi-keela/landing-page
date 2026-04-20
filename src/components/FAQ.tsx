import { useState } from 'react';

const FAQS = [
  { q: 'What script formats does Induce support?', a: 'Final Draft (.fdx), PDF, Fountain, and direct paste. Slug lines, parentheticals, dual-dialogue, and action blocks are parsed natively. If your script has production annotations. shot numbers, scene tags, camera notes — Induce keeps them and uses them.' },
  { q: 'How does continuity work across scenes?', a: "Every character, location, wardrobe, prop, and mood lives in a persistent memory graph that the whole timeline reads from. Make a change on page one and the cut updates downstream. it doesn't re-roll every shot from scratch." },
  { q: 'Can I control individual shots?', a: 'Yes. Any shot can be overridden — angle, lens, lighting, pacing, performance — without disturbing the surrounding cut. Overrides read as notes to the system, not full re-prompts.' },
  { q: 'Is there an API?', a: 'Yes. A REST API and SDKs for Node and Python let you drop Induce into an existing pipeline. Webhooks for render completion, status, and continuity events. Read the Developer docs for the full surface.' },
  { q: 'Who owns the content I generate?', a: 'You do. Full commercial licensing on every tier. Generated frames, cuts, and the underlying continuity model for your project stay yours — no training rights, no hidden carveouts.' },
  { q: 'How is Induce different from other AI video tools?', a: "Most AI video is a prompt box wrapped in a UI. Induce is a script-first pipeline — breakdown, continuity, shot control, API — built for teams that ship. It's infrastructure, not a text-to-video toy." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="resources">
      <div className="container">
        <div className="grid [grid-template-columns:1fr_1.4fr] gap-20 items-start mb-14 reveal max-lg:grid-cols-1 max-lg:gap-6">
          <div>
            <p className="label-mono">— Questions</p>
            <h2 className="font-display font-light text-[clamp(36px,4.6vw,72px)] tracking-[-0.025em] m-0 mt-[18px] leading-[1.0]">
              Asked &amp;<br />answered.
            </h2>
          </div>

          {/* faq-item / open classes drive the answer expand + plus rotation via CSS */}
          <div className="flex flex-col">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className={`faq-item py-[26px] cursor-pointer relative ${i > 0 ? '[box-shadow:inset_0_1px_0_var(--color-outline-variant)]' : ''} ${open === i ? 'open' : ''}`}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <div className="q flex justify-between gap-8 items-center">
                  <h4 className="font-display text-[clamp(18px,1.8vw,26px)] font-normal tracking-[-0.01em] m-0 transition-colors duration-[240ms] leading-[1.3] [text-wrap:balance]">
                    {f.q}
                  </h4>
                  <span className="plus font-mono text-on-surface-variant text-[22px] transition-[transform,color] duration-[340ms] shrink-0">+</span>
                </div>
                <div className="a max-h-0 overflow-hidden transition-[max-height,padding,opacity] duration-[400ms] ease-out opacity-0">
                  <p className="m-0 max-w-[72ch] text-on-surface-variant leading-[1.6] text-[15px]">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
