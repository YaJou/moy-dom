import Image from "next/image";
import Link from "next/link";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { HomeCatalogCard } from "@/components/cards/HomeCatalogCard";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import {
  blogHubCopy,
  getBlogArticleHref,
  getFeaturedArticle,
  getHubArticles,
} from "@/data/blog";
import {
  viewingChecklistIntro,
  viewingChecklistPreview,
} from "@/data/blog/viewing-checklist";
import { realHouses } from "@/data/houses";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Что нужно знать перед покупкой дома",
  description: blogHubCopy.description,
  path: "/blog/",
});

export default function BlogPage() {
  const featured = getFeaturedArticle();
  const articles = getHubArticles();
  const catalogHouses = realHouses.filter((h) => h.featured).slice(0, 2);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Статьи" },
        ]}
      />

      <section className="blog-hub-intro section-padding">
        <div className="container-main">
          <p className="blog-hub-kicker">Разобраться перед покупкой дома</p>
          <h1 className="blog-hub-title">{blogHubCopy.title}</h1>
          <p className="blog-hub-lead">{blogHubCopy.description}</p>

          <nav className="blog-hub-tasks" aria-label="Навигация по задачам">
            {blogHubCopy.tasks.map((task, index) => (
              <span key={task.id} className="blog-hub-task-wrap">
                {index > 0 ? (
                  <span className="blog-hub-task-sep" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link
                  href={getBlogArticleHref(task.slug)}
                  className="blog-hub-task"
                >
                  {task.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </section>

      {featured ? (
        <section className="blog-hub-featured-wrap">
          <div className="container-main">
            <p className="blog-hub-section-label">С чего начать</p>
            <div className="blog-hub-featured">
              <Link
                href={getBlogArticleHref(featured.slug)}
                className="blog-hub-featured-media"
              >
                <Image
                  src={featured.image}
                  alt={featured.featuredTitle ?? featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 48vw"
                  priority
                />
              </Link>
              <div className="blog-hub-featured-body">
                <span className="blog-hub-topic">{featured.topicLabel}</span>
                <h2 className="blog-hub-featured-title">
                  <Link href={getBlogArticleHref(featured.slug)}>
                    {featured.featuredTitle ?? featured.title}
                  </Link>
                </h2>
                <p className="blog-hub-featured-text">
                  {featured.featuredDescription ?? featured.excerpt}
                </p>
                <Link
                  href={getBlogArticleHref(featured.slug)}
                  className="blog-hub-featured-cta"
                >
                  {featured.featuredCta ?? "Читать"} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-padding bg-white">
        <div className="container-main">
          <h2 className="blog-hub-section-title">Ещё материалы</h2>
          <div className="blog-hub-grid">
            {articles.map((article) => (
              <BlogArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="blog-hub-checklist-wrap">
        <div className="container-main">
          <div className="blog-hub-checklist">
            <div className="blog-hub-checklist-copy">
              <p className="blog-hub-checklist-kicker">
                Возьмите с собой на просмотр
              </p>
              <h2>{viewingChecklistIntro.title}</h2>
              <p>{viewingChecklistIntro.description}</p>
              <div className="blog-hub-checklist-actions">
                <Link
                  href={viewingChecklistIntro.pageHref}
                  className="btn-primary blog-hub-checklist-primary"
                >
                  Открыть список
                </Link>
                <a
                  href={viewingChecklistIntro.pdfHref}
                  className="blog-hub-checklist-pdf"
                  download
                >
                  Скачать PDF
                </a>
              </div>
            </div>
            <aside className="blog-hub-checklist-preview" aria-hidden>
              <p className="blog-hub-checklist-preview-title">Фрагмент списка</p>
              <ul>
                {viewingChecklistPreview.map((item) => (
                  <li key={item}>
                    <span className="blog-hub-check-box" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="blog-hub-author">
            <div className="blog-hub-author-photo">
              <Image
                src={blogHubCopy.author.photo}
                alt={blogHubCopy.author.name}
                fill
                className="object-cover object-[30%_20%]"
                sizes="160px"
                loading="lazy"
              />
            </div>
            <div className="blog-hub-author-body">
              <h2>{blogHubCopy.author.headline}</h2>
              <p>{blogHubCopy.author.text}</p>
              <p className="blog-hub-author-name">
                <Link href={blogHubCopy.author.href}>
                  {blogHubCopy.author.name}
                </Link>
                <span> · {blogHubCopy.author.role}</span>
              </p>
              <p className="blog-hub-author-topics">{blogHubCopy.author.topics}</p>
              <Link href={blogHubCopy.author.href} className="blog-hub-author-link">
                О компании →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-hub-catalog-wrap section-padding">
        <div className="container-main">
          <div className="blog-hub-catalog-head">
            <div>
              <h2 className="blog-hub-section-title">
                {blogHubCopy.catalogCta.title}
              </h2>
              <p className="blog-hub-catalog-lead">
                {blogHubCopy.catalogCta.description}
              </p>
            </div>
            <Link href={blogHubCopy.catalogCta.href} className="btn-primary">
              {blogHubCopy.catalogCta.button}
            </Link>
          </div>
          <div className="blog-hub-catalog-grid">
            {catalogHouses.map((house) => (
              <HomeCatalogCard key={house.id} house={house} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
