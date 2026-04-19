export function Footer() {
  return (
    <footer className="footer" id="developers">
      <div className="footer-grid">
        <div className="brand">
          <div className="mark">Induce<span style={{ color: 'var(--primary)' }}>.</span></div>
          <div className="tag">AI Media Infrastructure</div>
          <div className="news-label"> Don't miss the next release</div>
          <form className="news" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="you@studio.com" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="col">
          <h5>Product</h5>
          <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Script editor</a></li>
            <li><a href="#">Shot control</a></li>
            <li><a href="#">Continuity</a></li>
            <li><a href="#">Release notes</a></li>
          </ul>
        </div>
        <div className="col">
          <h5>Solutions</h5>
          <ul>
            <li><a href="#">Filmmakers</a></li>
            <li><a href="#">Agencies</a></li>
            <li><a href="#">Studios</a></li>
            <li><a href="#">Enterprise</a></li>
          </ul>
        </div>
        <div className="col">
          <h5>Developers</h5>
          <ul>
            <li><a href="#">API docs</a></li>
            <li><a href="#">SDKs</a></li>
            <li><a href="#">Changelog</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>
        <div className="col">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-meta">
        <span>© 2026 Induce Labs, Inc.</span>
        <div className="legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
          <a href="#">DPA</a>
        </div>
      </div>
    </footer>
  );
}
