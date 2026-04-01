/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useInView } from "motion/react";
import {
    UserCircle,
    ArrowRight,
    Sparkles,
    History as Timeline,
    Lightbulb,
    Video,
    Network as Hub,
    Code,
    Shield,
    Play,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Helper: clamp-and-lerp for scroll-driven transforms.
// Maps `v` from [start, end] → [from, to], clamped at both ends.
// Using window.innerHeight directly inside transform functions lets this stay
// accurate after resize without needing extra state/refs.
// ---------------------------------------------------------------------------
const lerp01 = (v: number, start: number, end: number, from: number, to: number) => {
    const t = Math.max(0, Math.min(1, (v - start) / (end - start || 1)));
    return from + (to - from) * t;
};

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
const Navbar = () => (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center px-8 h-20">
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

// ---------------------------------------------------------------------------
// Hero — parallax image scale + content drift on scroll
// ---------------------------------------------------------------------------
const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-surface-container-lowest z-10"
        >
            <motion.div style={{ scale: imgScale }} className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDeRkSqx9zZOmkV1oYaNwnk5ytaV5A-l26ZhXBJQPvmISb1OHsV10NgWL_G0v5hxVi5zJYroGdxOtWPsCUBLlPIceJPbYSFDNqtDswaOuP10HWq22Ei2crwcJIwk_SwgtRsQ3YkrTmNfFFn2wFY2e9Q9TdXNoUYz1WSQsc86qgDd6kx_f4Jgegmy-Z2SFpBdhXaWU4UXXAO82ZL67SiiLCydXYn3MSFFyjs2M3eMnM76e5SrEOMIe-Pt7N4KBkRmpAxjKKWyluBM4"
                    alt="Cinematic studio"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-container-lowest/60 to-surface-container-lowest" />
            </motion.div>

            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="relative z-10 max-w-7xl mx-auto px-8 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-outline-variant/30 bg-surface-container-low/50 backdrop-blur-md mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                    <span className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant">
                        The Future of Cinematic Production
                    </span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-headline font-bold tracking-tighter mb-8 leading-[0.9] text-on-surface"
                >
                    Write your vision.<br />
                    <span className="shimmer-text">Watch it manifest.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                >
                    Translate raw script data into hyper-realistic cinematic experiences.
                    Script-to-video technology meets granular directorial control.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <button className="bg-primary-container text-on-primary-container px-10 py-5 rounded-full font-headline font-bold text-lg tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 group flex items-center gap-3 shadow-2xl shadow-primary-container/40">
                        Start Directing
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="glass-card text-on-surface px-10 py-5 rounded-full font-headline font-bold text-lg tracking-wide hover:bg-on-surface/5 hover:scale-105 active:scale-95 transition-all">
                        View Showreel
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
};

// ---------------------------------------------------------------------------
// ScriptToVideo content (rendered inside App's sticky motion.section)
// ---------------------------------------------------------------------------
const ScriptToVideo = () => (
    <div className="max-w-7xl mx-auto px-8 w-full py-20">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Script-to-Video</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-container to-transparent mb-6" />
            <p className="text-on-surface-variant max-w-xl">
                Deep semantic understanding turns your prose into frame-perfect scenes, automatically
                synchronized with cinematic timing.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[60vh]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="md:col-span-8 relative overflow-hidden rounded-xl bg-surface-container-low group h-[400px] md:h-full"
            >
                <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCg8WOkNS_N6C5LAt4XunB0DJ27TND4qN0bV7espg-uzSjO3vivUPusxv1kgDdouNUBLk9Pk3tQDRSAqHKWgSXRLB4_5cSHVCcJWwyIPqe7NNT9lF4hVbezCp4dOI2qqXm350yRvzDphOoCVV9P-uDG4LSEWSHBT5U98yrGdBIBeGWPynDf_VF46kAAifg5jxnHIatikY2IJr3iZAaaLtI4WzyArLYxVEvgEgYsBap3yvV-ZZ1mDfRf45KG9qK1WEPOxbIn-B3BYk"
                    alt="Screenplay morphing"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-2xl font-headline font-bold mb-2">Automated Scene Synthesis</h3>
                    <p className="text-on-surface-variant max-w-md">
                        Every line of dialogue and action description generates a distinct visual beat.
                    </p>
                </div>
            </motion.div>

            <div className="md:col-span-4 grid grid-rows-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="glass-card glow-border rounded-xl p-8 flex flex-col justify-end relative overflow-hidden group"
                >
                    <Sparkles className="text-primary-container mb-4 group-hover:scale-110 transition-transform" size={40} />
                    <h3 className="text-xl font-headline font-bold mb-2">Neural Composition</h3>
                    <p className="text-sm text-on-surface-variant">
                        AI-driven framing based on classic cinematography principles.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="bg-surface-container-high glow-border rounded-xl p-8 flex flex-col justify-end relative group"
                >
                    <div className="absolute top-0 right-0 p-4">
                        <span className="text-xs font-label text-primary-container tracking-widest uppercase">
                            Live Process
                        </span>
                    </div>
                    <Timeline className="text-primary-container mb-4 group-hover:rotate-12 transition-transform" size={40} />
                    <h3 className="text-xl font-headline font-bold mb-2">Rhythmic Pacing</h3>
                    <p className="text-sm text-on-surface-variant">
                        Intelligent cutting that respects the emotional arc of your script.
                    </p>
                </motion.div>
            </div>
        </div>
    </div>
);

// ---------------------------------------------------------------------------
// DirectorMode — SVG guide lines animate in when 40% of section is visible
// ---------------------------------------------------------------------------
const DirectorMode = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { amount: 0.4, once: true });

    return (
        <div ref={sectionRef} className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row items-center gap-20 py-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:w-1/2 order-2 md:order-1"
            >
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-1000" />
                    <div className="relative bg-surface-container-high rounded-xl overflow-hidden aspect-video shadow-2xl">
                        <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrZmAU28DFyqAIEeTWfGYO9K5roKXXFLa9hq_GQ0T_AqMhHvDloEpCFV4UykqvjDfBxlLHwFecOlWEjcmxXqKQqEt3LXApepD6K4-Eqq38dYNwm_rhh680u8ccqDUT8nC0psJtHXLz83IcXu2un-NM33LSZY2aImOZUNJ1OdudB54iZvAKQ759ge_hkfDydxI8UmwOo5AZYXKXNIb78Q9wnjSBSkbk-Bdho6GjxYp5jMrcWXg-KvzCZjHH4Y8SeIITu08EW4X-PFQ"
                            alt="Director dashboard"
                            referrerPolicy="no-referrer"
                        />
                        <motion.div
                            animate={{ opacity: inView ? 1 : 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            <div className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur rounded text-[10px] font-mono border border-primary-container/30">
                                REC <span className="text-primary-container animate-pulse">●</span> 00:04:12:15
                            </div>
                            <svg className="absolute inset-0 w-full h-full stroke-primary-container/20 stroke-1 fill-none">
                                <motion.rect
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: inView ? 1 : 0 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    height="80%" width="80%" x="10%" y="10%"
                                />
                                <motion.line
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: inView ? 1 : 0 }}
                                    transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                                    x1="50%" x2="50%" y1="0" y2="100%"
                                />
                                <motion.line
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: inView ? 1 : 0 }}
                                    transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                                    x1="0" x2="100%" y1="50%" y2="50%"
                                />
                            </svg>
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <button className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm hover:scale-110 active:scale-90 transition-transform">
                                <Play className="text-primary-container fill-primary-container" size={32} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="md:w-1/2 order-1 md:order-2">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-label text-primary-container tracking-[0.3em] uppercase mb-6 block"
                >
                    Master Your Vision
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-headline font-bold mb-8 leading-tight"
                >
                    Director Mode:<br />Absolute Control
                </motion.h2>
                <div className="space-y-8">
                    {[
                        { icon: Lightbulb, title: "Atmospheric Lighting", desc: "Control global illumination and volumetric fog.", delay: 0.2 },
                        { icon: Video, title: "Virtual Cinematography", desc: "Define lens focal lengths and complex crane paths.", delay: 0.4 },
                    ].map(({ icon: Icon, title, desc, delay }) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay }}
                            className="flex gap-6 group cursor-default"
                        >
                            <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-all duration-300">
                                <Icon className="text-primary-container group-hover:text-on-primary-container transition-colors" />
                            </div>
                            <div>
                                <h4 className="font-headline font-bold text-xl mb-2">{title}</h4>
                                <p className="text-on-surface-variant text-sm">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// CreativeSuite content (rendered inside App's sticky motion.section)
