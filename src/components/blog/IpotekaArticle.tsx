"use client";

import { HomeHouseCard } from "@/components/home/HomeHouseCard";
import { useViewingModal } from "@/components/home/ViewingModalProvider";
import { StickyArticleToc } from "@/components/blog/StickyArticleToc";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { IpotekaCalculator } from "@/components/blog/IpotekaCalculator";
import { HouseImage } from "@/components/ui/HouseImage";
import {
  IPOTEKA_BUYER_DOCS,
  IPOTEKA_EXPENSES,
  IPOTEKA_FAQ,
  IPOTEKA_HOUSE_DOCS,
  IPOTEKA_ORIENTATION,
  IPOTEKA_STEPS,
  IPOTEKA_TOC,
} from "@/data/blog/articles/ipoteka";
import {
  getBlogArticle,
  getBlogArticleHref,
  type BlogArticle,
} from "@/data/blog";
import { realHouses } from "@/data/houses";
import { siteConfig } from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const toc = IPOTEKA_TOC.map((t) => ({ id: t.id, text: t.text }));

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

function RelatedArticles({ article }: { article: BlogArticle }) {
  const related = article.relatedSlugs
    .map((s) => getBlogArticle(s))
    .filter(Boolean) as BlogArticle[];

  if (!related.length) return null;

  return (
    <aside className="ja-related-articles">
      <h2 className="ja-h2">Читайте также</h2>
      <div className="ja-related-articles-grid">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={getBlogArticleHref(item.slug)}
            className="ja-related-card"
          >
            <div className="ja-related-card-photo">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span>{item.readTime}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function CatalogHouses() {
  const houses = useMemo(() => realHouses.slice(0, 3), []);
  return (
    <section className="ja-related-houses mp-catalog">
      <h2 className="ja-h2">Дома, которые можно посмотреть</h2>
      <p className="ja-lead">
        Актуальные объекты из каталога: цена, площадь, участок и фото — как на
        сайте. Подробности комплектации — в карточке дома.
      </p>
      <div className="ja-related-houses-grid">
        {houses.map((house) => (
          <div key={house.id} className="ja-related-house">
            <HomeHouseCard house={house} />
          </div>
        ))}
      </div>
    </section>
  );
}

function DocsRequest() {
  const { openViewing } = useViewingModal();
  const [houseId, setHouseId] = useState("");

  return (
    <div className="mp-docs-cta">
      <label className="mp-field">
        <span>Сначала выберите объект</span>
        <select
          className="mp-input"
          value={houseId}
          onChange={(e) => setHouseId(e.target.value)}
        >
          <option value="">Дом из каталога</option>
          {realHouses.map((h) => (
            <option key={h.id} value={h.id}>
              {h.city} · {h.title}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="mp-btn-primary"
        disabled={!houseId}
        onClick={() => {
          const house = realHouses.find((h) => String(h.id) === houseId);
          if (!house) return;
          openViewing({
            houseId: house.id,
            houseUrl: `/catalog/${house.id}/`,
            city: house.city,
            filters: "ipoteka-docs-request",
          });
        }}
      >
        Запросить сведения по выбранному дому
      </button>
    </div>
  );
}

export function IpotekaArticle({ article }: { article: BlogArticle }) {
  const { openViewing } = useViewingModal();

  return (
    <article className="ja-page mp-page">
      <div className="container-main">
        <header className="ja-hero mp-hero">
          {article.categoryLabel ? (
            <p className="ja-eyebrow">{article.categoryLabel}</p>
          ) : null}
          <h1 className="ja-h1">{article.title}</h1>
          <p className="ja-deck mp-deck">{article.description}</p>
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

        <figure className="ja-cover mp-cover">
          <div className="mp-cover-frame">
            <HouseImage
              src={article.image}
              alt=""
              fill
              objectFit="cover"
              sizes="1200px"
              priority
              className="mp-cover-img"
            />
          </div>
          <figcaption className="ja-caption">
            {article.coverCaption ?? "Иллюстрация к материалу"}
          </figcaption>
        </figure>

        <div className="mp-layout">
          <div className="mp-main">
            <ArticleToc items={toc} mode="mobile" />

            <section className="mp-section">
              <h2 className="ja-h2">Сначала определите три вещи</h2>
              <p className="ja-p">
                Это ориентиры для чтения материала, а не персональный финансовый
                совет и не прогноз одобрения.
              </p>
              <div className="mp-orient">
                {IPOTEKA_ORIENTATION.map((card) => (
                  <div key={card.title} className="mp-orient-card">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mp-section" id="sposoby">
              <h2 className="ja-h2">Какие варианты покупки рассмотреть</h2>
              <p className="ja-p">
                Условия ипотечных программ и рассрочек меняются. Ниже — какие
                параметры сравнивать. Конкретные ставки, сроки и требования к
                заёмщику нужно уточнять по актуальным предложениям банков и
                условиям договора на выбранный дом.
              </p>

              <div className="mp-ways">
                <article className="mp-way">
                  <h3 className="ja-h3">Семейная ипотека</h3>
                  <p className="ja-p">
                    Если рассматриваете госпрограмму, сверьте на официальных
                    источниках: кто может участвовать, какие требования к сделке
                    и объекту, какие документы нужны. Не опирайтесь на устаревшие
                    формулировки из статей или скринов без проверки даты.
                  </p>
                </article>
                <article className="mp-way">
                  <h3 className="ja-h3">Другие ипотечные предложения</h3>
                  <p className="ja-p">
                    Сравнивайте ставку, полную стоимость кредита, размер взноса,
                    срок, требования к дому и продавцу, дополнительные расходы.
                    Для решения нужны конкретный банк, программа и источник с
                    датой условий.
                  </p>
                </article>
                <article className="mp-way">
                  <h3 className="ja-h3">Первоначальный взнос</h3>
                  <p className="ja-p">
                    Учитывайте собственные средства и запас на сопутствующие
                    расходы. Использование материнского капитала возможно только
                    по правилам выбранной программы — уточняйте по официальным
                    условиям.
                  </p>
                </article>
                <article className="mp-way">
                  <h3 className="ja-h3">Рассрочка от компании</h3>
                  <p className="ja-p">
                    Рассрочка возможна только если она реально предусмотрена по
                    конкретному объекту: срок, график платежей и условия
                    фиксируются в договоре. Уточняйте наличие и параметры по
                    выбранному дому — не считайте рассрочку доступной для всех
                    объектов по умолчанию.
                  </p>
                </article>
              </div>

              <p className="ja-p">
                На этом этапе удобно выбрать дом и обсудить сценарий покупки без
                обещаний банковского одобрения.
              </p>
              <button
                type="button"
                className="mp-btn-primary"
                onClick={() =>
                  openViewing({
                    houseUrl: "/blog/ipoteka/",
                    filters: "ipoteka-discuss",
                  })
                }
              >
                Обсудить покупку выбранного дома
              </button>
            </section>
          </div>

          <aside className="mp-aside">
            <StickyArticleToc items={toc} />
            <p className="mp-aside-link">
              <Link href="/catalog/">Смотреть дома в продаже →</Link>
            </p>
          </aside>

          <section className="mp-full mp-section" id="raschet">
            <figure className="mp-figure">
              <div className="mp-figure-frame">
                <HouseImage
                  src="/images/blog/mortgage/02-mortgage-budget.png"
                  alt=""
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
              <figcaption className="ja-caption">
                До сделки стоит отдельно посчитать взнос, платёж и сопутствующие
                расходы
              </figcaption>
            </figure>
            <h2 className="ja-h2">Посчитайте платёж на своих условиях</h2>
            <p className="ja-p mp-full-lead">
              Подставьте цену реального дома или свою сумму. Ставка — ваше
              предположение для ориентира, а не оферта банка.
            </p>
            <IpotekaCalculator />
          </section>

          <section className="mp-col mp-section" id="poryadok">
            <h2 className="ja-h2">Как проходит покупка дома с ипотекой</h2>
            <ol className="mp-steps">
              {IPOTEKA_STEPS.map((step, i) => (
                <li key={step.title} className="mp-step">
                  <span className="mp-step-num" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="ja-p mp-note">
              Отдельные шаги могут идти параллельно; порядок зависит от банка и
              выбранного объекта.
            </p>
          </section>

          <section className="mp-col mp-section" id="dokumenty">
            <h2 className="ja-h2">Что подготовить и о чём спросить</h2>
            <figure className="mp-figure">
              <div className="mp-figure-frame">
                <HouseImage
                  src="/images/blog/mortgage/03-mortgage-documents.png"
                  alt=""
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 760px"
                />
              </div>
              <figcaption className="ja-caption">
                Иллюстрация к разделу: подготовка вопросов, а не фото конкретных
                клиентов или сотрудников
              </figcaption>
            </figure>
            <p className="ja-p">
              Ниже — темы для уточнения, а не юридически полный и обязательный
              для всех сделок список.
            </p>
            <div className="mp-doc-grid">
              <div className="mp-doc-panel">
                <h3 className="ja-h3">По покупателю</h3>
                <ul>
                  {IPOTEKA_BUYER_DOCS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mp-doc-panel">
                <h3 className="ja-h3">По дому и участку</h3>
                <ul>
                  {IPOTEKA_HOUSE_DOCS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <DocsRequest />
          </section>

          <section className="mp-col mp-section" id="rashody">
            <h2 className="ja-h2">Что ещё учесть в бюджете</h2>
            <p className="ja-p">
              Не каждый пункт обязателен. Суммы зависят от сделки — здесь вопросы,
              а не готовые цифры.
            </p>
            <div className="mp-table-wrap">
              <table className="mp-table">
                <thead>
                  <tr>
                    <th>Статья расходов</th>
                    <th>Что уточнить</th>
                    <th>Когда понадобится</th>
                  </tr>
                </thead>
                <tbody>
                  {IPOTEKA_EXPENSES.map((row) => (
                    <tr key={row.item}>
                      <td data-label="Статья расходов">{row.item}</td>
                      <td data-label="Что уточнить">{row.clarify}</td>
                      <td data-label="Когда понадобится">{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="ja-p">
              Уточните, входит ли отделка в стоимость выбранного дома и какие
              работы остаются.{" "}
              <Link href="/blog/otdelka/" className="ja-text-link">
                Статья о предчистовой отделке →
              </Link>
            </p>
            <div className="ja-check-peach mp-peach">
              Цена дома, первоначальный взнос и сумма всех расходов до переезда —
              разные величины. Сравнивайте их отдельно.
            </div>
          </section>

          <section className="mp-col mp-section" id="kompaniya">
            <h2 className="ja-h2">Что можно уточнить у Кров-Сервис</h2>
            <p className="ja-p">
              По нашим объектам помогаем с информацией о доме и комплектации,
              организуем просмотр и сопровождаем сделку в рамках услуг компании.
              Решение о выдаче кредита принимает банк. Мы не обещаем одобрение и
              не подменяем банковскую оценку заявки.
            </p>
            <ul className="ja-ul">
              <li>
                <Link href="/contacts/" className="ja-text-link">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/documents/" className="ja-text-link">
                  Документы компании
                </Link>
              </li>
              <li>
                <Link href="/about/" className="ja-text-link">
                  О компании и реквизиты
                </Link>
              </li>
              <li>
                Адрес офиса: {siteConfig.address}
              </li>
            </ul>
          </section>

          <section className="mp-full mp-section" id="prosmotr">
            <figure className="mp-figure">
              <div className="mp-figure-frame">
                <HouseImage
                  src="/images/blog/mortgage/04-mortgage-house-viewing.png"
                  alt=""
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
              <figcaption className="ja-caption">
                Иллюстрация ситуации просмотра. Люди на изображении не являются
                сотрудниками или клиентами Кров-Сервис.
              </figcaption>
            </figure>
            <div className="mp-viewing">
              <h2 className="ja-h2">Сначала посмотрите дом</h2>
              <p>
                Выберите объект и договоритесь о просмотре. На месте можно
                обсудить планировку, комплектацию и вопросы по покупке.
              </p>
              <div className="mp-viewing-actions">
                <Link href="/catalog/" className="mp-btn-primary">
                  Выбрать дом для просмотра
                </Link>
                <button
                  type="button"
                  className="mp-btn-secondary"
                  onClick={() =>
                    openViewing({
                      houseUrl: "/blog/ipoteka/",
                      filters: "ipoteka-question",
                    })
                  }
                >
                  Задать вопрос
                </button>
              </div>
            </div>
          </section>

          <section className="mp-col mp-section" id="faq">
            <h2 className="ja-h2">Частые вопросы</h2>
            <div className="mp-faq">
              {IPOTEKA_FAQ.map((item) => (
                <details key={item.q} className="mp-faq-item group">
                  <summary>
                    {item.q}
                    <span aria-hidden className="mp-faq-plus">
                      +
                    </span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="mp-col">
            <AuthorCard article={article} />
            <p className="ja-caption mp-sources">
              Источники по условиям ипотечных программ — официальные материалы
              банков и государственных операторов на дату вашего обращения.
              Материал описывает порядок работы с объектами Кров-Сервис и не
              является финансовой рекомендацией.
            </p>
          </div>

          <div className="mp-full">
            <CatalogHouses />
            <RelatedArticles article={article} />
          </div>
        </div>
      </div>
    </article>
  );
}
