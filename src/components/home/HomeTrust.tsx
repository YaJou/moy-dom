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
    <section id="company" className="bg-surface py-8">
      <div className="container-main">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="h2-desktop text-text">
            За каждым домом — наша работа
          </h2>
          <div
            className="flex gap-2 overflow-x-auto pb-1"
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
                className={cn(tab === t.id ? "chip-active" : "chip-inactive")}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8" role="tabpanel">
          {tab === "built" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {builtItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.house ? `/catalog/${item.house.id}` : "/built/"}
                  className="group overflow-hidden rounded-image"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="384px"
                    />
                  </div>
                  <p className="mt-3 text-base font-bold text-text">
                    Построенный дом
                  </p>
                  <p className="text-sm text-muted">
                    Фото и этапы строительства
                  </p>
                </Link>
              ))}
            </div>
          )}

          {tab === "about" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="relative h-56 overflow-hidden rounded-image sm:h-72">
                <Image
                  src={aboutCompanyData.image}
                  alt="О компании Кров-Сервис"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-base leading-[25px] text-text">
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
                  className="mt-6 inline-flex items-center gap-1 font-semibold text-orange"
                >
                  Подробнее о компании
                  <IconArrow className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {tab === "documents" && (
            <div className="rounded-panel border border-border bg-page p-6">
              <p className="text-base text-text">
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

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {homePurchaseSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-panel border border-border bg-page p-4"
            >
              <p className="text-sm font-bold text-orange">{step.step}</p>
              <p className="mt-1 font-bold text-text">{step.title}</p>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>

        <Link
          href="/about/"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-text"
        >
          Истории объектов, команда и документы компании
          <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
