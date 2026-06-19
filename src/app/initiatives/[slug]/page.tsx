import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import CTASection from "@/components/layout/CTASection";
import Button from "@/components/ui/Button";
import CapabilityCard from "@/components/content/CapabilityCard";
import { Icon } from "@/components/visual/Icon";
import { pageMetadata } from "@/lib/seo";
import { INITIATIVES, getInitiative } from "@/data/initiatives";
import { getCapability } from "@/data/capabilities";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return INITIATIVES.map((initiative) => ({ slug: initiative.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const initiative = getInitiative(slug);
  if (!initiative) return {};
  return pageMetadata({
    title: initiative.name,
    description: initiative.summary,
    path: initiative.href,
  });
}

export default async function InitiativePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const initiative = getInitiative(slug);
  if (!initiative) notFound();

  const capabilities = initiative.capabilities
    .map(getCapability)
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <PageHero
        eyebrow={initiative.category}
        title={initiative.name}
        description={initiative.detail ?? initiative.summary}
        actions={
          <>
            <Button href="/contact" icon="arrow-right">
              Partner With ARI
            </Button>
            <Button href="/initiatives" variant="secondary">
              All Initiatives
            </Button>
          </>
        }
      />

      {/* Overview */}
      <section className="section">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="surface p-8 sm:p-10">
              <p className="eyebrow">Overview</p>
              <h2 className="mt-4 text-2xl font-bold text-ari-white sm:text-3xl">
                What this initiative does
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ari-muted">
                {initiative.detail ?? initiative.summary}
              </p>
              <p className="mt-4 leading-relaxed text-ari-muted">
                ARI convenes the right partners, structures the operating model,
                and accelerates the pathway from interest to measurable outcome —
                the approach behind every initiative in the portfolio.
              </p>
            </div>

            <aside className="card h-fit">
              <p className="eyebrow">At a Glance</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Icon name="layers" size={18} className="text-ari-green" />
                  <div>
                    <dt className="text-ari-subtle">Category</dt>
                    <dd className="font-semibold text-ari-white">
                      {initiative.category}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="target" size={18} className="mt-0.5 text-ari-green" />
                  <div>
                    <dt className="text-ari-subtle">Markets &amp; Capabilities</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {capabilities.map((capability) => (
                        <Link
                          key={capability.id}
                          href="/markets-capabilities"
                          className="tag"
                        >
                          {capability.title}
                        </Link>
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related capabilities */}
      {capabilities.length ? (
        <section className="section">
          <Container>
            <SectionHeader
              eyebrow="Related Capabilities"
              title="Where this initiative creates impact"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability) => (
                <CapabilityCard key={capability.id} capability={capability} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTASection
        title={`Interested in ${initiative.name}?`}
        body="ARI helps partners connect to the right programs, people, and pathways."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore All Initiatives", href: "/initiatives" }}
      />
    </>
  );
}
