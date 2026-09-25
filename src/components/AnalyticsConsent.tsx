"use client";

import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeToConsent,
  safeGtag,
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

  useEffect(() => {
    if (!measurementId || !consent) return;
    safeGtag("consent", "update", {
      analytics_storage: consent,
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
    safeGtag("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    setAnalyticsConsent(value);
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
