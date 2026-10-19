import { legalRelease } from "./legal-release.ts";

// These values are intended for public legal notices, never credentials.
export const legalIdentity = {
  name: process.env.NEXT_PUBLIC_LEGAL_BUSINESS_NAME?.trim() ?? "",
  address: process.env.NEXT_PUBLIC_LEGAL_BUSINESS_ADDRESS?.trim() ?? "",
  email: process.env.NEXT_PUBLIC_LEGAL_CONTACT_EMAIL?.trim() ?? "",
};

export function missingLegalIdentity() {
  return Object.entries(legalIdentity)
    .filter(([key, value]) => !value || (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)))
    .map(([key]) => key);
}

// An unreviewed release remains available on previews, while production keeps
// serving the last published documents until this exact version is approved.
export function isCurrentLegalReleasePublished() {
  return process.env.VERCEL_ENV !== "production" || (
    process.env.LEGAL_PUBLICATION_REVIEWED === "true" &&
    process.env.LEGAL_PUBLICATION_REVIEWED_VERSION === legalRelease.version
  );
}

export function assertLegalPublicationReady() {
  const missing = missingLegalIdentity();
  if (process.env.VERCEL_ENV === "production" && missing.length) {
    throw new Error(`Legal publication requires confirmed public business details: ${missing.join(", ")}. Configure NEXT_PUBLIC_LEGAL_* before production deployment.`);
  }
}
