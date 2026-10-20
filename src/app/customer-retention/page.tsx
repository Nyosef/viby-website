import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { ServiceIllustration } from "@/components/ServiceIllustration";
import { commercialTerms, monthlyPrice, subscriptionPriceNotice } from "@/lib/commercial";
import { createPageMetadata, productSeoByService } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import styles from "./customer-retention.module.css";

const pagePath = "/customer-retention";
const pageTitle = "מועדון לקוחות דיגיטלי לעסקים";
const metadataTitle = "מועדון לקוחות דיגיטלי לעסקים | וייבי Viby";
const description =
  "מועדון לקוחות דיגיטלי לעסקים: השוו בין כרטיסיות ניקוב, פרסים וכרטיסי מתנה. בדקו עלויות, תהליך הקמה והתאמה לעסק עם וייבי (Viby).";

export const metadata = createPageMetadata({
  path: pagePath,
  title: pageTitle,
  metadataTitle,
  description,
});

const whatsappMessage =
  "היי, הגעתי מהעמוד על מועדון לקוחות דיגיטלי ואשמח לעזרה בבחירת הכלים לעסק שלי.";
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const decisions = [
  {
    service: "punch-card",
    number: "01",
    title: "כרטיסיית ניקוב דיגיטלית",
    objective: "לעודד ביקורים או רכישות חוזרות עם הטבה קבועה וברורה.",
    customer: "מצטרף בסריקת QR, שומר כרטיסייה בארנק שבטלפון ורואה את ההתקדמות.",
    staff: "עובד מורשה מוסיף ניקוב ומאמת מימוש באפליקציית הצוות.",
    tradeoff: "צריך לקבוע יעד והטבה שהלקוחות מבינים ושהצוות יודע לממש.",
  },
  {
    service: "smart-wheel",
    number: "02",
    title: "חוויה מבוססת פרסים",
    objective: "להוסיף רגע של משחק והטבה שנותנת סיבה לביקור נוסף.",
    customer: "סורק QR, משתתף בגלגל ומקבל פרס לפי הכללים שהעסק הגדיר.",
    staff: "מאמת את הפרס ואת תנאי המימוש כשהלקוח חוזר.",
    tradeoff: "העסק צריך להגדיר כללים ופרסים ברורים ולבדוק את דרישות הדין וההיתרים החלות על הפעילות.",
  },
  {
    service: "wallet",
    number: "03",
    title: "כרטיס מתנה או יתרה דיגיטלית",
    objective: "לאפשר רכישת מתנה או יתרה מראש ומימוש בעסק.",
    customer: "קונה כרטיס לעצמו או לאחר, שומר אותו ב־Apple Wallet או Google Wallet ומציג במימוש.",
    staff: "בודק את היתרה ומעדכן את הסכום שמומש בממשק הצוות.",
    tradeoff: "מכירה ומימוש מחייבים תנאים ברורים, הסדרי תשלום וטיפול ביתרות ובביטולים.",
  },
] as const;

const loyaltyTools = [
  {
    service: "punch-card",
    summary: "ניקובים והטבה על ביקורים חוזרים. הלקוח שומר כרטיסייה ב־Apple Wallet או Google Wallet; צוות מורשה מנקב ומממש, ובעל העסק רואה פעילות בלוח הניהול.",
    limit: "לא מערכת נקודות לכל רכישה או מועדון משותף לכל הכלים.",
  },
  {
    service: "smart-wheel",
    summary: "משחק פרסים לאחר סריקה. העסק קובע פרסים וכללי פעילות, והצוות מאמת זכיות למימוש לפי הכללים.",
    limit: "משחק פרסים אינו כרטיסיית ביקורים; העסק אחראי לכללים ולהיתרים הנדרשים לפי נסיבות הפעילות.",
  },
  {
    service: "wallet",
    summary: "מכירת כרטיס מתנה או יתרה דיגיטלית לשמירה ב־Apple Wallet או Google Wallet, עם ממשק מימוש לצוות ולוח ניהול.",
    limit: "יתרה שנרכשה אינה ניקוב או נקודות נאמנות; תנאי המכירה והמימוש חלים על העסק.",
  },
] as const;

