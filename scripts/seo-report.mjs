import { spawn } from "node:child_process";
import { access } from "node:fs/promises";

const port = 3417;
const canonicalOrigin = "https://joinviby.co.il";
const configuredOrigin = process.env.SEO_REPORT_ORIGIN;
const productionMode = Boolean(configuredOrigin);
const origin = productionMode
  ? validateProductionOrigin(configuredOrigin)
  : `http://127.0.0.1:${port}`;
const routes = [
  "/",
  "/smart-wheel",
  "/digital-wallet",
  "/viby-rate",
  "/viby-tap",
  "/how-it-works",
  "/support",
  "/terms",
  "/privacy",
];
const productExpectations = [
  {
    path: "/",
    label: "כרטיסייה דיגיטלית לעסק",
    title: "כרטיסייה דיגיטלית לעסק | Viby",
    h1: "כרטיסייה דיגיטלית לעסק שגורמת ללקוחות לחזור",
    description:
      "כרטיסייה דיגיטלית לעסק שמחליפה כרטיס ניקוב מנייר, נשמרת ב־Apple Wallet או Google Wallet ועוזרת להחזיר לקוחות — בלי אפליקציה.",
    primaryIntent: "כרטיסייה דיגיטלית לעסק",
    requiredVisibleTerms: [
      "כרטיס ניקוב דיגיטלי",
      "כרטיסיית נאמנות דיגיטלית",
      "כרטיסיית נייר",
    ],
    buyingGuide: {
      definitionHeading: "כרטיסייה דיגיטלית לעסקים עם ביקורים חוזרים",
      price: "החל מ־69 ₪ לחודש",
      operationalTerms: ["הלקוח מצטרף ושומר", "הצוות מנקב ומממש", "בעל העסק מנהל"],
      compatibilityTerms: ["Apple Wallet", "Google Wallet", "בלי להוריד אפליקציית Viby"],
      dataTerm: "נשמרים שם ומספר טלפון",
      comparisonTerm: "כרטיסיית נייר יכולה ללכת לאיבוד",
      faqs: [
        "מה העסק מקבל עם הכרטיסייה הדיגיטלית?",
        "האם הלקוח או הצוות צריכים להוריד אפליקציה?",
        "איך מוסיפים ניקוב ואיך מממשים את ההטבה?",
        "אילו פרטי לקוח נשמרים בכרטיסייה?",
        "מה קורה אם הלקוח מחליף או מאבד את הטלפון?",
        "כמה עולה הכרטיסייה וכמה זמן לוקח להתחיל?",
      ],
    },
    alternateName: "כרטיסיות דיגיטליות",
  },
  {
    path: "/smart-wheel",
    label: "גלגל מזל דיגיטלי לעסקים",
    title: "גלגל מזל דיגיטלי לעסקים | Viby",
    h1: "גלגל מזל דיגיטלי שהופך כל קנייה לסיבה לחזור",
    description:
      "גלגל מזל דיגיטלי לעסקים שמופעל בסריקת QR, מעניק פרסים שהעסק מגדיר והופך כל קנייה לסיבה לחזור בביקור הבא.",
    primaryIntent: "גלגל מזל דיגיטלי לעסקים",
    requiredVisibleTerms: [
      "משחק פרסים לעסק",
      "משחק שיווקי לעסק",
      "גלגל חכם",
      "QR",
    ],
    buyingGuide: {
      definitionHeading: "משחק פרסים דיגיטלי שמחבר בין הקנייה לביקור הבא",
      price: "החל מ־49 ₪ לחודש",
      operationalTerms: ["הלקוח סורק ומשחק", "הצוות מאמת את הפרס", "בעל העסק שולט במשחק"],
      compatibilityTerms: ["נפתח בדפדפן", "אינו צריך להוריד אפליקציית Viby"],
      dataTerm: "הלקוח מזין שם ומספר טלפון",
      comparisonTerm: "הנחה כללית או הגרלה ידנית",
      faqs: [
        "מה מקבלים עם גלגל המזל הדיגיטלי?",
        "איך העסק בוחר פרסים והסתברויות?",
        "איך הצוות מאמת זכייה ומונע מימוש בטעות?",
        "האם הלקוח צריך אפליקציה ואילו פרטים הוא מזין?",
        "אפשר לשנות פרסים או להפעיל גלגל שונה בכל סניף?",
        "כמה עולה הגלגל וכמה זמן לוקח להפעיל אותו?",
      ],
    },
    alternateName: "גלגל חכם",
  },
  {
    path: "/digital-wallet",
    label: "כרטיס מתנה דיגיטלי לעסק",
    title: "כרטיס מתנה דיגיטלי לעסק | Viby",
    h1: "כרטיס מתנה דיגיטלי לעסק שנשמר ישר בטלפון",
    description:
      "מערכת כרטיסי מתנה דיגיטליים לעסק: מוכרים מתנה או יתרה עם בונוס, ושומרים את הכרטיס ב־Apple Wallet או Google Wallet — בלי אפליקציה.",
    primaryIntent: "כרטיס מתנה דיגיטלי לעסק",
    requiredVisibleTerms: [
      "מערכת כרטיסי מתנה לעסק",
      "יתרה עם בונוס",
      "Apple Wallet",
      "Google Wallet",
    ],
    buyingGuide: {
      definitionHeading: "מערכת למכירת מתנות ויתרה דיגיטלית לעסק",
      price: "החל מ־49 ₪ לחודש",
      operationalTerms: ["הלקוח קונה ושומר", "הצוות בודק ומממש", "בעל העסק מגדיר"],
      compatibilityTerms: ["Apple Pay", "Google Pay", "Apple Wallet", "Google Wallet"],
      dataTerm: "נשמרים שם ומספר טלפון",
      comparisonTerm: "שובר מודפס או יתרה שנרשמת ידנית",
      faqs: [
        "אפשר לקנות את כרטיס המתנה למישהו אחר וגם לעצמי?",
        "מה העסק מקבל עם מערכת כרטיסי המתנה?",
        "איך משלמים ואיפה הכרטיס נשמר?",
        "איך הצוות בודק ומעדכן את היתרה במימוש?",
        "מה קורה במקרה של טלפון חדש או מימוש שגוי?",
        "כמה עולה המערכת וכמה זמן לוקח להתחיל?",
      ],
    },
    alternateName: "ארנק דיגיטלי",
  },
  {
    path: "/viby-rate",
    label: "כרטיס NFC לביקורות גוגל",
    title: "כרטיס NFC לביקורות גוגל לעסק | Viby",
    h1: "כרטיס NFC לביקורות גוגל — טאפ אחד והלקוח מדרג",
    description:
      "כרטיס NFC לביקורות גוגל שמוביל לקוחות ישירות לעמוד הדירוג של העסק ומקצר את הדרך לביקורת אמיתית — בלי חיפוש ובלי הקלדה.",
    primaryIntent: "כרטיס NFC לביקורות גוגל",
    requiredVisibleTerms: [
      "שלט NFC לביקורות גוגל",
      "כרטיס ביקורות גוגל לעסק",
      "Google Reviews",
    ],
    buyingGuide: {
      definitionHeading: "כרטיס או שלט NFC שמקצר את הדרך לביקורת אמיתית",
      price: "מתחילה ב־49 ₪ לחודש",
      operationalTerms: ["הלקוח מצמיד או סורק", "הצוות מזמין לביקורת", "בעל העסק מאשר את היעד"],
      compatibilityTerms: ["NFC עובד בטלפון תואם", "QR משמש חלופה", "בסוללה או בטעינה"],
      dataTerm: "אינו נדרש להירשם ל־Viby",
      comparisonTerm: "לחפש את העסק ידנית",
      faqs: [
        "מה מקבלים בהזמנה של VibyRate?",
        "האם הכרטיס עובד גם ב־NFC וגם ב־QR?",
        "האם צריך אפליקציה, סוללה או טעינה?",
        "האם VibyRate מבטיח ביקורות או דירוג גבוה יותר?",
        "אפשר לשנות את קישור הביקורות או להזמין לכמה סניפים?",
        "כמה עולה VibyRate ומתי הוא מוכן לשימוש?",
      ],
    },
    alternateName: "VibyRate",
  },
  {
    path: "/viby-tap",
    label: "שלט NFC ועמוד קישורים לעסק",
    title: "שלט NFC ועמוד קישורים לעסק | Viby",
    h1: "שלט NFC לעסק שמרכז את כל הקישורים במקום אחד",
    description:
      "שלט NFC לעסק עם QR שפותח עמוד קישורים ממותג לביקורות גוגל, Instagram, WhatsApp, Waze ואתר העסק — בעמוד אחד שניתן לעדכן.",
    primaryIntent: "שלט NFC לעסק",
    requiredVisibleTerms: ["עמוד קישורים לעסק", "מדבקת NFC לעסק", "QR לעסק"],
    disallowedVisibleTerms: ["כרטיס ביקור דיגיטלי"],
    buyingGuide: {
      definitionHeading: "שלט NFC ועמוד קישורים שמחברים את העסק לטלפון",
      price: "מתחיל ב־49 ₪ לחודש",
      operationalTerms: ["הלקוח מצמיד ובוחר", "הצוות רק מציג את השלט", "בעל העסק שולט בתוכן"],
      compatibilityTerms: ["NFC עובד בטלפון תואם", "QR נפתח באמצעות המצלמה", "אינו צריך להוריד אפליקציית Viby"],
      dataTerm: "אין צורך להירשם ל־Viby",
      comparisonTerm: "QR סטטי פותח בדרך כלל יעד קבוע אחד",
      faqs: [
        "מה העסק מקבל עם VibyTap?",
        "אילו קישורים אפשר להציג בעמוד?",
        "אפשר לשנות קישורים אחרי שהשלט כבר הודפס?",
        "איך VibyTap עובד בעסק עם כמה סניפים?",
        "האם צריך NFC או שאפשר להשתמש גם ב־QR?",
        "כמה עולה VibyTap וכמה זמן לוקח להקים ולקבל אותו?",
      ],
    },
    alternateName: "VibyTap",
  },
];
const productLinks = productExpectations.map(({ path, label }) => ({ path, label }));
const productRoutes = new Set(productLinks.map((product) => product.path));
const productExpectationByPath = new Map(
  productExpectations.map((product) => [product.path, product]),
);
const guidedSetupPromise =
  "לאחר שקיבלנו את פרטי העסק, הלוגו וההגדרות הנדרשות, Viby מלווה את ההקמה ומעלה את המוצר הדיגיטלי לאוויר עד יום העסקים הבא.";
