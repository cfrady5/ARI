/**
 * Impact page content: pillars and case studies.
 * Case studies link to related initiatives and a representative metric.
 */

import type { IconName } from "@/components/visual/Icon";

export type ImpactPillar = {
  title: string;
  description: string;
  icon: IconName;
};

export const IMPACT_PILLARS: ImpactPillar[] = [
  {
    title: "Technology Transition",
    description:
      "Moving emerging technologies from research and prototype into deployed, mission-ready capability.",
    icon: "bolt",
  },
  {
    title: "Economic Growth",
    description:
      "Converting innovation into durable regional capacity, investment, and economic value.",
    icon: "trending",
  },
  {
    title: "Workforce Development",
    description:
      "Building the skilled, mission-ready talent pipelines that critical industries depend on.",
    icon: "users",
  },
  {
    title: "National Security",
    description:
      "Strengthening the technologies and supply chains essential to national defense and resilience.",
    icon: "shield",
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  initiative: string;
  outcome: string;
  metric: string;
  href: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ram-acquisition-acceleration",
    title: "Compressing the path from opportunity to award",
    initiative: "Rapid Acquisition Marketplace",
    outcome:
      "A commercial-first marketplace with transparent evaluation reduced the average procurement timeline dramatically — without sacrificing rigor.",
    metric: "51 days average to contract",
    href: "/press-insights/ram-reaches-51-days-to-contract",
  },
  {
    slug: "heartland-bioworks-hq",
    title: "Building resilient domestic biomanufacturing",
    initiative: "Heartland BioWorks",
    outcome:
      "Aligned industry, academia, and government partners to expand the facilities, supply chains, and talent for regional biomanufacturing.",
    metric: "Regional biomanufacturing capacity",
    href: "/press-insights/heartland-bioworks-headquarters",
  },
  {
    slug: "silicon-crossroads-commons",
    title: "Accelerating trusted microelectronics to production",
    initiative: "Silicon Crossroads Microelectronics Commons",
    outcome:
      "Connected regional research strengths with manufacturers and mission owners to shorten the lab-to-fab transition.",
    metric: "Lab-to-fab transition accelerated",
    href: "/press-insights/silicon-crossroads-lab-to-fab",
  },
  {
    slug: "darpaconnect-pathway",
    title: "Opening the door for first-time innovators",
    initiative: "DARPAConnect",
    outcome:
      "A no-cost program lowered the barrier to engaging DARPA, broadening the base of talent contributing to national security.",
    metric: "Innovator pathway expanded",
    href: "/press-insights/darpaconnect-innovator-pathway",
  },
  {
    slug: "mdis-convening",
    title: "Convening the regional defense innovation ecosystem",
    initiative: "Midwest Defense Innovation Summit",
    outcome:
      "Brought leaders across sectors together to align on mission needs and form the relationships that drive execution.",
    metric: "Ecosystem alignment at scale",
    href: "/press-insights/midwest-defense-innovation-summit-recap",
  },
];
