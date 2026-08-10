import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { legalDocuments } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

const document = legalDocuments.privacy;

export const metadata = createPageMetadata({
  path: "/privacy",
  title: "מדיניות פרטיות",
  description: document.description,
});

export default function PrivacyPage() {
  return <LegalDocumentPage documentKey="privacy" />;
}
