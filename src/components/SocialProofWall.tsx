import Image from "next/image";
import type { CSSProperties } from "react";
import {
  photographedSocialProofBusinesses,
  socialProofCategoryHooks,
  type SocialProofBusiness,
} from "@/lib/social-proof";
import { WhatsAppMark } from "./WhatsAppMark";

function BusinessCard({
  business,
  large,
}: {
  business: SocialProofBusiness;
  large: boolean;
}) {
  return (
    <article
      className={`social-proof-card${large ? " social-proof-card--large" : ""}`}
      style={{
        "--photo-position-desktop": business.photo.objectPosition?.desktop ?? "center",
        "--photo-position-mobile": business.photo.objectPosition?.mobile ?? "center",
      } as CSSProperties}
    >
      <Image
        src={business.photo.cardSrc}
        alt={business.photo.alt}
        width={800}
        height={1000}
        sizes={`(max-width: 414px) 82vw, (max-width: 720px) 340px, (max-width: 1000px) 44vw, ${large ? "460px" : "225px"}`}
        loading="lazy"
      />
      <div
        className={`social-proof-brand${business.logoSrc ? "" : " social-proof-brand--wordmark"}`}
        aria-hidden="true"
      >
        {business.logoSrc ? (
          <Image
            src={business.logoSrc}
            alt=""
            width={400}
            height={400}
            sizes={large ? "(max-width: 720px) 78px, 82px" : "(max-width: 720px) 66px, 62px"}
            loading="lazy"
          />
        ) : (
          <span>{business.name}</span>
        )}
      </div>
      <div className="social-proof-card-caption">
        <span className="social-proof-card-category">
          {business.category} <span aria-hidden="true">·</span> {socialProofCategoryHooks[business.category]}
        </span>
        <h3>{business.name}</h3>
        <p>{business.editorialLine}</p>
      </div>
    </article>
  );
}

export function SocialProofWall({
  whatsappUrl,
  heading = "עסקים אמיתיים. לקוחות שחוזרים.",
  intro = "הכירו את העסקים ואת הרגעים שבהם Viby משתלבת ביום שלהם.",
}: {
  whatsappUrl: string;
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="social-proof" dir="rtl" aria-labelledby="social-proof-heading">
      <div className="social-proof-shell">
        <div className="social-proof-heading">
          <h2 id="social-proof-heading">{heading}</h2>
          <p>{intro}</p>
        </div>

        <div className="social-proof-gallery" aria-label="עסקים עם תמונות">
          {photographedSocialProofBusinesses.map((business, index) => (
            <BusinessCard
              key={business.id}
              business={business}
              large={index < 4}
            />
          ))}
        </div>
        <p className="social-proof-swipe-hint">
          <span>החליקו להכיר עוד עסקים</span>
          <svg viewBox="0 0 56 28" fill="none" aria-hidden="true" focusable="false">
            <path d="M51 6C39 19 24 21 6 15m9-6-9 6 8 8" stroke="currentColor" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>

        <div className="social-proof-contact">
          <p>רוצים לראות איך Viby יכולה לעבוד גם אצלכם?</p>
          <a href={whatsappUrl} data-analytics-location="social_proof">
            <WhatsAppMark />
            דברו איתנו ב־WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
