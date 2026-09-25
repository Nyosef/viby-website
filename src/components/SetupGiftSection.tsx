import type { CSSProperties } from "react";
import type { ServiceId } from "@/lib/services";
import {
  ServiceIllustration,
  servicePresentation,
} from "./ServiceIllustration";

function GiftMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 11v10h16V11M3 7h18v4H3zM12 7v14m0-14C3 7 5 0 9 3c2 1 3 4 3 4Zm0 0c9 0 7-7 3-4-2 1-3 4-3 4Z" />
    </svg>
  );
}

function SampleQr() {
  return (
    <svg viewBox="0 0 68 68" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M3 3h22v22H3Zm4 4v14h14V7ZM43 3h22v22H43Zm4 4v14h14V7ZM3 43h22v22H3Zm4 4v14h14V47Z"
      />
      <path d="M11 11h6v6h-6zm40 0h6v6h-6zM11 51h6v6h-6zM31 3h5v10h-5zm0 16h5v17H19v-5h12zM3 31h10v5H3zm40 0h10v5H43zm16 0h6v12H53v-5h6zM31 43h12v6h-6v10h-6zm12 12h6v10h-6zm10-6h12v5H53zm6 10h6v6h-6zM31 63h5v2h-5z" />
    </svg>
  );
}

export function SetupGiftSection({ service }: { service: ServiceId }) {
  const product = servicePresentation[service];
  const headingId = `setup-gift-${service}`;
  return (
    <section className="setup-gift" dir="rtl" aria-labelledby={headingId}>
      <div
        className="setup-gift-panel"
        style={{ "--gift-service-color": product.color } as CSSProperties}
      >
        <div className="setup-gift-lead">
          <span className="setup-gift-eyebrow">
            <GiftMark /> אנחנו דואגים להכול
          </span>
          <h2 id={headingId}>
            הקמה מלאה <span>עלינו.</span>
            <span className="setup-gift-deadline">תוך עד 3 ימי עסקים.</span>
          </h2>
        </div>
        <p className="setup-gift-intro">
          <strong>אתם לא צריכים להתעסק בכלום.</strong>
          אנחנו מקימים ומגדירים את השירות עבור העסק, מכינים הכול לשימוש —
          ומביאים לכם אותו מוכן.
        </p>
        <div className="setup-gift-details">
          <ol className="setup-gift-promises">
            <li>
              <span aria-hidden="true">1</span>
              <strong>מצטרפים</strong>
            </li>
            <li>
              <span aria-hidden="true">2</span>
              <strong>אנחנו מקימים הכול</strong>
            </li>
            <li>
              <span aria-hidden="true">3</span>
              <strong>מוכנים לעבודה תוך עד 3 ימי עסקים</strong>
            </li>
          </ol>
        </div>

        <figure className="setup-gift-visual">
          <div className="setup-gift-stage" aria-hidden="true">
            <span className="setup-gift-spark setup-gift-spark-one">✦</span>
            <span className="setup-gift-spark setup-gift-spark-two">✦</span>
            <div className="setup-gift-sign">
              <span className="setup-gift-sign-brand">העסק שלכם</span>
              <span className="setup-gift-sign-rule" />
              <strong>
                <bdi>{product.name}</bdi>
              </strong>
              <div className="setup-gift-sign-art">
                <ServiceIllustration service={service} />
              </div>
              <div className="setup-gift-sign-scan">
                <SampleQr />
                <span>
                  סורקים כאן
                  <br />
                  <bdi>Viby</bdi>
                </span>
              </div>
            </div>
            <div className="setup-gift-box">
              <span />
              <GiftMark />
            </div>
            <div className="setup-gift-box-lid" />
            <span className="setup-gift-bow setup-gift-bow-right" />
            <span className="setup-gift-bow setup-gift-bow-left" />
            <div className="setup-gift-tag">
              <GiftMark />
              <span>
                במתנה מאיתנו<strong>השלט עלינו</strong>
              </span>
            </div>
          </div>
          <figcaption>
            <strong>שלט מעוצב במיוחד לעסק שלכם</strong>
            <span>מותאם לעסק ולשירות שבחרתם. מודפס ומוכן לשימוש.</span>
            <small>
              המתנה מותנית בשימוש ב־<bdi>Viby</bdi> למשך 3 חודשים לפחות.
            </small>
          </figcaption>
        </figure>
        <p className="setup-gift-closing">
          אתם מתמקדים בעסק. <strong>אנחנו בכל השאר.</strong>
        </p>
      </div>
    </section>
  );
}
