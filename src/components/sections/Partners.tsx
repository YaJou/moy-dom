import { partnersData } from "@/data/site";
import { Building2 } from "lucide-react";

export function Partners() {
  return (
    <section className="section-padding border-y border-border bg-white">
      <div className="container-main">
        <h2 className="section-title mb-8 text-center sm:mb-10">
          Наши партнёры
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {partnersData.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center rounded-card border border-border bg-background px-4 py-5 text-center transition-shadow hover:shadow-card"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-semibold text-dark">{partner.name}</p>
              <p className="mt-1 text-xs text-gray">{partner.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
