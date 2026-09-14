"use client";

import { HouseImage } from "@/components/ui/HouseImage";
import { Icon } from "@/components/ui/Icon";
import type { HouseDetailContent } from "@/data/house-detail";
import type { House } from "@/types/house";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface HouseFloorPlanProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseFloorPlan({ house, detail }: HouseFloorPlanProps) {
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  if (!detail.floorPlanImage || !detail.floorPlanRooms.length) return null;

  return (
    <>
      <section className="hp-section" id="floorplan">
        <h2 className="hp-h2">Планировка</h2>
        <p className="hp-lead">
          Настоящий план этого дома с помещениями и площадями.
        </p>

        <div className="hp-plan-grid">
          <div className="hp-plan-visual">
            <button
              type="button"
              className="hp-plan-image"
              onClick={() => setLightbox(true)}
              aria-label="Увеличить планировку"
            >
              <HouseImage
                src={detail.floorPlanImage}
                alt={`Планировка — ${house.title}`}
                fill
                objectFit="contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </button>
            <button
              type="button"
              className="hp-plan-zoom"
              onClick={() => setLightbox(true)}
            >
              <Icon name="maximize" className="h-5 w-5" />
              Увеличить планировку
            </button>
          </div>

          <div className="hp-plan-side">
            {detail.floorPlanNote ? (
              <p className="hp-plan-note">{detail.floorPlanNote}</p>
            ) : null}
            <ul className="hp-plan-rooms">
              {detail.floorPlanRooms.map((room) => (
                <li key={`${room.name}-${room.description}`}>
                  <span>{room.name}</span>
                  <span>{room.description}</span>
                </li>
              ))}
            </ul>
            {house.specs.floors > 1 ? (
              <p className="hp-plan-floors">Этажей: {house.specs.floors}</p>
            ) : (
              <p className="hp-plan-floors">Одноэтажный дом — без лестниц</p>
            )}
          </div>
        </div>
      </section>

      {mounted &&
        lightbox &&
        createPortal(
          <div
            className="hp-lightbox"
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Планировка"
          >
            <button
              type="button"
              className="hp-lightbox-close"
              onClick={() => setLightbox(false)}
            >
              <Icon name="close" className="h-5 w-5" />
              Закрыть
            </button>
            <div
              className="hp-lightbox-frame is-plan"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  className="absolute inset-4 sm:inset-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <HouseImage
                    src={detail.floorPlanImage}
                    alt={`Планировка — ${house.title}`}
                    fill
                    objectFit="contain"
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
