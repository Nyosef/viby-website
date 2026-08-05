"use client";

import Script from "next/script";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

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
              <b>69</b>
              <small>₪ לחודש</small>
            </strong>
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
              <h3>קיבלנו אתכם!</h3>
              <p>
                הפרטים הגיעו אלינו. נציג של Viby יחזור אליכם וישלח את
                קישור התשלום המאובטח.
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
                  בלחיצה על הכפתור אני מאשר/ת ל־Viby ליצור איתי קשר
                  ב־WhatsApp ובטלפון לגבי השירות.{" "}
                  <a href="/privacy">מדיניות הפרטיות</a>
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
                <a
                  className="v2-punch-lead-isracard"
                  href="https://commons.wikimedia.org/wiki/File:Isracard-Logo-2023.png"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="ישראכרט — מקור הלוגו"
                >
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Isracard-Logo-2023.png"
                    alt="ישראכרט"
                    width={461}
                    height={71}
                    unoptimized
                  />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
