"use client";

import { useEffect, useRef } from "react";

/**
 * Green flowing dotted-wave sheet (no twist/helix).
 * A band of fine dots whose centerline starts low on the left (below the
 * headline) and sweeps up to the middle of the right edge, gently undulating
 * and drifting right-to-left. Transparent, lightweight, DPR-aware, and held
 * static under prefers-reduced-motion.
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

    const TWO_PI = Math.PI * 2;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      if (!w || !h) return;

      const t = time * 0.0005; // slow drift, right → left
      const rows = 16; // dots across the band thickness
      const step = w > 700 ? 5 : 9;

      for (let x = -10; x <= w; x += step) {
        const nx = x / w;

        // Start low-left (below the text) and rise to the middle on the right.
        const centerY =
          h * 0.86 -
          Math.pow(nx, 1.25) * h * 0.4 +
          Math.sin(nx * 9 + t) * h * 0.05 +
          Math.sin(nx * 4 - t * 0.6) * h * 0.03;

        const bandHalf = h * 0.1 * (0.8 + nx * 0.4); // slightly fuller right

        // Fade in/out only at the far horizontal edges.
        const edge = Math.min(1, Math.min(nx, 1 - nx) / 0.05);
        if (edge <= 0) continue;

        for (let v = 0; v < rows; v++) {
          const s = v / (rows - 1) - 0.5; // -0.5..0.5 across the band

          // Per-row ripple gives the sheet an organic, flowing surface.
          const ripple = Math.sin(nx * 13 + v * 0.55 + t * 1.1) * h * 0.018;
          const y = centerY + s * bandHalf * 2 + ripple;
          if (y < -6 || y > h + 6) continue;

          // Soft fade toward the band's top/bottom edges.
          const vFade = 1 - Math.abs(s) * 1.7;
          if (vFade <= 0) continue;

          // The top of the band reads a touch brighter (light from above).
          const bright = 0.45 + (0.5 - s) * 0.55;
          const alpha = edge * vFade * (0.18 + bright * 0.5);
          if (alpha <= 0.02) continue;

          const g = Math.round(150 + bright * 95);
          const r = Math.round(28 + bright * 45);
          const size = 0.55 + bright * 0.65;

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, 78, ${alpha})`;
          ctx.arc(x, y, size, 0, TWO_PI);
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
