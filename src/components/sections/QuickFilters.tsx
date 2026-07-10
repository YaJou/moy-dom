"use client";

import { quickFilters } from "@/data/site";
import Link from "next/link";

export function QuickFilters() {
  return (
    <section className="bg-white pb-2 pt-4 sm:pt-6">
      <div className="container-main">
        <p className="mb-3 text-sm font-medium text-gray">Сейчас в продаже</p>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <Link
              key={filter.href}
              href={filter.href}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-dark transition-colors hover:border-primary hover:bg-primary-light hover:text-primary"
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
