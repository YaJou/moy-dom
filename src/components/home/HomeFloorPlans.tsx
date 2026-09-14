"use client";

import { getHouseDetail } from "@/data/house-detail";
import {
  getFloorPlanImage,
  getHousesWithFloorPlans,
} from "@/lib/floor-plan";
import { analytics } from "@/lib/analytics";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconArrow } from "./icons";
import { useViewingModal } from "./ViewingModalProvider";

const planHouses = getHousesWithFloorPlans();

export function HomeFloorPlans() {
  const [selectedId, setSelectedId] = useState(planHouses[0]?.id ?? 0);
  const { openViewing } = useViewingModal();
  const house = planHouses.find((h) => h.id === selectedId) ?? planHouses[0];
  const detail = house ? getHouseDetail(house) : null;
  const planImage = house ? getFloorPlanImage(house.id) : null;

  if (planHouses.length === 0 || !house) {
    return (
      <section className="bg-page py-12">
        <div className="container-main">
          <h2 className="h2-desktop text-text">
            Дом начинается с удобной планировки
          </h2>
          <p className="mt-3 text-base text-muted">
            Посмотрите, как организовано пространство
          </p>
          <div className="mt-8 rounded-card border border-border bg-surface p-8 text-center">
            <p className="text-muted">
              Планировку можно запросить у менеджера
            </p>
            <button
              type="button"
              className="btn-primary mt-4"
              onClick={() => openViewing()}
            >
              Запросить планировку
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-page py-12">
      <div className="container-main">
        <h2 className="h2-desktop text-text">
          Дом начинается с удобной планировки
        </h2>
        <p className="mt-3 text-base text-muted">
          Посмотрите, как организовано пространство
        </p>

        <div className="mt-8 rounded-card border border-border bg-surface p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap gap-2">
            {planHouses.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => {
                  setSelectedId(h.id);
                  analytics.planOpen(h.id);
                }}
                className={
                  selectedId === h.id ? "chip-active" : "chip-inactive"
                }
              >
                {h.area} м² · {h.city}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
            <div>
              {planImage ? (
                <div className="relative h-[280px] w-full sm:h-[360px]">
                  <Image
                    src={planImage}
                    alt={`Планировка — ${house.title}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 664px"
                  />
                </div>
              ) : (
                <div className="flex h-[280px] items-center justify-center rounded-image border border-dashed border-border bg-page p-6 text-center sm:h-[360px]">
                  <div>
                    <p className="text-base font-medium text-text">
                      Планировку можно запросить у менеджера
                    </p>
                    <button
                      type="button"
                      className="btn-primary mt-4"
                      onClick={() =>
                        openViewing({
                          houseId: house.id,
                          houseUrl: `/catalog/${house.id}`,
                          city: house.city,
                        })
                      }
                    >
                      Запросить планировку
                    </button>
                  </div>
                </div>
              )}
              <p className="mt-4 text-sm text-muted">
                {house.title}{" "}
                <Link
                  href={`/catalog/${house.id}`}
                  className="font-semibold text-text hover:text-orange"
                >
                  Открыть в полном размере →
                </Link>
              </p>
            </div>

            <div>
              <h3 className="h3-panel text-text">Место для всей семьи</h3>
              {detail?.floorPlanRooms && (
                <ul className="mt-4 space-y-4">
                  {detail.floorPlanRooms.slice(0, 4).map((room) => (
                    <li key={room.name}>
                      <p className="font-semibold text-text">{room.name}</p>
                      <p className="text-sm text-muted">{room.description}</p>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={`/catalog/${house.id}`}
                className="btn-primary mt-6 inline-flex"
              >
                Открыть дом
                <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
