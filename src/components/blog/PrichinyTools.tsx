"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { PRICHINY_CHECKLIST } from "@/data/blog/articles/prichiny";

export function PrichinyBudgetTool() {
  const [price, setPrice] = useState("");
  const [finish, setFinish] = useState("");
  const [furniture, setFurniture] = useState("");
  const [other, setOther] = useState("");

  const parse = (v: string) => {
    const n = Number(String(v).replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const fields = [
    { label: "Цена дома", value: price, set: setPrice },
    { label: "Отделка", value: finish, set: setFinish },
    { label: "Мебель и техника", value: furniture, set: setFurniture },
    { label: "Другие расходы", value: other, set: setOther },
  ];

  const filled = fields.filter((f) => parse(f.value) > 0);
  const sum = filled.reduce((acc, f) => acc + parse(f.value), 0);

  return (
    <div className="pr-budget-tool">
      <h3 className="pr-budget-tool-title">Мой бюджет</h3>
      <div className="pr-budget-fields">
        {fields.map((f) => (
          <label key={f.label} className="pr-budget-field">
            <span>{f.label}, ₽</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              value={f.value}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "") {
                  f.set("");
                  return;
                }
                const n = Number(raw);
                if (!Number.isFinite(n) || n < 0) return;
                f.set(raw);
              }}
              placeholder="Не указано"
            />
          </label>
        ))}
      </div>
      <div className="pr-budget-result">
        <p className="pr-budget-result-label">Сумма указанных расходов</p>
        <p className="pr-budget-result-value">
          {filled.length ? formatPrice(Math.round(sum)) : "—"}
        </p>
      </div>
      <p className="pr-budget-note">
        Это ваш список расходов, а не смета компании.{" "}
        <Link href="/blog/otdelka/" className="pr-inline-link">
          Статья о предчистовой отделке →
        </Link>
      </p>
    </div>
  );
}

export function PrichinyChecklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const printList = () => {
    window.print();
  };

  return (
    <div className="pr-check" id="pr-checklist-print">
      <ul className="pr-check-list">
        {PRICHINY_CHECKLIST.map((item, i) => (
          <li key={item}>
            <label>
              <input
                type="checkbox"
                checked={Boolean(checked[i])}
                onChange={() =>
                  setChecked((prev) => ({ ...prev, [i]: !prev[i] }))
                }
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="pr-check-note">
        Это список вопросов для просмотра, он не заменяет техническую и
        юридическую проверку.
      </p>
      <p className="pr-check-guarantee">
        У объектов Кров-Сервис в договоре предусмотрена гарантия: 5 лет на
        конструктив и 2 года на инженерные системы. Точные условия — в договоре
        и на странице{" "}
        <Link href="/documents/" className="pr-inline-link">
          документов
        </Link>
        .
      </p>
      <button type="button" className="pr-btn-secondary" onClick={printList}>
        Распечатать список
      </button>
    </div>
  );
}

type QuizAnswers = {
  plot: string | null;
  plan: string | null;
  build: string | null;
};

export function PrichinyQuiz() {
  const [answers, setAnswers] = useState<QuizAnswers>({
    plot: null,
    plan: null,
    build: null,
  });

  const result = useMemo(() => {
    const { plot, plan, build } = answers;
    if (!plot || !plan || !build) return null;

    if (plot === "yes" && plan === "special" && build === "yes") {
      return {
        text: "Вам стоит сравнить индивидуальное строительство с готовыми вариантами.",
        href: "/catalog/",
        cta: "Смотреть готовые дома",
      };
    }
    if (build === "ready" && plan === "typical") {
      return {
        text: "Начните с просмотра готовых домов и сравнения комплектаций.",
        href: "/catalog/",
        cta: "Перейти в каталог",
      };
    }
    return {
      text: "Сравните оба варианта на конкретных предложениях.",
      href: "/catalog/",
      cta: "Смотреть дома в каталоге",
    };
  }, [answers]);

  const questions: {
    key: keyof QuizAnswers;
    q: string;
    options: { id: string; label: string }[];
  }[] = [
    {
      key: "plot",
      q: "У вас уже есть участок?",
      options: [
        { id: "yes", label: "Да" },
        { id: "no", label: "Нет" },
        { id: "choosing", label: "Пока выбираю" },
      ],
    },
    {
      key: "plan",
      q: "Нужна особая планировка?",
      options: [
        { id: "special", label: "Да" },
        { id: "typical", label: "Подойдёт типовая" },
        { id: "look", label: "Хочу посмотреть варианты" },
      ],
    },
    {
      key: "build",
      q: "Готовы заниматься организацией стройки?",
      options: [
        { id: "yes", label: "Да" },
        { id: "ready", label: "Предпочитаю выбрать готовое" },
        { id: "unsure", label: "Пока не решил" },
      ],
    },
  ];

  return (
    <div className="pr-quiz">
      <h3 className="ja-h3">Короткий подбор</h3>
      <p className="ja-p">
        Три вопроса без процентов и баллов — чтобы понять, с чего начать
        сравнение.
      </p>
      {questions.map((block) => (
        <fieldset key={block.key} className="pr-quiz-block">
          <legend>{block.q}</legend>
          <div className="pr-quiz-options" role="radiogroup">
            {block.options.map((opt) => (
              <label
                key={opt.id}
                className={cn(
                  "pr-quiz-option",
                  answers[block.key] === opt.id && "is-active"
                )}
              >
                <input
                  type="radio"
                  name={block.key}
                  value={opt.id}
                  checked={answers[block.key] === opt.id}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [block.key]: opt.id }))
                  }
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      {result ? (
        <div className="pr-quiz-result">
          <p>{result.text}</p>
          <Link href={result.href} className="pr-btn-primary">
            {result.cta}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
