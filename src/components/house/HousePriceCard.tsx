"use client";

import { useViewingModal } from "@/components/home/ViewingModalProvider";
import { IconPhone } from "@/components/home/icons";
import { siteConfig } from "@/data/site";
import {
  getReadinessLabel,
  priceIncludesSummary,
} from "@/lib/house-page";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import Link from "next/link";

interface HousePriceCardProps {
  house: House;
}

export function HousePriceCard({ house }: HousePriceCardProps) {
  const { openViewing } = useViewingModal();
  const params = [
    { label: "Дом", value: `${house.area} м²` },
    { label: "Участок", value: `${house.land} сот.` },
    {
      label: "Этажность",
      value: house.specs.floors === 1 ? "1 этаж" : `${house.specs.floors} этажа`,
    },
    {
      label: "Комнаты",
      value: `${house.rooms} · ${house.specs.bathroom}`,
    },
  ];

  return (
    <div className="hp-price-card">
      <p className="hp-price-value">{formatPrice(house.price)}</p>
      <p className="hp-price-includes">{priceIncludesSummary(house)}</p>

      <dl className="hp-price-params">
        {params.map((item) => (
          <div key={item.label} className="hp-price-param">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="hp-price-status">
        <span className="hp-price-status-pill">{getReadinessLabel(house)}</span>
        <p>
          Отделка: {house.specs.repair}. {house.specs.water},{" "}
          {house.specs.sewage}. Газ: {house.specs.gas}.
        </p>
      </div>

      <div className="hp-price-actions">
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
          Записаться на просмотр
        </button>
        <button
          type="button"
          className="hp-btn-secondary"
          onClick={() =>
            openViewing({
              houseId: house.id,
              houseUrl: `/catalog/${house.id}`,
              city: house.city,
            })
          }
        >
          Задать вопрос об этом доме
        </button>
      </div>

      <a
        href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
        className="hp-price-manager"
      >
        <span className="hp-price-manager-icon">
          <IconPhone className="h-4 w-4" />
        </span>
        <span>
          <span className="hp-price-manager-label">Менеджер по объекту</span>
          <span className="hp-price-manager-phone">{siteConfig.phone}</span>
        </span>
      </a>

      <p className="hp-price-builder">Застройщик: {house.builder}</p>
    </div>
  );
}

export function HouseMobileAsk({ house }: { house: House }) {
  const { openViewing } = useViewingModal();
  return (
    <div className="hp-mobile-ask lg:hidden">
      <p className="hp-price-value">{formatPrice(house.price)}</p>
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
        Записаться на просмотр
      </button>
      <Link href={`tel:${siteConfig.phone.replace(/\D/g, "")}`} className="hp-link">
        {siteConfig.phone}
      </Link>
    </div>
  );
}
