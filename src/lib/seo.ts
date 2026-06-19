import type { Metadata } from "next";
import { SITE } from "@/data/site";

type PageMetaArgs = {
  title: string;
  description: string;
  /** Path beginning with "/" used for the canonical URL. */
  path: string;
};

/**
 * Build consistent per-page metadata: unique title, description, canonical
 * URL, and OpenGraph/Twitter tags with an OG image placeholder.
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageMetaArgs): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  const fullTitle = `${title} | ${SITE.shortName}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: `${SITE.shortName} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/api/og"],
    },
  };
}
