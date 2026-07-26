import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import { partnersData } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Партнёры и банки",
  description:
    "Банки-партнёры Кров-Сервис для ипотеки на готовый дом: Сбер, Россельхозбанк, ДОМ.РФ, Альфа-Банк и другие.",
  path: "/partners/",
});

export default function PartnersPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Партнёры" },
        ]}
      />
      <section className="section-padding bg-white">
        <div className="container-main">
          <h1 className="section-title">Партнёры</h1>
          <p className="mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Аккредитация в банках помогает быстрее одобрить ипотеку на готовый
            дом. Помогаем собрать документы и пройти сделку.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partnersData.map((partner) => (
              <li
                key={partner.id}
                className="rounded-card border border-border bg-background p-5"
              >
                <h2 className="text-base font-semibold text-dark">
                  {partner.name}
                </h2>
                <p className="mt-1 text-sm text-gray">{partner.type}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
