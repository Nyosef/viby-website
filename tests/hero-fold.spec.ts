import { expect, test } from "@playwright/test";

test("homepage mobile hero keeps companies in the fold and preserves the full photograph", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("viby-analytics-consent", "denied"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, height] of [[1440, 900], [1366, 768], [768, 1024], [761, 1024], [760, 1024], [528, 812], [430, 932], [390, 844], [390, 780], [360, 800], [320, 640], [375, 667], [360, 640]]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText(width <= 760 ? "הלקוחות כבר מגיעים. תנו להם סיבה לחזור." : "הלקוחות כבר מגיעים אליכם. תנו להם סיבה לחזור.", { useInnerText: true });
    const brandIntro = page.locator(width <= 760 ? ".v2-hero-text.v2-mobile-only" : ".v2-hero-text.v2-desktop-only");
    await expect(brandIntro).toBeVisible();
    await expect(brandIntro).toBeInViewport({ ratio: 1 });
    if (width <= 760) {
      await expect(brandIntro).toHaveText("עם וייבי (Viby), הלקוחות מצטרפים בסריקה, צוברים ניקובים ושומרים כרטיסייה בארנק הדיגיטלי. בלי להוריד אפליקציה.");
      await expect(brandIntro.locator("bdi")).toHaveText("Viby");
      await expect(brandIntro).toHaveCSS("color", "rgb(42, 24, 48)");
      await expect(brandIntro).toHaveCSS("font-size", "16px");
      await expect(brandIntro).toHaveCSS("font-weight", "500");
      await expect(page.locator(".v2-company-line")).toBeHidden();
      await expect(page.locator("h1")).toHaveCSS("font-weight", "800");
    } else {
      await expect(brandIntro).toContainText("עם וייבי (Viby), בונים קשר עם הלקוחות");
      await expect(brandIntro.locator("bdi")).toHaveText("Viby");
      await expect(page.locator(".v2-company-line")).toBeVisible();
      await expect(page.locator(".v2-mobile-hero-photo")).toBeHidden();
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
    expect(await page.locator(".v2-story").evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(heroBottom);
    expect(await page.locator(".v2-trust").evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(heroBottom + 1);
    if (width <= 760) {
      const photo = page.locator(".v2-mobile-hero-photo");
      await expect(photo).toBeVisible();
      await expect(page.locator(".v2-hero-art .v2-nfc-modern")).not.toBeVisible();
      await expect(page.locator(".v2-compact-art-inner")).not.toBeVisible();
      const image = photo.locator("img");
      await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await expect(image).toHaveAttribute("width", "1448");
      await expect(image).toHaveAttribute("height", "1086");
      await expect(image).toHaveAttribute("loading", "eager");
      await expect(image).toHaveCSS("object-fit", "contain");
      const photoBox = (await image.boundingBox())!;
      expect(Math.abs(photoBox.width / photoBox.height - 4 / 3)).toBeLessThan(.01);
      const cta = page.locator(".v2-hero .v2-button-whatsapp");
      const ctaBox = (await cta.boundingBox())!;
      expect(photoBox.y).toBeGreaterThanOrEqual(ctaBox.y + ctaBox.height + 16);
      await expect(cta).toHaveCSS("background-color", "rgb(255, 255, 255)");
      await expect(cta.locator(".v2-mobile-only")).toHaveCSS("color", "rgb(42, 24, 48)");
      await expect(cta.locator(".v2-whatsapp-icon")).toHaveCSS("color", "rgb(21, 128, 61)");
      const reassurance = page.locator(".v2-hero-mobile-reassurance");
      await expect(reassurance.locator("li")).toHaveText(["הקמה מלאה עלינו", "תמיכה טכנית", "ללא התחייבות לטווח ארוך"]);
      const reassuranceBox = (await reassurance.boundingBox())!;
      expect(reassuranceBox.y).toBeGreaterThanOrEqual(photoBox.y + photoBox.height + 6);
      expect(reassuranceBox.y + reassuranceBox.height).toBeLessThanOrEqual((await page.locator(".v2-trust").boundingBox())!.y);
      expect(heroBottom).toBeLessThanOrEqual(height + 1);
      await expect(page.locator(".v2-logo-viewport")).toBeInViewport({ ratio: .99 });
      await expect(page.locator(".v2-trust-note")).toBeInViewport({ ratio: .99 });
      await expect(page.locator(".v2-trust-note .v2-mobile-only")).toHaveText("עסקים מקומיים משתמשים ב־Viby.");
      const noteBox = (await page.locator(".v2-trust-note").boundingBox())!;
      expect(noteBox.height).toBeLessThanOrEqual(21);
      expect(noteBox.y + noteBox.height).toBeLessThanOrEqual(height + 1);
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

test("other product heroes keep their original layout and use the photographic wall", async ({ page }) => {
  await page.goto("/viby-tap");
  await expect(page.locator(".compact-home-hero")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveText("שלט NFC לעסק שמרכז את כל הקישורים במקום אחד");
  await expect(page.locator(".v2-hero .v2-trust")).toHaveCount(0);
  await expect(page.locator(".v2-story .v2-trust")).toHaveCount(0);
  await expect(page.locator(".v2-story .social-proof")).toHaveCount(1);
  await expect(page.locator(".social-proof-heading h2")).toHaveText("חיבור עם הלקוחות מתחיל בסריקה");
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
    await expect(page.locator(".service-chooser--header .service-chooser-trigger > svg")).toBeVisible();
    const pickerBox = (await menu.boundingBox())!;
    const logoBox = (await page.locator(".v2-brand-row > a").boundingBox())!;
    expect(pickerBox.x).toBeGreaterThanOrEqual(0);
    expect(pickerBox.x + pickerBox.width).toBeLessThanOrEqual(logoBox.x);
    expect(pickerBox.height).toBe(44);
    await menu.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".service-chooser-panel .service-chooser-card")).toHaveCount(6);
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    const cta = page.locator(".v2-hero .v2-button-whatsapp");
    await expect(cta).toHaveText("קבלו הדגמה בוואטסאפ", { useInnerText: true });
    await expect(cta).toHaveAttribute("href", await page.locator(".v2-final-cta .v2-button-whatsapp").getAttribute("href") ?? "");
    const ctaBox = (await cta.boundingBox())!;
    expect(ctaBox.height).toBeGreaterThanOrEqual(56);
    await expect(page.locator(".v2-mobile-demo-link")).toHaveText("צפו איך זה עובד");
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

for (const consent of ["granted", "denied"] as const) {
  test(`mobile homepage WhatsApp CTA preserves ${consent} consent and emits no duplicates`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.route("**/googletagmanager.com/**", route => route.fulfill({ contentType: "application/javascript", body: "/* isolated analytics */" }));
    await page.route(/google-analytics\.com/, route => route.fulfill({ status: 204 }));
    await page.addInitScript(value => localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value, savedAt: Date.now() })), consent);
    await page.goto("/");
    // Interacting with the selector also ensures the shared client UI has hydrated.
    await page.locator(".service-chooser--header button").click();
    await page.keyboard.press("Escape");
    if (consent === "granted") {
      await expect.poll(() => page.evaluate(() => (window.dataLayer ?? []).filter(item => Array.from(item as ArrayLike<unknown>)[1] === "view_item").length)).toBe(1);
    }
    const cta = page.locator(".v2-hero .v2-button-whatsapp");
    await expect(cta).toHaveAttribute("data-analytics-location", "hero");
    await expect(cta).toHaveAttribute("href", await page.locator(".v2-final-cta .v2-button-whatsapp").getAttribute("href") ?? "");
    await cta.evaluate(link => link.addEventListener("click", event => event.preventDefault(), { once: true }));
    await cta.click();
    const events = await page.evaluate(() => (window.dataLayer ?? []).map(item => Array.from(item as ArrayLike<unknown>)).filter(item => item[0] === "event"));
    for (const name of ["click_whatsapp", "contact_intent"]) {
      const clicks = events.filter(item => item[1] === name);
      expect(clicks).toHaveLength(consent === "granted" ? 1 : 0);
      if (consent === "granted") expect(clicks[0][2]).toMatchObject({ page_path: "/", product_id: "punch-card", cta_location: "hero", contact_method: "whatsapp" });
    }
  });
}
