export const blackFridayPath = "/מבצעי-בלאק-פריידי-לכרטיסיות-ניקוב-דיגיטליות";
export const blackFridayPhrase = "מבצעי בלאק פריידי לכרטיסיות ניקוב דיגיטליות";
export const blackFridayMonthlyPrice = 269;
export const blackFridayPreviousMonthlyPrice = 329;
export const blackFridayLastSignupDate = "2026-11-29";
export const blackFridayLastSignupDisplay = blackFridayLastSignupDate.split("-").reverse().join(".");
export const blackFridayExpiryDate = "2026-11-30";
// Set to the production publication date of this content update (also in seo-report.mjs and the expiry test).
export const blackFridayContentUpdatedDate = "2026-11-18";
export const blackFridayActiveHeading = "מבצעי בלאק פריידי 2026 לכרטיסיות ניקוב דיגיטליות";
export const blackFridayEndedHeading = "מבצע בלאק פריידי 2026 הסתיים";
export const blackFridayActiveTitle = "בלאק פריידי 2026: כרטיסיות ניקוב דיגיטליות + Viby UP | וייבי Viby";
export const blackFridayEndedTitle = `${blackFridayEndedHeading} | וייבי Viby`;

const israelDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Jerusalem",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function isBlackFridayOfferActive(now: Date = new Date()) {
  const parts = israelDateFormatter.formatToParts(now);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const israelDate = `${value("year")}-${value("month")}-${value("day")}`;
  return israelDate <= blackFridayLastSignupDate;
}

export function getBlackFridayPresentation(now: Date = new Date()) {
  const active = isBlackFridayOfferActive(now);
  return {
    active,
    title: active ? blackFridayActiveTitle : blackFridayEndedTitle,
    heading: active ? blackFridayActiveHeading : blackFridayEndedHeading,
    sitemapLastModified: active ? blackFridayContentUpdatedDate : blackFridayExpiryDate,
  };
}
