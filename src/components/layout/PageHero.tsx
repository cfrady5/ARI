import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { GradientOrb } from "@/components/visual/Decor";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Optional visual/stat panel rendered to the right (stacks on mobile). */
  aside?: ReactNode;
};

/**
 * Shared hero pattern for major pages: eyebrow, large H1, supporting copy,
 * CTAs, and an optional visual aside. Dark canvas with subtle brand glow.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-soft)] pt-[calc(var(--header-height)+2.5rem)] pb-16 sm:pb-20">
      <GradientOrb className="absolute -left-24 -top-24 h-96 w-96" color="green" />
      <GradientOrb
        className="absolute -right-32 top-10 h-[28rem] w-[28rem]"
        color="navy"
      />
      <Container className="relative">
        <div
          className={
            aside
              ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
              : "max-w-3xl"
          }
        >
          <div className="reveal">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ari-muted">
                {description}
              </p>
            ) : null}
            {actions ? (
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            ) : null}
          </div>
          {aside ? <div className="reveal">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}

export default PageHero;
