"use client";

import { HomeHouseCard } from "@/components/home/HomeHouseCard";
import { realHouses } from "@/data/houses";
import { getSimilarDiff } from "@/lib/house-page";
import type { House } from "@/types/house";
import Link from "next/link";
import { useMemo } from "react";

interface SimilarHousesProps {
  house: House;
}

export function SimilarHouses({ house }: SimilarHousesProps) {
  const similar = useMemo(() => {
    return realHouses
      .filter((h) => h.id !== house.id)
      .map((h) => ({
        house: h,
        diff: getSimilarDiff(house, h),
        score:
          (h.city === house.city ? 2 : 0) +
          (Math.abs(h.area - house.area) <= 30 ? 2 : 0) +
          (Math.abs(h.price - house.price) < 1_500_000 ? 1 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [house]);

  if (!similar.length) return null;

  return (
    <section className="hp-section" id="similar">
      <div className="hp-similar-head">
        <h2 className="hp-h2">Похожие дома</h2>
        <Link href="/catalog" className="hp-link">
          Все дома →
        </Link>
      </div>
      <div className="hp-similar-grid">
        {similar.map(({ house: h, diff }) => (
          <div key={h.id} className="hp-similar-item">
            {diff ? <span className="hp-similar-diff">{diff}</span> : null}
            <HomeHouseCard house={h} />
          </div>
        ))}
      </div>
    </section>
  );
}
