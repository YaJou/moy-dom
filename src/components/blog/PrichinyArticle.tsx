"use client";

import { ArticleToc } from "@/components/blog/ArticleToc";
import { BlogRelatedArticles } from "@/components/blog/BlogRelatedArticles";
import {
  PrichinyBudgetTool,
  PrichinyChecklist,
  PrichinyQuiz,
} from "@/components/blog/PrichinyTools";
import { StickyArticleToc } from "@/components/blog/StickyArticleToc";
import { HomeHouseCard } from "@/components/home/HomeHouseCard";
import { ViewingForm } from "@/components/home/ViewingForm";
import { HouseImage } from "@/components/ui/HouseImage";
import {
  PRICHINY_BUDGET_ITEMS,
  PRICHINY_BUILD_WHEN,
  PRICHINY_COMPARE_ROWS,
  PRICHINY_FAQ,
  PRICHINY_IMG,
  PRICHINY_REASONS,
  PRICHINY_TESES,
  PRICHINY_TOC,
} from "@/data/blog/articles/prichiny";
import type { BlogArticle } from "@/data/blog";
import { realHouses } from "@/data/houses";
import Link from "next/link";
import { useMemo } from "react";

const toc = PRICHINY_TOC.map((t) => ({ id: t.id, text: t.text }));

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

function CatalogHouses() {
  const houses = useMemo(() => realHouses.slice(0, 3), []);
  return (
    <section className="pr-catalog" id="katalog">
      <h2 className="ja-h2">Посмотрите, как это выглядит в реальном доме</h2>
      <p className="ja-lead">
        Объекты из каталога: реальные фото, площадь, участок, цена и отделка.
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
    </section>
  );
}

