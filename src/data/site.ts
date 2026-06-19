/**
 * Site-wide constants: identity, mission, contacts and shared copy.
 * Single source of truth referenced across layout, footer and metadata.
 */

export const SITE = {
  name: "Applied Research Institute",
  shortName: "ARI",
  url: "https://theari.us",
  mission:
    "ARI catalyzes opportunities that enhance national security and drive economic prosperity.",
  tagline: "Because the Warfighter Can't Wait.",
  description:
    "Applied Research Institute catalyzes opportunities that enhance national security, accelerate innovation, and drive economic prosperity.",
  footerDescription:
    "Applied Research Institute catalyzes opportunities that enhance national security, accelerate innovation, and drive economic prosperity.",
} as const;

export const MISSION_PILLARS = [
  {
    title: "Enhance National Security",
    description:
      "Move critical technologies into the hands of those defending the nation with speed and discipline.",
  },
  {
    title: "Catalyze Opportunities",
    description:
      "Create trusted environments where government, industry, academia, and research partners align around shared mission needs.",
  },
  {
    title: "Drive Economic Prosperity",
    description:
      "Convert innovation into high-value jobs, regional capacity, and durable economic growth.",
  },
] as const;

export const CONTACTS = {
  general: {
    title: "General Inquiries",
    description:
      "Questions about ARI, our work, or how to get involved across the innovation ecosystem.",
    email: "info@theari.us",
  },
  media: {
    title: "Media Inquiries",
    description:
      "Press, interviews, and public affairs requests from members of the media.",
    name: "Trevor Foughty, EVP of Public Affairs",
    email: "Trevor.Foughty@theari.us",
  },
  partnership: {
    title: "Partnership Opportunities",
    description:
      "Explore collaboration across government, industry, academia, and mission-driven organizations.",
    email: "partners@theari.us",
  },
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/theari" },
  { label: "X", href: "https://x.com/theari" },
  { label: "YouTube", href: "https://www.youtube.com/@theari" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
] as const;
