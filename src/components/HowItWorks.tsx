import { useEffect, useRef, useState } from 'react';
import { ClapText, Shutter } from './motion';
import { Still } from './scenes';

const HOW_STEPS = [
  {
    n: '01', k: 'Ingest',
    title: 'Upload your [[script.]]',
    body: 'FDX, PDF, Fountain, or paste directly. Induce handles formatting, slug lines, dual-dialogue, and every production annotation.',
    meta: '.FDX · .PDF · .FOUNTAIN',
    render: () => (
      <div className="absolute inset-0 bg-[#0a0604] p-6">
        <div className="font-mono text-[13px] leading-[1.75] text-on-surface-variant">
          <div className="text-primary text-[11px] tracking-[0.18em] uppercase mb-2">INT. WAREHOUSE — DAY</div>
          <div className="text-on-surface-muted italic">Dust in shafts of light. Silence like a held breath.</div>
          <div className="text-on-surface mt-4 ml-[60px]">JUNO <span className="text-on-surface-muted">(V.O.)</span></div>
          <div className="ml-[30px]">We never came here twice.</div>
          <div className="text-on-surface-muted italic mt-[14px]">A door slides open on its runners.</div>
          <div className="text-primary text-[11px] tracking-[0.18em] uppercase mt-4">EXT. LOT — CONTINUOUS</div>
          <div className="text-on-surface-muted italic">She stands in the frame of light.</div>
        </div>
      </div>
    ),
  },
  {
    n: '02', k: 'Breakdown',
    title: 'Induce [[breaks it]] down.',
    body: 'Scenes, shots, character cards, location plates, and a live continuity map. Every beat gets a frame. Every frame gets an intent.',
    meta: 'SCENES · SHOTS · MAP',
    render: () => (
      <div className="absolute inset-0 p-[18px] grid [grid-template-columns:repeat(3,1fr)] [grid-template-rows:repeat(2,1fr)] gap-[10px] bg-[#0a0604]">
        {(['warehouse', 'noir_street', 'diner', 'dawn', 'train', 'harbor'] as const).map((kind, i) => (
          <div key={i} className="relative overflow-hidden rounded-[3px] bg-black">
            <Still kind={kind} slug={`S${String(i + 1).padStart(2, '0')}`} sid={`bd-${i}`} />
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '03', k: 'Assembly',
    title: 'Review, refine, [[export.]]',
    body: 'Scrub a first cut in minutes. Override any shot — angle, lens, pacing, performance — without breaking continuity. Export at full fidelity.',
    meta: 'PREVIEW · OVERRIDE · EXPORT · REAL-TIME',
    render: () => (
      <div className="absolute inset-0 bg-black">
        <Still kind="final_cut" sid="fc-as" />
      </div>
    ),
  },
];

export function HowItWorks() {
  const wrapRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      const seg = Math.min(HOW_STEPS.length - 1, Math.floor(p * HOW_STEPS.length * 0.999));
      setActive(seg);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const step = HOW_STEPS[active];

  return (
    <section className="relative h-[320vh]" ref={wrapRef}>
      <div className="sticky top-0 h-screen grid place-items-center overflow-hidden bg-surface-lowest">
        <div className="w-[min(1200px,92vw)] grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1">
          <div>
            <Shutter aspect="2.35 / 1">
              {/* how-stage class retained for .how-stage .layer / .layer.on CSS rules */}
              <div className="how-stage absolute inset-0">
                {HOW_STEPS.map((s, i) => (
                  <div key={i} className={`layer ${i === active ? 'on' : ''}`}>
                    {s.render()}
                  </div>
                ))}
              </div>
            </Shutter>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase flex items-center gap-3 mb-[22px]">
              <span className="w-8 h-px bg-primary" /> STEP {step.n} — {step.k}
            </div>
            <ClapText as="h3" text={step.title} />
            <p className="text-on-surface-variant text-[clamp(16px,1.2vw,18px)] leading-[1.55] max-w-[44ch] m-0 mb-6">
              {step.body}
            </p>

            {/* how-progress class retained for .how-progress .seg.on .fill CSS rule */}
            <div className="how-progress flex gap-2 mt-9">
              {HOW_STEPS.map((_, i) => (
                <div key={i} className={`seg flex-1 h-[2px] bg-surface-container-high relative overflow-hidden ${i <= active ? 'on' : ''}`}>
                  <div className="fill" />
                </div>
              ))}
            </div>

            <div className="mt-[10px] flex justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-on-surface-muted">
              <span>01 · Ingest</span>
              <span>02 · Breakdown</span>
              <span>03 · Assembly</span>
            </div>

            <div className="mt-8 font-mono text-[10px] tracking-[0.18em] uppercase text-on-surface-muted">
              {step.meta}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
