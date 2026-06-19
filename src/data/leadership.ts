/**
 * ARI leadership. `image` is optional — the LeadershipCard renders an
 * initials avatar when no headshot is supplied, so the page never breaks
 * on a missing asset. Replace `bio` and `image` with finalized content.
 */

export type Leader = {
  name: string;
  title: string;
  bio: string;
  linkedin?: string;
  image?: string;
};

export const LEADERSHIP: Leader[] = [
  {
    name: "Andrew Kossack",
    title: "President & Chief Executive Officer",
    bio: "Leads ARI's mission to catalyze opportunities that enhance national security and drive economic prosperity, setting strategy across the organization's initiatives and partnerships.",
    linkedin: "https://www.linkedin.com/company/theari",
  },
  {
    name: "Leslie Wolfe",
    title: "Chief Operating Officer",
    bio: "Directs ARI's operations and program execution, translating strategy into the operating models, platforms, and outcomes that move the mission forward.",
    linkedin: "https://www.linkedin.com/company/theari",
  },
  {
    name: "Benjamin Griffin",
    title: "Executive Vice President, Programs",
    bio: "Oversees ARI's portfolio of initiatives, aligning partners and resources to accelerate critical technologies from interest to impact.",
    linkedin: "https://www.linkedin.com/company/theari",
  },
  {
    name: "William Kiser",
    title: "Executive Vice President, Strategy",
    bio: "Shapes ARI's strategic direction across markets and capabilities, connecting mission needs with the partners and pathways to meet them.",
    linkedin: "https://www.linkedin.com/company/theari",
  },
  {
    name: "Trevor Foughty",
    title: "Executive Vice President, Public Affairs",
    bio: "Leads ARI's public affairs, communications, and media engagement, telling the story of the innovation ecosystem ARI convenes and supports.",
    linkedin: "https://www.linkedin.com/company/theari",
  },
];
