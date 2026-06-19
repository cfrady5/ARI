import { Icon } from "@/components/visual/Icon";
import Button from "@/components/ui/Button";
import type { EventItem } from "@/data/events";

type EventCardProps = {
  event: EventItem;
  past?: boolean;
};

function dateBadge(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.toLocaleDateString("en-US", { day: "numeric" }),
  };
}

/** Upcoming / past event card with a green date badge and clear action. */
export function EventCard({ event, past = false }: EventCardProps) {
  const badge = dateBadge(event.date);

  return (
    <article className="card card-interactive flex h-full flex-col">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-[var(--border-green)] bg-[rgba(59,174,72,0.08)]">
          <span className="text-xs font-bold uppercase tracking-wide text-ari-green">
            {badge.month}
          </span>
          <span className="text-2xl font-extrabold leading-none text-ari-white">
            {badge.day}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-ari-white">{event.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ari-muted">
            <Icon name="pin" size={15} className="text-ari-green" />
            {event.location}
          </p>
          <p className="text-sm text-ari-subtle">{event.dateLabel}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ari-muted">
        {event.description}
      </p>

      <div className="mt-5">
        {past ? (
          event.recapUrl ? (
            <Button
              href={event.recapUrl}
              variant="secondary"
              icon="arrow-right"
              className="px-4 py-2 text-sm"
            >
              View Recap
            </Button>
          ) : (
            <span className="tag tag-muted">Event concluded</span>
          )
        ) : (
          <Button
            href={event.registrationUrl ?? "/contact"}
            icon="arrow-right"
            className="px-4 py-2 text-sm"
          >
            Register
          </Button>
        )}
      </div>
    </article>
  );
}

export default EventCard;
