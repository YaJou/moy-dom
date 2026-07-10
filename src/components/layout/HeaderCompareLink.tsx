"use client";

import { MAX_COMPARE, useCompare } from "@/context/CompareContext";
import { GitCompareArrows } from "lucide-react";
import Link from "next/link";

export function HeaderCompareLink() {
  const { compareIds } = useCompare();
  const count = compareIds.length;

  return (
    <Link
      href={count > 0 ? `/compare?ids=${compareIds.join(",")}` : "/compare"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-gray transition-colors hover:border-primary hover:text-primary lg:hidden"
      aria-label="Сравнение домов"
    >
      <GitCompareArrows className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export function HeaderCompareLinkDesktop() {
  const { compareIds } = useCompare();
  const count = compareIds.length;

  if (count === 0) return null;

  return (
    <Link
      href={`/compare?ids=${compareIds.join(",")}`}
      className="hidden items-center gap-1.5 rounded-full border border-primary bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white lg:flex"
    >
      <GitCompareArrows className="h-3.5 w-3.5" />
      Сравнить ({count}/{MAX_COMPARE})
    </Link>
  );
}
