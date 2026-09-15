import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SavedPageClient } from "./SavedPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Сохранённые дома",
  description:
    "Ваша подборка домов без регистрации. Можно поделиться ссылкой с семьёй.",
  path: "/saved/",
});

export default function SavedPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: "/catalog/" },
          { label: "Сохранённые" },
        ]}
      />
      <Suspense
        fallback={
          <div className="container-main py-16 text-center text-gray">
            Загрузка…
          </div>
        }
      >
        <SavedPageClient />
      </Suspense>
    </>
  );
}