const complementaryTools = [
  {
    service: "viby-up",
    summary: "שיחה עם לקוחות ב־WhatsApp בעזרת AI, בכפוף להרשאות המתאימות, כדי להבין משוב ולזהות מצבים שדורשים תשומת לב אנושית.",
    limit: "שירות תקשורת נפרד; נדרשים יידוע, הרשאות ושיקול דעת אנושי. המחיר בהצעה אישית.",
  },
  {
    service: "viby-rate",
    summary: "NFC ו־QR שמקצרים את הדרך לעמוד הביקורות של העסק ב־Google.",
    limit: "מסייע להגיע לעמוד הביקורת האמיתית; אינו מבטיח ביקורות, ציון או דירוג.",
  },
  {
    service: "viby-tap",
    summary: "שלט או מדבקה עם NFC ו־QR שפותחים עמוד קישורים ממותג לעסק.",
    limit: "עמוד קישורים עסקי, ולא תוכנית נאמנות או צבירת הטבות בפני עצמו.",
  },
] as const;

const faqs = [
  {
    question: "מה ההבדל בין מועדון לקוחות דיגיטלי לכרטיסיית ניקוב?",
    answer: "מועדון לקוחות הוא דרך רחבה לתכנן קשר והטבות ללקוחות חוזרים. כרטיסיית ניקוב היא מודל אחד ופשוט: הלקוח צובר ניקובים לקראת הטבה שהעסק הגדיר. אפשר לבחור גם מודל פרסים או כרטיסי מתנה, לפי המטרה של העסק.",
  },
  {
    question: "האם הלקוחות או הצוות צריכים אפליקציה?",
    answer: "בכרטיסייה הדיגיטלית הלקוח מצטרף בדפדפן ושומר אותה ב־Apple Wallet או Google Wallet בלי להוריד אפליקציית Viby. עובדים מורשים משתמשים באפליקציית הצוות לניקוב ולמימוש. אופן השימוש שונה בין הכלים, ולכן לא כל שירות מוצג כאן כפתרון ללא אפליקציה או עם Wallet.",
  },
  {
    question: "אפשר לבחור כמה שירותים, והאם הם יוצרים מועדון או מאגר לקוחות משותף?",
    answer: "אפשר לבקש הצעה לכמה שירותים, אך כל שירות והיקפו מפורטים בהזמנה המאושרת. בחירה בכמה כלים אינה הבטחה למנוי כולל, לנקודות משותפות או למאגר לקוחות מאוחד בין כל המוצרים.",
  },
  {
    question: "כמה עולה להתחיל ומהי תקופת המנוי?",
    answer: `המחיר תלוי בכלי ובהיקף שהעסק מזמין; המחירים ההתחלתיים מפורטים בחלק העלויות של העמוד, ו־Viby UP מתומחרת בהצעה אישית. ${commercialTerms.commitment} סניפים, משלוח, שימוש נוסף ותוספות מאושרים בנפרד.`,
  },
  {
    question: "כמה זמן לוקחת ההקמה?",
    answer: "לאחר קבלת פרטי העסק, ההרשאות והאישורים הנדרשים, ההפעלה הדיגיטלית מתבצעת תוך עד שלושה ימי עסקים לפי תנאי השירות. ייצור מוצר פיזי ומשלוח מתואמים בנפרד ואינם כלולים בזמן הזה.",
  },
  {
    question: "האם אפשר להפעיל את הכלים בכמה סניפים?",
    answer: "אפשר לבדוק התאמה לכמה סניפים בהתאם לכלי שנבחר. היקף הסניפים, ההגדרות והמחיר יפורטו בהזמנה המאושרת. אין בכך הבטחה לתוכנית נאמנות אחת המשותפת לכל הכלים והסניפים.",
  },
  {
    question: "אילו פרטי לקוח נשמרים, ומתי מותר לשלוח הודעות?",
    answer: "המידע תלוי בכלי: למשל, בהצטרפות לכרטיסייה הלקוח מוסר שם ומספר טלפון, ונשמרת פעילות הניקובים. אין להניח שכל מוצר אוסף את אותם נתונים. פנייה שיווקית ללקוח דורשת את ההרשאות וההסכמות המתאימות, ויש לכבד בקשות הסרה. הפרטים מפורטים במדיניות הפרטיות ובתנאי השירות.",
  },
  {
    question: "איך בעל העסק יכול לבדוק מה קורה אחרי ההפעלה?",
    answer: "בכרטיסייה ובכרטיסי המתנה קיימים כלי ניהול לפעילות הרלוונטית להם. גם בכלים אחרים אופן הצפייה והמדידה תלוי בשירות שנבחר ובמה שאושר בהזמנה. כדאי לקבוע מראש מה רוצים לעקוב אחריו ולבחון זאת יחד עם צוות Viby.",
  },
] as const;

