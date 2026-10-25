import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import styles from "../industry.module.css";

const path = "/industries/cafes";
const title = "כרטיסיית ניקוב דיגיטלית לבית קפה ולעגלת קפה";
const description =
  "כרטיסייה דיגיטלית לבתי קפה ולעגלות קפה. הלקוחות סורקים QR, צוברים ניקובים ושומרים את הכרטיסייה ב־Apple Wallet או Google Wallet. הכירו את Viby.";

export const metadata = createPageMetadata({
  path,
  title,
  description,
});

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("היי, אשמח לשמוע איך כרטיסיית Viby יכולה לעבוד בבית הקפה שלי.")}`;

export default function CafesPage() {
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
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={`${styles.header} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={96} height={64} priority /></Link>
        <Link className={styles.homeLink} href="/">לכרטיסייה הדיגיטלית</Link>
      </header>

      <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="cafes-title">
        <div>
          <p className={styles.eyebrow}>לבתי קפה ועגלות קפה</p>
          <h1 id="cafes-title">כרטיסיית ניקוב דיגיטלית לבית קפה</h1>
          <p className={styles.lead}>הקפה הבא מתחיל בביקור הזה. הלקוחות מצטרפים בסריקת QR, צוברים ניקובים ושומרים את הכרטיסייה ב־<bdi dir="ltr">Apple Wallet</bdi> או <bdi dir="ltr">Google Wallet</bdi> — בלי להוריד אפליקציה. כך ההטבה הבאה נשארת בטלפון גם אחרי שהם יוצאים מהדלת.</p>
          <a className={styles.action} href={whatsappUrl} data-analytics-location="hero">רוצים כרטיסייה לבית הקפה?</a>
        </div>
        <div className={styles.heroVisual}>
          {/* Publication gate: confirm permission for this existing customer photo before deployment. */}
          <div className={styles.photo}>
            <Image src="/social_proof_businesses/lihi-coffee-card-800.webp" alt="דלפק בית קפה עם שלט הצטרפות של Viby" fill sizes="(max-width: 800px) 85vw, 45vw" priority />
            <span className={styles.photoCaption}>Viby על הדלפק בבית קפה</span>
          </div>
          <div className={styles.demoCard} aria-label="המחשה של כרטיסיית ניקוב לבית קפה">
            <span className={styles.demoLabel}>דוגמה להמחשה</span>
            <div className={styles.demoTop}><strong>הכרטיסייה שלי</strong><span aria-hidden="true">☕</span></div>
            <div className={styles.stamps} aria-label="שישה מתוך עשרה ניקובים">
              {Array.from({ length: 10 }, (_, index) => <span className={index < 6 ? styles.filled : ""} key={index}>{index < 6 ? "✓" : "·"}</span>)}
            </div>
            <p>קפה עשירי במתנה</p>
            <small>הטבה לדוגמה, לא הצעה של בית הקפה המצולם</small>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="coffee-reward">
        <div className={`${styles.shell} ${styles.twoColumn}`}>
          <div>
            <h2 id="coffee-reward">כל קפה מקרב להטבה הבאה</h2>
            <p>בעל העסק בוחר כמה ניקובים מזכים בהטבה, והלקוח רואה את ההתקדמות בכרטיסייה שבטלפון. למשל, אפשר להמחיש מסלול שבו אחרי תשעה קפה שנרכשו, הקפה העשירי ניתן במתנה. זו דוגמה לאופן ההפעלה, לא הטבה שמוצעת בבית הקפה המצולם.</p>
          </div>
          <div className={styles.reward} aria-label="הטבת קפה לדוגמה"><span aria-hidden="true">☕</span><strong>קפה עשירי במתנה</strong><small>דוגמה להמחשה בלבד</small></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.concern}`} aria-labelledby="coffee-queue">
        <div className={`${styles.shell} ${styles.concernInner}`}>
          <div className={styles.concernNumber} aria-hidden="true">QR</div>
          <div>
            <h2 id="coffee-queue">גם כשיש תור ליד המכונה</h2>
            <p>שלט QR על הדלפק מאפשר ללקוח להתחיל את ההצטרפות מהטלפון, בלי לבקש כרטיס נייר או להתקין אפליקציית Viby. אחרי קנייה מזכה, עובד מורשה מוסיף ניקוב דרך ממשק הצוות. כך הצוות נשאר אחראי לניקוב, גם בשעות שבהן השירות ליד המכונה צריך להישאר פשוט וברור.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.finalSection} ${styles.shell}`} aria-labelledby="coffee-contact">
        <h2 id="coffee-contact">נראה איך זה יעבוד אצלכם</h2>
        <p>ספרו לנו איך נראים הביקורים בבית הקפה או בעגלת הקפה שלכם. נוכל להראות כרטיסייה שמתאימה לקצב השירות ולהטבה שתרצו להציע, בלי להניח שכל עסק עובד באותה הדרך.</p>
        <a className={styles.action} href={whatsappUrl} data-analytics-location="final_cta">בואו נדבר על כרטיסייה לבית הקפה</a>
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
