import type { SVGProps } from "react";

/**
 * Dependency-free inline-SVG icon set (Lucide-style stroke icons).
 * All icons use `currentColor` so they inherit ARI green / white as needed.
 * Keeping icons inline avoids shipping an icon-font or library.
 */

export type IconName =
  // metrics
  | "network"
  | "users"
  | "clock"
  | "coins"
  | "trending"
  // initiatives
  | "bolt"
  | "dna"
  | "chip"
  | "compass"
  | "wind"
  | "link"
  | "calendar"
  | "atom"
  | "layers"
  // capabilities
  | "brain"
  | "drone"
  | "factory"
  | "shield"
  | "signal"
  | "battery"
  | "map"
  | "target"
  // ui
  | "arrow-right"
  | "arrow-up-right"
  | "menu"
  | "close"
  | "check"
  | "mail"
  | "external"
  | "linkedin"
  | "search"
  | "plus"
  | "minus"
  | "chevron-down"
  | "pin"
  | "building";

const PATHS: Record<IconName, React.ReactNode> = {
  network: (
    <>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M10.4 6.7 6.6 16M13.6 6.7 17.4 16M7 18h10" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6M17.5 19a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="7" rx="5.5" ry="2.6" />
      <path d="M3.5 7v4c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6V7" />
      <path d="M9 13.5v3.4c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4" />
      <ellipse cx="14.5" cy="13" rx="5.5" ry="2.6" />
    </>
  ),
  trending: (
    <>
      <path d="M3 17 9.5 10.5l3.5 3.5L21 6" />
      <path d="M15 6h6v6" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  dna: (
    <>
      <path d="M7 3c0 5 10 7 10 12M17 3c0 5-10 7-10 12M7 21c0-2 10-4 10-9M17 21c0-2-10-4-10-9" />
      <path d="M8.5 6h7M8.5 18h7M10 9h4M10 15h4" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10.5 11h3v2h-3z" />
      <path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  wind: (
    <path d="M3 9h10a2.5 2.5 0 1 0-2.5-2.5M3 14h14a2.5 2.5 0 1 1-2.5 2.5M3 12h7" />
  ),
  link: (
    <>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M8 12 6.5 13.5a3.2 3.2 0 0 0 4.5 4.5L12.5 16.5" />
      <path d="M16 12l1.5-1.5a3.2 3.2 0 0 0-4.5-4.5L11.5 7.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M3 13l9 5 9-5M3 18l9 5 9-5" opacity="0.55" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5.5a3 3 0 0 0-5.5 1.6A3 3 0 0 0 5 12a3 3 0 0 0 1.8 4.6A2.8 2.8 0 0 0 12 18Z" />
      <path d="M12 5.5a3 3 0 0 1 5.5 1.6A3 3 0 0 1 19 12a3 3 0 0 1-1.8 4.6A2.8 2.8 0 0 1 12 18Z" />
    </>
  ),
  drone: (
    <>
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9.5 9.5 6 6M14.5 9.5 18 6M9.5 14.5 6 18M14.5 14.5 18 18" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20V10l5 3V10l5 3V8l5 3v9H3Z" />
      <path d="M7 20v-3M12 20v-3M17 20v-3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 8 7 9 4-1 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  signal: (
    <>
      <path d="M5 13a9 9 0 0 1 14 0M8 16a5 5 0 0 1 8 0" />
      <circle cx="12" cy="19" r="1.2" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="8" width="15" height="8" rx="2" />
      <path d="M21 11v2" />
      <path d="M8 12h4M10 10v4" />
    </>
  ),
  map: (
    <>
      <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m4 12 5 5L20 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10v7M7 7.5v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4-4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M9 21v-3h6v3" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}

export default Icon;
