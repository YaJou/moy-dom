import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { companyRequisites } from "@/data/homepage";
import {
  pdnPackCategories,
  pdnPackDocuments,
} from "@/data/pdn-pack";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Документы и реквизиты",
  description: `Реквизиты ${siteConfig.name}, политика, оферта и пакет локальных актов по 152-ФЗ (приказы, положения, согласия, журналы).`,
  path: "/documents/",
});

export default function DocumentsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Документы" },
        ]}
      />
      <section className="section-padding bg-white">
        <div className="container-main max-w-4xl">
          <h1 className="section-title">Документы и реквизиты</h1>
          <p className="mt-3 text-sm text-gray sm:text-base">
            Официальные данные компании и комплект локальных актов по обработке
            персональных данных (152-ФЗ). ИНН и ОГРН замените на данные из ЕГРЮЛ.
          </p>

          <dl className="mt-8 space-y-4 rounded-card border border-border p-5 sm:p-6">
            <div>
              <dt className="text-sm text-gray">Наименование</dt>
              <dd className="mt-1 font-semibold text-dark">
                {companyRequisites.name}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray">ИНН</dt>
              <dd className="mt-1 font-semibold text-dark">
                {companyRequisites.inn}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray">ОГРН</dt>
              <dd className="mt-1 font-semibold text-dark">
                {companyRequisites.ogrn}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray">Адрес</dt>
              <dd className="mt-1 font-semibold text-dark">
                {siteConfig.address}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray">Телефон / email</dt>
              <dd className="mt-1 font-semibold text-dark">
                {siteConfig.phone}, {siteConfig.email}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/privacy/" className="font-medium text-primary hover:underline">
              Политика обработки ПДн
            </Link>
            <Link href="/cookies/" className="font-medium text-primary hover:underline">
              Политика cookie
            </Link>
            <Link href="/offer/" className="font-medium text-primary hover:underline">
              Публичная оферта
            </Link>
            <a
              href="/docs/pdn/index.html"
              className="font-medium text-primary hover:underline"
            >
              Оглавление пакета ПДн
            </a>
          </div>

          <h2 className="mt-12 text-xl font-bold text-dark">
            Пакет документов по 152-ФЗ
          </h2>
          <p className="mt-2 text-sm text-gray">
            Шаблоны для печати и утверждения: приказы, положения, акты,
            инструкции, журналы, согласия и формы запросов субъектов. Откройте
            документ → «Печать / PDF».
          </p>

          <div className="mt-8 space-y-8">
            {pdnPackCategories.map((category) => {
              const items = pdnPackDocuments.filter(
                (d) => d.category === category
              );
              if (!items.length) return null;
              return (
                <div key={category}>
                  <h3 className="text-base font-semibold text-dark">
                    {category}
                    <span className="ml-2 text-sm font-normal text-gray">
                      ({items.length})
                    </span>
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {items.map((doc) => (
                      <li key={doc.id}>
                        <a
                          href={doc.href}
                          className="text-sm text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-xs leading-relaxed text-gray">
            Документы носят вспомогательный характер и не заменяют юридическую
            консультацию. Заполните поля «___», назначьте ответственного,
            подпишите и храните у оператора. Публичная политика для посетителей
            сайта — на странице{" "}
            <Link href="/privacy/" className="text-primary hover:underline">
              /privacy/
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
