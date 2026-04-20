import { ClapText } from './motion';
import dinner1 from '../assets/positioning/dinner_1.png';
import diner2 from '../assets/positioning/diner_2.png';
import dinner3 from '../assets/positioning/dinner_3.png';

export function Positioning() {
  return (
    <section className="section bg-surface-low relative">
      <div className="container narrow">
        <p className="label-mono reveal text-center mb-[18px]">The Problem</p>
        <ClapText as="h2" className="display-lg text-center mx-auto max-w-[24ch] mb-[18px]" text={"Prompting isn't\n[[filmmaking.]]"} />
        <p className="body-lg reveal d2 text-center max-w-[64ch] mx-auto mb-16">
          Current AI video tools force you to prompt shot by shot, breaking the flow of your
          story. Induce reads your script the way a director reads it — scene by scene,
          beat by beat.
        </p>

        {/* compare .vs class retained for ::after "VS" pseudo-element label */}
        <div className="compare reveal d3 grid [grid-template-columns:1fr_auto_1fr] gap-6 items-stretch mt-12 max-lg:[grid-template-columns:1fr]">
          <div className="bg-surface-container p-7 rounded min-h-[440px] relative flex flex-col">
            <div className="flex items-center justify-between mb-[22px]">
              <span className="font-display text-[14px] font-medium tracking-[0.04em] text-on-surface-variant">Traditional AI video</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-on-surface-muted">PROMPT-BY-PROMPT</span>
            </div>
            <div className="flex-1 grid [grid-template-columns:repeat(6,1fr)] [grid-auto-rows:30px] gap-[6px] relative">
              <div className="col-span-3 bg-surface-container-high rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-on-surface-variant uppercase overflow-hidden whitespace-nowrap">man in coat</div>
              <div className="col-span-3 bg-surface-container-high rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-on-surface-variant uppercase overflow-hidden whitespace-nowrap">dark street, rain</div>
              <div className="col-span-2 bg-surface-container-high rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-[#c9716a] uppercase overflow-hidden whitespace-nowrap [box-shadow:inset_0_0_0_1px_rgba(204,51,0,0.25)]">same man again</div>
              <div className="col-span-4 bg-surface-container-high rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-on-surface-variant uppercase overflow-hidden whitespace-nowrap">cinematic 35mm anamorphic teal</div>
              <div className="col-span-3 bg-[rgba(204,51,0,0.12)] rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-primary uppercase overflow-hidden whitespace-nowrap">protagonist wardrobe ≠</div>
              <div className="col-span-3 bg-surface-container-high rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-on-surface-variant uppercase overflow-hidden whitespace-nowrap">wide crane down</div>
              <div className="col-span-2 bg-surface-container-high rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-on-surface-variant uppercase overflow-hidden whitespace-nowrap">retry</div>
              <div className="col-span-4 bg-surface-container-high rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-[#c9716a] uppercase overflow-hidden whitespace-nowrap [box-shadow:inset_0_0_0_1px_rgba(204,51,0,0.25)]">
                continuity mismatch <span className="opacity-50 ml-auto">×</span>
              </div>
              <div className="col-span-3 bg-surface-container-high rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-on-surface-variant uppercase overflow-hidden whitespace-nowrap">neon blue haze</div>
              <div className="col-span-3 bg-surface-container-high rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-on-surface-variant uppercase overflow-hidden whitespace-nowrap">close on eyes</div>
              <div className="col-span-6 bg-[rgba(204,51,0,0.12)] rounded-sm flex items-center px-2 font-mono text-[9px] tracking-[0.1em] text-primary uppercase overflow-hidden whitespace-nowrap">face drift detected — regenerate</div>
            </div>
          </div>

          <div className="vs w-px self-stretch bg-outline-variant relative max-lg:w-auto max-lg:h-px" />

          <div className="bg-surface-container p-7 rounded min-h-[440px] relative flex flex-col">
            <div className="flex items-center justify-between mb-[22px]">
              <span className="font-display text-[14px] font-medium tracking-[0.04em] text-primary">Induce</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-on-surface-muted">SCRIPT-FIRST</span>
            </div>
            <div className="flex-1 grid grid-cols-2 max-sm:grid-cols-1 gap-4 font-mono text-[11px]">
              <div className="bg-surface-container-high p-4 rounded-sm text-on-surface-variant leading-[1.8]">
                <span className="text-primary tracking-[0.12em] text-[9px] uppercase block mb-2">INT. DINER — NIGHT</span>
                <span className="text-on-surface-muted italic block my-[6px] text-[10px]">Rain on the window. MARA, 40s, sits alone.</span>
                <span className="text-on-surface block mt-[10px] mb-[2px] ml-[60px] text-[10px]">MARA</span>
                <span className="text-on-surface-variant block mx-5 mb-2 text-[10px]">You came back.</span>
                <span className="text-on-surface-muted italic block my-[6px] text-[10px]">A long beat. The door chimes.</span>
                <span className="text-on-surface block mt-[10px] mb-[2px] ml-[60px] text-[10px]">DANIEL</span>
                <span className="text-on-surface-variant block mx-5 mb-2 text-[10px]">I shouldn't have.</span>
              </div>
              <div className="flex flex-col flex-col gap-[10px]">
                {[dinner1, diner2, dinner3].map((src, k) => (
                  <div key={k} className="relative flex-1 sm:flex-none [aspect-ratio:2.35/1] bg-[#0c0c0b] rounded-sm overflow-hidden">
                    <img src={src} alt={`SH 0${k + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
