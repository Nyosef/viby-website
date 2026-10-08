import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { findLegalVersion, legalVersions, legalVersionMetadata } from "@/lib/legal-versions";

type Props = { params: Promise<{ version: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return legalVersions("terms").map(({ version }) => ({ version }));
}
export async function generateMetadata({ params }: Props) {
  const { version } = await params;
  return legalVersionMetadata("terms", version);
}
export default async function LegalVersionPage({ params }: Props) {
  const { version } = await params;
  const document = findLegalVersion("terms", version);
  if (!document) notFound();
  return <LegalDocumentPage documentKey="terms" archivedDocument={document} />;
}
