import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "תמיכה | Viby",
  description:
    "תמיכה ב-Viby לעסקים: עזרה בהתחלה והגדרה, סריקת QR, מימוש הטבות, חיוב ומנוי, ובקשות שינוי לעסק.",
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    title: "תמיכה | Viby",
    description:
      "מרכז התמיכה של Viby לעסקים: עזרה בהגדרה, תקלות, מימוש הטבות, חיוב ומנוי.",
    url: "/support",
  },
};

const supportMessage =
  "היי, אני צריך/ה עזרה עם Viby. אשמח לתמיכה בנושא:";
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  supportMessage,
)}`;

const supportTopics = [
  {
    title: "התחלה והגדרה",
    text: "עזרה בהפעלת העסק, הגדרת חוויית לקוח ראשונה, חיבור QR והבנת זרימת העבודה.",
  },
  {
    title: "בעיות בסריקה או קישור",
    text: "בדיקה של QR, קישורי דמו או קישורים ללקוחות שלא נפתחים כמו שצריך.",
  },
  {
    title: "מימוש הטבות",
    text: "עזרה לצוות העסק במימוש הטבות, בדיקת זכאות והבנת תהליך המימוש מול לקוח.",
  },
  {
    title: "חיוב ומנוי",
    text: "שאלות על מחיר ההשקה, חידוש מנוי, שינוי מסלול או התאמה לכמה סניפים.",
  },
  {
    title: "בקשות שינוי לעסק",
    text: "עדכון טקסטים, הטבות, משחקים, פרטי עסק או כל שינוי בחוויית הלקוח.",
  },
];

const supportFaqs = [
  {
    question: "מה הדרך הכי מהירה לקבל תמיכה?",
    answer:
      "שליחת הודעת WhatsApp היא הדרך המהירה ביותר. כדאי לציין את שם העסק, מספר טלפון ותיאור קצר של הבעיה.",
  },
  {
    question: "מה לשלוח אם QR לא עובד?",
    answer:
      "שלחו צילום של ה-QR, הקישור שאליו הוא מוביל, ומה קורה כשמנסים לפתוח אותו במכשיר של לקוח.",
  },
  {
    question: "אפשר לבקש שינוי בהטבות או במשחקים?",
    answer:
      "כן. שלחו את השינוי המבוקש, ונעזור לעדכן את החוויה כך שתתאים לעסק.",
  },
  {
    question: "האם התמיכה מיועדת גם לצוות בעסק?",
    answer:
      "כן. אפשר לפנות גם בשאלות תפעוליות של צוות, כמו מימוש הטבות או הסבר קצר על תהליך העבודה.",
  },
];

export default function SupportPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "תמיכה ב-Viby",
    url: `${siteConfig.url}/support`,
    inLanguage: siteConfig.language,
    about: siteConfig.name,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.whatsappNumber}`,
      contactType: "customer support",
      areaServed: siteConfig.areaServed,
      availableLanguage: ["he"],
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
        <nav className="desktop-nav" aria-label="ניווט תמיכה">
          <Link href="/">בית</Link>
          <Link href="/#faq">שאלות נפוצות</Link>
          <Link href="/support" aria-current="page">
            תמיכה
          </Link>
        </nav>
        <a className="header-cta" href={whatsappUrl}>
          WhatsApp
        </a>
      </header>

      <section className="support-hero section-shell">
        <div className="support-hero-copy">
          <p className="eyebrow">מרכז תמיכה</p>
          <h1>תמיכה ב-Viby</h1>
          <p>
            צריכים עזרה בהגדרה, QR, מימוש הטבות או שינוי בחוויית הלקוח? שלחו
            הודעה ונעזור לכם להחזיר את העסק לעבודה רגילה.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappUrl}>
              פתיחת שיחת תמיכה ב-WhatsApp
            </a>
            <Link className="button secondary" href="/how-it-works">
              צפייה בסרטון ההסבר
            </Link>
            <Link className="button secondary" href="/">
              חזרה לאתר
            </Link>
          </div>
        </div>
        <aside className="support-contact-card" aria-label="פרטי תמיכה">
          <span>ערוץ תמיכה ראשי</span>
          <strong>{siteConfig.whatsappDisplay}</strong>
          <p>זמינים לעזרה בהפעלה, תפעול, תקלות ושינויים לעסק.</p>
        </aside>
      </section>

      <section className="video-cta section-shell">
        <div>
          <p className="eyebrow">הדרכת צוות</p>
          <h2>סרטון קצר שמסביר איך עובדים עם Viby.</h2>
          <p>
            מתאים לעובדים חדשים, לבעלי עסקים שרוצים להבין את התהליך ולכל מי
            שצריך לראות את זרימת העבודה לפני שפונים לתמיכה.
          </p>
        </div>
        <Link className="button secondary" href="/how-it-works">
          פתיחת סרטון ההסבר
        </Link>
      </section>

      <section className="support-section section-shell">
        <div className="section-heading">
          <p className="eyebrow">איך אפשר לעזור?</p>
          <h2>נושאי התמיכה הנפוצים.</h2>
        </div>
        <div className="support-topic-grid">
          {supportTopics.map((topic) => (
            <article key={topic.title}>
              <span aria-hidden="true" />
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="support-section section-shell">
        <div className="section-heading">
          <p className="eyebrow">שאלות תמיכה</p>
          <h2>כמה תשובות מהירות לפני שפונים.</h2>
        </div>
        <div className="faq-list">
          {supportFaqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact section-shell">
        <div>
          <p className="eyebrow">עדיין צריכים עזרה?</p>
          <h2>שלחו הודעה עם שם העסק ותיאור קצר של הבעיה.</h2>
        </div>
        <div className="contact-panel">
          <span>תמיכה ב-WhatsApp</span>
          <strong>{siteConfig.whatsappDisplay}</strong>
          <a href={whatsappUrl}>פתיחת שיחת תמיכה</a>
        </div>
      </section>

      <footer className="site-footer">
        <Image src="/viby_transparent.png" alt="Viby" width={130} height={87} />
        <div>
          <Link href="/">בית</Link>
          <Link href="/how-it-works">איך זה עובד</Link>
          <Link href="/#pricing">מחירים</Link>
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
        aria-label="פתיחת שיחת תמיכה ב-WhatsApp"
      >
        WhatsApp
      </a>
    </main>
  );
}
