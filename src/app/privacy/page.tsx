import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { legalDocuments } from "@/lib/legal-content";

const document = legalDocuments.privacy;

export const metadata: Metadata = {
  title: "מדיניות פרטיות | Viby",
  description: document.description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "מדיניות פרטיות | Viby",
    description: document.description,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return <LegalDocumentPage documentKey="privacy" />;
}
