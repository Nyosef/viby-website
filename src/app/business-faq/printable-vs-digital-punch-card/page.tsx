import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { FaqAnswerPage } from "../FaqPage";
import { faqPages } from "../content";

const faq = faqPages.comparison;
export const metadata = createPageMetadata({ path: faq.path, title: faq.title, metadataTitle: faq.metadataTitle, description: faq.description });

export default function PrintableVsDigitalFaq() {
  return <FaqAnswerPage faq={faq}>
    <p>אם חשוב לכם שההתקדמות תישמר בטלפון ושהצוות ינהל את הניקובים, קראו איך פועלת <Link href="/">כרטיסיית ניקוב דיגיטלית</Link> ב־Viby. אם אתם עדיין בודקים את העלות ואת האפשרות להתחיל לבד, קראו גם <Link href="/business-faq/free-digital-punch-card">מה אפשר לקבל בכרטיסייה דיגיטלית בחינם</Link>.</p>
  </FaqAnswerPage>;
}
