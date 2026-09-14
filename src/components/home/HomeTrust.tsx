"use client";

import { aboutCompanyData } from "@/data/homepage";
import { homePurchaseSteps } from "@/data/home-nav";
import { galleryData } from "@/data/site";
import { realHouses } from "@/data/houses";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconArrow } from "./icons";

const tabs = [
  { id: "built", label: "Построенные дома" },
  { id: "about", label: "О компании" },
  { id: "documents", label: "Документы" },
] as const;

export function HomeTrust() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("built");

  const builtItems = galleryData.slice(0, 3).map((g, i) => ({
    ...g,
    house: realHouses[i],
  }));

  return (
    <section id="company" className="trust-section">
      <div className="container-main">
        <div className="trust-header">
          <h2 className="h2-desktop font-extrabold text-text">
            За каждым домом — наша работа
          </h2>
          <div
            className="trust-tabs"
            role="tablist"
            aria-label="Разделы о компании"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "trust-tab",
                  tab === t.id && "is-active"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8" role="tabpanel">
          {tab === "built" && (
            <div className="trust-gallery">
              {builtItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.house ? `/catalog/${item.house.id}` : "/built/"}
                  className="trust-card group"
                >
                  <div className="trust-card-photo">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 384px"
                    />
                  </div>
                  <p className="trust-card-title">Построенный дом</p>
                  <p className="trust-card-caption">
                    Фото и этапы строительства
                  </p>
                </Link>
              ))}
            </div>
          )}

          {tab === "about" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden rounded-image sm:min-h-[360px]">
                <Image
                  src={aboutCompanyData.image}
                  alt="О компании Кров-Сервис"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-base leading-[25px] font-medium text-text">
                  {aboutCompanyData.text}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {aboutCompanyData.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-orange">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={aboutCompanyData.href}
                  className="mt-6 inline-flex items-center gap-1 font-bold text-orange"
                >
                  Подробнее о компании
                  <IconArrow className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {tab === "documents" && (
            <div className="rounded-panel border border-border bg-page p-6">
              <p className="text-base font-medium text-text">
                Реквизиты, политика обработки персональных данных и документы
                компании доступны на отдельной странице.
              </p>
              <Link href="/documents/" className="btn-primary mt-4 inline-flex">
                Открыть документы
                <IconArrow />
              </Link>
            </div>
          )}
        </div>

        <div className="trust-footer">
          <Link href="/about/" className="trust-footer-link">
            Истории объектов, команда и документы компании →
          </Link>
          <div className="trust-steps">
            {homePurchaseSteps.map((step, i) => (
              <div key={step.step} className="trust-step">
                {i > 0 && (
                  <span className="trust-step-sep" aria-hidden>
                    →
                  </span>
                )}
                <span className="trust-step-num">{step.step}</span>
                <span className="trust-step-title">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
