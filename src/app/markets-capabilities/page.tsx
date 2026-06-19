import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import CTASection from "@/components/layout/CTASection";
import CapabilityCard from "@/components/content/CapabilityCard";
import { Icon } from "@/components/visual/Icon";
import { pageMetadata } from "@/lib/seo";
import {
  CAPABILITIES,
  getInitiativesByCapability,
} from "@/data/capabilities";

export const metadata: Metadata = pageMetadata({
  title: "Markets & Capabilities",
  description:
    "ARI works across critical technology areas where national security, industrial capacity, research, and economic growth intersect — from AI and trusted microelectronics to biotechnology and advanced manufacturing.",
  path: "/markets-capabilities",
});

/** Capabilities that have at least one mapped initiative, for the matrix. */
const MATRIX = CAPABILITIES.map((capability) => ({
  capability,
  initiatives: getInitiativesByCapability(capability.id),
})).filter((row) => row.initiatives.length > 0);

export default function MarketsCapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Markets & Capabilities"
        title={
          <>
            Focused on the technologies and industries shaping national{" "}
            <span className="accent">competitiveness.</span>
          </>
        }
        description="ARI works across critical technology areas where national security, industrial capacity, research, and economic growth intersect."
      />

      {/* Capability Grid */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Capability Areas"
            title={
              <>
                The critical technologies ARI moves{" "}
                <span className="accent">forward.</span>
              </>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <CapabilityCard key={capability.id} capability={capability} />
            ))}
          </div>
        </Container>
      </section>

      {/* Related Initiatives matrix */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Capability × Initiative"
            title="How capabilities map to initiatives"
            description="Each capability area is advanced through specific ARI initiatives — the platforms where mission needs meet execution."
          />
          <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border-green)]">
            <ul className="divide-y divide-[var(--border-soft)]">
              {MATRIX.map(({ capability, initiatives }) => (
                <li
                  key={capability.id}
                  className="grid gap-4 bg-[rgba(31,54,85,0.18)] px-5 py-5 transition-colors hover:bg-[rgba(31,54,85,0.34)] sm:grid-cols-[0.9fr_1.6fr] sm:items-center sm:px-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-ari-green">
                      <Icon name={capability.icon} size={20} />
                    </span>
                    <span className="font-bold text-ari-white">
                      {capability.title}
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {initiatives.map((initiative) => (
                      <li key={initiative.slug}>
                        <Link href={initiative.href} className="tag">
                          {initiative.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTASection
        title="Working in one of these critical technology areas?"
        body="ARI connects capability to mission needs, partners, and pathways to adoption."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore Initiatives", href: "/initiatives" }}
      />
    </>
  );
}
