import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import ContactForm from "@/components/interactive/ContactForm";
import { ContactCard } from "@/components/content/ContactCard";
import { Icon } from "@/components/visual/Icon";
import { pageMetadata } from "@/lib/seo";
import { SITE, CONTACTS, MISSION_PILLARS } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a conversation with ARI. Whether you represent government, industry, academia, media, or a mission-driven organization, ARI can connect the right people, programs, and pathways.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact ARI"
        title={
          <>
            Start a conversation with{" "}
            <span className="accent">ARI.</span>
          </>
        }
        description="Whether you represent government, industry, academia, media, or a mission-driven organization, ARI can help connect the right people, programs, and pathways."
      />

      {/* Contact Form */}
      <section className="section">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="Send a Message"
                title="Tell us about your mission, challenge, or capability"
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <aside className="card h-fit">
              <p className="eyebrow">{SITE.tagline}</p>
              <p className="mt-4 leading-relaxed text-ari-muted">
                ARI helps partners structure the pathway, align the right
                stakeholders, and move from intent to execution.
              </p>
              <ul className="mt-6 space-y-3">
                {MISSION_PILLARS.map((pillar) => (
                  <li
                    key={pillar.title}
                    className="flex items-start gap-2.5 text-sm text-ari-white"
                  >
                    <span className="mt-0.5 text-ari-green">
                      <Icon name="check" size={18} />
                    </span>
                    {pillar.title}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      {/* Contact Cards */}
      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Direct Contacts"
            title="Reach the right team"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ContactCard
              title={CONTACTS.general.title}
              description={CONTACTS.general.description}
              email={CONTACTS.general.email}
              icon="mail"
            />
            <ContactCard
              title={CONTACTS.media.title}
              description={CONTACTS.media.description}
              name={CONTACTS.media.name}
              email={CONTACTS.media.email}
              icon="building"
            />
            <ContactCard
              title={CONTACTS.partnership.title}
              description={CONTACTS.partnership.description}
              email={CONTACTS.partnership.email}
              icon="network"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
