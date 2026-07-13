import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "איך Viby עובדת",
  description:
    "סרטון הסבר מלא על Viby לעובדים, לקוחות פוטנציאליים ובעלי עסקים שרוצים להבין איך המערכת עובדת בפועל.",
  alternates: {
    canonical: "/how-it-works",
  },
  openGraph: {
    title: "איך Viby עובדת | Viby",
    description:
      "צפו בהסבר מלא על זרימת הלקוח, עבודת הצוות, מימוש הטבות והפעלת Viby בעסק.",
    url: "/how-it-works",
  },
};

const whatsappMessage =
  "היי, צפיתי בסרטון ההסבר של Viby ואשמח לשמוע עוד";
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;
const demoUrl =
  "https://customer-retention-system-six.vercel.app/d/viby-VFE1A2";
const vimeoEmbedUrl =
  "https://player.vimeo.com/video/1209541694?badge=0&autopause=0&player_id=0&app_id=58479";

const chapters = [
  {
    title: "זרימת הלקוח",
    text: "איך לקוח סורק QR, משחק, זוכה בהטבה ומקבל סיבה לחזור.",
  },
  {
    title: "עבודת הצוות",
    text: "איך העובדים בעסק מבינים את התהליך ומממשים הטבות מול לקוחות.",
  },
  {
    title: "משחקים ופרסים",
    text: "איך Viby הופכת קנייה רגילה לרגע קצר של משחק והפתעה.",
  },
  {
    title: "הפעלת העסק",
    text: "מה חשוב לדעת כשמתחילים לעבוד עם המערכת ביום-יום.",
  },
];

export default function HowItWorksPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "איך Viby עובדת",
    description:
      "סרטון הסבר מלא על Viby לעובדים, לקוחות פוטנציאליים ובעלי עסקים.",
    embedUrl: vimeoEmbedUrl,
    url: `${siteConfig.url}/how-it-works`,
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.ogImage}`,
      },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Viby">
          <Image
            src="/viby_transparent.png"
            alt="Viby"
            width={180}
            height={120}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="ניווט הסבר">
          <Link href="/">בית</Link>
          <Link href="/#demo">דמו</Link>
          <Link href="/#pricing">מחירים</Link>
          <Link href="/support">תמיכה</Link>
        </nav>
        <a className="header-cta" href={whatsappUrl}>
          דברו איתנו
        </a>
      </header>

      <section className="video-hero section-shell">
        <div>
          <p className="eyebrow">סרטון הסבר מלא</p>
          <h1>איך Viby עובדת בפועל.</h1>
          <p>
            סרטון הדרכה קצר וברור לצוותים, בעלי עסקים ולקוחות פוטנציאליים:
            מה הלקוח רואה, איך הצוות עובד עם המערכת, ואיך המשחקים הופכים
            ביקור רגיל לסיבה לחזור.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={demoUrl}>
              פתיחת הדמו
            </a>
            <a className="button secondary" href={whatsappUrl}>
              שאלות ב-WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section-shell" aria-label="סרטון הסבר Viby">
        <div className="video-frame">
          <iframe
            src={vimeoEmbedUrl}
            title="Viby_Main_Video"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <section className="section-shell video-chapters">
        {chapters.map((chapter, index) => (
          <article key={chapter.title}>
            <span>{index + 1}</span>
            <h2>{chapter.title}</h2>
            <p>{chapter.text}</p>
          </article>
        ))}
      </section>

      <section className="contact section-shell">
        <div>
          <p className="eyebrow">רוצים להתחיל?</p>
          <h2>אחרי הסרטון אפשר לבדוק התאמה לעסק שלכם.</h2>
        </div>
        <div className="contact-panel">
          <span>שיחה עם Viby</span>
          <strong>{siteConfig.whatsappDisplay}</strong>
          <a href={whatsappUrl}>פתיחת שיחה ב-WhatsApp</a>
        </div>
      </section>

      <footer className="site-footer">
        <Image src="/viby_transparent.png" alt="Viby" width={130} height={87} />
        <div>
          <Link href="/">בית</Link>
          <Link href="/how-it-works">איך זה עובד</Link>
          <Link href="/support">תמיכה</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>
          <a href={siteConfig.businessEntranceUrl}>כניסת עסקים</a>
          <a href={whatsappUrl}>WhatsApp</a>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={whatsappUrl}
        aria-label="פתיחת שיחה ב-WhatsApp"
      >
        WhatsApp
      </a>
    </main>
  );
}
