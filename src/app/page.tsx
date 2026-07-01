import Image from "next/image";
import { siteConfig } from "@/lib/site";

const navItems = [
  { label: "מה זה", href: "#about" },
  { label: "יכולות", href: "#features" },
  { label: "תהליך", href: "#process" },
  { label: "מחירים", href: "#pricing" },
  { label: "שאלות", href: "#faq" },
];

const features = [
  {
    title: "כרטיסיות דיגיטליות",
    text: "לקוחות צוברים ניקובים והטבות בלי כרטיסי נייר ובלי מעקב ידני בקופה.",
  },
  {
    title: "משחקי נאמנות",
    text: "גלגל מזל, כרטיסי גירוד וחוויות משחקיות שהופכות הטבה לרגע שכיף לחזור אליו.",
  },
  {
    title: "מועדון לקוחות",
    text: "בנו רשימת לקוחות פעילה לעסק המקומי שלכם והציעו הטבות שחוזרות עם הלקוח.",
  },
  {
    title: "מדידה בזמן אמת",
    text: "ראו כמה לקוחות חוזרים, אילו משחקים עובדים ואילו הטבות מניעות ביקור נוסף.",
  },
];

const steps = [
  "מגדירים את העסק וההטבה הראשונה",
  "משתפים קישור או QR בנקודת המכירה",
  "לקוחות חוזרים, צוברים ומממשים",
];

const plans = [
  {
    name: "השקת Viby",
    price: "₪149",
    description:
      "מחיר השקה מיוחד לחצי שנה ראשונה. לאחר מכן ₪199 לחודש.",
    featured: true,
  },
  {
    name: "עסק עם כמה סניפים",
    price: "מותאם",
    description:
      "לעסקים שרוצים להפעיל משחקי נאמנות במספר נקודות מכירה או מותגים.",
  },
];

const faqs = [
  {
    question: "האם צריך אפליקציה?",
    answer: "לא. הלקוח נכנס דרך קישור או QR ומקבל חוויה דיגיטלית פשוטה.",
  },
  {
    question: "לאילו עסקים זה מתאים?",
    answer:
      "לבתי קפה, עגלות קפה, ברי יין, פיצריות, גלידריות, מספרות, מכוני יופי וכל עסק שיכול להפוך חזרה של לקוחות למשחק.",
  },
  {
    question: "כמה זה עולה?",
    answer:
      "מחיר ההשקה מתחיל ב-₪149 לחודש לחצי שנה ראשונה. לאחר מכן המחיר הוא ₪199 לחודש.",
  },
];

const targetBusinesses = [
  "בתי קפה",
  "עגלות קפה",
  "ברי יין",
  "פיצריות",
  "גלידריות",
  "מכוני יופי",
  "מספרות",
];

