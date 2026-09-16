"use client";

import { useEffect, useMemo, useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import {
  UCHASTOK_BUDGET_FIELDS,
  UCHASTOK_COMPARE_FIELDS,
  UCHASTOK_NEEDS_QUESTIONS,
  UCHASTOK_PLOT_SIZES,
  UCHASTOK_SCHEMES,
  UCHASTOK_UTILITIES,
  UCHASTOK_VIEWING_ITEMS,
} from "@/data/blog/articles/uchastok";

const NEEDS_LS_KEY = "uc-needs-notes";
const COMPARE_LS_KEY = "uc-compare-plots";

type NeedsNotesState = Record<string, string>;
type ViewingStatus = "checked" | "clarify" | "na" | "";

function parseMoney(v: string): number {
  const n = Number(String(v).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Форматирует ввод суммы: 1500000 → «1 500 000» */
function formatMoneyInput(raw: string): string {
  const digits = String(raw).replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function NeedsNotes() {
  const [notes, setNotes] = useState<NeedsNotesState>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(NEEDS_LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as NeedsNotesState;
        if (parsed && typeof parsed === "object") setNotes(parsed);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(NEEDS_LS_KEY, JSON.stringify(notes));
    } catch {
      /* ignore */
    }
  }, [notes, ready]);

  return (
    <div className="uc-needs">
      <p className="uc-tool-lead">
        Запишите ответы для себя — они сохранятся в этом браузере. Телефон и
        регистрация не нужны.
      </p>
      <div className="uc-needs-grid">
        {UCHASTOK_NEEDS_QUESTIONS.map((q) => (
          <label key={q.id} className="uc-needs-card">
            <span className="uc-needs-q">{q.question}</span>
            <span className="uc-needs-hint">{q.hint}</span>
            <textarea
              rows={3}
              value={notes[q.id] ?? ""}
              onChange={(e) =>
                setNotes((prev) => ({ ...prev, [q.id]: e.target.value }))
              }
              placeholder="Ваши заметки"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function PlotSchemeSvg({
  widthM,
  depthM,
  variant,
}: {
  widthM: number;
  depthM: number;
  variant: "compact" | "larger" | "narrow";
}) {
  const scale = 4.2;
  const pad = 28;
  const plotW = widthM * scale;
  const plotH = depthM * scale;
  const svgW = plotW + pad * 2;
  const svgH = plotH + pad * 2 + 18;

  const road = 14;
  const house =
    variant === "narrow"
      ? { x: pad + 8, y: pad + 28, w: plotW - 16, h: Math.min(52, plotH * 0.28) }
      : variant === "compact"
        ? { x: pad + 18, y: pad + 22, w: plotW * 0.48, h: plotH * 0.32 }
        : { x: pad + 28, y: pad + 30, w: plotW * 0.42, h: plotH * 0.28 };

  const parking =
    variant === "narrow"
      ? { x: pad + 8, y: pad + 8, w: plotW - 16, h: 16 }
      : {
          x: pad + plotW * 0.58,
          y: pad + 18,
          w: plotW * 0.32,
          h: 28,
        };

  const yard =
    variant === "narrow"
      ? {
          x: pad + 8,
          y: house.y + house.h + 10,
          w: plotW - 16,
          h: Math.max(24, plotH - (house.y - pad) - house.h - 24),
        }
      : {
          x: pad + 16,
          y: house.y + house.h + 12,
          w: plotW - 32,
          h: Math.max(30, plotH - (house.y - pad) - house.h - 28),
        };

  return (
    <svg
      className="uc-scheme-svg"
      viewBox={`0 0 ${svgW} ${svgH}`}
      role="img"
      aria-label={`Схема участка ${widthM} на ${depthM} метров`}
    >
      <rect
        x={pad}
        y={pad}
        width={plotW}
        height={plotH}
        rx={4}
        className="uc-scheme-plot"
      />
      <rect
        x={pad}
        y={pad - road}
        width={plotW}
        height={road}
        className="uc-scheme-road"
      />
      <text x={pad + plotW / 2} y={pad - 4} textAnchor="middle" className="uc-scheme-label">
        подъезд
      </text>
      <rect {...parking} rx={3} className="uc-scheme-parking" />
      <text
        x={parking.x + parking.w / 2}
        y={parking.y + parking.h / 2 + 4}
        textAnchor="middle"
        className="uc-scheme-label"
      >
        парковка
      </text>
      <rect {...house} rx={3} className="uc-scheme-house" />
      <text
        x={house.x + house.w / 2}
        y={house.y + house.h / 2 + 4}
        textAnchor="middle"
        className="uc-scheme-label uc-scheme-label-on"
      >
        дом
      </text>
      <rect {...yard} rx={3} className="uc-scheme-yard" />
      <text
        x={yard.x + yard.w / 2}
        y={yard.y + yard.h / 2 + 4}
        textAnchor="middle"
        className="uc-scheme-label"
      >
        двор
      </text>
      <text
        x={pad + plotW / 2}
        y={pad + plotH + 16}
        textAnchor="middle"
        className="uc-scheme-dim"
      >
        {widthM} м
      </text>
      <text
        x={pad - 10}
        y={pad + plotH / 2}
        textAnchor="middle"
        transform={`rotate(-90 ${pad - 10} ${pad + plotH / 2})`}
        className="uc-scheme-dim"
      >
        {depthM} м
      </text>
    </svg>
  );
}

export function PlotFitSchemes() {
  return (
    <div className="uc-schemes-wrap">
      <div className="uc-schemes">
        {UCHASTOK_SCHEMES.map((scheme) => (
          <figure key={scheme.id} className="uc-scheme-card">
            <figcaption>
              <strong>{scheme.title}</strong>
              <span>{scheme.sizeLabel}</span>
            </figcaption>
            <PlotSchemeSvg
              widthM={scheme.widthM}
              depthM={scheme.depthM}
              variant={scheme.id as "compact" | "larger" | "narrow"}
            />
            <p className="uc-scheme-note">{scheme.note}</p>
          </figure>
        ))}
      </div>
      <p className="uc-scheme-caption">
        Расположение дома, парковки и двора — иллюстративное. Реальные отступы,
        въезд и пятно застройки зависят от правил и проекта.
      </p>

      <div className="uc-callout uc-callout-warn">
        <p className="uc-callout-title">Узкий участок</p>
        <p>
          При той же площади в сотках узкая форма сильнее ограничивает дом:
          отступы от границ, место под машину и разворот техники. Сравнивайте не
          только «сотки», но и ширину по фасаду.
        </p>
      </div>

      <div className="uc-table-wrap uc-wide">
        <table className="uc-table">
          <caption className="uc-table-caption">
            Ориентир по площади: 6 / 10 / 15 соток
          </caption>
          <thead>
            <tr>
              <th>Площадь</th>
              <th>Для кого</th>
              <th>Что обычно помещается</th>
            </tr>
          </thead>
          <tbody>
            {UCHASTOK_PLOT_SIZES.map((row) => (
              <tr key={row.area}>
                <td data-label="Площадь">{row.area}</td>
                <td data-label="Для кого">{row.who}</td>
                <td data-label="Что обычно помещается">{row.fits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function UtilitiesAccordion() {
  const [open, setOpen] = useState<string | null>(UCHASTOK_UTILITIES[0]?.id ?? null);

  return (
    <div className="uc-utils">
      <p className="uc-tool-lead">
        По каждой сети сверьте три слоя: слова продавца, уточняющие вопросы и
        документы. Цены подключения здесь не приводим — они зависят от точки и
        организации.
      </p>
      <div className="uc-utils-list">
        {UCHASTOK_UTILITIES.map((item) => {
          const isOpen = open === item.id;
          return (
            <div
              key={item.id}
              className={cn("uc-util-card", isOpen && "is-open")}
            >
              <button
                type="button"
                className="uc-util-toggle"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span>{item.title}</span>
                <span className="uc-util-plus" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen ? (
                <div className="uc-util-body">
                  <div className="uc-util-col">
                    <h4>Что говорит продавец</h4>
                    <ul>
                      {item.seller.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="uc-util-col">
                    <h4>Что уточнить</h4>
                    <ul>
                      {item.clarify.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="uc-util-col">
                    <h4>Чем подтверждается</h4>
                    <ul>
                      {item.proof.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type BudgetState = Record<string, string>;

export function BudgetTool() {
  const [values, setValues] = useState<BudgetState>({});

  const filled = useMemo(
    () =>
      UCHASTOK_BUDGET_FIELDS.filter((f) => parseMoney(values[f.id] ?? "") > 0),
    [values]
  );
  const empty = useMemo(
    () =>
      UCHASTOK_BUDGET_FIELDS.filter((f) => parseMoney(values[f.id] ?? "") <= 0),
    [values]
  );
  const sum = filled.reduce((acc, f) => acc + parseMoney(values[f.id] ?? ""), 0);

  return (
    <div className="uc-budget">
      <div className="uc-budget-head">
        <h3 className="uc-budget-title">Расходы после покупки участка</h3>
        <p>
          Внесите только известные суммы. Пустые поля — это не «ноль», а то, что
          ещё предстоит уточнить. Готовых цен подключения мы не подставляем.
        </p>
      </div>
      <div className="uc-budget-fields">
        {UCHASTOK_BUDGET_FIELDS.map((f) => (
          <label key={f.id} className="uc-budget-field">
            <span>{f.label}, ₽</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={values[f.id] ?? ""}
              placeholder="Не указано"
              onChange={(e) => {
                const formatted = formatMoneyInput(e.target.value);
                setValues((prev) => ({ ...prev, [f.id]: formatted }));
              }}
            />
          </label>
        ))}
      </div>
      <div className="uc-budget-result">
        <p className="uc-budget-result-label">Сумма известных расходов</p>
        <p className="uc-budget-result-value">
          {filled.length ? formatPrice(Math.round(sum)) : "—"}
        </p>
      </div>
      {empty.length ? (
        <p className="uc-budget-pending">
          Предстоит уточнить:{" "}
          {empty.map((f) => f.label.toLowerCase()).join(", ")}.
        </p>
      ) : (
        <p className="uc-budget-pending">Все поля заполнены известными суммами.</p>
      )}
    </div>
  );
}

type CompareState = Record<string, { a: string; b: string }>;

const emptyCompare = (): CompareState =>
  Object.fromEntries(
    UCHASTOK_COMPARE_FIELDS.map((f) => [f.id, { a: "", b: "" }])
  );

export function ComparePlots() {
  const [rows, setRows] = useState<CompareState>(emptyCompare);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COMPARE_LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CompareState;
        if (parsed && typeof parsed === "object") setRows({ ...emptyCompare(), ...parsed });
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const save = () => {
    try {
      localStorage.setItem(COMPARE_LS_KEY, JSON.stringify(rows));
      setSavedAt(new Date().toLocaleString("ru-RU"));
    } catch {
      /* ignore */
    }
  };

  const printCompare = () => window.print();

  return (
    <div className="uc-compare" id="uc-compare-print">
      <p className="uc-tool-lead">
        Заполните одинаковые поля по двум вариантам. Можно сохранить в браузере
        или распечатать.
      </p>
      <div className="uc-table-wrap uc-wide">
        <table className="uc-table uc-compare-table">
          <thead>
            <tr>
              <th>Параметр</th>
              <th>Участок A</th>
              <th>Участок B</th>
            </tr>
          </thead>
          <tbody>
            {UCHASTOK_COMPARE_FIELDS.map((f) => (
              <tr key={f.id}>
                <td data-label="Параметр">{f.label}</td>
                <td data-label="Участок A">
                  <textarea
                    rows={2}
                    value={rows[f.id]?.a ?? ""}
                    disabled={!ready}
                    onChange={(e) =>
                      setRows((prev) => ({
                        ...prev,
                        [f.id]: { ...prev[f.id], a: e.target.value },
                      }))
                    }
                    placeholder="—"
                  />
                </td>
                <td data-label="Участок B">
                  <textarea
                    rows={2}
                    value={rows[f.id]?.b ?? ""}
                    disabled={!ready}
                    onChange={(e) =>
                      setRows((prev) => ({
                        ...prev,
                        [f.id]: { ...prev[f.id], b: e.target.value },
                      }))
                    }
                    placeholder="—"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="uc-compare-actions">
        <button type="button" className="uc-btn-primary" onClick={save}>
          Сохранить
        </button>
        <button type="button" className="uc-btn-secondary" onClick={printCompare}>
          Печать
        </button>
        {savedAt ? (
          <span className="uc-compare-saved">Сохранено: {savedAt}</span>
        ) : null}
      </div>
    </div>
  );
}

const STATUS_LABEL: Record<Exclude<ViewingStatus, "">, string> = {
  checked: "Проверено",
  clarify: "Нужно уточнить",
  na: "Не относится",
};

export function ViewingChecklist() {
  const [status, setStatus] = useState<Record<number, ViewingStatus>>({});

  const downloadTxt = () => {
    const lines = [
      "Чек-лист осмотра участка — Кров-Сервис",
      "=====================================",
      "",
      ...UCHASTOK_VIEWING_ITEMS.map((item, i) => {
        const st = status[i] || "не отмечено";
        const label =
          st === "checked" || st === "clarify" || st === "na"
            ? STATUS_LABEL[st]
            : "не отмечено";
        return `[${label}] ${item}`;
      }),
      "",
      "Список для подготовки к осмотру. Не заменяет проверку документов и экспертизу.",
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "checklist-uchastok.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="uc-viewing">
      <ul className="uc-viewing-list">
        {UCHASTOK_VIEWING_ITEMS.map((item, i) => (
          <li key={item} className="uc-viewing-item">
            <p className="uc-viewing-text">{item}</p>
            <div className="uc-viewing-status" role="group" aria-label={item}>
              {(
                [
                  ["checked", "Проверено"],
                  ["clarify", "Нужно уточнить"],
                  ["na", "Не относится"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={cn(
                    "uc-status-btn",
                    status[i] === id && "is-active",
                    id === "checked" && "is-ok",
                    id === "clarify" && "is-warn",
                    id === "na" && "is-muted"
                  )}
                  onClick={() =>
                    setStatus((prev) => ({
                      ...prev,
                      [i]: prev[i] === id ? "" : id,
                    }))
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="uc-btn-secondary" onClick={downloadTxt}>
        Скачать список (.txt)
      </button>
      <p className="uc-viewing-note">
        Без формы заявки и регистрации. Файл сохраняется у вас на устройстве.
      </p>
    </div>
  );
}
