import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { INITIATIVES } from "@/data/initiatives";
import { ARTICLES } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "/",
    "/about",
    "/initiatives",
    "/markets-capabilities",
    "/impact",
    "/press-insights",
    "/events",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility",
  ].map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const initiativeRoutes = INITIATIVES.map((initiative) => ({
    url: `${SITE.url}${initiative.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articleRoutes = ARTICLES.map((article) => ({
    url: `${SITE.url}/press-insights/${article.slug}`,
    lastModified: new Date(`${article.date}T00:00:00`),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...initiativeRoutes, ...articleRoutes];
}

export const dynamic = "force-static";
