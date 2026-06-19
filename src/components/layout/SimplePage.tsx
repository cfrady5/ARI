import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { GradientOrb } from "@/components/visual/Decor";

type SimplePageProps = {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  children: ReactNode;
};

/**
 * Readable, dark-mode text page used for legal/policy content.
 * `.prose-ari` styles (in globals) handle headings, paragraphs and lists.
 */
export function SimplePage({
  eyebrow,
  title,
  lastUpdated,
  children,
}: SimplePageProps) {
  return (
    <article>
      <header className="relative overflow-hidden border-b border-[var(--border-soft)] pt-[calc(var(--header-height)+2.5rem)] pb-12">
        <GradientOrb className="absolute -left-24 -top-24 h-96 w-96" />
        <Container className="relative">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{title}</h1>
          {lastUpdated ? (
            <p className="mt-4 text-sm text-ari-subtle">
              Last updated: {lastUpdated}
            </p>
          ) : null}
        </Container>
      </header>
      <Container className="py-12">
        <div className="prose-ari mx-auto max-w-3xl">{children}</div>
      </Container>
    </article>
  );
}

export default SimplePage;
