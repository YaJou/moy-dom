import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { HouseCard } from "@/components/cards/HouseCard";
import { buildPageMetadata } from "@/lib/seo";
import { realHouses } from "@/data/houses";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Построенные дома",
  description:
    "Готовые и строящиеся частные дома Кров-Сервис в Энгельсе, Саратове и Балаково. Фото объектов, цены и характеристики.",
  path: "/built/",
});

export default function BuiltPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Построенные дома" },
        ]}
      />
      <section className="section-padding bg-white">
        <div className="container-main">
          <h1 className="section-title">Построенные дома</h1>
          <p className="mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Актуальные объекты в каталоге — с фото, планировкой и условиями
            покупки. Больше вариантов смотрите в полном каталоге.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {realHouses.map((house, index) => (
              <HouseCard key={house.id} {...house} priority={index < 2} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/catalog/" className="btn-primary">
              Весь каталог
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
