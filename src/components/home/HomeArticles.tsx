import { blogArticles } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./icons";

const featuredSlugs = ["otdelka", "uchastok", "prichiny"];

export function HomeArticles() {
  const articles = featuredSlugs
    .map((slug) => blogArticles.find((a) => a.slug === slug))
    .filter(Boolean);

  return (
    <section className="bg-surface py-8">
      <div className="container-main">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="h3-panel text-text">Разобраться перед покупкой</h2>
          <Link
            href="/blog/"
            className="text-sm font-semibold text-text hover:text-orange"
          >
            Все статьи →
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {articles.map((article) =>
            article ? (
              <article
                key={article.slug}
                className="flex gap-4 rounded-panel border border-border bg-page p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-control">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-6 text-text line-clamp-3">
                    {article.slug === "otdelka"
                      ? "Что входит в предчистовую отделку"
                      : article.slug === "uchastok"
                        ? "Как оценить участок и подъезд"
                        : article.title}
                  </h3>
                  <Link
                    href={`/blog/${article.slug}/`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange"
                  >
                    Читать
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
