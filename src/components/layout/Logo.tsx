"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * ARI home-button logo: the official white "ARI" mark + stacked
 * "Applied Research Institute" wordmark, matching the brand lockup on a dark
 * surface. Falls back to a typographic mark if the image asset is missing.
 *
 * Mark asset: public/brand/ari-mark-white.png (white, transparent bg).
 * NEXT_PUBLIC_BASE_PATH ("/ARI" on Pages, "" locally) is prefixed so the asset
 * resolves under the project subpath.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const MARK_SRC = `${BASE}/brand/ari-mark-white.png`;

type LogoProps = {
  showWordmark?: boolean;
  className?: string;
  /** Height utility for the mark image (default h-7 ≈ 28px). */
  markClassName?: string;
};

export function Logo({
  showWordmark = true,
  className = "",
  markClassName = "h-7",
}: LogoProps) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <Link
      href="/"
      aria-label="ARI — Applied Research Institute, home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={MARK_SRC}
          alt="ARI"
          onError={() => setImgOk(false)}
          className={`w-auto ${markClassName}`}
        />
      ) : (
        <span
          aria-hidden="true"
          className="text-[1.65rem] font-extrabold leading-none tracking-[-0.04em]"
        >
          <span className="text-ari-green-dark">A</span>
          <span className="text-ari-green">RI</span>
        </span>
      )}

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
    </Link>
  );
}

export default Logo;
