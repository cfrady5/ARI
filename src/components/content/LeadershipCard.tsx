import { Icon } from "@/components/visual/Icon";
import type { Leader } from "@/data/leadership";

type LeadershipCardProps = {
  leader: Leader;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

/** Leadership profile card with headshot (or initials avatar fallback). */
export function LeadershipCard({ leader }: LeadershipCardProps) {
  return (
    <article className="card card-interactive flex h-full flex-col">
      <div className="flex items-center gap-4">
        {leader.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={leader.image}
            alt={`${leader.name}, ${leader.title}`}
            loading="lazy"
            className="h-16 w-16 rounded-2xl object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border-green)] bg-[rgba(31,54,85,0.5)] text-xl font-extrabold text-ari-green"
          >
            {initials(leader.name)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-ari-white">{leader.name}</h3>
          <p className="text-sm font-medium text-ari-green">{leader.title}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ari-muted">
        {leader.bio}
      </p>

      {leader.linkedin ? (
        <a
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-arrow mt-5"
          aria-label={`${leader.name} on LinkedIn`}
        >
          <Icon name="linkedin" size={16} />
          LinkedIn
        </a>
      ) : null}
    </article>
  );
}

export default LeadershipCard;