const commercialLastModified = "2026-08-16";
const analyticsLocations = new Set([
  "header",
  "hero",
  "price_strip",
  "mid_page_cta",
  "final_cta",
  "footer",
  "buying_guide",
  "support_page",
  "how_it_works",
  "punch_card_lead_form",
]);
const errors = [];

function validateProductionOrigin(value) {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    (url.pathname !== "/" && url.pathname !== "")
  ) {
    throw new Error(
      "SEO_REPORT_ORIGIN must be an HTTPS origin without credentials, path, query, or fragment.",
    );
  }
  return url.origin;
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function matches(html, expression) {
  return [...html.matchAll(expression)];
}

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalizeText(value) {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

function includesIgnoringWhitespace(value, expected) {
  return value.replace(/\s+/g, "").includes(expected.replace(/\s+/g, ""));
}

function textContent(html) {
  return normalizeText(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function expectedCanonical(pathname) {
  return `${canonicalOrigin}${pathname === "/" ? "" : pathname}`;
}

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("Timed out waiting for the local production server.");
}

async function checkPage(pathname, titles) {
  const response = await fetch(`${origin}${pathname}`);
  const html = await response.text();
  assert(response.status === 200, `${pathname}: expected 200, got ${response.status}`);
  assert(/<html[^>]+lang="he-IL"[^>]+dir="rtl"/.test(html), `${pathname}: missing he-IL RTL document language`);

  const titleTags = matches(html, /<title>([^<]+)<\/title>/g);
  const descriptions = matches(html, /<meta name="description" content="([^"]+)"\s*\/>/g);
  const canonicals = matches(html, /<link rel="canonical" href="([^"]+)"\s*\/>/g);
  const headings = matches(html, /<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/g);
  const jsonLd = matches(html, /<script type="application\/ld\+json">([^<]+)<\/script>/g);
  const parsedJsonLd = [];

  assert(titleTags.length === 1, `${pathname}: expected one title, got ${titleTags.length}`);
  assert(descriptions.length === 1, `${pathname}: expected one description, got ${descriptions.length}`);
  assert(canonicals.length === 1, `${pathname}: expected one canonical, got ${canonicals.length}`);
  assert(canonicals[0]?.[1] === expectedCanonical(pathname), `${pathname}: canonical is ${canonicals[0]?.[1] ?? "missing"}`);
  assert(headings.length === 1, `${pathname}: expected one H1, got ${headings.length}`);
  assert(jsonLd.length >= 1, `${pathname}: missing structured data`);
  const contactAnchors = matches(
    html,
    /<a\b[^>]*href="(?:https:\/\/wa\.me\/[^\"]+|tel:[^\"]+)"[^>]*>/g,
  );
  for (const [contactAnchor] of contactAnchors) {
    const location = contactAnchor.match(/data-analytics-location="([^"]+)"/)?.[1];
    assert(
      Boolean(location) && analyticsLocations.has(location),
      `${pathname}: contact link has missing or invalid analytics location`,
    );
  }

  for (const script of jsonLd) {
    try {
      parsedJsonLd.push(JSON.parse(script[1]));
    } catch {
      assert(false, `${pathname}: invalid JSON-LD`);
    }
  }

  const title = titleTags[0]?.[1];
  assert(title?.endsWith(" | Viby"), `${pathname}: title must end with | Viby`);
  assert(Boolean(title) && !titles.has(title), `${pathname}: duplicate or missing title ${title ?? ""}`);
  if (title) titles.add(title);
  assert(!html.includes("www.joinviby.co.il"), `${pathname}: contains forbidden www hostname`);
  assert(!html.includes("viby-website.vercel.app"), `${pathname}: contains project alias`);

  if (productRoutes.has(pathname)) {
    const expectation = productExpectationByPath.get(pathname);
    const description = descriptions[0]?.[1];
    const h1 = headings[0] ? textContent(headings[0][1]) : undefined;
    const visibleText = textContent(html);

    assert(title === expectation?.title, `${pathname}: title is ${title ?? "missing"}`);
    assert(
      description === expectation?.description,
      `${pathname}: meta description does not match the approved copy`,
    );
    assert(h1 === expectation?.h1, `${pathname}: H1 is ${h1 ?? "missing"}`);
    assert(
      Boolean(expectation?.primaryIntent) && visibleText.includes(expectation.primaryIntent),
      `${pathname}: primary intent is not visible: ${expectation?.primaryIntent ?? "missing"}`,
    );
    for (const term of expectation?.requiredVisibleTerms ?? []) {
      assert(visibleText.includes(term), `${pathname}: required visible term is missing: ${term}`);
    }
    for (const term of expectation?.disallowedVisibleTerms ?? []) {
      assert(!visibleText.includes(term), `${pathname}: disallowed visible term is present: ${term}`);
    }

    const buyingGuide = expectation?.buyingGuide;
    assert(
      Boolean(buyingGuide?.definitionHeading) && visibleText.includes(buyingGuide.definitionHeading),
      `${pathname}: buying-guide definition heading is missing`,
    );
    assert(visibleText.includes("מה העסק מקבל"), `${pathname}: buying-guide deliverables heading is missing`);
    assert(visibleText.includes("כך עובדים עם המוצר ביום־יום"), `${pathname}: operations heading is missing`);
    assert(visibleText.includes("מחיר, התאמה והקמה"), `${pathname}: purchase-facts heading is missing`);
    assert(visibleText.includes("מה ההבדל מהפתרון הרגיל"), `${pathname}: comparison heading is missing`);
    assert(visibleText.includes(guidedSetupPromise), `${pathname}: guided setup promise is missing`);
    assert(
      includesIgnoringWhitespace(visibleText, buyingGuide?.price ?? ""),
      `${pathname}: approved starting price is missing`,
    );
    assert(
      includesIgnoringWhitespace(visibleText, buyingGuide?.dataTerm ?? ""),
      `${pathname}: approved data statement is missing`,
    );
    assert(visibleText.includes(buyingGuide?.comparisonTerm ?? ""), `${pathname}: comparison alternative is missing`);
    for (const term of buyingGuide?.operationalTerms ?? []) {
      assert(visibleText.includes(term), `${pathname}: operational role is missing: ${term}`);
    }
    for (const term of buyingGuide?.compatibilityTerms ?? []) {
      assert(visibleText.includes(term), `${pathname}: compatibility statement is missing: ${term}`);
    }

    const faqEntries = matches(html, /<details(?:\s[^>]*)?>([\s\S]*?)<\/details>/g);
    assert(faqEntries.length === 6, `${pathname}: expected six visible FAQ entries, got ${faqEntries.length}`);
    const faqQuestions = faqEntries.map((entry) => {
      const summary = entry[1].match(/<summary(?:\s[^>]*)?>([\s\S]*?)<\/summary>/);
      return summary ? textContent(summary[1]) : "";
    });
    for (const question of buyingGuide?.faqs ?? []) {
      assert(faqQuestions.includes(question), `${pathname}: FAQ question is missing: ${question}`);
      const faqEntry = faqEntries.find((entry) => {
        const summary = entry[1].match(/<summary(?:\s[^>]*)?>([\s\S]*?)<\/summary>/);
        return summary ? textContent(summary[1]) === question : false;
      });
      const answer = faqEntry?.[1].match(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/);
      assert(Boolean(answer && textContent(answer[1]).length > 20), `${pathname}: FAQ answer is empty: ${question}`);
    }

    assert(/<a\b[^>]*href="\/privacy"[^>]*>/.test(html), `${pathname}: buying content must link to privacy`);
    if (pathname !== "/viby-tap") {
      assert(/<a\b[^>]*href="\/support"[^>]*>/.test(html), `${pathname}: buying content must link to support`);
    }
    if (pathname === "/viby-rate" || pathname === "/viby-tap") {
      assert(
        visibleText.includes("זמן הייצור והמשלוח") && visibleText.includes("מאושר בנפרד"),
        `${pathname}: physical production and delivery must be separated from digital setup`,
      );
    }
    if (pathname === "/viby-rate") {
      assert(visibleText.includes("בלי תמריץ, בלי סינון"), `${pathname}: honest-review safeguard is missing`);
    }

    const structuredNodes = parsedJsonLd.flatMap((document) =>
      Array.isArray(document?.["@graph"]) ? document["@graph"] : [document],
    );
    assert(
      !structuredNodes.some((node) => node?.["@type"] === "FAQPage"),
      `${pathname}: product pages must not add FAQPage structured data`,
    );
    const serviceNode = structuredNodes.find((node) => node?.["@type"] === "Service");
    assert(Boolean(serviceNode), `${pathname}: missing Service structured data`);
    assert(serviceNode?.name === expectation?.title.replace(/ \| Viby$/, ""), `${pathname}: wrong Service schema name`);
    assert(serviceNode?.alternateName === expectation?.alternateName, `${pathname}: wrong Service schema alternateName`);
    assert(serviceNode?.description === expectation?.description, `${pathname}: wrong Service schema description`);
    assert(serviceNode?.url === expectedCanonical(pathname), `${pathname}: wrong Service schema URL`);
    assert(serviceNode?.inLanguage === "he-IL", `${pathname}: wrong Service schema language`);

    for (const product of productLinks) {
      const href = product.path;
      const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const escapedLabel = product.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const linkedLabel = new RegExp(
        `<a\\b[^>]*href="${escapedHref}"[^>]*>[\\s\\S]*?${escapedLabel}[\\s\\S]*?<\\/a>`,
      );
      assert(
        linkedLabel.test(html),
        `${pathname}: missing crawlable product link ${href} with label ${product.label}`,
      );
    }

    assert(
      /<a\b[^>]*href="\/how-it-works"[^>]*>/.test(html),
      `${pathname}: missing crawlable /how-it-works link`,
    );
    assert(
      !/href="[^"]*\?[^"#]*service=/.test(html),
      `${pathname}: contains legacy product service query link`,
    );

    if (pathname === "/") {
      const itemList = structuredNodes.find((node) => node?.["@type"] === "ItemList");
      assert(Boolean(itemList), "/: missing product ItemList structured data");
      for (const product of productExpectations) {
        const item = itemList?.itemListElement?.find(
          (entry) => entry?.url === expectedCanonical(product.path),
        );
        assert(item?.name === product.label, `/: wrong ItemList name for ${product.path}`);
        assert(item?.description === product.description, `/: wrong ItemList description for ${product.path}`);
      }
    }
  }

  const internalLinks = matches(html, /href="(\/(?!\/)[^"#?]*)[^\"]*"/g)
    .map((match) => match[1])
    .filter((href) => !href.startsWith("/api/"));
  for (const href of new Set(internalLinks)) {
    const linked = await fetch(`${origin}${href}`, { redirect: "manual" });
    assert(linked.status < 400, `${pathname}: broken internal link ${href} (${linked.status})`);
    if (productRoutes.has(pathname) && productRoutes.has(href)) {
      assert(linked.status === 200, `${pathname}: product link ${href} must resolve directly with 200, got ${linked.status}`);
    }
  }
}

