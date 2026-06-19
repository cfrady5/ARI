import fs from "node:fs";
import path from "node:path";
import { PARTNERS } from "@/data/partners";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Whether a partner logo asset exists in /public (checked at build time). */
function logoExists(file: string): boolean {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", "brand", "partners", file),
    );
  } catch {
    return false;
  }
}

/**
 * Infinite, auto-scrolling partner strip for the bottom of the hero.
 *
 * Server component: for each partner we check at build time whether its white
 * logo asset exists. If it does we render the image; otherwise we render the
 * partner name as text. This avoids broken-image icons for logos that haven't
 * been added yet and needs no client JS (pure CSS marquee). The item list is
 * rendered twice so the animation loops seamlessly; it pauses on hover and is
 * held static under prefers-reduced-motion.
 */
export function PartnerMarquee() {
  const items = PARTNERS.map((p) => ({ ...p, has: logoExists(p.logo) }));

  const renderItems = (prefix: string) =>
    items.map((p) => (
      <li
        key={`${prefix}-${p.name}`}
        className="flex shrink-0 items-center px-8 sm:px-12"
      >
        {p.has ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${BASE}/brand/partners/${p.logo}`}
            alt={p.name}
            className="h-9 w-auto object-contain opacity-80 transition-opacity hover:opacity-100 sm:h-10"
          />
        ) : (
          <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.14em] text-ari-muted transition-colors hover:text-ari-white sm:text-base">
            {p.name}
          </span>
        )}
      </li>
    ));

  return (
    <div
      className="marquee-viewport marquee-mask w-full overflow-hidden"
      role="region"
      aria-label="ARI partners and initiatives"
    >
      <ul className="marquee-track items-center">
        {renderItems("a")}
        {renderItems("b")}
      </ul>
    </div>
  );
}

export default PartnerMarquee;
