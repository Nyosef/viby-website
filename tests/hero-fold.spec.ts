import { expect, test } from "@playwright/test";

test("homepage copy, reassurance and existing customer strip fit in the fold", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("viby-analytics-consent", "denied"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, height] of [[1440, 900], [1366, 768], [768, 1024], [390, 844], [360, 800], [320, 740]]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("הלקוחות כבר מגיעים אליכם. תנו להם סיבה לחזור.");
    await expect(page.locator(".v2-hero .v2-trust")).toHaveCount(1);
    await expect(page.locator(".v2-story .v2-trust")).toHaveCount(0);
    await expect(page.locator(".v2-trust-heading")).toHaveCount(0);
    await expect(page.locator(".v2-hero-reassurance")).toContainText("הקמה מלאה עלינו");
    await expect(page.locator(".v2-hero-reassurance")).toContainText("תמיכה טכנית");
    await expect(page.locator(".v2-hero-reassurance")).toContainText("ללא התחייבות לטווח ארוך");
    await expect(page.locator(".v2-hero .commercial-disclosure")).toHaveCount(0);
    await expect(page.locator(".v2-price-strip .commercial-disclosure")).toContainText("3 חודשים");
    const heroBottom = await page.locator(".v2-hero").evaluate(el => el.getBoundingClientRect().bottom);
    expect(Math.abs(heroBottom - height)).toBeLessThanOrEqual(1);
    expect(await page.locator(".v2-story").evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(height);
    expect(await page.locator(".v2-trust").evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(height + 1);
    const rewardBounds = (await page.locator(".punch-reward").boundingBox())!;
    const nfcBounds = (await page.locator(".v2-nfc-modern").boundingBox())!;
    expect(nfcBounds.y).toBeGreaterThanOrEqual(rewardBounds.y + rewardBounds.height + 4);
    expect(nfcBounds.y + nfcBounds.height).toBeLessThanOrEqual((await page.locator(".v2-trust").boundingBox())!.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator(".v2-logo-track img").first().evaluate(img => {
      const image = img.getBoundingClientRect(), card = img.parentElement!.getBoundingClientRect();
      return image.top >= card.top && image.bottom <= card.bottom;
    })).toBe(true);
  }
});

test("other product heroes keep their original layout and customer section", async ({ page }) => {
  await page.goto("/viby-tap");
  await expect(page.locator(".compact-home-hero")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveText("שלט NFC לעסק שמרכז את כל הקישורים במקום אחד");
  await expect(page.locator(".v2-hero .v2-trust")).toHaveCount(0);
  await expect(page.locator(".v2-story .v2-trust")).toHaveCount(1);
  await expect(page.locator(".v2-trust-heading h2")).toHaveText("הלקוחות שלנו");
});


test("only the compact chooser follows scrolling and stays clear of Wallet headings", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("viby-analytics-consent", "denied"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const toolbar = page.locator(".v2-selector-wrap");
    const chooser = page.locator(".service-chooser--body .service-chooser-trigger");
    await toolbar.scrollIntoViewIfNeeded();
    const chooserBounds = (await chooser.boundingBox())!;
    expect((await toolbar.boundingBox())!.width).toBeLessThanOrEqual(chooserBounds.width + 1);
    const titleBounds = (await page.locator("#wallet-promo-title").boundingBox())!;
    const eyebrowBounds = (await page.locator(".v2-wallet-promo-eyebrow").boundingBox())!;
    expect(chooserBounds.y + chooserBounds.height).toBeLessThanOrEqual(eyebrowBounds.y);
    expect(chooserBounds.y + chooserBounds.height).toBeLessThanOrEqual(titleBounds.y);
    await chooser.click();
    await expect(page.locator(".service-chooser-panel .service-chooser-card")).toHaveCount(6);
    await page.keyboard.press("Escape");
    await expect(chooser).toBeFocused();
    for (const section of ["#how-it-works", "#benefits", ".v2-price-strip"]) {
      await page.locator(section).evaluate(el => el.scrollIntoView({ block: "start", behavior: "instant" }));
      await expect(chooser).toBeInViewport();
      await expect.poll(() => toolbar.evaluate(el => el.getBoundingClientRect().top)).toBe(0);
    }
    await chooser.click();
    await expect(page.locator(".service-chooser-panel .service-chooser-card")).toHaveCount(6);
    await page.keyboard.press("Escape");
  }
});

test("homepage journey shows registration, Wallet and staff-assisted redemption", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("viby-analytics-consent", "denied"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const cards = page.locator(".v2-journey-modern article");
    await expect(cards).toHaveCount(3);
    await expect(page.locator(".journey-step-label > span:first-child")).toHaveText(["1", "2", "3"]);
    await expect(cards.nth(0)).toContainText("סורקים ומצטרפים");
    await expect(cards.nth(1)).toContainText("Apple Wallet או Google Wallet");
    await expect(cards.nth(2)).toContainText("הצוות מנקב בכל ביקור");
    await expect(page.locator(".journey-artwork > span")).toHaveText(["המחשה", "המחשה", "המחשה"]);
    const images = page.locator(".journey-artwork img");
    await expect(images).toHaveCount(3);
    for (let index = 0; index < 3; index++) {
      await expect(images.nth(index)).toHaveAttribute("src", new RegExp(["phase_1", "phase2_new", "phase3_new"][index]));
      await images.nth(index).scrollIntoViewIfNeeded();
      await expect.poll(() => images.nth(index).evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