// ---------------------------------------------------------------------------
const CreativeSuite = () => (
    <div className="max-w-7xl mx-auto px-8 w-full py-20">
        <div className="text-center mb-20">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-headline font-bold mb-6"
            >
                The Creative Suite
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-on-surface-variant max-w-2xl mx-auto"
            >
                Scale your production with enterprise-grade collaboration tools designed for global studios.
            </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: Hub, title: "Multi-User Directing", desc: "Collaborate in real-time on renderings.", delay: 0.1 },
                { icon: Code, title: "API Access", desc: "Integrate directly into your production pipeline.", delay: 0.2 },
                { icon: Shield, title: "Ethical AI Guardrails", desc: "Enterprise-grade security and copyright safety.", delay: 0.3 },
            ].map(({ icon: Icon, title, desc, delay }) => (
                <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay }}
                    className="p-10 rounded-2xl bg-surface-container-low border border-outline-variant/10 glow-border flex flex-col items-center text-center group"
                >
                    <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                        <Icon className="text-primary-container" size={32} />
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-4">{title}</h3>
                    <p className="text-on-surface-variant text-sm">{desc}</p>
                </motion.div>
            ))}
        </div>
    </div>
);

// ---------------------------------------------------------------------------
// HorizontalGallery — 4th sticky layer (z-50).
//
// The outer div provides enough height so the inner sticky panel remains
// pinned while the gallery scrolls horizontally.
//
// Layout in the document (each section = 1 viewport height = vh):
//   0–1vh  : Hero
//   1–2vh  : ScriptToVideo (sticky z-20)
//   2–3vh  : DirectorMode  (sticky z-30)
//   3–4vh  : CreativeSuite (sticky z-40)
//   4–(4+scrollDist/vh)vh : Gallery outer div
//     └─ inner sticky panel (z-50): stays at top:0 for scrollDist pixels,
//        then exits naturally.
//
// The x transform is driven by absolute scrollY so it maps exactly to the
// scroll range where the inner panel is pinned.
// ---------------------------------------------------------------------------
const HorizontalGallery = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // scrollDistRef tracks how many px the gallery must translate.
    // Using a ref (not state) so the transform function always gets the latest
    // value without needing to re-subscribe.
    const scrollDistRef = useRef(1400);
    // outerHeight drives the outer div's height style after measurement.
    const [outerHeight, setOuterHeight] = useState(1400);

    useEffect(() => {
        const measure = () => {
            if (!containerRef.current) return;
            const dist = Math.max(1, containerRef.current.scrollWidth - window.innerWidth);
            scrollDistRef.current = dist;
            setOuterHeight(dist);
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // Single window-level scroll — same source as App-level transforms.
    const { scrollY } = useScroll();

    // Map scrollY → x: horizontal pan begins exactly when this section's inner
    // sticky panel has reached top:0 (scrollY = 4 × vh) and ends after
    // scrollDist additional pixels.
    const x = useTransform(scrollY, (v) => {
        const vh = window.innerHeight;
        const sd = scrollDistRef.current;
        const start = 4 * vh;          // gallery fully covers Creative Suite
        const end = start + sd;        // horizontal pan complete
        const t = Math.max(0, Math.min(1, (v - start) / (end - start)));
        return -t * sd;
    });

    const items = [
        {
            title: "The Last Signal", genre: "Cyber Noir",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0V-9BMLkWEPYqyNVlxP_YNT91FE_s8KyAjMLk7hw5Zy5Im5btAiQ5fIpuT7D3nMPqHaDxRq7ZXS3oE_e1CZBqqMMmP9bC4TNWaZAy0OSaKQa3oQnM_WFJlR69btzxPafv7s1QOhYgdmOW90J_euozvUEkjDNniSvkYZXY-SdGmv6qCF9ZrabIidBCSMpZwoK88jsWjjXwLub4MCEiV0aSb-uOSkfSTiaR7gXVZ8QpoDeoxK_Y5LjDQVNP47m0WqRUE_e6Ep7dIYQ",
        },
        {
            title: "Event Horizon II", genre: "Space Epic",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCruCr08Jekizj8rITCFeCLJw1R5C49mjkE-qtoyFAB_si36xCBIjxmDQKFCDKOz4TNNkVbMnhPQiumtj8NSuVX5w_rWlQxL0SWP6r8ULDy0GiwzBHbgfFiFSvBBG_ckAvUvV59PTMP6f8IGORW_xE85rVSDqhdOSZim5WCRgqfSXj-AzlZNI2LPi1TZwAr3ccYd8ufvSs5-uacECu8xTeOlL639GiHU6HtnttT-H-jHJYVrez59TWQSJEyP-QHHbJVl06eIrfCuGs",
        },
        {
            title: "The Iron Gate", genre: "Historical Drama",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1Wlm_7f2ExIfO39tcnRJujY5vPnoPSDN0CUW1SgYOY9EEdv37UT303bIWi58z1YpLsFAww3SkJL8ZvVkvr3XWbWTDtUVm_EyhNA_dZKp1T4CrvU9FwAAsAHsRAloNVSiGbv-FuJzl0fG5fQYOMtmmDtluPFVWUAgbFkLiBFrcHyO7jt8r2NR98UMdKszvzU-wZL8t8o788fnxiOGm42o6Fj2gDk7Isf1gbSDHcrokhWM57MlnLPUl-3IDtN00DwkaZKkcgS6bw3g",
        },
        {
            title: "Lumina Forest", genre: "Surrealism",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMClW1K1nAqXMX7JOW1AqoNHkgMqi1bMB8YQcV7uTxjbICSVY2QSLvn3qyN99MrB3Hgxb84bM4EfYaOzZ80RLeQ6SrI6a-72C0ESm3FnxN9-lTq1Nur-87PRmorgoz-Kc3LxWLZ7SAvmYM5ViT0napRC65ESC_aPa9azgsDZmjmBWFJpZafjE_WDOXlirDa6JRqjz7v9mKMHVIYuqs1QO-ujryKYBBWBrIrFC_HSnfGkAkOA9mH2JzRjyqRH_MAE9M-ahstii63Ao",
        },
    ];

    return (
        // Outer div: provides scroll height = viewport + scrollDist so the inner
        // sticky panel stays pinned for exactly scrollDist pixels of scroll.
        <div
            style={{ height: `calc(100vh + ${outerHeight}px)` }}
            className="bg-surface"
        >
            {/* Inner sticky panel: slides up from the bottom (natural CSS), then
          sticks at top:0 (z-50) covering the Creative Suite (z-40). */}
            <div className="sticky top-15 h-screen overflow-hidden bg-surface flex items-center z-[50]">
                <motion.div
                    ref={containerRef}
                    style={{ x }}
                    className="flex gap-12 px-[10vw] flex-nowrap"
                >
                    {/* Title card */}
                    <div className="flex-shrink-0 w-[500px] flex flex-col justify-center">
                        <h2 className="text-5xl font-headline font-bold mb-4">Director's Cut</h2>
                        <p className="text-on-surface-variant">Featured productions made with Induce.</p>
                    </div>

                    {items.map((item) => (
                        <div key={item.title} className="flex-shrink-0 w-80 md:w-96 group">
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

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
const Footer = () => (
    <footer className="bg-[#0e0e0e] w-full py-20 px-12 border-t border-outline-variant/10 relative z-[60]">
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

// ---------------------------------------------------------------------------
// Particles canvas
// ---------------------------------------------------------------------------
const Particles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
        let rafId: number;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = Array.from({ length: 50 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5,
            }));
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x > canvas.width) p.x = 0;
                if (p.x < 0) p.x = canvas.width;
                if (p.y > canvas.height) p.y = 0;
                if (p.y < 0) p.y = canvas.height;
                ctx.fillStyle = `rgba(204, 51, 0, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            rafId = requestAnimationFrame(animate);
        };

        init();
        animate();
        window.addEventListener("resize", init);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", init);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-5 opacity-30"
        />
    );
};

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
export default function App() {
    // Single window-level scrollY — drives ALL sticky-section transitions.
    // Using absolute pixel values (multiples of window.innerHeight) avoids the
    // measurement problem with sticky elements: their getBoundingClientRect
    // position changes once they're stuck, which breaks useScroll({ target }).
    const { scrollY } = useScroll();

    // Document layout (each section occupies exactly 1 viewport height):
    //   0×vh  → 1×vh  : Hero
    //   1×vh  → 2×vh  : ScriptToVideo (sticky, z-20) — scale-out as Director enters
    //   2×vh  → 3×vh  : DirectorMode  (sticky, z-30) — scale-out as Creative enters
    //   3×vh  → 4×vh  : CreativeSuite (sticky, z-40) — scale-out as Gallery enters
    //   4×vh  → ...   : HorizontalGallery (sticky inner, z-50) — horizontal pan

    // ScriptToVideo scales 1→0.95 as DirectorMode slides in from the bottom.
    const s1Scale = useTransform(scrollY, (v) =>
        lerp01(v, 1 * window.innerHeight, 2 * window.innerHeight, 1, 0.95)
    );
    const s1Opacity = useTransform(scrollY, (v) =>
        lerp01(v, 1 * window.innerHeight, 2 * window.innerHeight, 1, 1)
    );

    // DirectorMode scales 1→0.95 as CreativeSuite slides in.
    const s2Scale = useTransform(scrollY, (v) =>
        lerp01(v, 2 * window.innerHeight, 3 * window.innerHeight, 1, 0.95)
    );
    const s2Opacity = useTransform(scrollY, (v) =>
        lerp01(v, 2 * window.innerHeight, 3 * window.innerHeight, 1, 1)
    );

    // CreativeSuite scales 1→0.95 as the Gallery slides in.
    const s3Scale = useTransform(scrollY, (v) =>
        lerp01(v, 3 * window.innerHeight, 4 * window.innerHeight, 1, 0.95)
    );
    const s3Opacity = useTransform(scrollY, (v) =>
        lerp01(v, 3 * window.innerHeight, 4 * window.innerHeight, 1, 1)
    );

    return (
        // overflow-x:clip (not hidden) — clip prevents horizontal scrollbars without
        // creating a scroll container, which would silently break position:sticky on
        // all descendants. This is the single most common cause of sticky failures.
        <div className="bg-surface text-on-surface font-body selection:bg-primary-container/30"
            style={{ overflowX: 'clip' }}>
            <Particles />
            <Navbar />
            <main>
                {/* ── Hero ──────────────────────────────────────────── z-10 */}
                <Hero />

                {/* ── Script-to-Video ───────────────────────────────── z-20
            h-screen (not min-h-screen) keeps each section exactly 100vh so
            the lerp01 breakpoints stay accurate. overflow-hidden clips content
            that might exceed the viewport without creating a scroll container. */}
                <motion.section
                    style={{ zIndex: 20, scale: s1Scale, opacity: s1Opacity }}
                    className="sticky top-0 h-screen pt-[80px] w-full bg-surface overflow-hidden flex items-center justify-center"
                >
                    <ScriptToVideo />
                </motion.section>

                {/* ── Director Mode ─────────────────────────────────── z-30 */}
                <motion.section
                    style={{ zIndex: 30, scale: s2Scale, opacity: s2Opacity }}
                    className="sticky top-0 h-screen w-full bg-surface overflow-hidden flex items-center justify-center"
                >
                    <DirectorMode />
                </motion.section>

                {/* ── Creative Suite ────────────────────────────────── z-40 */}
                <motion.section
                    style={{ zIndex: 40, scale: s3Scale, opacity: s3Opacity }}
                    className="sticky top-0 h-screen w-full bg-surface overflow-hidden flex items-center justify-center"
                >
                    <CreativeSuite />
                </motion.section>

                {/* ── Director's Cut horizontal gallery ─────────────── z-50
            Slides up over Creative Suite (natural CSS), sticks at top:0,
            then pans horizontally for the full gallery width. */}
                <HorizontalGallery />

                {/* ── Final CTA ─────────────────────────────────────── z-60 */}
                <section className="py-40 bg-surface px-8 relative z-[60]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-16 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-container/10 to-transparent" />
                        <h2 className="text-5xl font-headline font-bold mb-8">Ready to take the chair?</h2>
                        <p className="text-on-surface-variant text-lg mb-12 max-w-lg mx-auto">
                            Join the elite rank of AI directors and bring your untold stories to life today.
                        </p>
                        <button className="bg-primary-container text-on-primary-container px-12 py-5 rounded-full font-headline font-bold text-xl tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary-container/30">
                            Get Early Access
                        </button>
                    </motion.div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
