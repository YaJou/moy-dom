import { NextResponse } from "next/server";

interface LeadBody {
  type?: string;
  city?: string;
  method?: string;
  contact?: string;
  name?: string;
  comment?: string;
  context?: Record<string, unknown>;
}

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

  // Stub handler: validated leads are accepted. Wire to CRM/webhook in production.
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
