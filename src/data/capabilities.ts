/**
 * Markets & Capabilities — the critical technology areas ARI works across.
 * `id` values are referenced by initiatives.ts for cross-linking.
 */

import type { IconName } from "@/components/visual/Icon";
import { INITIATIVES, type Initiative } from "@/data/initiatives";

export type Capability = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
};

export const CAPABILITIES: Capability[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    description:
      "Accelerating trusted AI and machine learning into mission systems and acquisition pathways.",
    icon: "brain",
  },
  {
    id: "microelectronics",
    title: "Trusted Microelectronics",
    description:
      "Strengthening domestic design, fabrication, and packaging of secure microelectronics.",
    icon: "chip",
  },
  {
    id: "autonomy",
    title: "Autonomy",
    description:
      "Advancing autonomous systems across air, land, sea, and space for defense and industry.",
    icon: "drone",
  },
  {
    id: "biotech",
    title: "Biotechnology",
    description:
      "Building resilient biomanufacturing and the talent to scale next-generation bioeconomy capability.",
    icon: "dna",
  },
  {
    id: "manufacturing",
    title: "Advanced Manufacturing",
    description:
      "Modernizing production capacity and supply chains for critical defense and commercial goods.",
    icon: "factory",
  },
  {
    id: "cyber-physical",
    title: "Cyber-Physical Systems",
    description:
      "Securing the convergence of digital and physical systems across critical infrastructure.",
    icon: "shield",
  },
  {
    id: "energy",
    title: "Hydrogen & Energy",
    description:
      "Developing energy resilience, hydrogen, and clean power for mission and economic needs.",
    icon: "bolt",
  },
  {
    id: "connectivity",
    title: "5G / 6G",
    description:
      "Enabling secure, high-performance connectivity for distributed mission operations.",
    icon: "signal",
  },
  {
    id: "battery",
    title: "Battery Technology",
    description:
      "Strengthening domestic battery and energy-storage capacity for defense and industry.",
    icon: "battery",
  },
  {
    id: "acquisition",
    title: "Acquisition & Technology Transition",
    description:
      "Reducing friction between innovation and adoption so capability reaches the mission faster.",
    icon: "bolt",
  },
  {
    id: "workforce",
    title: "Workforce Systems",
    description:
      "Building the skilled, mission-ready talent pipelines that critical industries depend on.",
    icon: "users",
  },
  {
    id: "hubs",
    title: "Regional Tech Hubs",
    description:
      "Concentrating research, industry, and talent to grow durable regional innovation capacity.",
    icon: "map",
  },
];

export function getCapability(id: string): Capability | undefined {
  return CAPABILITIES.find((c) => c.id === id);
}

/** Initiatives that advance a given capability id. */
export function getInitiativesByCapability(id: string): Initiative[] {
  return INITIATIVES.filter((i) => i.capabilities.includes(id));
}
