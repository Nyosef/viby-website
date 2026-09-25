"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { serviceIds, type ServiceId } from "@/lib/services";
import { getProductPath } from "@/lib/seo";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  ServiceIllustration,
  servicePresentation,
} from "./ServiceIllustration";

type ServiceChooserProps = {
  currentService: ServiceId;
  placement: "header" | "body";
  onSelect?: (service: ServiceId) => void;
};

export function ServiceChooser({
  currentService,
  placement,
  onSelect,
}: ServiceChooserProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: 0,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const panelId = useId();
  const current = servicePresentation[currentService];

  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }

  function toggle() {
    if (open) return close(true);
    const rect = triggerRef.current!.getBoundingClientRect();
    const width = Math.min(850, window.innerWidth - 32);
    const top = Math.max(
      16,
      Math.min(rect.bottom + 12, window.innerHeight - 320),
    );
    setPosition({
      top,
      width,
      left: Math.max(
        16,
        Math.min(rect.right - width, window.innerWidth - width - 16),
      ),
      maxHeight: window.innerHeight - top - 16,
    });
    setOpen(true);
    trackAnalyticsEvent("service_chooser_opened", {
      product_id: currentService,
      chooser_placement: placement,
      page_path: window.location.pathname,
    });
  }

  useEffect(() => {
    if (!open) return;
    panelRef.current
      ?.querySelector<HTMLElement>('[aria-current="page"]')
      ?.focus({ preventScroll: true });
    function outside(event: PointerEvent) {
      if (
        !panelRef.current?.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      )
        setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function resize() {
      setOpen(false);
      triggerRef.current?.focus({ preventScroll: true });
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  return (
    <div className={`service-chooser service-chooser--${placement}`}>
      <button
        className="service-chooser-trigger"
        type="button"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span className="service-chooser-thumbnail">
          <ServiceIllustration service={currentService} />
        </span>
        <span className="service-chooser-current">
          <strong>
            <bdi>{current.name}</bdi>
          </strong>
          <span>החלפת שירות</span>
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m5 7 5 5 5-5"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open &&
        createPortal(
          <nav
            id={panelId}
            ref={panelRef}
            dir="rtl"
            className="service-chooser-panel"
            aria-label="בחירת שירות Viby"
            style={position}
            onBlur={(event) => {
              if (
                event.relatedTarget &&
                !event.currentTarget.contains(event.relatedTarget) &&
                event.relatedTarget !== triggerRef.current
              )
                close();
            }}
            onKeyDown={(event) => {
              const links = Array.from(
                panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ??
                  [],
              );
              const index = links.indexOf(
                document.activeElement as HTMLAnchorElement,
              );
              let next: number | undefined;
              if (event.key === "ArrowDown" || event.key === "ArrowLeft")
                next = (index + 1) % links.length;
              if (event.key === "ArrowUp" || event.key === "ArrowRight")
                next = (index + links.length - 1) % links.length;
              if (event.key === "Home") next = 0;
              if (event.key === "End") next = links.length - 1;
              if (next !== undefined) {
                event.preventDefault();
                links[next]?.focus();
              }
            }}
          >
            <div className="service-chooser-heading">
              <strong>מה יעזור לעסק שלכם?</strong>
              <button
                type="button"
                aria-label="סגירת בחירת שירות"
                onClick={() => close(true)}
              >
                ×
              </button>
            </div>
            <div className="service-chooser-grid">
              {serviceIds.map((id) => (
                <Link
                  key={id}
                  href={getProductPath(id)}
                  className="service-chooser-card"
                  style={
                    {
                      "--service-color": servicePresentation[id].color,
                      "--service-background":
                        servicePresentation[id].background,
                    } as CSSProperties
                  }
                  aria-current={id === currentService ? "page" : undefined}
                  onClick={(event) => {
                    if (id !== currentService)
                      trackAnalyticsEvent("service_selected", {
                        previous_service: currentService,
                        next_service: id,
                        chooser_placement: placement,
                        page_path: window.location.pathname,
                      });
                    if (
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey
                    )
                      return;
                    close(true);
                    if (id === currentService) event.preventDefault();
                    else if (onSelect) {
                      event.preventDefault();
                      onSelect(id);
                    }
                  }}
                >
                  <span className="service-chooser-art">
                    <ServiceIllustration service={id} />
                    {id === currentService && (
                      <span
                        className="service-chooser-selected"
                        aria-label="השירות הנוכחי"
                      >
                        ✓
                      </span>
                    )}
                  </span>
                  <strong>
                    <bdi>{servicePresentation[id].name}</bdi>
                  </strong>
                  <span className="service-chooser-description">
                    {servicePresentation[id].description}
                  </span>
                </Link>
              ))}
            </div>
          </nav>,
          document.body,
        )}
    </div>
  );
}
