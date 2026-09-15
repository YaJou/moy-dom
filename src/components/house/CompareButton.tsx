"use client";

import { useCompare, MAX_COMPARE } from "@/context/CompareContext";
import { cn } from "@/lib/utils";
import { GitCompareArrows } from "lucide-react";

interface CompareButtonProps {
  houseId: number;
  variant?: "icon" | "button" | "labeled";
  className?: string;
}

export function CompareButton({
  houseId,
  variant = "button",
  className,
}: CompareButtonProps) {
  const { isInCompare, toggleCompare } = useCompare();
  const active = isInCompare(houseId);

  const handleClick = () => {
    toggleCompare(houseId);
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
        aria-label={active ? "Убрать из сравнения" : "Сравнить"}
        title={active ? "Убрать из сравнения" : "Сравнить"}
      >
        <GitCompareArrows className={cn("h-4 w-4", active && "text-primary")} />
      </button>
    );
  }

  if (variant === "labeled") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors",
          active
            ? "border-primary bg-primary-light text-primary"
            : "border-border text-text hover:border-primary hover:text-primary",
          className
        )}
        aria-label={active ? "Убрать из сравнения" : `Сравнить (до ${MAX_COMPARE})`}
      >
        <GitCompareArrows className="h-4 w-4" />
        {active ? "В сравнении" : "Сравнить"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors",
        active
          ? "border-primary bg-primary-light text-primary"
          : "border-border text-dark hover:border-primary hover:text-primary",
        className
      )}
      aria-label={active ? "Убрать из сравнения" : "Сравнить"}
    >
      <GitCompareArrows className="h-4 w-4" />
      {active ? "В сравнении" : "Сравнить"}
    </button>
  );
}
