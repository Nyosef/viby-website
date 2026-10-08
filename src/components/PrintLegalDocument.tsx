"use client";

export function PrintLegalDocument() {
  return <button className="legal-print" type="button" onClick={() => window.print()}>הדפסה / שמירה כ־PDF</button>;
}
