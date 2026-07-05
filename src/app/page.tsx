import Image from "next/image";
import { RotatingBusinessChips } from "@/components/RotatingBusinessChips";
import { siteConfig } from "@/lib/site";

const navItems = [
  { label: "דמו", href: "#demo" },
  { label: "למה זה עובד", href: "#why" },
  { label: "משחקים", href: "#games" },
  { label: "חוויה", href: "#process" },
  { label: "תשלום לפי שימוש", href: "#fair" },
  { label: "מחירים", href: "#pricing" },
  { label: "למה Viby", href: "#comparison" },
  { label: "שאלות", href: "#faq" },
  { label: "תמיכה", href: "/support" },
  { label: "כניסת עסקים", href: siteConfig.businessEntranceUrl },
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

const comparisonRows = [
  ["אוספים ניקובים", "משחקים אחרי הקנייה"],
  ["אותה חוויה בכל ביקור", "אפשר לרענן את החוויה"],
  ["קל לשכוח", "יש משהו קטן לצפות לו"],
  ["כרטיסייה בלבד", "מערכת שימור לקוחות חווייתית"],
];

const beliefs = [
  {
    label: "בלי מאמץ",
    title: "נאמנות לא צריכה להרגיש כמו שיעורי בית.",
    text: "הלקוח לא צריך לזכור כרטיסייה, סיסמה או תהליך מסובך. הוא סורק, משחק ומבין מיד מה קורה.",
  },
  {
    label: "רגע מתגמל",
    title: "כל ביקור צריך להרגיש כמו הזדמנות.",
    text: "גם קנייה קטנה יכולה להפוך לרגע של הפתעה, פרס קטן או סיבה טובה לחזור שוב.",
  },
  {
    label: "לעסקים מקומיים",
    title: "כלים יפים ופשוטים, בלי מערכת כבדה.",
    text: "בתי קפה, מספרות, גלידריות ומכוני יופי צריכים חוויה שנראית טוב ועובדת מהר לצוות.",
  },
  {
    label: "סיבה לחזור",
    title: "החיוך לא נגמר כשהלקוח יוצא מהעסק.",
    text: "המטרה היא להשאיר משהו קטן לצפות לו בפעם הבאה, בלי להרגיש כמו עוד קמפיין שיווקי.",
  },
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
    question: "מה זה Viby Fair?",
    answer:
      "Viby Fair הוא מסלול תשלום לפי שימוש: רוכשים חבילת משחקי פרס חד-פעמית ומשתמשים בה בקצב של העסק.",
  },
  {
    question: "האם חייבים להתחייב למנוי חודשי?",
    answer:
      "לא. ב-Viby Fair רוכשים חבילת משחקי פרס ומשתמשים בה בקצב של העסק. מסלול המנוי מתאים לעסקים שמעדיפים משחקי פרס ללא הגבלה במסלול חודשי.",
  },
  {
    question: "מה קורה כשנגמרים משחקי הפרס?",
    answer:
      "המשחקים נעצרים עד לרכישת חבילה נוספת. כרטיסיות הניקוב וכל שאר המידע במערכת נשארים פעילים, ואפשר להמשיך מאותה נקודה לאחר הטעינה.",
  },
  {
    question: "כמה זה עולה?",
    answer:
      "מחיר ההשקה מתחיל ב-₪149 לחודש לחצי שנה ראשונה. לאחר מכן המחיר הוא ₪199 לחודש.",
  },
];

const fairPackages = [
  {
    name: "Starter",
    price: "₪49",
    games: "200 משחקי פרס",
    cost: "≈ ₪0.25 למשחק",
    description:
      "חבילה קטנה להתחלה מהירה בלי התחייבות חודשית.",
  },
  {
    name: "Growth",
    price: "₪99",
    games: "500 משחקי פרס",
    cost: "≈ ₪0.20 למשחק",
    description:
      "החבילה המומלצת לעסקים שרוצים מספיק משחקים כדי לבדוק פעילות אמיתית.",
    featured: true,
  },
  {
    name: "Pro",
    price: "₪179",
    games: "1,000 משחקי פרס",
    cost: "≈ ₪0.18 למשחק",
    description:
      "לעסקים עם יותר תנועה שרוצים יותר משחקים במחיר נמוך יותר למשחק.",
  },
];

