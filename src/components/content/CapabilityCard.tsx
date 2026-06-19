import Link from "next/link";
import { IconBadge } from "@/components/visual/IconBadge";
import { Icon } from "@/components/visual/Icon";
import { getInitiativesByCapability, type Capability } from "@/data/capabilities";

type CapabilityCardProps = {
  capability: Capability;
};

/** Capability card: title, one-line description, and related initiatives. */
export function CapabilityCard({ capability }: CapabilityCardProps) {
  const related = getInitiativesByCapability(capability.id).slice(0, 3);

  return (
    <article className="card card-interactive flex h-full flex-col">
      <IconBadge name={capability.icon} />
      <h3 className="mt-5 text-lg font-bold text-ari-white">
        {capability.title}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ari-muted">
        {capability.description}
      </p>

      {related.length ? (
        <div className="mt-5 border-t border-[var(--border-soft)] pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ari-subtle">
            Related Initiatives
          </p>
          <ul className="mt-2 space-y-1.5">
            {related.map((initiative) => (
              <li key={initiative.slug}>
                <Link
                  href={initiative.href}
                  className="link-arrow text-sm font-medium"
                >
                  <Icon name="arrow-right" size={14} />
                  {initiative.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export default CapabilityCard;
