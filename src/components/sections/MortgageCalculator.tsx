"use client";

import { calcMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMemo, useState } from "react";

function RangeField({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-muted-on-forest">{label}</span>
        <span className="font-semibold text-white tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-orange"
      />
    </div>
  );
}

export function MortgageCalculator() {
  const [price, setPrice] = useState(7_000_000);
  const [downPayment, setDownPayment] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(12.5);

  const result = useMemo(
    () => calcMortgage(price, downPayment, years, rate),
    [price, downPayment, years, rate]
  );

  const monthlyDisplay = formatPrice(Math.round(result.monthly));

  return (
    <section id="mortgage" className="bg-page py-8 md:py-12">
      <div className="container-main">
        <div className="min-h-[336px] rounded-card bg-forest p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_384px] lg:gap-12">
            <div>
              <h3 className="text-[28px] font-bold leading-9 text-white">
                Рассчитайте комфортный платёж
              </h3>
              <p className="mt-2 text-base text-muted-on-forest">
                Пример расчёта — не предложение банка
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6">
                <RangeField
                  label="Стоимость дома"
                  value={price}
                  display={formatPrice(price)}
                  min={3_000_000}
                  max={15_000_000}
                  step={100_000}
                  onChange={setPrice}
                />
                <RangeField
                  label="Первоначальный взнос"
                  value={downPayment}
                  display={`${downPayment}%`}
                  min={0}
                  max={50}
                  step={5}
                  onChange={setDownPayment}
                />
                <RangeField
                  label="Срок"
                  value={years}
                  display={`${years} лет`}
                  min={5}
                  max={30}
                  step={1}
                  onChange={setYears}
                />
                <RangeField
                  label="Расчётная годовая ставка"
                  value={rate}
                  display={`${rate}%`}
                  min={0}
                  max={20}
                  step={0.5}
                  onChange={setRate}
                />
              </div>
            </div>

            <div className="flex flex-col rounded-panel bg-surface p-6">
              <p className="text-sm text-muted">Ежемесячный платёж</p>
              <p className="mt-1 text-[40px] font-extrabold leading-[48px] tabular-nums text-text">
                {monthlyDisplay}
                <span className="text-lg font-bold">/мес.</span>
              </p>
              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-muted">
                <div className="flex justify-between">
                  <span>Сумма кредита</span>
                  <span className="font-semibold tabular-nums text-text">
                    {formatPrice(Math.round(result.loan))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Первоначальный взнос</span>
                  <span className="font-semibold tabular-nums text-text">
                    {formatPrice(Math.round(result.downPayment))}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted">
                Пример расчёта, не предложение банка
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/#viewing">Подобрать дома</Link>
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          <Link href="/blog/ipoteka/" className="underline hover:text-text">
            Способы покупки и ипотека
          </Link>
        </p>
      </div>
    </section>
  );
}
