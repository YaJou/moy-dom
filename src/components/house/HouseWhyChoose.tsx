import type { HouseDetailContent } from "@/data/house-detail";
import { Check } from "lucide-react";

interface HouseWhyChooseProps {
  detail: HouseDetailContent;
}

export function HouseWhyChoose({ detail }: HouseWhyChooseProps) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">
        Почему стоит выбрать именно этот дом
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {detail.whyChoose.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 rounded-xl border border-border bg-background p-4 text-sm text-dark"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
