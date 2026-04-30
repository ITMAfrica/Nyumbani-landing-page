import { NextResponse } from 'next/server';
import { sendMailToItm } from '@/lib/itm-mail';

type LeadBody = {
  name?: string;
  email?: string;
};

export async function POST(request: Request) {
  let body: LeadBody;

  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  try {
    const result = await sendMailToItm({
      source: 'lead',
      name,
      email,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: 'Mail service request failed.', details: result.body },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unable to reach mail service.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
