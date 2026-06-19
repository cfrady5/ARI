import { IconBadge } from "@/components/visual/IconBadge";
import type { Metric } from "@/data/metrics";

type StatCardProps = {
  metric: Metric;
  /** Compact omits the description for tight grids. */
  compact?: boolean;
};

/** Large numeric proof point with icon badge and supporting copy. */
export function StatCard({ metric, compact = false }: StatCardProps) {
  return (
    <div className="card card-interactive flex h-full flex-col">
      <IconBadge name={metric.icon} />
      <p className="stat-figure mt-5">{metric.value}</p>
      <p className="mt-1 text-base font-semibold text-ari-white">
        {metric.label}
      </p>
      {!compact ? (
        <p className="mt-3 text-sm leading-relaxed text-ari-muted">
          {metric.description}
        </p>
      ) : null}
    </div>
  );
}

export default StatCard;
