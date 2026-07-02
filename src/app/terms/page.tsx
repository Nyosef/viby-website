import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { legalDocuments } from "@/lib/legal-content";

const document = legalDocuments.terms;

export const metadata: Metadata = {
  title: "תנאי שימוש | Viby",
  description: document.description,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "תנאי שימוש | Viby",
    description: document.description,
    url: "/terms",
  },
};

export default function TermsPage() {
  return <LegalDocumentPage documentKey="terms" />;
}
