// These values are intended for public legal notices, never credentials.
export const legalIdentity = {
  name: process.env.NEXT_PUBLIC_LEGAL_BUSINESS_NAME?.trim() ?? "",
  number: process.env.NEXT_PUBLIC_LEGAL_BUSINESS_NUMBER?.trim() ?? "",
  address: process.env.NEXT_PUBLIC_LEGAL_BUSINESS_ADDRESS?.trim() ?? "",
  email: process.env.NEXT_PUBLIC_LEGAL_CONTACT_EMAIL?.trim() ?? "",
};

export function missingLegalIdentity() {
  return Object.entries(legalIdentity)
    .filter(([key, value]) => !value || (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) || (key === "number" && !/^\d{9}$/.test(value)))
    .map(([key]) => key);
}

export function assertLegalPublicationReady() {
  const missing = missingLegalIdentity();
  if (process.env.VERCEL_ENV === "production" && missing.length) {
    throw new Error(`Legal publication requires confirmed public business details: ${missing.join(", ")}. Configure NEXT_PUBLIC_LEGAL_* before production deployment.`);
  }
  if (process.env.VERCEL_ENV === "production" && process.env.LEGAL_PUBLICATION_REVIEWED !== "true") {
    throw new Error("Legal publication requires review of the final wording and operational disclosures. Set LEGAL_PUBLICATION_REVIEWED=true only after completing the publication checklist.");
  }
}
