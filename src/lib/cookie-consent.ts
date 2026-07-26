const STORAGE_KEY = "cookie-consent-v1";

export type CookieConsentValue = "accepted" | "rejected";

export type CookieConsentState = {
  value: CookieConsentValue;
  updatedAt: string;
};

export function readCookieConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (parsed?.value !== "accepted" && parsed?.value !== "rejected") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeCookieConsent(value: CookieConsentValue): CookieConsentState {
  const state: CookieConsentState = {
    value,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: state }));
  return state;
}

/** Analytics / marketing scripts may run only after explicit accept. */
export function hasAnalyticsConsent(): boolean {
  return readCookieConsent()?.value === "accepted";
}
