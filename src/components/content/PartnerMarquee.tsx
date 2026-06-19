"use client";

import { useState } from "react";
import { PARTNERS, type Partner } from "@/data/partners";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * One marquee item: renders the white partner logo if the asset loads,
 * otherwise falls back to the partner name as text so the strip is never
 * blank while logo assets are still being added.
 */
function PartnerItem({ partner }: { partner: Partner }) {
  const [imgOk, setImgOk] = useState(true);
  const src = `${BASE}/brand/partners/${partner.logo}`;

  return (
    <li className="flex shrink-0 items-center px-8 sm:px-12">
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={partner.name}
          onError={() => setImgOk(false)}
          className="h-8 w-auto object-contain opacity-80 transition-opacity hover:opacity-100 sm:h-9"
        />
      ) : (
        <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.14em] text-ari-muted transition-colors hover:text-ari-white sm:text-base">
          {partner.name}
        </span>
      )}
    </li>
  );
}

/**
 * Infinite, auto-scrolling partner strip for the bottom of the hero.
 * The item list is rendered twice so the CSS marquee loops seamlessly;
 * it pauses on hover and is held static under prefers-reduced-motion.
 */
export function PartnerMarquee() {
  return (
    <div
      className="marquee-viewport marquee-mask w-full overflow-hidden"
      role="region"
      aria-label="ARI partners and initiatives"
    >
      <ul className="marquee-track items-center">
        {PARTNERS.map((partner) => (
          <PartnerItem key={`a-${partner.name}`} partner={partner} />
        ))}
        {/* Duplicate set for a seamless loop (hidden from assistive tech). */}
        {PARTNERS.map((partner) => (
          <PartnerItem key={`b-${partner.name}`} partner={partner} />
        ))}
      </ul>
    </div>
  );
}

export default PartnerMarquee;
