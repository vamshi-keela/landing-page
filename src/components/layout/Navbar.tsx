import { UserCircle } from "lucide-react";
import { NAVBAR_HEIGHT } from "../../utils/constants";

const Navbar = () => (
  <nav
    style={{ height: NAVBAR_HEIGHT }}
    className="fixed top-0 left-0 w-full z-[100] bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center px-8"
  >
    <div className="text-2xl font-bold tracking-tighter text-primary-container font-headline">
      Induce
    </div>
    <div className="hidden md:flex items-center gap-8 font-headline font-medium tracking-tight">
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Platform</a>
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Features</a>
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Creators</a>
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Enterprise</a>
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Pricing</a>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-on-surface-variant hover:text-primary-container transition-colors">
        <UserCircle size={28} />
      </button>
      <button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-headline font-bold text-sm tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary-container/20">
        Start Directing
      </button>
    </div>
  </nav>
);

export default Navbar;
