import type { HouseDetailContent } from "@/data/house-detail";

interface HouseAudienceProps {
  detail: HouseDetailContent;
}

export function HouseAudience({ detail }: HouseAudienceProps) {
  if (!detail.targetAudience.length) return null;

  return (
    <section className="hp-section" id="audience">
      <h2 className="hp-h2">Кому подойдёт этот дом</h2>
      <p className="hp-lead">
        Для кого планировка и формат участка работают лучше всего.
      </p>
      <div className="hp-audience-grid">
        {detail.targetAudience.map((card) => (
          <div key={card.title} className="hp-audience-card">
            <h3 className="hp-audience-title">{card.title}</h3>
            <p className="hp-audience-text">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
