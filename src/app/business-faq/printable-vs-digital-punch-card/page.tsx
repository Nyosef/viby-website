import { createPageMetadata } from "@/lib/seo";
import { FaqAnswerPage } from "../FaqPage";
import { faqPages } from "../content";

const faq = faqPages.comparison;
export const metadata = createPageMetadata({ path: faq.path, title: faq.title, metadataTitle: faq.metadataTitle, description: faq.description });

export default function PrintableVsDigitalFaq() {
  return <FaqAnswerPage faq={faq} />;
}
