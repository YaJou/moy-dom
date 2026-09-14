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
    <section className="hp-section" id="faq">
      <h2 className="hp-h2">Частые вопросы</h2>
      <Accordion type="single" collapsible className="mt-5 w-full">
        {detail.faq.map((item, i) => (
          <AccordionItem key={item.question} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm sm:text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
