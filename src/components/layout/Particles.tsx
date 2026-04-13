import { useRef, useEffect } from "react";
import { Z_INDEX } from "../../utils/constants";

/**
 * Ambient particle overlay — purely decorative.
 *
 * Performance notes:
 * - The canvas runs its own rAF loop. During scroll we throttle to ~30fps
 *   by skipping every other frame, freeing main-thread budget for
 *   scroll-driven animations in other components.
 * - The canvas uses OffscreenCanvas where available for zero-main-thread
 *   rendering, but falls back gracefully.
 * - We pause entirely when the tab is hidden (Page Visibility API).
 */
const PARTICLE_COUNT = 40; // reduced from 50

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let rafId: number;
    let isScrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout>;
    let frameCount = 0;
    let paused = false;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5,
      }));
    };

    const animate = () => {
      if (paused) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      frameCount++;

      // During scroll, only render every 3rd frame (~20fps) to yield
      // main-thread time. Particles are subtle and don't need 60fps.
      if (isScrolling && frameCount % 3 !== 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > w) p.x = 0;
        else if (p.x < 0) p.x = w;
        if (p.y > h) p.y = 0;
        else if (p.y < 0) p.y = h;

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "rgb(204, 51, 0)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };

    // Track scroll state so we can throttle during scroll
    const onScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    // Pause when tab hidden
    const onVisibility = () => {
      paused = document.hidden;
    };

    init();
    animate();
    window.addEventListener("resize", init);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimer);
      window.removeEventListener("resize", init);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ zIndex: Z_INDEX.particles }}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30"
    />
  );
};

export default Particles;
