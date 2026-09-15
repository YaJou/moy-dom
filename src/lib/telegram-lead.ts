export interface LeadBody {
  type?: string;
  city?: string;
  method?: string;
  contact?: string;
  name?: string;
  comment?: string;
  context?: Record<string, unknown>;
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatContactForMessage(method: string, contact: string): string {
  const digits = contact.replace(/\D/g, "");
  let normalized = digits;
  if (normalized.startsWith("8") && normalized.length === 11) {
    normalized = `7${normalized.slice(1)}`;
  } else if (normalized.length === 10) {
    normalized = `7${normalized}`;
  }

  const isPhone =
    method !== "telegram" ||
    (normalized.length === 11 &&
      normalized.startsWith("7") &&
      !contact.trim().startsWith("@"));

  if (isPhone && normalized.length === 11 && normalized.startsWith("7")) {
    return `+7 ${normalized.slice(1, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7, 9)} ${normalized.slice(9, 11)}`;
  }

  return contact.trim();
}

function leadTitle(type: string): string {
  if (type === "callback") return "Обратный звонок";
  if (type === "viewing") return "Заявка на просмотр";
  return "Заявка с сайта";
}

export function formatTelegramLeadMessage(body: LeadBody): string {
  const type = body.type?.trim() || "viewing";
  const city = body.city?.trim() || "";
  const method = body.method?.trim() || "phone";
  const contact = formatContactForMessage(method, body.contact?.trim() || "");
  const name = body.name?.trim() || "";
  const comment = body.comment?.trim() || "";
  const context = body.context ?? {};

  const methodLabel = method === "telegram" ? "Telegram" : "Телефон";

  const lines = [
    `🏠 <b>${esc(leadTitle(type))}</b>`,
    `Город: ${esc(city)}`,
    `Связь: ${esc(methodLabel)} — <code>${esc(contact)}</code>`,
  ];

  if (typeof context.topic === "string" && context.topic.trim()) {
    lines.push(`Вопрос: ${esc(context.topic.trim())}`);
  }

  if (name) lines.push(`Имя: ${esc(name)}`);
  if (comment) lines.push(`Комментарий: ${esc(comment)}`);

  if (context.houseId != null && context.houseId !== "") {
    const houseId = String(context.houseId);
    const title =
      typeof context.houseTitle === "string" ? context.houseTitle : "";
    const price =
      typeof context.housePrice === "string" ? context.housePrice : "";
    const area =
      context.houseArea != null && context.houseArea !== ""
        ? `${context.houseArea} м²`
        : "";
    const place = [context.houseCity, context.houseDistrict]
      .filter((v) => typeof v === "string" && v.trim())
      .join(", ");
    const url =
      typeof context.houseUrl === "string" && context.houseUrl.trim()
        ? context.houseUrl.trim()
        : `https://dom-krovservice64.ru/catalog/${houseId}/`;

    const houseLine = [
      title || `Дом #${houseId}`,
      area,
      place,
      price,
    ]
      .filter(Boolean)
      .join(" · ");

    lines.push(`Дом: ${esc(houseLine)}`);
    lines.push(`Ссылка: ${esc(url)}`);
  }

  if (context.filters) {
    lines.push(`Фильтры: ${esc(String(context.filters))}`);
  }
  if (context.calculator) {
    lines.push(`Калькулятор: ${esc(String(context.calculator))}`);
  }

  lines.push("Сайт: dom-krovservice64.ru");
  return lines.join("\n");
}

function getHousePhotoUrl(body: LeadBody): string | null {
  const photo = body.context?.housePhotoUrl;
  return typeof photo === "string" && photo.startsWith("http") ? photo : null;
}

async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string
): Promise<boolean> {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) return false;
  const json = (await res.json()) as { ok?: boolean };
  return Boolean(json.ok);
}

async function sendTelegramPhoto(
  token: string,
  chatId: string,
  photoUrl: string,
  caption: string
): Promise<boolean> {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      photo: photoUrl,
      caption,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) return false;
  const json = (await res.json()) as { ok?: boolean };
  return Boolean(json.ok);
}

export async function sendTelegramLead(
  token: string,
  chatIds: string | string[],
  body: LeadBody
): Promise<boolean> {
  const text = formatTelegramLeadMessage(body);
  const photoUrl = getHousePhotoUrl(body);
  const ids = (Array.isArray(chatIds) ? chatIds : [chatIds])
    .map((id) => id.trim())
    .filter(Boolean);
  if (ids.length === 0) return false;

  const results = await Promise.all(
    ids.map(async (id) => {
      if (photoUrl) {
        const sent = await sendTelegramPhoto(token, id, photoUrl, text);
        if (sent) return true;
      }
      return sendTelegramMessage(token, id, text);
    })
  );
  return results.some(Boolean);
}
