"use client";

import { cn } from "@/lib/utils";
import { Check, Circle, HelpCircle, Paintbrush, Shovel, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const STAGES = {
  black: {
    id: "black" as const,
    title: "Черновая",
    icon: Shovel,
    color: "bg-dark text-white border-dark",
    idle: "border-border bg-white text-dark",
    summary: "Коробка дома. Дальше — много пыли, штроб и ожидания.",
    items: [
      { ok: true, text: "Стены, перекрытия, кровля" },
      { ok: true, text: "Окна могут быть уже стоять" },
      { ok: false, text: "Штукатурка и стяжка — ещё нет" },
      { ok: false, text: "Чистовой ремонт — далеко" },
      { ok: false, text: "Заезжать рано" },
    ],
  },
  pre: {
    id: "pre" as const,
    title: "Предчистовая",
    icon: Paintbrush,
    color: "bg-primary text-white border-primary",
    idle: "border-border bg-white text-dark",
    summary: "Основа готова. Выбираете финиш — обои, пол, свет, сантехнику.",
    items: [
      { ok: true, text: "Штукатурка / ровные стены" },
      { ok: true, text: "Стяжка пола" },
      { ok: true, text: "Часто — разводка электрики" },
      { ok: false, text: "Обои, плитка, ламинат — ваши" },
      { ok: false, text: "Жить можно после чистового" },
    ],
  },
  key: {
    id: "key" as const,
    title: "Под ключ",
    icon: Sparkles,
    color: "bg-green-700 text-white border-green-700",
    idle: "border-border bg-white text-dark",
    summary: "Финиш уже сделан. Быстрый заезд, но вкус — чужой.",
    items: [
      { ok: true, text: "Стены и полы с финишем" },
      { ok: true, text: "Часто сантехника и свет" },
      { ok: true, text: "Можно заезжать быстрее" },
      { ok: false, text: "Сложно «переиграть» дизайн" },
      { ok: false, text: "Переделка = двойные траты" },
    ],
  },
};

export function FinishStagesSwitcher() {
  const [stage, setStage] = useState<"black" | "pre" | "key">("pre");
  const current = STAGES[stage];
  const Icon = current.icon;

  return (
    <div className="mb-8 rounded-card border border-border bg-background p-4 sm:p-6">
      <p className="text-sm font-semibold text-dark">Интерактив: уровни отделки</p>
      <p className="mt-1 text-sm text-gray">Нажмите на уровень — увидите, что обычно уже сделано</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {(Object.values(STAGES) as (typeof STAGES)[keyof typeof STAGES][]).map(
          (item) => {
            const active = stage === item.id;
            const ItemIcon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStage(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center text-xs font-semibold transition-colors sm:text-sm",
                  active ? item.color : item.idle
                )}
              >
                <ItemIcon className="h-4 w-4" />
                {item.title}
              </button>
            );
          }
        )}
      </div>
      <div className="mt-5 rounded-xl border border-border bg-white p-4">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <p className="font-semibold text-dark">{current.title}</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray">{current.summary}</p>
        <ul className="mt-4 space-y-2">
          {current.items.map((item) => (
            <li key={item.text} className="flex items-start gap-2 text-sm">
              {item.ok ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              ) : (
                <Circle className="mt-0.5 h-4 w-4 shrink-0 text-gray-light" />
              )}
              <span className={item.ok ? "text-dark" : "text-gray"}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const CHECKLIST = [
  {
    title: "Стены",
    detail:
      "Штукатурка или аналог: поверхность ровная, без крупных ям. Дальше — шпаклёвка под покраску/обои по вашему проекту.",
  },
  {
    title: "Полы",
    detail:
      "Стяжка залита и выстоялась. Можно укладывать финишное покрытие. Проверьте «бухтение» и перепады.",
  },
  {
    title: "Электрика",
    detail:
      "Уточните: только ввод в дом или разводка по комнатам с выводами под розетки и свет. Это сильно меняет смету чистового.",
  },
  {
    title: "Санузлы",
    detail:
      "Выводы воды и канализации, часто — подготовка под плитку. Сантехнику и плитку обычно выбираете сами.",
  },
  {
    title: "Окна и входная дверь",
    detail:
      "Часто уже установлены. Остаются откосы, подоконники, фурнитура — по вашему вкусу и бюджету.",
  },
  {
    title: "Документы",
    detail:
      "Самое важное: перечень комплектации в договоре. Устная «предчистовая» без списка — риск недопонимания.",
  },
];

export function FinishChecklist() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mb-8 space-y-2">
      {CHECKLIST.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.title}
            className={cn(
              "overflow-hidden rounded-card border transition-colors",
              isOpen ? "border-primary bg-primary-light/20" : "border-border bg-white"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-dark">{item.title}</span>
              <HelpCircle
                className={cn(
                  "h-4 w-4 shrink-0 text-primary transition-transform",
                  isOpen && "rotate-12"
                )}
              />
            </button>
            {isOpen && (
              <p className="border-t border-primary/20 px-4 pb-4 pt-3 text-sm leading-relaxed text-gray">
                {item.detail}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

const QUIZ = [
  {
    id: "speed",
    label: "Хочу заехать максимально быстро",
    tip: "Смотрите объекты с максимальной готовностью и заранее заложите короткий чистовой (или вариант ближе к «под ключ»).",
  },
  {
    id: "design",
    label: "Хочу сам выбрать стиль и материалы",
    tip: "Предчистовая — ваш формат. Сверьте список работ в договоре и считайте бюджет финиша отдельно.",
  },
  {
    id: "cheap",
    label: "Хочу минимальную цену входа",
    tip: "Черновая дешевле на старте, но суммарно с ремонтом часто выходит дороже и дольше. Считайте полную стоимость.",
  },
  {
    id: "balance",
    label: "Нужен баланс: не пыль, но свой ремонт",
    tip: "Классическая предчистовая. На просмотре пройдитесь по чек-листу стен, стяжки и электрики.",
  },
];

export function FinishQuiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const answer = QUIZ.find((q) => q.id === selected);

  return (
    <div className="mb-8 rounded-card border border-border bg-white p-4 sm:p-6">
      <p className="text-sm font-semibold text-dark">Что для вас важнее?</p>
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
        <div className="mt-4 rounded-xl border border-primary/30 bg-primary-light/40 p-4">
          <p className="text-sm leading-relaxed text-dark">{answer.tip}</p>
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
              Задать вопрос
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