const fairSteps = [
  "העסק קונה חבילת שימוש",
  "לקוחות משחקים ומקבלים פרסים",
  "העסק עוקב אחרי היתרה שנשארה",
  "בהמשך: ניהול עצמאי וטעינה מחדש",
];

const whatsappMessage =
  "היי, אשמח לשמוע עוד על Viby ומערכת שימור הלקוחות לעסק שלי";
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;
const fairWhatsappMessage =
  "היי, אשמח לשמוע על Viby Fair ותשלום לפי שימוש לעסק שלי";
const fairWhatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  fairWhatsappMessage,
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
            <a className="button primary" href={demoUrl}>
              נסו את הדמו
            </a>
            <a className="button secondary" href={whatsappUrl}>
              דברו איתנו ב-WhatsApp
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

      <section className="fair section-shell" id="fair">
        <div className="fair-scene" aria-hidden="true">
          <span className="fair-sun" />
          <span className="fair-tent" />
          <span className="fair-booth" />
          <span className="fair-flags" />
        </div>
        <div className="fair-copy">
          <div className="fair-sign">
            <span>Viby</span>
            <strong>Fair</strong>
          </div>
          <p className="eyebrow">תשלום לפי שימוש לעסקים קטנים</p>
          <h2>משלמים לפי שימוש, לא לפי חודש.</h2>
          <p>
            Viby Fair מיועד לעסקים שרוצים להתחיל בלי התחייבות חודשית. רוכשים
            חבילת משחקי פרס חד-פעמית, מפעילים אותה בקצב של העסק, ואם יום אחד
            תעדיפו משחקים ללא הגבלה, תמיד תוכלו לעבור למסלול המנוי.
          </p>
          <div className="fair-steps" aria-label="איך Viby Fair עובד">
            {fairSteps.map((step, index) => (
              <span key={step}>
                <strong>{index + 1}</strong>
                {step}
              </span>
            ))}
          </div>
          <a className="button primary" href={fairWhatsappUrl}>
            התחילו בתשלום לפי שימוש
          </a>
        </div>
        <div className="fair-packages" aria-label="חבילות Viby Fair">
          {fairPackages.map((plan) => (
            <article
              className={`fair-card ${plan.featured ? "featured" : ""}`}
              key={plan.name}
            >
              <span>{`${plan.name}${plan.featured ? " · מומלץ" : ""}`}</span>
              <strong>{plan.price}</strong>
              <h3>{plan.games}</h3>
              <p className="fair-cost">{plan.cost}</p>
              <p>{plan.description}</p>
              <a href={fairWhatsappUrl}>קניית חבילה</a>
            </article>
          ))}
          <p className="fair-package-note">
            החבילות אינן מוגבלות בזמן – משתמשים בהן בקצב של העסק.
          </p>
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

      <section className="comparison section-shell" id="comparison">
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
        <div className="mission-heading">
          <div>
            <p className="eyebrow">למה בנינו את Viby</p>
            <h2>שימור לקוחות לא צריך להרגיש כמו תוכנה.</h2>
          </div>
          <p>
            Viby בנויה סביב רגעים קטנים שהלקוחות מבינים מיד והעסק יכול להפעיל
            בלי להפוך את היום לעוד מסך ניהול.
          </p>
        </div>
        <div className="belief-list">
          {beliefs.map((belief, index) => (
            <article key={belief.title}>
              <span>{belief.label}</span>
              <strong aria-hidden="true">{index + 1}</strong>
              <h3>{belief.title}</h3>
              <p>{belief.text}</p>
            </article>
          ))}
        </div>
      </section>

      <RotatingBusinessChips />

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
          <a href="#fair">Viby Fair</a>
          <a href="#pricing">מחירים</a>
          <a href="/support">תמיכה</a>
          <a href="/terms">תנאי שימוש</a>
          <a href="/privacy">מדיניות פרטיות</a>
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
