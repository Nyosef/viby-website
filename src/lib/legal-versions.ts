import type { Metadata } from "next";
import { legalDocuments } from "./legal-content";
import { previousLegalDocuments } from "./legal-history";
import { october2026LegalDocuments } from "./legal-history-2026-10-08";
import type { LegalDocumentKey } from "./legal-types";
import { siteConfig } from "./site";

export function legalVersions(key: LegalDocumentKey) {
  return [previousLegalDocuments[key], october2026LegalDocuments[key], legalDocuments[key]];
}

export function latestLegalArchive(key: LegalDocumentKey) {
  return october2026LegalDocuments[key];
}

export function currentLegalDocument(key: LegalDocumentKey) {
  return legalDocuments[key];
}

export function findLegalVersion(key: LegalDocumentKey, version: string) {
  return legalVersions(key).find((document) => document.version === version);
}

export function legalVersionMetadata(key: LegalDocumentKey, version: string): Metadata {
  const document = findLegalVersion(key, version);
  return {
    title: document ? `${document.title} — גרסה ${version}` : "גרסה לא נמצאה",
    description: document?.description,
    alternates: { canonical: `${siteConfig.url}/${key}/versions/${version}` },
    robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noarchive: true } },
  };
}
