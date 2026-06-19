import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import CTASection from "@/components/layout/CTASection";
import StatCard from "@/components/content/StatCard";
import FeatureCard from "@/components/content/FeatureCard";
import CaseStudyCard from "@/components/content/CaseStudyCard";
import { DataPanel } from "@/components/visual/DataPanel";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/data/site";
import { METRICS } from "@/data/metrics";
import { IMPACT_PILLARS, CASE_STUDIES } from "@/data/impact";

export const metadata: Metadata = pageMetadata({
  title: "Impact",
  description:
    "ARI measures success by the opportunities created, technologies accelerated, partners connected, funding distributed, and economic value generated.",
  path: "/impact",
});

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="ARI Impact"
        title={
          <>
            Measured outcomes across innovation, workforce, funding, and economic{" "}
            <span className="accent">growth.</span>
          </>
        }
        description="ARI measures success by the opportunities created, technologies accelerated, partners connected, funding distributed, and economic value generated."
        aside={<DataPanel metrics={METRICS} heading="ARI Impact Network" />}
      />

      {/* Impact Dashboard */}
      <section className="section">
        <Container>
          <p className="eyebrow-plain">{SITE.tagline}</p>
          <SectionHeader
            className="mt-4"
            title={
              <>
                The numbers behind the{" "}
                <span className="accent">mission.</span>
              </>
            }
            description="Consistent metrics, tracked across every initiative in the ARI network."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {METRICS.map((metric) => (
              <StatCard key={metric.label} metric={metric} />
            ))}
          </div>
        </Container>
      </section>

      {/* Impact Pillars */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Impact Pillars"
            title="Where ARI's work creates value"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT_PILLARS.map((pillar) => (
              <FeatureCard
                key={pillar.title}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Case Studies"
            title={
              <>
                Proof in the{" "}
                <span className="accent">outcomes.</span>
              </>
            }
            description="A closer look at how ARI initiatives turn mission needs into measurable results."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDIES.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Want to be part of ARI's next measurable outcome?"
        body="ARI helps partners structure the pathway and move from intent to execution."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore Initiatives", href: "/initiatives" }}
      />
    </>
  );
}
