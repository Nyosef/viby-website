import { expect, test } from "@playwright/test";
import { siteConfig } from "../src/lib/site";

const pages = [
  {
    path: "/industries/cafes",
    slug: "cafes",
    h1: "כרטיסיית ניקוב דיגיטלית לבית קפה",
    term: "קפה עשירי במתנה",
  },
  {
    path: "/industries/car-washes",
    slug: "car-washes",
    h1: "כרטיסיית ניקוב דיגיטלית לשטיפת רכב",
    term: "הניקוב נשאר בשליטת הצוות",
  },
  {
    path: "/industries/bakeries",
    slug: "bakeries",
    h1: "כרטיסייה דיגיטלית למאפייה ולקונדיטוריה",
    term: "אחרי 8 קניות — מאפה לבחירה במתנה",
  },
  {
    path: "/industries/hair-salons",
    slug: "hair-salons",
    h1: "כרטיסייה דיגיטלית למספרה ולברברשופ",
    term: "אחרי 5 ביקורים — טיפול שיער במתנה",
  },
] as const;
const englishCafePath = "/en/industries/digital-punch-card-loyalty-cafe-israel-providers-pricing-2026";

for (const industry of pages) {
  test(`${industry.slug} renders crawlable content, contact links, and mobile layout`, async ({ page, request }, testInfo) => {
    await page.addInitScript(() => {
      localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value: "denied", savedAt: Date.now() }));
    });
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await request.get(industry.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(industry.h1);
    expect(html).toContain(`https://joinviby.co.il${industry.path}`);
    expect(html).not.toMatch(/<meta name="robots" content="[^"]*noindex/);

    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(industry.path);
      await expect(page.locator("html")).toHaveAttribute("lang", "he-IL");
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(industry.h1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByText(industry.term, { exact: false }).first()).toBeVisible();
      await expect(page.getByText("דוגמה להמחשה", { exact: true }).first()).toBeVisible();
      if (industry.slug === "bakeries" || industry.slug === "hair-salons") {
        const illustration = page.locator('main img[alt^="המחשה של"]');
        await expect(illustration).toBeVisible();
        expect(await illustration.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      }
      if (width === 390) {
        const firstQuestion = {
          cafes: "איך מנקבים גם כשהדלפק עמוס?",
          "car-washes": "מתי נספרת שטיפה, והאם זו חבילה מראש?",
          bakeries: "איך מצטרפים ומקבלים ניקוב במאפייה?",
          "hair-salons": "מתי נוסף ניקוב ומה קורה בין תספורות?",
        }[industry.slug];
        const questions = [firstQuestion, "כמה סוגי כרטיסיות ניקוב אפשר ליצור?", "איזו תמיכה מקבלים וכמה זמן מתחייבים?", "האם Viby מתאימה גם לעסק קטן מחוץ למרכז?"];
        await expect(page.locator("main details")).toHaveCount(4);
        for (const question of questions) {
          const disclosure = page.locator("main details").filter({ has: page.getByText(question, { exact: true }) });
          await disclosure.locator("summary").click();
          await expect(disclosure.locator("p")).toBeVisible();
          await disclosure.locator("summary").click();
          await expect(disclosure.locator("p")).toBeHidden();
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const location of ["hero", "final_cta"]) {
        const cta = page.locator(`main a[data-analytics-location="${location}"]`);
        await expect(cta).toHaveCount(1);
        const destination = new URL((await cta.getAttribute("href"))!);
        expect(destination.origin).toBe("https://wa.me");
        expect(destination.pathname).toBe(`/${siteConfig.whatsappNumber}`);
      }
      for (const href of ["/", "/terms", "/privacy", "/support"]) {
        await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
      }
      if (width === 390) {
        await page.screenshot({ path: testInfo.outputPath(`${industry.slug}-mobile.png`), fullPage: true });
      }
      if (width === 1440) {
        await page.screenshot({ path: testInfo.outputPath(`${industry.slug}-desktop.png`), fullPage: true });
      }
    }
    expect(pageErrors).toEqual([]);
  });

  for (const consent of ["granted", "denied"] as const) {
    test(`${industry.slug} WhatsApp attribution respects ${consent} consent`, async ({ page }) => {
      await page.addInitScript((value) => {
        localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value, savedAt: Date.now() }));
      }, consent);
      await page.route("**/googletagmanager.com/**", (route) =>
        route.fulfill({ contentType: "application/javascript", body: "/* isolated analytics loader */" }),
      );
      await page.route(/google-analytics\.com/, (route) => route.fulfill({ status: 204 }));
      await page.goto(industry.path);
      const cta = page.locator('main a[data-analytics-location="hero"]');
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
          page_path: industry.path,
        });
        expect(JSON.stringify(clicks[0][2])).not.toContain(siteConfig.whatsappNumber);
      }
    });
  }
}

