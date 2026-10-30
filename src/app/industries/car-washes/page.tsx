import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { createPageMetadata } from "@/lib/seo";
import { generalVibyFaqs, punchCardTypesFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/site";
import styles from "../industry.module.css";

const path = "/industries/car-washes";
const title = "כרטיסיית ניקוב דיגיטלית לשטיפת רכב";
const description =
  "כרטיסיית נאמנות דיגיטלית לשטיפת רכב: לקוחות צוברים ניקובים אחרי ביקורים מזכים ושומרים את הכרטיסייה בארנק הדיגיטלי. הכירו את Viby.";

export const metadata = createPageMetadata({
  path,
  title,
  description,
});

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("היי, אשמח לשמוע איך כרטיסיית Viby יכולה לעבוד בעסק לשטיפת רכב.")}`;

export default function CarWashesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}${path}#webpage`,
    url: `${siteConfig.url}${path}`,
    name: `${title} | Viby`,
    description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <main className={`${styles.page} ${styles.carWash}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={`${styles.header} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={96} height={64} priority /></Link>
        <Link className={styles.homeLink} href="/">לכרטיס ניקוב דיגיטלי לעסק</Link>
      </header>

      <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="car-washes-title">
        <div>
          <p className={styles.eyebrow}>לעסקים לשטיפת רכב</p>
          <h1 id="car-washes-title">כרטיסיית ניקוב דיגיטלית לשטיפת רכב</h1>
          <p className={styles.lead}>השטיפה נגמרת. הסיבה לחזור נשארת. הלקוח שומר כרטיסיית נאמנות בטלפון, והצוות מוסיף ניקוב רק אחרי ביקור מזכה שהושלם. הלקוח רואה את הדרך להטבה הבאה בלי לשמור כרטיס נייר ברכב.</p>
          <a className={styles.action} href={whatsappUrl} data-analytics-location="hero">רוצים כרטיסיית שטיפות לעסק?</a>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.photo}>
            <Image src="/social_proof_businesses/magicwash-carwash-card-800.webp" alt="מתחם שטיפת רכב עם שלט הצטרפות של Viby" fill sizes="(max-width: 800px) 85vw, 45vw" priority />
            <span className={styles.photoCaption}>Viby במתחם שטיפת רכב</span>
          </div>
          <div className={styles.demoCard} aria-label="המחשה של כרטיסיית נאמנות לשטיפת רכב">
            <span className={styles.demoLabel}>דוגמה להמחשה</span>
            <div className={styles.demoTop}><strong>ביקורים מזכים</strong><span aria-hidden="true">🚙</span></div>
            <div className={styles.stamps} aria-label="שלושה מתוך חמישה ניקובים">
              {Array.from({ length: 5 }, (_, index) => <span className={index < 3 ? styles.filled : ""} key={index}>{index < 3 ? "✓" : "·"}</span>)}
            </div>
            <p>שדרוג שירות אחרי 5 שטיפות</p>
            <small>הטבה לדוגמה, לא הצעה של העסק המצולם</small>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="wash-reward">
        <div className={`${styles.shell} ${styles.twoColumn}`}>
          <div>
            <h2 id="wash-reward">הטבה שמרוויחים מביקורים</h2>
            <p>כרטיסיית Viby יכולה לתגמל לקוחות שחוזרים לשטיפה: העסק מגדיר כמה ביקורים מזכים נדרשים ומה מקבלים בסופם. לדוגמה, שדרוג שירות לאחר חמש שטיפות שהושלמו. ההמחשה כאן אינה הצעה של העסק המצולם, ואין בה התחייבות להטבה מסוימת.</p>
          </div>
          <div className={styles.reward} aria-label="הטבת שטיפת רכב לדוגמה"><span aria-hidden="true">🚗</span><strong>שדרוג שירות אחרי 5 שטיפות</strong><small>דוגמה להמחשה בלבד</small></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.concern}`} aria-labelledby="wash-control">
        <div className={`${styles.shell} ${styles.concernInner}`}>
          <div className={styles.concernNumber} aria-hidden="true">✓</div>
          <div>
            <h2 id="wash-control">הניקוב נשאר בשליטת הצוות</h2>
            <p>עובד מורשה מוסיף ניקוב אחרי ביקור מזכה ומאמת את מימוש ההטבה. הלקוח רואה את ההתקדמות בכרטיסייה הדיגיטלית, אבל אינו מנקב לעצמו. הניקוב אינו אוטומטי ואינו נשען על זיהוי לוחית רישוי. זו תוכנית הטבות על ביקורים שהושלמו, לא חבילת שטיפות שנקנתה מראש.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.finalSection} ${styles.shell}`} aria-labelledby="wash-contact">
        <h2 id="wash-contact">תנו סיבה לחזור לשטיפה הבאה</h2>
        <p>ספרו לנו איך הצוות מאשר שטיפה שהושלמה ואיזו הטבה תתאים ללקוחות שלכם. נציג לכם דרך פשוטה להפעיל כרטיסיית ניקוב ולשמור את ההחלטה על הניקוב והמימוש בידי העובדים המורשים.</p>
        <div className={styles.faqList}>
          <h3>שאלות נפוצות</h3>
          <details>
            <summary>מתי נספרת שטיפה, והאם זו חבילה מראש?</summary>
            <p>עובד מורשה מוסיף ניקוב רק אחרי שטיפה מזכה שהושלמה. הלקוח צובר הטבה לביקור עתידי; זו אינה חבילת שטיפות בתשלום מראש.</p>
          </details>
          {[punchCardTypesFaq, ...generalVibyFaqs].map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <a className={styles.action} href={whatsappUrl} data-analytics-location="final_cta">בואו נדבר על כרטיסייה לשטיפת רכב</a>
      </section>

      <footer className={`${styles.footer} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={92} height={62} /></Link>
        <nav aria-label="קישורים שימושיים">
          <Link href="/how-it-works">איך Viby עובדת</Link>
          <Link href="/support">תמיכה</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>
          <PrivacyPreferencesButton />
        </nav>
      </footer>
    </main>
  );
}
