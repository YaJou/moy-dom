import type { HouseDetailContent } from "@/data/house-detail";
import { getCityCatalogHref } from "@/lib/catalog-urls";
import type { House } from "@/types/house";
import Link from "next/link";

interface HouseSeoContentProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseSeoContent({ house, detail }: HouseSeoContentProps) {
  return (
    <section className="mt-10 border-t border-border pt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">
        {house.title} — подробное описание
      </h2>
      <div className="prose prose-sm mt-5 max-w-none space-y-4 text-gray sm:text-base">
        {detail.seoParagraphs.map((p) => (
          <p key={p.slice(0, 50)} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href={getCityCatalogHref(house.city)} className="text-sm text-primary hover:underline">
          Дома в {house.city}
        </Link>
        <span className="text-gray">·</span>
        <Link href="/catalog/one-story" className="text-sm text-primary hover:underline">
          Одноэтажные дома
        </Link>
        <span className="text-gray">·</span>
        <Link href="/#mortgage" className="text-sm text-primary hover:underline">
          Калькулятор ипотеки
        </Link>
        <span className="text-gray">·</span>
        <Link href="/blog" className="text-sm text-primary hover:underline">
          Статьи о строительстве
        </Link>
      </div>
    </section>
  );
}
