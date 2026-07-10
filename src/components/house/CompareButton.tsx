"use client";

import { useCompare, MAX_COMPARE } from "@/context/CompareContext";
import { cn } from "@/lib/utils";
import { GitCompareArrows } from "lucide-react";
import { useState } from "react";

interface CompareButtonProps {
  houseId: number;
  variant?: "icon" | "button";
  className?: string;
}

export function CompareButton({
  houseId,
  variant = "button",
  className,
}: CompareButtonProps) {
  const { isInCompare, toggleCompare } = useCompare();
  const [limitHint, setLimitHint] = useState(false);
  const active = isInCompare(houseId);

  const handleClick = () => {
    const added = toggleCompare(houseId);
    if (!added && !active) {
      setLimitHint(true);
      window.setTimeout(() => setLimitHint(false), 2500);
    }
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors",
          active ? "text-primary" : "text-gray hover:text-primary",
          className
        )}
        aria-label={active ? "Убрать из сравнения" : "Добавить к сравнению"}
        title={
          limitHint
            ? `Можно сравнить до ${MAX_COMPARE} домов`
            : active
              ? "Убрать из сравнения"
              : "Добавить к сравнению"
        }
      >
        <GitCompareArrows className={cn("h-4 w-4", active && "text-primary")} />
      </button>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors",
          active
            ? "border-primary bg-primary-light text-primary"
            : "border-border text-dark hover:border-primary hover:text-primary"
        )}
      >
        <GitCompareArrows className="h-4 w-4" />
        {active ? "В сравнении" : "Сравнить"}
      </button>
      {limitHint && (
        <p className="mt-1.5 text-center text-xs text-primary">
          Можно сравнить до {MAX_COMPARE} домов
        </p>
      )}
    </div>
  );
}
