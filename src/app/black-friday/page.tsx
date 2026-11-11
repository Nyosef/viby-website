import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { WhatsAppMark } from "@/components/WhatsAppMark";
import { commercialTerms } from "@/lib/commercial";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { socialProofBusinesses } from "@/lib/social-proof";
import {
  blackFridayMonthlyPrice,
  blackFridayPreviousMonthlyPrice,
  blackFridayPath,
  blackFridayPhrase,
  isBlackFridayOfferActive,
} from "@/lib/black-friday";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const title = `${blackFridayPhrase} | Viby`;
const activeDescription = `${blackFridayPhrase}: כרטיסיית ניקוב דיגיטלית + Viby UP, סוכני AI לשיחות עם לקוחות ולביקורות אמיתיות, ב־269 ₪ לחודש למצטרפים עד 29.11.2026.`;
const endedDescription = `${blackFridayPhrase}: מבצע 2026 הסתיים. הכירו את Viby ובקשו הצעה עדכנית לעסק שלכם.`;
const phoneUrl = `tel:+${siteConfig.whatsappNumber}`;
const whatsappMessage = "היי, הגעתי מעמוד הבלאק פריידי של Viby ואשמח לשמוע על החבילה לעסק שלי.";
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const featuredBusinessMoments = [
  { id: "cafe-paris", line: "ניפגש גם בקפה הבא" },
  { id: "burekas-baba", line: "עוד בורקס כזה, בבקשה" },
  { id: "magic-wash", line: "נתראה בשטיפה הבאה" },
  { id: "cafe-roland", line: "הקפה הקבוע שלי" },
  { id: "nahat-herzliya", line: "יש לי פה מקום קבוע" },
  { id: "arbel-bowling", line: "עוד משחק אחד?" },
  { id: "freddo", line: "נחזור בשביל עוד כדור" },
  { id: "noga-flowers", line: "נחזור עם סיבה לחייך" },
] as const;
const featuredBusinesses = featuredBusinessMoments.map(({ id, line }) => {
  const business = socialProofBusinesses.find((item) => item.id === id);
  if (!business) throw new Error(`Missing Black Friday business photo: ${id}`);
  return { ...business, line };
});

export function generateMetadata(): Metadata {
  return createPageMetadata({
    path: blackFridayPath,
    title: blackFridayPhrase,
    metadataTitle: title,
    description: isBlackFridayOfferActive() ? activeDescription : endedDescription,
  });
}

