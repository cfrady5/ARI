/**
 * Press & Insights content.
 *
 * NOTE: These entries are representative sample content for the rebuild and
 * are intended to be replaced with finalized articles. Categories map to the
 * Press & Insights FilterBar. `image` is optional — ArticleCard renders a
 * branded gradient placeholder when no image is supplied.
 */

export const ARTICLE_CATEGORIES = [
  "All",
  "Press Releases",
  "Reports",
  "Op-Eds",
  "Initiative Updates",
  "In the Media",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export type Article = {
  slug: string;
  title: string;
  category: Exclude<ArticleCategory, "All">;
  date: string; // ISO date
  readTime: string;
  excerpt: string;
  author: string;
  image?: string;
  featured?: boolean;
  body: string[];
  pullQuote?: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "ram-reaches-51-days-to-contract",
    title:
      "Rapid Acquisition Marketplace reaches 51 days to contract milestone",
    category: "Initiative Updates",
    date: "2026-05-28",
    readTime: "4 min read",
    excerpt:
      "ARI's Rapid Acquisition Marketplace has reduced the average procurement timeline to 51 days, demonstrating a faster, more transparent pathway from opportunity to award.",
    author: "ARI Public Affairs",
    featured: true,
    body: [
      "The Rapid Acquisition Marketplace has reached a defining milestone: an average of 51 days from opportunity to contract. The result reflects a deliberate redesign of how mission owners discover, evaluate, and award emerging capability.",
      "Built around commercial-first access, video-based solution submissions, and transparent evaluation criteria, the marketplace removes friction that has long slowed the path from innovation to adoption. Digital review workflows give evaluators a consistent, auditable process while giving solution providers a clear view of how decisions are made.",
      "For mission owners, the impact is measured in speed without sacrificing rigor. For innovators, it is a credible, repeatable pathway into the defense enterprise.",
    ],
    pullQuote:
      "Speed and discipline are not in tension — the marketplace was designed to deliver both.",
  },
  {
    slug: "heartland-bioworks-headquarters",
    title: "Heartland BioWorks advances regional biomanufacturing capacity",
    category: "Press Releases",
    date: "2026-04-15",
    readTime: "5 min read",
    excerpt:
      "A new phase of Heartland BioWorks expands the talent pipelines, facilities, and supply chains that underpin resilient domestic biomanufacturing.",
    author: "ARI Public Affairs",
    body: [
      "Heartland BioWorks is entering a new phase focused on the people, facilities, and supply chains required for resilient domestic biomanufacturing.",
      "The initiative aligns industry, academia, and government partners around shared needs — from workforce development to scale-up capacity — and structures the programs that turn those needs into measurable capability.",
      "The effort reflects ARI's broader approach: convene the right partners, build the operating model, and accelerate the pathway from interest to outcome.",
    ],
  },
  {
    slug: "silicon-crossroads-lab-to-fab",
    title: "Silicon Crossroads accelerates the lab-to-fab transition",
    category: "Initiative Updates",
    date: "2026-03-22",
    readTime: "4 min read",
    excerpt:
      "The Silicon Crossroads Microelectronics Commons is connecting researchers, manufacturers, and mission owners to move trusted microelectronics from prototype to production.",
    author: "ARI Public Affairs",
    body: [
      "Trusted microelectronics are foundational to national security and economic competitiveness. The Silicon Crossroads Microelectronics Commons is built to shorten the distance between promising research and production-ready capability.",
      "By connecting regional research strengths with manufacturing partners and mission owners, the Commons creates a pathway for prototypes to reach the fab — and the field — faster.",
    ],
  },
  {
    slug: "state-of-defense-innovation-report",
    title: "Report: The state of regional defense innovation",
    category: "Reports",
    date: "2026-02-10",
    readTime: "8 min read",
    excerpt:
      "A look at how regional ecosystems are reshaping the pace and scale of defense innovation — and what it means for partners across sectors.",
    author: "ARI Research",
    body: [
      "Regional ecosystems are increasingly where defense innovation happens. This report examines the conditions that allow regions to convert research strength into deployed capability.",
      "Drawing on ARI's work across acquisition, microelectronics, biotechnology, and workforce, the analysis highlights the operating models that move ideas to impact.",
    ],
  },
  {
    slug: "why-the-warfighter-cant-wait",
    title: "Why speed is a national security imperative",
    category: "Op-Eds",
    date: "2026-01-18",
    readTime: "6 min read",
    excerpt:
      "The pace of technological change demands a faster, more disciplined pathway from innovation to mission impact.",
    author: "ARI Leadership",
    body: [
      "The technologies that determine national advantage are moving faster than the systems built to adopt them. Closing that gap is one of the defining challenges of our time.",
      "ARI's role is to reduce friction — to align partners, structure programs, and build the pathways that let capability move at the speed the mission requires.",
    ],
    pullQuote: "Because the Warfighter Can't Wait.",
  },
  {
    slug: "darpaconnect-innovator-pathway",
    title: "DARPAConnect opens the door for first-time innovators",
    category: "Initiative Updates",
    date: "2025-12-05",
    readTime: "3 min read",
    excerpt:
      "A no-cost program is helping researchers and companies learn how to engage DARPA with confidence.",
    author: "ARI Public Affairs",
    body: [
      "DARPAConnect demystifies how to work with DARPA, giving first-time innovators the knowledge and confidence to engage the agency.",
      "The program lowers a longstanding barrier to entry, broadening the base of talent contributing to national security challenges.",
    ],
  },
  {
    slug: "midwest-defense-innovation-summit-recap",
    title: "Midwest Defense Innovation Summit convenes the ecosystem",
    category: "In the Media",
    date: "2025-11-12",
    readTime: "5 min read",
    excerpt:
      "Leaders from government, industry, academia, and research gathered to align on mission needs and accelerate regional capability.",
    author: "ARI Public Affairs",
    body: [
      "The Midwest Defense Innovation Summit brought the regional defense innovation ecosystem together around shared mission needs.",
      "Convening is where alignment begins — and where the relationships that drive execution take shape.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
}

/** Articles sorted newest-first, optionally excluding one slug. */
export function getArticles(excludeSlug?: string): Article[] {
  return [...ARTICLES]
    .filter((a) => a.slug !== excludeSlug)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
