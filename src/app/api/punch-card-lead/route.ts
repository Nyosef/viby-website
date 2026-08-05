import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadRequest = {
  name?: unknown;
  phone?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
};

const attempts = new Map<string, number[]>();
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function normalizePhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }
  if (digits.startsWith("0")) {
    digits = `972${digits.slice(1)}`;
  }

  return /^9725\d{8}$/.test(digits) ? digits : null;
}

function isValidName(value: string) {
  return (
    value.length >= 2 &&
    value.length <= 60 &&
    /^[\p{L}\p{M} .'"’-]+$/u.test(value)
  );
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recentAttempts = (attempts.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < ATTEMPT_WINDOW_MS,
  );

  if (recentAttempts.length >= MAX_ATTEMPTS) {
    attempts.set(ip, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  attempts.set(ip, recentAttempts);
  return false;
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return true;
  }
  if (!token) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function sendLeadEmail(name: string, phone: string, submittedAt: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PURCHASE_LEAD_FROM_EMAIL;
  if (!apiKey || !from) {
    return false;
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: ["vibyisrael@gmail.com"],
      subject: `💳 בקשה לקישור תשלום — ${name}`,
      text: `בקשה חדשה לקישור תשלום\n\nשם: ${name}\nטלפון: +${phone}\nמסלול: כרטיסייה דיגיטלית — 69 ₪ לחודש\nנשלח: ${submittedAt}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7">
          <h2>💳 בקשה חדשה לקישור תשלום</h2>
          <p><strong>שם:</strong> ${safeName}</p>
          <p><strong>טלפון:</strong> <a href="tel:+${safePhone}">+${safePhone}</a></p>
          <p><strong>מסלול:</strong> כרטיסייה דיגיטלית — 69 ₪ לחודש</p>
          <p><strong>נשלח:</strong> ${escapeHtml(submittedAt)}</p>
        </div>
      `,
    }),
    signal: AbortSignal.timeout(8000),
  });

  return response.ok;
}

async function sendTelegramAlert(
  name: string,
  phone: string,
  submittedAt: string,
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (
    process.env.TELEGRAM_CHAT_IDS ||
    process.env.TELEGRAM_CHAT_ID ||
    ""
  )
    .split(",")
    .map((chatId) => chatId.trim())
    .filter(Boolean);

  if (!botToken || chatIds.length === 0) {
    return false;
  }

  const text = [
    "💳 בקשה חדשה לקישור תשלום",
    "",
    `שם: ${name}`,
    `טלפון: +${phone}`,
    "מסלול: 69 ₪ לחודש",
    `נשלח: ${submittedAt}`,
  ].join("\n");

  const results = await Promise.allSettled(
    chatIds.map(async (chatId) => {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
          signal: AbortSignal.timeout(8000),
        },
      );

      return response.ok;
    }),
  );

  return results.some(
    (result) => result.status === "fulfilled" && result.value === true,
  );
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json(
      { ok: false, message: "בקשה לא תקינה." },
      { status: 403 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        message: "נשלחו יותר מדי בקשות. נסו שוב בעוד כמה דקות.",
      },
      { status: 429 },
    );
  }

  let body: LeadRequest;
  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return NextResponse.json(
      { ok: false, message: "לא הצלחנו לקרוא את הפרטים." },
      { status: 400 },
    );
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phoneInput = typeof body.phone === "string" ? body.phone : "";
  const phone = normalizePhone(phoneInput);
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : "";

  if (!isValidName(name)) {
    return NextResponse.json(
      { ok: false, message: "כתבו שם תקין באורך של לפחות שני תווים." },
      { status: 400 },
    );
  }

  if (!phone) {
    return NextResponse.json(
      { ok: false, message: "כתבו מספר טלפון ישראלי תקין." },
      { status: 400 },
    );
  }

  try {
    const turnstileValid = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileValid) {
      return NextResponse.json(
        { ok: false, message: "בדיקת האבטחה נכשלה. רעננו ונסו שוב." },
        { status: 400 },
      );
    }

    const submittedAt = new Intl.DateTimeFormat("he-IL", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jerusalem",
    }).format(new Date());

    const [emailResult, telegramResult] = await Promise.allSettled([
      sendLeadEmail(name, phone, submittedAt),
      sendTelegramAlert(name, phone, submittedAt),
    ]);

    const emailSent =
      emailResult.status === "fulfilled" && emailResult.value === true;
    const telegramSent =
      telegramResult.status === "fulfilled" && telegramResult.value === true;
    if (!emailSent && !telegramSent) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "לא הצלחנו לשלוח את הפרטים כרגע. נסו שוב או דברו איתנו ב־WhatsApp.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "לא הצלחנו לשלוח את הפרטים כרגע. נסו שוב או דברו איתנו ב־WhatsApp.",
      },
      { status: 502 },
    );
  }
}
