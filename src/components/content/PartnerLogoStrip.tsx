import { Icon } from "@/components/visual/Icon";

/**
 * Partner / trust strip styled after the reference hero band: partner
 * wordmarks separated by dividers, flanked by decorative carousel chevrons.
 * Wordmarks stand in for partner logos until real logo assets are supplied.
 */

const PARTNERS = [
  "DARPAConnect",
  "Platform One / Marketplace One",
  "Heartland BioWorks",
  "SciTechCONNECT",
  "Silicon Crossroads",
];

export function PartnerLogoStrip({ label }: { label?: string }) {
  return (
    <div className="w-full">
      {label ? (
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-ari-subtle">
          {label}
        </p>
      ) : null}
      <div className="flex items-center gap-3 sm:gap-5">
        <span
          aria-hidden="true"
          className="hidden text-ari-subtle sm:inline-flex"
        >
          <Icon name="chevron-down" size={20} className="rotate-90" />
        </span>

        <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:flex-nowrap sm:divide-x sm:divide-white/10">
          {PARTNERS.map((partner) => (
            <li
              key={partner}
              className="px-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ari-muted transition-colors hover:text-ari-white sm:px-6 sm:text-sm"
            >
              {partner}
            </li>
          ))}
        </ul>

        <span
          aria-hidden="true"
          className="hidden text-ari-subtle sm:inline-flex"
        >
          <Icon name="chevron-down" size={20} className="-rotate-90" />
        </span>
      </div>
    </div>
  );
}

export default PartnerLogoStrip;
