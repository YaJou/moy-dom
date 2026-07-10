import type { Metadata } from "next";
import { Suspense } from "react";
import { ComparePageClient } from "./ComparePageClient";

export const metadata: Metadata = {
  title: "Сравнение домов",
  description:
    "Сравните до 3 готовых домов по цене, площади, участку, коммуникациям и ипотеке.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="container-main py-16 text-center text-gray">
          Загрузка сравнения…
        </div>
      }
    >
      <ComparePageClient />
    </Suspense>
  );
}
