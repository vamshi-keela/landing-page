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
      <div style={{ position: 'absolute', inset: 0, background: '#0a0604', padding: '24px' }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, lineHeight: 1.75, color: 'var(--on-surface-variant)' }}>
          <div style={{ color: 'var(--primary)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 8 }}>INT. WAREHOUSE — DAY</div>
          <div style={{ color: 'var(--on-surface-muted)', fontStyle: 'italic' }}>Dust in shafts of light. Silence like a held breath.</div>
          <div style={{ color: 'var(--on-surface)', marginTop: 16, marginLeft: 60 }}>JUNO <span style={{ color: 'var(--on-surface-muted)' }}>(V.O.)</span></div>
          <div style={{ marginLeft: 30 }}>We never came here twice.</div>
          <div style={{ color: 'var(--on-surface-muted)', fontStyle: 'italic', marginTop: 14 }}>A door slides open on its runners.</div>
          <div style={{ color: 'var(--primary)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 16 }}>EXT. LOT — CONTINUOUS</div>
          <div style={{ color: 'var(--on-surface-muted)', fontStyle: 'italic' }}>She stands in the frame of light.</div>
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
      <div style={{ position: 'absolute', inset: 0, padding: 18, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(2,1fr)', gap: 10, background: '#0a0604' }}>
        {(['warehouse', 'noir_street', 'diner', 'dawn', 'train', 'harbor'] as const).map((kind, i) => (
          <div key={i} style={{ position: 'relative', overflow: 'hidden', borderRadius: 3, background: '#000' }}>
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
      <div style={{ position: 'absolute', inset: 0, background: '#000' }}>
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
    <section className="how-pinned" ref={wrapRef}>
      <div className="how-sticky">
        <div className="how-frame">
          <div className="panel">
            <Shutter label={`REEL / ${step.k.toUpperCase()} — STEP ${step.n}`} aspect="2.35 / 1">
              <div className="how-stage">
                {HOW_STEPS.map((s, i) => (
                  <div key={i} className={`layer ${i === active ? 'on' : ''}`}>
                    {s.render()}
                  </div>
                ))}
              </div>
            </Shutter>
          </div>
          <div className="how-text">
            <div className="step-n"><span className="bar" /> STEP {step.n} — {step.k}</div>
            <ClapText as="h3" text={step.title} />
            <p>{step.body}</p>
            <div className="how-progress">
              {HOW_STEPS.map((_, i) => (
                <div key={i} className={`seg ${i <= active ? 'on' : ''}`}>
                  <div className="fill" />
                </div>
              ))}
            </div>
            <div className="how-progress label" style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--on-surface-muted)' }}>
              <span>01 · Ingest</span>
              <span>02 · Breakdown</span>
              <span>03 · Assembly</span>
            </div>
            <div style={{ marginTop: 32, fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--on-surface-muted)' }}>
              {step.meta}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