const whatsappMessage =
  "היי, אשמח לשמוע עוד על Viby ומערכת שימור הלקוחות לעסק שלי";
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.ogImage}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.locality,
          addressCountry: siteConfig.address.country,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${siteConfig.whatsappNumber}`,
          contactType: "sales",
          areaServed: siteConfig.areaServed,
          availableLanguage: ["he"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: siteConfig.language,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: siteConfig.description,
        url: siteConfig.url,
        areaServed: siteConfig.areaServed,
        offers: {
          "@type": "Offer",
          price: siteConfig.launchPrice,
          priceCurrency: "ILS",
          availability: "https://schema.org/PreOrder",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Viby">
          <Image
            src="/viby_transparent.png"
            alt="Viby"
            width={180}
            height={120}
            priority
          />
        </a>
        <nav className="desktop-nav" aria-label="ניווט ראשי">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">
          דברו איתנו
        </a>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">מערכת לשימור לקוחות לעסקים בישראל</p>
          <h1>מערכת לשימור לקוחות שגורמת ללקוחות לחזור שוב ושוב</h1>
          <p className="hero-text">
            משחקי נאמנות, כרטיסיות דיגיטליות, גלגל מזל, כרטיסי גירוד ומועדון
            לקוחות - הכל במערכת אחת.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappUrl}>
              דברו איתנו ב-WhatsApp
            </a>
            <a className="button secondary" href="#about">
              לראות איך זה עובד
            </a>
          </div>
          <div className="hero-stats" aria-label="מדדי דוגמה">
            <span>
              <strong>₪149</strong> מחיר השקה
            </span>
            <span>
              <strong>6</strong> חודשים בהנחה
            </span>
            <span>
              <strong>₪199</strong> לאחר מכן
            </span>
          </div>
        </div>

        <div className="product-stage" aria-label="תצוגת מוצר לדוגמה">
          <div className="phone-mock">
            <Image
              src="/viby_transparent.png"
              alt=""
              width={220}
              height={147}
              className="phone-logo"
            />
            <div className="loyalty-card">
              <span>משחק הנאמנות של נועה</span>
              <strong>7 / 10</strong>
              <div className="punch-row">
                {Array.from({ length: 10 }).map((_, index) => (
                  <i key={index} className={index < 7 ? "active" : ""} />
                ))}
              </div>
            </div>
            <div className="reward-strip">עוד 3 ביקורים להטבה הבאה</div>
          </div>
          <div className="floating-panel">
            <span>לקוחות חוזרים</span>
            <strong>+38%</strong>
          </div>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div>
          <p className="eyebrow">מה זה Viby?</p>
          <h2>מערכת שימור לקוחות שנבנתה לעסקים שמוכרים חוויה.</h2>
        </div>
        <p>
          Viby מתאימה לבתי קפה, עגלות קפה, ברי יין, פיצריות, גלידריות,
          מספרות ומכוני יופי שרוצים להפוך כל ביקור להזדמנות לחזרה נוספת.
        </p>
      </section>

      <section className="businesses section-shell" aria-label="סוגי עסקים">
        {targetBusinesses.map((business) => (
          <span key={business}>{business}</span>
        ))}
      </section>

      <section className="features section-shell" id="features">
        <div className="section-heading">
          <p className="eyebrow">יכולות מרכזיות</p>
          <h2>כל מה שצריך כדי להפוך נאמנות לקוחות למשחק חוזר.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-icon" aria-hidden="true" />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard section-shell">
        <div className="dashboard-copy">
          <p className="eyebrow">תמונת מצב פשוטה</p>
          <h2>דאשבורד שמראה אילו משחקים באמת מחזירים לקוחות.</h2>
          <p>
            התחילו ממדדים פשוטים: לקוחות חדשים, ביקורים חוזרים, מימושי הטבות
            ומשחקי נאמנות פעילים.
          </p>
        </div>
        <div className="dashboard-preview">
          <div className="metric-card">
            <span>לקוחות פעילים</span>
            <strong>1,284</strong>
          </div>
          <div className="metric-card">
            <span>מימושים החודש</span>
            <strong>312</strong>
          </div>
          <div className="chart" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>

      <section className="process section-shell" id="process">
        <div className="section-heading">
          <p className="eyebrow">איך זה עובד</p>
          <h2>שלושה צעדים שמתחילים כבר בנקודת המכירה.</h2>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison section-shell">
        <div className="comparison-card paper">
          <h3>לפני</h3>
          <p>כרטיסים פיזיים, מבצעים שנשכחים וקושי להפוך ביקור להרגל.</p>
        </div>
        <div className="comparison-card digital">
          <h3>עם Viby</h3>
          <p>משחקים דיגיטליים, הטבות מדידות ותמריץ ברור לביקור הבא.</p>
        </div>
      </section>

      <section className="pricing section-shell" id="pricing">
        <div className="section-heading">
          <p className="eyebrow">מחירים</p>
          <h2>מחיר השקה פשוט לעסקים שמתחילים עכשיו.</h2>
        </div>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article
              className={`price-card ${plan.featured ? "featured" : ""}`}
              key={plan.name}
            >
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.description}</p>
              <a href={whatsappUrl}>דברו איתנו</a>
            </article>
          ))}
        </div>
      </section>

      <section className="faq section-shell" id="faq">
        <div className="section-heading">
          <p className="eyebrow">שאלות נפוצות</p>
          <h2>כמה תשובות לפני שמתחילים.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div>
          <p className="eyebrow">רוצים לבדוק התאמה?</p>
          <h2>שלחו WhatsApp ונבדוק אם Viby מתאימה לעסק שלכם.</h2>
        </div>
        <div className="contact-panel">
          <span>הרצליה, ישראל</span>
          <strong>{siteConfig.whatsappDisplay}</strong>
          <a href={whatsappUrl}>פתיחת שיחה ב-WhatsApp</a>
        </div>
      </section>

      <footer className="site-footer">
        <Image src="/viby_transparent.png" alt="Viby" width={130} height={87} />
        <div>
          <a href="#features">יכולות</a>
          <a href="#pricing">מחירים</a>
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
