import type { HouseDetailContent } from "@/data/house-detail";
import { getCityCatalogHref } from "@/lib/catalog-urls";
import type { House } from "@/types/house";
import Link from "next/link";

interface HouseSeoContentProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseSeoContent({ house, detail }: HouseSeoContentProps) {
  if (!detail.seoParagraphs.length) return null;

  return (
    <section className="hp-section" id="seo">
      <h2 className="hp-h2">
        {house.title} — кратко для поиска
      </h2>
      <div className="hp-seo-copy">
        {detail.seoParagraphs.map((p) => (
          <p key={p.slice(0, 50)}>{p}</p>
        ))}
      </div>
      <div className="hp-seo-links">
        <Link href={getCityCatalogHref(house.city)}>Дома в {house.city}</Link>
        <Link href="/catalog/one-story">Одноэтажные дома</Link>
        <Link href="/#mortgage">Калькулятор ипотеки</Link>
        <Link href="/blog">Статьи о строительстве</Link>
      </div>
    </section>
  );
}
