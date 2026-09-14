"use client";

import { IconPhone } from "@/components/home/icons";
import { ViewingForm, ViewingFormTelegramLink } from "@/components/home/ViewingForm";
import { siteConfig } from "@/data/site";
import type { House } from "@/types/house";

const MEETING_POINTS = [
  "Покажем дом и участок",
  "Разберём комплектацию на месте",
  "Ответим на вопросы по ипотеке",
] as const;

interface HouseViewingCTAProps {
  house: House;
}

export function HouseViewingCTA({ house }: HouseViewingCTAProps) {
  return (
    <section className="hp-section" id="house-viewing">
      <div className="viewing-panel hp-viewing-panel">
        <div className="viewing-copy">
          <h2 className="viewing-title">Посмотрите этот дом вживую</h2>
          <p className="viewing-subtitle">
            {house.title} уже выбран — договоримся о времени встречи. Короткий
            звонок, без обязательств.
          </p>
          <ul className="viewing-benefits">
            {MEETING_POINTS.map((item) => (
              <li key={item}>
                <span className="text-orange">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="viewing-contacts">
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              className="viewing-phone-cta"
            >
              <span className="viewing-phone-cta-icon">
                <IconPhone className="h-4 w-4" />
              </span>
              <span>
                <span className="viewing-phone-cta-label">Менеджер объекта</span>
                <span className="viewing-phone-cta-number">
                  {siteConfig.phone}
                </span>
              </span>
            </a>
            <ViewingFormTelegramLink />
          </div>
        </div>
        <ViewingForm
          id={`house-viewing-${house.id}`}
          defaultCity={house.city}
          context={{
            houseId: house.id,
            houseUrl: `/catalog/${house.id}`,
            city: house.city,
          }}
        />
      </div>
    </section>
  );
}
