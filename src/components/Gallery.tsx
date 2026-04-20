import { motion } from 'motion/react';
import { useState } from 'react';
import gal1 from '../assets/line of script/gallery 1.png';
import gal2 from '../assets/line of script/gallery 2.png';
import gal3 from '../assets/line of script/gallery 3.png';
import gal4 from '../assets/line of script/gallery 4.app.png';
import gal5 from '../assets/line of script/agencies.png';
import gal6 from '../assets/line of script/animated.png';

const GALLERY_IMAGES = [gal1, gal2, gal3, gal4, gal5, gal6];

const ease = [0.16, 1, 0.3, 1] as const;

const GALLERY = [
  { slug: 'ROOM 214', sh: 'INT. MOTEL — NIGHT', line: 'She waited for the sound of the next car.' },
  { slug: 'IVY & 4TH', sh: 'EXT. STREET — DAWN', line: "The city hadn't noticed it was Sunday." },
  { slug: 'TRANSIT / 03', sh: 'INT. TRAIN — LATE', line: 'No one looked up. No one ever looked up.' },
  { slug: 'CALLBACK', sh: 'INT. THEATRE — BLACK', line: 'Again. From the top. Slower this time.' },
  { slug: 'HARBOR LIGHT', sh: 'EXT. PIER — MAGIC HOUR', line: "A boat turned out, and then it didn't." },
  { slug: 'LAST CALL', sh: 'INT. BAR — CLOSE', line: 'He paid without counting. She noticed.' },
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const tileVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};

function GalleryTile({ g, i }: { g: (typeof GALLERY)[number]; i: number }) {
  const [tapped, setTapped] = useState(false);
  return (
    /* tile class drives CSS :hover rule; data-active drives tap on mobile */
    <motion.div
      className="tile relative [aspect-ratio:2.35/1] bg-black overflow-hidden cursor-pointer rounded-[3px]"
      variants={tileVariants}
      data-active={tapped ? '' : undefined}
      onClick={() => setTapped(t => !t)}
      onMouseLeave={() => setTapped(false)}
    >
      <img
        src={GALLERY_IMAGES[i % GALLERY_IMAGES.length]}
        alt={g.slug}
        className="w-full h-full object-cover block"
      />
      <span className="absolute top-[10px] left-3 font-mono text-[9px] tracking-[0.2em] text-[rgba(255,255,255,0.5)] uppercase z-[2]">
        INDUCE · FRAME {String(i + 1).padStart(3, '0')}
      </span>
      <span className="absolute top-[10px] right-3 font-mono text-[9px] tracking-[0.2em] text-[rgba(255,255,255,0.5)] uppercase z-[2]">
        / TAP
      </span>
      {/* transform + transition handled entirely in CSS to avoid Tailwind v4 translate/transform conflict */}
      {/* <div className="script-line absolute inset-0 grid place-items-center p-6 bg-[rgba(10,10,10,0.88)] [backdrop-filter:blur(8px)] text-center">
        <div>
          <span className="block font-mono text-[9px] tracking-[0.22em] text-primary uppercase mb-[10px]">{g.sh}</span>
          <span className="font-mono text-[13px] text-on-surface leading-[1.5] max-w-[90%] block">"{g.line}"</span>
        </div>
      </div> */}
    </motion.div>
  );
}

export function Gallery() {
  return (
    <section className="section low">
      <div className="container wide">
        <motion.div
          className="flex justify-between items-end gap-10 mb-12 max-md:flex-col max-md:items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
        >
          <h2 className="font-display font-light text-[clamp(36px,4.6vw,72px)] tracking-[-0.025em] m-0 max-w-[18ch] leading-[1.0]">
            Every frame here started as a <em className="text-primary italic font-light">line of script.</em>
          </h2>
          {/* <p className="body-lg max-w-[36ch]">Hover any tile to see the line that made it.</p> */}
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {GALLERY.map((g, i) => <GalleryTile key={i} g={g} i={i} />)}
        </motion.div>
      </div>
    </section>
  );
}
