import Image from "next/image";
import { siteConfig } from "@/lib/site";

const navItems = [
  { label: "למה זה עובד", href: "#why" },
  { label: "משחקים", href: "#games" },
  { label: "חוויה", href: "#process" },
  { label: "מחירים", href: "#pricing" },
  { label: "שאלות", href: "#faq" },
];

const whyFlow = [
  "קונים",
  "משחקים",
  "זוכים",
  "מחייכים",
  "חוזרים",
  "משחקים שוב",
];

const games = [
  {
    title: "גלגל מזל",
    text: "יוצר רגע של התרגשות מיד אחרי הקנייה.",
    className: "wheel",
  },
  {
    title: "כרטיסי גירוד",
    text: "גורמים לכל ביקור להרגיש כמו הפתעה קטנה.",
    className: "scratch",
  },
  {
    title: "מתנה מסתורית",
    text: "בונה סקרנות וציפייה עד הפעם הבאה.",
    className: "gift",
  },
  {
    title: "קוביית מזל",
    text: "רגע משחקי קצר לפני שיוצאים מהעסק.",
    className: "dice",
  },
  {
    title: "כרטיסיית ניקוב דיגיטלית",
    text: "ללקוחות שאוהבים לראות התקדמות ולהשלים יעד.",
    className: "punch",
  },
];

const customerJourney = [
  "סורקים QR",
  "משחקים",
  "זוכים בהטבה",
  "שומרים כרטיס חבר",
  "חוזרים שוב",
];

const platformItems = [
  "משחקי נאמנות",
  "מועדון לקוחות דיגיטלי",
  "כרטיסיית ניקוב דיגיטלית",
  "תגמולים והטבות",
  "תובנות על לקוחות חוזרים",
];

const businessTools = [
  "מאגר לקוחות",
  "אנליטיקה",
  "Apple Wallet",
  "Google Wallet",
  "ניהול הטבות",
  "מימוש על ידי צוות",
  "קמפיינים בהמשך",
];

const comparisonRows = [
  ["אוספים ניקובים", "משחקים אחרי הקנייה"],
  ["אותה חוויה בכל ביקור", "אפשר לרענן את החוויה"],
  ["קל לשכוח", "יש משהו קטן לצפות לו"],
  ["כרטיסייה בלבד", "מערכת שימור לקוחות חווייתית"],
];

const beliefs = [
  "אנחנו מאמינים שנאמנות לקוחות לא צריכה להרגיש כמו שיעורי בית.",
  "כל ביקור צריך להרגיש מתגמל.",
  "עסקים מקומיים צריכים כלים יפים, פשוטים ומהנים.",
  "לקוחות צריכים לצאת עם חיוך — ועם משהו קטן לצפות לו בפעם הבאה.",
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
        <a className="header-cta" href={whatsappUrl}>
          דברו איתנו
        </a>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">מערכת לשימור לקוחות לעסקים בישראל</p>
          <h1>תנו ללקוחות סיבה לחזור.</h1>
          <p className="hero-text">
            מערכת שימור לקוחות שהופכת כל ביקור לחוויה מהנה עם משחקים, תגמולים
            ומועדון לקוחות דיגיטלי.
          </p>
          <p className="core-line">
            Viby הופכת שימור לקוחות ממשהו טכני — לחוויה שהלקוחות באמת נהנים
            ממנה.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappUrl}>
              דברו איתנו ב-WhatsApp
            </a>
            <a className="button secondary" href="#process">
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

        <div className="product-stage" aria-label="תצוגת חוויית לקוח לדוגמה">
          <div className="phone-mock experience-phone">
            <Image
              src="/viby_transparent.png"
              alt=""
              width={220}
              height={147}
              className="phone-logo"
            />
            <div className="play-card">
              <span>אחרי הקנייה</span>
              <strong>סובבו וזכו</strong>
              <div className="mini-wheel" aria-hidden="true" />
            </div>
            <div className="reward-strip">זכיתם בהטבה לביקור הבא</div>
            <div className="phone-steps">
              <span>סריקה</span>
              <span>משחק</span>
              <span>חיוך</span>
            </div>
          </div>
          <div className="floating-panel">
            <span>סיבה לחזור</span>
            <strong>בכל ביקור</strong>
          </div>
        </div>
      </section>

      <section className="why section-shell" id="why">
        <div className="section-heading">
          <p className="eyebrow">למה זה עובד</p>
          <h2>לקוחות חוזרים בשביל חוויות, לא בשביל כרטיסיות.</h2>
          <p>
            כל ביקור מרגיש כמו עוד הזדמנות לזכות — לא כמו עוד מועדון לקוחות
            שצריך לזכור.
          </p>
        </div>
        <div className="flow" aria-label="מסלול חזרת לקוח">
          {whyFlow.map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      </section>

      <section className="games section-shell" id="games">
        <div className="section-heading">
          <p className="eyebrow">בחרו איך הלקוחות שלכם משחקים</p>
          <h2>כל עסק יכול לבחור את הרגע שהלקוחות שלו הכי יאהבו.</h2>
        </div>
        <div className="game-grid">
          {games.map((game) => (
            <article className={`game-card ${game.className}`} key={game.title}>
              <span className="game-visual" aria-hidden="true" />
              <h3>{game.title}</h3>
              <p>{game.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="journey section-shell" id="process">
        <div className="section-heading">
          <p className="eyebrow">החוויה של הלקוח</p>
          <h2>מהרגע שהוא משלם ועד הסיבה הבאה לחזור.</h2>
        </div>
        <div className="journey-grid">
          {customerJourney.map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="platform section-shell" id="about">
        <div>
          <p className="eyebrow">יותר ממועדון לקוחות</p>
          <h2>Viby מחברת בין משחק, תגמול ודאטה כדי להגדיל ביקורים חוזרים.</h2>
        </div>
        <div className="platform-list">
          {platformItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="business-tools section-shell" id="features">
        <div className="section-heading">
          <p className="eyebrow">מאחורי הקלעים</p>
          <h2>כל מה שהעסק צריך כדי להפעיל חוויה בלי להוסיף עבודה.</h2>
        </div>
        <div className="tool-grid">
          {businessTools.map((tool) => (
            <article key={tool}>
              <span aria-hidden="true" />
              <h3>{tool}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison section-shell">
        <div className="section-heading">
          <p className="eyebrow">כרטיסיות רגילות vs Viby</p>
          <h2>כרטיסייה עדיין יכולה לעבוד. Viby הופכת אותה לחוויה שלמה.</h2>
        </div>
        <div className="comparison-table">
          <div className="comparison-head">
            <span>כרטיסיות רגילות</span>
            <span>Viby</span>
          </div>
          {comparisonRows.map(([traditional, viby]) => (
            <div className="comparison-row" key={traditional}>
              <span>{traditional}</span>
              <strong>{viby}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="mission section-shell">
        <div className="section-heading">
          <p className="eyebrow">למה בנינו את Viby</p>
          <h2>שימור לקוחות לא צריך להרגיש כמו תוכנה.</h2>
        </div>
        <div className="belief-list">
          {beliefs.map((belief) => (
            <p key={belief}>{belief}</p>
          ))}
        </div>
      </section>

      <section className="businesses section-shell" aria-label="סוגי עסקים">
        {targetBusinesses.map((business) => (
          <span key={business}>{business}</span>
        ))}
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
          <a href="#why">למה זה עובד</a>
          <a href="#games">משחקים</a>
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
