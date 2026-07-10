"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/site";

export function FAQ() {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-main">
        <h2 className="section-title mb-8 sm:mb-10 lg:mb-12">
          Часто задаваемые вопросы
        </h2>

        <div className="mx-auto max-w-5xl">
          <div className="rounded-card bg-white p-4 shadow-card sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-x-10">
              <Accordion type="single" collapsible className="w-full">
                {faqData.slice(0, 3).map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Accordion type="single" collapsible className="w-full">
                {faqData.slice(3).map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
