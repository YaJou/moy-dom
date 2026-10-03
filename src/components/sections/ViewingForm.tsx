"use client";

import { FormSuccessPanel } from "@/components/feedback/FormSuccessPanel";
import { Button } from "@/components/ui/button";
import {
  ConsentCheckbox,
  PrivacyPolicyLink,
} from "@/components/legal/ConsentCheckbox";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";
import { submitLead } from "@/lib/lead-api";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";

type ContactMethod = "call" | "telegram";

/** Legacy section form — теперь тоже пишет в lead.php / Telegram. */
export function ViewingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentPd, setConsentPd] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [method, setMethod] = useState<ContactMethod>("call");
  const [form, setForm] = useState({
    name: "",
    contact: "",
    city: "Саратов",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentPd) return;
    if (!form.contact.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await submitLead({
        type: "viewing",
        city: form.city,
        method: method === "telegram" ? "telegram" : "phone",
        contact: form.contact.trim(),
        name: form.name.trim() || undefined,
        comment: form.message.trim() || undefined,
      });
      if (!res.ok) throw new Error("server");
      setSubmitted(true);
      analytics.leadSuccess("viewing");
      setConsentPd(false);
      setForm({ name: "", contact: "", city: "Саратов", message: "" });
    } catch {
      setError(
        "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам."
      );
      analytics.leadError("viewing", "submit_failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="viewing" className="bg-page py-8 md:py-12">
      <div className="container-main">
        <div className="peach-panel grid min-h-[336px] gap-8 rounded-card p-6 md:grid-cols-[1fr_440px] md:gap-14 md:p-10">
          <div>
            <h2 className="section-title">Посмотрите дом вживую</h2>
            <p className="mt-4 max-w-lg text-lg leading-7 text-muted">
              Выберите город и удобный способ связи. Договоримся о просмотре.
            </p>
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-[#0088cc] hover:underline"
              onClick={() => analytics.contactClick("telegram")}
            >
              Можно написать в Telegram
            </a>
          </div>

          <div className="rounded-panel bg-surface p-5 md:p-6">
            {submitted ? (
              <FormSuccessPanel
                title="Заявка отправлена"
                description="Мы свяжемся с вами в рабочее время."
                secondaryLabel="Отправить ещё"
                onSecondary={() => setSubmitted(false)}
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="view-city" className="field-label">
                    Город
                  </label>
                  <select
                    id="view-city"
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    className="field-input"
                  >
                    <option>Саратов</option>
                    <option>Энгельс</option>
                    <option>Балаково</option>
                  </select>
                </div>

                <div>
                  <span className="field-label">Как связаться</span>
                  <div className="mt-2 flex gap-2">
                    {(
                      [
                        ["call", "Телефон"],
                        ["telegram", "Telegram"],
                      ] as const
                    ).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        className={cn(
                          "rounded-xl border px-3 py-2 text-sm font-semibold",
                          method === id
                            ? "border-orange bg-orange-soft text-text"
                            : "border-border bg-white text-muted"
                        )}
                        onClick={() => setMethod(id)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="view-contact" className="field-label">
                    {method === "telegram" ? "Telegram" : "Телефон"}
                  </label>
                  <input
                    id="view-contact"
                    required
                    value={form.contact}
                    onChange={(e) =>
                      setForm({ ...form, contact: e.target.value })
                    }
                    placeholder={
                      method === "telegram" ? "@username" : "+7 999 999 99 99"
                    }
                    className="field-input"
                  />
                </div>

                <div>
                  <label htmlFor="view-name" className="field-label">
                    Имя
                  </label>
                  <input
                    id="view-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="field-input"
                  />
                </div>

                {showComment ? (
                  <div>
                    <label htmlFor="view-message" className="field-label">
                      Комментарий
                    </label>
                    <textarea
                      id="view-message"
                      rows={3}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="field-input"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    className="text-sm font-semibold text-forest"
                    onClick={() => setShowComment(true)}
                  >
                    Добавить комментарий
                  </button>
                )}

                <ConsentCheckbox
                  id="sections-viewing-consent"
                  checked={consentPd}
                  onChange={setConsentPd}
                >
                  Согласен на обработку персональных данных.{" "}
                  <PrivacyPolicyLink />
                </ConsentCheckbox>

                {error ? (
                  <p className="text-sm font-semibold text-red-700">{error}</p>
                ) : null}

                <Button
                  type="submit"
                  className="w-full rounded-xl"
                  disabled={loading || !consentPd}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {loading ? "Отправка…" : "Записаться на просмотр"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
