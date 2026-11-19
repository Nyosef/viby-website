import { expect, test } from "@playwright/test";

const articles = [
  { path: "/why-customers-dont-return", heading: "למה הלקוח ההוא לא חזר? מדריך לעסקים קטנים ובינוניים" },
  { path: "/black-friday-small-business", heading: "בלאק פריידי 2026 לעסקים קטנים ובינוניים: איך הופכים מבצע ללקוחות שחוזרים?" },
] as const;

for (const article of articles) {
  test(`${article.path} reads well on mobile and desktop`, async ({ page, request }, testInfo) => {
    const response = await request.get(article.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(article.heading);
    expect(html).toContain(`https://joinviby.co.il${article.path}`);
    expect(html).toContain('data-article-body');

    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(article.path);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(article.heading);
      await expect(page.locator('[data-article-body] a[href="/"]')).toHaveText("כרטיסייה דיגיטלית לעסק");
      await expect(page.getByRole("link", { name: "הכירו את Viby UP" })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (width === 390 || width === 1440) {
        await page.screenshot({ path: testInfo.outputPath(`${article.path.slice(1)}-${width}.png`), fullPage: true });
      }
    }
    await page.getByRole("link", { name: "הכירו את Viby UP" }).click();
    await expect(page).toHaveURL(/\/viby-up$/);
  });
}

test("articles are discoverable without replacing the FAQ cards", async ({ page }) => {
  await page.goto("/business-faq");
  await expect(page.locator('section[aria-labelledby="punch-card-questions"] a[class*="questionCard"]')).toHaveCount(2);
  await expect(page.locator('[data-editorial-guides] a')).toHaveCount(2);
  for (const article of articles) {
    await expect(page.locator(`[data-editorial-guides] a[href="${article.path}"]`)).toBeVisible();
  }
});

test("retention article preserves the approved copy edits", async ({ page }) => {
  await page.goto("/why-customers-dont-return");
  await expect(page.getByText("מדריך לבעלי עסקים שמעדיפים לקוחות קבועים על עוד מודעה.")).toBeVisible();
  await expect(page.locator('p[class*="byline"]')).toContainText("וייבי (Viby) · 18 בנובמבר 2026");
  await expect(page.getByRole("heading", { name: "״תודה שבאתם״ זה נחמד. קשר אישי דורש להקשיב" })).toBeVisible();
  await expect(page.locator("[data-article-body]")).toContainText("ישמח לשמוח לשמוע שהמאפה חזר.");
  await expect(page.locator("[data-article-body]")).toContainText("אוטומציה.שולחים הודעה אישית");
  await expect(page.locator("[data-article-body] ol li")).toHaveCount(3);
  await expect(page.locator("[data-article-body] ol li").last()).toHaveText("הגדירו סיבה פשוטה להגיע שוב, עם כללים שהצוות יכול להסביר וליישם.");
  await expect(page.locator('p[class*="publicationNote"]')).toHaveText("תאריך הפרסום בקוד עדיין מוגדר ל־18 בנובמבר 2026; יש לעדכן אותו אם הפרסום בפועל יהיה מאוחר יותר.");
});

test("Black Friday article preserves the approved copy edits", async ({ page }) => {
  await page.goto("/black-friday-small-business");
  await expect(page.locator("[data-article-body]")).toContainText("בלאק פריידי 2026 התחיל בשישי, 27 בנובמבר.");
  await expect(page.getByRole("heading", { name: "1. לא כל מבצע חייב להיות 50% הנחה" })).toBeVisible();
  await expect(page.locator("[data-article-body]")).toContainText("מבצע מוצלח צריך וחייב לתת ללקוח ערך");
  await expect(page.getByRole("heading", { name: "יום אחד של מבצע. קשר שיכול להימשך לאורך זמן" })).toBeVisible();
});
