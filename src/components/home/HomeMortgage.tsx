"use client";

import { calcMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useViewingModal } from "./ViewingModalProvider";

function RangeField({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  dark = false,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  dark?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2 text-sm">
        <span className={dark ? "text-muted-on-forest" : "text-muted"}>
          {label}
        </span>
        <span className={`font-semibold tabular-nums ${dark ? "text-white" : "text-text"}`}>
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={dark ? "range-track" : "range-track-light accent-orange"}
      />
    </div>
  );
}

export function HomeMortgage() {
  const [price, setPrice] = useState(7_000_000);
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(12.5);
  const { openViewing } = useViewingModal();

  const result = useMemo(
    () => calcMortgage(price, downPct, years, rate),
    [price, downPct, years, rate]
  );

  const monthlyDisplay = Math.round(result.monthly);

  return (
    <section id="mortgage" className="bg-page py-8">
      <div className="container-main">
        <div className="grid gap-8 rounded-card bg-forest p-6 sm:p-8 lg:grid-cols-[1fr_384px] lg:gap-12">
          <div>
            <h3 className="h3-panel text-white">
              Рассчитайте комфортный платёж
            </h3>
            <p className="mt-2 text-base text-muted-on-forest">
              Пример расчёта — не предложение банка
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-x-6">
              <RangeField
                label="Стоимость дома"
                value={price}
                display={formatPrice(price)}
                min={3_000_000}
                max={12_000_000}
                step={100_000}
                onChange={setPrice}
                dark
              />
              <RangeField
                label="Первый взнос"
                value={downPct}
                display={`${downPct}%`}
                min={10}
                max={70}
                step={5}
                onChange={setDownPct}
                dark
              />
              <RangeField
                label="Срок"
                value={years}
                display={`${years} лет`}
                min={5}
                max={30}
                step={1}
                onChange={setYears}
                dark
              />
              <RangeField
                label="Расчётная ставка"
                value={rate}
                display={`${rate}%`}
                min={6}
                max={20}
                step={0.5}
                onChange={setRate}
                dark
              />
            </div>
          </div>

          <div className="rounded-panel border border-white/20 bg-transparent p-6 text-white">
            <p className="text-sm text-muted-on-forest">Ежемесячный платёж</p>
            <p className="calc-result mt-1 text-white">
              {formatPrice(monthlyDisplay)}
              <span className="text-lg font-bold">/мес.</span>
            </p>
            <div className="mt-4 space-y-2 border-t border-white/15 pt-4 text-sm text-muted-on-forest">
              <div className="flex justify-between">
                <span>Сумма кредита</span>
                <span className="font-semibold text-white tabular-nums">
                  {formatPrice(Math.round(result.loan))}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Первый взнос</span>
                <span className="font-semibold text-white tabular-nums">
                  {formatPrice(Math.round(result.downPayment))}
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-on-forest">
              Пример расчёта, не предложение банка
            </p>
            <button
              type="button"
              className="btn-primary mt-5 w-full"
              onClick={() =>
                openViewing({
                  calculator: JSON.stringify({
                    price,
                    downPct,
                    years,
                    rate,
                    monthly: monthlyDisplay,
                  }),
                })
              }
            >
              Подобрать дома
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-muted">
          <Link href="/blog/ipoteka/" className="font-medium text-text hover:text-orange">
            Способы покупки и условия →
          </Link>
        </p>
      </div>
    </section>
  );
}
