const items = [
  { t: 'Every line, a shot.', em: true },
  { t: 'Continuity, held.' },
  { t: 'The DP is an agent.' },
  { t: 'Override without rollback.', em: true },
  { t: 'API-first.' },
  { t: 'Script → cut in an afternoon.' },
  { t: 'Built for Everyone.', em: true },
  { t: 'Commercially licensed.' },
];

function Row() {
  return (
    <span>
      {items.map((it, i) => (
        <span key={i} className="pl-14 inline-flex items-center gap-14">
          <span className="w-[6px] h-[6px] bg-primary rounded-full opacity-70 inline-block" />
          {it.em ? <em className="text-primary italic font-normal font-display">{it.t}</em> : it.t}
        </span>
      ))}
    </span>
  );
}

export function Marquee() {
  return (
    /* marquee class retained for ::before/::after fade-out gradient pseudo-elements */
    <div className="marquee relative overflow-hidden bg-surface-lowest py-[18px] z-[4]" aria-hidden="true">
      <div className="marquee-track flex gap-14 w-max [animation:marquee_38s_linear_infinite] font-display text-[15px] font-normal tracking-[-0.005em] text-on-surface">
        <Row /><Row />
      </div>
    </div>
  );
}
