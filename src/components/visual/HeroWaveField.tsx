"use client";

import { useEffect, useRef } from "react";

/**
 * Flowing green "wave field" — the hero's signature visual.
 * Renders undulating dotted strands on a transparent canvas so it sits over
 * the pure-black hero. Lightweight (no deps), DPR-aware, and fully static when
 * the user prefers reduced motion.
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
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      if (width === 0 || height === 0) return;

      const t = time * 0.00012;
      const strandGap = 13;
      const strands = Math.ceil(height / strandGap) + 4;
      const step = width > 700 ? 9 : 13;

      for (let s = 0; s < strands; s++) {
        const baseY = s * strandGap - strandGap * 2;
        // Per-strand offset so strands don't move in lockstep.
        const phase = s * 0.32;

        for (let x = 0; x <= width; x += step) {
          const nx = x / width; // 0..1 left→right

          // Wave height: amplitude and energy build toward the right.
          const amp = 8 + nx * nx * 70;
          const y =
            baseY +
            Math.sin(nx * 6.5 + phase + t * 6) * amp +
            Math.sin(nx * 13 + phase * 1.7 - t * 4) * amp * 0.35;

          // Fade in from the left (keeps text side clean) + soft right edge.
          const leftFade = Math.max(0, nx - 0.18) / 0.82;
          const edge = 1 - Math.max(0, nx - 0.9) / 0.1;
          const alpha = Math.min(1, leftFade * leftFade) * edge * 0.85;
          if (alpha <= 0.02) continue;

          // Brighter green on wave crests.
          const lift = (Math.sin(nx * 6.5 + phase + t * 6) + 1) / 2;
          const g = Math.round(160 + lift * 70);
          const r = Math.round(40 + lift * 40);

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, 80, ${alpha})`;
          ctx.arc(x, y, nx * 1.4 + 0.5, 0, Math.PI * 2);
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
    if (reduceMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

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
