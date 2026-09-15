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

export function formatTelegramLeadMessage(body: LeadBody): string {
  const type = body.type?.trim() || "viewing";
  const city = body.city?.trim() || "";
  const method = body.method?.trim() || "phone";
  const contact = body.contact?.trim() || "";
  const name = body.name?.trim() || "";
  const comment = body.comment?.trim() || "";
  const context = body.context ?? {};

  const title = type === "viewing" ? "Заявка на просмотр" : "Заявка с сайта";
  const methodLabel = method === "telegram" ? "Telegram" : "Телефон";

  const lines = [
    `🏠 <b>${esc(title)}</b>`,
    `Город: ${esc(city)}`,
    `Связь: ${esc(methodLabel)} — ${esc(contact)}`,
  ];

  if (name) lines.push(`Имя: ${esc(name)}`);
  if (comment) lines.push(`Комментарий: ${esc(comment)}`);

  if (context.houseId != null && context.houseId !== "") {
    const houseId = String(context.houseId);
    const url =
      typeof context.houseUrl === "string" && context.houseUrl.trim()
        ? context.houseUrl.trim()
        : `https://dom-krovservice64.ru/catalog/${houseId}/`;
    lines.push(`Дом: #${esc(houseId)} — ${esc(url)}`);
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

export async function sendTelegramLead(
  token: string,
  chatId: string,
  body: LeadBody
): Promise<boolean> {
  const text = formatTelegramLeadMessage(body);
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
