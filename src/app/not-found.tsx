import type { Metadata } from "next";
import Link from "next/link";
import { Home, Phone, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: `Запрашиваемая страница не существует. Вернитесь на главную ${siteConfig.name} или откройте каталог домов.`,
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: undefined,
  },
};

export default function NotFound() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main flex flex-col items-center py-16 text-center sm:py-24">
        <p className="text-7xl font-bold text-primary sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-dark sm:text-3xl">
          Страница не найдена
        </h1>
        <p className="mt-3 max-w-md text-sm text-gray sm:text-base">
          Возможно, ссылка устарела или адрес введён с ошибкой. Выберите раздел
          ниже или позвоните — поможем подобрать дом.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            <Home className="h-4 w-4" />
            На главную
          </Link>
          <Link
            href="/catalog/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Каталог домов
          </Link>
          <a
            href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray">
          <li>
            <Link href="/catalog/saratov/" className="hover:text-primary">
              Дома в Саратове
            </Link>
          </li>
          <li>
            <Link href="/catalog/engels/" className="hover:text-primary">
              Дома в Энгельсе
            </Link>
          </li>
          <li>
            <Link href="/catalog/balakovo/" className="hover:text-primary">
              Дома в Балаково
            </Link>
          </li>
          <li>
            <Link href="/contacts/" className="hover:text-primary">
              Контакты
            </Link>
          </li>
          <li>
            <Link href="/sitemap/" className="hover:text-primary">
              Карта сайта
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
