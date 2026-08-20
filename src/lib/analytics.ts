export const ANALYTICS_CONSENT_KEY = "viby-analytics-consent";

export type AnalyticsConsent = "granted" | "denied";

export const ANALYTICS_CTA_LOCATIONS = [
  "header",
  "hero",
  "price_strip",
  "mid_page_cta",
  "final_cta",
  "footer",
  "buying_guide",
  "support_page",
  "how_it_works",
  "punch_card_lead_form",
] as const;

export type AnalyticsCtaLocation = (typeof ANALYTICS_CTA_LOCATIONS)[number];

export function isAnalyticsCtaLocation(
  value: string | undefined,
): value is AnalyticsCtaLocation {
  return ANALYTICS_CTA_LOCATIONS.some((location) => location === value);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(
  name: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (
    typeof window === "undefined" ||
    window.localStorage.getItem(ANALYTICS_CONSENT_KEY) !== "granted" ||
    !window.gtag
  ) {
    return;
  }

  window.gtag("event", name, parameters);
}
