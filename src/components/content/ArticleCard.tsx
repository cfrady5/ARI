import Link from "next/link";
import Thumbnail from "@/components/content/Thumbnail";
import { Icon } from "@/components/visual/Icon";
import { formatDate } from "@/lib/format";
import type { Article } from "@/data/articles";

type ArticleCardProps = {
  article: Article;
  /** Featured layout: larger, horizontal on wide screens. */
  featured?: boolean;
};

/** Press & Insights article card (grid + featured variants). */
export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const href = `/press-insights/${article.slug}`;

  const meta = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ari-subtle">
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden="true">•</span>
      <span>{article.readTime}</span>
    </div>
  );

  if (featured) {
    return (
      <article className="card card-interactive group relative grid gap-6 lg:grid-cols-2 lg:items-center">
        <Thumbnail
          image={article.image}
          alt={article.title}
          label={article.category}
          icon="atom"
          aspect="aspect-[16/10]"
        />
        <div>
          <span className="tag">{article.category}</span>
          <h3 className="mt-4 text-2xl font-bold text-ari-white sm:text-3xl">
            <Link href={href} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ari-muted">
            {article.excerpt}
          </p>
          <div className="mt-4">{meta}</div>
          <span className="link-arrow mt-5">
            Read More
            <Icon name="arrow-right" size={15} />
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="card card-interactive group relative flex h-full flex-col p-0">
      <Thumbnail
        image={article.image}
        alt={article.title}
        label={article.category}
        icon="atom"
        className="rounded-b-none border-0 border-b"
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="tag self-start">{article.category}</span>
        <h3 className="mt-4 text-lg font-bold text-ari-white">
          <Link href={href} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ari-muted">
          {article.excerpt}
        </p>
        <div className="mt-4">{meta}</div>
      </div>
    </article>
  );
}

export default ArticleCard;
