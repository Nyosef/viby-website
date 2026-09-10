"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { serviceCatalog, serviceGroups, serviceIds } from "@/lib/services";
import { productSeoByService } from "@/lib/seo";
import { UpIcon } from "./UpIcon";

export function UpProductSelector({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node))
        ref.current.open = false;
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return (
    <details
      className={`up-product-selector ${compact ? "compact" : ""}`}
      ref={ref}
      onKeyDown={(event) => {
        if (event.key === "Escape" && ref.current) {
          ref.current.open = false;
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary>
        <UpIcon />
        <span>
          <small>{compact ? "לחצו להחלפת שירות" : "בחרו פתרון"}</small>
          <strong dir="ltr">
            Viby UP <b className="up-menu-badge">AI</b>
          </strong>
        </span>
        <span>⌄</span>
      </summary>
      <nav aria-label={compact ? "בחירת מוצר בכותרת" : "בחירת מוצר"}>
        {serviceGroups.map((group) => (
          <div key={group.id} data-group={group.id}>
            <p>
              {group.emoji} {group.label}
            </p>
            {serviceIds
              .filter((id) => serviceCatalog[id].group === group.id)
              .map((id) => (
                <Link
                  key={id}
                  href={productSeoByService[id].path}
                  aria-current={id === "viby-up" ? "page" : undefined}
                >
                  <span>
                    {serviceCatalog[id].label}
                    {id === "viby-up" ? (
                      <small>שיחות אישיות. קשר שממשיך.</small>
                    ) : null}
                  </span>
                  <span>{id === "viby-up" ? "✓" : "←"}</span>
                </Link>
              ))}
          </div>
        ))}
      </nav>
    </details>
  );
}
