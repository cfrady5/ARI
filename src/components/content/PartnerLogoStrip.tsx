/**
 * Trust bar / partner strip. Uses neutral text placeholders for partner
 * categories (no fabricated logos). Swap in real partner logos when available.
 */

const PARTNER_TYPES = [
  "Government",
  "Industry",
  "Academia",
  "Research",
  "Mission-Driven",
];

type PartnerLogoStripProps = {
  copy: string;
};

export function PartnerLogoStrip({ copy }: PartnerLogoStripProps) {
  return (
    <div className="surface px-6 py-7 sm:px-10">
      <p className="text-center text-sm leading-relaxed text-ari-muted">
        {copy}
      </p>
      <hr className="divider-green my-6" />
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {PARTNER_TYPES.map((type) => (
          <li
            key={type}
            className="text-sm font-semibold uppercase tracking-[0.14em] text-ari-subtle"
          >
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PartnerLogoStrip;
