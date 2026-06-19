"use client";

import { useEffect, useRef } from "react";

/**
 * Green "wave band" above the partner logo strip.
 * Dotted strands flow gently right-to-left and sweep upward to the right with
 * a gradually increasing slope (flat at the left, steeper toward the right),
 * echoing the hero reference. Transparent canvas, lightweight, DPR-aware, and
 * held static under prefers-reduced-motion.
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

      const t = time * 0.00018; // slow drift; +t moves crests right → left
      const strands = Math.max(8, Math.round(h / 11));
      const step = w > 700 ? 5 : 9;

      for (let i = 0; i < strands; i++) {
        const frac = strands > 1 ? i / (strands - 1) : 0;
        // Baselines sit in the lower band; the slope lifts them up-right.
        const baseY = h * (0.6 + frac * 0.55);
        const sp = i * 0.3;

        for (let x = -10; x <= w; x += step) {
          const nx = x / w;

          // Gradually increasing upward slope toward the right.
          const slope = -Math.pow(nx, 1.7) * h * 0.72;

          // Undulation, slightly larger toward the right.
          const amp = h * 0.05 * (0.5 + nx);
          const wave =
            Math.sin(nx * 7 + t * 2 + sp) * amp +
            Math.sin(nx * 15 + t * 1.4 + sp * 0.6) * amp * 0.35;

          const y = baseY + slope + wave;
          if (y < -6 || y > h + 6) continue;

          // Fade at left/right edges and softly near the top.
          const edge = Math.min(1, Math.min(nx, 1 - nx) / 0.12);
          const topFade = Math.min(1, y / (h * 0.18));
          const crest = (Math.sin(nx * 7 + t * 2 + sp) + 1) / 2;
          const alpha = edge * Math.max(0, topFade) * (0.22 + crest * 0.62);
          if (alpha <= 0.02) continue;

          const g = Math.round(150 + crest * 95);
          const r = Math.round(28 + crest * 48);

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, 78, ${alpha})`;
          ctx.arc(x, y, 0.55 + nx * 1.0, 0, Math.PI * 2);
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
