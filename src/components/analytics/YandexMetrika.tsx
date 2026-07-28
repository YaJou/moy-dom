"use client";

import { useEffect } from "react";
import { hasAnalyticsConsent } from "@/lib/cookie-consent";
import { bootYandexMetrika } from "@/lib/yandex-metrika";

/**
 * Loads Yandex.Metrika after analytics cookie consent.
 * Returning visitors are also booted by the early <head> script.
 */
export function YandexMetrika() {
  useEffect(() => {
    const tryBoot = () => {
      if (hasAnalyticsConsent()) bootYandexMetrika();
    };

    tryBoot();

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<{ value?: string }>).detail;
      if (detail?.value === "accepted") bootYandexMetrika();
    };

    window.addEventListener("cookie-consent-changed", onConsent);
    return () => window.removeEventListener("cookie-consent-changed", onConsent);
  }, []);

  return null;
}
