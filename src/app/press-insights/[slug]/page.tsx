import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/layout/SectionHeader";
import ArticleCard from "@/components/content/ArticleCard";
import Thumbnail from "@/components/content/Thumbnail";
import QuoteBlock from "@/components/content/QuoteBlock";
import { ContactCard } from "@/components/content/ContactCard";
import { Icon } from "@/components/visual/Icon";
import { GradientOrb } from "@/components/visual/Decor";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { ARTICLES, getArticle, getArticles } from "@/data/articles";
import { CONTACTS } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/press-insights/${article.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getArticles(article.slug).slice(0, 3);

  return (
    <>
      {/* Article header */}
      <article>
        <header className="relative overflow-hidden border-b border-[var(--border-soft)] pt-[calc(var(--header-height)+2.5rem)] pb-12">
          <GradientOrb className="absolute -left-24 -top-24 h-96 w-96" />
          <Container className="relative">
            <Link href="/press-insights" className="link-arrow mb-6">
              <Icon name="arrow-right" size={15} className="rotate-180" />
              Back to Press &amp; Insights
            </Link>
            <span className="tag">{article.category}</span>
            <h1 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ari-subtle">
              <span className="text-ari-muted">{article.author}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">•</span>
              <span>{article.readTime}</span>
            </div>
          </Container>
        </header>

        <Container className="py-12">
          <div className="mx-auto max-w-3xl">
            <Thumbnail
              image={article.image}
              alt={article.title}
              label={article.category}
              icon="atom"
              aspect="aspect-[16/9]"
            />

            <div className="mt-10 space-y-5 text-lg leading-relaxed text-ari-muted">
              {article.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {article.pullQuote ? (
              <div className="my-10">
                <QuoteBlock quote={article.pullQuote} />
              </div>
            ) : null}

            {/* Media contact */}
            <div className="mt-12 border-t border-[var(--border-soft)] pt-8">
              <p className="eyebrow mb-4">Media Contact</p>
              <ContactCard
                title={CONTACTS.media.title}
                description={CONTACTS.media.description}
                name={CONTACTS.media.name}
                email={CONTACTS.media.email}
              />
            </div>
          </div>
        </Container>
      </article>

      {/* Related posts */}
      {related.length ? (
        <section className="section border-t border-[var(--border-soft)]">
          <Container>
            <SectionHeader eyebrow="Related" title="More from ARI" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
