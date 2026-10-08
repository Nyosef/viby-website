import { expect, test, type Page } from "@playwright/test";

async function storeChoice(page: Page, value: "granted" | "denied" = "denied") {
  await page.addInitScript((value) => localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value, savedAt: Date.now() })), value);
}

async function analyticsEvents(page: Page) {
  return page.evaluate(() => (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>)).filter((args) => args[0] === "event"));
}

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, (route) => route.fulfill({ contentType: "application/javascript", body: "/* external measurement isolated */" }));
});

for (const [path, total] of [["/", "237"], ["/smart-wheel", "147"], ["/digital-wallet", "147"], ["/viby-rate", "147"], ["/viby-tap", "147"], ["/viby-up", null]] as const) {
  test(`${path}: minimum, VAT, sign and delivery agree`, async ({ page }) => {
    await storeChoice(page);
    await page.goto(path);
    const disclosure = page.locator(path === "/viby-up" ? ".up-hero .commercial-disclosure" : ".v2-price-strip .commercial-disclosure");
    await expect(disclosure).toContainText("3 חודשים");
    await expect(disclosure).toContainText("לא נגבה מע״מ");
    await expect(disclosure).toContainText("משלוח בתשלום נפרד");
    if (total) await expect(disclosure).toContainText(`${total} ₪`);
    else await expect(disclosure).toContainText("הצעת מחיר אישית");
    const gift = page.locator(".setup-gift");
    await expect(gift).toContainText("לאחר אימות התשלום");
    await expect(gift).toContainText("שלט ממותג אחד");
    await expect(gift).toContainText("ייצור השלט והמשלוח מתואמים בנפרד");
    await expect(page.getByText("עד יום העסקים הבא", { exact: false })).toHaveCount(0);
    await expect(page.getByText(/העלות הפיזית נסגרים|והעלות נסגרים לפני הייצור/)).toHaveCount(0);
    await page.setViewportSize({ width: 375, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (path === "/") {
      await disclosure.scrollIntoViewIfNeeded();
      await expect.poll(() => page.locator(".v2-price-strip-inner").evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
      await disclosure.locator("..").screenshot({ path: "/tmp/viby-price-mobile.png" });
      await gift.screenshot({ path: "/tmp/viby-gift-mobile.png" });
    }
  });
}

test("lead submission requests a callback without accepting a subscription or sending real notifications", async ({ page }) => {
  await storeChoice(page);
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/punch-card-lead", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/");
  const section = page.locator(".v2-punch-lead");
  await expect(section).toContainText("שליחת הטופס אינה הזמנת מנוי ואינה יוצרת חיוב");
  await expect(section.locator("input[type=checkbox]")).toHaveCount(0);
  await expect(section.locator('img[src*="wikimedia"]')).toHaveCount(0);
  await section.getByRole("textbox", { name: "שם", exact: true }).fill("בדיקת אתר");
  await section.getByRole("textbox", { name: "טלפון", exact: true }).fill("0500000000");
  await section.getByRole("button", { name: "אני רוצה קישור לתשלום מאובטח" }).click();
  await expect(section.getByRole("status")).toContainText("פנייתכם התקבלה");
  expect(payload).toMatchObject({ name: "בדיקת אתר", phone: "0500000000" });
  expect(payload).not.toHaveProperty("termsAccepted");
  expect(payload).not.toHaveProperty("orderId");
});

for (const path of ["/", "/how-it-works"]) {
  test(`${path}: Vimeo waits for a separate click even with analytics approved`, async ({ page }) => {
    await storeChoice(page, "granted");
    const requests: string[] = [];
    page.on("request", (request) => { if (/vimeo|vimeocdn|wikimedia/.test(request.url())) requests.push(request.url()); });
    await page.route("https://player.vimeo.com/**", (route) => route.fulfill({ contentType: "text/html", body: "<html><body>Video test</body></html>" }));
    await page.goto(path);
    await expect(page.locator('iframe[src*="vimeo"]')).toHaveCount(0);
    expect(requests).toHaveLength(0);
    await page.locator(".video-consent-preview button").click();
    const player = page.locator('iframe[src*="vimeo"]');
    await expect(player).toHaveAttribute("src", /dnt=1/);
    await expect.poll(() => requests.length).toBe(1);
  });
}

test("analytics refusal, approval and withdrawal persist and suppress events", async ({ page, context }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "המשך ללא מדידה", exact: true }).click();
  expect(await analyticsEvents(page)).toHaveLength(0);
  await expect(page.locator("#viby-ga4-loader")).toHaveCount(0);
  await page.getByRole("button", { name: "העדפות פרטיות", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "העדפות פרטיות", exact: true });
  await panel.getByRole("button", { name: "אישור מדידה", exact: true }).click();
  await expect.poll(async () => (await analyticsEvents(page)).length).toBeGreaterThan(0);
  await context.addCookies([{ name: "_ga", value: "test", url: "http://localhost:3100" }]);
  await page.getByRole("button", { name: "העדפות פרטיות", exact: true }).click();
  await panel.getByRole("button", { name: "הפסקת מדידה", exact: true }).click();
  const eventCount = (await analyticsEvents(page)).length;
  await page.getByRole("button", { name: "העדפות פרטיות", exact: true }).click();
  await expect(panel).toContainText("כבויה");
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("viby-analytics-consent")!))).toMatchObject({ version: 1, value: "denied" });
  expect((await context.cookies()).some((cookie) => cookie.name === "_ga")).toBe(false);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "העדפות פרטיות", exact: true })).toBeFocused();
  expect((await analyticsEvents(page)).length).toBe(eventCount);
  await page.reload();
  await expect(page.locator(".analytics-consent")).toHaveCount(0);
  await expect(page.locator("#viby-ga4-loader")).toHaveCount(0);
  expect(await analyticsEvents(page)).toHaveLength(0);
});

