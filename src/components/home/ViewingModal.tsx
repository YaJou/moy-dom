"use client";

import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import type { ViewingFormContext } from "./ViewingForm";
import { ViewingForm } from "./ViewingForm";

interface ViewingModalProps {
  open: boolean;
  onClose: () => void;
  context?: ViewingFormContext;
  defaultCity?: string;
}

export function ViewingModal({
  open,
  onClose,
  context,
  defaultCity,
}: ViewingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isCallback = context?.intent === "callback";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      analytics.viewingFormOpen(isCallback ? "callback" : "modal");
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, isCallback]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "fixed inset-0 z-50 m-auto w-[min(520px,calc(100%-32px))] max-h-[90vh] overflow-y-auto rounded-card border-0 bg-surface p-8 shadow-float backdrop:bg-[rgba(18,30,24,.45)]",
        "open:animate-in"
      )}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-control text-muted hover:bg-page hover:text-text"
        aria-label="Закрыть"
      >
        ×
      </button>
      <h2 className="h3-panel pr-10 text-text">
        {isCallback ? "Обратный звонок" : "Записаться на просмотр"}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {isCallback
          ? "Выберите тему — менеджер перезвонит и поможет"
          : "Выберите дом и удобный способ связи"}
      </p>
      <ViewingForm
        key={`${context?.intent ?? "viewing"}-${context?.houseId ?? "none"}-${context?.topic ?? ""}`}
        className="mt-6 p-0 shadow-none"
        context={context}
        defaultCity={defaultCity}
        compact
        onDone={onClose}
      />
    </dialog>
  );
}
