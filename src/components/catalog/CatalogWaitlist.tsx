"use client";

import {
  ConsentCheckbox,
  PrivacyPolicyLink,
} from "@/components/legal/ConsentCheckbox";
import { Select } from "@/components/ui/Select";
import { siteConfig } from "@/data/site";
import { submitLead } from "@/lib/lead-api";
import {
  formatRuPhoneCanonical,
  formatRuPhoneMask,
} from "@/lib/phone";
import { useId, useState } from "react";

const BUDGETS = [
  "До 6,5 млн",
  "6,5–7,5 млн",
  "7,5–8,5 млн",
  "От 8,5 млн",
  "Пока не определился",
];

const BEDROOMS = ["2", "3", "4+", "Не важно"];

export function CatalogWaitlist() {
  const formId = useId();
  const [city, setCity] = useState("Энгельс");
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [bedrooms, setBedrooms] = useState("3");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    const phone = formatRuPhoneCanonical(contact);
    if (!phone) {
      setError("Укажите телефон полностью: +7 999 999 99 99");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await submitLead({
        type: "waitlist",
        city,
        method: "phone",
        contact: phone,
        comment: `Подписка на подходящий дом: бюджет ${budget}, спальни ${bedrooms}`,
        context: {
          intent: "waitlist",
          budget,
          bedrooms,
        },
      });
      if (!res.ok) throw new Error("fail");
      setDone(true);
    } catch {
      setError("Не удалось отправить. Напишите нам в Telegram или позвоните.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-t border-border bg-white py-12 sm:py-14">
      <div className="container-main">
        <div className="grid gap-8 rounded-card bg-[#1f4d3a] px-6 py-8 text-white sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:px-10 lg:py-10">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Пока не нашли подходящий?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
              Сообщить, когда появится подходящий дом? Укажите город, бюджет и
              количество спален — пришлём варианты, когда они появятся.
            </p>
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              Смотреть новые объекты в Telegram →
            </a>
          </div>

          <div className="rounded-panel bg-white p-5 text-text sm:p-6">
            {done ? (
              <div>
                <p className="text-lg font-extrabold text-text">
                  Заявку приняли
                </p>
                <p className="mt-2 text-sm text-muted">
                  Напишем, когда появится дом под ваши параметры. Пока можно
                  следить за новинками в Telegram.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="field-label" htmlFor={`${formId}-city`}>
                    Город
                  </label>
                  <Select
                    value={city}
                    onChange={setCity}
                    options={["Энгельс", "Саратов", "Балаково"]}
                    aria-label="Город"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor={`${formId}-budget`}>
                      Бюджет
                    </label>
                    <Select
                      value={budget}
                      onChange={setBudget}
                      options={BUDGETS}
                      aria-label="Бюджет"
                    />
                  </div>
                  <div>
                    <label
                      className="field-label"
                      htmlFor={`${formId}-bedrooms`}
                    >
                      Спальни
                    </label>
                    <Select
                      value={bedrooms}
                      onChange={setBedrooms}
                      options={BEDROOMS}
                      aria-label="Спальни"
                    />
                  </div>
                </div>
                <div>
                  <label className="field-label" htmlFor={`${formId}-phone`}>
                    Телефон
                  </label>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    inputMode="tel"
                    value={contact}
                    onChange={(e) =>
                      setContact(formatRuPhoneMask(e.target.value))
                    }
                    className="w-full rounded-xl border border-border px-3 py-3 text-sm"
                    placeholder="+7"
                    required
                  />
                </div>
                <ConsentCheckbox
                  id={`${formId}-consent`}
                  checked={consent}
                  onChange={setConsent}
                >
                  Я соглашаюсь с <PrivacyPolicyLink />
                </ConsentCheckbox>
                {error && (
                  <p className="text-sm font-medium text-red-600">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={!consent || loading}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {loading ? "Отправляем…" : "Сообщить о подходящем доме"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
