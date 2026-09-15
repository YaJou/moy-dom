/** Формат: +7 999 999 99 99 */

const PHONE_DIGITS = 11;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Нормализует к 11 цифрам, начиная с 7. */
export function normalizeRuPhoneDigits(raw: string): string {
  let digits = digitsOnly(raw);
  if (!digits) return "";

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (digits.length === 10) {
    digits = `7${digits}`;
  } else if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  return digits.slice(0, PHONE_DIGITS);
}

/** Маска при вводе: +7 999 999 99 99 */
export function formatRuPhoneMask(raw: string): string {
  const digits = normalizeRuPhoneDigits(raw);
  if (!digits) return "";

  const rest = digits.slice(1);
  let out = "+7";
  if (rest.length > 0) out += ` ${rest.slice(0, 3)}`;
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += ` ${rest.slice(6, 8)}`;
  if (rest.length > 8) out += ` ${rest.slice(8, 10)}`;
  return out;
}

/** Полный номер в едином формате или null, если неполный. */
export function formatRuPhoneCanonical(raw: string): string | null {
  const digits = normalizeRuPhoneDigits(raw);
  if (digits.length !== PHONE_DIGITS || !digits.startsWith("7")) return null;
  return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
}

/** Похоже на телефон (а не @username). */
export function looksLikePhone(raw: string): boolean {
  const digits = digitsOnly(raw);
  return digits.length >= 10 && !raw.trim().startsWith("@");
}
