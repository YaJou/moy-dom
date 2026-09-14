import { realHouses } from "@/data/houses";
import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./icons";

const stages = [
  {
    title: "Надёжный фундамент из железобетона",
    image: "/images/houses/balakovo-novonatalino-100/09.jpg",
    alt: "Фундамент объекта в Натальино",
  },
  {
    title: "Качественная кладка стен из кирпича",
    image: "/images/houses/balakovo-novonatalino-100/10.jpg",
    alt: "Кладка стен объекта",
  },
  {
    title: "Инженерные системы на объекте",
    image: "/images/houses/balakovo-novonatalino-100/11.jpg",
    alt: "Инженерные работы",
  },
];

export function HomeConstruction() {
  const sample = realHouses.find((h) => h.slug === "balakovo-novonatalino-100");

  return (
    <section id="construction" className="bg-surface py-12">
      <div className="container-main">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div>
            <h2 className="h2-desktop text-text">
              Качество видно ещё до отделки
            </h2>
            <p className="mt-4 text-base leading-[25px] text-text">
              Показываем материалы и этапы строительства наших домов
              {sample ? ` — на примере ${sample.district}` : ""}.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-text">
              {["Фундамент и стены", "Утепление и кровля", "Инженерные системы"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                    {item}
                  </li>
                )
              )}
            </ul>
            <Link
              href="/built/"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-orange"
            >
              Как мы строим
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stages.map((stage) => (
              <figure key={stage.title}>
                <div className="relative aspect-[261/220] overflow-hidden rounded-image">
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 240px, 261px"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted">
                  {stage.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
