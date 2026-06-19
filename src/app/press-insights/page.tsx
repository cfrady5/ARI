import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import CTASection from "@/components/layout/CTASection";
import ArticleCard from "@/components/content/ArticleCard";
import ArticleFilter from "@/components/interactive/ArticleFilter";
import { ContactCard } from "@/components/content/ContactCard";
import { pageMetadata } from "@/lib/seo";
import { getFeaturedArticle, getArticles } from "@/data/articles";
import { CONTACTS } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Press & Insights",
  description:
    "News, announcements, and analysis from the ARI network — updates, reports, stories, and perspectives from across ARI's initiatives and partner ecosystem.",
  path: "/press-insights",
});

const featured = getFeaturedArticle();
const rest = getArticles(featured.slug);

export default function PressInsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Press & Insights"
        title={
          <>
            News, announcements, and analysis from the ARI{" "}
            <span className="accent">network.</span>
          </>
        }
        description="Explore updates, reports, stories, and perspectives from across ARI's initiatives and partner ecosystem."
      />

      {/* Featured Article */}
      <section className="section">
        <Container>
          <SectionHeader eyebrow="Featured" title="Latest from ARI" />
          <div className="mt-8">
            <ArticleCard article={featured} featured />
          </div>
        </Container>
      </section>

      {/* Filters + Article Grid */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="All Coverage"
            title={
              <>
                Browse the ARI{" "}
                <span className="accent">newsroom.</span>
              </>
            }
          />
          <div className="mt-8">
            <ArticleFilter articles={rest} />
          </div>
        </Container>
      </section>

      {/* Media contact */}
      <section className="section">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <SectionHeader
              eyebrow="Media"
              title="Working on a story?"
              description="For press, interviews, and public affairs requests, reach ARI's media team directly."
            />
            <ContactCard
              title={CONTACTS.media.title}
              description={CONTACTS.media.description}
              name={CONTACTS.media.name}
              email={CONTACTS.media.email}
            />
          </div>
        </Container>
      </section>

      <CTASection
        title="Stay connected to the ARI network."
        body="Sign up for updates, insights, events, and opportunities across the innovation ecosystem."
        primary={{ label: "Partner With ARI", href: "/contact" }}
        secondary={{ label: "View Events", href: "/events" }}
      />
    </>
  );
}
