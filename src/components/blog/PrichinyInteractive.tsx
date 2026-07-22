"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronDown, Clock, Home, Hammer } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const REASONS = [
  {
    id: 1,
    title: "Участок и коммуникации уже «в цене»",
    teaser: "Не нужно отдельно искать землю и ждать подрядчиков по воде и канализации.",
    body: "При стройке с нуля вы покупаете участок, потом отдельно решаете скважину, канализацию, подъезд. Каждый шаг — время и деньги. В готовом доме земля и базовая инженерия уже заложены в объект: вы смотрите реальный дом, а не «проект на бумаге».",
    points: [
      "Участок оформлен и входит в сделку",
      "Скважина и канализация предусмотрены",
      "Не нужно собирать 5 подрядчиков «с нуля»",
    ],
  },
  {
    id: 2,
    title: "Въехать можно быстрее",
    teaser: "Месяцы ремонта вместо полутора лет стройки.",
    body: "Средняя стройка в регионе — 12–24 месяца только до коробки и инженерии. Дальше — отделка. Готовый дом уже стоит: остаётся чистовой ремонт под ваш вкус. Пока «самостройщики» заливают фундамент, вы уже выбираете обои.",
    points: [
      "Нет ожидания сезона и бригад",
      "Меньше месяцев аренды «поверх» стройки",
      "Просмотр сегодня — решение на этой неделе",
    ],
  },
  {
    id: 3,
    title: "Цена не «уплывает» посередине",
    teaser: "В договоре — сумма. Не «примерно» и не «ещё чуть-чуть».",
    body: "На стройке смета растёт почти всегда: материалы подорожали, «забыли» учесть окна, оказалось нужен дренаж. Готовый дом продаётся с фиксированной ценой. Вы сравниваете объекты между собой, а не воюете с Excel каждую неделю.",
    points: [
      "Прозрачная стоимость в договоре",
      "Легче планировать ипотеку и взнос",
      "Меньше сюрпризов после оплаты",
    ],
  },
  {
    id: 4,
    title: "Ипотека и рассрочка — реальнее",
    teaser: "Банкам проще одобрить готовый объект, чем недострой.",
    body: "Готовый дом с участком — понятный залог. Семейная ипотека, материнский капитал, рассрочка от застройщика через эскроу — рабочие инструменты. На этапе котлована банки осторожнее, документы сложнее, сроки длиннее.",
    points: [
      "Семейная и стандартная ипотека",
      "Рассрочка через эскроу-счёт",
      "Помощь с одобрением и документами",
    ],
  },
  {
    id: 5,
    title: "Гарантия вместо «подрядчик не берёт трубку»",
    teaser: "Один застройщик — один договор — понятная ответственность.",
    body: "Если через год течёт кровля или треснул угол — при самостоятельной стройке вы ищете, кто виноват. При покупке у застройщика гарантия прописана: конструктив и инженерия. Это спокойствие, которое сложно купить за «экономию» на бригаде.",
    points: [
      "5 лет на конструктив",
      "2 года на инженерные системы",
      "Условия в договоре, не «на словах»",
    ],
  },
];