function Price({ service }: { service: keyof typeof productSeoByService }) {
  const price = monthlyPrice(service);
  return <span>{price === null ? "מחיר בהצעה אישית" : `החל מ־${price} ₪ לחודש לכלי`}</span>;
}

export default function CustomerRetentionPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}${pagePath}#webpage`,
    url: `${siteConfig.url}${pagePath}`,
    name: metadataTitle,
    description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <header className={`${styles.header} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={112} height={75} priority /></Link>
        <Link href="/about">אודות וייבי</Link>
      </header>

      <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="retention-title">
        <div>
          <p className={styles.eyebrow}>וייבי (<bdi dir="ltr">Viby</bdi>) | פתרונות נאמנות לעסקים</p>
          <h1 id="retention-title">מועדון לקוחות דיגיטלי לעסקים: בוחרים את הכלים שמתאימים לעסק שלכם</h1>
          <p className={styles.lead}>כרטיסיות ניקוב, פרסים וכרטיסי מתנה יכולים לעזור לעסק לתת ללקוחות סיבה לחזור. וייבי מציעה כלים דיגיטליים נפרדים, ואתם בוחרים את מה שמתאים ללקוחות ולצוות שלכם. אנחנו מסייעים בהקמה הדיגיטלית בהתאם לשירות שנבחר.</p>
          <p>העמוד הזה יעזור לכם להשוות בין האפשרויות, להבין את העבודה ביום־יום ולבדוק עלויות ותנאים לפני שיחה עם הצוות.</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href={whatsappUrl} data-analytics-location="hero">התאימו מועדון לקוחות לעסק שלכם</a>
            <a className={styles.secondaryAction} href="#comparison">איזה כלי מתאים לי?</a>
          </div>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <ServiceIllustration service="punch-card" />
          <ServiceIllustration service="smart-wheel" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.shell}`} aria-labelledby="definition-title">
        <p className={styles.kicker}>מתחילים מהבסיס</p>
        <h2 id="definition-title">מה זה מועדון לקוחות דיגיטלי?</h2>
        <div className={styles.narrowText}>
          <p>מועדון לקוחות דיגיטלי הוא דרך לתת ללקוחות סיבה ברורה לחזור, למשל צבירת ביקורים לקראת הטבה, פרס לביקור הבא או כרטיס מתנה שניתן לממש בעסק. הכללים והפעולות נשמרים בכלי דיגיטלי במקום להסתמך רק על כרטיסיית נייר.</p>
          <p>כרטיסיית ניקוב היא תוכנית נאמנות פשוטה לביקורים חוזרים; מערכת <bdi dir="ltr">CRM</bdi> מורכבת או מערכת נקודות על כל שקל הן סוג אחר של פתרון. וייבי מציעה שירותי נאמנות וקשר עם לקוחות שנבחרים בנפרד, ולא חבילת <bdi dir="ltr">CRM</bdi> אוניברסלית.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.comparisonSection}`} id="comparison" aria-labelledby="comparison-title">
        <div className={styles.shell}>
          <p className={styles.kicker}>מדריך הבחירה</p>
          <h2 id="comparison-title">איזה מודל מועדון לקוחות מתאים לעסק שלכם?</h2>
          <p className={styles.sectionIntro}>מתחילים מההתנהגות שרוצים לעודד, ואז בוחרים את הכלי שהצוות יכול להפעיל ואת ההטבה שלקוח יוכל להבין.</p>
          <div className={styles.decisionGrid}>
            {decisions.map((decision) => {
              const product = productSeoByService[decision.service];
              return (
                <article className={styles.decisionCard} key={decision.service} data-retention-decision>
                  <span className={styles.cardNumber}>{decision.number}</span>
                  <h3>{decision.title}</h3>
                  <dl>
                    <div><dt>מטרת העסק</dt><dd>{decision.objective}</dd></div>
                    <div><dt>חוויית הלקוח</dt><dd>{decision.customer}</dd></div>
                    <div><dt>עבודת הצוות</dt><dd>{decision.staff}</dd></div>
                    <div><dt>מה חשוב לבדוק</dt><dd>{decision.tradeoff}</dd></div>
                  </dl>
                  <p className={styles.price}><Price service={decision.service} /></p>
                  <Link href={product.path} className={styles.cardLink}>למידע על {product.internalLinkLabel} <span aria-hidden="true">←</span></Link>
                </article>
              );
            })}
          </div>
          <div className={styles.guideBottom}>
            <div>
              <h3>ארבע שאלות שיעזרו לבחור</h3>
              <ol>
                <li>באיזו תדירות הלקוחות חוזרים?</li>
                <li>איזו הטבה מתאימה למוצר ולתקציב של העסק?</li>
                <li>כמה זמן יכול הצוות להקדיש לניקוב או למימוש?</li>
                <li>האם צריך להגדיר פעילות לסניף אחד או לכמה סניפים?</li>
              </ol>
            </div>
            <div>
              <h3>טעויות שכדאי להימנע מהן</h3>
              <p>הטבה שקשה להגיע אליה, כללים שהלקוח לא מבין, צוות שלא יודע לממש, תוקף לא ברור או הודעות שיווקיות בלי הרשאה מתאימה — כל אלה מקשים על חוויית נאמנות פשוטה.</p>
              <a className={styles.inlineAction} href={whatsappUrl} data-analytics-location="mid_page_cta">עזרו לי לבחור כלי מתאים <span aria-hidden="true">←</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.shell}`} aria-labelledby="workflow-title">
        <p className={styles.kicker}>דוגמה אחת, שלוש נקודות מבט</p>
        <h2 id="workflow-title">איך זה עובד ביום־יום: לקוח, צוות ובעל העסק</h2>
        <p className={styles.sectionIntro}>השלבים הבאים מתארים את הכרטיסייה הדיגיטלית בלבד; לכלי Viby האחרים יש תהליך שימוש משלהם.</p>
        <div className={styles.workflowGrid}>
          <article><span>לקוח</span><h3>מצטרף ושומר</h3><p>סורק QR, מזין שם וטלפון ושומר את הכרטיסייה ב־<bdi dir="ltr">Apple Wallet</bdi> או <bdi dir="ltr">Google Wallet</bdi>. הלקוח אינו צריך אפליקציית Viby ייעודית.</p></article>
          <article><span>צוות</span><h3>מנקב ומממש</h3><p>עובדים מורשים משתמשים באפליקציית הצוות כדי להוסיף ניקוב, לבדוק התקדמות ולאמת מימוש לפי כללי ההטבה.</p></article>
          <article><span>בעל העסק</span><h3>מגדיר ובודק</h3><p>מגדיר את מספר הניקובים ואת ההטבה, וצופה בפעילות הכרטיסייה בלוח הניהול. אפשר לבקש שינויים בעיצוב או בהטבה בהמשך.</p></article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.toolsSection}`} aria-labelledby="tools-title">
        <div className={styles.shell}>
          <p className={styles.kicker}>כל שירות פותר צורך אחר</p>
          <h2 id="tools-title">הכלים של וייבי — מה כל אחד עושה ומה לא</h2>
          <p className={styles.sectionIntro}>מידע על לקוחות, שמירה ב־Wallet ואימות על ידי הצוות משתנים בין הכלים. בחירה בכמה שירותים אינה יוצרת אוטומטית מאגר לקוחות או תוכנית נקודות משותפת.</p>
          <h3 className={styles.groupHeading}>כלי נאמנות והטבות</h3>
          <div className={styles.toolGrid}>
            {loyaltyTools.map((tool) => {
              const product = productSeoByService[tool.service];
              return (
                <article className={styles.toolCard} key={tool.service}>
                  <div className={styles.toolArt}><ServiceIllustration service={tool.service} /></div>
                  <h4>{product.internalLinkLabel}</h4>
                  <p>{tool.summary}</p>
                  <p className={styles.toolLimit}>{tool.limit}</p>
                  <p className={styles.price}><Price service={tool.service} /></p>
                  <Link href={product.path} data-retention-product>{product.internalLinkLabel} <span aria-hidden="true">←</span></Link>
                </article>
              );
            })}
          </div>
          <h3 className={styles.groupHeading}>כלים משלימים לקשר עם לקוחות</h3>
          <div className={styles.toolGrid}>
            {complementaryTools.map((tool) => {
              const product = productSeoByService[tool.service];
              return (
                <article className={styles.toolCard} key={tool.service}>
                  <div className={styles.toolArt}><ServiceIllustration service={tool.service} /></div>
                  <h4>{product.internalLinkLabel}</h4>
                  <p>{tool.summary}</p>
                  <p className={styles.toolLimit}>{tool.limit}</p>
                  <p className={styles.price}><Price service={tool.service} /></p>
                  <Link href={product.path} data-retention-product>{product.internalLinkLabel} <span aria-hidden="true">←</span></Link>
                </article>
              );
            })}
          </div>
          <p className={styles.disclosure}>בגלגל החכם בית העסק אחראי לקבוע כללי פעילות ופרסים העומדים בדין ולבדוק היתרים נדרשים לפי נסיבות הפעילות. וייבי אינה מספקת אישור משפטי להפעלה. <Link href="/terms#terms-7">קראו את תנאי המשחקים</Link>.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.shell}`} aria-labelledby="examples-title">
        <p className={styles.kicker}>דוגמאות להמחשה</p>
        <h2 id="examples-title">דוגמאות להפעלה לפי סוג עסק</h2>
        <div className={styles.exampleGrid}>
          <article><span>בית קפה</span><h3>ביקורים חוזרים</h3><p>בית קפה יכול להגדיר כרטיסייה עם מספר ביקורים והטבה ברורה. הלקוח רואה כמה ניקובים נשארו, והצוות המורשה מוסיף ניקוב בביקור.</p></article>
          <article><span>מאפייה</span><h3>סיבה לחזור</h3><p>מאפייה יכולה להציע גלגל פרסים אחרי קנייה, עם פרסים ותנאי מימוש שהיא קובעת מראש. הצוות בודק זכייה כשהלקוח חוזר לממש אותה.</p></article>
          <article><span>מספרה</span><h3>מתנה שניתן לממש</h3><p>מספרה יכולה להציע כרטיס מתנה דיגיטלי בסכום שהיא מגדירה. הרוכש שולח מתנה, מקבל המתנה שומר את הכרטיס בטלפון, והצוות בודק יתרה במימוש.</p></article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.pricingSection}`} aria-labelledby="pricing-title">
        <div className={styles.shell}>
          <p className={styles.kicker}>לפני שמחליטים</p>
          <h2 id="pricing-title">כמה עולה מועדון לקוחות דיגיטלי בוייבי?</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingLead}>
              <p>כל שירות מתומחר לפי ההיקף שאושר לעסק, ולא כחבילה אחת הכוללת את ששת הכלים.</p>
              <ul className={styles.priceList}>
                {(["punch-card", "smart-wheel", "wallet", "viby-rate", "viby-tap", "viby-up"] as const).map((service) => (
                  <li key={service}><span>{productSeoByService[service].internalLinkLabel}</span><Price service={service} /></li>
                ))}
              </ul>
              <p>{subscriptionPriceNotice("viby-up")}</p>
              <p>{commercialTerms.commitment} {commercialTerms.vatNotice}</p>
            </div>
            <div className={styles.pricingFacts}>
              <h3>מה צריך להביא בחשבון?</h3>
              <ul>
                <li>היקף השירותים והסניפים, תוספות ושימוש נוסף נקבעים בהזמנה המאושרת; אין מחיר אחיד מובטח לכל סניף.</li>
                <li>{commercialTerms.delivery} מוצר פיזי, אם הוזמן, מיוצר ונשלח בנפרד מההפעלה הדיגיטלית.</li>
                <li>{commercialTerms.setup}</li>
                <li>בכרטיסי מתנה, עמלות סליקה, הסדרי תשלום ועלויות מאושרות אחרות עשויים לחול בנפרד. העסק אחראי לתנאי המכירה והמימוש החלים עליו.</li>
              </ul>
              <Link href="/terms#terms-8">לתנאי המנוי והתשלום המלאים <span aria-hidden="true">←</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.shell}`} aria-labelledby="fit-title">
        <p className={styles.kicker}>בחירה שמתאימה לעסק</p>
        <h2 id="fit-title">למי וייבי מתאימה — ומתי צריך פתרון אחר?</h2>
        <div className={styles.fitGrid}>
          <div><h3>כדאי לבדוק התאמה אם…</h3><p>לקוחות חוזרים לעסק, ואתם רוצים לתת להם הטבה דיגיטלית פשוטה, להחליף כרטיסיית נייר או להציע מתנה שאפשר לשמור בטלפון. בוחרים כלי לפי אופן הביקור, עבודת הצוות והתקציב.</p></div>
          <div><h3>כדאי לברר פתרון אחר אם…</h3><p>אתם מחפשים מערכת <bdi dir="ltr">CRM</bdi> ארגונית, חיבור לקופה, צבירת נקודות משותפת לכל מוצר או אוטומציות שיווק שלא תוארו בשירות שבחרתם. יכולות כאלה אינן מובטחות בעמוד זה ויש לברר אותן לפני הזמנה.</p></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={styles.shell}>
          <p className={styles.kicker}>שאלות לפני החלטה</p>
          <h2 id="faq-title">שאלות נפוצות על מועדון לקוחות דיגיטלי</h2>
          <div className={styles.faqList}>
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
          <p className={styles.faqLinks}>לעוד מידע אפשר לקרוא על <Link href="/how-it-works">אופן העבודה</Link>, <Link href="/privacy">מדיניות הפרטיות</Link> או לפנות ל<Link href="/support">תמיכה</Link>.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.finalSection}`} aria-labelledby="final-title">
        <div className={styles.shell}>
          <p className={styles.kicker}>הצעד הבא</p>
          <h2 id="final-title">בואו נבדוק מה מתאים לעסק שלכם</h2>
          <p>ספרו לנו איזה עסק יש לכם, איך לקוחות חוזרים ומה תרצו להציע להם. נעזור לבחור את הכלים שמתאימים לעסק ולברר את תנאי ההצטרפות בלי לסבך את הדברים.</p>
          <a className={styles.primaryAction} href={whatsappUrl} data-analytics-location="final_cta">דברו איתנו ב־<bdi dir="ltr">WhatsApp</bdi></a>
        </div>
      </section>

      <footer className={`${styles.footer} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={92} height={62} /></Link>
        <nav aria-label="קישורים שימושיים">
          <Link href="/about">אודות וייבי</Link>
          <Link href="/how-it-works">איך וייבי עובדת</Link>
          <Link href="/support">תמיכה</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>
          <PrivacyPreferencesButton />
        </nav>
      </footer>
    </main>
  );
}
