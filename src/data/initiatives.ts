/**
 * ARI initiatives — the program directory and proof engine.
 * `category` values map to the Initiatives page FilterBar.
 * `capabilities` values map to capability ids in capabilities.ts.
 */

import type { IconName } from "@/components/visual/Icon";

export const INITIATIVE_CATEGORIES = [
  "All",
  "Acquisition & Transition",
  "Defense Innovation",
  "Biotechnology",
  "Microelectronics",
  "Workforce",
  "Convening & Events",
  "Research Partnerships",
  "AI & Digital",
] as const;

export type InitiativeCategory = (typeof INITIATIVE_CATEGORIES)[number];

export type Initiative = {
  slug: string;
  name: string;
  category: Exclude<InitiativeCategory, "All">;
  summary: string;
  /** Longer description used on feature panels. */
  detail?: string;
  /** Capability ids this initiative advances. */
  capabilities: string[];
  href: string;
  icon: IconName;
  featured?: boolean;
};

export const INITIATIVES: Initiative[] = [
  {
    slug: "rapid-acquisition-marketplace",
    name: "Rapid Acquisition Marketplace",
    category: "Acquisition & Transition",
    summary:
      "A faster, more transparent pathway for moving emerging capabilities from initial engagement to awardable outcomes.",
    detail:
      "The Rapid Acquisition Marketplace gives mission owners a commercial-first front door to emerging technology. Video-based submissions, transparent evaluation criteria, and digital review workflows compress the path from opportunity to award.",
    capabilities: ["ai", "acquisition", "autonomy"],
    href: "/initiatives/rapid-acquisition-marketplace",
    icon: "bolt",
    featured: true,
  },
  {
    slug: "heartland-bioworks",
    name: "Heartland BioWorks",
    category: "Biotechnology",
    summary:
      "A regional biomanufacturing initiative building the talent, facilities, and supply chains for resilient domestic production.",
    capabilities: ["biotech", "manufacturing", "workforce"],
    href: "/initiatives/heartland-bioworks",
    icon: "dna",
  },
  {
    slug: "silicon-crossroads",
    name: "Silicon Crossroads Microelectronics Commons",
    category: "Microelectronics",
    summary:
      "A regional hub accelerating the lab-to-fab transition of trusted microelectronics for defense and commercial use.",
    capabilities: ["microelectronics", "manufacturing", "workforce"],
    href: "/initiatives/silicon-crossroads",
    icon: "chip",
  },
  {
    slug: "darpaconnect",
    name: "DARPAConnect",
    category: "Research Partnerships",
    summary:
      "A no-cost program helping innovators learn how to work with DARPA and engage the agency with confidence.",
    capabilities: ["ai", "autonomy", "acquisition"],
    href: "/initiatives/darpaconnect",
    icon: "compass",
  },
  {
    slug: "tradewinds",
    name: "Tradewinds",
    category: "Acquisition & Transition",
    summary:
      "A digital acquisition marketplace streamlining how the defense enterprise discovers and procures AI and digital solutions.",
    capabilities: ["ai", "acquisition", "cyber-physical"],
    href: "/initiatives/tradewinds",
    icon: "wind",
  },
  {
    slug: "scitechconnect",
    name: "SciTechCONNECT",
    category: "Research Partnerships",
    summary:
      "A platform connecting science and technology communities to mission needs, funding, and collaboration opportunities.",
    capabilities: ["ai", "workforce", "acquisition"],
    href: "/initiatives/scitechconnect",
    icon: "link",
  },
  {
    slug: "midwest-defense-innovation-summit",
    name: "Midwest Defense Innovation Summit",
    category: "Convening & Events",
    summary:
      "A flagship convening bringing the defense innovation ecosystem together around regional capability and mission needs.",
    capabilities: ["acquisition", "workforce", "autonomy"],
    href: "/initiatives/midwest-defense-innovation-summit",
    icon: "calendar",
  },
  {
    slug: "indiana-research-consortium",
    name: "Indiana Research Consortium",
    category: "Research Partnerships",
    summary:
      "A coordinated research partnership aligning university capability with national security and economic priorities.",
    capabilities: ["microelectronics", "biotech", "hubs"],
    href: "/initiatives/indiana-research-consortium",
    icon: "atom",
  },
  {
    slug: "platform-one-marketplace-one",
    name: "Platform One / Marketplace One",
    category: "Defense Innovation",
    summary:
      "Supporting modern software and acquisition pathways that help the defense enterprise adopt capability at speed.",
    capabilities: ["ai", "acquisition", "cyber-physical"],
    href: "/initiatives/platform-one-marketplace-one",
    icon: "layers",
  },
];

/** Initiative ordering for the homepage featured strip. */
export const HOMEPAGE_INITIATIVE_SLUGS = [
  "rapid-acquisition-marketplace",
  "heartland-bioworks",
  "silicon-crossroads",
  "darpaconnect",
  "tradewinds",
  "scitechconnect",
  "midwest-defense-innovation-summit",
  "indiana-research-consortium",
];

export function getInitiative(slug: string): Initiative | undefined {
  return INITIATIVES.find((i) => i.slug === slug);
}
