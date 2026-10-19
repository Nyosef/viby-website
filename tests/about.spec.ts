import { expect, test } from "@playwright/test";
import { siteConfig } from "../src/lib/site";

const solutionPaths = [
  "/",
  "/smart-wheel",
  "/digital-wallet",
  "/viby-tap",
  "/viby-rate",
  "/viby-up",
];

async function setConsent(page: import("@playwright/test").Page, value: "granted" | "denied") {
  await page.addInitScript((consent) => {
    localStorage.setItem("viby-analytics-consent", JSON.stringify({
      version: 1,
      value: consent,
      savedAt: Date.now(),
    }));
  }, value);
}

test("approved About copy and six linked solutions fit mobile and desktop RTL", async ({ page }) => {
  await setConsent(page, "denied");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "he-IL");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("טכנולוגיה של הגדולים. בשביל כולם.");
    await expect(page.getByText("נעים להכיר, אנחנו וייבי (Viby).", { exact: false })).toBeVisible();
    const primaryAction = page.locator('[data-analytics-location="hero"]');
    const secondaryAction = page.getByRole("link", { name: "הכירו את הפתרונות שלנו" });
    for (const action of [primaryAction, secondaryAction]) {
      await action.scrollIntoViewIfNeeded();
      expect(await action.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const topmost = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        return topmost === element || element.contains(topmost);
      })).toBe(true);
    }
    if (width <= 900) {
      expect(await page.locator("[class*='heroArtwork']").evaluate((artwork) => {
        const artworkBounds = artwork.getBoundingClientRect();
        const precedingActions = artwork.previousElementSibling?.querySelector("[class*='actions']");
        const followingSection = artwork.parentElement?.nextElementSibling;
        if (!precedingActions || !followingSection) return false;
        return precedingActions.getBoundingClientRect().bottom < artworkBounds.top
          && artworkBounds.bottom <= followingSection.getBoundingClientRect().top;
      })).toBe(true);
    }
    await expect(page.locator("[data-about-solution]")).toHaveCount(6);
    expect(await page.locator("[data-about-solution]").evaluateAll((cards) =>
      cards.map((card) => card.getAttribute("href")),
    )).toEqual(solutionPaths);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator("[data-about-solution]").evaluateAll((cards) => cards.every((card) => {
      const bounds = card.getBoundingClientRect();
      return bounds.left >= -1 && bounds.right <= innerWidth + 1;
    }))).toBe(true);
  }
});

test("About solution cards and incoming footer links navigate", async ({ page, request }) => {
  await setConsent(page, "denied");
  await page.goto("/about");
  await page.getByRole("link", { name: "הכירו את הפתרונות שלנו" }).click();
  await expect(page).toHaveURL(/\/about#solutions$/);
  for (const path of solutionPaths) {
    expect((await request.get(path)).status()).toBe(200);
  }
  await page.locator('[data-about-solution][href="/smart-wheel"]').click();
  await expect(page).toHaveURL(/\/smart-wheel$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("גלגל מזל דיגיטלי");
  await page.getByRole("link", { name: "אודות וייבי", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
});

for (const consent of ["granted", "denied"] as const) {
  test(`About WhatsApp CTA keeps configured destination and ${consent} attribution`, async ({ page }) => {
    await setConsent(page, consent);
    await page.route("**/googletagmanager.com/**", (route) =>
      route.fulfill({ contentType: "application/javascript", body: "/* isolated analytics loader */" }),
    );
    await page.route(/google-analytics\.com/, (route) => route.fulfill({ status: 204 }));
    await page.goto("/about");
    const cta = page.locator('[data-analytics-location="hero"]');
    const href = await cta.getAttribute("href");
    const destination = new URL(href!);
    expect(destination.origin).toBe("https://wa.me");
    expect(destination.pathname).toBe(`/${siteConfig.whatsappNumber}`);
    await cta.evaluate((element) => element.addEventListener("click", (event) => event.preventDefault()));
    await cta.click();
    const clicks = await page.evaluate(() => (window.dataLayer ?? [])
      .map((item) => Array.from(item as ArrayLike<unknown>))
      .filter((item) => item[0] === "event" && item[1] === "click_whatsapp"));
    expect(clicks).toHaveLength(consent === "granted" ? 1 : 0);
    if (consent === "granted") {
      expect(clicks[0][2]).toMatchObject({
        cta_location: "hero",
        contact_type: "sales",
        product_id: "none",
        page_path: "/about",
      });
    }
  });
}
