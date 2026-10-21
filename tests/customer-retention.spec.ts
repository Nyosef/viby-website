import { expect, test } from "@playwright/test";
import { siteConfig } from "../src/lib/site";

const productPaths = ["/", "/smart-wheel", "/digital-wallet", "/viby-up", "/viby-rate", "/viby-tap"];
const message = "היי, הגעתי מהעמוד על מועדון לקוחות דיגיטלי ואשמח לעזרה בבחירת הכלים לעסק שלי.";

async function setConsent(page: import("@playwright/test").Page, value: "granted" | "denied") {
  await page.addInitScript((consent) => {
    localStorage.setItem("viby-analytics-consent", JSON.stringify({
      version: 1,
      value: consent,
      savedAt: Date.now(),
    }));
  }, value);
}

test("customer-retention guide fits RTL mobile and desktop with accessible comparison", async ({ page, request }) => {
  await setConsent(page, "denied");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/customer-retention");
    if (width === 320) {
      await page.keyboard.press("Tab");
      await expect(page.getByRole("link", { name: "וייבי — דף הבית" }).first()).toBeFocused();
    }
    await expect(page.locator("html")).toHaveAttribute("lang", "he-IL");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("מועדון לקוחות דיגיטלי לעסקים: בוחרים את הכלים שמתאימים לעסק שלכם");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 2 })).toHaveCount(9);
    await expect(page.locator("[data-retention-decision]")).toHaveCount(3);
    await expect(page.locator("[data-retention-product]")).toHaveCount(6);
    await expect(page.locator("details")).toHaveCount(8);
    expect(await page.locator("[data-retention-product]").evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")),
    )).toEqual(productPaths);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const selector of ["[data-retention-decision]", "[data-retention-product]", '[data-analytics-location="hero"]']) {
      expect(await page.locator(selector).evaluateAll((elements) => elements.every((element) => {
        const rect = element.getBoundingClientRect();
        return rect.left >= -1 && rect.right <= innerWidth + 1 && rect.width > 0;
      }))).toBe(true);
    }
    for (const location of ["hero", "mid_page_cta", "final_cta"]) {
      const actions = page.locator(`[data-analytics-location="${location}"]`);
      for (const action of await actions.all()) {
        await action.scrollIntoViewIfNeeded();
        expect(await action.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          const topmost = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
          return topmost === element || element.contains(topmost);
        })).toBe(true);
      }
    }
    await page.getByRole("link", { name: "איזה כלי מתאים לי?" }).click();
    await expect(page).toHaveURL(/\/customer-retention#comparison$/);
  }
  for (const path of [...productPaths, "/about", "/how-it-works", "/support", "/terms", "/privacy"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  await page.goto("/terms#terms-8");
  await expect(page.locator("#terms-8")).toBeVisible();
});

test("guide product and incoming homepage links navigate without changing the hero", async ({ page }) => {
  await setConsent(page, "denied");
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("הלקוחות כבר מגיעים אליכם. תנו להם סיבה לחזור.");
  await page.getByRole("link", { name: "איך לבחור מועדון לקוחות דיגיטלי לעסק" }).click();
  await expect(page).toHaveURL(/\/customer-retention$/);
  await page.locator('[data-retention-product][href="/smart-wheel"]').click();
  await expect(page).toHaveURL(/\/smart-wheel$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("גלגל מזל דיגיטלי");
});

for (const consent of ["granted", "denied"] as const) {
  test(`guide WhatsApp CTAs use configured number and ${consent} attribution`, async ({ page }) => {
    await setConsent(page, consent);
    await page.route("**/googletagmanager.com/**", (route) =>
      route.fulfill({ contentType: "application/javascript", body: "/* isolated analytics loader */" }),
    );
    await page.route(/google-analytics\.com/, (route) => route.fulfill({ status: 204 }));
    await page.goto("/customer-retention");
    for (const location of ["hero", "mid_page_cta", "final_cta"]) {
      const cta = page.locator(`a[href^="https://wa.me/"][data-analytics-location="${location}"]`);
      await expect(cta).toHaveCount(1);
      const destination = new URL((await cta.getAttribute("href"))!);
      expect(destination.origin).toBe("https://wa.me");
      expect(destination.pathname).toBe(`/${siteConfig.whatsappNumber}`);
      expect(destination.searchParams.get("text")).toBe(message);
    }
    await expect(page.locator('a[data-analytics-location="final_cta"][href="tel:+972552639957"]')).toContainText(siteConfig.whatsappDisplay);
    const heroCta = page.locator('[data-analytics-location="hero"]');
    await heroCta.evaluate((element) => element.addEventListener("click", (event) => event.preventDefault()));
    await heroCta.click();
    const clicks = await page.evaluate(() => (window.dataLayer ?? [])
      .map((item) => Array.from(item as ArrayLike<unknown>))
      .filter((item) => item[0] === "event" && item[1] === "click_whatsapp"));
    expect(clicks).toHaveLength(consent === "granted" ? 1 : 0);
    if (consent === "granted") {
      expect(clicks[0][2]).toMatchObject({
        cta_location: "hero",
        contact_type: "sales",
        product_id: "none",
        page_path: "/customer-retention",
      });
      expect(JSON.stringify(clicks[0][2])).not.toContain(message);
    }
  });
}
