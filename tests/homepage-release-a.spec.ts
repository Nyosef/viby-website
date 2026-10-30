import { expect, test } from "@playwright/test";

test("homepage targets digital punch cards while keeping the protected phrase first in the title", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("viby-analytics-consent", "denied"));
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page).toHaveTitle("כרטיסייה דיגיטלית לעסק | כרטיסיות ניקוב דיגיטליות | וייבי Viby");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText("כרטיסיות ניקוב דיגיטליות לעסק");
    await expect(page.locator(".v2-hero-slogan")).toHaveText(width < 761
      ? "הלקוחות כבר מגיעים. תנו להם סיבה לחזור."
      : "הלקוחות כבר מגיעים אליכם. תנו להם סיבה לחזור.", { useInnerText: true });
    await expect(page.getByRole("heading", { name: "מה זה כרטיס ניקוב דיגיטלי?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "כרטיסיית הטבות או כרטיסייה ששולמה מראש?" })).toBeVisible();
    await expect(page.locator(".v2-home-card-figure img")).toHaveAttribute("alt", "כרטיס ניקוב דיגיטלי עם 7 מתוך 10 ניקובים");
    await expect(page.locator(".v2-home-answer a[href='/digital-wallet']")).toBeVisible();
    await expect(page.locator("#buying-faq-punch-card")).toHaveText("שאלות נפוצות על כרטיסייה דיגיטלית לעסק");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
