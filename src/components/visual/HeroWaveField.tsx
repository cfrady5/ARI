"use client";

import { useEffect, useRef } from "react";

/**
 * Flowing green "wave field" — the hero's signature visual.
 * Fine dotted strands form a wave surface that sweeps up toward the right and
 * drifts rightward over time, matching the reference. Transparent canvas over
 * the pure-black hero; lightweight, DPR-aware, static under reduced-motion.
 */
export function HeroWaveField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      if (!width || !height) return;

      const t = time * 0.0004;
      const strands = Math.round(height / 9);
      const gap = height / strands;
      const step = width > 700 ? 6 : 10;

      for (let i = 0; i < strands; i++) {
        const baseY = i * gap + gap * 0.5;
        const sp = i * 0.18; // per-strand phase

        for (let x = -20; x <= width; x += step) {
          const nx = x / width; // 0..1 left→right

          // Shared wave "surface": crests travel rightward (−t) over time.
          const surface =
            Math.sin(nx * 3.2 - t * 2 + sp) * 36 +
            Math.sin(nx * 7.5 - t * 1.3 + sp * 0.6) * 14;

          // Energy grows toward the right; strands rise into the upper-right.
          const grow = 0.25 + nx * nx * 1.3;
          const rise = -nx * nx * height * 0.18;

          const y = baseY + surface * grow + rise;
          if (y < -10 || y > height + 10) continue;

          // Clean black on the left (text side); soft fade on the right edge.
          const leftFade = Math.min(1, Math.max(0, (nx - 0.14) / 0.86));
          const rightFade = 1 - Math.max(0, (nx - 0.92) / 0.08);
          const alpha = leftFade * leftFade * rightFade * 0.9;
          if (alpha <= 0.02) continue;

          // Brighter green on crests.
          const crest = (Math.sin(nx * 3.2 - t * 2 + sp) + 1) / 2;
          const g = Math.round(150 + crest * 90);
          const r = Math.round(30 + crest * 45);
          const radius = 0.45 + nx * 1.0;

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, 78, ${alpha})`;
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    const loop = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduceMotion) draw(0);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}

export default HeroWaveField;
