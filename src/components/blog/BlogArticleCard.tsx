import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/data/blog";
import { getBlogArticleHref } from "@/data/blog";

interface BlogArticleCardProps {
  article: BlogArticle;
}

export function BlogArticleCard({ article }: BlogArticleCardProps) {
  const href = getBlogArticleHref(article.slug);
  const title = article.cardTitle ?? article.title;

  return (
    <article className="blog-hub-card">
      <Link href={href} className="blog-hub-card-media">
        <Image
          src={article.image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
      </Link>
      <div className="blog-hub-card-body">
        <div className="blog-hub-card-meta">
          <span className="blog-hub-topic">{article.topicLabel}</span>
          <span className="blog-hub-read">{article.readTime}</span>
        </div>
        <h3 className="blog-hub-card-title">
          <Link href={href}>{title}</Link>
        </h3>
        <p className="blog-hub-card-excerpt">{article.excerpt}</p>
        <Link href={href} className="blog-hub-card-link">
          Читать статью →
        </Link>
      </div>
    </article>
  );
}
