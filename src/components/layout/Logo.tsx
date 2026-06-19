import Link from "next/link";

type LogoProps = {
  /** Show the stacked "Applied Research Institute" wordmark beside the mark. */
  showWordmark?: boolean;
  className?: string;
};

/**
 * ARI brand lockup — the green "ARI" mark + stacked wordmark, matching the
 * official logo structure on a dark surface (green mark, white wordmark).
 *
 * To use the exact official artwork instead of this typographic lockup, drop
 * the file at `public/brand/ari-logo.svg` and swap the inner markup for:
 *   <img src="/brand/ari-logo.svg" alt="ARI — Applied Research Institute" />
 * (Next prefixes the basePath automatically when referenced via next/image,
 * or prefix manually for a raw <img>.)
 */
export function Logo({ showWordmark = true, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="ARI — Applied Research Institute, home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      {/* Two-tone green "ARI" mark */}
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
    </Link>
  );
}

export default Logo;
