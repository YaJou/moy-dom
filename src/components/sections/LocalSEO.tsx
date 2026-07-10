import { localSeoData } from "@/data/site";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export function LocalSEO() {
  return (
    <section className="section-padding border-t border-border bg-background">
      <div className="container-main">
        <h2 className="section-title mb-8 sm:mb-10">
          Дома в наших регионах
        </h2>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7">
          {localSeoData.map((item) => (
            <article
              key={item.id}
              className="rounded-card border border-border bg-white p-5 shadow-card sm:p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {item.housesCount} домов
                </span>
              </div>
              <h3 className="text-xl font-bold text-dark">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
              >
                Смотреть дома в {item.city}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
