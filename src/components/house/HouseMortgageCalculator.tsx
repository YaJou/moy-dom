"use client";

import { calcMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import { Calculator } from "lucide-react";
import { useMemo, useState } from "react";

interface HouseMortgageCalculatorProps {
  house: House;
}

export function HouseMortgageCalculator({ house }: HouseMortgageCalculatorProps) {
  const [downPayment, setDownPayment] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(12.5);

  const result = useMemo(
    () => calcMortgage(house.price, downPayment, years, rate),
    [house.price, downPayment, years, rate]
  );

  return (
    <div className="min-w-0 rounded-card border border-border bg-background p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-dark sm:text-xl">
            Ипотека на этот дом
          </h2>
          <p className="text-sm text-gray">
            Стоимость: {formatPrice(house.price)}
            {house.specs.familyMortgage && " · подходит семейная ипотека"}
          </p>
        </div>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <div className="min-w-0 overflow-hidden">
            <label className="mb-1.5 flex justify-between text-sm font-medium text-dark">
              <span>Первоначальный взнос</span>
              <span className="text-primary">{downPayment}%</span>
            </label>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full max-w-full accent-primary"
            />
          </div>
          <div className="min-w-0 overflow-hidden">
            <label className="mb-1.5 flex justify-between text-sm font-medium text-dark">
              <span>Срок</span>
              <span className="text-primary">{years} лет</span>
            </label>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full max-w-full accent-primary"
            />
          </div>
          <div className="min-w-0 overflow-hidden">
            <label className="mb-1.5 flex justify-between text-sm font-medium text-dark">
              <span>Ставка</span>
              <span className="text-primary">{rate}%</span>
            </label>
            <input
              type="range"
              min={8}
              max={20}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full max-w-full accent-primary"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center rounded-xl bg-primary p-5 text-white">
          <p className="text-sm text-white/80">Ежемесячный платёж</p>
          <p className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            {formatPrice(Math.round(result.monthly))}
          </p>
          <div className="mt-4 space-y-2 border-t border-white/20 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-white/80">Первый взнос</span>
              <span>{formatPrice(Math.round(result.downPayment))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Сумма кредита</span>
              <span>{formatPrice(Math.round(result.loan))}</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-white/60">
            * Расчёт ориентировочный. Поможем с одобрением в банках-партнёрах.
          </p>
        </div>
      </div>
    </div>
  );
}
