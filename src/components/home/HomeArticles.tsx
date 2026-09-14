import { blogArticles } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./icons";

const featured = [
  {
    slug: "otdelka",
    title: "Что входит в предчистовую отделку",
  },
  {
    slug: "uchastok",
    title: "Как оценить участок и подъезд",
  },
  {
    slug: "prichiny",
    title: "5 причин выбрать готовый дом вместо строительства",
  },
] as const;

export function HomeArticles() {
  const articles = featured
    .map((item) => {
      const article = blogArticles.find((a) => a.slug === item.slug);
      if (!article) return null;
      return { ...article, cardTitle: item.title };
    })
    .filter(Boolean);

  return (
    <section className="articles-section">
      <div className="container-main">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="h2-desktop font-extrabold text-text">
            Разобраться перед покупкой
          </h2>
          <Link href="/blog/" className="articles-all-link">
            Все статьи →
          </Link>
        </div>

        <div className="articles-grid">
          {articles.map((article) =>
            article ? (
              <article key={article.slug} className="article-card group">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
                <div className="article-card-overlay" />
                <div className="article-card-content">
                  <p className="article-card-meta">{article.readTime}</p>
                  <h3 className="article-card-title">{article.cardTitle}</h3>
                  <p className="article-card-desc">{article.description}</p>
                  <Link
                    href={`/blog/${article.slug}/`}
                    className="article-card-btn"
                  >
                    Читать статью
                    <IconArrow className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
