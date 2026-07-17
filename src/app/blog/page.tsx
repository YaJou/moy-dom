import { BlogCard } from "@/components/cards/BlogCard";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { blogArticles } from "@/data/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог о загородных домах",
  description:
    "Статьи о выборе участка, ипотеке на готовый дом, отделке и покупке частного дома в Саратовской области. Кров-Сервис.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Блог" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-main">
          <h1 className="section-title">Полезные статьи</h1>
          <p className="mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Разбираем выбор участка, ипотеку, отделку и покупку готового дома в
            Саратове, Энгельсе и Балаково.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 lg:gap-7 xl:grid-cols-2">
            {blogArticles.map((article) => (
              <BlogCard
                key={article.slug}
                title={article.title}
                date={article.date}
                image={article.image}
                href={`/blog/${article.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
