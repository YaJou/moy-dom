import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { BuiltPortfolioPage } from "@/components/built/BuiltPortfolioPage";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Построенные дома — портфолио строительства",
  description:
    "Дома, которые построила Кров-Сервис в Энгельсе, Саратове и Балаково: планировки, материалы, этапы работ и переход к домам в продаже.",
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
      <BuiltPortfolioPage />
    </>
  );
}
