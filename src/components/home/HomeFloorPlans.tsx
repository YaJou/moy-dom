"use client";

import { getHouseDetail } from "@/data/house-detail";
import {
  getFloorPlanImage,
  getFloorPlanStats,
  getHousesWithFloorPlans,
} from "@/lib/floor-plan";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Icon,
  IconArrow,
  IconBed,
  IconClose,
  IconMaximize,
  IconSofa,
} from "./icons";
import { useViewingModal } from "./ViewingModalProvider";

const planHouses = getHousesWithFloorPlans();

export function HomeFloorPlans() {
  const [selectedId, setSelectedId] = useState(planHouses[0]?.id ?? 0);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { openViewing } = useViewingModal();
  const house = planHouses.find((h) => h.id === selectedId) ?? planHouses[0];
  const detail = house ? getHouseDetail(house) : null;
  const planImage = house ? getFloorPlanImage(house.id) : null;
  const stats = useMemo(
    () => (house ? getFloorPlanStats(house) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedId]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

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

  const bedroomWord =
    stats?.bedrooms === 1
      ? "спальня"
      : stats?.bedrooms && stats.bedrooms < 5
        ? "спальни"
        : "спален";
  const bathroomWord =
    stats?.bathrooms === 1
      ? "санузел"
      : stats?.bathrooms && stats.bathrooms < 5
        ? "санузла"
        : "санузлов";

  const params = [
    stats?.bedrooms
      ? {
          icon: <IconBed className="h-5 w-5" />,
          label: "Спальни",
          value: `${stats.bedrooms} ${bedroomWord}`,
        }
      : null,
    stats?.kitchenArea
      ? {
          icon: <IconSofa className="h-5 w-5" />,
          label: "Кухня-гостиная",
          value: stats.kitchenArea,
        }
      : null,
    stats?.bathrooms
      ? {
          icon: <Icon name="bath" className="h-5 w-5" />,
          label: "Санузлы",
          value: `${stats.bathrooms} ${bathroomWord}`,
        }
      : null,
  ].filter(Boolean) as {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];

  return (
    <>
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
                  <div className="floorplans-image-wrap">
                    <button
                      type="button"
                      className="floorplans-image"
                      onClick={() => setLightbox(true)}
                      aria-label="Увеличить планировку"
                    >
                      <Image
                        src={planImage}
                        alt={`Планировка — ${house.title}`}
                        fill
                        className="floorplans-image-img"
                        sizes="(max-width: 1024px) 100vw, 720px"
                      />
                    </button>
                    <button
                      type="button"
                      className="floorplans-zoom"
                      onClick={() => setLightbox(true)}
                    >
                      <IconMaximize className="h-5 w-5" />
                      Увеличить
                    </button>
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
              </div>

              <div className="floorplans-side">
                <p className="floorplans-side-kicker">
                  {house.area} м² · {house.city}
                </p>
                <h3 className="floorplans-side-title">{house.title}</h3>
                <p className="floorplans-side-price">
                  {formatPrice(house.price)}
                </p>

                {params.length > 0 ? (
                  <ul className="floorplans-params">
                    {params.map((item) => (
                      <li key={item.label} className="floorplans-param">
                        <span className="floorplans-param-icon">{item.icon}</span>
                        <span className="floorplans-param-text">
                          <span className="floorplans-param-label">
                            {item.label}
                          </span>
                          <span className="floorplans-param-value">
                            {item.value}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {detail?.floorPlanRooms?.length ? (
                  <ul className="floorplans-rooms">
                    {detail.floorPlanRooms.map((room) => (
                      <li key={`${room.name}-${room.description}`}>
                        <span>{room.name}</span>
                        {room.description ? (
                          <span>{room.description}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="floorplans-side-actions">
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
        </div>
      </section>

      {mounted &&
        lightbox &&
        planImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Планировка"
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:right-5 sm:top-5"
              aria-label="Закрыть"
            >
              <IconClose className="h-5 w-5 text-white" />
              Закрыть
            </button>

            <div
              className="relative h-[85vh] w-[min(92vw,1100px)] overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={planImage}
                  className="absolute inset-3 sm:inset-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Image
                    src={planImage}
                    alt={`Планировка — ${house.title}`}
                    fill
                    className="object-contain"
                    sizes="92vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
