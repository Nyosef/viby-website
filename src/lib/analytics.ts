export const ANALYTICS_CONSENT_KEY = "viby-analytics-consent";

export type AnalyticsConsent = "granted" | "denied";

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
