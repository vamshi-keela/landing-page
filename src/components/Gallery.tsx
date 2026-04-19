import { motion } from 'motion/react';
import gal1 from '../assets/line of script/gallery 1.png';
import gal2 from '../assets/line of script/gallery 2.png';
import gal3 from '../assets/line of script/gallery 3.png';
import gal4 from '../assets/line of script/gallery 4.app.png';

const GALLERY_IMAGES = [gal1, gal2, gal3, gal4];

const ease = [0.16, 1, 0.3, 1] as const;

const GALLERY = [
  { slug: 'ROOM 214',     sh: 'INT. MOTEL — NIGHT',       line: 'She waited for the sound of the next car.' },
  { slug: 'IVY & 4TH',    sh: 'EXT. STREET — DAWN',       line: "The city hadn't noticed it was Sunday." },
  { slug: 'TRANSIT / 03', sh: 'INT. TRAIN — LATE',        line: 'No one looked up. No one ever looked up.' },
  { slug: 'CALLBACK',     sh: 'INT. THEATRE — BLACK',     line: 'Again. From the top. Slower this time.' },
  { slug: 'HARBOR LIGHT', sh: 'EXT. PIER — MAGIC HOUR',  line: "A boat turned out, and then it didn't." },
  { slug: 'LAST CALL',    sh: 'INT. BAR — CLOSE',         line: 'He paid without counting. She noticed.' },
  { slug: 'THE TEST',     sh: 'INT. LAB — DAY',           line: 'The number on the screen did not move.' },
  { slug: 'NORTH FIELD',  sh: 'EXT. WHEAT — DUSK',       line: 'Somewhere, a dog began to bark.' },
  { slug: 'RETURNS',      sh: 'INT. DOORWAY — NIGHT',     line: "You came back, she said. I shouldn't have." },
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};

export function Gallery() {
  return (
    <section className="section low gallery">
      <div className="container wide">
        <motion.div
          className="head"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
        >
          <h2>Every frame here started as a <em>line of script.</em></h2>
          <p className="body-lg" style={{ maxWidth: '36ch' }}>Hover any tile to see the line that made it.</p>
        </motion.div>

        <motion.div
          className="gallery-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {GALLERY.map((g, i) => (
            <motion.div key={i} className="tile" variants={tileVariants}>
              <img src={GALLERY_IMAGES[i % GALLERY_IMAGES.length]} alt={g.slug} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="corner">INDUCE · FRAME {String(i+1).padStart(3,'0')}</span>
              <span className="corner r">/ HOVER</span>
              <div className="script-line">
                <div>
                  <span className="sh">{g.sh}</span>
                  <span className="line">"{g.line}"</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
