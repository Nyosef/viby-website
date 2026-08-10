import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { legalDocuments } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

const document = legalDocuments.terms;

export const metadata = createPageMetadata({
  path: "/terms",
  title: "תנאי שימוש",
  description: document.description,
});

export default function TermsPage() {
  return <LegalDocumentPage documentKey="terms" />;
}
