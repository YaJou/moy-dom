"use client";

import { calcMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useViewingModal } from "./ViewingModalProvider";

function MortgageRange({
  label,
  value,
  display,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="mortgage-field">
      <p className="mortgage-field-label">{label}</p>
      <p className="mortgage-field-value">{display}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mortgage-range"
        style={{
          background: `linear-gradient(to right, var(--orange) 0%, var(--orange) ${pct}%, rgba(255,255,255,0.22) ${pct}%, rgba(255,255,255,0.22) 100%)`,
        }}
        aria-label={label}
      />
      <div className="mortgage-field-bounds">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
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
    <section id="mortgage" className="mortgage-section">
      <div className="container-main">
        <div className="mortgage-panel">
          <div className="mortgage-controls">
            <h3 className="mortgage-title">Рассчитайте комфортный платёж</h3>
            <p className="mortgage-subtitle">
              Измените стоимость, взнос и срок
            </p>

            <div className="mortgage-fields">
              <MortgageRange
                label="Стоимость дома"
                value={price}
                display={formatPrice(price)}
                min={3_000_000}
                max={12_000_000}
                step={100_000}
                minLabel="3 млн"
                maxLabel="12 млн"
                onChange={setPrice}
              />
              <MortgageRange
                label="Первый взнос"
                value={downPct}
                display={`${downPct} %`}
                min={10}
                max={70}
                step={5}
                minLabel="10 %"
                maxLabel="70 %"
                onChange={setDownPct}
              />
              <MortgageRange
                label="Срок"
                value={years}
                display={`${years} лет`}
                min={5}
                max={30}
                step={1}
                minLabel="5 лет"
                maxLabel="30 лет"
                onChange={setYears}
              />
              <MortgageRange
                label="Расчётная ставка"
                value={rate}
                display={`${rate.toLocaleString("ru-RU")} %`}
                min={6}
                max={20}
                step={0.5}
                minLabel="6 %"
                maxLabel="20 %"
                onChange={setRate}
              />
            </div>
          </div>

          <div className="mortgage-result">
            <p className="mortgage-result-label">Ваш ежемесячный платёж</p>
            <p className="mortgage-result-value">
              {formatPrice(monthlyDisplay)}
              <span> / мес.</span>
            </p>
            <p className="mortgage-result-note">
              Пример расчёта, не предложение банка
            </p>
            <button
              type="button"
              className="mortgage-result-btn"
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
            <Link href="/blog/ipoteka/" className="mortgage-result-link">
              Способы покупки и условия →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
