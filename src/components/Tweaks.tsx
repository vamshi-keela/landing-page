import { useEffect, useState } from 'react';

const ACCENTS: Record<string, { primary: string; primary_container: string; deep: string; label: string }> = {
  copper:  { primary: '#ffb5a1', primary_container: '#cc3300', deep: '#3c0800', label: 'Copper (default)' },
  ember:   { primary: '#ffc47a', primary_container: '#b24400', deep: '#3a1500', label: 'Ember' },
  mercury: { primary: '#c6d2e0', primary_container: '#3d5166', deep: '#0e1a28', label: 'Mercury' },
  velvet:  { primary: '#f4b6c1', primary_container: '#7a1d3a', deep: '#2b0812', label: 'Velvet' },
  lime:    { primary: '#d6e89a', primary_container: '#4a5a10', deep: '#141a02', label: 'Lime scope' },
};

const DEFAULTS = { accent: 'copper', grainOpacity: 0.06, italicAccent: true };

export function Tweaks() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(DEFAULTS);

  useEffect(() => {
    const a = ACCENTS[state.accent] || ACCENTS.copper;
    document.documentElement.style.setProperty('--primary', a.primary);
    document.documentElement.style.setProperty('--primary-container', a.primary_container);
    document.documentElement.style.setProperty('--primary-deep', a.deep);
    document.documentElement.style.setProperty('--grain-opacity', String(state.grainOpacity));
  }, [state]);

  const update = (patch: Partial<typeof DEFAULTS>) => setState(s => ({ ...s, ...patch }));

  return (
    <>
      {!open && (
        <button className="tweaks-btn" onClick={() => setOpen(true)}>⚙ Tweaks</button>
      )}
      {open && (
        <div className="tweaks-panel">
          <h6>
            <span>Tweaks</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--on-surface-muted)', cursor: 'pointer', fontFamily: 'var(--f-mono)', fontSize: 10 }}>✕ close</button>
          </h6>

          <div className="trow">
            <label>Accent</label>
            <div className="swatches">
              {Object.entries(ACCENTS).map(([k, v]) => (
                <div key={k} title={v.label} className={`sw ${state.accent === k ? 'on' : ''}`}
                  onClick={() => update({ accent: k })}
                  style={{ background: `linear-gradient(45deg, ${v.primary_container}, ${v.primary})` }}
                />
              ))}
            </div>
          </div>

          <div className="trow">
            <label>Film grain · {Math.round(state.grainOpacity * 100)}%</label>
            <input type="range" min="0" max="0.16" step="0.01" value={state.grainOpacity}
              onChange={e => update({ grainOpacity: parseFloat(e.target.value) })} />
          </div>

          <div className="trow">
            <div className={`toggle ${state.italicAccent ? 'on' : ''}`} onClick={() => update({ italicAccent: !state.italicAccent })}>
              <span className="box" />
              <span>Italic accent headlines</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
