"use client";

import { useViewingModal } from "@/components/home/ViewingModalProvider";
import {
  BUILD_BASE_HEIGHT_M,
  BUILD_BASE_RATE,
  calcBuildPrice,
  type FacadeFinish,
  type RoofType,
  type WallCore,
  type WindowColor,
} from "@/lib/build-calc";
import { cn, formatPrice } from "@/lib/utils";
import { useMemo, useState } from "react";

function OptionGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; title: string; hint?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="bc-group">
      <legend className="bc-label">{label}</legend>
      <div className="bc-options">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={cn("bc-option", value === opt.id && "is-active")}
            onClick={() => onChange(opt.id)}
          >
            <span className="bc-option-title">{opt.title}</span>
            {opt.hint ? <span className="bc-option-hint">{opt.hint}</span> : null}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="bc-field">
      <span className="bc-label">{label}</span>
      <div className="bc-input-row">
        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : min}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bc-input"
        />
        <span className="bc-suffix">{suffix}</span>
      </div>
    </label>
  );
}

export function BuildCalculator() {
  const { openViewing } = useViewingModal();
  const [lengthM, setLengthM] = useState(10);
  const [widthM, setWidthM] = useState(10);
  const [heightM, setHeightM] = useState(BUILD_BASE_HEIGHT_M);
  const [roof, setRoof] = useState<RoofType>("gch");
  const [windows, setWindows] = useState<WindowColor>("white");
  const [wallCore, setWallCore] = useState<WallCore>("grass");
  const [facade, setFacade] = useState<FacadeFinish>("brick");

  const result = useMemo(
    () =>
      calcBuildPrice({
        lengthM,
        widthM,
        heightM,
        roof,
        windows,
        wallCore,
        facade,
      }),
    [lengthM, widthM, heightM, roof, windows, wallCore, facade]
  );

  const summary = [
    `${result.area} м²`,
    `потолки ${heightM.toFixed(1)} м`,
    roof === "gch" ? "ГЧ" : "МЧ",
    windows === "white" ? "белые окна" : "цветные окна",
    wallCore === "grass" ? "грас" : "КББ",
    facade === "brick" ? "облицовка" : "штукатурка",
  ].join(" · ");

  return (
    <div className="bc-panel">
      <div className="bc-controls">
        <h2 className="bc-title">Калькулятор строительства</h2>
        <p className="bc-subtitle">
          Примерный расчёт коробки под заказ. База —{" "}
          {BUILD_BASE_RATE.toLocaleString("ru-RU")} ₽/м² при высоте{" "}
          {BUILD_BASE_HEIGHT_M} м (ГЧ, белые окна, грас + облицовка).
        </p>

        <div className="bc-dims">
          <NumberField
            label="Длина"
            value={lengthM}
            min={5}
            max={25}
            step={0.5}
            suffix="м"
            onChange={setLengthM}
          />
          <NumberField
            label="Ширина"
            value={widthM}
            min={5}
            max={20}
            step={0.5}
            suffix="м"
            onChange={setWidthM}
          />
          <NumberField
            label="Высота потолков"
            value={heightM}
            min={2.5}
            max={4}
            step={0.1}
            suffix="м"
            onChange={setHeightM}
          />
        </div>

        <p className="bc-area-line">
          Площадь дома: <strong>{result.area} м²</strong>
          {heightM > BUILD_BASE_HEIGHT_M ? (
            <>
              {" "}
              · надбавка за высоту:{" "}
              <strong>{formatPrice(result.heightSurcharge)}</strong>
            </>
          ) : null}
        </p>

        <OptionGroup
          label="Кровля"
          value={roof}
          onChange={setRoof}
          options={[
            { id: "gch", title: "Гибкая черепица", hint: "в базе" },
            { id: "mch", title: "Металлочерепица" },
          ]}
        />
        <OptionGroup
          label="Окна"
          value={windows}
          onChange={setWindows}
          options={[
            { id: "white", title: "Белые", hint: "в базе" },
            { id: "colored", title: "Серые / коричневые" },
          ]}
        />
        <OptionGroup
          label="Материал стен"
          value={wallCore}
          onChange={setWallCore}
          options={[
            { id: "grass", title: "Грас + облицовка", hint: "в базе" },
            { id: "kbb", title: "КББ" },
          ]}
        />
        <OptionGroup
          label="Фасад"
          value={facade}
          onChange={setFacade}
          options={[
            { id: "brick", title: "Облицовочный кирпич", hint: "в базе" },
            { id: "plaster", title: "Штукатурка" },
          ]}
        />
      </div>

      <aside className="bc-result">
        <p className="bc-result-kicker">Ориентировочная цена</p>
        <p className="bc-result-price">{formatPrice(result.total)}</p>
        <p className="bc-result-summary">{summary}</p>

        <button
          type="button"
          className="bc-cta"
          onClick={() =>
            openViewing({
              intent: "callback",
              city: "Энгельс",
              topic: "Строительство дома под заказ",
              calculator: `${summary} · ориентир ${formatPrice(result.total)}`,
            })
          }
        >
          Обсудить строительство
        </button>
        <p className="bc-note">
          Цифры примерные, без участка и чистовой отделки. Точную смету
          посчитаем после планировки и выезда на место.
        </p>
      </aside>
    </div>
  );
}
