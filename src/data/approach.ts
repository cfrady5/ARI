/**
 * ARI's operating approach: what ARI does, how it builds initiatives,
 * its operating principles, and key history milestones.
 */

import type { IconName } from "@/components/visual/Icon";

export type ApproachItem = {
  title: string;
  description: string;
  icon: IconName;
};

/** Homepage "What ARI Does". */
export const WHAT_ARI_DOES: ApproachItem[] = [
  {
    title: "Convene",
    description:
      "Bring together government, industry, academia, and research partners around shared mission needs.",
    icon: "network",
  },
  {
    title: "Build",
    description:
      "Structure programs, platforms, and operating models that make collaboration easier to execute.",
    icon: "layers",
  },
  {
    title: "Accelerate",
    description:
      "Move technologies, partnerships, and opportunities from early interest to actionable outcomes faster.",
    icon: "bolt",
  },
  {
    title: "Scale",
    description:
      "Measure what works, expand proven pathways, and grow impact across sectors and regions.",
    icon: "trending",
  },
];

/** About page operating principles. */
export const OPERATING_PRINCIPLES: ApproachItem[] = [
  {
    title: "Neutrality",
    description:
      "ARI creates trusted environments where public, private, academic, and mission partners can collaborate.",
    icon: "shield",
  },
  {
    title: "Execution",
    description:
      "ARI turns strategy into operating models, programs, events, marketplaces, and measurable outcomes.",
    icon: "target",
  },
  {
    title: "Speed",
    description:
      "ARI reduces friction so opportunities, technologies, and partnerships can move faster.",
    icon: "bolt",
  },
  {
    title: "Impact",
    description:
      "ARI prioritizes outcomes that strengthen national security and economic prosperity.",
    icon: "trending",
  },
];

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

/** Initiatives page "How ARI Builds Initiatives". */
export const INITIATIVE_PROCESS: ProcessStep[] = [
  {
    step: 1,
    title: "Identify mission need",
    description:
      "Start from a real mission or market need defined with the partners who own it.",
  },
  {
    step: 2,
    title: "Align partners",
    description:
      "Bring government, industry, academia, and research partners around a shared objective.",
  },
  {
    step: 3,
    title: "Structure the program",
    description:
      "Design the operating model, governance, and pathways that make execution repeatable.",
  },
  {
    step: 4,
    title: "Launch the pathway",
    description:
      "Stand up the platform, program, or marketplace and move the first opportunities through it.",
  },
  {
    step: 5,
    title: "Measure and scale impact",
    description:
      "Track outcomes, expand what works, and grow impact across sectors and regions.",
  },
];

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

/** About page history timeline (HTML text, not an image). */
export const HISTORY_TIMELINE: Milestone[] = [
  {
    year: "Founding",
    title: "ARI established",
    description:
      "Applied Research Institute is founded as a neutral platform to connect government, industry, academia, and research around national security innovation.",
  },
  {
    year: "Convening",
    title: "Building the network",
    description:
      "ARI grows a network of partners and institutions and launches its first major convenings to align the ecosystem.",
  },
  {
    year: "Platforms",
    title: "Marketplaces and programs",
    description:
      "ARI stands up acquisition marketplaces and structured programs, including the Rapid Acquisition Marketplace, to accelerate adoption.",
  },
  {
    year: "Regional capability",
    title: "Microelectronics and biomanufacturing",
    description:
      "Initiatives like Silicon Crossroads and Heartland BioWorks expand regional capacity in critical technology areas.",
  },
  {
    year: "Today",
    title: "Scaling measured impact",
    description:
      "ARI connects a network of more than 25,000 partners and is on track to generate billions in projected economic impact.",
  },
];
