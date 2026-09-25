import { expect, test, type Page } from "@playwright/test";

const visitKey = "viby-whatsapp-visit-v1";
const trigger = (page: Page) => page.locator(".whatsapp-widget-trigger");
const preview = (page: Page) => page.locator("#whatsapp-preview");
async function events(page: Page, name: string) {
  return page.evaluate(
    (name) =>
      (window.dataLayer ?? [])
        .map((item) => Array.from(item as ArrayLike<unknown>))
        .filter((item) => item[0] === "event" && item[1] === name),
    name,
  );
}
async function initialize(
  page: Page,
  consent: "granted" | "denied" | null = "granted",
  age = 0,
) {
  await page.addInitScript(
    ({ consent, age, visitKey }) => {
      if (consent) localStorage.setItem("viby-analytics-consent", consent);
      if (!sessionStorage.getItem(visitKey))
        sessionStorage.setItem(
          visitKey,
          JSON.stringify({
            startedAt: Date.now() - age,
            read: false,
            exposureTracked: false,
          }),
        );
    },
    { consent, age, visitKey },
  );
}

test.beforeEach(async ({ page }) => {
  // Exercise our actual consent/event code without sending test data to Google.
  await page.route("**/googletagmanager.com/**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: "/* GA loader intentionally isolated in UI tests */",
    }),
  );
  await page.route(/google-analytics\.com/, (route) =>
    route.fulfill({ status: 204 }),
  );
});

test("4s icon, 50s badge, no unsolicited preview, read persists on reload", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-09-25T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-09-25T12:00:01Z"));
  await initialize(page);
  await page.goto("/");
  await expect
    .poll(async () => {
      await page.clock.runFor(10);
      return (await events(page, "view_item")).length;
    })
    .toBe(1);
  const remaining = await page.evaluate(
    (key) =>
      JSON.parse(sessionStorage.getItem(key)!).startedAt + 4000 - Date.now(),
    visitKey,
  );
  await page.clock.runFor(remaining - 1);
  await expect(trigger(page)).toHaveCount(0);
  await page.clock.runFor(1);
  await expect(trigger(page)).toBeVisible();
  await expect(page.locator(".whatsapp-unread")).toHaveCount(0);
  await page.clock.runFor(45999);
  await expect(page.locator(".whatsapp-unread")).toHaveCount(0);
  await page.clock.runFor(1);
  await expect(page.locator(".whatsapp-unread")).toHaveText("1");
  await expect(preview(page)).toHaveCount(0);
  await trigger(page).click();
  await expect(preview(page)).toBeVisible();
  await expect(page.locator(".whatsapp-unread")).toHaveCount(0);
  await expect(preview(page)).toContainText("היי, זאת בר 👋");
  await page.keyboard.press("Escape");
  await expect(trigger(page)).toBeFocused();
  await page.reload();
  await page.clock.runFor(10);
  await expect(trigger(page)).toBeVisible();
  await expect(page.locator(".whatsapp-unread")).toHaveCount(0);
  await expect(preview(page)).toHaveCount(0);
});

test("hover requires 1.5 seconds, leaving cancels, early reading suppresses badge", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-09-25T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-09-25T12:00:01Z"));
  await initialize(page, "granted", 4000);
  await page.goto("/");
  await expect
    .poll(async () => {
      await page.clock.runFor(10);
      return (await events(page, "view_item")).length;
    })
    .toBe(1);
  await page.clock.runFor(1);
  await trigger(page).hover();
  await page.clock.runFor(1000);
  await page.mouse.move(700, 300);
  await page.clock.runFor(2000);
  await expect(preview(page)).toHaveCount(0);
  await trigger(page).hover();
  await page.clock.runFor(1499);
  await expect(preview(page)).toHaveCount(0);
  await page.clock.runFor(1);
  await expect(preview(page)).toBeVisible();
  expect((await events(page, "whatsapp_preview_opened"))[0][2]).toMatchObject({
    open_method: "hover",
  });
  await page.clock.runFor(50000);
  await expect(page.locator(".whatsapp-unread")).toHaveCount(0);
});

