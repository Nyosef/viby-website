export const ANALYTICS_CONSENT_KEY = "viby-analytics-consent";
export const CONSENT_CHANGE_EVENT = "viby-consent-change";
export type AnalyticsConsent = "granted" | "denied";
let memoryConsent: AnalyticsConsent | null = null;

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return saved === "granted" || saved === "denied" ? saved : memoryConsent;
  } catch {
    return memoryConsent;
  }
}

export function subscribeToConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  };
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  memoryConsent = value;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    /* Keep the choice for this page when storage is unavailable. */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

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
  "whatsapp_widget",
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

export function safeGtag(...args: unknown[]): boolean {
  try {
    if (typeof window === "undefined" || !window.gtag) return false;
    window.gtag(...args);
    return true;
  } catch {
    return false;
  }
}

type AnalyticsValue =
  string | number | boolean | Array<Record<string, string | number>>;
export function trackAnalyticsEvent(
  name: string,
  parameters: Record<string, AnalyticsValue> = {},
): boolean {
  if (getAnalyticsConsent() !== "granted") return false;
  return safeGtag("event", name, parameters);
}
