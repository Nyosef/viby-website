export const ANALYTICS_CONSENT_KEY = "viby-analytics-consent";
export const CONSENT_CHANGE_EVENT = "viby-consent-change";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsConsent = "granted" | "denied";
type ConsentRecord = { version: number; value: AnalyticsConsent; savedAt: number };
let memoryConsent: ConsentRecord | null = null;

function validRecord(value: unknown): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<ConsentRecord>;
  return record.version === CONSENT_VERSION && (record.value === "granted" || record.value === "denied") && typeof record.savedAt === "number" && Number.isFinite(record.savedAt) && record.savedAt > 0 && record.savedAt <= Date.now() && Date.now() - record.savedAt < CONSENT_MAX_AGE_MS;
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  let saved: string | null;
  try {
    saved = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  } catch {
    return validRecord(memoryConsent) ? memoryConsent.value : null;
  }
  // Honour a legacy refusal immediately; legacy grants require a fresh choice.
  if (saved === "denied") return "denied";
  try {
    const record: unknown = JSON.parse(saved ?? "null");
    return validRecord(record) ? record.value : null;
  } catch { return null; }
}

export function migrateAnalyticsConsent() {
  try {
    const saved = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (saved === "denied") setAnalyticsConsent("denied");
    else if (saved === "granted") {
      window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
      window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    }
  } catch { /* Consent still works in memory when browser storage is blocked. */ }
}

export function subscribeToConsent(onChange: () => void) {
  let expiryCheck: ReturnType<typeof setTimeout> | undefined;
  function scheduleExpiry() {
    clearTimeout(expiryCheck);
    let record: unknown;
    try { record = JSON.parse(window.localStorage.getItem(ANALYTICS_CONSENT_KEY) ?? "null"); }
    catch { record = memoryConsent; }
    if (validRecord(record)) {
      // Long timers are capped by browsers; re-arm until the actual expiry.
      const delay = Math.min(record.savedAt + CONSENT_MAX_AGE_MS - Date.now(), 2_147_000_000);
      expiryCheck = setTimeout(changed, delay);
    }
  }
  function changed() { onChange(); scheduleExpiry(); }
  window.addEventListener("storage", changed);
  window.addEventListener(CONSENT_CHANGE_EVENT, changed);
  document.addEventListener("visibilitychange", changed);
  scheduleExpiry();
  return () => {
    window.removeEventListener("storage", changed);
    window.removeEventListener(CONSENT_CHANGE_EVENT, changed);
    document.removeEventListener("visibilitychange", changed);
    clearTimeout(expiryCheck);
  };
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  memoryConsent = { version: CONSENT_VERSION, value, savedAt: Date.now() };
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, JSON.stringify(memoryConsent));
  } catch { /* Keep the choice for this page when storage is unavailable. */ }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function disableAnalyticsCollection(measurementId: string, disabled: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = disabled;
  if (!disabled) return;
  // Remove GA's first-party cookies; withdrawal does not erase past server data.
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    const expired = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = expired;
    const labels = window.location.hostname.split(".");
    for (let i = 0; i < labels.length - 1; i++) document.cookie = `${expired}; domain=${labels.slice(i).join(".")}`;
  }
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
