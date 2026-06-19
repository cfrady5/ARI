import { Icon, type IconName } from "@/components/visual/Icon";

type IconBadgeProps = {
  name: IconName;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: { box: "h-9 w-9", icon: 18 },
  md: { box: "h-12 w-12", icon: 22 },
  lg: { box: "h-14 w-14", icon: 26 },
} as const;

/**
 * Rounded badge holding a green-stroked icon — the recurring icon treatment
 * used on cards, stats, and feature panels.
 */
export function IconBadge({ name, size = "md", className = "" }: IconBadgeProps) {
  const s = SIZES[size];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl border border-[var(--border-green)] bg-[rgba(59,174,72,0.08)] text-ari-green ${s.box} ${className}`}
    >
      <Icon name={name} size={s.icon} />
    </span>
  );
}

export default IconBadge;
