"use client";

import { ArticleToc } from "@/components/blog/ArticleToc";
import { BlogRelatedArticles } from "@/components/blog/BlogRelatedArticles";
import { EditorialImage } from "@/components/blog/EditorialImage";
import { StickyArticleToc } from "@/components/blog/StickyArticleToc";
import {
  BudgetTool,
  ComparePlots,
  NeedsNotes,
  PlotFitSchemes,
  UtilitiesAccordion,
  ViewingChecklist,
} from "@/components/blog/UchastokTools";
import { HomeHouseCard } from "@/components/home/HomeHouseCard";
import {
  UCHASTOK_BUILD_QUESTIONS,
  UCHASTOK_IMG,
  UCHASTOK_LAND_VS_HOUSE,
  UCHASTOK_LOCAL_CHECKS,
  UCHASTOK_OFFICIAL_LINKS,
  UCHASTOK_PROMISE,
  UCHASTOK_SITE_CHECKS,
  UCHASTOK_TOC,
} from "@/data/blog/articles/uchastok";
import type { BlogArticle } from "@/data/blog";
import { realHouses } from "@/data/houses";
import Link from "next/link";
import { useMemo } from "react";

const toc = UCHASTOK_TOC.map((t) => ({ id: t.id, text: t.text }));

function AuthorCard({ article }: { article: BlogArticle }) {
  if (!article.author) return null;
  const { author } = article;
  return (
    <aside className="ja-author-card">
      <div className="ja-author-avatar" aria-hidden>
        {author.name.slice(0, 1)}
      </div>
      <div>
        <Link href={author.href} className="ja-author-name">
          {author.name}
        </Link>
        <p className="ja-author-role">{author.role}</p>
        <p className="ja-author-exp">{author.experience}</p>
      </div>
    </aside>
  );
}

