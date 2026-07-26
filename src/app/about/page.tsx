import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { companyRequisites } from "@/data/homepage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "О компании",
  description: `${siteConfig.name} — строительная компания в Саратовской области. Более 200 построенных домов, полный цикл: проектирование, строительство, коммуникации и сопровождение сделки.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "О компании" },
        ]}
      />
      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl">
          <h1 className="section-title">О компании {siteConfig.name}</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray sm:text-base">
            <p>
              {siteConfig.name} — строительная компания полного цикла. Мы
              проектируем, строим и продаём частные дома с участком и
              коммуникациями в Саратове, Энгельсе и Балаково.
            </p>
            <p>
              Более 15 лет на рынке и более 200 построенных объектов. Работаем
              официально, аккредитованы в крупных банках для ипотеки и
              сопровождаем сделку от просмотра до ключей.
            </p>
            <p>
              В каталоге — дома с газом, скважиной, канализацией и предчистовой
              отделкой. Участок входит в стоимость. Доступны семейная ипотека и
              рассрочка от застройщика.
            </p>
          </div>
          <ul className="mt-8 space-y-2 text-sm text-dark sm:text-base">
            <li>• Офис: {siteConfig.address}</li>
            <li>• Телефон: {siteConfig.phone}</li>
            <li>• Режим работы: {siteConfig.workingHours}</li>
            <li>
              • {companyRequisites.name}, ИНН {companyRequisites.inn}
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog/" className="btn-primary">
              Смотреть каталог
            </Link>
            <Link
              href="/contacts/"
              className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
            >
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
