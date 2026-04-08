import { motion } from "motion/react";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import { NAVBAR_HEIGHT, SECTION_START_VH, Z_INDEX } from "../../utils/constants";

const GALLERY_ITEMS = [
  {
    title: "The Last Signal",
    genre: "Cyber Noir",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0V-9BMLkWEPYqyNVlxP_YNT91FE_s8KyAjMLk7hw5Zy5Im5btAiQ5fIpuT7D3nMPqHaDxRq7ZXS3oE_e1CZBqqMMmP9bC4TNWaZAy0OSaKQa3oQnM_WFJlR69btzxPafv7s1QOhYgdmOW90J_euozvUEkjDNniSvkYZXY-SdGmv6qCF9ZrabIidBCSMpZwoK88jsWjjXwLub4MCEiV0aSb-uOSkfSTiaR7gXVZ8QpoDeoxK_Y5LjDQVNP47m0WqRUE_e6Ep7dIYQ",
  },
  {
    title: "Event Horizon II",
    genre: "Space Epic",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCruCr08Jekizj8rITCFeCLJw1R5C49mjkE-qtoyFAB_si36xCBIjxmDQKFCDKOz4TNNkVbMnhPQiumtj8NSuVX5w_rWlQxL0SWP6r8ULDy0GiwzBHbgfFiFSvBBG_ckAvUvV59PTMP6f8IGORW_xE85rVSDqhdOSZim5WCRgqfSXj-AzlZNI2LPi1TZwAr3ccYd8ufvSs5-uacECu8xTeOlL639GiHU6HtnttT-H-jHJYVrez59TWQSJEyP-QHHbJVl06eIrfCuGs",
  },
  {
    title: "The Iron Gate",
    genre: "Historical Drama",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1Wlm_7f2ExIfO39tcnRJujY5vPnoPSDN0CUW1SgYOY9EEdv37UT303bIWi58z1YpLsFAww3SkJL8ZvVkvr3XWbWTDtUVm_EyhNA_dZKp1T4CrvU9FwAAsAHsRAloNVSiGbv-FuJzl0fG5fQYOMtmmDtluPFVWUAgbFkLiBFrcHyO7jt8r2NR98UMdKszvzU-wZL8t8o788fnxiOGm42o6Fj2gDk7Isf1gbSDHcrokhWM57MlnLPUl-3IDtN00DwkaZKkcgS6bw3g",
  },
  {
    title: "Lumina Forest",
    genre: "Surrealism",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMClW1K1nAqXMX7JOW1AqoNHkgMqi1bMB8YQcV7uTxjbICSVY2QSLvn3qyN99MrB3Hgxb84bM4EfYaOzZ80RLeQ6SrI6a-72C0ESm3FnxN9-lTq1Nur-87PRmorgoz-Kc3LxWLZ7SAvmYM5ViT0napRC65ESC_aPa9azgsDZmjmBWFJpZafjE_WDOXlirDa6JRqjz7v9mKMHVIYuqs1QO-ujryKYBBWBrIrFC_HSnfGkAkOA9mH2JzRjyqRH_MAE9M-ahstii63Ao",
  },
] as const;

/**
 * Horizontal gallery — the 4th sticky layer (z-50).
 *
 * The outer div provides scroll height = viewport + scrollDist so the inner
 * sticky panel remains pinned while the gallery pans horizontally.
 * Scroll start is anchored to sectionStartVh=4 (after Hero + 3 sticky sections).
 */
const HorizontalGallery = () => {
  const { containerRef, outerHeight, x } = useHorizontalScroll(SECTION_START_VH.gallery);

  return (
    <div
      style={{ height: `calc(100vh + ${outerHeight}px)` }}
      className="bg-surface"
    >
      <div
        style={{
          zIndex: Z_INDEX.gallery,
          top: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        }}
        className="sticky overflow-hidden bg-surface flex items-center"
      >
        <motion.div
          ref={containerRef}
          style={{ x }}
          className="flex gap-12 px-[10vw] flex-nowrap"
        >
          <div className="flex-shrink-0 w-[500px] flex flex-col justify-center">
            <h2 className="text-5xl font-headline font-bold mb-4">Director's Cut</h2>
            <p className="text-on-surface-variant">Featured productions made with Induce.</p>
          </div>

          {GALLERY_ITEMS.map((item) => (
            <div key={item.title} className="flex-shrink-0 w-80 sm:w-72 group">
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-4 shadow-2xl">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  src={item.img}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs font-label text-primary-container mb-1 uppercase tracking-widest">
                    {item.genre}
                  </span>
                  <h4 className="font-headline font-bold text-xl">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalGallery;
