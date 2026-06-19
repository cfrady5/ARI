import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import CTASection from "@/components/layout/CTASection";
import FeatureCard from "@/components/content/FeatureCard";
import LeadershipCard from "@/components/content/LeadershipCard";
import Timeline from "@/components/content/Timeline";
import { IconBadge } from "@/components/visual/IconBadge";
import { CornerFrame, NetworkPattern } from "@/components/visual/Decor";
import type { IconName } from "@/components/visual/Icon";
import { pageMetadata } from "@/lib/seo";
import { SITE, MISSION_PILLARS } from "@/data/site";
import { OPERATING_PRINCIPLES, HISTORY_TIMELINE } from "@/data/approach";
import { LEADERSHIP } from "@/data/leadership";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "ARI is the operating partner for mission-driven innovation — a neutral platform helping government, industry, academia, and research move complex ideas into executable outcomes.",
  path: "/about",
});

const PILLAR_ICONS: IconName[] = ["shield", "network", "trending"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ARI"
        title={
          <>
            The operating partner for mission-driven{" "}
            <span className="accent">innovation.</span>
          </>
        }
        description="ARI helps government, industry, academia, and research partners move complex ideas into executable programs, partnerships, and outcomes."
      />

      {/* Mission & Vision */}
      <section className="section">
        <Container>
          <p className="eyebrow-plain">{SITE.tagline}</p>
          <SectionHeader
            className="mt-4"
            title={
              <>
                Catalyzing opportunities that enhance national security and drive
                economic <span className="accent">prosperity.</span>
              </>
            }
            description="ARI exists to create and facilitate opportunities for partners and stakeholders working at the intersection of national security, technology, research, and economic growth."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {MISSION_PILLARS.map((pillar, index) => (
              <FeatureCard
                key={pillar.title}
                icon={PILLAR_ICONS[index]}
                title={pillar.title}
                description={pillar.description}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ARI Role */}
      <section className="section">
        <Container>
          <div className="surface relative grid gap-8 overflow-hidden p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <NetworkPattern className="absolute right-0 top-0 h-64 w-64 opacity-30" />
            <div className="relative">
              <p className="eyebrow">ARI Role</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                A neutral platform for complex innovation{" "}
                <span className="accent">work.</span>
              </h2>
            </div>
            <p className="relative text-lg leading-relaxed text-ari-muted">
              ARI sits between sectors, helping partners align around shared
              needs, structure programs, coordinate execution, and measure
              impact.
            </p>
          </div>
        </Container>
      </section>

      {/* Operating Principles */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Operating Principles"
            title="How ARI works"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OPERATING_PRINCIPLES.map((principle) => (
              <FeatureCard
                key={principle.title}
                icon={principle.icon}
                title={principle.title}
                description={principle.description}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* History Timeline */}
      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader
              eyebrow="Our History"
              title={
                <>
                  Building the platform for national security{" "}
                  <span className="accent">innovation.</span>
                </>
              }
              description="From founding to a network of more than 25,000 partners, ARI has grown by turning shared mission needs into executable pathways."
            />
            <Timeline items={HISTORY_TIMELINE} />
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="section">
        <Container>
          <div className="relative">
            <CornerFrame className="absolute -inset-3 hidden sm:block" />
            <IconBadge name="users" className="relative" />
          </div>
          <SectionHeader
            className="mt-6"
            eyebrow="Leadership"
            title="The team guiding ARI's mission"
            description="Experienced leaders across government, industry, and research who turn strategy into measurable outcomes."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((leader) => (
              <LeadershipCard key={leader.name} leader={leader} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Explore the initiatives moving ARI's mission forward."
        primary={{ label: "Explore Our Initiatives", href: "/initiatives" }}
        secondary={{ label: "Partner With ARI", href: "/contact" }}
      />
    </>
  );
}
