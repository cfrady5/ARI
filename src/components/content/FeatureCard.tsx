import { IconBadge } from "@/components/visual/IconBadge";
import type { IconName } from "@/components/visual/Icon";

type FeatureCardProps = {
  icon: IconName;
  title: string;
  description: string;
  /** Optional numbered label (e.g. "01") for ordered feature grids. */
  index?: number;
};

/** General-purpose feature/value card (Convene · Build · Accelerate · Scale). */
export function FeatureCard({
  icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <div className="card card-interactive flex h-full flex-col">
      <div className="flex items-center justify-between">
        <IconBadge name={icon} />
        {index !== undefined ? (
          <span className="text-sm font-bold text-ari-green/60">
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-xl font-bold text-ari-white">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-ari-muted">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
