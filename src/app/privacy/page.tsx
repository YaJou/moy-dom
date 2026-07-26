import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Политика конфиденциальности",
    description: `Политика конфиденциальности сайта ${siteConfig.name}. Порядок обработки персональных данных.`,
    path: "/privacy/",
  }),
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Политика конфиденциальности" },
        ]}
      />
      <section className="section-padding bg-white">
        <article className="container-main prose-sm max-w-3xl sm:prose-base">
          <h1 className="section-title">Политика конфиденциальности</h1>
          <p className="mt-4 text-sm text-gray">
            Дата публикации: 26 июля 2026 г.
          </p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-dark sm:text-base">
            <p>
              Настоящая Политика определяет порядок обработки персональных данных
              пользователей сайта {siteConfig.url} (далее — Сайт), принадлежащего
              компании {siteConfig.name}.
            </p>
            <h2 className="pt-2 text-lg font-semibold">1. Какие данные мы собираем</h2>
            <p>
              Имя, номер телефона, адрес электронной почты и иные сведения,
              которые вы добровольно указываете в формах обратной связи, заявках
              на звонок и консультацию.
            </p>
            <h2 className="pt-2 text-lg font-semibold">2. Цели обработки</h2>
            <p>
              Обработка заявок, связь по вопросам покупки дома, ипотеки и
              рассрочки, улучшение качества сервиса и исполнение договорных
              обязательств.
            </p>
            <h2 className="pt-2 text-lg font-semibold">3. Правовые основания</h2>
            <p>
              Обработка осуществляется на основании согласия субъекта персональных
              данных и в соответствии с Федеральным законом № 152-ФЗ «О
              персональных данных».
            </p>
            <h2 className="pt-2 text-lg font-semibold">4. Передача третьим лицам</h2>
            <p>
              Данные не продаются и не передаются третьим лицам, за исключением
              случаев, предусмотренных законодательством РФ, либо когда это
              необходимо для исполнения договора (банки-партнёры при оформлении
              ипотеки — только с вашего согласия).
            </p>
            <h2 className="pt-2 text-lg font-semibold">5. Хранение и защита</h2>
            <p>
              Принимаем организационные и технические меры для защиты данных от
              неправомерного доступа. Срок хранения — до достижения целей
              обработки или отзыва согласия.
            </p>
            <h2 className="pt-2 text-lg font-semibold">6. Ваши права</h2>
            <p>
              Вы можете запросить уточнение, блокирование или удаление своих
              данных, направив обращение на {siteConfig.email} или по телефону{" "}
              {siteConfig.phone}.
            </p>
            <h2 className="pt-2 text-lg font-semibold">7. Контакты оператора</h2>
            <p>
              {siteConfig.name}, {siteConfig.address}, {siteConfig.email},{" "}
              {siteConfig.phone}.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
