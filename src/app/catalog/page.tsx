import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogPageClient } from "./CatalogPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Каталог готовых домов",
  description:
    "Каталог готовых частных домов в Энгельсе, Саратове и Балаково. Фильтр по цене, площади, количеству комнат и готовности. Ипотека и рассрочка.",
  path: "/catalog/",
});

export default function CatalogPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог домов" },
        ]}
      />
      <section className="bg-white pb-2 pt-2 sm:pb-4">
        <div className="container-main">
          <h1 className="section-title">Каталог домов</h1>
          <p className="mt-2 text-sm text-gray sm:text-base">
            Готовые частные дома в Энгельсе, Саратове и Балаково — с участком,
            коммуникациями, ипотекой и рассрочкой.
          </p>
        </div>
      </section>
      <Suspense
        fallback={
          <div className="container-main py-16 text-center text-gray">
            Загрузка каталога…
          </div>
        }
      >
        <CatalogPageClient />
      </Suspense>
    </>
  );
}
