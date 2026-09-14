"use client";

import { HouseImage } from "@/components/ui/HouseImage";
import type { HouseDetailContent } from "@/data/house-detail";
import {
  buildCompletenessTabs,
  buildRemainingWork,
} from "@/lib/house-page";
import { cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { useMemo, useState } from "react";

interface HouseCompletenessProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseCompleteness({ house, detail }: HouseCompletenessProps) {
  const tabs = useMemo(
    () => buildCompletenessTabs(house, detail),
    [house, detail]
  );
  const remaining = useMemo(
    () => buildRemainingWork(house, detail),
    [house, detail]
  );
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "structure");
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  if (!tabs.length) return null;

  return (
    <section className="hp-section" id="completeness">
      <h2 className="hp-h2">Комплектация и состояние</h2>
      <p className="hp-lead">
        Что уже сделано в доме и на участке — по данным этого объекта.
      </p>

      <div className="hp-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === active?.id}
            className={cn("hp-tab", tab.id === active?.id && "is-active")}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active ? (
        <div className="hp-complete-grid">
          {active.image ? (
            <div className="hp-complete-photo">
              <HouseImage
                src={active.image}
                alt={`${active.label} — ${house.title}`}
                fill
                objectFit="contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : null}
          <dl className="hp-complete-rows">
            {active.rows.map((row) => (
              <div key={row.label} className="hp-complete-row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {remaining.length ? (
        <div className="hp-remaining">
          <h3 className="hp-remaining-title">Что остаётся сделать до переезда</h3>
          <ul>
            {remaining.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
