import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { currentLegalDocument } from "@/lib/legal-versions";
import { createPageMetadata } from "@/lib/seo";

const document = currentLegalDocument("terms");

export const metadata = createPageMetadata({
  path: "/terms",
  title: "תנאי שימוש",
  description: document.description,
});

export default function TermsPage() {
  return <LegalDocumentPage documentKey="terms" />;
}
