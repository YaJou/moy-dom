import type { HouseDetailContent } from "@/data/house-detail";
import { buildDocuments } from "@/lib/house-page";
import type { House } from "@/types/house";

interface HouseDocsProps {
  house: House;
  detail: HouseDetailContent;
}

/** Документы — без фейковых фото строительства. История стройки только при реальных кадрах. */
export function HouseDocsAndBuild({ house, detail }: HouseDocsProps) {
  const docs = buildDocuments(detail);
  const stages = detail.constructionStages ?? [];

  return (
    <section className="hp-section" id="docs">
      <div className={stages.length ? "hp-docs-grid" : undefined}>
        {stages.length > 0 ? (
          <div>
            <h2 className="hp-h2">Как строился этот дом</h2>
            <p className="hp-lead">Реальные этапы строительства объекта.</p>
            <ul className="hp-build-stages">
              {stages.map((stage) => (
                <li key={stage.title} className="hp-build-stage">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={stage.image} alt={stage.title} />
                  <div>
                    <h3>{stage.title}</h3>
                    <p>{stage.caption}</p>
                    {stage.date ? <time>{stage.date}</time> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          <h2 className="hp-h2">
            {stages.length ? "Документы по дому" : "Документы и гарантия"}
          </h2>
          <p className="hp-lead">
            Что можно проверить по объекту {house.title} до сделки.
          </p>
          <ul className="hp-docs-list">
            {docs.map((doc) => (
              <li key={doc.title}>
                <strong>{doc.title}</strong>
                <span>{doc.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
