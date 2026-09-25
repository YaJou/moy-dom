import type { HouseDetailContent } from "@/data/house-detail";

interface HouseWhyChooseProps {
  detail: HouseDetailContent;
}

export function HouseWhyChoose({ detail }: HouseWhyChooseProps) {
  if (!detail.whyChoose.length) return null;

  return (
    <section className="hp-section" id="why-choose">
      <h2 className="hp-h2">Почему стоит выбрать именно этот дом</h2>
      <p className="hp-lead">
        Главные аргументы объекта — без повторения цены из карточки.
      </p>
      <ul className="hp-why-list">
        {detail.whyChoose.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
