"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type LandingNavProps = {
  primaryItems: NavItem[];
  secondaryItems: NavItem[];
};

export function LandingNav({ primaryItems, secondaryItems }: LandingNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav className="desktop-nav" aria-label="ניווט ראשי">
      {primaryItems.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
      <div className="nav-more" ref={menuRef}>
        <button
          type="button"
          className="nav-more-trigger"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="עוד קישורים"
          onClick={() => setIsOpen((current) => !current)}
        >
          עוד
          <span aria-hidden="true">•••</span>
        </button>
        {isOpen ? (
          <div className="nav-more-menu" role="menu">
            {secondaryItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
