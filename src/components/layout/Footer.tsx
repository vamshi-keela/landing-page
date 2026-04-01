import { Z_INDEX } from "../../utils/constants";

const Footer = () => (
  <footer
    style={{ zIndex: Z_INDEX.footer }}
    className="relative bg-[#0e0e0e] w-full py-20 px-12 border-t border-outline-variant/10"
  >
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
      <div className="col-span-1">
        <div className="font-headline text-lg font-bold text-primary-container uppercase tracking-widest mb-6">
          Induce
        </div>
        <p className="font-body text-sm text-on-surface-variant max-w-xs leading-relaxed">
          The Induce Production Suite. Transforming stories into cinematic reality through
          high-energy neural synthesis.
        </p>
      </div>
      <div>
        <h4 className="font-headline font-bold text-sm text-on-surface mb-6 uppercase tracking-widest">Solutions</h4>
        <ul className="space-y-4">
          <li><a className="font-body text-sm text-on-surface-variant hover:text-primary-container transition-colors" href="#">Script-to-Video</a></li>
          <li><a className="font-body text-sm text-on-surface-variant hover:text-primary-container transition-colors" href="#">Director Mode</a></li>
          <li><a className="font-body text-sm text-on-surface-variant hover:text-primary-container transition-colors" href="#">API Access</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-headline font-bold text-sm text-on-surface mb-6 uppercase tracking-widest">Resources</h4>
        <ul className="space-y-4">
          <li><a className="font-body text-sm text-on-surface-variant hover:text-primary-container transition-colors" href="#">Documentation</a></li>
          <li><a className="font-body text-sm text-on-surface-variant hover:text-primary-container transition-colors" href="#">Privacy Policy</a></li>
          <li><a className="font-body text-sm text-on-surface-variant hover:text-primary-container transition-colors" href="#">Terms of Service</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-headline font-bold text-sm text-on-surface mb-6 uppercase tracking-widest">Newsletter</h4>
        <div className="flex bg-surface-container rounded-lg overflow-hidden p-1 border border-outline-variant/10 focus-within:border-primary-container transition-colors">
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-full px-4 text-on-surface outline-none"
            placeholder="Your email"
            type="email"
          />
          <button className="bg-primary-container text-on-primary-container px-4 py-2 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity">
            Join
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/10 text-center">
      <p className="font-body text-sm text-on-surface-variant">
        © 2024 Induce. The Induce Production Suite.
      </p>
    </div>
  </footer>
);

export default Footer;