for (const legacy of ["denied", "granted"]) {
  test(`legacy ${legacy}: preserve refusal and re-request outdated permission`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem("viby-analytics-consent", value), legacy);
    await page.goto("/");
    if (legacy === "denied") {
      await expect(page.locator(".analytics-consent")).toHaveCount(0);
      await expect.poll(() => page.evaluate(() => localStorage.getItem("viby-analytics-consent"))).toContain('"value":"denied"');
    } else await expect(page.locator(".analytics-consent")).toBeVisible();
    await expect(page.locator("#viby-ga4-loader")).toHaveCount(0);
  });
}

for (const [label, offset] of [["expired", -181 * 86400000], ["future", 86400000]] as const) {
  test(`${label} choice never authorizes measurement`, async ({ page }) => {
    await page.addInitScript((offset) => localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value: "granted", savedAt: Date.now() + offset })), offset);
    await page.goto("/");
    await expect(page.locator(".analytics-consent")).toBeVisible();
    await expect(page.locator("#viby-ga4-loader")).toHaveCount(0);
  });
}

test("consent remains usable when browser storage is blocked", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } }));
  await page.goto("/");
  await page.getByRole("button", { name: "המשך ללא מדידה", exact: true }).click();
  await expect(page.locator(".analytics-consent")).toHaveCount(0);
  await page.getByRole("button", { name: "העדפות פרטיות", exact: true }).click();
  await page.getByRole("dialog", { name: "העדפות פרטיות", exact: true }).getByRole("button", { name: "אישור מדידה", exact: true }).click();
  await expect.poll(async () => (await analyticsEvents(page)).length).toBeGreaterThan(0);
});

