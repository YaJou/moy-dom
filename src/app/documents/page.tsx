import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { companyRequisites } from "@/data/homepage";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Документы и реквизиты",
  description: `Реквизиты и документы компании ${siteConfig.name}. ИНН, ОГРН, юридический адрес.`,
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
        <div className="container-main max-w-3xl">
          <h1 className="section-title">Документы и реквизиты</h1>
          <p className="mt-3 text-sm text-gray sm:text-base">
            Официальные данные компании для договора и банковского сопровождения.
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
          <p className="mt-6 text-sm text-gray">
            Полный пакет документов по объекту (кадастр, договор, гарантия)
            предоставляем на просмотре и при подготовке сделки.
          </p>
        </div>
      </section>
    </>
  );
}