export function ReasonsAccordion() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="mb-8 space-y-3">
      {REASONS.map((reason) => {
        const isOpen = open === reason.id;
        return (
          <div
            key={reason.id}
            className={cn(
              "overflow-hidden rounded-card border transition-colors",
              isOpen ? "border-primary bg-primary-light/20" : "border-border bg-white"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : reason.id)}
              className="flex w-full items-start gap-3 p-4 text-left sm:p-5"
              aria-expanded={isOpen}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {reason.id}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-dark sm:text-lg">{reason.title}</p>
                <p className="mt-1 text-sm text-gray">{reason.teaser}</p>
              </div>
              <ChevronDown
                className={cn(
                  "mt-1 h-5 w-5 shrink-0 text-primary transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="border-t border-primary/20 px-4 pb-5 pt-3 sm:px-5">
                <p className="text-sm leading-relaxed text-gray sm:text-base">
                  {reason.body}
                </p>
                <ul className="mt-4 space-y-2">
                  {reason.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-dark"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const TIMELINE_BUILD = [
  { t: "0–2 мес.", label: "Поиск участка" },
  { t: "2–6 мес.", label: "Документы, проект" },
  { t: "6–18 мес.", label: "Стройка" },
  { t: "18–24 мес.", label: "Инженерия и отделка" },
];

const TIMELINE_READY = [
  { t: "1 неделя", label: "Выбор и просмотр" },
  { t: "2–4 недели", label: "Ипотека / договор" },
  { t: "1–3 мес.", label: "Чистовой ремонт" },
  { t: "Готово", label: "Заселение" },
];

export function TimelineCompare() {
  const [mode, setMode] = useState<"build" | "ready">("ready");
  const steps = mode === "build" ? TIMELINE_BUILD : TIMELINE_READY;

  return (
    <div className="mb-8 rounded-card border border-border bg-background p-4 sm:p-6">
      <p className="text-sm font-semibold text-dark">Интерактив: путь до заселения</p>
      <p className="mt-1 text-sm text-gray">
        Переключите режим и сравните типичный сценарий
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("build")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors",
            mode === "build"
              ? "border-dark bg-dark text-white"
              : "border-border bg-white text-dark hover:border-primary"
          )}
        >
          <Hammer className="h-4 w-4" />
          Строим сами
        </button>
        <button
          type="button"
          onClick={() => setMode("ready")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors",
            mode === "ready"
              ? "border-primary bg-primary text-white"
              : "border-border bg-white text-dark hover:border-primary"
          )}
        >
          <Home className="h-4 w-4" />
          Готовый дом
        </button>
      </div>
      <ol className="mt-6 space-y-3">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                mode === "ready" ? "bg-primary" : "bg-dark"
              )}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 rounded-xl border border-border bg-white px-3 py-2">
              <p className="flex items-center gap-1.5 text-xs font-medium text-gray">
                <Clock className="h-3.5 w-3.5" />
                {step.t}
              </p>
              <p className="text-sm font-semibold text-dark">{step.label}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-center text-sm font-medium text-dark">
        {mode === "ready"
          ? "Часто в 3–5 раз быстрее, чем стройка с нуля"
          : "Реалистичный сценарий без «идеальных» сроков подрядчика"}
      </p>
    </div>
  );
}

const QUIZ = [
  {
    id: "time",
    label: "Хочу заехать как можно скорее",
    result: "ready" as const,
    text: "Готовый дом — ваш вариант. Смотрите объекты в каталоге и записывайтесь на просмотр.",
  },
  {
    id: "budget",
    label: "Боюсь, что смета вырастет по дороге",
    result: "ready" as const,
    text: "Фиксированная цена в договоре снимает главный страх стройки. Сравните дома с вашей «сметой».",
  },
  {
    id: "unique",
    label: "Нужен только уникальный проект «под себя»",
    result: "build" as const,
    text: "Тогда стройка может быть оправдана — если есть земля, запас бюджета и надёжный подрядчик.",
  },
  {
    id: "mortgage",
    label: "Важна ипотека / семейная программа",
    result: "ready" as const,
    text: "На готовый дом банки одобряют проще. Посчитайте платёж и оставьте заявку на консультацию.",
  },
];

export function PriorityQuiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const answer = QUIZ.find((q) => q.id === selected);

  return (
    <div className="mb-8 rounded-card border border-border bg-white p-4 sm:p-6">
      <p className="text-sm font-semibold text-dark">Что для вас важнее всего?</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {QUIZ.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item.id)}
            className={cn(
              "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
              selected === item.id
                ? "border-primary bg-primary-light text-primary"
                : "border-border text-dark hover:border-primary"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {answer && (
        <div
          className={cn(
            "mt-4 rounded-xl border p-4",
            answer.result === "ready"
              ? "border-primary/30 bg-primary-light/40"
              : "border-border bg-background"
          )}
        >
          <p className="text-sm leading-relaxed text-dark">{answer.text}</p>
          {answer.result === "ready" && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/catalog"
                className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover"
              >
                Смотреть дома
              </Link>
              <Link
                href="/#consultation"
                className="rounded-xl border border-border bg-white px-4 py-2 text-xs font-semibold text-dark hover:border-primary"
              >
                Консультация
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
