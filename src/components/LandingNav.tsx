"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type LandingNavProps = {
  primaryItems: NavItem[];
  secondaryItems: NavItem[];
  mobileItems: NavItem[];
};

export function LandingNav({
  primaryItems,
  secondaryItems,
  mobileItems,
}: LandingNavProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const instagramItem = primaryItems.find((item) => item.label === "Instagram");

  useEffect(() => {
    if (!isMoreOpen && !isMobileOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (isMoreOpen && !moreMenuRef.current?.contains(target)) {
        setIsMoreOpen(false);
      }

      if (isMobileOpen && !mobileMenuRef.current?.contains(target)) {
        setIsMobileOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMoreOpen(false);
        setIsMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMoreOpen, isMobileOpen]);

  return (
    <>
      <nav className="desktop-nav" aria-label="ניווט ראשי">
        {primaryItems.map((item) => (
          <a
            className={item.label === "Instagram" ? "instagram-nav-link" : ""}
            key={item.href}
            href={item.href}
            aria-label={item.label === "Instagram" ? "Instagram" : undefined}
          >
            {item.label === "Instagram" ? (
              <span className="instagram-icon" aria-hidden="true" />
            ) : (
              item.label
            )}
          </a>
        ))}
        <div className="nav-more" ref={moreMenuRef}>
          <button
            type="button"
            className="nav-more-trigger"
            aria-haspopup="menu"
            aria-expanded={isMoreOpen}
            aria-label="עוד קישורים"
            onClick={() => setIsMoreOpen((current) => !current)}
          >
            <span className="hamburger-lines" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
          {isMoreOpen ? (
            <div className="nav-more-menu" role="menu">
              {secondaryItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setIsMoreOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </nav>

      <div className="mobile-nav" ref={mobileMenuRef}>
        <button
          type="button"
          className="mobile-menu-trigger"
          aria-haspopup="menu"
          aria-expanded={isMobileOpen}
          aria-label="פתיחת תפריט ניווט"
          onClick={() => setIsMobileOpen((current) => !current)}
        >
          <span className="mobile-menu-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
        {instagramItem ? (
          <a
            className="mobile-instagram-link"
            href={instagramItem.href}
            aria-label="Instagram"
          >
            <span className="instagram-icon" aria-hidden="true" />
          </a>
        ) : null}
        {isMobileOpen ? (
          <nav className="mobile-menu" aria-label="ניווט מובייל" role="menu">
            {mobileItems.map((item) => (
              <a
                key={`${item.label}-${item.href}`}
                href={item.href}
                role="menuitem"
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </>
  );
}
