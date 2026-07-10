"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { miniFaqData } from "@/data/site";
import Link from "next/link";

export function MiniFAQ() {
  const mortgage = miniFaqData.filter((item) => item.category === "mortgage");
  const plot = miniFaqData.filter((item) => item.category === "plot");

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <h2 className="section-title mb-8 sm:mb-10">
          Вопросы по ипотеке и участкам
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-card border border-border bg-background p-4 sm:p-6">
            <h3 className="mb-4 text-lg font-semibold text-dark">Ипотека</h3>
            <Accordion type="single" collapsible>
              {mortgage.map((item) => (
                <AccordionItem key={item.id} value={`m-${item.id}`}>
                  <AccordionTrigger className="text-sm sm:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="rounded-card border border-border bg-background p-4 sm:p-6">
            <h3 className="mb-4 text-lg font-semibold text-dark">Участки</h3>
            <Accordion type="single" collapsible>
              {plot.map((item) => (
                <AccordionItem key={item.id} value={`p-${item.id}`}>
                  <AccordionTrigger className="text-sm sm:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray">
          Больше ответов — в разделе{" "}
          <Link href="#faq" className="font-medium text-primary hover:underline">
            Часто задаваемые вопросы
          </Link>
        </p>
      </div>
    </section>
  );
}
