// ── Types for ITM Send Email API ──
// Reference: http://localhost:5001/api/contact

type ItmContactData = {
  /** Full name of the sender */
  name: string;
  /** Email address of the sender */
  email: string;
  /** Phone number (optional) */
  phone?: string;
  /** Subject line of the email */
  subject: string;
  /** Message body content */
  message: string;
  /** Receiver email address for the notification */
  receiver: string;
  /** Gender: "Homme" | "Femme" | "M" (optional) */
  sexe?: string;
};

type ItmContactPayload = {
  /** Language for the email template: "fr" or "en" */
  lang: string;
  /** Contact form data */
  data: ItmContactData;
};

type ItmNewsletterData = {
  /** Full name (optional for newsletter) */
  name?: string;
  /** Email address to subscribe */
  email: string;
  /** Subject line */
  subject: string;
  /** Message body */
  message: string;
  /** Receiver email address for the notification */
  receiver: string;
};

type ItmNewsletterPayload = {
  lang: string;
  data: ItmNewsletterData;
};

type MailServiceResult = {
  ok: boolean;
  status: number;
  body: unknown;
};

// ── Configuration ──

const DEFAULT_TIMEOUT_MS = 10_000;

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getOptionalEnv(name: string, fallback: string): string {
  const value = process.env[name]?.trim();
  return value || fallback;
}

function buildEndpointUrl(relativePath: string): string {
  const baseUrl = getRequiredEnv("NEXT_PUBLIC_MAIL_API").replace(/\/+$/, "");
  const normalizedPath = relativePath.startsWith("/")
    ? relativePath
    : `/${relativePath}`;
  return `${baseUrl}${normalizedPath}`;
}

// ── Generic POST helper ──

async function postToItmApi(
  endpointPath: string,
  payload: Record<string, unknown>,
): Promise<MailServiceResult> {
  const apiKey = getRequiredEnv("MAIL_SERVICE_API_KEY");
  const endpoint = buildEndpointUrl(endpointPath);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    let body: unknown = null;
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
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

// ── Public API ──

/**
 * Send a contact/lead email via the ITM Send Email API.
 * Uses the `/api/contact` endpoint (global contact route).
 */
export async function sendContactToItm(
  payload: ItmContactPayload,
): Promise<MailServiceResult> {
  return postToItmApi("/api/contact", payload);
}

/**
 * Send a newsletter subscription notification via the ITM Send Email API.
 * Uses the `/api/contact` endpoint with newsletter-appropriate data.
 */
export async function sendNewsletterToItm(
  payload: ItmNewsletterPayload,
): Promise<MailServiceResult> {
  return postToItmApi("/api/contact", payload);
}

// ── Helpers for building payloads ──

/**
 * Build a contact payload from lead/enquire form data.
 */
export function buildLeadContactPayload(params: {
  lang: string;
  name: string;
  email: string;
  phone?: string;
  tier?: string;
  receiverEmail: string;
}): ItmContactPayload {
  const { lang, name, email, phone, tier, receiverEmail } = params;

  const tierLabel = tier === "gold" ? "Nyumbani Gold" : "Nyumbani Platinum";
  const subject = tier
    ? `${tierLabel} — New Lead`
    : "Nyumbani — New Lead";
  const message = tier
    ? `New lead from the Nyumbani landing page.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nTier: ${tierLabel}`
    : `New lead from the Nyumbani landing page (intro capture).\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}`;

  return {
    lang,
    data: {
      name,
      email,
      phone,
      subject,
      message,
      receiver: receiverEmail,
    },
  };
}

/**
 * Build a newsletter subscription payload.
 */
export function buildNewsletterPayload(params: {
  lang: string;
  email: string;
  receiverEmail: string;
}): ItmNewsletterPayload {
  const { lang, email, receiverEmail } = params;

  return {
    lang,
    data: {
      email,
      subject: "Nyumbani — New Newsletter Subscription",
      message: `New newsletter subscription from the Nyumbani landing page.\n\nEmail: ${email}`,
      receiver: receiverEmail,
    },
  };
}
