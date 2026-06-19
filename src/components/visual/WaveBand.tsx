"use client";

import { useEffect, useRef } from "react";

/**
 * Horizontal green "wave band" — flowing dotted strands that run across the
 * full width and drift right-to-left. Designed to sit directly above the
 * partner logo strip, parallel to the bottom of the hero. Transparent canvas,
 * lightweight, DPR-aware, and held static under prefers-reduced-motion.
 */
export function WaveBand({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      if (!w || !h) return;

      const t = time * 0.0007; // +t makes crests travel right → left
      const strands = Math.max(7, Math.round(h / 9));
      const gap = h / strands;
      const step = w > 700 ? 5 : 9;
      const amp = h * 0.2;

      for (let i = 0; i < strands; i++) {
        const baseY = i * gap + gap * 0.5;
        const sp = i * 0.28;

        for (let x = -10; x <= w; x += step) {
          const nx = x / w;

          const wave =
            Math.sin(nx * 11 + t * 3 + sp) * amp +
            Math.sin(nx * 24 + t * 2 + sp * 0.7) * amp * 0.35;
          const y = baseY + wave * 0.55;
          if (y < -4 || y > h + 4) continue;

          // Soft fade at the left/right edges only.
          const edge = Math.min(1, Math.min(nx, 1 - nx) / 0.1);
          const crest = (Math.sin(nx * 11 + t * 3 + sp) + 1) / 2;
          const alpha = edge * (0.22 + crest * 0.6);
          if (alpha <= 0.02) continue;

          const g = Math.round(150 + crest * 95);
          const r = Math.round(28 + crest * 48);

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, 78, ${alpha})`;
          ctx.arc(x, y, 0.55 + crest * 0.95, 0, Math.PI * 2);
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

export default WaveBand;
