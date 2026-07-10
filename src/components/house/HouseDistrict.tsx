import type { HouseDetailContent } from "@/data/house-detail";

interface HouseDistrictProps {
  detail: HouseDetailContent;
}

export function HouseDistrict({ detail }: HouseDistrictProps) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">Район</h2>
      <div className="mt-5 rounded-card border border-border bg-background p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-dark">{detail.district.title}</h3>
        <div className="mt-4 space-y-3">
          {detail.district.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-gray sm:text-base">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
