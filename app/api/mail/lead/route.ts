import { NextResponse } from "next/server";
import {
  sendContactToItm,
  buildLeadContactPayload,
} from "@/lib/itm-mail";

type LeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  tier?: string;
  lang?: string;
};

export async function POST(request: Request) {
  let body: LeadBody;

  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  const lang = body.lang?.trim() || "fr";
  const receiverEmail =
    process.env.MAIL_RECEIVER_EMAIL?.trim() || "client@nyumbani-africa.com";

  try {
    const payload = buildLeadContactPayload({
      lang,
      name,
      email,
      phone: body.phone?.trim(),
      tier: body.tier,
      receiverEmail,
    });

    const result = await sendContactToItm(payload);

    if (!result.ok) {
      return NextResponse.json(
        { error: "Mail service request failed.", details: result.body },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to reach mail service.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
