import { expect, test, type Page } from "@playwright/test";

const routes = [
  {
    path: "/",
    heading: "עסקים אמיתיים. לקוחות שחוזרים.",
    intro: "כרטיסייה דיגיטלית הופכת כל ביקור לעוד צעד בקשר עם הלקוחות.",
  },
  {
    path: "/smart-wheel",
    heading: "הופכים כל ביקור להזדמנות לחזור",
    intro: "רגע של הפתעה והטבה לביקור הבא נותנים ללקוחות עוד סיבה לחזור.",
  },
  {
    path: "/digital-wallet",
    heading: "הלקוחות שלכם. תמיד קרובים.",
    intro: "כרטיסי מתנה ויתרות דיגיטליות שומרים את העסק בהישג יד, בארנק שבטלפון.",
  },
  {
    path: "/viby-rate",
    heading: "לקוחות מרוצים מתחילים בחוויה טובה",
    intro: "דרך פשוטה לשתף ביקורת עוזרת ללקוחות לספר על החוויה שלהם בעסק.",
  },
  {
    path: "/viby-tap",
    heading: "חיבור עם הלקוחות מתחיל בסריקה",
    intro: "סריקה אחת מובילה את הלקוחות לפרטים ולקישורים החשובים של העסק.",
  },
  {
    path: "/viby-up",
    heading: "עסקים שצומחים עם Viby",
    intro: "שיחה אישית אחרי הביקור עוזרת להקשיב ללקוחות ולהמשיך את הקשר.",
  },
] as const;

async function setConsent(page: Page, value: "granted" | "denied") {
  await page.addInitScript((consent) => {
    localStorage.setItem("viby-analytics-consent", JSON.stringify({
      version: 1,
      value: consent,
      savedAt: Date.now(),
    }));
  }, value);
}

async function events(page: Page, name: string) {
  return page.evaluate((eventName) =>
    (window.dataLayer ?? [])
      .map((item) => Array.from(item as ArrayLike<unknown>))
      .filter((item) => item[0] === "event" && item[1] === eventName), name);
}

test.beforeEach(async ({ page }) => {
  await page.route("**/googletagmanager.com/**", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "/* isolated analytics */" }));
  await page.route(/google-analytics\.com/, (route) => route.fulfill({ status: 204 }));
});

test("all six routes render one gallery of 13 photographed businesses and preserve each WhatsApp destination", async ({ page }) => {
  await setConsent(page, "denied");
  for (const { path, heading, intro } of routes) {
    await page.goto(path);
    const wall = page.locator(".social-proof");
    await expect(wall).toHaveCount(1);
    await expect(wall.locator(".social-proof-heading h2")).toHaveText(heading);
    await expect(wall.locator(".social-proof-heading p")).toHaveText(intro);
    await expect(wall.locator(".social-proof-gallery .social-proof-card")).toHaveCount(13);
    await expect(wall.locator(".social-proof-card--large")).toHaveCount(4);
    await expect(wall.locator("details, .social-proof-card--logo")).toHaveCount(0);
    await expect(wall.locator(".social-proof-brand img")).toHaveCount(13);
    await expect(wall.locator(".social-proof-brand--wordmark")).toHaveCount(0);
    await expect(wall.locator(".social-proof-card-category")).toHaveCount(13);
    await expect(wall.locator(".social-proof-card-caption p")).toHaveCount(13);
    const names = await wall.locator(".social-proof-card h3").allTextContents();
    expect(new Set(names).size).toBe(13);
    expect(await wall.locator(".social-proof-card--large h3").allTextContents())
      .toEqual(["קפה פריז", "קפה רולנד", "בורקס בבא", "נחת הרצליה"]);
    for (const line of await wall.locator(".social-proof-card-caption p").allTextContents()) {
      expect(line).toContain("Viby");
    }
    const html = await (await page.request.get(path)).text();
    expect(html).toContain(heading);
    expect(html).toContain(intro);
    expect(html).toContain("<h3>קפה רולנד</h3>");
    expect(html).not.toContain("<h3>Oren Or Hairdressing Spa</h3>");
    const wallHref = await wall.locator('[data-analytics-location="social_proof"]').getAttribute("href");
    const heroHref = await page.locator('[data-analytics-location="hero"]').first().getAttribute("href");
    expect(wallHref).toBe(heroHref);
    if (path === "/") {
      await expect(page.locator(".v2-hero .v2-trust")).toHaveCount(1);
    } else {
      await expect(page.locator(".v2-trust")).toHaveCount(0);
    }
    await expect(page.locator("video, .social-proof iframe")).toHaveCount(0);
  }
});

test("renamed business photos resolve as WebP images", async ({ request }) => {
  for (const filename of [
    "mokaya-chocolate-card-800.webp",
    "le-drink-bubble-tea-card-800.webp",
    "freddo-icecream-card-800.webp",
  ]) {
    const response = await request.get(`/social_proof_businesses/${filename}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/webp");
  }
});

for (const [path, productId] of [["/viby-tap", "viby-tap"], ["/viby-up", "viby-up"]] as const) {
  for (const consent of ["granted", "denied"] as const) {
    test(`${path}: wall CTA honors ${consent} consent`, async ({ page }) => {
      await setConsent(page, consent);
      await page.goto(path);
      expect(await events(page, "social_proof_gallery_opened")).toHaveLength(0);

      await page.locator('[data-analytics-location="social_proof"]').evaluate((link) => {
        link.addEventListener("click", (event) => event.preventDefault(), { once: true });
        (link as HTMLAnchorElement).click();
      });
      const clicks = await events(page, "click_whatsapp");
      const intents = await events(page, "contact_intent");
      expect(clicks).toHaveLength(consent === "granted" ? 1 : 0);
      expect(intents).toHaveLength(consent === "granted" ? 1 : 0);
      if (consent === "granted") {
        expect(clicks[0][2]).toMatchObject({
          page_path: path,
          product_id: productId,
          cta_location: "social_proof",
          contact_method: "whatsapp",
        });
      }
    });
  }
}

test("mobile gallery swipes without page overflow and defers offscreen photos", async ({ page }) => {
  await setConsent(page, "denied");
  const imageRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("social_proof_businesses")) imageRequests.push(request.url());
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/viby-tap");
  await page.locator(".social-proof").scrollIntoViewIfNeeded();
  await expect.poll(() => imageRequests.length).toBeGreaterThan(0);
  expect(imageRequests.every((url) => !url.includes("baker-coffee-bakery"))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator(".social-proof-gallery").evaluate((gallery) =>
    getComputedStyle(gallery).scrollSnapType)).toContain("mandatory");
  await page.locator(".social-proof-gallery .social-proof-card").last().scrollIntoViewIfNeeded();
  await expect.poll(() => imageRequests.some((url) => url.includes("noga-flowers"))).toBe(true);
});
