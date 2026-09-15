"use client";

import {
  ConsentCheckbox,
  PrivacyPolicyLink,
} from "@/components/legal/ConsentCheckbox";
import { Select } from "@/components/ui/Select";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";
import { submitLead } from "@/lib/lead-api";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { IconCheck, IconTelegram } from "./icons";

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
  defaultCity = "Энгельс",
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

      const res = await submitLead(body);

      if (!res.ok) {
        throw new Error("server");
      }

      analytics.leadSuccess("viewing");
      setSubmitted(true);
      onSuccess?.();
    } catch {
      analytics.leadError("viewing", "server");
      setError(
        "Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={cn("viewing-form-card text-center", className)}>
        <IconCheck className="mx-auto mb-4 h-12 w-12 text-success" />
        <h3 className="text-lg font-extrabold text-text">Заявка отправлена</h3>
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
      className={cn("viewing-form-card", className)}
    >
      <div className="viewing-form-fields">
        <div className="viewing-form-field">
          <label htmlFor={`${formId}-city`} className="viewing-form-label">
            Город
          </label>
          <Select
            id={`${formId}-city`}
            value={city}
            onChange={setCity}
            options={["Энгельс", "Саратов", "Балаково"]}
            aria-label="Город"
          />
        </div>

        <div className="viewing-form-field">
          <label htmlFor={`${formId}-contact`} className="viewing-form-label">
            {method === "phone" ? "Телефон" : "Telegram"}
          </label>
          <input
            id={`${formId}-contact`}
            type={method === "phone" ? "tel" : "text"}
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              if (error) setError(null);
            }}
            className={cn("viewing-form-input", error && "is-error")}
            placeholder={
              method === "phone" ? "+7 (___) ___-__-__" : "@username"
            }
            autoComplete={method === "phone" ? "tel" : "off"}
          />
          {error && <p className="viewing-form-error">{error}</p>}
        </div>
      </div>

      <div className="viewing-form-meta">
        <div
          className={cn(
            "viewing-method-toggle",
            method === "telegram" && "is-telegram"
          )}
          role="group"
          aria-label="Способ связи"
        >
          <span className="viewing-method-thumb" aria-hidden />
          <button
            type="button"
            className={cn(
              "viewing-method-btn",
              method === "phone" && "is-active"
            )}
            onClick={() => {
              setMethod("phone");
              setError(null);
            }}
          >
            Позвонить
          </button>
          <button
            type="button"
            className={cn(
              "viewing-method-btn",
              method === "telegram" && "is-active"
            )}
            onClick={() => {
              setMethod("telegram");
              setError(null);
            }}
          >
            Написать
          </button>
        </div>

        <ConsentCheckbox
          id={`${formId}-consent`}
          checked={consent}
          onChange={setConsent}
          className="viewing-form-consent"
        >
          Я соглашаюсь с{" "}
          <PrivacyPolicyLink />
        </ConsentCheckbox>
      </div>

      {!compact && (
        <>
          {!showComment ? (
            <button
              type="button"
              className="viewing-form-comment-toggle"
              onClick={() => setShowComment(true)}
            >
              Добавить комментарий
            </button>
          ) : (
            <div className="viewing-form-fields viewing-form-fields-extra">
              <div className="viewing-form-field">
                <label htmlFor={`${formId}-name`} className="viewing-form-label">
                  Имя
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="viewing-form-input"
                  placeholder="Необязательно"
                  autoComplete="name"
                />
              </div>
              <div className="viewing-form-field">
                <label
                  htmlFor={`${formId}-comment`}
                  className="viewing-form-label"
                >
                  Комментарий
                </label>
                <textarea
                  id={`${formId}-comment`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="viewing-form-input viewing-form-textarea"
                  placeholder="Необязательно"
                />
              </div>
            </div>
          )}
        </>
      )}

      <button
        type="submit"
        disabled={!consent || loading}
        className="viewing-form-submit"
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
      className="viewing-telegram-link"
      onClick={() => analytics.contactClick("telegram")}
    >
      <span className="viewing-telegram-icon">
        <IconTelegram className="h-5 w-5" />
      </span>
      Можно написать в Telegram
    </Link>
  );
}
