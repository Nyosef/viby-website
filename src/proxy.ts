import { NextRequest, NextResponse } from "next/server";
import { isServiceId } from "@/lib/services";
import { getProductPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const CANONICAL_HOST = new URL(siteConfig.url).host;
const REDIRECT_HOSTS = new Set([
  `www.${CANONICAL_HOST}`,
  "viby-website.vercel.app",
]);

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const requestHost = (forwardedHost ?? request.nextUrl.host)
    .split(",")[0]
    .trim()
    .toLowerCase();
  const hostname = requestHost.split(":")[0];
  const destination = request.nextUrl.clone();
  let shouldRedirect = false;

  if (REDIRECT_HOSTS.has(hostname)) {
    destination.protocol = "https:";
    destination.host = CANONICAL_HOST;
    destination.port = "";
    shouldRedirect = true;
  }

  if (destination.pathname === "/") {
    const requestedService = destination.searchParams.get("service");
    if (isServiceId(requestedService)) {
      destination.pathname = getProductPath(requestedService);
      destination.searchParams.delete("service");
      shouldRedirect = true;
    }
  }

  if (shouldRedirect) {
    return NextResponse.redirect(destination, 308);
  }

  const response = NextResponse.next();
  const isPreviewHost =
    hostname.endsWith(".vercel.app") && hostname !== "viby-website.vercel.app";

  if (isPreviewHost || destination.pathname.startsWith("/api/")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"],
};