function CompareSection() {
  return (
    <section className="pr-compare-wrap" id="sravnenie">
      <h2 className="ja-h2">Готовый дом или стройка с нуля?</h2>
      <div className="pr-compare-cards">
        <figure className="pr-compare-card">
          <div className="pr-compare-photo">
            <HouseImage
              src={PRICHINY_IMG.build}
              alt=""
              fill
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
          <figcaption>
            <h3>Строить под себя</h3>
            <p>
              Больше свободы в проекте. Потребуется организовать проектирование,
              работы и контроль.
            </p>
            <span className="ja-caption">Иллюстрация</span>
          </figcaption>
        </figure>
        <figure className="pr-compare-card">
          <div className="pr-compare-photo">
            <HouseImage
              src={PRICHINY_IMG.ready}
              alt=""
              fill
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
          <figcaption>
            <h3>Выбрать готовый дом</h3>
            <p>
              Можно осмотреть результат. Придётся выбирать из существующих
              планировок и проверить состояние дома.
            </p>
            <span className="ja-caption">Иллюстрация</span>
          </figcaption>
        </figure>
      </div>

      <div className="pr-table-wrap">
        <table className="pr-table">
          <thead>
            <tr>
              <th>Что сравниваем</th>
              <th>Строительство</th>
              <th>Готовый дом</th>
            </tr>
          </thead>
          <tbody>
            {PRICHINY_COMPARE_ROWS.map((row) => (
              <tr key={row.label}>
                <td data-label="Что сравниваем">{row.label}</td>
                <td data-label="Строительство">{row.build}</td>
                <td data-label="Готовый дом">{row.ready}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function PrichinyArticle({ article }: { article: BlogArticle }) {
  return (
    <article className="ja-page pr-page">
      <div className="container-main">
        <header className="ja-hero pr-hero">
          {article.categoryLabel ? (
            <p className="ja-eyebrow">{article.categoryLabel}</p>
          ) : null}
          <h1 className="ja-h1">{article.title}</h1>
          <p className="ja-deck pr-deck">{article.description}</p>
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

        <figure className="ja-cover pr-cover">
          <div className="pr-cover-frame">
            <HouseImage
              src={article.image}
              alt=""
              fill
              objectFit="cover"
              sizes="1200px"
              priority
              className="pr-cover-img"
            />
          </div>
          <figcaption className="ja-caption">
            {article.coverCaption ?? "Иллюстрация"}
          </figcaption>
        </figure>

        <ul className="pr-teses">
          {PRICHINY_TESES.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <ArticleToc items={toc} mode="mobile" />

        <CompareSection />

        <div className="pr-layout">
          <div className="pr-main">
            <section className="pr-section" id="prichiny">
              <h2 className="ja-h2">Пять причин выбрать готовый дом</h2>
              <div className="pr-reasons">
                {PRICHINY_REASONS.map((reason) => (
                  <article
                    key={reason.num}
                    className="pr-reason"
                    id={reason.id}
                  >
                    <p className="pr-reason-num">{reason.num}</p>
                    <h3 className="ja-h3">{reason.title}</h3>
                    {reason.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)} className="ja-p">
                        {p}
                      </p>
                    ))}
                    {"bullets" in reason && reason.bullets ? (
                      <div className="pr-reason-bullets">
                        {reason.bullets.map((b) => (
                          <div key={b.title} className="pr-reason-bullet">
                            <h4>{b.title}</h4>
                            <p>{b.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {"image" in reason && reason.image ? (
                      <figure className="pr-reason-figure">
                        <div className="pr-reason-photo">
                          <HouseImage
                            src={reason.image}
                            alt=""
                            fill
                            objectFit="cover"
                            sizes="(max-width: 768px) 100vw, 760px"
                          />
                        </div>
                        <figcaption className="ja-caption">
                          {"imageCaption" in reason && reason.imageCaption
                            ? reason.imageCaption
                            : "Иллюстрация"}
                        </figcaption>
                      </figure>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="pr-section" id="proverka">
              <h2 className="ja-h2">Что проверить на просмотре</h2>
              <p className="ja-p">
                Красивый фасад — только часть впечатления. На просмотре стоит
                отдельно обсудить состояние дома, комплектацию и документы.
              </p>
              <div className="pr-inspect">
                <figure className="pr-inspect-figure">
                  <div className="pr-inspect-photo">
                    <HouseImage
                      src={PRICHINY_IMG.inspection}
                      alt=""
                      fill
                      objectFit="cover"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                  </div>
                  <figcaption className="ja-caption">Иллюстрация</figcaption>
                </figure>
                <PrichinyChecklist />
              </div>
            </section>

            <section className="pr-section" id="stroit">
              <h2 className="ja-h2">Когда всё-таки лучше строить</h2>
              <p className="ja-p">
                Строительство может подойти лучше, если у вас уже есть подходящий
                участок, нужна нестандартная планировка или вы хотите выбирать
                конструктивные решения и материалы с самого начала. В этом случае
                стоит отдельно оценить время на организацию работ и контроль.
              </p>
              <div className="pr-build-when">
                {PRICHINY_BUILD_WHEN.map((item) => (
                  <div key={item.title} className="pr-build-when-card">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
              <PrichinyQuiz />
            </section>

            <section className="pr-section" id="ipoteka-note">
              <p className="ja-p">
                Если рассматриваете покупку с кредитом, условия программы и
                требования к конкретному дому нужно уточнить до решения о
                покупке.{" "}
                <Link href="/blog/ipoteka/" className="ja-text-link">
                  Статья об ипотеке на готовый дом →
                </Link>
              </p>
            </section>

            <section className="pr-section" id="faq">
              <h2 className="ja-h2">Вопросы</h2>
              <div className="pr-faq">
                {PRICHINY_FAQ.map((item) => (
                  <details key={item.q} className="pr-faq-item">
                    <summary>
                      {item.q}
                      <span aria-hidden className="pr-faq-plus">
                        +
                      </span>
                    </summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <AuthorCard article={article} />
          </div>

          <aside className="pr-aside">
            <StickyArticleToc items={toc} />
            <p className="pr-aside-link">
              <Link href="/catalog/">Смотреть дома →</Link>
            </p>
          </aside>
        </div>

        <section className="pr-budget-outer" id="budget">
          <div className="pr-budget-panel">
            <h2 className="pr-budget-title">Сколько нужно сверх цены дома?</h2>
            <p className="pr-budget-lead">
              Цена в объявлении — отправная точка. Перед выбором соберите
              расходы, которые относятся именно к вашему варианту.
            </p>
            <ul className="pr-budget-points">
              {PRICHINY_BUDGET_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <PrichinyBudgetTool />
          </div>
        </section>

        <CatalogHouses />

        <section className="pr-cta">
          <div className="pr-cta-copy">
            <h2 className="ja-h2">Посмотрите дом перед решением</h2>
            <p>
              На месте проще оценить комнаты, участок и объём оставшихся работ.
              Выберите интересующий дом и согласуйте просмотр.
            </p>
          </div>
          <ViewingForm
            className="pr-cta-form"
            context={{
              houseUrl: "/blog/prichiny/",
              filters: "prichiny-viewing",
            }}
          />
        </section>

        <BlogRelatedArticles
          article={{
            ...article,
            relatedSlugs: ["ipoteka", "otdelka", "uchastok"],
          }}
        />
      </div>
    </article>
  );
}
