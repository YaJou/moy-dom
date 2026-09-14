import { blogArticles } from "@/data/blog";
import { HouseImage } from "@/components/ui/HouseImage";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const articles = [
  blogArticles.find((a) => a.slug === "otdelka"),
  blogArticles.find((a) => a.slug === "uchastok"),
  blogArticles.find((a) => a.slug === "prichiny"),
].filter(Boolean);

export function HomeBlog() {
  return (
    <section className="bg-surface py-8 md:py-12">
      <div className="container-main">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-text">
            Разобраться перед покупкой
          </h2>
          <Link href="/blog/" className="section-link text-text">
            Все статьи
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {articles.map((article) =>
            article ? (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}/`}
                className="flex gap-4 rounded-panel border border-border bg-page p-4 transition-shadow hover:shadow-card"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-control">
                  <HouseImage
                    src={article.image}
                    alt=""
                    fill
                    objectFit="cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-3 text-base font-bold leading-6 text-text">
                    {article.title}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-muted">
                    Читать
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
