import { expect, test } from "@playwright/test";

test("homepage copy, reassurance and existing customer strip fit in the fold", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("viby-analytics-consent", "denied"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, height] of [[1440, 900], [1366, 768], [768, 1024], [760, 1024], [430, 932], [390, 844], [360, 800], [320, 740], [375, 667], [360, 640]]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText(width <= 760 ? "הלקוחות כבר מגיעים. תנו להם סיבה לחזור." : "הלקוחות כבר מגיעים אליכם. תנו להם סיבה לחזור.", { useInnerText: true });
    const brandIntro = page.locator(width <= 760 ? ".v2-hero-text.v2-mobile-only" : ".v2-hero-text.v2-desktop-only");
    await expect(brandIntro).toBeVisible();
    await expect(brandIntro).toBeInViewport({ ratio: 1 });
    await expect(brandIntro.locator("bdi")).toHaveText("Viby");
    if (width <= 760) {
      await expect(brandIntro).toHaveText("עם וייבי (Viby), הלקוחות סורקים, צוברים הטבות ושומרים כרטיסייה בארנק הדיגיטלי. בלי אפליקציה.");
    } else {
      await expect(brandIntro).toContainText("עם וייבי (Viby), בונים קשר עם הלקוחות");
    }
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
    if (width <= 760) {
      const photo = page.locator(".v2-mobile-hero-photo");
      await expect(photo).toBeVisible();
      await expect(page.locator(".v2-hero-art .v2-nfc-modern")).not.toBeVisible();
      await expect(page.locator(".v2-compact-art-inner")).not.toBeVisible();
      expect((await photo.boundingBox())!.y + (await photo.boundingBox())!.height).toBeLessThanOrEqual((await page.locator(".v2-trust").boundingBox())!.y);
      await expect(page.locator(".v2-hero-mobile-reassurance li")).toHaveText(["הקמה עלינו", "בלי אפליקציה ללקוח", "תמיכה טכנית", "ללא התחייבות לטווח ארוך"]);
    } else {
      const rewardBounds = (await page.locator(".punch-reward").boundingBox())!;
      const nfcBounds = (await page.locator(".v2-nfc-modern").boundingBox())!;
      expect(nfcBounds.y).toBeGreaterThanOrEqual(rewardBounds.y + rewardBounds.height + 4);
      expect(nfcBounds.y + nfcBounds.height).toBeLessThanOrEqual((await page.locator(".v2-trust").boundingBox())!.y);
    }
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
  for (const width of [1440, 768, 430, 390, 360, 320]) {
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
      const alignment = await cards.nth(index).locator("h3").evaluate(heading => {
        const range = document.createRange();
        range.selectNodeContents(heading);
        return {
          direction: getComputedStyle(heading).direction,
          textRight: range.getBoundingClientRect().right,
          copyRight: heading.nextElementSibling!.getBoundingClientRect().right,
        };
      });
      expect(alignment.direction).toBe("rtl");
      expect(Math.abs(alignment.textRight - alignment.copyRight)).toBeLessThanOrEqual(1);
      await expect.poll(() => images.nth(index).evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});


test("mobile hero picker and demo action retain the existing contact and video flows", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("viby-analytics-consent", "denied"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  const videoRequests: string[] = [];
  await page.route("https://player.vimeo.com/**", route => {
    videoRequests.push(route.request().url());
    return route.fulfill({ contentType: "text/html", body: "<html><body>Video test</body></html>" });
  });
  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 900 });
    const requestsBeforeVisit = videoRequests.length;
    await page.goto("/");
    await expect(page.locator('iframe[src*="vimeo"]')).toHaveCount(0);
    expect(videoRequests).toHaveLength(requestsBeforeVisit);
    const header = page.locator(".v2-brand-row");
    expect((await header.boundingBox())!.height).toBeGreaterThanOrEqual(60);
    expect((await header.boundingBox())!.height).toBeLessThanOrEqual(64);
    const menu = page.locator(".service-chooser--header button");
    await expect(page.locator(".service-chooser--header .service-chooser-thumbnail")).toBeVisible();
    await expect(page.locator(".service-chooser--header .service-chooser-current strong")).toHaveText("כרטיסיות דיגיטליות");
    await expect(page.locator(".service-chooser--header .service-chooser-current > span")).not.toBeVisible();
    await expect(page.locator(".service-chooser--header .service-chooser-trigger > svg")).not.toBeVisible();
    const pickerBox = (await menu.boundingBox())!;
    const logoBox = (await page.locator(".v2-brand-row > a").boundingBox())!;
    expect(pickerBox.x).toBeGreaterThanOrEqual(0);
    expect(pickerBox.x + pickerBox.width).toBeLessThanOrEqual(logoBox.x);
    expect(pickerBox.height).toBe(44);
    await menu.click();
    await expect(page.locator(".service-chooser-panel .service-chooser-card")).toHaveCount(6);
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    const cta = page.locator(".v2-hero .v2-button-whatsapp");
    await expect(cta).toHaveText("קבלו הדגמה בוואטסאפ", { useInnerText: true });
    await expect(cta).toHaveAttribute("href", await page.locator(".v2-final-cta .v2-button-whatsapp").getAttribute("href") ?? "");
    const ctaBox = (await cta.boundingBox())!;
    expect(ctaBox.height).toBeGreaterThanOrEqual(54);
    expect(Math.abs(ctaBox.width - (await page.locator(".v2-hero-copy").boundingBox())!.width)).toBeLessThanOrEqual(1);
    await page.locator(".v2-mobile-demo-link").click();
    const player = page.locator("#demo-player-punch-card iframe");
    await expect(player).toBeInViewport({ ratio: .9 });
    await expect(player).toHaveAttribute("src", /autoplay=1/);
    await expect(player).toHaveAttribute("src", /dnt=1/);
    await expect(player).toHaveAttribute("allow", /autoplay/);
    await expect.poll(() => videoRequests.length).toBe(requestsBeforeVisit + 1);
    expect((await player.boundingBox())!.y).toBeGreaterThanOrEqual((await page.locator(".v2-selector-wrap").boundingBox())!.height);
    await expect(page.locator(".video-consent-preview button")).toHaveCount(0);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.locator(".v2-mobile-demo-link").click();
    await expect.poll(() => videoRequests.length).toBe(requestsBeforeVisit + 2);
    await expect(player).toBeInViewport({ ratio: .9 });
  }
});


test("demo action scrolls to the playing video with normal motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem("viby-analytics-consent", "denied"));
  await page.route("https://player.vimeo.com/**", route => route.fulfill({ contentType: "text/html", body: "<html><body>Video test</body></html>" }));
  await page.goto("/");
  await expect(page.locator('iframe[src*="vimeo"]')).toHaveCount(0);
  await page.locator(".v2-mobile-demo-link").click();
  const player = page.locator("#demo-player-punch-card iframe");
  await expect(player).toHaveAttribute("src", /autoplay=1/);
  await expect(player).toBeInViewport({ ratio: .9 });
});
