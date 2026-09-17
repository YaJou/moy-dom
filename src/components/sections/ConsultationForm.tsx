"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/Select";
import {
  ConsentCheckbox,
  PrivacyPolicyLink,
} from "@/components/legal/ConsentCheckbox";
import { siteConfig } from "@/data/site";
import { IconCheck, IconPhone, IconSend } from "@/components/home/icons";
import { notifyFormSuccess } from "@/lib/form-success";
import { useState } from "react";

interface ConsultationFormProps {
  defaultCity?: string;
}

export function ConsultationForm({
  defaultCity = "Энгельс",
}: ConsultationFormProps = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [consentPd, setConsentPd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: defaultCity,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentPd) return;
    setSubmitted(true);
    setConsentPd(false);
    setForm({ name: "", phone: "", city: defaultCity, message: "" });
    notifyFormSuccess({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
  };

  return (
    <section id="consultation" className="section-padding bg-white">
      <div className="container-main">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="section-title">Получить консультацию</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Оставьте заявку — менеджер свяжется с вами в течение 15 минут,
              ответит на вопросы и подберёт подходящие варианты домов.
            </p>
            <p className="mt-3 text-sm font-semibold text-text">
              Это просто короткий звонок: без обязательств, без спама и без
              давления — только ответы на ваши вопросы.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Ответим за 10 минут",
                "Без навязчивых звонков",
                "Консультация бесплатна",
                "Помощь с ипотекой",
                "Организация просмотра",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-text">
                  <IconCheck className="h-4 w-4 shrink-0 text-orange" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              className="mt-6 inline-flex items-center gap-3 rounded-control border border-border bg-page px-3.5 py-3 transition-colors hover:border-orange/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-soft text-orange">
                <IconPhone className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs text-muted">
                  Или просто позвоните — и всё
                </span>
                <span className="mt-0.5 block text-sm font-bold text-text">
                  {siteConfig.phone}
                </span>
              </span>
            </a>
          </div>

          <div className="rounded-card border border-border bg-background p-5 shadow-card sm:p-6 lg:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <IconCheck className="mb-4 h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold text-dark">Заявка отправлена!</h3>
                <p className="mt-2 text-sm text-gray">
                  Мы свяжемся с вами в ближайшее время.
                </p>
                <Button
                  className="mt-6 rounded-xl"
                  onClick={() => setSubmitted(false)}
                >
                  Отправить ещё
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark">
                    Город
                  </label>
                  <Select
                    name="city"
                    variant="field"
                    value={form.city}
                    onChange={(city) => setForm({ ...form, city })}
                    options={["Энгельс", "Саратов", "Балаково"]}
                    aria-label="Город"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark">
                    Комментарий
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Расскажите, какой дом вас интересует"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <ConsentCheckbox
                  id="consult-consent-pd"
                  checked={consentPd}
                  onChange={setConsentPd}
                >
                  Нажимая кнопку, я соглашаюсь на обработку персональных данных
                  согласно <PrivacyPolicyLink />.
                </ConsentCheckbox>
                <Button type="submit" className="w-full rounded-xl" disabled={!consentPd}>
                  <IconSend className="h-4 w-4" />
                  Отправить заявку
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
