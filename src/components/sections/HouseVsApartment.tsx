import { houseVsApartmentData } from "@/data/homepage";
import { Check, X } from "lucide-react";

export function HouseVsApartment() {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <h2 className="section-title mb-8 text-center sm:mb-10">
          {houseVsApartmentData.title}
        </h2>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-card border border-border bg-white shadow-card">
          <div className="grid grid-cols-2 border-b border-border bg-background text-center text-sm font-semibold text-dark sm:text-base">
            <div className="border-r border-border px-4 py-4">Квартира</div>
            <div className="px-4 py-4 text-primary">Дом</div>
          </div>
          {houseVsApartmentData.rows.map((row, i) => (
            <div
              key={row.house}
              className={`grid grid-cols-2 ${i < houseVsApartmentData.rows.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex min-w-0 items-center gap-2 border-r border-border px-3 py-3.5 text-sm text-gray sm:px-5 sm:py-4">
                <X className="h-4 w-4 shrink-0 text-red-400" />
                <span className="min-w-0 break-words">{row.apartment}</span>
              </div>
              <div className="flex min-w-0 items-center gap-2 px-3 py-3.5 text-sm font-medium text-dark sm:px-5 sm:py-4">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0 break-words">{row.house}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
