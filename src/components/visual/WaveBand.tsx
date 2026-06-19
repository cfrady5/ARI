"use client";

import { useEffect, useRef } from "react";

/**
 * Green "helix" wave band above the partner logo strip.
 *
 * Dots are placed around a twisting tube (a helix): the strands rotate around a
 * centerline that sweeps dramatically upward to the right. Points on the front
 * of the tube are brighter/larger than those on the back, giving a 3-D woven,
 * DNA-like ribbon that drifts right-to-left. Transparent, lightweight,
 * DPR-aware, and held static under prefers-reduced-motion.
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

      const t = time * 0.0006; // slow rotation; pattern drifts right → left
      const turns = 3; // number of helix twists across the width (bigger loops)
      const around = 22; // points around the tube (denser, finer dot field)
      const step = w > 700 ? 5 : 9;

      for (let x = -10; x <= w; x += step) {
        const nx = x / w;

        // Centerline: dramatic convex climb toward the right.
        const centerY = h * 0.96 - Math.pow(nx, 2.4) * h * 0.98;
        // Tube radius widens slightly toward the right.
        const radius = h * 0.18 * (0.5 + nx * 0.85);

        // Fade only at the extreme edges (off-screen), so the helix runs
        // full-strength to — and past — the visible screen edges.
        const edge = Math.min(1, Math.min(nx, 1 - nx) / 0.06);
        if (edge <= 0) continue;

        for (let k = 0; k < around; k++) {
          const v = k / around;
          const angle = nx * turns * TWO_PI + v * TWO_PI + t;

          const y = centerY + Math.sin(angle) * radius;
          if (y < -6 || y > h + 6) continue;

          const depth = (Math.cos(angle) + 1) / 2; // 0 = back, 1 = front
          const topFade = Math.min(1, Math.max(0, y / (h * 0.14)));
          const alpha = edge * topFade * (0.14 + depth * 0.72);
          if (alpha <= 0.02) continue;

          const g = Math.round(150 + depth * 95);
          const r = Math.round(28 + depth * 48);
          // Small, fairly uniform dots → fine "digital" texture.
          const size = 0.6 + depth * 0.85;

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
