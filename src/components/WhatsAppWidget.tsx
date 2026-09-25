"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  getAnalyticsConsent,
  subscribeToConsent,
  trackAnalyticsEvent,
} from "@/lib/analytics";
import { productSeoByPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  BADGE_DELAY,
  HOVER_DELAY,
  WIDGET_DELAY,
  getWhatsAppVisit,
  saveWhatsAppVisit,
} from "@/lib/whatsapp-visit";

const desktopQuery =
  "(min-width: 1024px) and (pointer: fine) and (hover: hover)";
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("היי, אשמח לשמוע עוד על Viby")}`;

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M26.9 5.1A14.5 14.5 0 0 0 4.1 22.5L2 30l7.7-2A14.5 14.5 0 0 0 26.9 5.1Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M11 8.5c-.4-.9-.8-.9-1.2-.9H8.7c-.4 0-.9.2-1.3.7-.5.5-1.7 1.6-1.7 3.9s1.7 4.5 2 4.8c.2.3 3.4 5.2 8.2 7.2 4 1.6 4.8 1.3 5.7 1.2.9-.1 2.8-1.1 3.2-2.3.4-1.1.4-2.1.3-2.3-.1-.2-.4-.3-.9-.6l-3.3-1.5c-.4-.2-.8-.3-1.1.2l-1.5 1.8c-.3.3-.6.4-1 .2-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.3-2.7-2.6-3.2-.3-.4 0-.7.2-.9l.7-.9.5-.8c.2-.3.1-.6 0-.9Z"
        fill="currentColor"
        transform="translate(4 2) scale(.75)"
      />
    </svg>
  );
}

export function WhatsAppWidget({
  analyticsEnabled,
}: {
  analyticsEnabled: boolean;
}) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getAnalyticsConsent,
    () => null,
  );
  const [visible, setVisible] = useState(false);
  const [unread, setUnread] = useState(false);
  const [open, setOpen] = useState(false);
  const [consentOffset, setConsentOffset] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);
  const widget = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  function cancelHover() {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = undefined;
  }

  useEffect(() => {
    const visit = getWhatsAppVisit();
    const media = window.matchMedia(desktopQuery);
    function refresh() {
      const elapsed = Date.now() - visit.startedAt;
      setVisible(media.matches && elapsed >= WIDGET_DELAY);
      setUnread(!visit.read && elapsed >= BADGE_DELAY);
      if (!media.matches) {
        setOpen(false);
        clearTimeout(hoverTimer.current);
      }
    }
    const elapsed = Date.now() - visit.startedAt;
    const timers = [0, WIDGET_DELAY, BADGE_DELAY].map((delay) =>
      setTimeout(refresh, Math.max(0, Math.ceil(delay - elapsed))),
    );
    media.addEventListener("change", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(hoverTimer.current);
      media.removeEventListener("change", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  useEffect(() => {
    if (!visible || !analyticsEnabled || consent !== "granted") return;
    if (getWhatsAppVisit().exposureTracked) return;
    if (
      trackAnalyticsEvent("whatsapp_widget_shown", {
        page_path: pathname,
        product_id: productSeoByPath.get(pathname)?.serviceId ?? "none",
      })
    ) {
      saveWhatsAppVisit({ exposureTracked: true });
    }
  }, [visible, analyticsEnabled, consent, pathname]);

  // Keep the panel above the actual banner height, including enlarged text.
  useEffect(() => {
    const banner = document.querySelector(".analytics-consent");
    if (!banner) return;
    const measure = () =>
      setConsentOffset(banner.getBoundingClientRect().height + 16);
    const observer = new ResizeObserver(measure);
    observer.observe(banner);
    return () => observer.disconnect();
  }, [consent, visible]);

  useEffect(() => {
    if (!open) return;
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (!widget.current?.contains(event.target as Node)) {
        setOpen(false);
        clearTimeout(hoverTimer.current);
      }
    }
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  function markRead() {
    saveWhatsAppVisit({ read: true });
    setUnread(false);
  }
  function showPreview(method: "click" | "hover") {
    cancelHover();
    if (open) return;
    markRead();
    setOpen(true);
    trackAnalyticsEvent("whatsapp_preview_opened", {
      open_method: method,
      page_path: window.location.pathname,
      product_id:
        productSeoByPath.get(window.location.pathname)?.serviceId ?? "none",
    });
    if (method === "click")
      requestAnimationFrame(() => closeButton.current?.focus());
  }

  const offset = consent === null ? consentOffset : 0;
  if (!visible) return null;
  return (
    <aside
      ref={widget}
      className="whatsapp-widget"
      dir="rtl"
      aria-label="יצירת קשר ב־WhatsApp"
      style={{
        bottom: 24 + offset,
        maxHeight: `calc(100dvh - ${48 + offset}px)`,
      }}
    >
      {open && (
        <section
          id="whatsapp-preview"
          className="whatsapp-preview"
          role="dialog"
          aria-modal="false"
          aria-labelledby="whatsapp-preview-title"
          style={{ maxHeight: `calc(100dvh - ${142.2 + offset}px)` }}
        >
          <header>
            <span id="whatsapp-preview-title">
              <WhatsAppMark />
              <bdi>WhatsApp</bdi>
            </span>
            <button
              ref={closeButton}
              type="button"
              aria-label="סגירת הודעת WhatsApp"
              onClick={() => {
                cancelHover();
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              ×
            </button>
          </header>
          <div className="whatsapp-preview-body">
            <p className="whatsapp-message">
              היי, זאת בר 👋
              <br />
              רוצה שנעשה שיחה קצרה ואספר לך איך <bdi>Viby</bdi> יכולה לעזור לעסק
              שלך?
            </p>
            <a
              className="whatsapp-chat-link"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-location="whatsapp_widget"
              data-contact-type="sales"
              onClick={markRead}
            >
              בואו נדבר ב־<bdi>WhatsApp</bdi>
              <WhatsAppMark />
            </a>
          </div>
        </section>
      )}
      <button
        ref={trigger}
        type="button"
        className="whatsapp-widget-trigger"
        aria-label={
          unread ? "פתיחת WhatsApp — הודעה אחת חדשה" : "פתיחת WhatsApp"
        }
        aria-expanded={open}
        aria-controls="whatsapp-preview"
        onClick={() => {
          if (open) {
            cancelHover();
            setOpen(false);
          } else showPreview("click");
        }}
        onPointerEnter={(event) => {
          if (event.pointerType !== "touch" && !open) {
            cancelHover();
            hoverTimer.current = setTimeout(
              () => showPreview("hover"),
              HOVER_DELAY,
            );
          }
        }}
        onPointerLeave={cancelHover}
        onPointerCancel={cancelHover}
      >
        <WhatsAppMark />
        {unread && (
          <span className="whatsapp-unread" aria-hidden="true">
            1
          </span>
        )}
      </button>
    </aside>
  );
}
