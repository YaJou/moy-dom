import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Публичная оферта",
  description: `Публичная оферта ${siteConfig.name} на оказание информационных и консультационных услуг по подбору готовых домов.`,
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
          <p className="mt-4 text-sm text-gray">Дата публикации: 26 июля 2026 г.</p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-dark sm:text-base">
            <p>
              Настоящий документ является официальным предложением (офертой)
              компании {siteConfig.name} заключить договор на условиях,
              изложенных ниже.
            </p>
            <h2 className="pt-2 text-lg font-semibold">1. Предмет</h2>
            <p>
              Информационно-консультационные услуги по подбору готовых частных
              домов, организации просмотра объектов, сопровождению при оформлении
              ипотеки и сделки купли-продажи.
            </p>
            <h2 className="pt-2 text-lg font-semibold">2. Акцепт оферты</h2>
            <p>
              Отправка заявки через формы Сайта, звонок или сообщение в
              мессенджеры означают полное согласие с условиями настоящей оферты
              и Политики конфиденциальности.
            </p>
            <h2 className="pt-2 text-lg font-semibold">3. Стоимость услуг</h2>
            <p>
              Консультация и организация просмотра объектов для покупателя —
              бесплатно. Условия покупки конкретного дома фиксируются в договоре
              купли-продажи.
            </p>
            <h2 className="pt-2 text-lg font-semibold">4. Ответственность</h2>
            <p>
              Информация на Сайте носит справочный характер. Актуальные цена,
              комплектация и сроки уточняются при просмотре и в договоре.
            </p>
            <h2 className="pt-2 text-lg font-semibold">5. Реквизиты</h2>
            <p>
              {siteConfig.name}, {siteConfig.address}, тел. {siteConfig.phone},{" "}
              {siteConfig.email}.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
