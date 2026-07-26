import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { companyRequisites } from "@/data/homepage";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Политика конфиденциальности",
    description: `Политика конфиденциальности сайта ${siteConfig.name}. Порядок обработки персональных данных по 152-ФЗ.`,
    path: "/privacy/",
  }),
  robots: { index: true, follow: true },
};

const REVISION = "26 июля 2026 г.";
const VERSION = "1.1";

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
        <article className="container-main max-w-3xl">
          <h1 className="section-title">Политика конфиденциальности</h1>
          <p className="mt-4 text-sm text-gray">
            Редакция {VERSION} · дата публикации / обновления: {REVISION}
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-dark sm:text-base">
            <p>
              Настоящая Политика определяет порядок обработки персональных данных
              пользователей сайта{" "}
              <a href={siteConfig.url} className="text-primary hover:underline">
                {siteConfig.url}
              </a>{" "}
              (далее — Сайт) оператором {companyRequisites.name} (бренд «
              {siteConfig.name}»). Политика разработана в соответствии с
              Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>

            <h2 className="pt-2 text-lg font-semibold">1. Оператор персональных данных</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Наименование: {companyRequisites.name}</li>
              <li>ИНН: {companyRequisites.inn}</li>
              <li>ОГРН: {companyRequisites.ogrn}</li>
              <li>Адрес: {siteConfig.address}</li>
              <li>Email: {siteConfig.email}</li>
              <li>Телефон: {siteConfig.phone}</li>
            </ul>
            <p>
              Актуальные реквизиты также опубликованы на странице{" "}
              <Link href="/documents/" className="text-primary hover:underline">
                Документы
              </Link>
              .
            </p>

            <h2 className="pt-2 text-lg font-semibold">2. Какие данные обрабатываются</h2>
            <p>Мы можем обрабатывать:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>имя / обращение;</li>
              <li>номер телефона;</li>
              <li>город интереса и текст сообщения из форм;</li>
              <li>
                технические данные браузера (IP-адрес серверных журналов хостинга,
                User-Agent), необходимые для работы и безопасности Сайта;
              </li>
              <li>
                данные, сохраняемые локально в браузере (например, список сравнения
                домов в localStorage).
              </li>
            </ul>

            <h2 className="pt-2 text-lg font-semibold">3. Цели обработки</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                обработка заявок на консультацию, звонок и просмотр объектов;
              </li>
              <li>подбор домов, помощь с ипотекой и рассрочкой;</li>
              <li>
                направление информационных уведомлений о новых домах и скидках —{" "}
                <strong>только при отдельном согласии</strong>;
              </li>
              <li>исполнение договорных обязательств и ответы на обращения;</li>
              <li>обеспечение работоспособности и безопасности Сайта.</li>
            </ul>

            <h2 className="pt-2 text-lg font-semibold">4. Правовые основания</h2>
            <p>
              Обработка осуществляется на основании согласия субъекта персональных
              данных (ст. 6, 9 152-ФЗ), а также когда обработка необходима для
              исполнения договора или для осуществления прав и законных интересов
              оператора при условии, что при этом не нарушаются права субъекта.
            </p>

            <h2 id="cookies" className="scroll-mt-24 pt-2 text-lg font-semibold">
              5. Cookie и локальные данные
            </h2>
            <p>
              На Сайте используется баннер согласия на cookie. До выбора
              пользователя мы не устанавливаем аналитические и рекламные cookie.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Необходимые:</strong> технические данные для отображения
                страниц; локальное хранение выбора согласия и списка сравнения
                домов.
              </li>
              <li>
                <strong>Аналитические / маркетинговые:</strong> не используются,
                пока вы не нажмёте «Принять все». При подключении счётчиков
                (например, Яндекс Метрики) они будут включаться только после
                согласия.
              </li>
            </ul>
            <p>
              При просмотре встроенных карт Яндекса или видео YouTube сторонний
              сервис может устанавливать собственные cookie по своим правилам —
              такие виджеты загружаются как внешний контент.
            </p>

            <h2 className="pt-2 text-lg font-semibold">6. Сроки хранения</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                заявки на консультацию — до 12 месяцев с даты обращения или до
                отзыва согласия / достижения цели;
              </li>
              <li>
                подписка на уведомления — до отзыва согласия или удаления
                подписки;
              </li>
              <li>
                журналы веб-сервера хостинга — согласно настройкам провайдера,
                обычно не более 12 месяцев;
              </li>
              <li>
                согласие на cookie в браузере — до очистки данных сайта
                пользователем или повторного выбора.
              </li>
            </ul>

            <h2 className="pt-2 text-lg font-semibold">7. Передача третьим лицам</h2>
            <p>
              Персональные данные не продаются. Передача возможна:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                хостинг-провайдеру (хранение сайта и журналов) на территории РФ;
              </li>
              <li>
                банкам-партнёрам при оформлении ипотеки — только с вашего
                согласия и в объёме, необходимом для сделки;
              </li>
              <li>по требованию суда или уполномоченных органов РФ.</li>
            </ul>

            <h2 className="pt-2 text-lg font-semibold">
              8. Трансграничная передача
            </h2>
            <p>
              Оператор не осуществляет систематическую трансграничную передачу
              персональных данных. При использовании зарубежных сервисов (если
              будут подключены) передача будет указываться в настоящей Политике, а
              загрузка скриптов — только после согласия на cookie.
            </p>

            <h2 className="pt-2 text-lg font-semibold">9. Права субъекта</h2>
            <p>Вы вправе:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>получить сведения об обработке ваших данных;</li>
              <li>требовать уточнения, блокирования или уничтожения данных;</li>
              <li>отозвать согласие на обработку;</li>
              <li>
                обжаловать действия оператора в Роскомнадзор или в суд.
              </li>
            </ul>
            <p>
              Для реализации прав направьте запрос на {siteConfig.email} или
              позвоните по телефону {siteConfig.phone}. Мы ответим в сроки,
              установленные 152-ФЗ.
            </p>

            <h2 className="pt-2 text-lg font-semibold">
              10. Уведомление Роскомнадзора
            </h2>
            <p>
              Оператор обрабатывает персональные данные. Номер записи в реестре
              операторов персональных данных Роскомнадзора на Сайте не публикуется
              (при наличии — предоставляется по запросу). Если обработка
              подпадает под случаи, не требующие уведомления (ст. 22 152-ФЗ),
              уведомление не направляется. Факт регистрации автоматически Сайтом
              не подтверждается.
            </p>

            <h2 className="pt-2 text-lg font-semibold">11. Защита данных</h2>
            <p>
              Применяются организационные и технические меры: ограничение доступа,
              HTTPS, разграничение прав сотрудников, актуализация ПО на стороне
              хостинга.
            </p>

            <h2 className="pt-2 text-lg font-semibold">12. Изменение Политики</h2>
            <p>
              Актуальная версия всегда доступна по адресу{" "}
              <Link href="/privacy/" className="text-primary hover:underline">
                /privacy/
              </Link>
              . Дата редакции указана в начале документа. Продолжение
              использования Сайта после обновления означает ознакомление с новой
              редакцией в части, не требующей повторного согласия; для новых
              целей обработки мы запросим согласие отдельно.
            </p>

            <h2 className="pt-2 text-lg font-semibold">13. Контакты</h2>
            <p>
              По вопросам персональных данных: {siteConfig.email},{" "}
              {siteConfig.phone}, {siteConfig.address}. Также см.{" "}
              <Link href="/contacts/" className="text-primary hover:underline">
                Контакты
              </Link>{" "}
              и{" "}
              <Link href="/offer/" className="text-primary hover:underline">
                Публичную оферту
              </Link>
              .
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
