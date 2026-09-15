"use client";

import { useViewingModal } from "@/components/home/ViewingModalProvider";
import { calcMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import { useMemo, useState } from "react";

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

interface HouseMortgageSectionProps {
  house: House;
}

/** Калькулятор в стиле главной, цена дома подставлена автоматически. */
export function HouseMortgageSection({ house }: HouseMortgageSectionProps) {
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(20);
  const rate = 12.5;
  const { openViewing } = useViewingModal();
  const result = useMemo(
    () => calcMortgage(house.price, downPct, years, rate),
    [house.price, downPct, years]
  );

  return (
    <section className="hp-section mortgage-section" id="house-mortgage">
      <div className="mortgage-panel">
        <div className="mortgage-controls">
          <h3 className="mortgage-title">Покупка этого дома</h3>
          <p className="mortgage-subtitle">
            Стоимость {formatPrice(house.price)} уже подставлена. Измените взнос
            и срок — ставка расчётная {rate}% годовых.
          </p>
          <div className="mortgage-fields mortgage-fields--house">
            <div className="mortgage-field mortgage-field--static">
              <p className="mortgage-field-label">Стоимость дома</p>
              <p className="mortgage-field-value">{formatPrice(house.price)}</p>
            </div>
            <MortgageRange
              label="Первый взнос"
              value={downPct}
              display={`${downPct}\u00A0%\u00A0·\u00A0${formatPrice(result.downPayment)}`}
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
              display={`${years}\u00A0лет`}
              min={5}
              max={30}
              step={1}
              minLabel="5 лет"
              maxLabel="30 лет"
              onChange={setYears}
            />
          </div>
        </div>
        <div className="mortgage-result">
          <p className="mortgage-result-label">Ежемесячный платёж</p>
          <p className="mortgage-result-value">
            {formatPrice(Math.round(result.monthly))}
          </p>
          <p className="mortgage-result-note">
            Расчётная ставка {rate}% · кредит {formatPrice(result.loan)}
          </p>
          <button
            type="button"
            className="mortgage-result-btn"
            onClick={() =>
              openViewing({
                houseId: house.id,
                houseUrl: `/catalog/${house.id}`,
                city: house.city,
                calculator: `payment=${Math.round(result.monthly)};down=${downPct};years=${years}`,
              })
            }
          >
            Обсудить покупку этого дома
          </button>
        </div>
      </div>
    </section>
  );
}
