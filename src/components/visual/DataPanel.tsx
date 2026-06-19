import { IconBadge } from "@/components/visual/IconBadge";
import { CornerFrame, NetworkPattern } from "@/components/visual/Decor";
import type { Metric } from "@/data/metrics";

type DataPanelProps = {
  metrics: Metric[];
  heading?: string;
};

/**
 * Command-center style metric preview panel used in hero asides.
 * Compact, scannable proof points with green figures and icon badges.
 */
export function DataPanel({ metrics, heading = "ARI Impact" }: DataPanelProps) {
  return (
    <div className="card relative overflow-hidden p-6 sm:p-7">
      <NetworkPattern className="absolute right-0 top-0 h-40 w-40 opacity-40" />
      <CornerFrame className="absolute inset-3" />
      <div className="relative">
        <p className="eyebrow">{heading}</p>
        <dl className="mt-5 space-y-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-4 border-b border-[var(--border-soft)] pb-4 last:border-0 last:pb-0"
            >
              <IconBadge name={metric.icon} size="sm" />
              <div className="min-w-0">
                <dd className="stat-figure text-2xl sm:text-3xl">
                  {metric.value}
                </dd>
                <dt className="text-sm text-ari-muted">{metric.label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default DataPanel;
