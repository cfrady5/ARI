import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Heading level for correct document outline. */
  as?: "h2" | "h3";
};

/** Eyebrow + headline + supporting copy block used to open most sections. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  as: Heading = "h2",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div
      className={`${isCenter ? "mx-auto text-center" : ""} ${
        isCenter ? "max-w-2xl" : "max-w-3xl"
      } ${className}`}
    >
      {eyebrow ? (
        <p className={isCenter ? "eyebrow-plain" : "eyebrow"}>{eyebrow}</p>
      ) : null}
      <Heading className="mt-4 text-balance text-3xl font-extrabold sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-ari-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
