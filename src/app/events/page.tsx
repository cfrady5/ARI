import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import CTASection from "@/components/layout/CTASection";
import Button from "@/components/ui/Button";
import EventCard from "@/components/content/EventCard";
import { IconBadge } from "@/components/visual/IconBadge";
import { Icon } from "@/components/visual/Icon";
import { CornerFrame, NetworkPattern } from "@/components/visual/Decor";
import { pageMetadata } from "@/lib/seo";
import {
  getFeaturedEvent,
  getUpcomingEvents,
  getPastEvents,
} from "@/data/events";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "Where the innovation ecosystem comes together. ARI convenes partners across government, industry, academia, and research to advance mission needs and accelerate outcomes.",
  path: "/events",
});

const featured = getFeaturedEvent();
const upcoming = getUpcomingEvents();
const past = getPastEvents();

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="ARI Events"
        title={
          <>
            Where the innovation ecosystem comes{" "}
            <span className="accent">together.</span>
          </>
        }
        description="ARI convenes partners across government, industry, academia, and research to advance mission needs, build relationships, and accelerate outcomes."
      />

      {/* Featured Event */}
      <section className="section">
        <Container>
          <SectionHeader eyebrow="Featured Event" title="Don't miss what's next" />
          <div className="surface relative mt-8 grid gap-8 overflow-hidden p-8 sm:p-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <NetworkPattern className="absolute right-0 top-0 h-72 w-72 opacity-25" />
            <div className="relative">
              <span className="tag">Flagship Convening</span>
              <h3 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                {featured.name}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ari-muted">
                {featured.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-5 text-sm">
                <span className="flex items-center gap-2 text-ari-white">
                  <Icon name="calendar" size={18} className="text-ari-green" />
                  {featured.dateLabel}
                </span>
                <span className="flex items-center gap-2 text-ari-white">
                  <Icon name="pin" size={18} className="text-ari-green" />
                  {featured.location}
                </span>
              </div>
              <div className="mt-8">
                <Button
                  href={featured.registrationUrl ?? "/contact"}
                  icon="arrow-right"
                >
                  Register
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="card relative overflow-hidden text-center">
                <CornerFrame className="absolute inset-3" />
                <IconBadge name="calendar" size="lg" className="mx-auto" />
                <p className="mt-4 text-sm uppercase tracking-[0.16em] text-ari-subtle">
                  Save the Date
                </p>
                <p className="mt-2 text-xl font-bold text-ari-white">
                  {featured.dateLabel}
                </p>
                <p className="mt-1 text-sm text-ari-muted">
                  {featured.location}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Upcoming Events */}
      {upcoming.length ? (
        <section className="section">
          <Container>
            <SectionHeader
              eyebrow="Upcoming"
              title={
                <>
                  Upcoming{" "}
                  <span className="accent">events.</span>
                </>
              }
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Past Events Archive */}
      {past.length ? (
        <section className="section">
          <Container>
            <SectionHeader
              eyebrow="Archive"
              title="Past events"
              description="Recaps, reports, and recordings from previous ARI convenings."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.slug} event={event} past />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTASection
        title="Interested in partnering with ARI on an event?"
        body="From flagship summits to focused working sessions, ARI brings the right people together around shared mission needs."
        primary={{ label: "Contact ARI", href: "/contact" }}
      />
    </>
  );
}
