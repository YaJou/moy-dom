import { BuildCalculator } from "@/components/construction/BuildCalculator";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { siteConfig } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Строительство домов под заказ",
  description:
    "Строим частные дома под клиента в Энгельсе, Саратове и Балаково. Примерный калькулятор стоимости: размеры, высота, кровля, окна и материал стен.",
  path: "/stroitelstvo/",
});

const points = [
  "Проектируем и строим дом под ваши задачи — не только готовые объекты из каталога",
  "Считаем ориентир по площади, высоте, кровле, окнам и стенам",
  "После расчёта согласуем планировку, смету и сроки на встрече",
] as const;

export default function StroitelstvoPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Строительство домов" },
        ]}
      />

      <section className="bc-page">
        <div className="container-main">
          <header className="bc-hero">
            <p className="bc-kicker">{siteConfig.name}</p>
            <h1 className="bc-h1">Строительство домов под заказ</h1>
            <p className="bc-lead">
              Мы строим под клиента: можно взять готовый дом из каталога или
              заказать свой по размерам и комплектации. Ниже — простой
              калькулятор ориентировочной стоимости коробки.
            </p>
            <ul className="bc-points">
              {points.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </header>

          <BuildCalculator />

          <div className="bc-bottom">
            <div>
              <h2 className="bc-h2">Готовые дома тоже в работе</h2>
              <p>
                Если нужен дом быстрее — смотрите актуальные объекты в каталоге.
                Если нужен именно свой проект — оставьте заявку из калькулятора.
              </p>
            </div>
            <div className="bc-bottom-actions">
              <Link href="/catalog/" className="btn-primary">
                Смотреть каталог
              </Link>
              <Link href="/built/" className="bc-link-btn">
                Построенные дома
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
