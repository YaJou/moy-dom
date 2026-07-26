import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Политика использования cookie",
  description: `Как ${siteConfig.name} использует cookie и локальные данные браузера. Согласие, отказ и необходимые технологии.`,
  path: "/cookies/",
});

export default function CookiesPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Политика cookie" },
        ]}
      />
      <section className="section-padding bg-white">
        <article className="container-main max-w-3xl">
          <h1 className="section-title">Политика использования cookie</h1>
          <p className="mt-4 text-sm text-gray">
            Редакция 1.0 · 26 июля 2026 г. · часть{" "}
            <Link href="/privacy/" className="text-primary hover:underline">
              Политики обработки персональных данных
            </Link>
          </p>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-dark sm:text-base">
            <p>
              Cookie и аналогичные технологии помогают сайту{" "}
              <a href={siteConfig.url} className="text-primary hover:underline">
                {siteConfig.url}
              </a>{" "}
              работать стабильно. Мы не устанавливаем аналитические и рекламные
              cookie до вашего согласия в баннере.
            </p>

            <h2 className="pt-2 text-lg font-semibold">1. Какие технологии используем</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Необходимые:</strong> работа страниц по HTTPS, сохранение
                вашего выбора в баннере cookie, список сравнения домов в
                localStorage браузера.
              </li>
              <li>
                <strong>Аналитические / маркетинговые</strong> (Яндекс Метрика,
                Google Analytics, пиксели и т.п.):{" "}
                <strong>сейчас не подключены</strong>. При подключении они будут
                включаться только после нажатия «Принять» в баннере.
              </li>
            </ul>

            <h2 className="pt-2 text-lg font-semibold">2. Ваш выбор</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Принять</strong> — разрешаете использование аналитических
                и маркетинговых cookie, когда они появятся на сайте.
              </li>
              <li>
                <strong>Отказаться</strong> — только необходимые технологии;
                аналитика не включается.
              </li>
            </ul>
            <p>
              Выбор можно изменить, очистив данные сайта в браузере — баннер
              появится снова.
            </p>

            <h2 className="pt-2 text-lg font-semibold">3. Сторонние виджеты</h2>
            <p>
              При просмотре встроенных карт Яндекса или видео YouTube сторонний
              сервис может установить свои cookie по своим правилам. Это
              происходит при взаимодействии с виджетом.
            </p>

            <h2 className="pt-2 text-lg font-semibold">4. Контакты</h2>
            <p>
              Вопросы: {siteConfig.email}, {siteConfig.phone}. Полная политика
              обработки ПДн —{" "}
              <Link href="/privacy/" className="text-primary hover:underline">
                /privacy/
              </Link>
              .
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