export default function BlackFridayPage() {
  const active = isBlackFridayOfferActive();
  const description = active ? activeDescription : endedDescription;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}${blackFridayPath}#webpage`,
    url: `${siteConfig.url}${blackFridayPath}`,
    name: title,
    description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className={styles.heroWrap}>
        <header className={`${styles.header} ${styles.shell}`}>
          <Link href="/" aria-label="וייבי — דף הבית">
            <Image src="/viby-logo-white.png" alt="Viby" width={100} height={67} priority />
          </Link>
          <Link href="/viby-up">הכירו את Viby UP</Link>
        </header>

        <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="black-friday-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>מבצעי בלאק פריידי לעסקים קטנים ובינוניים</p>
            <h1 id="black-friday-title">{blackFridayPhrase}</h1>
            <p className={styles.lead}>
              {blackFridayPhrase} {active
                ? "נועדו לעזור לעסק להרוויח יותר מהלקוחות שכבר מכירים אותו."
                : "של Viby לשנת 2026 הסתיימו. עדיין אפשר לתת ללקוחות סיבה לחזור; בקשו הצעה עדכנית לעסק שלכם."}
            </p>

            <div className={styles.offer} aria-label={active ? "פרטי מבצע בלאק פריידי" : "עדכון על המבצע"}>
              {active ? (
                <>
                  <span className={styles.offerBadge}>הצטרפות עד 29.11.2026</span>
                  <div className={styles.offerBundle} aria-label="החבילה כוללת כרטיסיית ניקוב דיגיטלית ו־Viby UP">
                    <div className={styles.offerPart}>
                      <strong>כרטיסיית ניקוב דיגיטלית</strong>
                      <span>יותר לקוחות חוזרים</span>
                    </div>
                    <span className={styles.offerPlus} aria-hidden="true">+</span>
                    <div className={styles.offerPart}>
                      <strong><bdi dir="ltr">Viby UP</bdi> · סוכני AI חכמים</strong>
                      <span>שיחות, ביקורות וחשיפה ב־Google וב־AI</span>
                    </div>
                  </div>
                  <div className={styles.price}>
                    <p className={styles.previousPrice}>במקום <del><bdi dir="ltr">{blackFridayPreviousMonthlyPrice} ₪</bdi></del></p>
                    <p className={styles.currentPrice}><bdi dir="ltr">{blackFridayMonthlyPrice}</bdi> <span>₪ לחודש<br />לשניהם</span></p>
                  </div>
                  <div className={styles.offerFacts}>
                    <span>המחיר נשמר לכל חיי המנוי הפעיל</span>
                    <span>הקמה ושלט ממותג כלולים</span>
                  </div>
                  <details className={styles.offerDetails}>
                    <summary>מה כלול ותנאי המנוי</summary>
                    <p>תקופה ראשונית של {commercialTerms.initialMonths} חודשים, ולאחריה חידוש חודשי. ליווי ושלט ממותג אחד כלולים לאחר אימות התשלום. היקף השימוש בכרטיסיית הניקוב וב־Viby UP ייקבע בהזמנה המאושרת; משלוח, תוספות ושימוש מעבר להיקף שאושר יתומחרו מראש. <Link href="/terms#terms-8">לתנאי ההצטרפות והביטול</Link></p>
                  </details>
                </>
              ) : (
                <>
                  <span className={styles.offerBadge}>מבצע 2026 הסתיים</span>
                  <p className={styles.endedText}>ספרו לנו על העסק, ונציע פתרון ומחיר עדכניים.</p>
                </>
              )}
            </div>

            <div className={styles.heroActions}>
              <a className={styles.phone} href={phoneUrl} data-analytics-location="hero" aria-label={`התקשרו ל־Viby במספר ${siteConfig.whatsappDisplay}`}>
                <span>דברו איתנו</span>
                <bdi dir="ltr">{siteConfig.whatsappDisplay}</bdi>
              </a>
              <a className={styles.whatsapp} href={whatsappUrl} data-analytics-location="hero">
                <span className={styles.whatsappIcon}><WhatsAppMark /></span>
                <span>{active ? "קבלו פרטים" : "בקשו הצעה"} ב־<bdi dir="ltr">WhatsApp</bdi></span>
              </a>
            </div>

          </div>

          <figure className={styles.heroImage}>
            <Image
              src="/kartisiyot-nikuv-digitaliyot-qr.jpg"
              alt="לקוחה סורקת שלט QR של Viby בעסק"
              fill
              priority
              sizes="(max-width: 860px) calc(100vw - 2rem), 55vw"
            />
            <figcaption>תנו ללקוחות סיבה לחזור.</figcaption>
          </figure>

          <ul className={styles.outcomes} aria-label="מה העסק יכול לקבל">
            <li><span aria-hidden="true">✓</span>עוד סיבות ללקוחות לחזור ולקנות שוב</li>
            <li><span aria-hidden="true">✓</span>יותר חשיפה ב־Google, במפות ובתוצאות AI</li>
            <li><span aria-hidden="true">✓</span>שליחת הודעות בחינם ללקוחות שלכם</li>
          </ul>

          <div className={styles.brandBar} aria-label="עסקים שמשתמשים ב־Viby">
            <span className={styles.brandLabel}>עסקים שכבר איתנו</span>
            <div className={styles.brandLogos}>
              {socialProofBusinesses.map((business) => (
                <span className={styles.brandLogo} key={business.id} title={business.name}>
                  {business.logoSrc ? <Image src={business.logoSrc} alt={business.name} width={52} height={52} sizes="52px" /> : business.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className={styles.proof} aria-labelledby="proof-title">
        <div className={styles.shell}>
          <h2 id="proof-title">כמה מהעסקים שאיתנו</h2>
          <p className={styles.proofIntro}>המשפטים שכל בעל עסק רוצה לשמוע שוב ושוב.</p>
          <div className={styles.businesses}>
            {featuredBusinesses.map((business) => (
              <figure key={business.id}>
                <Image src={business.photo.cardSrc} alt={business.photo.alt} fill sizes="(max-width: 620px) calc(100vw - 2rem), (max-width: 900px) 33vw, 25vw" />
                <figcaption><strong>{business.name}</strong><span>{business.line}</span></figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.swipeHint}>החליקו להכיר עוד עסקים ←</p>
        </div>
      </section>

      <footer className={`${styles.footer} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={96} height={64} /></Link>
        <nav aria-label="קישורים שימושיים">
          <Link href="/">כרטיסיות ניקוב דיגיטליות</Link>
          <Link href="/viby-up">Viby UP</Link>
          <Link href="/support">תמיכה</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>
          <PrivacyPreferencesButton />
        </nav>
      </footer>
    </main>
  );
}
