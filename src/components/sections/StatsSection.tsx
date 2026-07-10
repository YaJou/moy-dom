import { statsData } from "@/data/site";
import { StatItem } from "@/components/sections/Stats";

export function StatsSection() {
  return (
    <section className="border-y border-border bg-background py-10 sm:py-12 lg:py-14">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
          {statsData.map((stat, index) => (
            <div
              key={stat.id}
              className={`${
                index < statsData.length - 1
                  ? "sm:border-r sm:border-border"
                  : ""
              } ${index % 2 === 0 ? "border-r border-border sm:border-r" : ""}`}
            >
              <StatItem value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
