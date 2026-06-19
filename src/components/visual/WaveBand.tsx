"use client";

import { useEffect, useRef } from "react";

/**
 * Green "ribbon" particle wave — a flat sheet of fine dots that twists along
 * its length: broad and face-on (showing the dot grid) where it turns toward
 * the viewer, pinching to a thin line where it turns edge-on. The centerline
 * keeps a dramatic upward slope to the right and the whole thing drifts
 * right-to-left. Transparent, lightweight, DPR-aware, static under
 * prefers-reduced-motion. (Inspired by flowing particle-wave artwork.)
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

      const t = time * 0.0005; // slow drift / twist, right → left
      const twist = 2.6; // how many times the ribbon twists across the width
      const rows = 24; // dots across the ribbon's width
      const step = w > 700 ? 5 : 9;

      for (let x = -10; x <= w; x += step) {
        const nx = x / w;

        // Horizontal undulating centerline (~2 humps), centered in the box —
        // matches the flowing-ribbon reference (no steep slope).
        const centerY =
          h * 0.5 +
          Math.sin(nx * 13 + t) * h * 0.2 +
          Math.sin(nx * 6.5 - t * 0.7) * h * 0.05;

        // Fairly uniform ribbon width.
        const halfW = h * 0.2 * (0.85 + nx * 0.15);

        // Twist angle along the length (+t animates the twist / drift).
        const theta = nx * twist * TWO_PI + t;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // Fade only at the extreme edges (mostly off-screen).
        const edge = Math.min(1, Math.min(nx, 1 - nx) / 0.06);
        if (edge <= 0) continue;

        for (let v = 0; v < rows; v++) {
          const s = (v / (rows - 1)) * 2 - 1; // -1..1 across the ribbon

          // Flat ribbon: width projects vertically by cos(theta); the sin
          // component is "depth" used only for brightness/size.
          const y = centerY + s * halfW * cosT;
          if (y < -6 || y > h + 6) continue;

          const depth = (s * sinT + 1) / 2; // 0 = back, 1 = front
          // Fade near both the top and bottom of the band (centered ribbon).
          const fade =
            Math.min(1, Math.max(0, y / (h * 0.16))) *
            Math.min(1, Math.max(0, (h - y) / (h * 0.16)));
          const alpha = edge * fade * (0.12 + depth * 0.72);
          if (alpha <= 0.02) continue;

          const g = Math.round(150 + depth * 95);
          const r = Math.round(28 + depth * 48);
          const size = 0.5 + depth * 1.0;

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