test("existing commercial pages still load with their original headings", async ({ request }) => {
  for (const [path, heading] of [
    ["/", "כרטיסיות ניקוב דיגיטליות לעסק"],
    ["/smart-wheel", "גלגל מזל דיגיטלי שהופך כל קנייה לסיבה לחזור"],
    ["/digital-wallet", "כרטיס מתנה דיגיטלי לעסק שנשמר ישר בטלפון"],
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    const visibleHeading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    expect(visibleHeading, path).toContain(heading);
  }
});

test("commercial footer groups the industry links and English cafe route", async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value: "denied", savedAt: Date.now() }));
  });
  await page.goto("/");
  const footer = page.locator("footer.v2-footer");
  const solutions = footer.getByRole("navigation", { name: "פתרונות Viby" });
  const industries = footer.getByRole("navigation", { name: "פתרונות לפי סוג העסק" });
  const useful = footer.getByRole("navigation", { name: "קישורים שימושיים" });
  await expect(industries.getByText("פתרונות לפי סוג העסק")).toBeVisible();
  await expect(industries.locator('a[href="/industries/cafes"]')).toHaveCount(1);
  await expect(industries.locator('a[href="/industries/car-washes"]')).toHaveCount(1);
  await expect(industries.locator('a[href="/industries/bakeries"]')).toHaveCount(1);
  await expect(industries.locator('a[href="/industries/hair-salons"]')).toHaveCount(1);
  await expect(industries.locator(`a[href="${englishCafePath}"]`)).toHaveCount(1);
  await expect(solutions.locator('a[href^="/industries/"]')).toHaveCount(0);
  await expect(useful.locator('a[href^="/industries/"]')).toHaveCount(0);
  const desktopColumns = await Promise.all([solutions, industries, useful].map((nav) => nav.boundingBox()));
  expect(desktopColumns.every(Boolean)).toBe(true);
  expect(desktopColumns[0]!.x).toBeGreaterThan(desktopColumns[1]!.x);
  expect(desktopColumns[1]!.x).toBeGreaterThan(desktopColumns[2]!.x);
  expect(Math.abs(desktopColumns[0]!.y - desktopColumns[1]!.y)).toBeLessThan(2);
  await footer.screenshot({ path: testInfo.outputPath("footer-desktop.png") });
  for (const width of [1024, 900, 390]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(industries.getByText("פתרונות לפי סוג העסק")).toBeVisible();
  }
  const mobileRows = await Promise.all([solutions, industries, useful].map((nav) => nav.boundingBox()));
  expect(mobileRows[0]!.y).toBeLessThan(mobileRows[1]!.y);
  expect(mobileRows[1]!.y).toBeLessThan(mobileRows[2]!.y);
});

test("cafe copy keeps pricing and links to its English version", async ({ page, request }) => {
  await page.goto("/industries/cafes");
  await expect(page.getByText("המחיר מתחיל ב־79 ₪ לחודש", { exact: false })).toBeVisible();
  await expect(page.locator('main a[href="/customer-retention#pricing-title"]')).toBeVisible();
  await expect(page.getByText("כרטיסיית ניקוב דיגיטלית בית קפה עסק מערכת ישראל מחירים", { exact: false })).toHaveCount(0);
  await expect(page.locator(`main a[href="${englishCafePath}"]`)).toHaveCount(1);
  const english = await request.get(englishCafePath);
  expect(english.status()).toBe(200);
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(`https://joinviby.co.il${englishCafePath}`);
});

test("English cafe page keeps the long slug with natural copy and mobile layout", async ({ page, request }, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem("viby-analytics-consent", JSON.stringify({ version: 1, value: "denied", savedAt: Date.now() }));
  });
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const response = await request.get(englishCafePath);
  const html = await response.text();
  expect(response.status()).toBe(200);
  expect(html).toContain("Digital punch card loyalty for cafes in Israel: providers and pricing in 2026");
  expect(html).toContain(`https://joinviby.co.il${englishCafePath}`);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(englishCafePath);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("main")).toHaveAttribute("dir", "ltr");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Digital punch card loyalty for cafes in Israel: providers and pricing in 2026");
    const illustration = page.locator('main img[alt^="Illustrative cafe counter"]');
    await expect(illustration).toBeVisible();
    expect(await illustration.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator('main a[href="/industries/cafes"]')).toBeVisible();
    for (const location of ["hero", "final_cta"]) {
      const cta = page.locator(`main a[data-analytics-location="${location}"]`);
      await expect(cta).toHaveCount(1);
      expect(new URL((await cta.getAttribute("href"))!).pathname).toBe(`/${siteConfig.whatsappNumber}`);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`english-cafe-${width}.png`), fullPage: true });
  }
  expect(pageErrors).toEqual([]);
});

test("English cafe consent and privacy controls use English labels", async ({ page }) => {
  await page.goto(englishCafePath);
  const consent = page.getByRole("dialog", { name: "Analytics preferences" });
  await expect(consent).toBeVisible();
  await consent.getByRole("button", { name: "Continue without analytics" }).click();
  await page.getByRole("button", { name: "Privacy settings" }).click();
  const preferences = page.getByRole("dialog", { name: "Privacy preferences" });
  await expect(preferences).toBeVisible();
  await expect(preferences.getByText("Site analytics: off", { exact: false })).toBeVisible();
});
