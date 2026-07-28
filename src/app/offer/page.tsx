import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { companyRequisites } from "@/data/homepage";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Публичная оферта",
  description: `Публичная оферта ${siteConfig.name} на оказание информационно-консультационных услуг по подбору готовых домов.`,
  path: "/offer/",
});

export default function OfferPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Публичная оферта" },
        ]}
      />
      <section className="section-padding bg-white">
        <article className="container-main max-w-3xl">
          <h1 className="section-title">Публичная оферта</h1>
          <p className="mt-4 text-sm text-gray">
            Редакция 1.1 · дата публикации: 26 июля 2026 г.
          </p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-dark sm:text-base">
            <p>
              Настоящий документ является официальным предложением (офертой)
              {companyRequisites.name} (бренд «{siteConfig.name}») заключить
              договор на условиях, изложенных ниже (ст. 435, 437 ГК РФ).
            </p>
            <h2 className="pt-2 text-lg font-semibold">1. Предмет</h2>
            <p>
              Информационно-консультационные услуги по подбору готовых частных
              домов, организации просмотра объектов, сопровождению при оформлении
              ипотеки и сделки купли-продажи. Купля-продажа конкретного объекта
              оформляется отдельным договором.
            </p>
            <h2 className="pt-2 text-lg font-semibold">2. Акцепт оферты</h2>
            <p>
              Отправка заявки через формы Сайта, звонок или сообщение в
              мессенджеры при наличии согласия на обработку персональных данных
              означают акцепт настоящей оферты в части консультационных услуг и
              согласие с{" "}
              <Link href="/privacy/" className="text-primary hover:underline">
                Политикой конфиденциальности
              </Link>
              .
            </p>
            <h2 className="pt-2 text-lg font-semibold">3. Стоимость услуг</h2>
            <p>
              Консультация и организация просмотра объектов для покупателя —
              бесплатно (0 ₽). Цена конкретного дома указывается в карточке
              объекта на Сайте и фиксируется в договоре купли-продажи. Оплата
              объекта производится по реквизитам продавца / условиям договора, а
              не через формы Сайта.
            </p>
            <h2 className="pt-2 text-lg font-semibold">4. Ответственность</h2>
            <p>
              Информация на Сайте носит справочный характер. Актуальные цена,
              комплектация и сроки уточняются при просмотре и в договоре.
            </p>
            <h2 className="pt-2 text-lg font-semibold">5. Реквизиты</h2>
            <ul className="list-none space-y-1">
              <li>{companyRequisites.name}</li>
              <li>ИНН {companyRequisites.inn}</li>
              <li>
                {companyRequisites.ogrnLabel} {companyRequisites.ogrn}
              </li>
              <li>{companyRequisites.legalAddress}</li>
              <li>{siteConfig.address}</li>
              <li>
                Тел. {siteConfig.phone}, {siteConfig.email}
              </li>
            </ul>
            <p className="text-sm text-gray">
              Поддержка и вопросы по оферте: {siteConfig.phone},{" "}
              {siteConfig.email}. Полные реквизиты — на странице{" "}
              <Link href="/documents/" className="text-primary hover:underline">
                Документы
              </Link>
              .
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
