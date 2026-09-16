import { HouseImage } from "@/components/ui/HouseImage";
import { realHouses } from "@/data/houses";
import { ArrowUpRight, Building2, Layers, Pipette } from "lucide-react";
import Link from "next/link";

const photos = [
  {
    src: "/images/houses/engels-snt-malinki-troitskaya-100/08.jpg",
    caption: "Фундамент и стены — дом 100 м², СНТ «Малинки»",
    house: realHouses.find((h) => h.id === 2),
  },
  {
    src: "/images/houses/engels-snt-malinki-troitskaya-100/09.jpg",
    caption: "Кирпичная облицовка — дом 100 м², СНТ «Малинки»",
    house: realHouses.find((h) => h.id === 2),
  },
  {
    src: "/images/houses/engels-snt-malinki-troitskaya-100/10.jpg",
    caption: "Инженерные системы — дом 100 м², СНТ «Малинки»",
    house: realHouses.find((h) => h.id === 2),
  },
];

const points = [
  { icon: Building2, label: "Фундамент и стены" },
  { icon: Layers, label: "Утепление и кровля" },
  { icon: Pipette, label: "Инженерные системы" },
];

export function ConstructionQuality() {
  return (
    <section id="construction" className="bg-surface py-12 md:py-16">
      <div className="container-main">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div>
            <h2 className="section-title">
              Качество видно ещё до отделки
            </h2>
            <p className="mt-4 text-base leading-[25px] text-text">
              Показываем реальные этапы строительства на объектах каталога —
              без стоковых фото и скрытых работ.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li
                  key={point.label}
                  className="flex items-center gap-2 text-sm font-medium text-text"
                >
                  <point.icon
                    className="h-5 w-5 text-orange"
                    strokeWidth={1.75}
                  />
                  {point.label}
                </li>
              ))}
            </ul>
            <Link
              href="/about/"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-text hover:text-orange"
            >
              Как мы строим
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {photos.map((photo) => (
              <div key={photo.src}>
                <div className="relative aspect-[261/220] overflow-hidden rounded-image">
                  <HouseImage
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    objectFit="cover"
                    sizes="261px"
                  />
                </div>
                <p className="mt-3 text-sm leading-5 text-muted">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
