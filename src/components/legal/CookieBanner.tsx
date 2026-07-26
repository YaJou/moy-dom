"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!readCookieConsent());
  }, []);

  const choose = (value: CookieConsentValue) => {
    writeCookieConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-16 z-[60] border-t border-border bg-white/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-5 lg:bottom-0"
    >
      <div className="container-main flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p id="cookie-banner-title" className="text-sm font-semibold text-dark sm:text-base">
            Файлы cookie и локальные данные
          </p>
          <p id="cookie-banner-desc" className="mt-1.5 text-xs leading-relaxed text-gray sm:text-sm">
            Мы используем необходимые технические данные браузера (например, список
            сравнения домов в localStorage). Аналитические и рекламные cookie на
            сайте сейчас не устанавливаются до вашего согласия. Подробнее — в{" "}
            <Link href="/privacy/#cookies" className="font-medium text-primary underline-offset-2 hover:underline">
              Политике конфиденциальности
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
          >
            Только необходимые
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Принять все
          </button>
        </div>
      </div>
    </div>
  );
}
