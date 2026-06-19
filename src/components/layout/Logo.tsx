import Link from "next/link";

type LogoProps = {
  /** Show the full "Applied Research Institute" lockup subtitle. */
  showWordmark?: boolean;
  className?: string;
};

/**
 * ARI brand mark — a geometric green "node" glyph plus the ARI wordmark.
 * Implemented in markup (not an image) so it stays crisp and themeable.
 * Swap the glyph for the official logo asset when available.
 */
export function Logo({ showWordmark = true, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="ARI — Applied Research Institute, home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="32"
          height="32"
          rx="9"
          stroke="rgba(59,174,72,0.45)"
          strokeWidth="1.5"
        />
        <path
          d="M9 24 L17 8 L25 24"
          stroke="#3BAE48"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M12.5 18 H21.5"
          stroke="#F6F8F7"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-ari-white">
          ARI
        </span>
        {showWordmark ? (
          <span className="mt-0.5 hidden text-[0.62rem] font-medium uppercase tracking-[0.16em] text-ari-subtle sm:block">
            Applied Research Institute
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export default Logo;
