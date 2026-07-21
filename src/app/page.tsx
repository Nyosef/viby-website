import Image from "next/image";
import { LandingNav } from "@/components/LandingNav";
import { siteConfig } from "@/lib/site";

const navItems = [
  { label: "איך זה עובד", href: "/how-it-works" },
  { label: "דוגמאות", href: "#games" },
  { label: "מחירים", href: "#pricing" },
  { label: "Instagram", href: siteConfig.instagramUrl },
];

const secondaryNavItems = [
  { label: "דמו", href: "#demo" },
  { label: "למה זה עובד", href: "#why" },
  { label: "משחקים", href: "#games" },
  { label: "החוויה", href: "#process" },
  { label: "WhatsApp", href: "" },
  { label: "שאלות", href: "#faq" },
  { label: "תמיכה", href: "/support" },
  { label: "כניסת עסקים", href: siteConfig.businessEntranceUrl },
];

const mobileNavItems = [
  { label: "איך זה עובד", href: "/how-it-works" },
  { label: "דוגמאות", href: "#games" },
  { label: "מחירים", href: "#pricing" },
  { label: "WhatsApp", href: "" },
  { label: "כניסת עסקים", href: siteConfig.businessEntranceUrl },
];

const heroFeatures = [
  "ללא אפליקציה",
  "Apple Wallet",
  "Google Wallet",
  "כרטיסייה דיגיטלית",
];

const heroProofBusinesses = [
  "בתי קפה",
  "פיצריות",
  "מספרות",
  "מכוני יופי",
  "מאמנים",
  "סטודיואים",
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

const plans = [
  {
    name: "מסלול התחלה",
    price: "החל מ-₪49 לחודש",
    description:
      "מסלול התחלה לעסק שרוצה כרטיסיות דיגיטליות, Wallet וחוויות החזרת לקוחות.",
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
      "המחירים מתחילים ב-₪49 לחודש במסלול התחלה לעסק שרוצה כרטיסיות דיגיטליות, Wallet וחוויות החזרת לקוחות.",
  },
];

const whatsappMessage =
  "היי, אשמח לשמוע עוד על Viby ומערכת שימור הלקוחות לעסק שלי";
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;
const demoUrl =
  "https://customer-retention-system-six.vercel.app/d/viby-VFE1A2";

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
        <LandingNav
          primaryItems={navItems}
          secondaryItems={secondaryNavItems.map((item) =>
            item.label === "WhatsApp" ? { ...item, href: whatsappUrl } : item,
          )}
          mobileItems={mobileNavItems.map((item) =>
            item.label === "WhatsApp" ? { ...item, href: whatsappUrl } : item,
          )}
        />
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">מערכת שמחזירה לקוחות</p>
          <h1>העסק שלכם. בארנק של הלקוח.</h1>
          <p className="hero-text hero-punch">
            Apple Wallet או Google Wallet - ושם Viby מחזירה אותם אליכם.
          </p>
          <p className="curiosity-line">
            הלקוחות שלכם כבר לא צריכים להוריד אפליקציה. הם פשוט שומרים את
            העסק בארנק שלהם.
          </p>
          <div className="hero-feature-strip" aria-label="יכולות מרכזיות">
            {heroFeatures.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
          <div className="hero-actions">
            <a className="button primary" href={demoUrl}>
              נסו את החוויה כלקוח
            </a>
            <a className="button video-button" href="/how-it-works">
              <span aria-hidden="true">▶</span>
              צפו בסרטון קצר
            </a>
          </div>
          <p className="hero-benefit-line">
            יותר לקוחות חוזרים, פחות כרטיסיות נייר, והכול נשמר בארנק של הלקוח.
          </p>
          <div className="hero-proof" aria-label="הוכחה חברתית">
            <strong>★★★★★</strong>
            <span>בשימוש בעשרות לקוחות בישראל</span>
            <div>
              {heroProofBusinesses.map((business) => (
                <em key={business}>{business}</em>
              ))}
            </div>
          </div>
        </div>

        <div className="product-stage" aria-label="תצוגת חוויית לקוח לדוגמה">
          <div className="phone-mock experience-phone">
            <div className="wallet-screen">
              <div className="phone-status" aria-hidden="true">
                <span>9:41</span>
                <span>Wallet</span>
              </div>
              <div className="wallet-pass">
                <div>
                  <span>Viby Wallet</span>
                  <strong>קפה השכונה</strong>
                </div>
                <Image
                  src="/viby_transparent.png"
                  alt=""
                  width={96}
                  height={64}
                  className="wallet-logo"
                />
              </div>
              <div className="wallet-badges" aria-label="ארנקים נתמכים">
                <span>Apple Wallet</span>
                <span>Google Wallet</span>
              </div>
              <div className="wallet-punch-card">
                <div>
                  <span>כרטיסיית ניקוב</span>
                  <strong>7/10</strong>
                </div>
                <div className="wallet-punch-row" aria-hidden="true">
                  {Array.from({ length: 10 }, (_, index) => (
                    <i
                      className={index < 7 ? "active" : ""}
                      key={`punch-${index}`}
                    />
                  ))}
                </div>
              </div>
              <div className="wallet-reward-card">
                <div>
                  <span>הטבה לביקור הבא</span>
                  <strong>גלגל מזל פתוח</strong>
                </div>
                <div className="mini-wheel" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="demo section-shell" id="demo">
        <div className="demo-copy">
          <p className="eyebrow">נסו בעצמכם</p>
          <h2>סרקו את הקוד ותראו איך לקוח מרגיש את Viby בפועל.</h2>
          <p>
            פתחו את הדמו, שחקו כמו לקוח אחרי קנייה, ותראו איך רגע קטן של משחק
            הופך לסיבה לחזור.
          </p>
          <a className="button primary" href={demoUrl}>
            פתיחת הדמו
          </a>
        </div>
        <a className="qr-card" href={demoUrl} aria-label="פתיחת דמו Viby">
          <Image
            src="/viby-demo-qr.svg"
            alt="QR לפתיחת דמו Viby"
            width={260}
            height={260}
            unoptimized
          />
          <span>אפשר לסרוק או ללחוץ</span>
        </a>
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

      <section className="pricing section-shell" id="pricing">
        <div className="section-heading">
          <p className="eyebrow">מחירים</p>
          <h2>מחירים פשוטים לעסקים שמתחילים עכשיו.</h2>
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
              <a href={demoUrl}>נסו את החוויה</a>
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
          <a href="/how-it-works">איך זה עובד</a>
          <a href="#games">משחקים</a>
          <a href="#pricing">מחירים</a>
          <a href="/support">תמיכה</a>
          <a href="/terms">תנאי שימוש</a>
          <a href="/privacy">מדיניות פרטיות</a>
          <a href={siteConfig.businessEntranceUrl}>כניסת עסקים</a>
          <a href={siteConfig.instagramUrl}>Instagram</a>
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
