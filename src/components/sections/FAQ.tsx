"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/site";

const homepageFaq = [
  faqData.find((item) => item.question.includes("входит в стоимость")),
  {
    id: 100,
    question: "Что нужно сделать до переезда?",
    answer:
      "Дом продаётся с предчистовой отделкой: остаётся чистовой ремонт по вашему вкусу, подключение газа по стандартной процедуре и меблировка. Точный список работ — в карточке каждого объекта.",
  },
  {
    id: 101,
    question: "Можно ли приехать на просмотр?",
    answer:
      "Да. Оставьте заявку на сайте, напишите в Telegram или позвоните — согласуем удобное время и покажем дом с участком.",
  },
  ...faqData.filter(
    (item) =>
      !item.question.includes("входит в стоимость") &&
      item.id !== 7
  ),
].filter(Boolean).slice(0, 8);

export function FAQ() {
  return (
    <section id="faq" className="bg-page py-10 md:py-12">
      <div className="container-main">
        <div className="grid gap-8 lg:grid-cols-[384px_1fr] lg:gap-12">
          <div>
            <h2 className="section-title">
              Перед покупкой обычно спрашивают
            </h2>
            <p className="mt-3 text-base text-muted">
              Ответы на основе данных компании и карточек объектов
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {homepageFaq.map((item) =>
              item ? (
                <AccordionItem
                  key={item.id}
                  value={`item-${item.id}`}
                  className="min-h-14 border-b border-border"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-text hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ) : null
            )}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