async function checkRedirect(url, expectedPath, host = "joinviby.co.il") {
  const requestOrigin = productionMode && host !== new URL(origin).hostname
    ? `https://${host}`
    : origin;
  const headers = productionMode
    ? undefined
    : { "x-forwarded-host": host, "x-forwarded-proto": "https" };
  const response = await fetch(`${requestOrigin}${url}`, {
    redirect: "manual",
    headers,
  });
  assert(response.status === 308, `${url} on ${host}: expected 308, got ${response.status}`);
  const location = response.headers.get("location");
  const absoluteLocation = location ? new URL(location, canonicalOrigin).href : null;
  assert(absoluteLocation === `${canonicalOrigin}${expectedPath}`, `${url} on ${host}: redirect is ${location}`);
}

async function run() {
  let server;
  let serverOutput = "";

  if (!productionMode) {
    await access(".next/BUILD_ID");
    server = spawn("npm", ["run", "start", "--", "-p", String(port)], {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORT: String(port) },
    });
    server.stdout.on("data", (chunk) => { serverOutput += chunk; });
    server.stderr.on("data", (chunk) => { serverOutput += chunk; });
  }

  try {
    if (!productionMode) await waitForServer();
    const titles = new Set();
    for (const route of routes) await checkPage(route, titles);

    const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
    for (const route of routes) {
      assert(sitemap.includes(`<loc>${expectedCanonical(route)}</loc>`), `sitemap: missing ${route}`);
    }
    const sitemapEntries = matches(sitemap, /<url>([\s\S]*?)<\/url>/g).map((match) => match[1]);
    for (const route of routes) {
      const canonical = expectedCanonical(route);
      const entry = sitemapEntries.find((candidate) => candidate.includes(`<loc>${canonical}</loc>`));
      const lastModified = entry?.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
      if (productRoutes.has(route)) {
        assert(
          lastModified === commercialLastModified,
          `sitemap: ${route} lastmod is ${lastModified ?? "missing"}`,
        );
      } else {
        assert(!lastModified, `sitemap: ${route} has a fabricated lastmod`);
      }
      if (lastModified) {
        assert(/^\d{4}-\d{2}-\d{2}$/.test(lastModified), `sitemap: ${route} lastmod is not ISO date-only`);
        assert(
          Date.parse(`${lastModified}T00:00:00Z`) <= Date.now(),
          `sitemap: ${route} lastmod is in the future`,
        );
      }
    }

    const robots = await (await fetch(`${origin}/robots.txt`)).text();
    assert(robots.includes("Disallow: /api/"), "robots: /api/ is not disallowed");
    assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), "robots: wrong sitemap origin");

    await checkRedirect("/?service=punch-card&utm_source=test", "/?utm_source=test");
    await checkRedirect("/?service=smart-wheel&utm_source=test", "/smart-wheel?utm_source=test");
    await checkRedirect("/support?utm_source=test", "/support?utm_source=test", "www.joinviby.co.il");
    await checkRedirect("/viby-rate", "/viby-rate", "viby-website.vercel.app");

    const preview = productionMode
      ? await fetch("https://viby-website.vercel.app/support", { redirect: "manual" })
      : await fetch(`${origin}/support`, {
          headers: { "x-forwarded-host": "viby-git-test-team.vercel.app" },
        });
    const previewNoindex = preview.headers.get("x-robots-tag")?.includes("noindex");
    const previewCanonicalRedirect = productionMode
      && [307, 308].includes(preview.status)
      && preview.headers.get("location")?.startsWith(canonicalOrigin);
    assert(
      previewNoindex || previewCanonicalRedirect,
      "preview: neither noindex nor a canonical-host redirect is active",
    );

    const api = await fetch(`${origin}/api/punch-card-lead`, { method: "GET" });
    assert(api.headers.get("x-robots-tag")?.includes("noindex"), "api: missing X-Robots-Tag noindex");

    const missing = await fetch(`${origin}/missing-seo-page`);
    const missingHtml = await missing.text();
    assert(missing.status === 404, `404: expected 404, got ${missing.status}`);
    assert(/name="robots" content="noindex, nofollow"/.test(missingHtml), "404: missing noindex, nofollow");
  } finally {
    server?.kill("SIGTERM");
  }

  if (errors.length > 0) {
    console.error(`SEO audit failed with ${errors.length} issue(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`SEO audit passed against ${origin}: ${routes.length} canonical routes, redirects, robots, sitemap, schema, and 404 behavior verified.`);
  }

  if (errors.length > 0 && serverOutput) console.error(serverOutput);
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
