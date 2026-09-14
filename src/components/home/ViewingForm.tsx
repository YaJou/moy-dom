"use client";

import {
  ConsentCheckbox,
  PrivacyPolicyLink,
} from "@/components/legal/ConsentCheckbox";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { IconTelegram } from "./icons";

export interface ViewingFormContext {
  houseId?: number;
  houseUrl?: string;
  city?: string;
  filters?: string;
  calculator?: string;
}

interface ViewingFormProps {
  id?: string;
  className?: string;
  defaultCity?: string;
  context?: ViewingFormContext;
  compact?: boolean;
  onSuccess?: () => void;
}

type ContactMethod = "phone" | "telegram";

export function ViewingForm({
  id,
  className,
  defaultCity = "Балаково",
  context,
  compact = false,
  onSuccess,
}: ViewingFormProps) {
  const formId = useId();
  const [city, setCity] = useState(defaultCity);
  const [method, setMethod] = useState<ContactMethod>("phone");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (context?.city) setCity(context.city);
  }, [context?.city]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    if (!contact.trim()) {
      setError(
        method === "phone"
          ? "Укажите телефон для звонка"
          : "Укажите username или ссылку Telegram"
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const body = {
        type: "viewing",
        city,
        method,
        contact: contact.trim(),
        name: name.trim() || undefined,
        comment: comment.trim() || undefined,
        context,
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("server");
      }

      analytics.leadSuccess("viewing");
      setSubmitted(true);
      onSuccess?.();
    } catch {
      analytics.leadError("viewing", "server");
      setError("Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={cn("rounded-panel bg-surface p-6 text-center", className)}>
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-success" />
        <h3 className="text-lg font-bold text-text">Заявка отправлена</h3>
        <p className="mt-2 text-sm text-muted">
          Мы свяжемся с вами для согласования просмотра.
        </p>
        <button
          type="button"
          className="btn-secondary mt-6 w-full"
          onClick={() => {
            setSubmitted(false);
            setContact("");
            setName("");
            setComment("");
            setConsent(false);
          }}
        >
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={cn("rounded-panel bg-surface p-6", className)}
    >
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
        <div>
          <label htmlFor={`${formId}-city`} className="field-label">
            Выберите город
          </label>
          <select
            id={`${formId}-city`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="field-input"
          >
            <option>Саратов</option>
            <option>Энгельс</option>
            <option>Балаково</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${formId}-method`} className="field-label">
            Способ связи
          </label>
          <select
            id={`${formId}-method`}
            value={method}
            onChange={(e) => setMethod(e.target.value as ContactMethod)}
            className="field-input"
          >
            <option value="phone">Позвонить</option>
            <option value="telegram">Написать в Telegram</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${formId}-contact`} className="field-label">
          {method === "phone" ? "Телефон" : "Telegram username или ссылка"}
        </label>
        <input
          id={`${formId}-contact`}
          type={method === "phone" ? "tel" : "text"}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className={cn("field-input", error && "border-error")}
          placeholder={method === "phone" ? "+7 (___) ___-__-__" : "@username"}
          autoComplete={method === "phone" ? "tel" : "off"}
        />
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
      </div>

      {!showComment ? (
        <button
          type="button"
          className="mt-3 text-sm font-medium text-muted hover:text-text"
          onClick={() => setShowComment(true)}
        >
          Добавить комментарий
        </button>
      ) : (
        <div className="mt-4">
          <label htmlFor={`${formId}-name`} className="field-label">
            Имя (необязательно)
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field-input"
            autoComplete="name"
          />
          <label htmlFor={`${formId}-comment`} className="field-label mt-4">
            Комментарий (необязательно)
          </label>
          <textarea
            id={`${formId}-comment`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="field-input min-h-[96px] resize-none py-3"
          />
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
          className="btn-secondary flex-1 min-w-[120px]"
          onClick={() => analytics.contactClick("phone")}
        >
          Позвонить
        </a>
        <a
          href={siteConfig.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1 min-w-[120px]"
          onClick={() => analytics.contactClick("telegram")}
        >
          Написать
        </a>
      </div>

      <ConsentCheckbox
        id={`${formId}-consent`}
        checked={consent}
        onChange={setConsent}
        className="mt-4"
      >
        Я соглашаюсь на обработку персональных данных согласно{" "}
        <PrivacyPolicyLink />.
      </ConsentCheckbox>

      <button
        type="submit"
        disabled={!consent || loading}
        className="btn-primary mt-4 w-full disabled:opacity-50"
      >
        {loading ? "Отправка…" : "Записаться на просмотр"}
      </button>

      {context?.houseUrl && (
        <input type="hidden" name="houseUrl" value={context.houseUrl} readOnly />
      )}
    </form>
  );
}

export function ViewingFormTelegramLink() {
  return (
    <Link
      href={siteConfig.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 text-base font-medium text-text hover:text-forest"
      onClick={() => analytics.contactClick("telegram")}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088cc]/10 text-[#0088cc]">
        <IconTelegram />
      </span>
      Можно написать в Telegram
    </Link>
  );
}
