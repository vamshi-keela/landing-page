import { ClapText } from './motion';
import dinner1 from '../assets/positioning/dinner_1.png';
import diner2 from '../assets/positioning/diner_2.png';
import dinner3 from '../assets/positioning/dinner_3.png';

export function Positioning() {
  return (
    <section className="positioning section">
      <div className="container narrow">
        <p className="label-mono reveal" style={{ textAlign: 'center', marginBottom: 18 }}>— The Problem</p>
        <ClapText as="h2" className="display-lg lead" text="Prompting isn't [[filmmaking.]]" />
        <p className="body-lg sub reveal d2">
          Current AI video tools force you to prompt shot by shot, breaking the flow of your
          story. Induce reads your script the way a director reads it — scene by scene,
          beat by beat.
        </p>

        <div className="compare reveal d3">
          <div className="compare-card bad">
            <div className="head">
              <span className="title">Traditional AI video</span>
              <span className="tag">PROMPT-BY-PROMPT</span>
            </div>
            <div className="prompt-cloud">
              <div className="prompt-chip" style={{ gridColumn: 'span 3' }}>man in coat</div>
              <div className="prompt-chip" style={{ gridColumn: 'span 3' }}>dark street, rain</div>
              <div className="prompt-chip warn" style={{ gridColumn: 'span 2' }}>same man again</div>
              <div className="prompt-chip" style={{ gridColumn: 'span 4' }}>cinematic 35mm anamorphic teal</div>
              <div className="prompt-chip error" style={{ gridColumn: 'span 3' }}>protagonist wardrobe ≠</div>
              <div className="prompt-chip" style={{ gridColumn: 'span 3' }}>wide crane down</div>
              <div className="prompt-chip" style={{ gridColumn: 'span 2' }}>retry</div>
              <div className="prompt-chip warn" style={{ gridColumn: 'span 4' }}>continuity mismatch <span className="x">×</span></div>
              <div className="prompt-chip" style={{ gridColumn: 'span 3' }}>neon blue haze</div>
              <div className="prompt-chip" style={{ gridColumn: 'span 3' }}>close on eyes</div>
              <div className="prompt-chip error" style={{ gridColumn: 'span 6' }}>face drift detected — regenerate</div>
            </div>
          </div>

          <div className="vs" />

          <div className="compare-card good">
            <div className="head">
              <span className="title">Induce</span>
              <span className="tag">SCRIPT-FIRST</span>
            </div>
            <div className="script-page">
              <div className="script">
                <span className="sh">INT. DINER — NIGHT</span>
                <span className="ac">Rain on the window. MARA, 40s, sits alone.</span>
                <span className="ch">MARA</span>
                <span className="dl">You came back.</span>
                <span className="ac">A long beat. The door chimes.</span>
                <span className="ch">DANIEL</span>
                <span className="dl">I shouldn't have.</span>
              </div>
              <div className="shots">
                <div className="shot"><img src={dinner1} alt="SH 01 WIDE" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div className="shot"><img src={diner2} alt="SH 02 OTS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div className="shot"><img src={dinner3} alt="SH 03 CU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
