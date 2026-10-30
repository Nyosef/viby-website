import { expect, test } from "@playwright/test";

const faqRoutes = [
  { path: "/business-faq", h1: "שאלות נפוצות לבעלי עסקים", title: "שאלות נפוצות לבעלי עסקים | וייבי Viby" },
  { path: "/business-faq/free-digital-punch-card", h1: "האם אפשר לקבל כרטיסייה דיגיטלית לעסק בחינם?", title: "כרטיסייה דיגיטלית בחינם לעסק: מה האפשרויות? | וייבי Viby" },
  { path: "/business-faq/printable-vs-digital-punch-card", h1: "כרטיסיית ניקוב להדפסה או דיגיטלית: מה עדיף לעסק?", title: "כרטיסיית ניקוב להדפסה או דיגיטלית? השוואה לעסק | וייבי Viby" },
] as const;

for (const faq of faqRoutes) {
  test(`${faq.path} has crawlable content and responsive layout`, async ({ page, request }, testInfo) => {
    await page.addInitScript(() => {
      localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value: "denied", savedAt: Date.now() }));
    });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await request.get(faq.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(faq.h1);
    expect(html).toContain(`https://joinviby.co.il${faq.path}`);
    expect(html).not.toMatch(/<meta name="robots" content="[^"]*noindex/);
    expect(html).not.toContain('"@type":"FAQPage"');

    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(faq.path);
      await expect(page).toHaveTitle(faq.title);
      await expect(page.locator("html")).toHaveAttribute("lang", "he-IL");
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(faq.h1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const href of ["/", "/business-faq", "/terms", "/privacy"]) {
        await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
      }
      if (faq.path === "/business-faq") {
        await expect(page.getByRole("heading", { level: 2, name: "כרטיסיות ניקוב לעסקים" })).toBeVisible();
        for (const answer of faqRoutes.slice(1)) {
          await expect(page.locator(`a[href="${answer.path}"]`).filter({ has: page.getByRole("heading", { name: answer.h1 }) })).toBeVisible();
        }
      } else {
        await expect(page.locator("[data-faq-answer] p")).toHaveCount(4);
        await expect(page.locator('main a[href="/"]').filter({ hasText: faq.path.includes("free-digital") ? "כרטיס ניקוב דיגיטלי לעסק" : "כרטיסיית ניקוב דיגיטלית לעסק" })).toHaveCount(1);
        await expect(page.locator('footer a[href="/"]')).toHaveText("כרטיסייה דיגיטלית לעסק");
        const other = faqRoutes.slice(1).find((candidate) => candidate.path !== faq.path)!;
        await expect(page.locator(`main a[href="${other.path}"]`)).toBeVisible();
        await expect(page.getByText("המחשה בלבד")).toBeVisible();
        const photo = page.locator("img[data-faq-image]");
        await expect(photo).toBeVisible();
        expect(await photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
        await expect(photo).toHaveAttribute("src", /_next\/image\?url=%2Fphase/);
        if (faq.path.includes("free-digital")) {
          await expect(page.locator("[data-faq-answer]")).toContainText("79 ₪ לחודש לכלי");
          await expect(page.locator("[data-faq-answer]")).toContainText("237 ₪ למנוי בתקופה הראשונה");
          await expect(page.locator("[data-faq-answer]")).toContainText("משלוח ותוספות מאושרות מתומחרים בנפרד");
        }
      }
      if (width === 390 || width === 1440) {
        await page.screenshot({ path: testInfo.outputPath(`${faq.path.split("/").at(-1)}-${width}.png`), fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}

test("FAQ URLs occur once in the sitemap, and existing commercial pages retain their headings", async ({ request, page }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const faq of faqRoutes) {
    expect(sitemap.match(new RegExp(`<loc>https://joinviby.co.il${faq.path}</loc>`, "g")) ?? []).toHaveLength(1);
  }
  for (const [path, heading] of [
    ["/", "כרטיסיות ניקוב דיגיטליות לעסק"],
    ["/smart-wheel", "גלגל מזל דיגיטלי שהופך כל קנייה לסיבה לחזור"],
    ["/digital-wallet", "כרטיס מתנה דיגיטלי לעסק שנשמר ישר בטלפון"],
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
  }
  await page.goto("/");
  await expect(page.locator('footer.v2-footer nav[aria-label="קישורים שימושיים"] a[href="/business-faq"]')).toHaveText("שאלות נפוצות לעסקים");
  await expect(page.locator('.v2-buying-faq a[href="/business-faq"]')).toHaveText("לכל השאלות הנפוצות לבעלי עסקים");
  await expect(page.locator('.v2-buying-faq-list details')).toHaveCount(12);
  for (const path of ["/business-faq/free-digital-punch-card", "/business-faq/printable-vs-digital-punch-card"]) {
    await expect(page.locator(`.v2-buying-faq-articles a[href="${path}"]`)).toBeVisible();
  }
});
