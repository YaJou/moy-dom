import { HouseMortgageCalculator } from "@/components/house/HouseMortgageCalculator";
import type { HouseDetailContent } from "@/data/house-detail";
import type { House } from "@/types/house";
import { CheckCircle2 } from "lucide-react";

interface HouseMortgageSectionProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseMortgageSection({ house, detail }: HouseMortgageSectionProps) {
  return (
    <section className="mt-10" id="house-mortgage">
      <HouseMortgageCalculator house={house} />
      <div className="mt-6 rounded-card border border-border bg-white p-5 sm:p-6">
        <h3 className="text-lg font-bold text-dark">
          Почему ипотеку выгоднее оформить через нас
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {detail.mortgageBenefits.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-dark">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
