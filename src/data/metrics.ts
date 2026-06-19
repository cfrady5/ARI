/**
 * Core ARI impact metrics. Reused on the homepage impact dashboard and the
 * Impact page so the numbers stay consistent everywhere they appear.
 */

import type { IconName } from "@/components/visual/Icon";

export type Metric = {
  value: string;
  label: string;
  description: string;
  icon: IconName;
};

export const METRICS: Metric[] = [
  {
    value: "25,000+",
    label: "Global Network",
    description:
      "Connecting a global network of more than 25,000 partners and institutions advancing technology and national security.",
    icon: "network",
  },
  {
    value: "19,000+",
    label: "High-Value Jobs",
    description:
      "Driving the creation of high-value jobs and empowering innovators to shape the future of technology and national security.",
    icon: "users",
  },
  {
    value: "51",
    label: "Average Days for Procurement",
    description:
      "ARI's Rapid Acquisition Marketplace has reduced the average procurement time to 51 days to contract.",
    icon: "clock",
  },
  {
    value: "$450M+",
    label: "Funding Distributed",
    description:
      "ARI programs have awarded partners more than $450M in state and federal funding.",
    icon: "coins",
  },
  {
    value: "$8.6B+",
    label: "Projected Economic Impact",
    description:
      "ARI-backed initiatives are on track to produce more than $8.6B in economic impact in the next decade.",
    icon: "trending",
  },
];
