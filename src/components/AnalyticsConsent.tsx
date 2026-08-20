"use client";

import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import {
  ANALYTICS_CONSENT_KEY,
  isAnalyticsCtaLocation,
  trackAnalyticsEvent,
  type AnalyticsConsent as ConsentValue,
} from "@/lib/analytics";
import { productSeoByPath } from "@/lib/seo";

const CONSENT_CHANGE_EVENT = "viby-consent-change";

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  };
}

function getConsentSnapshot(): ConsentValue | null {
  const saved = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return saved === "granted" || saved === "denied" ? saved : null;
}

export function AnalyticsConsent({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => undefined,
  );

  useEffect(() => {
    if (!measurementId || consent !== "granted" || !window.gtag) return;

    window.gtag("config", measurementId, {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
    });

    const product = productSeoByPath.get(pathname as `/${string}`);
    if (product) {
      trackAnalyticsEvent("view_item", {
        item_id: product.serviceId,
        item_name: product.title,
      });
    }
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
          product_id: productId,
          cta_location: ctaLocation,
          page_path: pagePath,
        };

        trackAnalyticsEvent(
          contactMethod === "phone" ? "click_phone" : "click_whatsapp",
          eventParameters,
        );
        trackAnalyticsEvent("contact_intent", eventParameters);
      } else if (url.hostname === "myviby.co.il" && url.pathname === "/login") {
        trackAnalyticsEvent("click_business_login", { page_path: pagePath });
      } else if (url.pathname.startsWith("/d/") && url.origin !== window.location.origin) {
        trackAnalyticsEvent("click_demo", { page_path: pagePath });
      }
    }

    document.addEventListener("click", trackLinkClick);
    return () => document.removeEventListener("click", trackLinkClick);
  }, [consent, measurementId]);

  function chooseConsent(value: ConsentValue) {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    window.gtag?.("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }

  if (!measurementId) return null;

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            id="viby-ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="viby-ga4-config" strategy="afterInteractive">
            {`window.gtag('js', new Date());window.gtag('config', '${measurementId}', { send_page_view: false });`}
          </Script>
        </>
      ) : null}

      {consent === null ? (
        <aside
          className="analytics-consent"
          aria-label="העדפות מדידה"
          role="dialog"
          aria-live="polite"
        >
          <p>
            אנו משתמשים ב־Google Analytics רק בהסכמתכם כדי להבין איך האתר
            עובד ולשפר אותו. לא נשלחים שמות או מספרי טלפון.
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
