import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { createPageMetadata } from "@/lib/seo";
import { generalVibyFaqs, punchCardTypesFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/site";
import styles from "../industry.module.css";

const path = "/industries/hair-salons";
const title = "כרטיסייה דיגיטלית למספרה ולברברשופ";
const description =
  "כרטיסיית ניקוב דיגיטלית למספרות וברברשופס. לקוחות צוברים ניקובים בביקורים מזכים ושומרים כרטיס נאמנות בארנק הדיגיטלי, בלי להוריד אפליקציה.";

export const metadata = createPageMetadata({ path, title, description });

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("היי, אשמח לשמוע איך כרטיסיית Viby יכולה לעבוד במספרה שלי.")}`;

export default function HairSalonsPage() {
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
    <main className={`${styles.page} ${styles.salon}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={`${styles.header} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={96} height={64} priority /></Link>
        <Link className={styles.homeLink} href="/">לכרטיס ניקובים דיגיטלי לעסק</Link>
      </header>

      <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="salon-title">
        <div>
          <p className={styles.eyebrow}>למספרות ולברברשופס</p>
          <h1 id="salon-title">כרטיסייה דיגיטלית למספרה ולברברשופ</h1>
          <p className={styles.lead}>תספורת טובה מחזירה לקוחות. כרטיסיית נאמנות דיגיטלית נותנת להם עוד סיבה להגיע שוב, לצבור ניקובים וליהנות מהטבה בביקור הבא.</p>
          <a className={styles.action} href={whatsappUrl} data-analytics-location="hero">רוצים מועדון לקוחות למספרה?</a>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.photo}>
            <Image src="/industries/salon-chair-illustrative.webp" alt="המחשה של עמדת מספרה עם כיסא ושלט Viby לדוגמה" fill sizes="(max-width: 800px) 85vw, 45vw" priority />
            <span className={styles.photoCaption}>סביבת מספרה — המחשה</span>
          </div>
          <div className={styles.demoCard} aria-label="המחשה של כרטיסיית נאמנות למספרה">
            <span className={styles.demoLabel}>דוגמה להמחשה</span>
            <div className={styles.demoTop}><strong>הביקורים שלי</strong><span aria-hidden="true">✂️</span></div>
            <div className={styles.stamps} aria-label="שניים מתוך חמישה ניקובים">
              {Array.from({ length: 5 }, (_, index) => <span className={index < 2 ? styles.filled : ""} key={index}>{index < 2 ? "✓" : "·"}</span>)}
            </div>
            <p>טיפול שיער אחרי 5 ביקורים</p>
            <small>הטבה לדוגמה בלבד</small>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="salon-reward">
        <div className={`${styles.shell} ${styles.twoColumn}`}>
          <div>
            <h2 id="salon-reward">כל ביקור מקרב להטבה</h2>
            <p>המספרה בוחרת אילו שירותים מזכים בניקוב. הכרטיסייה נשמרת ב־<bdi dir="ltr">Apple Wallet</bdi> או <bdi dir="ltr">Google Wallet</bdi>, והלקוח רואה את ההתקדמות. לדוגמה, טיפול שיער במתנה אחרי חמישה ביקורים מזכים. זו המחשה, לא הטבה של מספרה מסוימת.</p>
          </div>
          <div className={styles.reward} aria-label="הטבת מספרה לדוגמה"><span aria-hidden="true">✂️</span><strong>אחרי 5 ביקורים — טיפול שיער במתנה</strong><small>דוגמה להמחשה בלבד</small></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.concern}`} aria-labelledby="salon-visits">
        <div className={`${styles.shell} ${styles.concernInner}`}>
          <div className={styles.concernNumber} aria-hidden="true">✓</div>
          <div>
            <h2 id="salon-visits">הכרטיסייה נשארת גם בין ביקורים</h2>
            <p>בין תספורות עשויים לעבור שבועות. הכרטיסייה נשארת בטלפון, ועובד מורשה מנקב רק אחרי שירות מזכה שהושלם. המספרה בוחרת את כללי הצבירה. הכרטיסייה אינה יומן תורים או חבילת טיפולים מראש.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.finalSection} ${styles.shell}`} aria-labelledby="salon-contact">
        <h2 id="salon-contact">תנו סיבה לחזור לתספורת הבאה</h2>
        <p>ספרו לנו אילו שירותים לתגמל. נציג כרטיסייה וכללי ניקוב שמתאימים למספרה שלכם.</p>
        <div className={styles.faqList}>
          <h3>שאלות נפוצות</h3>
          <details>
            <summary>מתי נוסף ניקוב ומה קורה בין תספורות?</summary>
            <p>עובד מורשה מוסיף ניקוב אחרי שירות מזכה שהושלם. הכרטיסייה נשארת בארנק הדיגיטלי גם כשעוברים שבועות עד הביקור הבא; היא אינה יומן תורים.</p>
          </details>
          {[punchCardTypesFaq, ...generalVibyFaqs].map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <a className={styles.action} href={whatsappUrl} data-analytics-location="final_cta">בואו נדבר על כרטיסייה למספרה</a>
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
