import { useState } from 'react';

const FAQS = [
  { q: 'What script formats does Induce support?', a: 'Final Draft (.fdx), PDF, Fountain, and direct paste. Slug lines, parentheticals, dual-dialogue, and action blocks are parsed natively. If your script has production annotations. shot numbers, scene tags, camera notes — Induce keeps them and uses them.' },
  { q: 'How does continuity work across scenes?', a: 'Every character, location, wardrobe, prop, and mood lives in a persistent memory graph that the whole timeline reads from. Make a change on page one and the cut updates downstream. it doesn\'t re-roll every shot from scratch.' },
  { q: 'Can I control individual shots?', a: 'Yes. Any shot can be overridden — angle, lens, lighting, pacing, performance — without disturbing the surrounding cut. Overrides read as notes to the system, not full re-prompts.' },
  { q: 'Is there an API?', a: 'Yes. A REST API and SDKs for Node and Python let you drop Induce into an existing pipeline. Webhooks for render completion, status, and continuity events. Read the Developer docs for the full surface.' },
  { q: 'Who owns the content I generate?', a: 'You do. Full commercial licensing on every tier. Generated frames, cuts, and the underlying continuity model for your project stay yours — no training rights, no hidden carveouts.' },
  { q: 'How is Induce different from other AI video tools?', a: 'Most AI video is a prompt box wrapped in a UI. Induce is a script-first pipeline — breakdown, continuity, shot control, API — built for teams that ship. It\'s infrastructure, not a text-to-video toy.' },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="resources">
      <div className="container">
        <div className="head reveal">
          <div>
            <p className="label-mono">— Questions</p>
            <h2 style={{ marginTop: 18 }}>Asked &amp;<br />answered.</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="q">
                  <h4>{f.q}</h4>
                  <span className="plus">+</span>
                </div>
                <div className="a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
