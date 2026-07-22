import { partnersData } from "@/data/site";
import { getCityCatalogHref } from "@/lib/catalog-urls";
import type { House } from "@/types/house";
import {
  CheckCircle2,
  Droplets,
  Home,
  Shield,
  Trees,
} from "lucide-react";
import Link from "next/link";

const includedItems = [
  { icon: Home, text: "Дом" },
  { icon: Trees, text: "Земельный участок в стоимости" },
  { icon: Droplets, text: "Скважина и выгребная яма" },
  { icon: Home, text: "Пластиковые окна и дверь" },
  { icon: Shield, text: "Оформление документов" },
];

interface HousePageContentProps {
  house: House;
}

export function HouseIncluded({ house }: HousePageContentProps) {
  return (
    <div className="rounded-card border border-border bg-background p-5 sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-dark">Что входит в стоимость</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {includedItems.map((item) => (
          <div key={item.text} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm text-dark">{item.text}</span>
          </div>
        ))}
      </div>
      {house.specs.terrace && (
        <p className="mt-4 text-sm text-gray">
          Также: {house.specs.terrace}, металлочерепица, кирпичная облицовка
        </p>
      )}
    </div>
  );
}

export function HouseHighlightsBar({ house }: HousePageContentProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {house.highlights.map((item) => (
        <span
          key={item}
          className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5 text-xs font-medium text-primary sm:px-4 sm:py-2 sm:text-sm"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {item}
        </span>
      ))}
    </div>
  );
}

export function HouseBanks() {
  return (
    <div className="rounded-card border border-border bg-white p-5 shadow-card sm:p-6">
      <h2 className="mb-2 text-xl font-bold text-dark">
        Аккредитация в банках
      </h2>
      <p className="mb-4 text-sm text-gray">
        Поможем с одобрением ипотеки в партнёрских банках
      </p>
      <div className="flex flex-wrap gap-2">
        {partnersData.map((bank) => (
          <span
            key={bank.id}
            className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-dark"
          >
            {bank.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HouseQuickLinks({ house }: HousePageContentProps) {
  const floorLabel =
    house.specs.floors === 1 ? "Одноэтажные" : "Двухэтажные";
  const links = [
    { label: `Все дома в ${house.city}`, href: getCityCatalogHref(house.city) },
    { label: floorLabel, href: "/catalog/one-story" },
    { label: `Дома до ${house.area} м²`, href: `/catalog?area=100+–+150+м²` },
    { label: "Калькулятор ипотеки", href: "/#mortgage" },
    { label: "Статьи об ипотеке", href: "/blog/ipoteka" },
    { label: "Заказать просмотр", href: "/#consultation" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-dark transition-colors hover:border-primary hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
