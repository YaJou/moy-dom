import { sendTelegramLead, type LeadBody } from "@/lib/telegram-lead";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: LeadBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.contact?.trim()) {
    return NextResponse.json({ error: "Contact required" }, { status: 400 });
  }

  if (!body.city?.trim()) {
    return NextResponse.json({ error: "City required" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    const sent = await sendTelegramLead(token, chatId, body);
    if (!sent) {
      return NextResponse.json({ error: "Telegram send failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  console.info("[lead]", {
    type: body.type ?? "viewing",
    city: body.city,
    method: body.method,
    hasName: Boolean(body.name),
    hasComment: Boolean(body.comment),
    context: body.context,
  });

  return NextResponse.json({ ok: true });
}
