"use client";

import Script from "next/script";
import { CommercialDisclosure } from "./CommercialDisclosure";
import { monthlyPrice } from "@/lib/commercial";
import { legalIdentity } from "@/lib/legal-identity";
import { siteConfig } from "@/lib/site";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
          theme: "light";
          size: "normal";
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function PunchCardLeadSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      !turnstileSiteKey ||
      !turnstileReady ||
      !window.turnstile ||
      !turnstileContainerRef.current ||
      turnstileWidgetRef.current
    ) {
      return;
    }

    turnstileWidgetRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: turnstileSiteKey,
        callback: setTurnstileToken,
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
        theme: "light",
        size: "normal",
      },
    );
  }, [turnstileReady]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/punch-card-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          website,
          turnstileToken,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "לא הצלחנו לשלוח את הפרטים כרגע.");
      }

      setStatus("success");
      setName("");
      setPhone("");
      trackAnalyticsEvent("generate_lead", {
        lead_type: "punch_card_payment_link",
        product_id: "punch-card",
        cta_location: "punch_card_lead_form",
        page_path: "/",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "לא הצלחנו לשלוח את הפרטים כרגע. נסו שוב.",
      );
      if (window.turnstile && turnstileWidgetRef.current) {
        window.turnstile.reset(turnstileWidgetRef.current);
        setTurnstileToken("");
      }
    }
  }

  return (
    <section
      className="v2-punch-lead"
      aria-labelledby="punch-lead-title"
    >
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
        />
      ) : null}

      <div className="v2-shell v2-punch-lead-shell v2-reveal">
        <div className="v2-punch-lead-copy">
          <span className="v2-punch-lead-kicker">
            <i aria-hidden="true">🔒</i>
            קישור אישי לתשלום מאובטח
          </span>
          <h2 id="punch-lead-title">
            מוכנים להתחיל?
            <strong> התשלום המאובטח בדרך אליכם</strong>
          </h2>
          <p>
            משאירים שם וטלפון, נציג של Viby חוזר אליכם לשיחה קצרה
            ושולח לכם קישור אישי לתשלום מאובטח דרך ישראכרט.
          </p>

          <div className="v2-punch-lead-offer" aria-label="מחיר המנוי">
            <span>מסלול הכרטיסייה המלא של Viby</span>
            <strong>
              <b>{monthlyPrice("punch-card")}</b>
              <small>₪ לחודש</small>
            </strong>
            <CommercialDisclosure service="punch-card" />
            <ul>
              <li>כרטיסייה ממותגת לעסק</li>
              <li>Apple Wallet ו־Google Wallet</li>
              <li>כל היכולות העדכניות בפנים</li>
            </ul>
          </div>
        </div>

        <div className="v2-punch-lead-card">
          {status === "success" ? (
            <div
              className="v2-punch-lead-success"
              role="status"
              aria-live="polite"
            >
              <span aria-hidden="true">✓</span>
              <h3>פנייתכם התקבלה!</h3>
              <p>
                הפרטים הגיעו אלינו. נציג של Viby יחזור אליכם וישלח את
                קישור התשלום המאובטח. שליחת הפנייה אינה הזמנת מנוי ואינה יוצרת חיוב.
              </p>
            </div>
          ) : (
            <>
              <div className="v2-punch-lead-card-heading">
                <span aria-hidden="true">👋</span>
                <div>
                  <h3>קבלו קישור אישי לתשלום</h3>
                  <p>שני פרטים קצרים — ואנחנו חוזרים אליכם</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <label>
                  <span>שם</span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="איך קוראים לכם?"
                    minLength={2}
                    maxLength={60}
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  <span>טלפון</span>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="050-000-0000"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                  />
                </label>

                <label className="v2-punch-lead-honeypot" aria-hidden="true">
                  <span>Website</span>
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>

                {turnstileSiteKey ? (
                  <div
                    className="v2-punch-lead-turnstile"
                    ref={turnstileContainerRef}
                  />
                ) : null}

                {status === "error" ? (
                  <p className="v2-punch-lead-error" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={
                    status === "submitting" ||
                    !name.trim() ||
                    !phone.trim() ||
                    Boolean(turnstileSiteKey && !turnstileToken)
                  }
                >
                  <span aria-hidden="true">💳</span>
                  <b>
                    {status === "submitting"
                      ? "שולחים..."
                      : "אני רוצה קישור לתשלום מאובטח"}
                  </b>
                  <i aria-hidden="true">←</i>
                </button>

                <small className="v2-punch-lead-consent">
                  מסירת שם וטלפון היא לבחירתכם כדי ש־{legalIdentity.name || "Viby"} תוכל לחזור אליכם בטלפון וב־WhatsApp בנוגע לפנייה. ללא פרטי קשר לא נוכל לתאם חזרה דרך הטופס. הפרטים מועברים לצוות המורשה ולספקי ההתראות המוגדרים לצורך טיפול בפנייה, כמפורט ב־<Link href="/privacy#privacy-4">מדיניות הפרטיות</Link>. לעיון ותיקון אפשר לפנות {legalIdentity.email ? <a href={`mailto:${legalIdentity.email}`}>בדוא״ל</a> : <a href={`https://wa.me/${siteConfig.whatsappNumber}`} data-analytics-location="support_page">ב־WhatsApp</a>}. שליחת הטופס אינה הזמנת מנוי ואינה יוצרת חיוב או הסכמה לקמפיינים עתידיים.
                </small>
              </form>

              <div className="v2-punch-lead-trust">
                <span className="v2-punch-lead-lock" aria-hidden="true">
                  🔒
                </span>
                <div>
                  <strong>התשלום מתבצע בעמוד מאובטח של</strong>
                  <small>הקישור האישי יישלח אליכם לאחר שיחה קצרה</small>
                </div>
                <span className="payment-provider-text">ישראכרט</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
