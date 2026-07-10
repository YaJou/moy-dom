"use client";

import { calcMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function MortgageCalculator() {
  const [price, setPrice] = useState(7000000);
  const [downPayment, setDownPayment] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(12.5);

  const result = useMemo(
    () => calcMortgage(price, downPayment, years, rate),
    [price, downPayment, years, rate]
  );

  return (
    <section id="mortgage" className="section-padding bg-background">
      <div className="container-main">
        <div className="mb-8 flex items-center gap-3 sm:mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="section-title">Калькулятор ипотеки</h2>
            <p className="mt-1 text-sm text-gray">
              Рассчитайте ежемесячный платёж за 30 секунд
            </p>
          </div>
        </div>

        <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="min-w-0 rounded-card bg-white p-5 shadow-card sm:p-6 lg:p-8">
            <div className="space-y-5">
              <div className="min-w-0 overflow-hidden">
                <label className="mb-2 flex flex-wrap justify-between gap-x-2 gap-y-1 text-sm font-medium text-dark">
                  <span>Стоимость дома</span>
                  <span className="shrink-0 text-primary">{formatPrice(price)}</span>
                </label>
                <input
                  type="range"
                  min={3000000}
                  max={15000000}
                  step={100000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full max-w-full accent-primary"
                />
              </div>
              <div className="min-w-0 overflow-hidden">
                <label className="mb-2 flex justify-between text-sm font-medium text-dark">
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
                <label className="mb-2 flex justify-between text-sm font-medium text-dark">
                  <span>Срок кредита</span>
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
                <label className="mb-2 flex justify-between text-sm font-medium text-dark">
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
          </div>

          <div className="flex min-w-0 flex-col justify-center rounded-card bg-primary p-6 text-white sm:p-8">
            <p className="text-sm text-white/80">Ежемесячный платёж</p>
            <p className="mt-1 text-2xl font-bold sm:text-4xl lg:text-5xl">
              {formatPrice(Math.round(result.monthly))}
            </p>
            <div className="mt-6 space-y-3 border-t border-white/20 pt-6 text-sm">
              <div className="flex justify-between">
                <span className="text-white/80">Первый взнос</span>
                <span className="font-semibold">{formatPrice(Math.round(result.downPayment))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Сумма кредита</span>
                <span className="font-semibold">{formatPrice(Math.round(result.loan))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Общая выплата</span>
                <span className="font-semibold">{formatPrice(Math.round(result.total))}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/60">
              * Расчёт приблизительный. Точные условия уточняйте у менеджера.
            </p>
            <Button
              asChild
              className="mt-5 h-auto min-h-12 w-full whitespace-normal rounded-xl bg-white py-3 text-center text-primary hover:bg-white/90"
            >
              <Link href={`#consultation`}>
                Получить подборку домов под этот платёж
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
