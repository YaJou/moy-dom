export interface LeadPayload {
  type?: string;
  city: string;
  method?: string;
  contact: string;
  name?: string;
  comment?: string;
  context?: Record<string, unknown> | object;
}

/** Куда отправлять заявку: PHP на проде, API в dev. */
export function getLeadEndpoint(): string {
  const custom = process.env.NEXT_PUBLIC_LEAD_URL;
  if (custom) return custom;
  if (process.env.NODE_ENV === "development") return "/api/lead";
  return "/lead.php";
}

export async function submitLead(payload: LeadPayload): Promise<Response> {
  return fetch(getLeadEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
