import type { HouseDetailContent } from "@/data/house-detail";
import { buildKeyFeatures } from "@/lib/house-page";
import type { House } from "@/types/house";

interface HouseKeyFeaturesProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseKeyFeatures({ house, detail }: HouseKeyFeaturesProps) {
  const features = buildKeyFeatures(house, detail);
  if (!features.length) return null;

  return (
    <section className="hp-section" id="highlights">
      <h2 className="hp-h2">Главное об этом доме</h2>
      <p className="hp-lead">
        Конкретные особенности планировки и участка — без повторения цены и
        метража из карточки.
      </p>
      <ul className="hp-features">
        {features.map((item) => (
          <li key={item.title} className="hp-feature">
            <h3 className="hp-feature-title">{item.title}</h3>
            <p className="hp-feature-text">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
