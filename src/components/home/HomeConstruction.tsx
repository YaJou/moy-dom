"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const stages = [
  {
    id: "foundation",
    tab: "Фундамент и стены",
    title: "Надёжный фундамент из железобетона",
    image: "/images/design-kit/09-foundation.png",
    alt: "Фундамент из железобетона",
  },
  {
    id: "walls",
    tab: "Утепление и кровля",
    title: "Качественная кладка стен из кирпича",
    image: "/images/design-kit/10-brickwork.png",
    alt: "Кладка стен из кирпича",
  },
  {
    id: "systems",
    tab: "Инженерные системы",
    title: "Установленные тёплые полы",
    image: "/images/design-kit/11-underfloor-heating.png",
    alt: "Тёплые полы на объекте",
  },
] as const;

export function HomeConstruction() {
  const [activeId, setActiveId] = useState<(typeof stages)[number]["id"]>(
    "foundation"
  );

  return (
    <section id="construction" className="construction-section">
      <div className="container-main">
        <div className="construction-grid">
          <div className="construction-side">
            <h2 className="h2-desktop font-extrabold text-text">
              Качество видно ещё до отделки
            </h2>
            <p className="construction-desc">
              Показываем материалы и этапы строительства наших домов
            </p>

            <ul className="construction-tabs" role="tablist">
              {stages.map((stage) => (
                <li key={stage.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeId === stage.id}
                    onClick={() => setActiveId(stage.id)}
                    className={cn(
                      "construction-tab",
                      activeId === stage.id && "is-active"
                    )}
                  >
                    <span className="construction-tab-chevron" aria-hidden>
                      ›
                    </span>
                    {stage.tab}
                  </button>
                </li>
              ))}
            </ul>

            <Link href="/built/" className="construction-link">
              Как мы строим ↗
            </Link>
          </div>

          <div className="construction-gallery">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className={cn(
                  "construction-card",
                  activeId === stage.id && "is-active"
                )}
              >
                <button
                  type="button"
                  className="construction-card-btn"
                  onClick={() => setActiveId(stage.id)}
                  aria-label={stage.title}
                >
                  <span className="construction-card-photo">
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 280px"
                    />
                  </span>
                  <span className="construction-card-caption">
                    {stage.title}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
