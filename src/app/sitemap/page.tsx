import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { blogArticles } from "@/data/blog";
import { realHouses } from "@/data/houses";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Карта сайта",
  description: `Карта сайта ${siteConfig.name}: каталог домов, города, блог, контакты и документы.`,
  path: "/sitemap/",
});

const sections = [
  {
    title: "Основные страницы",
    links: [
      { label: "Главная", href: "/" },
      { label: "Каталог домов", href: "/catalog/" },
      { label: "Сравнение домов", href: "/compare/" },
      { label: "Построенные дома", href: "/built/" },
      { label: "О компании", href: "/about/" },
      { label: "Контакты", href: "/contacts/" },
      { label: "Партнёры", href: "/partners/" },
      { label: "Документы", href: "/documents/" },
      { label: "Блог", href: "/blog/" },
    ],
  },
  {
    title: "Города",
    links: [
      { label: "Дома в Энгельсе", href: "/catalog/engels/" },
      { label: "Дома в Саратове", href: "/catalog/saratov/" },
      { label: "Дома в Балаково", href: "/catalog/balakovo/" },
    ],
  },
  {
    title: "Юридическая информация",
    links: [
    { label: "Политика обработки ПДн", href: "/privacy/" },
    { label: "Политика cookie", href: "/cookies/" },
    { label: "Публичная оферта", href: "/offer/" },
    ],
  },
];

export default function HtmlSitemapPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Карта сайта" },
        ]}
      />
      <section className="section-padding bg-white">
        <div className="container-main">
          <h1 className="section-title">Карта сайта</h1>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-base font-semibold text-dark">
                  {section.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-primary hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-base font-semibold text-dark">Дома в каталоге</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {realHouses.map((house) => (
                <li key={house.id}>
                  <Link
                    href={`/catalog/${house.id}/`}
                    className="text-sm text-primary hover:underline"
                  >
                    {house.title} — {house.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-base font-semibold text-dark">Статьи блога</h2>
            <ul className="mt-3 space-y-2">
              {blogArticles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/blog/${article.slug}/`}
                    className="text-sm text-primary hover:underline"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
