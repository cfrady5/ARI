import type { Milestone } from "@/data/approach";

type TimelineProps = {
  items: Milestone[];
};

/**
 * Vertical, text-based history timeline with green milestone markers.
 * Real HTML text (not an image) and responsive by default.
 */
export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative ml-3 border-l border-[var(--border-green)]">
      {items.map((item) => (
        <li key={item.title} className="relative pb-10 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-ari-black)] bg-ari-green"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ari-green">
            {item.year}
          </p>
          <h3 className="mt-1.5 text-lg font-bold text-ari-white">
            {item.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ari-muted">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
