"use client";

import { useEffect, useState } from "react";

const businessTypes = [
  "בתי קפה",
  "מספרות",
  "גלידריות",
  "מכוני יופי",
  "פיצריות",
  "סטודיו כושר",
  "חנויות מתנות",
  "עסקים שכונתיים",
  "מאפיות",
  "ברברשופ",
  "חנויות פרחים",
  "מכבסות",
];

export function RotatingBusinessChips() {
  const [activeBusiness, setActiveBusiness] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveBusiness(
        (currentBusiness) => (currentBusiness + 1) % businessTypes.length,
      );
    }, 2400);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="businesses section-shell" aria-label="סוגי עסקים">
      <span className="businesses-label">מתאים גם ל־</span>
      <strong className="businesses-current" key={businessTypes[activeBusiness]}>
        {businessTypes[activeBusiness]}
      </strong>
    </section>
  );
}
