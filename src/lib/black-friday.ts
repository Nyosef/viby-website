export const blackFridayPath = "/מבצעי-בלאק-פריידי-לכרטיסיות-ניקוב-דיגיטליות";
export const blackFridayPhrase = "מבצעי בלאק פריידי לכרטיסיות ניקוב דיגיטליות";
export const blackFridayMonthlyPrice = 269;
export const blackFridayPreviousMonthlyPrice = 329;
export const blackFridayLastSignupDate = "2026-11-29";

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
