import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { HouseDetailContent } from "@/data/house-detail";

interface HouseFAQProps {
  detail: HouseDetailContent;
}

export function HouseFAQ({ detail }: HouseFAQProps) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">
        Частые вопросы
      </h2>
      <Accordion type="single" collapsible className="mt-5 w-full">
        {detail.faq.map((item, i) => (
          <AccordionItem key={item.question} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm sm:text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
