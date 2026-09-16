import { ArticleToc } from "@/components/blog/ArticleToc";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { BlogRelatedArticles } from "@/components/blog/BlogRelatedArticles";
import { IpotekaArticle } from "@/components/blog/IpotekaArticle";
import { PrichinyArticle } from "@/components/blog/PrichinyArticle";
import { UchastokArticle } from "@/components/blog/UchastokArticle";
import {
  OtdelkaRelatedHouses,
} from "@/components/blog/OtdelkaInteractive";
import { StickyArticleToc } from "@/components/blog/StickyArticleToc";
import { HouseImage } from "@/components/ui/HouseImage";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { ArticleSchema } from "@/components/seo/Schema";
import {
  blogArticles,
  getBlogArticle,
  getBlogArticleHref,
  type BlogArticle,
} from "@/data/blog";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return {};

  return buildPageMetadata({
    title: article.title,
    description: article.description,
    path: getBlogArticleHref(slug),
    image: article.image,
    type: "article",
    publishedTime: article.dateIso,
  });
}

function AuthorCard({ article }: { article: BlogArticle }) {
  if (!article.author) return null;
  const { author } = article;
  return (
    <aside className="ja-author-card">
      <div className="ja-author-avatar" aria-hidden>
        {author.name.slice(0, 1)}
      </div>
      <div>
        <Link href={author.href} className="ja-author-name">
          {author.name}
        </Link>
        <p className="ja-author-role">{author.role}</p>
        <p className="ja-author-exp">{author.experience}</p>
      </div>
    </aside>
  );
}

function JournalArticle({ article }: { article: BlogArticle }) {
  const toc = article.blocks
    .filter((b) => b.type === "heading" && b.level === 2 && b.id)
    .map((b) =>
      b.type === "heading" && b.id ? { id: b.id, text: b.text } : null
    )
    .filter(Boolean) as { id: string; text: string }[];

  return (
    <article className="ja-page">
      <div className="container-main">
        <header className="ja-hero">
          {article.categoryLabel ? (
            <p className="ja-eyebrow">{article.categoryLabel}</p>
          ) : null}
          <h1 className="ja-h1">{article.title}</h1>
          <p className="ja-deck">{article.description}</p>
          <div className="ja-meta">
            {article.author ? (
              <Link href={article.author.href} className="ja-meta-author">
                {article.author.name}
              </Link>
            ) : null}
            <time dateTime={article.dateIso}>Опубликовано {article.date}</time>
            {article.updatedDate ? (
              <time dateTime={article.updatedDateIso}>
                Обновлено {article.updatedDate}
              </time>
            ) : null}
            <span>{article.readTime}</span>
          </div>
        </header>

        <figure className="ja-cover">
          <div className="ja-cover-frame">
            <HouseImage
              src={article.image}
              alt={article.title}
              fill
              objectFit="cover"
              sizes="1200px"
              priority
            />
          </div>
          {article.coverCaption ? (
            <figcaption className="ja-caption">{article.coverCaption}</figcaption>
          ) : null}
        </figure>

        <div className="ja-layout">
          <div className="ja-main">
            <ArticleToc items={toc} mode="mobile" />
            <BlogArticleBody blocks={article.blocks} variant="journal" />
            <AuthorCard article={article} />
            {article.slug === "otdelka" ? <OtdelkaRelatedHouses /> : null}
            <BlogRelatedArticles article={article} />
          </div>
          <aside className="ja-aside">
            <StickyArticleToc items={toc} />
          </aside>
        </div>
      </div>
    </article>
  );
}

function DefaultArticle({ article }: { article: BlogArticle }) {
  const related = article.relatedSlugs
    .map((s) => getBlogArticle(s))
    .filter(Boolean);
  const toc = article.blocks.filter(
    (b) => b.type === "heading" && b.level === 2 && b.id
  );

  return (
    <article className="section-padding bg-white pb-16">
      <div className="container-main">
        <header className="mx-auto max-w-3xl border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <time dateTime={article.dateIso}>Опубликовано {article.date}</time>
            {article.updatedDate ? (
              <>
                <span aria-hidden>·</span>
                <time dateTime={article.updatedDateIso}>
                  Обновлено {article.updatedDate}
                </time>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-text sm:text-3xl lg:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {article.description}
          </p>
        </header>

        {toc.length > 0 && (
          <nav
            aria-label="Содержание статьи"
            className="mx-auto mt-8 max-w-3xl rounded-card border border-border bg-page p-4 sm:p-5"
          >
            <p className="text-sm font-semibold text-text">Содержание</p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-forest">
              {toc.map((item) =>
                item.type === "heading" && item.id ? (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="hover:underline">
                      {item.text}
                    </a>
                  </li>
                ) : null
              )}
            </ol>
          </nav>
        )}

        <div className="mt-8">
          <BlogArticleBody blocks={article.blocks} />
        </div>

        {related.length > 0 && (
          <aside className="mx-auto mt-12 max-w-3xl border-t border-border pt-8">
            <h2 className="text-lg font-bold text-text sm:text-xl">
              Читайте также
            </h2>
            <ul className="mt-4 space-y-3">
              {related.map(
                (item) =>
                  item && (
                    <li key={item.slug}>
                      <Link
                        href={getBlogArticleHref(item.slug)}
                        className="text-sm font-medium text-forest hover:underline sm:text-base"
                      >
                        {item.title}
                      </Link>
                      <span className="ml-2 text-xs text-muted">
                        {item.date}
                      </span>
                    </li>
                  )
              )}
            </ul>
          </aside>
        )}
      </div>
    </article>
  );
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  return (
    <>
      <ArticleSchema
        title={article.title}
        description={article.description}
        path={getBlogArticleHref(slug)}
        image={article.image}
        datePublished={article.dateIso}
        dateModified={article.updatedDateIso ?? article.dateIso}
      />
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Статьи", href: "/blog/" },
          { label: article.title },
        ]}
      />
      {article.slug === "ipoteka" ? (
        <IpotekaArticle article={article} />
      ) : article.slug === "prichiny" ? (
        <PrichinyArticle article={article} />
      ) : article.slug === "uchastok" ? (
        <UchastokArticle article={article} />
      ) : article.layout === "journal" ? (
        <JournalArticle article={article} />
      ) : (
        <DefaultArticle article={article} />
      )}
    </>
  );
}
