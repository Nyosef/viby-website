import { expect, test } from "@playwright/test";
import {
  blackFridayPath,
  blackFridayPhrase,
  isBlackFridayOfferActive,
} from "../src/lib/black-friday";
import { siteConfig } from "../src/lib/site";

test("Black Friday offer expires at midnight in Israel", () => {
  expect(isBlackFridayOfferActive(new Date("2026-11-29T21:59:59.000Z"))).toBe(true);
  expect(isBlackFridayOfferActive(new Date("2026-11-29T22:00:00.000Z"))).toBe(false);
});

test("Hebrew Black Friday page has exact search phrase, contact actions, and responsive layout", async ({ page, request }, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value: "denied", savedAt: Date.now() }));
  });

  const response = await request.get(blackFridayPath);
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain(blackFridayPhrase);
  expect(html).not.toMatch(/<meta name="robots" content="[^"]*noindex/);

  for (const width of [320, 390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(blackFridayPath, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(`${blackFridayPhrase} | Viby`);
    await expect(page.locator("html")).toHaveAttribute("lang", "he-IL");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(blackFridayPhrase);
    expect((await page.locator('main p[class*="lead"]').textContent())?.trim().startsWith(blackFridayPhrase)).toBe(true);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(decodeURI(new URL(canonical!).pathname)).toBe(blackFridayPath);
    const heroPhone = page.locator('main a[data-analytics-location="hero"][href^="tel:"]');
    const heroWhatsapp = page.locator('main a[data-analytics-location="hero"][href^="https://wa.me/"]');
    await expect(heroPhone).toHaveAttribute("href", `tel:+${siteConfig.whatsappNumber}`);
    await expect(heroPhone).toContainText(siteConfig.whatsappDisplay);
    await expect(heroWhatsapp).toHaveAttribute("href", new RegExp(`^https://wa\\.me/${siteConfig.whatsappNumber}\\?text=`));
    await expect(heroPhone).toBeVisible();
    await expect(heroWhatsapp).toBeVisible();
    const brandLogos = page.locator('main [class*="brandLogos"] img');
    await expect(brandLogos).toHaveCount(13);
    if (width <= 390) {
      const brandBox = (await page.locator('main [class*="brandBar"]').boundingBox())!;
      const lastLogo = (await brandLogos.last().boundingBox())!;
      expect(lastLogo.y + lastLogo.height).toBeLessThanOrEqual(brandBox.y + brandBox.height);
    }
    await expect(page.locator('main figure[class*="heroImage"] img')).toHaveCount(1);
    await expect(page.locator('main [class*="businesses"] figure')).toHaveCount(8);
    await expect(page.locator('main [class*="businesses"] figcaption strong')).toHaveText([
      "קפה פריז", "בורקס בבא", "Magic Wash", "קפה רולנד",
      "נחת הרצליה", "ארבל באולינג", "Freddo", "נוגה פרחים",
    ]);
    await expect(page.locator('main [class*="businesses"] figcaption span')).toHaveCount(8);
    await expect(page.locator('main [class*="outcomes"] li')).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390) {
      const gallery = page.locator('main [class*="businesses"]');
      expect(await gallery.evaluate((node) => node.scrollWidth > node.clientWidth)).toBe(true);
      const galleryBox = (await gallery.boundingBox())!;
      const firstCard = (await gallery.locator("figure").first().boundingBox())!;
      expect(firstCard.width).toBeCloseTo(galleryBox.width, 0);
    }
    if (width === 1440) {
      const firstCard = (await page.locator('main [class*="businesses"] figure').first().boundingBox())!;
      expect(firstCard.height / firstCard.width).toBeCloseTo(1.25, 1);
      const benefitsBox = (await page.locator('main [class*="outcomes"]').boundingBox())!;
      const brandBox = (await page.locator('main [class*="brandBar"]').boundingBox())!;
      expect(brandBox.y).toBeGreaterThan(benefitsBox.y + benefitsBox.height);
      expect(brandBox.y + brandBox.height).toBeLessThanOrEqual(900);
    }
    if (width === 390 || width === 1024 || width === 1440) {
      await expect.poll(() => page.locator('main figure[class*="heroImage"] img').evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await page.locator('main [class*="businesses"] figure').first().scrollIntoViewIfNeeded();
      await expect.poll(() => page.locator('main [class*="businesses"] figure img').first().evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: testInfo.outputPath(`black-friday-${width}.png`), fullPage: true });
    }
    if (width === 320) {
      const phoneSize = await heroPhone.locator("bdi").evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
      expect(phoneSize).toBeGreaterThanOrEqual(32);
      const phoneBox = (await heroPhone.boundingBox())!;
      expect(phoneBox.y + phoneBox.height).toBeLessThanOrEqual(900);
    }
  }

  const mainText = await page.locator("main").innerText();
  if (isBlackFridayOfferActive()) {
    const bundle = page.locator('main [class*="offerBundle"]');
    await expect(bundle).toContainText("כרטיסיית ניקוב דיגיטלית");
    await expect(bundle).toContainText("Viby UP · סוכני AI חכמים");
    await expect(bundle).toContainText("שיחות, ביקורות וחשיפה ב־Google וב־AI");
    expect(mainText).toContain("269 ₪ לחודש");
    expect(mainText).toContain("329 ₪");
    await expect(page.locator('main del')).toHaveText("329 ₪");
    expect(mainText).not.toContain("807 ₪");
    await expect(page.locator('main [class*="offerDetails"]')).toContainText("תקופה ראשונית של 3 חודשים");
    expect(mainText).toContain("המחיר נשמר לכל חיי המנוי הפעיל");
    expect(mainText).toContain("הצטרפות עד 29.11.2026");
  } else {
    expect(mainText).not.toContain("269 ₪");
    expect(mainText).not.toContain("329 ₪");
    expect(mainText).not.toContain("807 ₪");
    expect(mainText).toContain("מבצע 2026 הסתיים");
    expect(mainText).toContain("הצעה עדכנית");
  }
});

test("Black Friday page is discoverable from product pages and sitemap", async ({ page, request }) => {
  for (const productPath of ["/", "/viby-up"]) {
    await page.goto(productPath);
    await expect(page.locator(`a[href="${blackFridayPath}"]`).first()).toBeVisible();
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(decodeURI(sitemap)).toContain(`https://joinviby.co.il${blackFridayPath}`);
});
