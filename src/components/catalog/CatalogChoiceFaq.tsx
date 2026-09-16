import type { ReactNode } from "react";
import Link from "next/link";

const FAQ_ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: "Участок входит в указанную цену?",
    a: (
      <>
        Да. В каталоге цена дома уже с участком. Площадь участка указана в
        карточке и в блоке{" "}
        <Link href="#price-included" className="font-semibold text-orange hover:underline">
          «Что входит в стоимость»
        </Link>
        .
      </>
    ),
  },
  {
    q: "Чем отличаются комплектации?",
    a: (
      <>
        Главное — отделка (черновая / под вашу отделку) и статус газа
        (подключён, по границе или планируется). Сравните состав по каждому
        дому в блоке выше или в карточке объекта.
      </>
    ),
  },
  {
    q: "Как узнать, что с коммуникациями?",
    a: (
      <>
        В карточке дома и в составе цены указаны фактические статусы воды,
        канализации, электричества и газа. На просмотре покажем, что уже
        сделано на участке.
      </>
    ),
  },
  {
    q: "Можно ли посмотреть несколько домов?",
    a: (
      <>
        Да. Сохраните или отметьте для сравнения понравившиеся — внизу каталога
        можно сразу договориться о просмотре выбранных объектов.
      </>
    ),
  },
  {
    q: "Можно ли приехать со своим специалистом?",
    a: (
      <>
        Можно. На просмотре удобно взять строителя или инженера — осмотрите
        конструкцию, коммуникации и участок вместе.
      </>
    ),
  },
];

export function CatalogChoiceFaq() {
  return (
    <section className="border-t border-border bg-page py-12 sm:py-14">
      <div className="container-main">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-12">
          <div>
            <h2 className="h2-desktop font-extrabold text-text">
              Что спрашивают перед просмотром
            </h2>
            <p className="mt-3 text-base text-muted">
              Короткие ответы про выбор дома и условия
            </p>
          </div>
          <div className="divide-y divide-border">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-text marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 max-w-2xl pr-8 text-sm leading-relaxed text-muted">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
