import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Z_INDEX } from "../../utils/constants";

const WORDMARK = "INDUCE";

// Simple hook so the typewriter skips for users who prefer reduced motion
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const Footer = () => {
  const reduced = usePrefersReducedMotion();
  const lineRef = useRef<HTMLParagraphElement>(null);
  const textSpanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const startedRef = useRef(false);
  const doneTyping = typed.length >= WORDMARK.length;
  const [overlayRect, setOverlayRect] = useState<{ width: number; left: number } | null>(null);

  // Re-measure text span width whenever typed changes
  useLayoutEffect(() => {
    const span = textSpanRef.current;
    const container = containerRef.current;
    if (!span || !container) return;
    const measure = () => {
      const sr = span.getBoundingClientRect();
      const cr = container.getBoundingClientRect();
      setOverlayRect({ width: sr.width, left: sr.left - cr.left });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(span);
    return () => ro.disconnect();
  }, [typed]);

  // Skip animation immediately if motion is reduced
  useLayoutEffect(() => {
    if (reduced) setTyped(WORDMARK);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const el = lineRef.current;
    if (!el) return;
    const timers: number[] = [];
    let cancelled = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || cancelled || startedRef.current) return;
        startedRef.current = true;
        let i = 0;
        const step = () => {
          if (cancelled) return;
          i += 1;
          setTyped(WORDMARK.slice(0, i));
          if (i < WORDMARK.length) {
            timers.push(window.setTimeout(step, 80 + Math.floor(Math.random() * 60)));
          }
        };
        step();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    obs.observe(el);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      obs.disconnect();
    };
  }, [reduced]);

  return (
    <footer
      style={{ zIndex: Z_INDEX.footer }}
      className="relative bg-[#0e0e0e] w-full border-t border-white/5 overflow-hidden"
    >
      {/* Top strip — links, socials + copyright */}
      <div className="max-w-7xl mx-auto px-8 sm:px-12 pt-16 pb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <a
            href="https://getinduce.com/privacy-policy.html"
            className="font-mono text-[10px] tracking-[0.18em] text-white/30 hover:text-primary-container uppercase transition-colors"
          >
            Privacy Policy
          </a>
          <span className="text-white/10 select-none">|</span>
          <a
            href="https://getinduce.com/termsofservice.html"
            className="font-mono text-[10px] tracking-[0.18em] text-white/30 hover:text-primary-container uppercase transition-colors"
          >
            Terms of Service
          </a>
          <span className="text-white/10 select-none">|</span>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/getinducecom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/30 hover:text-primary-container transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/getinduce-com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/30 hover:text-primary-container transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/* X */}
          <a
            href="https://x.com/getinducecom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="text-white/30 hover:text-primary-container transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.814L4.994 21.75h-3.308l7.519-8.571L1.92 2.25h4.715l3.802 5.007zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        <p className="font-mono text-[9px] tracking-[0.15em] text-white/20 uppercase text-center sm:text-right">
          © 2026 Induce. The AI Media Infrastructure. All rights preserved.
        </p>
      </div>

      {/* Animated wordmark — centered, bottom 20% clipped off the page edge */}
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        style={{ height: "calc(clamp(5rem, 22vw, 20rem) * 0.8)" }}
        aria-hidden="true"
      >
        {/* Sun glow overlay — behind text, exact text width, no extra left space */}
        {overlayRect && (
          <div
            className="absolute bottom-0 pointer-events-none overflow-hidden"
            style={{
              left: overlayRect.left + 10,
              width: overlayRect.width,
              height: "60%",
              background: "radial-gradient(ellipse 70% 90% at 50% 100%, var(--color-primary-container) 0%, transparent 80%)",
              opacity: 0.4,
              zIndex: 0,
            }}
          />
        )}
        <p
          ref={lineRef}
          className="font-headline font-black leading-none tracking-tighter text-white/5 text-center absolute inset-x-0 top-0"
          style={{ fontSize: "clamp(5rem, 22vw, 20rem)", position: "relative", zIndex: 1 }}
        >
          <span ref={textSpanRef}>{typed}</span>
          {!doneTyping && (
            <span className="text-primary-container animate-pulse" style={{ opacity: 0.6 }}>
              ▍
            </span>
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
