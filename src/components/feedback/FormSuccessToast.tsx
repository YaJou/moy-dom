"use client";

import { IconCheck } from "@/components/home/icons";
import {
  subscribeFormSuccess,
  type FormSuccessPayload,
} from "@/lib/form-success";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function FormSuccessToast() {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<FormSuccessPayload>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return subscribeFormSuccess((next) => {
      setPayload(next);
      setOpen(true);
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setOpen(false), 5200);
    return () => window.clearTimeout(id);
  }, [open, payload]);

  if (!mounted || !open) return null;

  const title = payload.title ?? "Форма отправлена";
  const description =
    payload.description ?? "Мы свяжемся с вами в ближайшее время.";

  return createPortal(
    <div
      className="form-success-toast"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="form-success-toast-icon" aria-hidden>
        <IconCheck className="h-5 w-5" />
      </span>
      <div className="form-success-toast-copy">
        <p className="form-success-toast-title">{title}</p>
        <p className="form-success-toast-text">{description}</p>
      </div>
      <button
        type="button"
        className="form-success-toast-close"
        aria-label="Закрыть уведомление"
        onClick={() => setOpen(false)}
      >
        ×
      </button>
    </div>,
    document.body
  );
}
