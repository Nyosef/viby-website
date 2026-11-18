import { NextResponse } from "next/server";
import { currentLegalDocument } from "@/lib/legal-versions";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export function GET() {
  const termsVersion = currentLegalDocument("terms").version;
  const privacyVersion = currentLegalDocument("privacy").version;
  return NextResponse.json({
    terms: {
      version: termsVersion,
      url: `${siteConfig.url}/terms/versions/${encodeURIComponent(termsVersion)}`,
      embedUrl: `${siteConfig.url}/api/legal/embedded/terms/${encodeURIComponent(termsVersion)}`,
    },
    privacy: {
      version: privacyVersion,
      url: `${siteConfig.url}/privacy/versions/${encodeURIComponent(privacyVersion)}`,
      embedUrl: `${siteConfig.url}/api/legal/embedded/privacy/${encodeURIComponent(privacyVersion)}`,
    },
  }, { headers: { "Cache-Control": "no-store" } });
}
