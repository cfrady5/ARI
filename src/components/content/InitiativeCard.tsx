import Link from "next/link";
import { IconBadge } from "@/components/visual/IconBadge";
import { Icon } from "@/components/visual/Icon";
import { getCapability } from "@/data/capabilities";
import type { Initiative } from "@/data/initiatives";

type InitiativeCardProps = {
  initiative: Initiative;
};

/**
 * Initiative directory card. The whole card is a link via a stretched anchor,
 * while related-capability tags remain individually reachable.
 */
export function InitiativeCard({ initiative }: InitiativeCardProps) {
  const capabilities = initiative.capabilities
    .map(getCapability)
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 3);

  return (
    <article className="card card-interactive group relative flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <IconBadge name={initiative.icon} />
        <span className="tag tag-muted">{initiative.category}</span>
      </div>

      <h3 className="mt-5 text-lg font-bold text-ari-white">
        <Link
          href={initiative.href}
          className="after:absolute after:inset-0"
        >
          {initiative.name}
        </Link>
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ari-muted">
        {initiative.summary}
      </p>

      {capabilities.length ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {capabilities.map((capability) => (
            <li key={capability.id} className="tag">
              {capability.title}
            </li>
          ))}
        </ul>
      ) : null}

      <span className="link-arrow mt-5">
        Learn More
        <Icon name="arrow-right" size={15} />
      </span>
    </article>
  );
}

export default InitiativeCard;
