import Image from "next/image";

const navItems = [
  { label: "מה זה", href: "#about" },
  { label: "יכולות", href: "#features" },
  { label: "תהליך", href: "#process" },
  { label: "מחירים", href: "#pricing" },
  { label: "שאלות", href: "#faq" },
];

const features = [
  {
    title: "כרטיס ניקובים דיגיטלי",
    text: "לקוחות צוברים הטבות בלי לשמור כרטיסים פיזיים ובלי שהצוות ינהל מעקב ידני.",
  },
  {
    title: "קמפיינים חוזרים",
    text: "החזירו לקוחות לביקור נוסף עם מבצעים, תזכורות והטבות לפי התנהגות.",
  },
  {
    title: "מדידה בזמן אמת",
    text: "ראו כמה לקוחות חוזרים, אילו הטבות עובדות ואיפה כדאי לשפר את המועדון.",
  },
  {
    title: "הפעלה מהירה",
    text: "מתחילים עם עמוד עסק, הטבה ראשונה וקישור שיתוף בלי פיתוח פנימי.",
  },
];

const steps = [
  "מגדירים את העסק וההטבה הראשונה",
  "משתפים קישור או QR בנקודת המכירה",
  "לקוחות חוזרים, צוברים ומממשים",
];

const plans = [
  {
    name: "Starter",
    price: "₪149",
    description: "לעסק שרוצה להתחיל מועדון לקוחות דיגיטלי בסיסי.",
  },
  {
    name: "Growth",
    price: "₪299",
    description: "לצוות שרוצה קמפיינים, מדידה ושיפור מתמשך.",
    featured: true,
  },
  {
    name: "Scale",
    price: "מותאם",
    description: "לרשתות או עסקים עם צרכים מתקדמים ומספר סניפים.",
  },
];

const faqs = [
  {
    question: "האם צריך אפליקציה?",
    answer: "לא. הגרסה הראשונה בנויה סביב חוויה דיגיטלית פשוטה וקישור נגיש.",
  },
  {
    question: "כמה מהר אפשר להתחיל?",
    answer: "בדרך כלל אפשר להקים כרטיס והטבה ראשונה כבר באותו יום.",
  },
  {
    question: "האם יש התחייבות?",
    answer: "בשלב זה אלו חבילות תצוגה ראשוניות. תנאי המסחר יוגדרו בהמשך.",
  },
];

export default function Home() {
  return (
    <main>
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
          <p className="eyebrow">מועדון לקוחות דיגיטלי לעסקים מקומיים</p>
          <h1>הדרך הקלה להפוך ביקור חד פעמי להרגל שחוזר.</h1>
          <p className="hero-text">
            Viby מחברת בין כרטיס ניקובים דיגיטלי, הטבות חכמות ודאטה פשוטה
            שמראה מה באמת גורם ללקוחות לחזור.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">
              קבעו שיחת היכרות
            </a>
            <a className="button secondary" href="#about">
              לראות איך זה עובד
            </a>
          </div>
          <div className="hero-stats" aria-label="מדדי דוגמה">
            <span>
              <strong>3</strong> דקות להקמה
            </span>
            <span>
              <strong>24/7</strong> מעקב דיגיטלי
            </span>
            <span>
              <strong>0</strong> כרטיסי נייר
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
              <span>הכרטיס של נועה</span>
              <strong>7 / 10</strong>
              <div className="punch-row">
                {Array.from({ length: 10 }).map((_, index) => (
                  <i key={index} className={index < 7 ? "active" : ""} />
                ))}
              </div>
            </div>
            <div className="reward-strip">עוד 3 ביקורים לקפה חינם</div>
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
          <h2>מועדון לקוחות שאפשר להפעיל בלי מערכת כבדה.</h2>
        </div>
        <p>
          במקום כרטיסי נייר, אקסלים ומבצעים שנעלמים, Viby מרכזת את החוויה
          הדיגיטלית של הלקוח ואת הנתונים שהעסק צריך כדי לקבל החלטות.
        </p>
      </section>

      <section className="features section-shell" id="features">
        <div className="section-heading">
          <p className="eyebrow">יכולות בסיס</p>
          <h2>כל מה שצריך לגרסה ראשונה של מועדון לקוחות.</h2>
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
          <h2>דאשבורד שמראה מה קורה במועדון בלי לחפור בדוחות.</h2>
          <p>
            התחילו ממדדים בסיסיים: לקוחות חדשים, ביקורים חוזרים, מימושי הטבות
            וקמפיינים פעילים.
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
          <h2>שלושה צעדים להתחלה.</h2>
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
          <p>כרטיסים פיזיים, מעקב ידני, מעט דאטה וקושי להבין מי חוזר.</p>
        </div>
        <div className="comparison-card digital">
          <h3>עם Viby</h3>
          <p>חוויה דיגיטלית, הטבות מדידות ותמונה ברורה של נאמנות לקוחות.</p>
        </div>
      </section>

      <section className="pricing section-shell" id="pricing">
        <div className="section-heading">
          <p className="eyebrow">מחירים</p>
          <h2>חבילות ראשוניות לתכנון המוצר.</h2>
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
              <a href="#contact">בחרו חבילה</a>
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
          <h2>השאירו פרטים ונבנה יחד את גרסת הבסיס.</h2>
        </div>
        <form className="contact-form">
          <label>
            שם מלא
            <input type="text" name="name" placeholder="השם שלך" />
          </label>
          <label>
            טלפון או אימייל
            <input type="text" name="contact" placeholder="איך נחזור אליך?" />
          </label>
          <label>
            סוג העסק
            <input type="text" name="business" placeholder="קפה, סטודיו, חנות..." />
          </label>
          <button type="button">שלחו בקשה</button>
        </form>
      </section>

      <footer className="site-footer">
        <Image src="/viby_transparent.png" alt="Viby" width={130} height={87} />
        <div>
          <a href="#features">יכולות</a>
          <a href="#pricing">מחירים</a>
          <a href="#contact">יצירת קשר</a>
        </div>
      </footer>
    </main>
  );
}
