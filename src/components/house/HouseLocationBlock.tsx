"use client";

import { useViewingModal } from "@/components/home/ViewingModalProvider";
import type { HouseDetailContent } from "@/data/house-detail";
import type { House } from "@/types/house";
import Link from "next/link";

interface HouseLocationBlockProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseLocationBlock({ house, detail }: HouseLocationBlockProps) {
  const { openViewing } = useViewingModal();
  const mapEmbed = `https://yandex.ru/map-widget/v1/?ll=${house.lng}%2C${house.lat}&z=16&pt=${house.lng}%2C${house.lat}%2Cpm2orgl`;

  return (
    <section className="hp-section" id="location">
      <h2 className="hp-h2">Что вокруг дома</h2>
      <p className="hp-lead">
        Карта, инфраструктура и дорога к объекту — без общих абзацев вместо фактов.
      </p>

      <div className="hp-location-grid">
        <div className="hp-location-map">
          <iframe
            src={mapEmbed}
            title={`Карта — ${house.title}`}
            loading="lazy"
          />
        </div>
        <div className="hp-location-side">
          <ul className="hp-infra-list">
            {detail.infrastructure.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.distance}</strong>
              </li>
            ))}
          </ul>
          <p className="hp-location-road">
            Подъезд: {house.specs.road}. До центра —{" "}
            {house.specs.distanceToCenter}.
          </p>
          <div className="hp-location-actions">
            <Link
              href={house.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hp-btn-secondary"
            >
              Построить маршрут
            </Link>
            <button
              type="button"
              className="hp-btn-primary"
              onClick={() =>
                openViewing({
                  houseId: house.id,
                  houseUrl: `/catalog/${house.id}`,
                  city: house.city,
                })
              }
            >
              Договориться о встрече у дома
            </button>
          </div>
        </div>
      </div>

      <div className="hp-district">
        <h3 className="hp-h3">{detail.district.title}</h3>
        {detail.district.paragraphs.slice(0, 2).map((p) => (
          <p key={p.slice(0, 24)} className="hp-district-p">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
