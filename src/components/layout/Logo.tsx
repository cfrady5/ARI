"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * ARI home-button logo.
 *
 * Uses the official white logo artwork at `public/brand/ari-logo-white.png`
 * (or .svg — see note) when present, and gracefully falls back to a
 * typographic lockup so the header/footer never shows a broken image.
 *
 * TO USE THE OFFICIAL LOGO: add the all-white logo file to the repo at
 *   public/brand/ari-logo-white.png
 * (PNG with a transparent background, or replace the extension below with
 * .svg if you upload an SVG). That's the only step — it then renders here.
 *
 * NEXT_PUBLIC_BASE_PATH ("/ARI" on GitHub Pages, "" locally) is prefixed so
 * the asset resolves correctly under the project subpath.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const LOGO_SRC = `${BASE}/brand/ari-logo-white.png`;

type LogoProps = {
  showWordmark?: boolean;
  className?: string;
  /** Height utility for the image variant (default h-9 ≈ 36px). */
  imgClassName?: string;
};

export function Logo({
  showWordmark = true,
  className = "",
  imgClassName = "h-9",
}: LogoProps) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <Link
      href="/"
      aria-label="ARI — Applied Research Institute, home"
      className={`group inline-flex items-center ${className}`}
    >
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={LOGO_SRC}
          alt="ARI — Applied Research Institute"
          onError={() => setImgOk(false)}
          className={`w-auto ${imgClassName}`}
        />
      ) : (
        <span className="inline-flex items-center gap-3">
          <span
            aria-hidden="true"
            className="text-[1.65rem] font-extrabold leading-none tracking-[-0.04em]"
          >
            <span className="text-ari-green-dark">A</span>
            <span className="text-ari-green">RI</span>
          </span>
          {showWordmark ? (
            <>
              <span
                aria-hidden="true"
                className="hidden h-7 w-px bg-white/20 sm:block"
              />
              <span className="hidden flex-col text-[0.6rem] font-semibold uppercase leading-[1.35] tracking-[0.16em] text-ari-white sm:flex">
                <span>Applied</span>
                <span>Research</span>
                <span>Institute</span>
              </span>
            </>
          ) : null}
        </span>
      )}
    </Link>
  );
}

export default Logo;
