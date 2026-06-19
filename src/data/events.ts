/**
 * ARI events. Representative sample content for the rebuild — replace with
 * finalized event details. `image` is optional (branded placeholder used when
 * absent). Past vs. upcoming is derived from `date`.
 */

export type EventItem = {
  slug: string;
  name: string;
  date: string; // ISO date
  dateLabel: string; // human label, e.g. "October 14, 2026"
  location: string;
  description: string;
  registrationUrl?: string;
  recapUrl?: string;
  image?: string;
  featured?: boolean;
};

export const EVENTS: EventItem[] = [
  {
    slug: "midwest-defense-innovation-summit-2026",
    name: "Midwest Defense Innovation Summit 2026",
    date: "2026-10-14",
    dateLabel: "October 14–15, 2026",
    location: "Indianapolis, IN",
    description:
      "ARI's flagship convening brings the defense innovation ecosystem together around regional capability, mission needs, and the partnerships that accelerate outcomes.",
    registrationUrl: "/contact",
    featured: true,
  },
  {
    slug: "ram-industry-day-2026",
    name: "Rapid Acquisition Marketplace Industry Day",
    date: "2026-09-09",
    dateLabel: "September 9, 2026",
    location: "Virtual",
    description:
      "A working session for solution providers and mission owners on how to engage the Rapid Acquisition Marketplace and move from opportunity to award.",
    registrationUrl: "/contact",
  },
  {
    slug: "heartland-bioworks-workforce-forum-2026",
    name: "Heartland BioWorks Workforce Forum",
    date: "2026-08-20",
    dateLabel: "August 20, 2026",
    location: "Indianapolis, IN",
    description:
      "Industry, academia, and government partners align on the talent pipelines that scale resilient domestic biomanufacturing.",
    registrationUrl: "/contact",
  },
  {
    slug: "silicon-crossroads-tech-showcase-2025",
    name: "Silicon Crossroads Technology Showcase",
    date: "2025-11-06",
    dateLabel: "November 6, 2025",
    location: "West Lafayette, IN",
    description:
      "Researchers and manufacturers showcased progress moving trusted microelectronics from prototype toward production.",
    recapUrl: "/press-insights/silicon-crossroads-lab-to-fab",
  },
  {
    slug: "scitechconnect-partner-convening-2025",
    name: "SciTechCONNECT Partner Convening",
    date: "2025-09-18",
    dateLabel: "September 18, 2025",
    location: "Virtual",
    description:
      "Science and technology communities connected with mission needs, funding, and collaboration opportunities across the ARI network.",
    recapUrl: "/press-insights/state-of-defense-innovation-report",
  },
  {
    slug: "midwest-defense-innovation-summit-2025",
    name: "Midwest Defense Innovation Summit 2025",
    date: "2025-10-08",
    dateLabel: "October 8, 2025",
    location: "Indianapolis, IN",
    description:
      "The 2025 Summit convened leaders across sectors to advance mission needs and accelerate regional defense innovation.",
    recapUrl: "/press-insights/midwest-defense-innovation-summit-recap",
  },
];

/** Reference date for upcoming/past partitioning (today, per build context). */
const TODAY = "2026-06-19";

export function getFeaturedEvent(): EventItem {
  return EVENTS.find((e) => e.featured) ?? EVENTS[0];
}

export function getUpcomingEvents(): EventItem[] {
  return EVENTS.filter((e) => e.date >= TODAY && !e.featured).sort((a, b) =>
    a.date < b.date ? -1 : 1,
  );
}

export function getPastEvents(): EventItem[] {
  return EVENTS.filter((e) => e.date < TODAY).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}
