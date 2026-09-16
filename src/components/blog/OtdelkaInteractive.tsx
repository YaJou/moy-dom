"use client";

import { HomeHouseCard } from "@/components/home/HomeHouseCard";
import { HouseImage } from "@/components/ui/HouseImage";
import { realHouses } from "@/data/houses";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

const STAGE_PHOTOS = {
  black: {
    id: "black" as const,
    title: "Черновая",
    image: "/images/design-kit/10-brickwork.jpg",
    caption:
      "Пример кладки на этапе возведения стен. Это не последовательный ремонт одной комнаты — другой объект/этап для сравнения состояния.",
    summary:
      "Коробка дома: стены и перекрытия есть, но поверхности ещё не подготовлены под финиш.",
    done: ["Стены, перекрытия, кровля", "Часто уже стоят окна"],
    todo: ["Штукатурка и стяжка", "Разводка инженерии до финиша", "Чистовой ремонт"],
  },
  pre: {
    id: "pre" as const,
    title: "Предчистовая",
    image: "/images/design-kit/07-pre-finish-interior.jpg",
    caption:
      "Интерьер с предчистовой подготовкой: ровные стены и стяжка. Визуализация/пример комплектации — уточняйте список работ по выбранному дому.",
    summary:
      "Основа готова. Остаётся выбрать обои, пол, свет и сантехнику — без пыли от черновых работ.",
    done: ["Штукатурка / ровные стены", "Стяжка пола", "Часто — разводка электрики"],
    todo: ["Обои, плитка, ламинат", "Сантехника и свет", "Мебель и заезд"],
  },
  key: {
    id: "key" as const,
    title: "Чистовая",
    image: "/images/houses/engels-snt-malinki-troitskaya-100/06.jpg",
    caption:
      "Пример более готового интерьера для сравнения. Не тот же объект, что на снимке предчистовой — смотрите разницу состояний, а не «один ремонт во времени».",
    summary:
      "Финиш уже сделан. Быстрее заезд, но вкус и материалы заданы заранее.",
    done: ["Стены и полы с финишем", "Часто свет и сантехника", "Можно заезжать быстрее"],
    todo: ["Сложно сменить стиль без переделки", "Риск двойных трат при «не ваш вкус»"],
  },
};

