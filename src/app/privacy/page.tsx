import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { currentLegalDocument } from "@/lib/legal-versions";
import { createPageMetadata } from "@/lib/seo";

const document = currentLegalDocument("privacy");

export const metadata = createPageMetadata({
  path: "/privacy",
  title: "מדיניות פרטיות",
  description: document.description,
});

export default function PrivacyPage() {
  return <LegalDocumentPage documentKey="privacy" />;
}
