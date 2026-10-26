"use client";

import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeToConsent,
  safeGtag,
  migrateAnalyticsConsent,
  disableAnalyticsCollection,
  isAnalyticsCtaLocation,
  trackAnalyticsEvent,
  type AnalyticsConsent as ConsentValue,
} from "@/lib/analytics";
import { productSeoByPath } from "@/lib/seo";
import { PRIVACY_PREFERENCES_EVENT } from "./PrivacyPreferencesButton";

export function AnalyticsConsent({
  measurementId,
}: {
  measurementId?: string;
}) {
  const pathname = usePathname();
  const englishPage = pathname.startsWith("/en/");
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getAnalyticsConsent,
    () => undefined,
  );

  const initialized = useRef(false);
  const lastProductPath = useRef<string | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const preferencesTrigger = useRef<HTMLButtonElement>(null);
  const preferencesPanel = useRef<HTMLElement>(null);

  useEffect(() => { migrateAnalyticsConsent(); }, []);

  useEffect(() => {
    function openPreferences(event: Event) {
      const trigger = (event as CustomEvent<unknown>).detail;
      if (!(trigger instanceof HTMLButtonElement)) return;
      preferencesTrigger.current = trigger;
      setPreferencesOpen(true);
    }
    window.addEventListener(PRIVACY_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(PRIVACY_PREFERENCES_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;
    preferencesPanel.current?.focus();
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPreferencesOpen(false);
        preferencesTrigger.current?.focus();
      }
    }
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [preferencesOpen]);

  useEffect(() => {
    if (!measurementId) return;
    disableAnalyticsCollection(measurementId, consent !== "granted");
    if (consent !== "granted") lastProductPath.current = null;
    safeGtag("consent", "update", {
      analytics_storage: consent ?? "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    if (consent !== "granted") return;
    // Live verification found no automatic history page_view events. Configure
    // once and explicitly measure each route; leave stream settings unchanged.
    if (!initialized.current) {
      safeGtag("js", new Date());
      initialized.current = safeGtag("config", measurementId, {
        send_page_view: false,
      });
    }
    if (!initialized.current || lastProductPath.current === pathname) return;
    lastProductPath.current = pathname;
    trackAnalyticsEvent("page_view", {
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
      page_path: pathname,
    });
    const product = productSeoByPath.get(pathname);
    if (product)
      trackAnalyticsEvent("view_item", {
        items: [{ item_id: product.serviceId, item_name: product.title }],
        page_path: pathname,
      });
  }, [consent, measurementId, pathname]);

  useEffect(() => {
    if (!measurementId || consent !== "granted") return;

    function trackLinkClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;

      const url = new URL(link.href, window.location.origin);
      const pagePath = window.location.pathname;
      const productId = productSeoByPath.get(pagePath)?.serviceId ?? "none";

      if (url.hostname === "wa.me" || url.protocol === "tel:") {
        const ctaLocation = link.dataset.analyticsLocation;
        if (!isAnalyticsCtaLocation(ctaLocation)) return;

        const contactMethod = url.protocol === "tel:" ? "phone" : "whatsapp";
        const eventParameters = {
          contact_method: contactMethod,
          contact_type: ctaLocation === "support_page" ? "support" : "sales",
          product_id: productId,
          cta_location: ctaLocation,
          page_path: pagePath,
        };

        trackAnalyticsEvent(
          contactMethod === "phone" ? "click_phone" : "click_whatsapp",
          eventParameters,
        );
        trackAnalyticsEvent("contact_intent", eventParameters);
      } else if (
        url.pathname.startsWith("/d/") &&
        url.origin !== window.location.origin
      ) {
        trackAnalyticsEvent("click_demo", { page_path: pagePath });
      }
    }

    document.addEventListener("click", trackLinkClick);
    return () => document.removeEventListener("click", trackLinkClick);
  }, [consent, measurementId]);

  function chooseConsent(value: ConsentValue) {
    if (measurementId) disableAnalyticsCollection(measurementId, value !== "granted");
    setAnalyticsConsent(value);
    safeGtag("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    setPreferencesOpen(false);
    if (preferencesOpen) preferencesTrigger.current?.focus();
  }

  return (
    <>
      {measurementId && consent === "granted" ? (
        <>
          <Script
            id="viby-ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
        </>
      ) : null}

      {preferencesOpen ? (
        <aside id="privacy-preferences" className="privacy-preferences-panel" aria-label={englishPage ? "Privacy preferences" : "העדפות פרטיות"} role="dialog" tabIndex={-1} ref={preferencesPanel} lang={englishPage ? "en" : undefined} dir={englishPage ? "ltr" : undefined}>
          <h2>{englishPage ? "Privacy preferences" : "העדפות פרטיות"}</h2>
          <p>{englishPage ? (measurementId ? `Site analytics: ${consent === "granted" ? "on" : "off"}. You can change this choice at any time; it is saved for up to 180 days.` : "Analytics are not active on this site.") : (measurementId ? `מדידה באתר: ${consent === "granted" ? "מאושרת" : "כבויה"}. אפשר לשנות את הבחירה בכל עת; היא נשמרת עד 180 ימים.` : "אין מדידה פעילה באתר זה.")} {englishPage ? "Vimeo videos load separately only when you choose to watch." : "סרטוני Vimeo נטענים בנפרד, רק כשתבחרו לצפות."} <Link href="/privacy#privacy-18">{englishPage ? "Privacy policy (Hebrew)" : "מדיניות הפרטיות"}</Link></p>
          {measurementId ? <div>
            <button type="button" onClick={() => chooseConsent("granted")}>{englishPage ? "Allow analytics" : "אישור מדידה"}</button>
            <button type="button" onClick={() => chooseConsent("denied")}>{englishPage ? "Turn off analytics" : "הפסקת מדידה"}</button>
          </div> : null}
          <button type="button" onClick={() => { setPreferencesOpen(false); preferencesTrigger.current?.focus(); }}>{englishPage ? "Close" : "סגירה"}</button>
        </aside>
      ) : null}
      {measurementId && consent === null && !preferencesOpen ? (
        <aside
          className="analytics-consent"
          aria-label={englishPage ? "Analytics preferences" : "העדפות מדידה"}
          lang={englishPage ? "en" : undefined}
          dir={englishPage ? "ltr" : undefined}
          role="dialog"
          aria-live="polite"
        >
          <p>{englishPage ? "We use Google Analytics only with your consent to understand and improve the site. Names and phone numbers are not sent." : "אנו משתמשים ב־Google Analytics רק בהסכמתכם כדי להבין איך האתר עובד ולשפר אותו. לא נשלחים שמות או מספרי טלפון."} <Link href="/privacy">{englishPage ? "Privacy policy (Hebrew)" : "למדיניות הפרטיות"}</Link></p>
          <div>
            <button type="button" onClick={() => chooseConsent("granted")}>
              {englishPage ? "Allow analytics" : "אישור מדידה"}
            </button>
            <button type="button" onClick={() => chooseConsent("denied")}>
              {englishPage ? "Continue without analytics" : "המשך ללא מדידה"}
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