function CatalogSection() {
  const houses = useMemo(() => realHouses.slice(0, 3), []);

  return (
    <section className="uc-section uc-catalog" id="katalog">
      <h2 className="ja-h2">Участок отдельно или дом с землёй?</h2>
      <p className="ja-lead">
        Если сравниваете покупку земли под стройку с готовым домом, смотрите не
        только цену. Важны срок, статус сетей и объём задач после сделки. Подробнее
        о сравнении подходов — в статье{" "}
        <Link href="/blog/prichiny/" className="ja-text-link">
          «Готовый дом или строительство»
        </Link>
        .
      </p>

      <div className="uc-table-wrap">
        <table className="uc-table">
          <thead>
            <tr>
              <th>Что сравниваем</th>
              <th>Участок + стройка</th>
              <th>Готовый дом с участком</th>
            </tr>
          </thead>
          <tbody>
            {UCHASTOK_LAND_VS_HOUSE.map((row) => (
              <tr key={row.label}>
                <td data-label="Что сравниваем">{row.label}</td>
                <td data-label="Участок + стройка">{row.land}</td>
                <td data-label="Готовый дом с участком">{row.house}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="ja-p uc-cta-line">
        Хотите оценить дом вместе с участком? Посмотрите расположение дома, двор
        и комплектацию на конкретных объектах.
      </p>

      <div className="ja-related-houses-grid">
        {houses.map((house) => (
          <div key={house.id} className="ja-related-house">
            <HomeHouseCard house={house} />
            <Link href={`/catalog/${house.id}/`} className="ja-text-link">
              Подробнее о доме →
            </Link>
          </div>
        ))}
      </div>
      <p className="uc-catalog-all">
        <Link href="/catalog/" className="ja-text-link">
          Смотреть все дома →
        </Link>
      </p>
    </section>
  );
}

export function UchastokArticle({ article }: { article: BlogArticle }) {
  return (
    <article className="ja-page uc-page">
      <div className="container-main">
        <header className="ja-hero uc-hero">
          {article.categoryLabel ? (
            <p className="ja-eyebrow">{article.categoryLabel}</p>
          ) : null}
          <h1 className="ja-h1">
            Как выбрать участок под дом: что проверить до покупки
          </h1>
          <p className="ja-deck uc-deck">
            Разбираем документы, размеры, подъезд и коммуникации. Показываем,
            какие вопросы задать продавцу и что учесть помимо цены земли.
          </p>
          <div className="ja-meta">
            {article.author ? (
              <Link href={article.author.href} className="ja-meta-author">
                {article.author.name}
              </Link>
            ) : null}
            <time dateTime={article.dateIso}>Опубликовано {article.date}</time>
            {article.updatedDate ? (
              <time dateTime={article.updatedDateIso}>
                Обновлено {article.updatedDate}
              </time>
            ) : null}
            <span>{article.readTime}</span>
          </div>
        </header>

        <figure className="ja-cover uc-cover">
          <EditorialImage
            src={UCHASTOK_IMG.cover}
            alt="Подъезд и участок: дорога, ограждение, окружение"
            aspect="3 / 2"
            className="pr-cover-frame"
            imgClassName="uc-cover-img"
            priority
            width={1200}
            height={800}
            sizes="1200px"
          />
          <figcaption className="ja-caption">
            {article.coverCaption ??
              "Подъезд и окружение участка — смотрите дорогу и доступ, а не только фасад дома."}
          </figcaption>
        </figure>

        <ul className="uc-promise">
          {UCHASTOK_PROMISE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ArticleToc items={toc} mode="mobile" />

        <div className="uc-layout">
          <div className="uc-main">
            <section className="uc-section" id="nuzhen">
              <h2 className="ja-h2">Сначала определите, какой участок вам нужен</h2>
              <p className="ja-p">
                Начните с дома и привычного образа жизни. Так проще понять, какой
                участок подходит вам по форме, расположению и площади. Заметки
                сохраняются в браузере — телефон и регистрация не нужны.
              </p>
              <NeedsNotes />
            </section>

            <section className="uc-section" id="pomestitsya">
              <h2 className="ja-h2">Поместится ли ваш дом?</h2>
              <p className="ja-p">
                Площадь в сотках — только часть картины. Форма участка, отступы
                от границ и место под парковку часто важнее «красивой цифры» в
                объявлении. Ниже — схематичные примеры в одном масштабе.
              </p>
              <PlotFitSchemes />
            </section>

            <section className="uc-section" id="mozhno-stroit">
              <h2 className="ja-h2">Можно ли здесь построить нужный дом?</h2>
              <p className="ja-p">
                Категория земель, вид разрешённого использования и нахождение
                участка в СНТ — разные понятия. Их нельзя подменять друг другом.
                Категория говорит о типе земель в учёте, ВРИ — о допустимом
                использовании, статус СНТ — о членстве и правилах товарищества.
                Вывод «можно строить» делается только по документам конкретного
                участка.
              </p>

              <div className="uc-build-grid">
                {UCHASTOK_BUILD_QUESTIONS.map((q) => (
                  <article key={q.title} className="uc-build-card">
                    <h3 className="ja-h3">{q.title}</h3>
                    <p>{q.text}</p>
                  </article>
                ))}
              </div>

              <div className="uc-check-box">
                <p className="uc-callout-title">Где проверить</p>
                <ul className="uc-official-links">
                  {UCHASTOK_OFFICIAL_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                      <span>{link.note}</span>
                    </li>
                  ))}
                </ul>
                <p className="uc-check-note">
                  Ограничения и параметры строительства дополнительно уточняйте
                  в администрации и через ГПЗУ по адресу / кадастровому номеру.
                </p>
              </div>

              <div className="uc-callout">
                <p className="uc-callout-title">Важно</p>
                <p>
                  Статья помогает подготовить вопросы и список проверок. Итоговое
                  заключение по возможности строительства нужно делать по
                  документам и нормам для конкретного участка — при необходимости
                  со специалистом.
                </p>
              </div>
            </section>

            <section className="uc-section" id="na-meste">
              <h2 className="ja-h2">Что посмотреть на месте</h2>
              <p className="ja-p">
                Документы отвечают на «можно ли», осмотр — на «удобно ли жить».
                Ниже — темы для первого выезда: подъезд, рельеф, окружение,
                границы.
              </p>

              <div className="uc-site-checks">
                {UCHASTOK_SITE_CHECKS.map((block) => (
                  <div key={block.id} className="uc-site-row">
                    <figure className="uc-site-photo">
                      <EditorialImage
                        src={block.image}
                        alt={block.imageCaption}
                        aspect="4 / 3"
                        width={640}
                        height={480}
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                      <figcaption className="ja-caption">
                        {block.imageCaption}
                      </figcaption>
                    </figure>
                    <div className="uc-site-copy">
                      <h3 className="ja-h3">{block.title}</h3>
                      <ul className="ja-ul">
                        {block.questions.map((q) => (
                          <li key={q}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="uc-callout">
                <p className="uc-callout-title">Грунт и геология</p>
                <p>
                  По фото и одному визиту нельзя проектировать фундамент.
                  Заметьте вопросы для специалиста: следы воды, насыпи, торф,
                  перепады. Геология и тип основания — отдельная проверка, не
                  «DIY по картинке».
                </p>
              </div>
            </section>

            <section className="uc-section" id="kommunikacii">
              <h2 className="ja-h2">Коммуникации: что уточнить до покупки</h2>
              <UtilitiesAccordion />
            </section>

            <section className="uc-section" id="rashody">
              <h2 className="ja-h2">Какие расходы появятся после покупки</h2>
              <p className="ja-p">
                Цена земли — только часть бюджета. Расчистка, подъезд, сети,
                изыскания и проект часто всплывают уже после сделки. Соберите
                известные суммы и отдельно отметьте, что ещё не ясно.
              </p>
              <BudgetTool />
            </section>

            <section className="uc-section" id="sravnenie">
              <h2 className="ja-h2">Сравните два участка по одним вопросам</h2>
              <ComparePlots />
            </section>

            <section className="uc-section" id="mestnoe">
              <h2 className="ja-h2">
                Энгельс, Саратов, Балаково: что проверить по месту
              </h2>
              <p className="ja-p">
                Не опирайтесь на общие фразы вроде «15 минут до центра».
                Проверьте свой маршрут: работа, школа, магазины, транспорт и
                подъезд в непогоду.
              </p>

              <div className="uc-local-photos">
                <figure>
                  <EditorialImage
                    src={UCHASTOK_IMG.access}
                    alt="Подъезд к участку"
                    aspect="3 / 2"
                    width={800}
                    height={533}
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                  <figcaption className="ja-caption">
                    Подъезд и доступ — смотрите в разную погоду
                  </figcaption>
                </figure>
                <figure>
                  <EditorialImage
                    src={UCHASTOK_IMG.garden}
                    alt="Участок и окружение"
                    aspect="3 / 2"
                    width={800}
                    height={533}
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                  <figcaption className="ja-caption">
                    Окружение участка и повседневный маршрут
                  </figcaption>
                </figure>
              </div>

              <div className="uc-local-grid">
                {UCHASTOK_LOCAL_CHECKS.map((block) => (
                  <article key={block.place} className="uc-local-card">
                    <h3 className="ja-h3">{block.place}</h3>
                    <ul className="ja-ul">
                      {block.prompts.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="uc-section" id="osmotr">
              <h2 className="ja-h2">Что успеть проверить на первом осмотре</h2>
              <p className="ja-p">
                Отметьте статус по каждому пункту и скачайте список себе на
                устройство — без заявки и регистрации.
              </p>
              <ViewingChecklist />
            </section>

            <AuthorCard article={article} />
          </div>

          <aside className="uc-aside">
            <StickyArticleToc items={toc} />
            <p className="uc-aside-link">
              <Link href="/catalog/">Смотреть дома →</Link>
            </p>
          </aside>
        </div>

        <CatalogSection />

        <BlogRelatedArticles
          article={{
            ...article,
            relatedSlugs: ["prichiny", "otdelka", "ipoteka"],
          }}
        />
      </div>
    </article>
  );
}
