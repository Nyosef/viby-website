import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { FaqFrame } from "./FaqPage";
import { faqPages } from "./content";
import styles from "./faq.module.css";

const path = "/business-faq";
const title = "שאלות נפוצות לבעלי עסקים | וייבי Viby";
const description = "שאלות נפוצות לבעלי עסקים על כרטיסיות ניקוב דיגיטליות, פתרונות חינמיים וכרטיסיות להדפסה. תשובות קצרות שיעזרו לבחור פתרון מתאים לעסק.";

export const metadata = createPageMetadata({ path, title: "שאלות נפוצות לבעלי עסקים", metadataTitle: title, description });

const cards = [
  { ...faqPages.free, summary: "מה אפשר לעשות ללא עלות, מה ההבדל בין ניהול ידני למערכת דיגיטלית ומה המחיר של פתרון מנוהל?" },
  { ...faqPages.comparison, summary: "השוואה פשוטה בין כרטיסיות נייר לכרטיסיות דיגיטליות, עם יתרונות וחסרונות לכל פתרון." },
];

export default function BusinessFaqHub() {
  return (
    <FaqFrame path={path} title={title} description={description}>
      <section className={`${styles.shell} ${styles.hubHero}`} aria-labelledby="faq-hub-title">
        <p className={styles.eyebrow}>שאלות ותשובות לעסקים</p>
        <h1 id="faq-hub-title">שאלות נפוצות לבעלי עסקים</h1>
        <p>כרטיסיות דיגיטליות, מועדוני לקוחות והטבות לעסק. תשובות קצרות וברורות שיעזרו לכם לבחור פתרון שמתאים לעסק שלכם.</p>
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
