export function InfraStrip() {
  return (
    <section className="infra">
      <div className="row">
        <div className="item reveal d1">
          <div className="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 L20 7 V13 C20 17 16 20 12 21 C8 20 4 17 4 13 V7 Z" /><path d="M9 12 L11 14 L15 10" /></svg>
          </div>
          <div className="txt">
            <h4>SOC 2 roadmap</h4>
            <p>Type II target Q3. GDPR &amp; DPA ready.</p>
          </div>
        </div>
        <div className="item reveal d2">
          <div className="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2.2" /><path d="M3 19c0-3 3-5 6-5s6 2 6 5" /><path d="M14 19c0-2 2-4 4.5-4" /></svg>
          </div>
          <div className="txt">
            <h4>Team workspaces</h4>
            <p>SSO, roles, audit logs, shared drives.</p>
          </div>
        </div>
        <div className="item reveal d3">
          <div className="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 9h18" /><path d="M7 14h4" /></svg>
          </div>
          <div className="txt">
            <h4>Commercial licensing</h4>
            <p>Full-use rights. You own what you generate.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
