import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { ComparePageClient } from "./ComparePageClient";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Сравнение домов",
    description:
      "Сравните до 3 готовых домов по цене, площади, участку, коммуникациям и ипотеке.",
    path: "/compare/",
  }),
  robots: { index: false, follow: true },
};

export default function ComparePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Сравнение" },
        ]}
      />
      <section className="bg-white pt-2">
        <div className="container-main">
          <h1 className="section-title">Сравнение домов</h1>
          <p className="mt-2 text-sm text-gray sm:text-base">
            Сравните до 3 объектов по цене, площади, участку и коммуникациям.
          </p>
        </div>
      </section>
      <Suspense
        fallback={
          <div className="container-main py-16 text-center text-gray">
            Загрузка сравнения…
          </div>
        }
      >
        <ComparePageClient />
      </Suspense>
    </>
  );
}
