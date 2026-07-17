import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import {
  blogArticles,
  getBlogArticle,
  getBlogArticleHref,
} from "@/data/blog";
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

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: getBlogArticleHref(slug) },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.dateIso,
      locale: "ru_RU",
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const related = article.relatedSlugs
    .map((s) => getBlogArticle(s))
    .filter(Boolean);

  const toc = article.blocks.filter(
    (b) => b.type === "heading" && b.level === 2 && b.id
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Блог", href: "/blog" },
          { label: article.title },
        ]}
      />

      <article className="section-padding bg-white pb-16">
        <div className="container-main">
          <header className="mx-auto max-w-3xl border-b border-border pb-8">
            <time
              dateTime={article.dateIso}
              className="text-sm text-gray"
            >
              {article.date}
            </time>
            <span className="mx-2 text-gray">·</span>
            <span className="text-sm text-gray">{article.readTime}</span>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-dark sm:text-3xl lg:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-gray sm:text-base">
              {article.description}
            </p>
          </header>

          {toc.length > 0 && (
            <nav
              aria-label="Содержание статьи"
              className="mx-auto mt-8 max-w-3xl rounded-card border border-border bg-background p-4 sm:p-5"
            >
              <p className="text-sm font-semibold text-dark">Содержание</p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-primary">
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
              <h2 className="text-lg font-bold text-dark sm:text-xl">
                Читайте также
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map(
                  (item) =>
                    item && (
                      <li key={item.slug}>
                        <Link
                          href={getBlogArticleHref(item.slug)}
                          className="text-sm font-medium text-primary hover:underline sm:text-base"
                        >
                          {item.title}
                        </Link>
                        <span className="ml-2 text-xs text-gray">
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
    </>
  );
}
