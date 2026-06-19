/**
 * Decorative, non-interactive visual primitives. All are aria-hidden and
 * pointer-events-none so they never interfere with content or accessibility.
 */

type DivProps = { className?: string };

/** Thin green accent rule used under eyebrows and section headers. */
export function GreenAccentLine({ className = "" }: DivProps) {
  return (
    <span
      aria-hidden="true"
      className={`block h-px w-16 bg-gradient-to-r from-ari-green to-transparent ${className}`}
    />
  );
}

/** Faint green dot matrix texture. */
export function DotMatrix({ className = "" }: DivProps) {
  return (
    <div
      aria-hidden="true"
      className={`pattern-dots pointer-events-none opacity-60 ${className}`}
    />
  );
}

/** Soft radial brand glow ("orb") for layering behind panels. */
export function GradientOrb({
  className = "",
  color = "green",
}: DivProps & { color?: "green" | "navy" }) {
  const tint =
    color === "green"
      ? "rgba(59,174,72,0.18)"
      : "rgba(31,54,85,0.55)";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none rounded-full blur-3xl ${className}`}
      style={{
        background: `radial-gradient(circle, ${tint}, transparent 70%)`,
      }}
    />
  );
}

/** Subtle network-node SVG overlay for hero / panel backgrounds. */
export function NetworkPattern({ className = "" }: DivProps) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      viewBox="0 0 400 300"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="rgba(59,174,72,0.28)" strokeWidth="1">
        <path d="M40 60 L160 110 L120 220 M160 110 L300 70 L360 180 M300 70 L260 200 L120 220 M260 200 L360 180" />
      </g>
      <g fill="rgba(59,174,72,0.55)">
        <circle cx="40" cy="60" r="3" />
        <circle cx="160" cy="110" r="4" />
        <circle cx="300" cy="70" r="3" />
        <circle cx="120" cy="220" r="3.5" />
        <circle cx="260" cy="200" r="3" />
        <circle cx="360" cy="180" r="3" />
      </g>
    </svg>
  );
}

/** Green corner brackets framing a panel. */
export function CornerFrame({ className = "" }: DivProps) {
  const corner =
    "absolute h-5 w-5 border-ari-green/40";
  return (
    <span aria-hidden="true" className={`pointer-events-none ${className}`}>
      <span className={`${corner} left-0 top-0 border-l border-t rounded-tl-md`} />
      <span className={`${corner} right-0 top-0 border-r border-t rounded-tr-md`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l rounded-bl-md`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r rounded-br-md`} />
    </span>
  );
}
