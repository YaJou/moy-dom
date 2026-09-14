import { realHouses } from "@/data/houses";
import { HouseImage } from "@/components/ui/HouseImage";
import { ArrowRight, Droplets, Home, Paintbrush, Wrench } from "lucide-react";
import Link from "next/link";

const sampleHouse =
  realHouses.find((h) => h.slug === "balakovo-novonatalino-100") ??
  realHouses[0];

const interiorPhoto =
  sampleHouse.images.find((img) => img.includes("07.jpg")) ??
  sampleHouse.images.find((img) => img.includes("06.jpg")) ??
  sampleHouse.image;

const rows = [
  {
    icon: Home,
    title: "Дом и участок",
    description: "Площадь и границы в карточке каждого объекта",
  },
  {
    icon: Droplets,
    title: "Коммуникации",
    description: "Фактический статус подключения указан в характеристиках",
  },
  {
    icon: Paintbrush,
    title: "Предчистовая отделка",
    description: "Подробный список выполненных работ — в карточке дома",
  },
  {
    icon: Wrench,
    title: "До переезда",
    description: "Чистовой ремонт и подключение газа — по вашему выбору",
  },
];

export function HomePackage() {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="container-main">
        <p className="eyebrow">Комплектация дома</p>
        <h2 className="section-title mt-3">
          Что вы получаете вместе с домом
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="relative aspect-[588/320] overflow-hidden rounded-image lg:h-[320px] lg:aspect-auto">
            <HouseImage
              src={interiorPhoto}
              alt={`Интерьер — ${sampleHouse.title}`}
              fill
              objectFit="cover"
              sizes="(max-width: 1024px) 100vw, 588px"
            />
          </div>

          <div>
            {rows.map((row) => (
              <div
                key={row.title}
                className="flex min-h-[72px] gap-3 border-b border-border py-4"
              >
                <row.icon
                  className="mt-0.5 h-6 w-6 shrink-0 text-orange"
                  strokeWidth={1.75}
                />
                <div>
                  <p className="text-base font-semibold leading-6 text-text">
                    {row.title}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-muted">
                    {row.description}
                  </p>
                </div>
              </div>
            ))}
            <Link
              href={`/catalog/${sampleHouse.id}#included`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-text hover:text-orange"
            >
              Посмотреть комплектацию
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
