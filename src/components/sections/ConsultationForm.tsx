"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "Саратов",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", phone: "", city: "Саратов", message: "" });
  };

  return (
    <section id="consultation" className="section-padding bg-white">
      <div className="container-main">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="section-title">Получить консультацию</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray sm:text-base">
              Оставьте заявку — менеджер свяжется с вами в течение 15 минут,
              ответит на вопросы и подберёт подходящие варианты домов.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Ответим за 10 минут",
                "Без навязчивых звонков",
                "Консультация бесплатна",
                "Помощь с ипотекой",
                "Организация просмотра",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-dark">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray">
              Или позвоните:{" "}
              <a
                href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                className="font-semibold text-primary hover:underline"
              >
                {siteConfig.phone}
              </a>
            </p>
          </div>

          <div className="rounded-card border border-border bg-background p-5 shadow-card sm:p-6 lg:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
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
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Саратов</option>
                    <option>Энгельс</option>
                    <option>Балаково</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark">
                    Комментарий
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Расскажите, какой дом вас интересует"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button type="submit" className="w-full rounded-xl">
                  <Send className="h-4 w-4" />
                  Отправить заявку
                </Button>
                <p className="text-center text-xs text-gray">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
