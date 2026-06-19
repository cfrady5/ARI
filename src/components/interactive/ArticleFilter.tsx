"use client";

import { useState } from "react";
import FilterBar from "@/components/interactive/FilterBar";
import ArticleCard from "@/components/content/ArticleCard";
import {
  ARTICLE_CATEGORIES,
  type Article,
  type ArticleCategory,
} from "@/data/articles";

type ArticleFilterProps = {
  articles: Article[];
};

/** Press & Insights article grid with category filtering. */
export function ArticleFilter({ articles }: ArticleFilterProps) {
  const [active, setActive] = useState<ArticleCategory>("All");

  const visible =
    active === "All"
      ? articles
      : articles.filter((article) => article.category === active);

  return (
    <div>
      <FilterBar
        options={ARTICLE_CATEGORIES}
        active={active}
        onChange={(value) => setActive(value as ArticleCategory)}
        label="Filter articles by category"
      />

      <p className="mt-4 text-sm text-ari-subtle" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "article" : "articles"}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

export default ArticleFilter;