for (const [key, version, oldDate] of [["terms", "2026-07-02", "02.07.2026"], ["privacy", "2026-08-10", "10.08.2026"]] as const) {
  test(`${key}: stable sections, printable text and excluded immutable archive`, async ({ page, request }) => {
    await storeChoice(page);
    await page.goto(`/${key}`);
    await expect(page.locator(".legal-version")).toContainText("2026-10-08");
    await page.locator(`.legal-toc a[href="#${key}-8"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${key}-8$`));
    await expect(page.locator(`#${key}-8`)).toBeVisible();
    await page.setViewportSize({ width: 375, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (key === "terms") await page.locator("#terms-8").screenshot({ path: "/tmp/viby-terms-mobile.png" });
    await page.evaluate(() => { window.print = () => { document.body.dataset.printRequested = "true"; }; });
    await page.getByRole("button", { name: "הדפסה / שמירה כ־PDF" }).click();
    await expect(page.locator("body")).toHaveAttribute("data-print-requested", "true");
    await page.emulateMedia({ media: "print" });
    await expect(page.locator(".site-header")).toBeHidden();
    await expect(page.locator(".legal-toc")).toBeHidden();
    await expect(page.locator(".privacy-preferences-toggle")).toBeHidden();
    await expect(page.locator(".legal-document")).toBeVisible();
    await page.emulateMedia({ media: "screen" });
    const response = await page.goto(`/${key}/versions/${version}`);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(page.locator(".legal-hero")).toContainText(oldDate);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain("/versions/");
    expect((await request.get(`/${key}/versions/unknown`)).status()).toBe(404);
  });
}

test("UP demo keeps the original opening and happy path, with the revised attention reply and ticket cue", async ({ page }) => {
  await storeChoice(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/viby-up");
  await expect(page.locator(".up-review-link")).toBeVisible();
  await expect(page.locator(".up-ticket-opened")).toHaveCount(0);
  await page.getByRole("button", { name: "צריך תשומת לב" }).click();
  await expect(page.locator(".up-review-link")).toHaveCount(0);
  await expect(page.locator(".up-attention-reply")).toContainText("ממש מצטערים על ההמתנה הארוכה. חשוב לנו לכבד את הזמן שלך ולתת לך חוויה טובה יותר.");
  await expect(page.locator(".up-attention-reply")).toContainText("תודה ששיתפת אותנו — המשוב שלך חשוב לנו. נבדוק מה הוביל להמתנה ואיך נוכל להשתפר.");
  await expect(page.locator(".up-ticket-opened")).toBeVisible();
  await expect(page.locator(".up-ticket-opened")).toHaveText("פנייה נפתחה");
  const transcript = page.locator(".up-demo details");
  await transcript.locator("summary").click();
  await expect(transcript.locator("p").filter({ hasText: "היי דנה ☀️ איזה כיף שקפצת לקפה. איך היה אצלנו היום?" })).toHaveCount(2);
  await expect(transcript).toContainText("אם מתאים לך, נשמח שתשתפי את החוויה שלך גם ב־Google. כמה מילים ממך עוזרות לאנשים להכיר אותנו ולעסק שלנו לצמוח 🌱");
  await expect(transcript).toContainText("דנה נהנתה מהקפה, אך ציינה המתנה ארוכה. כדאי לחזור אליה באופן אישי.");
  await expect(transcript).not.toContainText("העוזרת האוטומטית");
  await expect(transcript).not.toContainText("הזמנה ניטרלית");
  await expect(transcript).toContainText("פנייה נפתחה לבעל העסק");
  await page.getByRole("button", { name: "היה מעולה" }).click();
  await expect(page.locator(".up-ticket-opened")).toHaveCount(0);
});

test("an open page stops measurement at the stored expiry", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-10-08T12:00:00Z") });
  await page.addInitScript(() => localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value: "granted", savedAt: Date.now() - 180 * 86400000 + 10_000 })));
  await page.goto("/");
  await expect.poll(async () => (await analyticsEvents(page)).length).toBeGreaterThan(0);
  await page.clock.fastForward(11_000);
  await expect(page.locator(".analytics-consent")).toBeVisible();
  expect(await page.evaluate(() => (window as unknown as Record<string, unknown>)["ga-disable-G-YLFYE45LK7"])).toBe(true);
});

test("malformed storage and cross-tab withdrawal cannot retain an old grant", async ({ page }) => {
  await storeChoice(page, "granted");
  await page.goto("/");
  await expect.poll(async () => (await analyticsEvents(page)).length).toBeGreaterThan(0);
  await page.evaluate(() => {
    localStorage.setItem("viby-analytics-consent", "malformed");
    window.dispatchEvent(new StorageEvent("storage", { key: "viby-analytics-consent", newValue: "malformed" }));
  });
  await expect(page.locator(".analytics-consent")).toBeVisible();
  await page.getByRole("button", { name: "אישור מדידה", exact: true }).click();
  await page.evaluate(() => {
    const value = JSON.stringify({ version: 1, value: "denied", savedAt: Date.now() });
    localStorage.setItem("viby-analytics-consent", value);
    window.dispatchEvent(new StorageEvent("storage", { key: "viby-analytics-consent", newValue: value }));
  });
  await page.getByRole("button", { name: "העדפות פרטיות", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "העדפות פרטיות", exact: true })).toContainText("כבויה");
});

test("watching a video does not grant refused analytics permission", async ({ page }) => {
  await storeChoice(page);
  await page.route("https://player.vimeo.com/**", (route) => route.fulfill({ contentType: "text/html", body: "<html><body>Video test</body></html>" }));
  await page.goto("/how-it-works");
  await page.locator(".video-consent-preview button").click();
  await expect(page.locator('iframe[src*="vimeo"]')).toBeVisible();
  await expect(page.locator("#viby-ga4-loader")).toHaveCount(0);
  expect(await analyticsEvents(page)).toHaveLength(0);
});
