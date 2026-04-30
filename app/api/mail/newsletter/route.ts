import { NextResponse } from 'next/server';
import { sendMailToItm } from '@/lib/itm-mail';

type NewsletterBody = {
  email?: string;
};

export async function POST(request: Request) {
  let body: NewsletterBody;

  try {
    body = (await request.json()) as NewsletterBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const email = body.email?.trim();

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  try {
    const result = await sendMailToItm({
      source: 'newsletter',
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
