import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { createPageMetadata } from "@/lib/seo";
import { generalVibyFaqs, punchCardTypesFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/site";
import styles from "../industry.module.css";

const path = "/industries/bakeries";
const title = "כרטיסייה דיגיטלית למאפייה ולקונדיטוריה";
const description =
  "כרטיסיית ניקוב דיגיטלית למאפיות ולקונדיטוריות. לקוחות צוברים ניקובים והטבות בכל קנייה מזכה ושומרים את הכרטיסייה בארנק הדיגיטלי. הכירו את וייבי.";

export const metadata = createPageMetadata({ path, title, description });

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("היי, אשמח לשמוע איך כרטיסיית Viby יכולה לעבוד במאפייה שלי.")}`;

export default function BakeriesPage() {
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
    <main className={`${styles.page} ${styles.bakery}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={`${styles.header} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={96} height={64} priority /></Link>
        <Link className={styles.homeLink} href="/">לכרטיסיית ניקוב דיגיטלית לעסק</Link>
      </header>

      <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="bakeries-title">
        <div>
          <p className={styles.eyebrow}>למאפיות ולקונדיטוריות</p>
          <h1 id="bakeries-title">כרטיסייה דיגיטלית למאפייה ולקונדיטוריה</h1>
          <p className={styles.lead}>המאפה הבא מתחיל בקנייה של היום. עם וייבי הלקוחות צוברים ניקובים על קניות מזכות ושומרים את הכרטיסייה בארנק הדיגיטלי — בלי להוריד אפליקציה.</p>
          <a className={styles.action} href={whatsappUrl} data-analytics-location="hero">רוצים כרטיסייה למאפייה שלכם?</a>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.photo}>
            <Image src="/industries/bakery-counter-illustrative.webp" alt="המחשה של דלפק מאפייה עם מאפים ושלט Viby לדוגמה" fill sizes="(max-width: 800px) 85vw, 45vw" priority />
            <span className={styles.photoCaption}>סביבת מאפייה — המחשה</span>
          </div>
          <div className={styles.demoCard} aria-label="המחשה של כרטיסיית ניקוב למאפייה">
            <span className={styles.demoLabel}>דוגמה להמחשה</span>
            <div className={styles.demoTop}><strong>הקניות שלי</strong><span aria-hidden="true">🥐</span></div>
            <div className={styles.stamps} aria-label="שלושה מתוך שמונה ניקובים">
              {Array.from({ length: 8 }, (_, index) => <span className={index < 3 ? styles.filled : ""} key={index}>{index < 3 ? "✓" : "·"}</span>)}
            </div>
            <p>מאפה לבחירה אחרי 8 קניות</p>
            <small>הטבה לדוגמה בלבד</small>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="bakery-reward">
        <div className={`${styles.shell} ${styles.twoColumn}`}>
          <div>
            <h2 id="bakery-reward">כל קנייה מקרבת למאפה הבא</h2>
            <p>המאפייה בוחרת אילו קניות מזכות ומהי ההטבה. למשל, אחרי שמונה קניות אפשר להציע מאפה לבחירה במתנה. הלקוח רואה את ההתקדמות בטלפון. זו המחשה, לא הצעה של מאפייה מסוימת.</p>
          </div>
          <div className={styles.reward} aria-label="הטבת מאפייה לדוגמה"><span aria-hidden="true">🥐</span><strong>אחרי 8 קניות — מאפה לבחירה במתנה</strong><small>דוגמה להמחשה בלבד</small></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.concern}`} aria-labelledby="bakery-counter">
        <div className={`${styles.shell} ${styles.concernInner}`}>
          <div className={styles.concernNumber} aria-hidden="true">QR</div>
          <div>
            <h2 id="bakery-counter">גם כשהדלפק עמוס בבוקר</h2>
            <p>גם בבוקר עמוס, לקוחות מצטרפים בסריקת QR ליד הקופה. אחרי קנייה מזכה עובד מורשה מוסיף ניקוב. המאפייה קובעת כללים ברורים ללחם, מאפים וקינוחים; הלקוח אינו מנקב לעצמו.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.finalSection} ${styles.shell}`} aria-labelledby="bakery-contact">
        <h2 id="bakery-contact">המאפייה שלכם יכולה לתת סיבה לחזור</h2>
        <p>ספרו לנו אילו קניות תרצו לתגמל. נציג כרטיסייה למאפייה עם הטבה וכללי צבירה שתבחרו.</p>
        <div className={styles.faqList}>
          <h3>שאלות נפוצות</h3>
          <details>
            <summary>איך מצטרפים ומקבלים ניקוב במאפייה?</summary>
            <p>סורקים QR ליד הדלפק ושומרים את הכרטיסייה בטלפון. עובד מורשה מוסיף ניקוב אחרי קנייה שהמאפייה הגדירה כמזכה.</p>
          </details>
          {[punchCardTypesFaq, ...generalVibyFaqs].map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <a className={styles.action} href={whatsappUrl} data-analytics-location="final_cta">בואו נדבר על כרטיסייה למאפייה</a>
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
