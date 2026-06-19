/** Primary navigation used by the header and footer. */

export type NavItem = {
  label: string;
  href: string;
};

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Markets & Capabilities", href: "/markets-capabilities" },
  { label: "Impact", href: "/impact" },
  { label: "Press & Insights", href: "/press-insights" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

/** Curated quick links for the footer (subset + key destinations). */
export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: "About ARI", href: "/about" },
  { label: "Markets & Capabilities", href: "/markets-capabilities" },
  { label: "Impact", href: "/impact" },
  { label: "Press & Insights", href: "/press-insights" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];
