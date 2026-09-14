import { IconArrow } from "@/components/home/icons";
import {
  getBlogArticle,
  getBlogArticleHref,
  type BlogArticle,
} from "@/data/blog";
import Image from "next/image";
import Link from "next/link";

interface BlogRelatedArticlesProps {
  article: BlogArticle;
  title?: string;
}

export function BlogRelatedArticles({
  article,
  title = "Читайте также",
}: BlogRelatedArticlesProps) {
  const related = article.relatedSlugs
    .map((s) => getBlogArticle(s))
    .filter(Boolean) as BlogArticle[];

  if (!related.length) return null;

  return (
    <aside className="ja-related-articles">
      <h2 className="ja-h2">{title}</h2>
      <div className="articles-grid">
        {related.map((item) => (
          <article key={item.slug} className="article-card group">
            <div className="article-card-media">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
            <div className="article-card-overlay" />
            <div className="article-card-content">
              <p className="article-card-meta">{item.readTime}</p>
              <h3 className="article-card-title">{item.title}</h3>
              <p className="article-card-desc">{item.description}</p>
              <Link
                href={getBlogArticleHref(item.slug)}
                className="article-card-btn"
              >
                Читать статью
                <IconArrow className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
