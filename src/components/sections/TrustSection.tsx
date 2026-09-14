"use client";

import { aboutCompanyData } from "@/data/homepage";
import { realHouses } from "@/data/houses";
import { HouseImage } from "@/components/ui/HouseImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const tabs = [
  { id: "built", label: "Построенные дома" },
  { id: "about", label: "О компании" },
  { id: "documents", label: "Документы" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function TrustSection() {
  const [activeTab, setActiveTab] = useState<TabId>("built");
  const builtHouses = realHouses.slice(0, 3);
  const steps = [
    { step: "01", title: "Выбор дома", description: "Подберите дом в каталоге или с помощью менеджера" },
    { step: "02", title: "Просмотр", description: "Организуем показ дома и участка в удобное время" },
    { step: "03", title: "Сделка", description: "Поможем с ипотекой и оформим документы" },
    { step: "04", title: "Передача ключей", description: "Получите ключи после завершения строительства и оформления" },
  ];

  return (
    <section id="company" className="bg-surface py-8 md:py-12">
      <div className="container-main">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="section-title">За каждым домом — наша работа</h2>
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="О компании"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "chip shrink-0",
                  activeTab === tab.id && "chip-active"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8" role="tabpanel">
          {activeTab === "built" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {builtHouses.map((house) => (
                <Link
                  key={house.id}
                  href={`/catalog/${house.id}`}
                  className="group overflow-hidden rounded-image"
                >
                  <div className="relative h-40 overflow-hidden">
                    <HouseImage
                      src={house.image}
                      alt={house.title}
                      fill
                      objectFit="cover"
                      sizes="384px"
                    />
                  </div>
                  <p className="mt-3 text-base font-bold leading-6 text-text group-hover:text-orange">
                    {house.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {house.city}, {house.district}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-image">
                <Image
                  src={aboutCompanyData.image}
                  alt={aboutCompanyData.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <ul className="space-y-3">
                  {aboutCompanyData.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-text"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-orange"
                        strokeWidth={1.75}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {aboutCompanyData.text}
                </p>
                <Button asChild variant="outline" className="mt-5">
                  <Link href={aboutCompanyData.href}>
                    Подробнее
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="rounded-card border border-border p-6">
              <p className="text-base text-text">
                Реквизиты, политика обработки персональных данных и комплект
                локальных актов по 152-ФЗ доступны на странице документов.
              </p>
              <Button asChild className="mt-4">
                <Link href="/documents/">
                  Открыть документы
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className="rounded-panel border border-border bg-page p-4"
            >
              <p className="text-sm font-bold text-orange">{step.step}</p>
              <p className="mt-2 text-base font-bold text-text">{step.title}</p>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
