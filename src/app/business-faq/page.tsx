import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { FaqFrame } from "./FaqPage";
import { faqPages } from "./content";
import styles from "./faq.module.css";

const path = "/business-faq";
const title = "שאלות נפוצות על כרטיסיות ניקוב ומועדון לקוחות לעסק | וייבי Viby";
const heading = "שאלות נפוצות לבעלי עסקים: כרטיסיות ניקוב ומועדון לקוחות";
const description = "שאלות נפוצות לבעלי עסקים על כרטיסיות ניקוב דיגיטליות, פתרונות חינמיים וכרטיסיות להדפסה. תשובות קצרות שיעזרו לבחור פתרון מתאים לעסק.";

export const metadata = createPageMetadata({ path, title: heading, metadataTitle: title, description });

const cards = [
  { ...faqPages.free, summary: "מה אפשר לעשות ללא עלות, מה ההבדל בין ניהול ידני למערכת דיגיטלית ומה המחיר של פתרון מנוהל?" },
  { ...faqPages.comparison, summary: "השוואה פשוטה בין כרטיסיות נייר לכרטיסיות דיגיטליות, עם יתרונות וחסרונות לכל פתרון." },
];

export default function BusinessFaqHub() {
  return (
    <FaqFrame path={path} title={title} description={description}>
      <section className={`${styles.shell} ${styles.hubHero}`} aria-labelledby="faq-hub-title">
        <p className={styles.eyebrow}>שאלות ותשובות לעסקים</p>
        <h1 id="faq-hub-title">{heading}</h1>
        <p>בעלי עסקים שרוצים לעודד ביקורים חוזרים שואלים לעיתים אם כדאי להתחיל בכרטיסיית נייר, אם אפשר לנהל ניקובים בלי לשלם על מערכת, ומה משתנה כשהכרטיסייה עוברת לטלפון. כאן ריכזנו תשובות על הצטרפות לקוחות, צבירת ניקובים, מימוש הטבות ועלויות, כדי שתוכלו לבחור דרך שמתאימה לקצב העבודה ולצוות שלכם. אפשר להתחיל בפתרון ידני ולבדוק אם הלקוחות משתמשים בו, ואז לשקול מערכת שמציגה את ההתקדמות ומסייעת לעקוב אחרי הפעילות. אם אתם בוחנים <Link href="/">כרטיסיות ניקוב דיגיטליות</Link>, התחילו בהסבר המוצר, ואחריו קראו את התשובות על אפשרויות חינמיות ועל ההבדל בין נייר לדיגיטל. כדאי לבדוק גם מי מוסיף ניקובים, איך מאמתים הטבה, ואילו עלויות או התחייבויות חלות לפני שמחליטים.</p>
      </section>
      <section className={`${styles.shell} ${styles.hubSection}`} aria-labelledby="punch-card-questions">
        <h2 id="punch-card-questions">כרטיסיות ניקוב לעסקים</h2>
        <div className={styles.cardGrid}>
          {cards.map((card) => <Link className={styles.questionCard} href={card.path} key={card.path}>
            <h3>{card.title}</h3>
            <p>{card.summary}</p>
            <span>קראו את התשובה <span aria-hidden="true">←</span></span>
          </Link>)}
        </div>
      </section>
    </FaqFrame>
  );
}
