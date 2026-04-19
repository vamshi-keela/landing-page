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
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 56 }}>
          <span className="bar" />
          {it.em ? <em>{it.t}</em> : it.t}
        </span>
      ))}
    </span>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <Row /><Row />
      </div>
    </div>
  );
}
