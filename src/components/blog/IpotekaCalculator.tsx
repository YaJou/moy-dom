"use client";

import { realHouses } from "@/data/houses";
import {
  calcMortgageFromDown,
  catalogHrefForBudget,
} from "@/lib/mortgage";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function IpotekaCalculator() {
  const [price, setPrice] = useState(7_000_000);
  const [downRub, setDownRub] = useState(1_400_000);
  const [years, setYears] = useState(20);
  const [rateInput, setRateInput] = useState("");
  const [houseId, setHouseId] = useState<string>("");

  const downPct = price > 0 ? (downRub / price) * 100 : 0;
  const parsedRate = rateInput.trim() === "" ? null : Number(rateInput.replace(",", "."));
  const rate =
    parsedRate != null && Number.isFinite(parsedRate) && parsedRate >= 0
      ? parsedRate
      : null;

  const result = useMemo(
    () => calcMortgageFromDown(price, downRub, years, rate),
    [price, downRub, years, rate]
  );

  const setPriceSafe = (v: number) => {
    const next = clamp(Math.round(v) || 0, 0, 50_000_000);
    setPrice(next);
    setDownRub((d) => Math.min(d, next));
  };

  const setDownRubSafe = (v: number) => {
    const next = clamp(Math.round(v) || 0, 0, price);
    setDownRub(next);
  };

  const setDownPctSafe = (pct: number) => {
    const safe = clamp(pct, 0, 100);
    setDownRub(Math.round((price * safe) / 100));
  };

  const onPickHouse = (id: string) => {
    setHouseId(id);
    const house = realHouses.find((h) => String(h.id) === id);
    if (!house) return;
    setPrice(house.price);
    setDownRub(Math.round(house.price * 0.2));
  };

  const monthly =
    result.monthly != null ? Math.round(result.monthly) : null;
  const catalogHref = catalogHrefForBudget(price);

  return (
    <div className="mp-calc">
      <div className="mp-calc-controls">
        <label className="mp-field">
          <span>Дом из каталога (опционально)</span>
          <select
            value={houseId}
            onChange={(e) => onPickHouse(e.target.value)}
            className="mp-input"
          >
            <option value="">Указать стоимость вручную</option>
            {realHouses.map((h) => (
              <option key={h.id} value={h.id}>
                {h.city} · {h.area} м² · {formatPrice(h.price)}
              </option>
            ))}
          </select>
        </label>

        <label className="mp-field">
          <span>Стоимость дома</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={50_000}
            value={price || ""}
            onChange={(e) => setPriceSafe(Number(e.target.value))}
            className="mp-input"
          />
          <input
            type="range"
            min={3_000_000}
            max={12_000_000}
            step={100_000}
            value={clamp(price, 3_000_000, 12_000_000)}
            onChange={(e) => setPriceSafe(Number(e.target.value))}
            className="mp-range"
            aria-label="Стоимость дома"
          />
        </label>

        <div className="mp-field-row">
          <label className="mp-field">
            <span>Первый взнос, ₽</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={price}
              step={50_000}
              value={downRub || ""}
              onChange={(e) => setDownRubSafe(Number(e.target.value))}
              className="mp-input"
            />
          </label>
          <label className="mp-field">
            <span>Первый взнос, %</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              step={1}
              value={Number.isFinite(downPct) ? Math.round(downPct * 10) / 10 : ""}
              onChange={(e) => setDownPctSafe(Number(e.target.value))}
              className="mp-input"
            />
          </label>
        </div>
        <input
          type="range"
          min={0}
          max={70}
          step={1}
          value={clamp(Math.round(downPct), 0, 70)}
          onChange={(e) => setDownPctSafe(Number(e.target.value))}
          className="mp-range"
          aria-label="Первый взнос в процентах"
        />

        <label className="mp-field">
          <span>Срок, лет</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={30}
            step={1}
            value={years || ""}
            onChange={(e) =>
              setYears(clamp(Math.round(Number(e.target.value)) || 0, 1, 30))
            }
            className="mp-input"
          />
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={clamp(years, 5, 30)}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mp-range"
            aria-label="Срок кредита"
          />
        </label>

        <label className="mp-field">
          <span>Расчётная годовая ставка, %</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={30}
            step={0.1}
            value={rateInput}
            onChange={(e) => setRateInput(e.target.value)}
            placeholder="Укажите ставку"
            className="mp-input"
          />
          <p className="mp-field-hint">
            Ваше предположение для расчёта. Не рыночное предложение банка.
          </p>
        </label>
      </div>

      <div className="mp-calc-result">
        <p className="mp-calc-result-label">Ежемесячный платёж</p>
        {monthly != null ? (
          <p className="mp-calc-result-value">
            {formatPrice(monthly)}
            <span> / мес.</span>
          </p>
        ) : (
          <p className="mp-calc-result-empty">Укажите ставку для расчёта</p>
        )}

        <dl className="mp-calc-stats">
          <div>
            <dt>Сумма кредита</dt>
            <dd>{formatPrice(Math.round(result.loan))}</dd>
          </div>
          <div>
            <dt>Первый взнос</dt>
            <dd>{formatPrice(Math.round(result.downPayment))}</dd>
          </div>
          {result.total != null ? (
            <div>
              <dt>Всего выплат с взносом</dt>
              <dd>{formatPrice(Math.round(result.total))}</dd>
            </div>
          ) : null}
        </dl>

        <p className="mp-calc-note">
          Расчёт предварительный. Не учитывает все сопутствующие расходы и не
          является решением банка. Итог выплат включает первоначальный взнос и
          сумму аннуитетных платежей за весь срок.
        </p>

        <Link href={catalogHref} className="mp-btn-primary">
          Посмотреть дома в этом бюджете
        </Link>
      </div>
    </div>
  );
}
