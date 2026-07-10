"use client";

import { Button } from "@/components/ui/button";
import { alertsData } from "@/data/site";
import { cn } from "@/lib/utils";
import { Bell, CheckCircle2, ExternalLink } from "lucide-react";
import { useState } from "react";

type ChannelId = (typeof alertsData.channels)[number]["id"];

export function Newsletter() {
  const [city, setCity] = useState(alertsData.cities[0]);
  const [channel, setChannel] = useState<ChannelId>("whatsapp");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const needsPhone = channel !== "vk";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (needsPhone && !phone.trim()) return;
    setSubmitted(true);
    setPhone("");
  };

  return (
    <section className="bg-primary py-6 sm:py-8">
      <div className="container-main">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="text-white">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Bell className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold sm:text-2xl lg:text-[28px]">
                {alertsData.title}
              </h2>
            </div>
            <p className="text-sm text-white/85 sm:text-base">
              {alertsData.subtitle}
            </p>

            <ul className="mt-5 space-y-2">
              {alertsData.notifyAbout.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white/90"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-white/70" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs text-white/60 sm:text-sm">
              Никаких рекламных рассылок и звонков — только уведомления по
              выбранному городу.
            </p>
          </div>

          <div className="rounded-card bg-white p-5 sm:p-6">
            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="mb-3 h-10 w-10 text-primary" />
                <p className="font-semibold text-dark">Вы подписаны!</p>
                <p className="mt-1 text-sm text-gray">
                  Будем присылать уведомления о домах в {city}
                </p>
                <Button
                  variant="outline"
                  className="mt-4 rounded-xl"
                  onClick={() => setSubmitted(false)}
                >
                  Изменить настройки
                </Button>
              </div>
            ) : channel === "vk" ? (
              <div className="space-y-5">
                <div>
                  <p className="mb-3 text-sm font-medium text-dark">
                    Город для фильтра в группе
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {alertsData.cities.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCity(c)}
                        className={cn(
                          "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          city === c
                            ? "bg-primary text-white"
                            : "bg-background text-dark hover:bg-primary-light"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-gray">
                  В нашей группе ВКонтакте публикуются все новые объекты,
                  скидки и актуальные предложения по Саратову, Энгельсу и
                  Балаково.
                </p>

                <a
                  href={alertsData.vkGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0077FF] text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Подписаться в ВКонтакте
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="text-center text-xs text-gray">
                  vk.com/{alertsData.vkGroupName}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-dark">
                    Город
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {alertsData.cities.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCity(c)}
                        className={cn(
                          "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          city === c
                            ? "bg-primary text-white"
                            : "bg-background text-dark hover:bg-primary-light"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-dark">
                    Куда присылать
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {alertsData.channels.map((ch) => (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => setChannel(ch.id)}
                        className={cn(
                          "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                          channel === ch.id
                            ? "border-primary bg-primary-light text-primary"
                            : "border-border bg-white text-dark hover:border-primary/40"
                        )}
                      >
                        {ch.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="alert-phone"
                    className="mb-2 block text-sm font-medium text-dark"
                  >
                    Номер телефона
                  </label>
                  <input
                    id="alert-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    required
                    className="h-12 w-full rounded-xl border border-border px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <Button type="submit" className="h-12 w-full rounded-xl">
                  Получать уведомления
                </Button>

                <p className="text-center text-xs text-gray">
                  Нажимая кнопку, вы соглашаетесь получать сообщения только о
                  новых домах в {city}
                </p>
              </form>
            )}

            {channel !== "vk" && !submitted && (
              <button
                type="button"
                onClick={() => setChannel("vk")}
                className="mt-4 w-full text-center text-sm text-gray transition-colors hover:text-primary"
              >
                Или подпишитесь в группе ВКонтакте →
              </button>
            )}

            {channel === "vk" && !submitted && (
              <button
                type="button"
                onClick={() => setChannel("whatsapp")}
                className="mt-4 w-full text-center text-sm text-gray transition-colors hover:text-primary"
              >
                ← Уведомления на телефон
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
