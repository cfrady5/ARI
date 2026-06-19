import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import CTASection from "@/components/layout/CTASection";
import Button from "@/components/ui/Button";
import FeatureCard from "@/components/content/FeatureCard";
import InitiativeCard from "@/components/content/InitiativeCard";
import StatCard from "@/components/content/StatCard";
import NewsletterSignup from "@/components/content/NewsletterSignup";
import PartnerLogoStrip from "@/components/content/PartnerLogoStrip";
import { DataPanel } from "@/components/visual/DataPanel";
import { IconBadge } from "@/components/visual/IconBadge";
import { Icon } from "@/components/visual/Icon";
import { WHAT_ARI_DOES } from "@/data/approach";
import {
  HOMEPAGE_INITIATIVE_SLUGS,
  getInitiative,
} from "@/data/initiatives";
import { CAPABILITIES } from "@/data/capabilities";
import { METRICS } from "@/data/metrics";
import { SITE } from "@/data/site";

const homepageInitiatives = HOMEPAGE_INITIATIVE_SLUGS.map(getInitiative).filter(
  (i): i is NonNullable<typeof i> => Boolean(i),
);

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow={SITE.tagline}
        title={
          <>
            Catalyzing innovation for national security and economic{" "}
            <span className="accent">prosperity.</span>
          </>
        }
        description="ARI brings together government, industry, academia, and mission-driven partners to move critical technologies into real-world use with speed, discipline, and scale."
        actions={
          <>
            <Button href="/initiatives" icon="arrow-right">
              Explore Our Initiatives
            </Button>
            <Button href="/contact" variant="secondary">
              Partner With ARI
            </Button>
          </>
        }
        aside={<DataPanel metrics={METRICS.slice(0, 4)} heading="ARI Impact Network" />}
      />

      {/* 2. Trust Bar */}
      <section className="section-tight">
        <Container>
          <PartnerLogoStrip copy="Trusted by public, private, academic, and mission-driven partners advancing national security, economic growth, and critical technology deployment." />
        </Container>
      </section>

      {/* 3. What ARI Does */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="What ARI Does"
            title={
              <>
                ARI turns complex innovation challenges into executable{" "}
                <span className="accent">pathways.</span>
              </>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_ARI_DOES.map((item, index) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                index={index + 1}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Featured Initiatives */}
      <section className="section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Initiatives"
              title={
                <>
                  Platforms powering mission-driven{" "}
                  <span className="accent">innovation.</span>
                </>
              }
            />
            <Button href="/initiatives" variant="secondary" icon="arrow-right">
              View All Initiatives
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homepageInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.slug} initiative={initiative} />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Impact Metrics */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="ARI Impact Network"
            title={
              <>
                Measured outcomes across innovation, funding, workforce, and
                economic <span className="accent">growth.</span>
              </>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {METRICS.map((metric) => (
              <StatCard key={metric.label} metric={metric} />
            ))}
            <div className="card flex flex-col justify-center bg-[rgba(31,54,85,0.5)]">
              <p className="text-lg font-bold text-ari-white">
                A network built for impact.
              </p>
              <p className="mt-2 text-sm text-ari-muted">
                Every number reflects partners aligned, technologies moved, and
                opportunities created.
              </p>
              <Link href="/impact" className="link-arrow mt-4">
                View Impact
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Markets & Capabilities Preview */}
      <section className="section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Markets & Capabilities"
              title={
                <>
                  Focused on the technologies shaping national{" "}
                  <span className="accent">competitiveness.</span>
                </>
              }
            />
            <Button
              href="/markets-capabilities"
              variant="secondary"
              icon="arrow-right"
            >
              Explore Markets & Capabilities
            </Button>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <li
                key={capability.id}
                className="card card-interactive flex items-center gap-4 py-5"
              >
                <IconBadge name={capability.icon} size="sm" />
                <span className="font-semibold text-ari-white">
                  {capability.title}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 7. Newsletter Signup */}
      <NewsletterSignup />

      {/* 8. Final CTA */}
      <CTASection
        title="Have a mission, challenge, or capability ready to move?"
        body="ARI helps partners structure the pathway, align the right stakeholders, and move from intent to execution."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore Initiatives", href: "/initiatives" }}
      />
    </>
  );
}
