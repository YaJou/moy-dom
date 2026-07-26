import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogPageClient } from "./CatalogPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Каталог готовых домов",
  description:
    "Каталог готовых частных домов в Саратове, Энгельсе и Балаково. Фильтр по цене, площади, количеству комнат и готовности. Ипотека и рассрочка.",
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
