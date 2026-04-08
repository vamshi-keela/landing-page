import { UserCircle } from 'lucide-react';
import induceIcon from '../../assets/images/induce_icon.svg';
import {
  FOUNDERS_CALENDLY_URL,
  NAVBAR_BORDER_PX,
  NAVBAR_HEIGHT,
  NAVBAR_PADDING_Y,
} from '../../utils/constants';

const Navbar = () => (
  <nav
    style={{
      height: NAVBAR_HEIGHT,
      paddingTop: NAVBAR_PADDING_Y,
      paddingBottom: NAVBAR_PADDING_Y,
      borderBottomWidth: NAVBAR_BORDER_PX,
    }}
    className='fixed top-0 left-0 w-full z-[100] box-border bg-surface/80 backdrop-blur-xl border-solid border-outline-variant/10 flex justify-between items-center px-8'
  >
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className='flex items-center gap-2.5 text-2xl font-bold tracking-tighter text-primary-container font-headline cursor-pointer bg-transparent border-none p-0'
      aria-label="Scroll to top"
    >
      <img
        src={induceIcon}
        alt=''
        width={32}
        height={32}
        className='w-42 shrink-0 object-contain'
        aria-hidden
      />
    </button>
    {/* <div className="hidden md:flex items-center gap-8 font-headline font-medium tracking-tight">
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Platform</a>
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Features</a>
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Creators</a>
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Enterprise</a>
      <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Pricing</a>
    </div> */}
    <div className='flex items-center gap-4'>
      {/* <button className="text-on-surface-variant hover:text-primary-container transition-colors">
        <UserCircle size={28} />
      </button> */}
      <a
        href={FOUNDERS_CALENDLY_URL}
        target='_blank'
        rel='noopener noreferrer'
        className='bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-headline font-bold text-sm tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary-container/20 inline-flex items-center justify-center'
      >
        Talk To Founders
      </a>
    </div>
  </nav>
);

export default Navbar;
