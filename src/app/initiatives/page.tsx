import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import CTASection from "@/components/layout/CTASection";
import Button from "@/components/ui/Button";
import ProcessSteps from "@/components/content/ProcessSteps";
import InitiativeFilter from "@/components/interactive/InitiativeFilter";
import { IconBadge } from "@/components/visual/IconBadge";
import { Icon } from "@/components/visual/Icon";
import { CornerFrame, NetworkPattern } from "@/components/visual/Decor";
import { pageMetadata } from "@/lib/seo";
import { INITIATIVE_PROCESS } from "@/data/approach";
import { getInitiative } from "@/data/initiatives";

export const metadata: Metadata = pageMetadata({
  title: "Initiatives",
  description:
    "The platforms powering national security innovation. ARI builds initiatives that connect mission needs, emerging technologies, partners, and pathways to measurable outcomes.",
  path: "/initiatives",
});

const RAM = getInitiative("rapid-acquisition-marketplace")!;

const RAM_FEATURES = [
  "Commercial-first access",
  "Video-based solution submissions",
  "Transparent evaluation criteria",
  "Digital review workflows",
  "Faster path from opportunity to award",
];

export default function InitiativesPage() {
  return (
    <>
      <PageHero
        eyebrow="ARI Initiatives"
        title={
          <>
            The platforms powering national security{" "}
            <span className="accent">innovation.</span>
          </>
        }
        description="ARI builds and supports initiatives that connect mission needs, emerging technologies, partners, and pathways to measurable outcomes."
      />

      {/* Featured Initiative: Rapid Acquisition Marketplace */}
      <section className="section">
        <Container>
          <div className="surface relative grid gap-10 overflow-hidden p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <NetworkPattern className="absolute right-0 top-0 h-72 w-72 opacity-25" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <IconBadge name={RAM.icon} />
                <span className="tag">Featured Initiative</span>
              </div>
              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                {RAM.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ari-muted">
                {RAM.summary}
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {RAM_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-ari-white"
                  >
                    <span className="mt-0.5 text-ari-green">
                      <Icon name="check" size={18} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={RAM.href} icon="arrow-right">
                  Explore RAM
                </Button>
              </div>
            </div>

            {/* Right-side process highlight */}
            <div className="relative">
              <div className="card relative overflow-hidden">
                <CornerFrame className="absolute inset-3" />
                <p className="eyebrow">From Opportunity to Award</p>
                <p className="stat-figure mt-4 text-5xl">51</p>
                <p className="text-sm text-ari-muted">
                  average days to contract
                </p>
                <ol className="mt-6 space-y-3">
                  {[
                    "Submit a video-based solution",
                    "Transparent evaluation",
                    "Digital review workflow",
                    "Awardable outcome",
                  ].map((step, index) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border-green)] text-xs font-bold text-ari-green">
                        {index + 1}
                      </span>
                      <span className="text-sm text-ari-white">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Filter Bar + Initiative Grid */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Program Directory"
            title={
              <>
                Explore the full ARI{" "}
                <span className="accent">portfolio.</span>
              </>
            }
            description="Filter by focus area to find the initiatives most relevant to your mission, market, or partnership."
          />
          <div className="mt-8">
            <InitiativeFilter />
          </div>
        </Container>
      </section>

      {/* How ARI Builds Initiatives */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Our Method"
            title={
              <>
                From mission need to measurable{" "}
                <span className="accent">impact.</span>
              </>
            }
          />
          <div className="mt-10">
            <ProcessSteps steps={INITIATIVE_PROCESS} />
          </div>
        </Container>
      </section>

      <CTASection
        title="Have a challenge that needs the right operating model?"
        body="ARI structures the pathway, aligns the right stakeholders, and moves from intent to execution."
        primary={{ label: "Start a Conversation", href: "/contact" }}
      />
    </>
  );
}
