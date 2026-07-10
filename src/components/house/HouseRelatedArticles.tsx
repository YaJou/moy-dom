import { relatedArticles } from "@/data/house-detail";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HouseRelatedArticles() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">
        Полезные статьи
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {relatedArticles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group rounded-card border border-border bg-white p-5 transition-shadow hover:shadow-card"
          >
            <p className="text-xs text-gray">{article.date}</p>
            <h3 className="mt-2 text-sm font-semibold text-dark group-hover:text-primary sm:text-base">
              {article.title}
            </h3>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Читать
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
