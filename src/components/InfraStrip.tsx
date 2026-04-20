export function InfraStrip() {
  return (
    <section className="py-14 px-[clamp(24px,6vw,96px)] bg-surface">
      <div className="grid grid-cols-3 gap-12 max-w-[1440px] mx-auto max-md:grid-cols-1">
        <div className="flex gap-[18px] items-start reveal d1">
          <div className="w-10 h-10 grid place-items-center bg-surface-container-high rounded shrink-0">
            <svg className="w-[18px] h-[18px] text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 3 L20 7 V13 C20 17 16 20 12 21 C8 20 4 17 4 13 V7 Z" />
              <path d="M9 12 L11 14 L15 10" />
            </svg>
          </div>
          <div>
            <h4 className="font-display text-[15px] font-medium m-0 mb-1 tracking-[-0.005em]">SOC 2 roadmap</h4>
            <p className="m-0 text-on-surface-variant text-[13px] font-mono tracking-[0.04em]">Type II target Q3. GDPR &amp; DPA ready.</p>
          </div>
        </div>

        <div className="flex gap-[18px] items-start reveal d2">
          <div className="w-10 h-10 grid place-items-center bg-surface-container-high rounded shrink-0">
            <svg className="w-[18px] h-[18px] text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="9" cy="8" r="3" />
              <circle cx="17" cy="10" r="2.2" />
              <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
              <path d="M14 19c0-2 2-4 4.5-4" />
            </svg>
          </div>
          <div>
            <h4 className="font-display text-[15px] font-medium m-0 mb-1 tracking-[-0.005em]">Team workspaces</h4>
            <p className="m-0 text-on-surface-variant text-[13px] font-mono tracking-[0.04em]">SSO, roles, audit logs, shared drives.</p>
          </div>
        </div>

        <div className="flex gap-[18px] items-start reveal d3">
          <div className="w-10 h-10 grid place-items-center bg-surface-container-high rounded shrink-0">
            <svg className="w-[18px] h-[18px] text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="5" width="18" height="14" rx="1" />
              <path d="M3 9h18" />
              <path d="M7 14h4" />
            </svg>
          </div>
          <div>
            <h4 className="font-display text-[15px] font-medium m-0 mb-1 tracking-[-0.005em]">Commercial licensing</h4>
            <p className="m-0 text-on-surface-variant text-[13px] font-mono tracking-[0.04em]">Full-use rights. You own what you generate.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