test("navigation retains timer, one exposure, chooser events, and correct product payload", async ({
  page,
}) => {
  await initialize(page, "granted", 5000);
  await page.goto("/");
  await expect(trigger(page)).toBeVisible();
  const startedAt = await page.evaluate(
    (key) => JSON.parse(sessionStorage.getItem(key)!).startedAt,
    visitKey,
  );
  await page.locator(".service-chooser--header button").click();
  await expect(
    page.getByRole("navigation", { name: "בחירת שירות Viby" }),
  ).toBeVisible();
  await page
    .locator(".service-chooser-card")
    .filter({ hasText: "גלגל חכם" })
    .click();
  await expect(page).toHaveURL(/smart-wheel/);
  await expect(trigger(page)).toBeVisible();
  expect(
    await page.evaluate(
      (key) => JSON.parse(sessionStorage.getItem(key)!).startedAt,
      visitKey,
    ),
  ).toBe(startedAt);
  expect(await events(page, "whatsapp_widget_shown")).toHaveLength(1);
  expect((await events(page, "service_selected"))[0][2]).toMatchObject({
    previous_service: "punch-card",
    next_service: "smart-wheel",
    chooser_placement: "header",
  });
  await expect
    .poll(async () => (await events(page, "view_item")).length)
    .toBe(2);
  expect((await events(page, "view_item"))[1][2]).toMatchObject({
    items: [{ item_id: "smart-wheel" }],
  });
  expect(
    await page.evaluate(
      () =>
        (window.dataLayer ?? []).filter(
          (item) => (item as ArrayLike<unknown>)[0] === "config",
        ).length,
    ),
  ).toBe(1);
});

test("consent gates events; current exposure is measured once after consent", async ({
  page,
}) => {
  await initialize(page, null, 60000);
  await page.goto("/");
  await expect(trigger(page)).toBeVisible();
  await trigger(page).click();
  expect(await events(page, "whatsapp_preview_opened")).toHaveLength(0);
  await page.getByRole("button", { name: "אישור מדידה", exact: true }).click();
  await expect
    .poll(async () => (await events(page, "whatsapp_widget_shown")).length)
    .toBe(1);
  expect(await events(page, "whatsapp_preview_opened")).toHaveLength(0);
  // Granting consent is an outside click and dismisses the preview.
  await expect(preview(page)).toHaveCount(0);
  await trigger(page).click();
  expect(await events(page, "whatsapp_preview_opened")).toHaveLength(1);
});

test("CTA uses prefilled destination and one sanitized sales click", async ({
  page,
}) => {
  await initialize(page, "granted", 5000);
  await page.goto("/support");
  await trigger(page).click();
  const link = page.locator(".whatsapp-chat-link");
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.pathname).toBe("/972509565137");
  expect(url.searchParams.get("text")).toBe("היי, אשמח לשמוע עוד על Viby");
  await link.evaluate((el) =>
    el.addEventListener("click", (event) => event.preventDefault()),
  );
  await link.click();
  const clicks = await events(page, "click_whatsapp");
  expect(clicks).toHaveLength(1);
  expect(clicks[0][2]).toMatchObject({
    cta_location: "whatsapp_widget",
    contact_type: "sales",
    page_path: "/support",
  });
  expect(JSON.stringify(clicks)).not.toMatch(/972509565137|אשמח|link_url/);
});

test("blocked storage and throwing analytics do not break navigation or widget", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("blocked");
      },
    });
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new Error("blocked");
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "אישור מדידה", exact: true }).click();
  await expect(page.locator(".analytics-consent")).toHaveCount(0);
  await page.evaluate(() => {
    window.gtag = () => {
      throw new Error("tracking failed");
    };
  });
  await expect(trigger(page)).toBeVisible({ timeout: 6000 });
  await trigger(page).click();
  await expect(preview(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await page.locator(".service-chooser--header button").click();
  await page
    .locator(".service-chooser-card")
    .filter({ hasText: "Viby UP" })
    .click();
  await expect(page).toHaveURL(/viby-up/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "ה־AI שעובד בשביל העסק גם אחרי שהלקוח יוצא.",
  );
});