export function FinishStagesSwitcher() {
  const [stage, setStage] = useState<"black" | "pre" | "key">("pre");
  const current = STAGE_PHOTOS[stage];

  return (
    <div className="ja-stages">
      <div className="ja-stages-tabs" role="tablist">
        {(Object.values(STAGE_PHOTOS) as (typeof STAGE_PHOTOS)[keyof typeof STAGE_PHOTOS][]).map(
          (item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={stage === item.id}
              className={cn("ja-stages-tab", stage === item.id && "is-active")}
              onClick={() => setStage(item.id)}
            >
              {item.title}
            </button>
          )
        )}
      </div>

      <div className="ja-stages-body">
        <figure className="ja-stages-figure">
          <div className="ja-stages-photo">
            <HouseImage
              src={current.image}
              alt={current.title}
              fill
              objectFit="cover"
              sizes="(max-width: 1024px) 100vw, 760px"
            />
          </div>
          <figcaption className="ja-caption">{current.caption}</figcaption>
        </figure>

        <div className="ja-stages-copy">
          <h3 className="ja-stages-title">{current.title}</h3>
          <p className="ja-stages-summary">{current.summary}</p>
          <div className="ja-stages-cols">
            <div>
              <p className="ja-stages-label">Что выполнено</p>
              <ul>
                {current.done.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="ja-stages-label">Что ещё нужно</p>
              <ul>
                {current.todo.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const INCLUDED_TOPICS = [
  {
    id: "walls",
    title: "Стены",
    image: "/images/design-kit/07-pre-finish-interior.jpg",
    shown: "Общий вид подготовленных стен на примере интерьера.",
    ask: "Уточните по дому: штукатурка по всем стенам, ровность, трещины.",
  },
  {
    id: "floor",
    title: "Пол",
    image: "/images/design-kit/11-underfloor-heating.jpg",
    shown: "Пример инженерной подготовки пола (тёплый пол / коммуникации).",
    ask: "Спросите про стяжку, бухтение, готовность к чистовому покрытию.",
  },
  {
    id: "electric",
    title: "Электрика",
    image: "/images/design-kit/09-foundation.jpg",
    shown: "Иллюстрация этапа работ на объекте (не обязательно щит этого дома).",
    ask: "Только ввод или разводка до розеток и света? Где щит?",
  },
  {
    id: "heat",
    title: "Отопление",
    image: "/images/design-kit/11-underfloor-heating.jpg",
    shown: "Пример смонтированного тёплого пола / коллекторной зоны.",
    ask: "Что уже смонтировано и что останется подключить после покупки.",
  },
  {
    id: "water",
    title: "Вода и канализация",
    image: "/images/design-kit/12-plot-and-access.jpg",
    shown: "Контекст участка и коммуникаций — не замена осмотра санузла.",
    ask: "Выводы в санузлах, гидроизоляция, скважина / канализация на участке.",
  },
  {
    id: "windows",
    title: "Окна и двери",
    image: "/images/design-kit/02-hero-side.jpg",
    shown: "Фасад с установленными окнами — пример закрытого контура дома.",
    ask: "Окна и входная дверь в цене? Откосы и подоконники — ваши или уже есть?",
  },
];

export function FinishChecklist() {
  const [activeId, setActiveId] = useState(INCLUDED_TOPICS[0].id);
  const active =
    INCLUDED_TOPICS.find((t) => t.id === activeId) ?? INCLUDED_TOPICS[0];

  return (
    <div className="ja-included">
      <div className="ja-included-photo">
        <HouseImage
          src={active.image}
          alt={active.title}
          fill
          objectFit="contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="ja-included-side">
        <div className="ja-included-topics">
          {INCLUDED_TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className={cn(
                "ja-included-topic",
                topic.id === active.id && "is-active"
              )}
              onClick={() => setActiveId(topic.id)}
            >
              {topic.title}
            </button>
          ))}
        </div>
        <div className="ja-included-detail">
          <p>
            <strong>На примере:</strong> {active.shown}
          </p>
          <p className="ja-check-peach">
            <strong>Уточнить по дому:</strong> {active.ask}
          </p>
        </div>
      </div>
    </div>
  );
}

const VIEWING_ITEMS = [
  "Стены ровные, без крупных трещин и отслоений",
  "Стяжка целая, без «бухтения» и ям",
  "Электрика: щит, автоматы, выводы под розетки и свет",
  "Санузлы: гидроизоляция, выводы воды и канализации",
  "Окна и дверь установлены, открываются нормально",
  "В договоре / спецификации есть перечень комплектации",
];

export function FinishViewingChecklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [notes, setNotes] = useState("");

  const toggle = (index: number) =>
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));

  const printList = () => {
    const lines = VIEWING_ITEMS.map(
      (item, i) => `${checked[i] ? "[x]" : "[ ]"} ${item}`
    ).join("\n");
    const blob = new Blob(
      [`Чек-лист просмотра\n\n${lines}\n\nЗаметки:\n${notes}\n`],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "checklist-predchistovaya.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ja-view-check">
      <div className="ja-view-check-head">
        <h3>Сохраните перед просмотром</h3>
        <p>Отметьте вопросы и сохраните список — телефон не нужен.</p>
      </div>
      <ul className="ja-view-check-list">
        {VIEWING_ITEMS.map((item, index) => (
          <li key={item}>
            <label>
              <input
                type="checkbox"
                checked={Boolean(checked[index])}
                onChange={() => toggle(index)}
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <label className="ja-view-notes">
        <span>Заметки по объекту</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Адрес, что уточнить у менеджера…"
        />
      </label>
      <div className="ja-view-check-actions">
        <button type="button" className="ja-btn-secondary" onClick={printList}>
          Сохранить список
        </button>
        <Link href="/catalog" className="ja-text-link">
          Посмотреть комплектацию домов в продаже →
        </Link>
      </div>
    </div>
  );
}

const QUIZ = [
  {
    id: "speed",
    label: "Хочу заехать максимально быстро",
    tip: "Смотрите объекты с максимальной готовностью и заранее заложите короткий чистовой.",
  },
  {
    id: "design",
    label: "Хочу сам выбрать стиль и материалы",
    tip: "Предчистовая — ваш формат. Сверьте список работ в договоре и считайте бюджет финиша отдельно.",
  },
  {
    id: "cheap",
    label: "Хочу минимальную цену входа",
    tip: "Черновая дешевле на старте, но с ремонтом часто выходит дольше и суммарно дороже.",
  },
  {
    id: "balance",
    label: "Нужен баланс: не пыль, но свой ремонт",
    tip: "Классическая предчистовая. На просмотре пройдитесь по стенам, стяжке и электрике.",
  },
];

export function FinishQuiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const answer = QUIZ.find((q) => q.id === selected);

  return (
    <div className="ja-quiz">
      <p className="ja-quiz-title">Что для вас важнее?</p>
      <div className="ja-quiz-grid">
        {QUIZ.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item.id)}
            className={cn("ja-quiz-option", selected === item.id && "is-active")}
          >
            {item.label}
          </button>
        ))}
      </div>
      {answer ? (
        <div className="ja-card">
          <p>{answer.tip}</p>
        </div>
      ) : null}
    </div>
  );
}

export function FinishHousesCta() {
  return (
    <div className="ja-houses-cta">
      <div className="ja-houses-cta-photo">
        <HouseImage
          src="/images/design-kit/07-pre-finish-interior.jpg"
          alt="Предчистовая отделка"
          fill
          objectFit="cover"
          sizes="280px"
        />
      </div>
      <div>
        <h3>Посмотрите, как это выполнено в наших домах</h3>
        <p>
          В каталоге — объекты с подготовкой под чистовой ремонт. На просмотре
          покажем стены, стяжку и инженерию на месте.
        </p>
        <Link href="/catalog" className="ja-btn-primary">
          Смотреть дома
        </Link>
      </div>
    </div>
  );
}

export function OtdelkaRelatedHouses() {
  const houses = useMemo(
    () =>
      realHouses
        .filter((h) => /отделк|предчист|под ваш/i.test(h.specs.repair))
        .slice(0, 3),
    []
  );

  if (!houses.length) return null;

  return (
    <section className="ja-related-houses">
      <h2 className="ja-h2">Дома с предчистовой отделкой</h2>
      <p className="ja-lead">
        Объекты, где в комплектации указана подготовка под вашу отделку. Состав
        работ уточняйте в карточке и на просмотре.
      </p>
      <div className="ja-related-houses-grid">
        {houses.map((house) => (
          <div key={house.id} className="ja-related-house">
            <HomeHouseCard house={house} />
            <p className="ja-related-house-meta">
              {house.city} · {house.area} м² · {house.specs.repair}
            </p>
            <Link href={`/catalog/${house.id}`} className="ja-text-link">
              Состав работ и просмотр →
            </Link>
          </div>
        ))}
      </div>
      <p className="ja-related-houses-foot">
        <Link href="/#viewing" className="ja-btn-secondary">
          Посмотреть отделку на просмотре дома
        </Link>
      </p>
    </section>
  );
}
