import { expect, test } from "@playwright/test";
import { blackFridayPath } from "../src/lib/black-friday";

const routes = [
  { path: "/industries/cafes", title: "כרטיסיית ניקוב דיגיטלית לבית קפה ולעגלת קפה | Viby", h1: "כרטיסיית ניקוב דיגיטלית לבית קפה" },
  { path: "/industries/car-washes", title: "כרטיסיית ניקוב דיגיטלית לשטיפת רכב | Viby", h1: "כרטיסיית ניקוב דיגיטלית לשטיפת רכב" },
  { path: "/industries/bakeries", title: "כרטיסייה דיגיטלית למאפייה ולקונדיטוריה | Viby", h1: "כרטיסייה דיגיטלית למאפייה ולקונדיטוריה" },
  { path: "/industries/hair-salons", title: "כרטיסייה דיגיטלית למספרה ולברברשופ | Viby", h1: "כרטיסייה דיגיטלית למספרה ולברברשופ" },
  { path: "/business-faq", title: "שאלות נפוצות על כרטיסיות ניקוב ומועדון לקוחות לעסק | וייבי Viby", h1: "שאלות נפוצות לבעלי עסקים: כרטיסיות ניקוב ומועדון לקוחות" },
  { path: "/business-faq/free-digital-punch-card", title: "כרטיסייה דיגיטלית בחינם: אפשרויות, מגבלות ומחיר | וייבי Viby", h1: "האם אפשר לקבל כרטיסייה דיגיטלית בחינם?" },
  { path: "/business-faq/printable-vs-digital-punch-card", title: "כרטיסיית ניקוב להדפסה או דיגיטלית? השוואה לעסק | וייבי Viby", h1: "כרטיסיית ניקוב להדפסה או דיגיטלית: מה עדיף לעסק?" },
  { path: "/how-it-works", title: "איך Viby עובדת | Viby", h1: "איך Viby עובדת בפועל." },
  { path: "/support", title: "תמיכה | Viby", h1: "תמיכה ב-Viby" },
  { path: "/about", title: "אודות וייבי | Viby", h1: "טכנולוגיה של הגדולים. בשביל כולם." },
] as const;

const expectedInternalLinks = [
  "/", "/smart-wheel", "/digital-wallet", "/viby-up", "/viby-rate", "/viby-tap",
  "/industries/cafes", "/industries/car-washes", "/industries/bakeries", "/industries/hair-salons",
  "/en/industries/digital-punch-card-loyalty-cafe-israel-providers-pricing-2026",
  "/how-it-works", "/about", "/customer-retention", blackFridayPath,
  "/business-faq", "/support", "/terms", "/privacy",
].sort();

test("the ten content pages use the full product footer without changing their headings", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value: "denied", savedAt: Date.now() }));
  });

  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      await expect(page).toHaveTitle(route.title);
      await expect(page.locator("main h1")).toHaveText(route.h1);
      await expect(page.locator("main h1")).toHaveCount(1);

      const footer = page.locator("main > footer.v2-footer");
      await expect(footer).toHaveCount(1);
      await expect(page.locator("main footer")).toHaveCount(1);
      for (const label of ["פתרונות Viby", "פתרונות לפי סוג העסק", "קישורים שימושיים"]) {
        await expect(footer.getByRole("navigation", { name: label })).toBeVisible();
      }
      const internalLinks = await footer.locator('a[href^="/"]').evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")!).sort(),
      );
      expect(internalLinks, route.path).toEqual(expectedInternalLinks);
      await expect(footer.locator('a[href="https://www.instagram.com/viby.il/"]')).toBeVisible();
      await expect(footer.locator('a[href="https://www.linkedin.com/company/vibyil/"]')).toBeVisible();
      await expect(footer.locator(".privacy-preferences-link")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route.path).toBe(true);

      if (width === 390) {
        await footer.locator(".privacy-preferences-link").click();
        await expect(page.getByRole("dialog", { name: "העדפות פרטיות", exact: true })).toBeVisible();
      }
    }
  }
});