test("mobile chooser has six accessible destinations and no widget", async ({
  page,
}) => {
  await initialize(page, "granted", 60000);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/viby-up");
  await expect(trigger(page)).toHaveCount(0);
  await page.locator(".service-chooser--header button").click();
  await expect(page.locator(".service-chooser-card")).toHaveCount(6);
  await expect(
    page.locator('.service-chooser-card[aria-current="page"]'),
  ).toBeFocused();
  expect(
    await page
      .locator(".service-chooser-grid")
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      ),
  ).toBe(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.locator(".service-chooser--header button")).toBeFocused();
  await expect(page.locator(".service-chooser-panel")).toHaveCount(0);
  await expect(page.getByText("כניסת עסקים", { exact: true })).toHaveCount(0);
});

test("denied analytics still allows widget interaction without events", async ({
  page,
}) => {
  await initialize(page, "denied", 60000);
  await page.goto("/privacy");
  await trigger(page).click();
  await expect(preview(page)).toBeVisible();
  expect(await events(page, "whatsapp_widget_shown")).toHaveLength(0);
  expect(await events(page, "whatsapp_preview_opened")).toHaveLength(0);
});

test("preview stays above consent banner and inside a short desktop viewport", async ({
  page,
}) => {
  await initialize(page, null, 60000);
  await page.setViewportSize({ width: 1024, height: 600 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".analytics-consent")).toBeVisible();
  await trigger(page).click();
  const banner = (await page.locator(".analytics-consent").boundingBox())!;
  const panel = (await preview(page).boundingBox())!;
  const icon = (await trigger(page).boundingBox())!;
  expect(panel.y).toBeGreaterThanOrEqual(0);
  expect(icon.y + icon.height).toBeLessThan(banner.y);
  expect(panel.y + panel.height).toBeLessThan(banner.y);
  expect(
    await preview(page).evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("WhatsApp toggles closed and dismisses outside without replaying open events", async ({
  page,
}) => {
  await initialize(page, "granted", 60000);
  await page.goto("/");
  await trigger(page).click();
  await expect(preview(page)).toBeVisible();
  await page.locator(".whatsapp-message").click();
  await expect(preview(page)).toBeVisible();
  await trigger(page).click();
  await expect(preview(page)).toHaveCount(0);
  expect(await events(page, "whatsapp_preview_opened")).toHaveLength(1);
  await trigger(page).click();
  await expect(preview(page)).toBeVisible();
  await page.locator("h1").click();
  await expect(preview(page)).toHaveCount(0);
  await trigger(page).click();
  await expect(preview(page)).toBeVisible();
  expect(await events(page, "whatsapp_preview_opened")).toHaveLength(3);
  await page.keyboard.press("Escape");
  await expect(trigger(page)).toBeFocused();
  await expect(page.locator(".whatsapp-unread")).toHaveCount(0);
});

test("mobile headers keep the logo, chooser, and positioning message separate", async ({
  page,
}) => {
  await initialize(page, "denied");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1023]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/viby-tap", "/viby-up"]) {
      await page.goto(path);
      const logo = (await page
        .locator(".v2-brand-row > a, .up-header > a")
        .boundingBox())!;
      const chooser = (await page
        .locator(".service-chooser--header")
        .boundingBox())!;
      expect(chooser.x + chooser.width).toBeLessThanOrEqual(logo.x);
      expect(
        Math.abs(logo.y + logo.height / 2 - chooser.y - chooser.height / 2),
      ).toBeLessThan(2);
      expect(chooser.x).toBeGreaterThanOrEqual(0);
      expect(chooser.x + chooser.width).toBeLessThanOrEqual(width);
      if (path !== "/viby-up") {
        const message = (await page.locator(".v2-company-line").boundingBox())!;
        expect(message.y).toBeGreaterThanOrEqual(chooser.y + chooser.height);
        expect(message.y - chooser.y - chooser.height).toBeLessThanOrEqual(22);
        expect(
          Math.abs(message.x + message.width / 2 - width / 2),
        ).toBeLessThan(2);
      }
    }
  }
});
