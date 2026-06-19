import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { NetworkPattern } from "@/components/visual/Decor";

type CTASectionProps = {
  title: ReactNode;
  body?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Optional tagline shown above the title (use sparingly). */
  tagline?: string;
};

/** Mission-focused closing CTA band used at the end of major pages. */
export function CTASection({
  title,
  body,
  primary,
  secondary,
  tagline,
}: CTASectionProps) {
  return (
    <section className="section">
      <Container>
        <div className="surface relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
          <NetworkPattern className="absolute inset-0 h-full w-full opacity-30" />
          <div className="relative mx-auto max-w-2xl">
            {tagline ? (
              <p className="eyebrow-plain mb-4">{tagline}</p>
            ) : null}
            <h2 className="text-balance text-3xl font-extrabold sm:text-4xl">
              {title}
            </h2>
            {body ? (
              <p className="mx-auto mt-4 max-w-xl text-lg text-ari-muted">
                {body}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={primary.href} icon="arrow-right">
                {primary.label}
              </Button>
              {secondary ? (
                <Button href={secondary.href} variant="secondary">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;
