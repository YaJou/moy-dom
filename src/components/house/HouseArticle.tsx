import type { HouseDetailContent } from "@/data/house-detail";
import type { House } from "@/types/house";

interface HouseArticleProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseArticle({ house, detail }: HouseArticleProps) {
  const sections = detail.articleSections;
  if (!sections?.length) return null;

  return (
    <section className="hp-section" id="article">
      <h2 className="hp-h2">Подробнее о доме</h2>
      <p className="hp-lead">
        Описание {house.title}: архитектура, планировка, участок, инженерия и
        состояние.
      </p>

      <div className="hp-article">
        {sections.map((section) => (
          <article
            key={section.id}
            id={`article-${section.id}`}
            className="hp-article-block"
          >
            <div className="hp-article-copy">
              <h3 className="hp-h3">{section.title}</h3>
              {section.lead ? (
                <p className="hp-article-lead">{section.lead}</p>
              ) : null}
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="hp-article-p">
                  {p}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="hp-article-list">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            {section.image ? (
              <div className="hp-article-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.image}
                  alt={section.imageAlt ?? section.title}
                />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
