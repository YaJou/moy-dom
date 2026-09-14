"use client";

import { getHouseDetail } from "@/data/house-detail";
import {
  getFloorPlanImage,
  getFloorPlanStats,
  getHousesWithFloorPlans,
} from "@/lib/floor-plan";
import { analytics } from "@/lib/analytics";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { IconArrow, IconBed, IconSofa, IconStorage } from "./icons";
import { useViewingModal } from "./ViewingModalProvider";

const planHouses = getHousesWithFloorPlans();

export function HomeFloorPlans() {
  const [selectedId, setSelectedId] = useState(planHouses[0]?.id ?? 0);
  const { openViewing } = useViewingModal();
  const house = planHouses.find((h) => h.id === selectedId) ?? planHouses[0];
  const detail = house ? getHouseDetail(house) : null;
  const planImage = house ? getFloorPlanImage(house.id) : null;
  const stats = useMemo(
    () => (house ? getFloorPlanStats(house) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedId]
  );

  if (planHouses.length === 0 || !house) {
    return (
      <section className="floorplans-section">
        <div className="container-main">
          <h2 className="h2-desktop font-extrabold text-text">
            Дом начинается с удобной планировки
          </h2>
          <p className="mt-3 text-base text-muted">
            Посмотрите, как организовано пространство
          </p>
          <div className="floorplans-panel mt-8 text-center">
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

  const featureCards = [
    stats?.bedrooms
      ? {
          icon: <IconBed className="h-5 w-5" />,
          label: `${stats.bedrooms} Спальни`,
        }
      : null,
    stats?.kitchen
      ? {
          icon: <IconSofa className="h-5 w-5" />,
          label: `Кухня-гостиная · ${stats.kitchen}`,
        }
      : null,
    stats?.storage
      ? {
          icon: <IconStorage className="h-5 w-5" />,
          label: stats.storage,
        }
      : house.rooms
        ? {
            icon: <IconStorage className="h-5 w-5" />,
            label: `${house.rooms} комнаты · ${house.area} м²`,
          }
        : null,
  ].filter(Boolean) as { icon: ReactNode; label: string }[];

  return (
    <section className="floorplans-section">
      <div className="container-main">
        <h2 className="h2-desktop font-extrabold text-text">
          Дом начинается с удобной планировки
        </h2>
        <p className="mt-3 text-base text-muted">
          Посмотрите, как организовано пространство
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {planHouses.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => {
                setSelectedId(h.id);
                analytics.planOpen(h.id);
              }}
              className={
                selectedId === h.id
                  ? "catalog-tab catalog-tab-active"
                  : "catalog-tab catalog-tab-inactive"
              }
            >
              {h.area} м² · {h.city}
            </button>
          ))}
        </div>

        <div className="floorplans-panel mt-6">
          <div className="floorplans-grid">
            <div className="floorplans-visual">
              {planImage ? (
                <div className="floorplans-image relative">
                  <Image
                    src={planImage}
                    alt={`Планировка — ${house.title}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 664px"
                  />
                </div>
              ) : (
                <div className="floorplans-empty">
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
              )}
              <p className="floorplans-caption">
                Пример расположения помещений
                {detail?.floorPlanRooms?.length ? (
                  <>
                    {" · "}
                    <Link
                      href={`/catalog/${house.id}`}
                      className="font-semibold text-text hover:text-orange"
                    >
                      Открыть в полном размере →
                    </Link>
                  </>
                ) : null}
              </p>
            </div>

            <div className="floorplans-side">
              <h3 className="floorplans-side-title">Место для всей семьи</h3>

              {featureCards.length > 0 && (
                <div className="floorplans-features">
                  {featureCards.map((card) => (
                    <div key={card.label} className="floorplans-feature">
                      <span className="floorplans-feature-icon">{card.icon}</span>
                      <span className="floorplans-feature-label">
                        {card.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <p className="floorplans-desc">
                Выберите дом, чтобы увидеть реальную планировку, состав
                помещений и площадь комнат по объекту.
              </p>

              <Link
                href={`/catalog/${house.id}`}
                className="floorplans-cta"
              >
                Выбрать планировку
                <IconArrow className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
