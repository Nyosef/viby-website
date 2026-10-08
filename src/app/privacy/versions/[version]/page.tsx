import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { findLegalVersion, legalVersions, legalVersionMetadata } from "@/lib/legal-versions";

type Props = { params: Promise<{ version: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return legalVersions("privacy").map(({ version }) => ({ version }));
}
export async function generateMetadata({ params }: Props) {
  const { version } = await params;
  return legalVersionMetadata("privacy", version);
}
export default async function LegalVersionPage({ params }: Props) {
  const { version } = await params;
  const document = findLegalVersion("privacy", version);
  if (!document) notFound();
  return <LegalDocumentPage documentKey="privacy" archivedDocument={document} />;
}
