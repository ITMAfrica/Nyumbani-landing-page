type MailPayload = {
  name?: string;
  email: string;
  source: 'lead' | 'newsletter';
};

type MailServiceResult = {
  ok: boolean;
  status: number;
  body: unknown;
};

const DEFAULT_TIMEOUT_MS = 10_000;

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function buildEndpointUrl(): string {
  const baseUrl = getRequiredEnv('NEXT_PUBLIC_MAIL_API').replace(/\/+$/, '');
  const relativePath = (process.env.MAIL_API_RELATIVE_PATH ?? '/send').trim();
  const normalizedPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return `${baseUrl}${normalizedPath}`;
}

export async function sendMailToItm(payload: MailPayload): Promise<MailServiceResult> {
  const apiKey = getRequiredEnv('MAIL_SERVICE_API_KEY');
  const endpoint = buildEndpointUrl();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store',
    });

    let body: unknown = null;
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      body = await response.json().catch(() => null);
    } else {
      body = await response.text().catch(() => null);
    }

    return {
      ok: response.ok,
      status: response.status,
      body,
    };
  } finally {
    clearTimeout(timeout);
  }
}
