import type {
  ConstructionStage,
  HouseDetailContent,
} from "@/data/house-detail";
import { buildDocuments } from "@/lib/house-page";
import type { House } from "@/types/house";

interface HouseDocsProps {
  house: House;
  detail: HouseDetailContent;
}

/** Этапы, которые ждём реальными фото этого дома — без подставных кадров. */
const PLANNED_STAGES: Array<Pick<ConstructionStage, "title" | "caption">> = [
  {
    title: "Фундамент",
    caption: "Ожидаем фото ленты и арматуры именно этого объекта",
  },
  {
    title: "Возведение стен",
    caption: "Кадры кладки газоблока / облицовки по этому дому",
  },
  {
    title: "Кровля",
    caption: "Монтаж стропил и покрытия на этом объекте",
  },
  {
    title: "Инженерные работы",
    caption: "Электрика, вода, канализация, отопление на объекте",
  },
  {
    title: "Текущее состояние",
    caption: "Актуальный вид дома и участка на момент продажи",
  },
];

/**
 * Блок доверия по объекту.
 * Если есть constructionStages — показываем реальные фото.
 * Если нет — видимый каркас этапов, чтобы раздел не забыли наполнить.
 */
export function HouseDocsAndBuild({ house, detail }: HouseDocsProps) {
  const docs = buildDocuments(detail);
  const stages = detail.constructionStages ?? [];
  const hasRealStages = stages.length > 0;

  return (
    <section className="hp-section" id="construction">
      <div className="hp-docs-grid">
        <div>
          <h2 className="hp-h2">Как строился этот дом</h2>
          <p className="hp-lead">
            {hasRealStages
              ? "Реальные этапы строительства этого объекта."
              : "Сюда добавим фото стройки именно этого дома. Пока зафиксированы этапы, которые нужно закрыть кадрами."}
          </p>

          {hasRealStages ? (
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
          ) : (
            <ul className="hp-build-stages">
              {PLANNED_STAGES.map((stage, index) => (
                <li
                  key={stage.title}
                  className="hp-build-stage is-placeholder"
                >
                  <div className="hp-build-placeholder" aria-hidden>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3>{stage.title}</h3>
                    <p>{stage.caption}</p>
                    <span className="hp-build-badge">Фото скоро</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="hp-h2">Документы по дому</h2>
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
