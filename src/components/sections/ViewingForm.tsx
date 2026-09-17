"use client";

import { FormSuccessPanel } from "@/components/feedback/FormSuccessPanel";
import { Button } from "@/components/ui/button";
import {
  ConsentCheckbox,
  PrivacyPolicyLink,
} from "@/components/legal/ConsentCheckbox";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";

type ContactMethod = "call" | "telegram";

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
    if (method === "call" && !form.contact.trim()) return;
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitted(true);
      analytics.leadSuccess("viewing");
      setConsentPd(false);
      setForm({ name: "", contact: "", city: "Саратов", message: "" });
    } catch {
      setError("Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.");
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
                  <span className="field-label">Способ связи</span>
                  <div className="flex gap-2">
                    {(
                      [
                        { id: "call", label: "Позвонить" },
                        { id: "telegram", label: "Написать" },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMethod(item.id)}
                        className={cn(
                          "chip flex-1 justify-center",
                          method === item.id && "chip-active"
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="view-contact" className="field-label">
                    {method === "call" ? "Телефон" : "Telegram"}
                  </label>
                  <input
                    id="view-contact"
                    type={method === "call" ? "tel" : "text"}
                    autoComplete={method === "call" ? "tel" : "off"}
                    required={method === "call"}
                    value={form.contact}
                    onChange={(e) =>
                      setForm({ ...form, contact: e.target.value })
                    }
                    placeholder={
                      method === "call" ? "+7 (___) ___-__-__" : "@username"
                    }
                    className="field-input"
                  />
                </div>

                {!showComment ? (
                  <button
                    type="button"
                    className="text-sm font-medium text-muted hover:text-text"
                    onClick={() => setShowComment(true)}
                  >
                    Добавить комментарий
                  </button>
                ) : (
                  <>
                    <div>
                      <label htmlFor="view-name" className="field-label">
                        Имя
                      </label>
                      <input
                        id="view-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="field-input"
                      />
                    </div>
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
                        className="field-input min-h-[96px] resize-none py-3"
                      />
                    </div>
                  </>
                )}

                <ConsentCheckbox
                  id="view-consent-pd"
                  checked={consentPd}
                  onChange={setConsentPd}
                >
                  Нажимая кнопку, я соглашаюсь на обработку персональных данных
                  согласно <PrivacyPolicyLink />.
                </ConsentCheckbox>

                {error && (
                  <p className="text-sm text-error" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!consentPd || loading}
                >
                  <Send className="h-4 w-4" strokeWidth={1.75} />
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
