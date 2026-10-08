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

export function AnalyticsConsent({
  measurementId,
}: {
  measurementId?: string;
}) {
  const pathname = usePathname();
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

      <button type="button" className="privacy-preferences-toggle" ref={preferencesTrigger} aria-expanded={preferencesOpen} aria-controls="privacy-preferences" onClick={() => setPreferencesOpen((open) => !open)}>העדפות פרטיות</button>
      {preferencesOpen ? (
        <aside id="privacy-preferences" className="privacy-preferences-panel" aria-label="העדפות פרטיות" role="dialog" tabIndex={-1} ref={preferencesPanel}>
          <h2>העדפות פרטיות</h2>
          <p>{measurementId ? `מדידה באתר: ${consent === "granted" ? "מאושרת" : "כבויה"}. אפשר לשנות את הבחירה בכל עת; היא נשמרת עד 180 ימים.` : "אין מדידה פעילה באתר זה."} סרטוני Vimeo נטענים בנפרד, רק כשתבחרו לצפות. <Link href="/privacy#privacy-18">מדיניות הפרטיות</Link></p>
          {measurementId ? <div>
            <button type="button" onClick={() => chooseConsent("granted")}>אישור מדידה</button>
            <button type="button" onClick={() => chooseConsent("denied")}>הפסקת מדידה</button>
          </div> : null}
          <button type="button" onClick={() => { setPreferencesOpen(false); preferencesTrigger.current?.focus(); }}>סגירה</button>
        </aside>
      ) : null}
      {measurementId && consent === null && !preferencesOpen ? (
        <aside
          className="analytics-consent"
          aria-label="העדפות מדידה"
          role="dialog"
          aria-live="polite"
        >
          <p>
            אנו משתמשים ב־Google Analytics רק בהסכמתכם כדי להבין איך האתר עובד
            ולשפר אותו. לא נשלחים שמות או מספרי טלפון.
            <Link href="/privacy">למדיניות הפרטיות</Link>
          </p>
          <div>
            <button type="button" onClick={() => chooseConsent("granted")}>
              אישור מדידה
            </button>
            <button type="button" onClick={() => chooseConsent("denied")}>
              המשך ללא מדידה
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
