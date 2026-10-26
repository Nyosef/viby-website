import { spawn } from "node:child_process";
import { access } from "node:fs/promises";

const port = 3417;
const canonicalOrigin = "https://joinviby.co.il";
const instagramUrl = "https://www.instagram.com/viby.il/";
const linkedinUrl = "https://www.linkedin.com/company/vibyil/";
const organizationLogoUrl = `${canonicalOrigin}/icon.png`;
const englishCafePath = "/en/industries/digital-punch-card-loyalty-cafe-israel-providers-pricing-2026";
const generalFaqQuestions = [
  "איזו תמיכה מקבלים וכמה זמן מתחייבים?",
  "האם Viby מתאימה גם לעסק קטן מחוץ למרכז?",
];
const punchCardTypesQuestion = "כמה סוגי כרטיסיות ניקוב אפשר ליצור?";
const configuredOrigin = process.env.SEO_REPORT_ORIGIN;
const buildDirectory = process.env.NEXT_DIST_DIR || ".next";
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
  "/viby-up",
  "/customer-retention",
  "/industries/cafes",
  englishCafePath,
  "/industries/car-washes",
  "/industries/bakeries",
  "/industries/hair-salons",
  "/about",
  "/how-it-works",
  "/support",
  "/terms",
  "/privacy",
];
const productExpectations = [
  {
    path: "/",
    label: "כרטיסייה דיגיטלית לעסק",
    title: "כרטיסייה דיגיטלית לעסק | וייבי Viby",
    schemaName: "כרטיסייה דיגיטלית לעסק",
    h1: "הלקוחות כבר מגיעים אליכם. תנו להם סיבה לחזור.",
    description:
      "כרטיסייה דיגיטלית לעסק שמחליפה כרטיס ניקוב מנייר, נשמרת ב־Apple Wallet או Google Wallet ועוזרת להחזיר לקוחות — בלי אפליקציה.",
    metadataDescription:
      "וייבי (Viby) מציעה כרטיסייה דיגיטלית לעסק שמחליפה כרטיס ניקוב מנייר, נשמרת ב־Apple Wallet או Google Wallet ועוזרת להחזיר לקוחות — בלי אפליקציה.",
    primaryIntent: "כרטיסייה דיגיטלית לעסק",
    requiredVisibleTerms: [
      "מועדון לקוחות חכם לעסקים",
      "כרטיסיית נאמנות דיגיטלית",
      "כרטיסיית נייר",
    ],
    buyingGuide: {
      definitionHeading: "כרטיסייה דיגיטלית לעסקים עם ביקורים חוזרים",
      price: "החל מ־79 ₪ לחודש",
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
      price: "החל מ־49 ₪ לחודש",
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
      price: "החל מ־49 ₪ לחודש",
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
productLinks.push({ path: "/viby-up", label: "Viby UP — קשרי לקוחות בעזרת AI" });
const productRoutes = new Set(productLinks.map((product) => product.path));
const productExpectationByPath = new Map(
  productExpectations.map((product) => [product.path, product]),
);
const guidedSetupPromise =
  "לאחר קבלת פרטי העסק, ההרשאות והאישורים הנדרשים, Viby מפעילה את השירות הדיגיטלי תוך עד 3 ימי עסקים. ימי עסקים: ראשון–חמישי, למעט חגים בישראל. ייצור השלט והמשלוח מתואמים בנפרד.";
const commercialLastModified = "2026-10-08";
const brandReleaseLastModified = "2026-10-19";
const legalReleaseLastModified = "2026-10-21";
const aboutLastModified = "2026-10-20";
const customerRetentionLastModified = "2026-10-20";
const todayInIsrael = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Jerusalem",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const aboutTitle = "אודות וייבי | Viby";
const aboutDescription =
  "הכירו את וייבי (Viby), מערכת ישראלית שמנגישה טכנולוגיה מתקדמת לעסקים קטנים ובינוניים. כרטיסיות דיגיטליות, גלגל מזל, כרטיסי מתנה, NFC וקשרי לקוחות.";
const customerRetentionTitle = "מועדון לקוחות דיגיטלי לעסקים | וייבי Viby";
const customerRetentionDescription =
  "מועדון לקוחות דיגיטלי לעסקים: השוו בין כרטיסיות ניקוב, פרסים וכרטיסי מתנה. בדקו עלויות, תהליך הקמה והתאמה לעסק עם וייבי (Viby).";
const industryExpectations = new Map([
  ["/industries/cafes", {
    title: "כרטיסיית ניקוב דיגיטלית לבית קפה ולעגלת קפה | Viby",
    description: "כרטיסייה דיגיטלית לבתי קפה ולעגלות קפה. הלקוחות סורקים QR, צוברים ניקובים ושומרים את הכרטיסייה ב־Apple Wallet או Google Wallet. הכירו את Viby.",
    h1: "כרטיסיית ניקוב דיגיטלית לבית קפה",
    terms: ["קפה עשירי במתנה", "גם כשיש תור ליד המכונה", "עובד מורשה", "איך מנקבים גם כשהדלפק עמוס?", "דוגמה להמחשה"],
    photo: "/social_proof_businesses/lihi-coffee-card-800.webp",
  }],
  ["/industries/car-washes", {
    title: "כרטיסיית ניקוב דיגיטלית לשטיפת רכב | Viby",
    description: "כרטיסיית נאמנות דיגיטלית לשטיפת רכב: לקוחות צוברים ניקובים אחרי ביקורים מזכים ושומרים את הכרטיסייה בארנק הדיגיטלי. הכירו את Viby.",
    h1: "כרטיסיית ניקוב דיגיטלית לשטיפת רכב",
    terms: ["שדרוג שירות אחרי 5 שטיפות", "הניקוב נשאר בשליטת הצוות", "חבילת שטיפות שנקנתה מראש", "מתי נספרת שטיפה, והאם זו חבילה מראש?", "דוגמה להמחשה"],
    photo: "/social_proof_businesses/magicwash-carwash-card-800.webp",
  }],
  ["/industries/bakeries", {
    title: "כרטיסייה דיגיטלית למאפייה ולקונדיטוריה | Viby",
    description: "כרטיסיית ניקוב דיגיטלית למאפיות ולקונדיטוריות. לקוחות צוברים ניקובים והטבות בכל קנייה מזכה ושומרים את הכרטיסייה בארנק הדיגיטלי. הכירו את וייבי.",
    h1: "כרטיסייה דיגיטלית למאפייה ולקונדיטוריה",
    terms: ["אחרי 8 קניות — מאפה לבחירה במתנה", "גם כשהדלפק עמוס בבוקר", "עובד מורשה", "איך מצטרפים ומקבלים ניקוב במאפייה?", "כמה סוגי כרטיסיות ניקוב אפשר ליצור?", "דוגמה להמחשה"],
    photo: "/industries/bakery-counter-illustrative.webp",
  }],
  ["/industries/hair-salons", {
    title: "כרטיסייה דיגיטלית למספרה ולברברשופ | Viby",
    description: "כרטיסיית ניקוב דיגיטלית למספרות וברברשופס. לקוחות צוברים ניקובים בביקורים מזכים ושומרים כרטיס נאמנות בארנק הדיגיטלי, בלי להוריד אפליקציה.",
    h1: "כרטיסייה דיגיטלית למספרה ולברברשופ",
    terms: ["אחרי 5 ביקורים — טיפול שיער במתנה", "בין תספורות עשויים לעבור שבועות", "עובד מורשה", "מתי נוסף ניקוב ומה קורה בין תספורות?", "כמה סוגי כרטיסיות ניקוב אפשר ליצור?", "דוגמה להמחשה"],
    photo: "/industries/salon-chair-illustrative.webp",
  }],
]);
const customerRetentionH1 = "מועדון לקוחות דיגיטלי לעסקים: בוחרים את הכלים שמתאימים לעסק שלכם";
const customerRetentionHeadings = [
  "מה זה מועדון לקוחות דיגיטלי?",
  "איזה מודל מועדון לקוחות מתאים לעסק שלכם?",
  "איך זה עובד ביום־יום: לקוח, צוות ובעל העסק",
  "הכלים של וייבי — מה כל אחד עושה ומה לא",
  "דוגמאות להפעלה לפי סוג עסק",
  "כמה עולה מועדון לקוחות דיגיטלי בוייבי?",
  "למי וייבי מתאימה — ומתי צריך פתרון אחר?",
  "שאלות נפוצות על מועדון לקוחות דיגיטלי",
  "בואו נבדוק מה מתאים לעסק שלכם",
];
const aboutSolutions = [
  ["/", "כרטיסיות דיגיטליות"],
  ["/smart-wheel", "גלגל מזל חכם"],
  ["/digital-wallet", "כרטיסי מתנה דיגיטליים"],
  ["/viby-tap", "Viby Tap"],
  ["/viby-rate", "Viby Rate"],
  ["/viby-up", "Viby UP"],
];
const aboutHeadings = [
  "מה זה וייבי?",
  "רצינו להביא לעסקים בישראל משהו אחר.",
  "טכנולוגיה טובה צריכה לעבוד בשבילכם.",
  "הפתרונות של וייבי",
  "אתם מתמקדים בעסק. אנחנו עוזרים בכל השאר.",
  "מאחורי הטכנולוגיה יש אנשים.",
  "יש עם מי לדבר.",
  "רוצים להכניס קצת יותר וייב לעסק?",
];
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
  "whatsapp_widget",
  "social_proof",
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
  if (pathname === englishCafePath) {
    assert(/<main[^>]+lang="en"[^>]+dir="ltr"/.test(html), `${pathname}: missing English LTR page language`);
  } else {
    assert(/<html[^>]+lang="he-IL"[^>]+dir="rtl"/.test(html), `${pathname}: missing he-IL RTL document language`);
  }

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
  const expectedTitleSuffix = ["/", "/customer-retention"].includes(pathname) ? " | וייבי Viby" : " | Viby";
  assert(title?.endsWith(expectedTitleSuffix), `${pathname}: title must end with ${expectedTitleSuffix}`);
  assert(Boolean(title) && !titles.has(title), `${pathname}: duplicate or missing title ${title ?? ""}`);
  if (title) titles.add(title);
  assert(!html.includes("www.joinviby.co.il"), `${pathname}: contains forbidden www hostname`);
  assert(!html.includes("viby-website.vercel.app"), `${pathname}: contains project alias`);

  if (productRoutes.has(pathname)) {
    const nodes = parsedJsonLd.flatMap((document) =>
      Array.isArray(document?.["@graph"]) ? document["@graph"] : [document],
    );
    for (const [type, id] of [
      ["Organization", `${canonicalOrigin}/#organization`],
      ["WebSite", `${canonicalOrigin}/#website`],
    ]) {
      const matching = nodes.filter((node) => node?.["@type"] === type);
      assert(matching.length === 1, `${pathname}: expected exactly one ${type} node, got ${matching.length}`);
      assert(matching[0]?.["@id"] === id, `${pathname}: ${type} @id changed`);
      assert(matching[0]?.name === "Viby", `${pathname}: ${type} name changed`);
      assert(matching[0]?.alternateName === "וייבי", `${pathname}: ${type} Hebrew alternateName missing`);
    }
    const organization = nodes.find((node) => node?.["@type"] === "Organization");
    assert(
      JSON.stringify(organization?.sameAs) === JSON.stringify([instagramUrl, linkedinUrl]),
      `${pathname}: Organization sameAs URLs changed`,
    );
    assert(organization?.logo?.["@type"] === "ImageObject", `${pathname}: missing Organization logo ImageObject`);
    assert(organization?.logo?.url === organizationLogoUrl, `${pathname}: wrong Organization logo URL`);
    const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1] ?? "";
    for (const [url, label] of [[instagramUrl, "Instagram"], [linkedinUrl, "LinkedIn"]]) {
      assert(
        matches(footer, /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)
          .some(([, href, content]) => href === url && textContent(content).includes(label)),
        `${pathname}: missing visible ${label} footer link`,
      );
    }
  }

  if (pathname === "/viby-up") {
    const visible = textContent(html);
    assert(title === "Viby UP — קשרי לקוחות ב־WhatsApp בעזרת AI | Viby", "UP: wrong title");
    assert(textContent((headings[0]?.[1] ?? "").replace(/<\/?bdi\b[^>]*>/g, "")) === "ה־AI שעובד בשביל העסק גם אחרי שהלקוח יוצא.", "UP: wrong H1");
    for (const term of ["ביקורות אמיתיות", "Google Maps", "חיפוש מבוסס AI", "SEO", "הזדמנות להשתפר"]) {
      assert(visible.includes(term), `UP: missing growth messaging ${term}`);
    }
    for (const term of ["וייבי אפ", "AI לעסקים", "המחשה של שיחה אוטומטית", "היה מעולה", "צריך תשומת לב", "חוויה חיובית + בעיית זמן המתנה", "לא רק לדעת מי חזר.", "להבין איך היה לו.", "הצעת מחיר"]) {
      assert(visible.includes(term), `UP: missing visible content ${term}`);
    }
    assert(visible.includes("לקריאת השיחות המלאות"), "UP: missing server-rendered transcript");
    assert(visible.includes(guidedSetupPromise), "UP: approved setup disclosure missing");
    assert(!/החל מ־(?:49|79)/.test(visible), "UP: inherited product price");
    const nodes = parsedJsonLd.flatMap((doc) => doc["@graph"] ?? [doc]);
    const service = nodes.find((node) => node["@type"] === "Service");
    assert(service?.url === expectedCanonical(pathname), "UP: wrong Service URL");
    assert(service?.name === "Viby UP — קשרי לקוחות ב־WhatsApp בעזרת AI", "UP: Service name changed");
    assert(service?.description === "וייבי אפ ממשיכה את הקשר אחרי הביקור: שיחה אישית ב־WhatsApp, הבנת חוויית הלקוח באמצעות AI ועדכון לבעל העסק כשצריך תשומת לב אישית.", "UP: Service description changed");
    assert(service?.alternateName === "Viby UP", "UP: wrong Service name");
    assert(service?.provider?.["@id"] === `${canonicalOrigin}/#organization`, "UP: wrong Organization reference");
    for (const { path, label } of productLinks) {
      assert(html.includes(`href="${path}"`) && visible.includes(label), `UP: missing product link ${path}`);
    }
  }

  if (pathname === "/how-it-works") {
    const video = parsedJsonLd.find((document) => document?.["@type"] === "VideoObject");
    assert(video?.publisher?.logo?.url === organizationLogoUrl, "/how-it-works: wrong publisher logo URL");
  }

  if (industryExpectations.has(pathname)) {
    const expected = industryExpectations.get(pathname);
    const visible = textContent(html);
    assert(title === expected.title, `${pathname}: wrong title`);
    assert(descriptions[0]?.[1] === expected.description, `${pathname}: wrong description`);
    assert(textContent(headings[0]?.[1] ?? "") === expected.h1, `${pathname}: wrong H1`);
    for (const term of expected.terms) {
      assert(visible.includes(term), `${pathname}: missing industry content ${term}`);
    }
    assert(html.includes(encodeURIComponent(expected.photo)), `${pathname}: missing industry photo`);
    assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `${pathname}: robots noindex`);
    const nodes = parsedJsonLd.flatMap((document) => document?.["@graph"] ?? [document]);
    const webpage = nodes.find((node) => node?.["@type"] === "WebPage");
    assert(nodes.length === 1 && webpage?.url === expectedCanonical(pathname), `${pathname}: wrong WebPage schema`);
    assert(webpage?.inLanguage === "he-IL", `${pathname}: wrong WebPage language`);
    assert(webpage?.publisher?.["@id"] === `${canonicalOrigin}/#organization`, `${pathname}: wrong WebPage publisher`);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    const ctas = matches(main, /<a\b[^>]*href="https:\/\/wa\.me\/[^\"]+"[^>]*>/g).map((match) => match[0]);
    for (const location of ["hero", "final_cta"]) {
      assert(ctas.some((cta) => cta.includes(`data-analytics-location="${location}"`)), `${pathname}: missing ${location} WhatsApp CTA`);
    }
    assert(ctas.length === 2, `${pathname}: expected two WhatsApp CTAs, got ${ctas.length}`);
    for (const href of ["/", "/how-it-works", "/support", "/terms", "/privacy"]) {
      assert(main.includes(`href="${href}"`), `${pathname}: missing ${href} link`);
    }
    if (pathname === "/industries/cafes") {
      assert(main.includes(`href="${englishCafePath}"`), `${pathname}: missing English café link`);
      for (const [language, route] of [["en", englishCafePath], ["he-IL", "/industries/cafes"]]) {
        assert(html.includes(`hrefLang="${language}" href="${expectedCanonical(route)}"`), `${pathname}: missing ${language} alternate`);
      }
    }
  }

  if (pathname === englishCafePath) {
    const visible = textContent(html);
    assert(title === "Digital punch card loyalty for cafes in Israel: providers and pricing (2026) | Viby", `${pathname}: wrong title`);
    assert(textContent(headings[0]?.[1] ?? "") === "Digital punch card loyalty for cafes in Israel: providers and pricing in 2026", `${pathname}: wrong H1`);
    for (const term of ["digital punch card", "loyalty", "cafes in Israel", "providers and pricing", "Viby", "Illustrative example"]) {
      assert(visible.toLowerCase().includes(term.toLowerCase()), `${pathname}: missing English content ${term}`);
    }
    assert(html.includes(encodeURIComponent("/industries/cafe-counter-illustrative.webp")), `${pathname}: missing cafe image`);
    const webpage = parsedJsonLd.flatMap((document) => document?.["@graph"] ?? [document]).find((node) => node?.["@type"] === "WebPage");
    assert(webpage?.url === expectedCanonical(pathname) && webpage?.inLanguage === "en", `${pathname}: wrong English WebPage schema`);
    for (const [language, route] of [["en", englishCafePath], ["he-IL", "/industries/cafes"]]) {
      assert(html.includes(`hrefLang="${language}" href="${expectedCanonical(route)}"`), `${pathname}: missing ${language} alternate`);
    }
    for (const href of ["/industries/cafes", "/how-it-works", "/support", "/terms", "/privacy"]) {
      assert(html.includes(`href="${href}"`), `${pathname}: missing ${href} link`);
    }
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    for (const location of ["hero", "final_cta"]) {
      assert(main.includes(`data-analytics-location="${location}"`), `${pathname}: missing ${location} CTA attribution`);
    }
    assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `${pathname}: robots noindex`);
  }

  if (productRoutes.has(pathname) || ["/support", "/customer-retention", ...industryExpectations.keys()].includes(pathname)) {
    const visible = textContent(html);
    for (const question of generalFaqQuestions) {
      assert(visible.includes(question), `${pathname}: missing general FAQ ${question}`);
    }
    if (["/", "/support", "/customer-retention", ...industryExpectations.keys()].includes(pathname)) {
      assert(visible.includes(punchCardTypesQuestion), `${pathname}: missing punch-card FAQ`);
    }
  }

  if (productRoutes.has(pathname) && pathname !== "/viby-up") {
    const expectation = productExpectationByPath.get(pathname);
    const description = descriptions[0]?.[1];
    const h1 = headings[0] ? textContent(headings[0][1].replace(/<\/?span\b[^>]*>/g, "")) : undefined;
    const visibleText = textContent(html);

    assert(title === expectation?.title, `${pathname}: title is ${title ?? "missing"}`);
    assert(
      description === (expectation?.metadataDescription ?? expectation?.description),
      `${pathname}: meta description does not match the approved copy`,
    );
    const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"\s*\/>/)?.[1];
    const ogDescription = html.match(/<meta property="og:description" content="([^"]+)"\s*\/>/)?.[1];
    const twitterTitle = html.match(/<meta name="twitter:title" content="([^"]+)"\s*\/>/)?.[1];
    const twitterDescription = html.match(/<meta name="twitter:description" content="([^"]+)"\s*\/>/)?.[1];
    assert(ogTitle === expectation?.title, `${pathname}: Open Graph title changed unexpectedly`);
    assert(ogDescription === description, `${pathname}: Open Graph description differs from metadata`);
    assert(twitterTitle === expectation?.title, `${pathname}: Twitter title changed unexpectedly`);
    assert(twitterDescription === description, `${pathname}: Twitter description differs from metadata`);
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

    const faqBlock = html.match(/<div\b[^>]*class="[^"]*\bv2-buying-faq-list\b[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
    const faqEntries = matches(faqBlock, /<details(?:\s[^>]*)?>([\s\S]*?)<\/details>/g);
    const expectedFaqCount = (buyingGuide?.faqs.length ?? 0) + 2 + (pathname === "/" ? 1 : 0);
    assert(faqEntries.length === expectedFaqCount, `${pathname}: expected ${expectedFaqCount} visible FAQ entries, got ${faqEntries.length}`);
    const faqQuestions = faqEntries.map((entry) => {
      const summary = entry[1].match(/<summary(?:\s[^>]*)?>([\s\S]*?)<\/summary>/);
      return summary ? textContent(summary[1]) : "";
    });
    for (const question of generalFaqQuestions) {
      assert(faqQuestions.includes(question), `${pathname}: missing shared FAQ ${question}`);
    }
    if (pathname === "/") assert(faqQuestions.includes(punchCardTypesQuestion), "/: missing punch-card types FAQ");
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
    assert(serviceNode?.name === (expectation?.schemaName ?? expectation?.title.replace(/ \| Viby$/, "")), `${pathname}: wrong Service schema name`);
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
      const bodyHtml = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
      const heroHtml = bodyHtml.match(/<div class="v2-hero-copy"[^>]*>([\s\S]*?)<div class="v2-actions"/)?.[1] ?? "";
      const mobileHero = heroHtml.match(/<p class="v2-hero-text v2-mobile-only">([\s\S]*?)<\/p>/)?.[1] ?? "";
      const desktopHero = heroHtml.match(/<p class="v2-hero-text v2-desktop-only">([\s\S]*?)<\/p>/)?.[1] ?? "";
      assert(
        includesIgnoringWhitespace(textContent(mobileHero), "עם וייבי (Viby), הלקוחות מצטרפים בסריקה, צוברים ניקובים ושומרים כרטיסייה בארנק הדיגיטלי. בלי להוריד אפליקציה."),
        "/: approved mobile brand introduction missing from server-rendered hero",
      );
      assert(
        includesIgnoringWhitespace(textContent(desktopHero), "עם וייבי (Viby), בונים קשר עם הלקוחות"),
        "/: desktop brand introduction missing from server-rendered hero",
      );
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

  if (pathname === "/about") {
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
    const visible = textContent(body);
    const nodes = parsedJsonLd.flatMap((document) =>
      Array.isArray(document?.["@graph"]) ? document["@graph"] : [document],
    );
    const aboutNodes = nodes.filter((node) => node?.["@type"] === "AboutPage");
    const aboutNode = aboutNodes[0];
    const pageTitle = textContent(headings[0]?.[1] ?? "");

    assert(title === aboutTitle, "/about: wrong title");
    assert(descriptions[0]?.[1] === aboutDescription, "/about: wrong description");
    for (const [attribute, value] of [
      ["property", "og:title"],
      ["name", "twitter:title"],
    ]) {
      assert(html.includes(`<meta ${attribute}="${value}" content="${aboutTitle}"`), `/about: wrong ${value}`);
    }
    for (const [attribute, value] of [
      ["property", "og:description"],
      ["name", "twitter:description"],
    ]) {
      assert(html.includes(`<meta ${attribute}="${value}" content="${aboutDescription}"`), `/about: wrong ${value}`);
    }
    assert(pageTitle === "טכנולוגיה של הגדולים. בשביל כולם.", "/about: wrong H1");
    assert(!response.headers.get("x-robots-tag")?.includes("noindex"), "/about: X-Robots-Tag noindex");
    assert(!/<meta name="robots" content="[^"]*noindex/.test(html), "/about: robots noindex");
    assert(includesIgnoringWhitespace(visible, "נעים להכיר, אנחנו וייבי (Viby)."), "/about: Hebrew brand is not visible in server HTML");
    assert(includesIgnoringWhitespace(visible, "בסוף 2025 הקמנו את וייבי בהרצליה"), "/about: approved story is missing");
    assert(includesIgnoringWhitespace(visible, "חלק מחברי הצוות גם משרתים במילואים."), "/about: approved team copy is missing");
    assert(visible.includes("אופן ההקמה, הציוד הפיזי, המשלוח, תנאי המנוי ומאפייני השימוש תלויים בשירות ובהזמנה שאושרה."), "/about: service-specific disclosure is missing");
    let headingPosition = -1;
    for (const heading of aboutHeadings) {
      const position = visible.indexOf(heading, headingPosition + 1);
      assert(position > headingPosition, `/about: missing or out-of-order section ${heading}`);
      headingPosition = position;
    }
    assert(aboutNodes.length === 1, `/about: expected one AboutPage node, got ${aboutNodes.length}`);
    assert(!nodes.some((node) => ["Organization", "WebSite"].includes(node?.["@type"])), "/about: duplicate company or website node");
    assert(aboutNode?.["@id"] === `${canonicalOrigin}/about#webpage`, "/about: wrong AboutPage @id");
    assert(aboutNode?.url === `${canonicalOrigin}/about`, "/about: wrong AboutPage URL");
    assert(aboutNode?.name === "אודות וייבי (Viby)", "/about: wrong AboutPage name");
    assert(aboutNode?.inLanguage === "he-IL", "/about: wrong AboutPage language");
    for (const field of ["about", "mainEntity", "publisher"]) {
      assert(aboutNode?.[field]?.["@id"] === `${canonicalOrigin}/#organization`, `/about: wrong ${field} reference`);
    }
    assert(aboutNode?.isPartOf?.["@id"] === `${canonicalOrigin}/#website`, "/about: wrong WebSite reference");

    const cards = matches(body, /<a\b[^>]*data-about-solution(?:="")?[^>]*>[\s\S]*?<\/a>/g);
    assert(cards.length === 6, `/about: expected six product cards, got ${cards.length}`);
    for (const [path, label] of aboutSolutions) {
      const matching = cards.filter(([card]) =>
        card.includes(`href="${path}"`) && includesIgnoringWhitespace(textContent(card), label),
      );
      assert(matching.length === 1, `/about: wrong or duplicate product card ${path}`);
    }
    assert(/<a\b[^>]*href="#solutions"[^>]*>/.test(body), "/about: missing hero solutions anchor");
    for (const path of ["/support", "/privacy", "/terms"]) {
      assert(body.includes(`href="${path}"`), `/about: missing ${path} link`);
    }
    assert(body.includes("privacy-preferences-link"), "/about: missing privacy preferences control");
    const contactNav = body.match(/<nav\b[^>]*aria-label="קישורי קשר ומידע"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? "";
    for (const [url, label] of [[instagramUrl, "Instagram"], [linkedinUrl, "LinkedIn"]]) {
      assert(
        matches(contactNav, /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)
          .some(([, href, content]) => href === url && textContent(content).includes(label)),
        `/about: missing visible ${label} contact link`,
      );
    }
  }

  if (pathname === "/customer-retention") {
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
    const visible = textContent(body);
    const nodes = parsedJsonLd.flatMap((document) =>
      Array.isArray(document?.["@graph"]) ? document["@graph"] : [document],
    );
    const webPages = nodes.filter((node) => node?.["@type"] === "WebPage");
    const webpage = webPages[0];
    assert(title === customerRetentionTitle, "/customer-retention: wrong title");
    assert(descriptions[0]?.[1] === customerRetentionDescription, "/customer-retention: wrong description");
    assert(textContent(headings[0]?.[1] ?? "") === customerRetentionH1, "/customer-retention: wrong H1");
    for (const [attribute, value, expected] of [
      ["property", "og:title", customerRetentionTitle],
      ["property", "og:description", customerRetentionDescription],
      ["name", "twitter:title", customerRetentionTitle],
      ["name", "twitter:description", customerRetentionDescription],
    ]) {
      assert(html.includes(`<meta ${attribute}="${value}" content="${expected}"`), `/customer-retention: wrong ${value}`);
    }
    assert(html.includes('content="מועדון לקוחות דיגיטלי לעסקים — Viby"'), "/customer-retention: wrong social image alt");
    assert(html.includes(`<link rel="alternate" hrefLang="he-IL" href="${canonicalOrigin}/customer-retention"`), "/customer-retention: missing Hebrew alternate");
    assert(!response.headers.get("x-robots-tag")?.includes("noindex"), "/customer-retention: X-Robots-Tag noindex");
    assert(!/<meta name="robots" content="[^"]*noindex/.test(html), "/customer-retention: robots noindex");
    assert(includesIgnoringWhitespace(visible, "וייבי (Viby) | פתרונות נאמנות לעסקים"), "/customer-retention: Hebrew brand is not visible in server HTML");
    assert(visible.includes("דוגמאות להמחשה"), "/customer-retention: examples are not labeled illustrative");
    let headingPosition = -1;
    for (const heading of customerRetentionHeadings) {
      const position = visible.indexOf(heading, headingPosition + 1);
      assert(position > headingPosition, `/customer-retention: missing or out-of-order section ${heading}`);
      headingPosition = position;
    }
    assert(webPages.length === 1, `/customer-retention: expected one WebPage node, got ${webPages.length}`);
    assert(nodes.length === 1, `/customer-retention: unexpected additional schema nodes (${nodes.length})`);
    assert(webpage?.["@id"] === `${canonicalOrigin}/customer-retention#webpage`, "/customer-retention: wrong WebPage @id");
    assert(webpage?.url === `${canonicalOrigin}/customer-retention`, "/customer-retention: wrong WebPage URL");
    assert(webpage?.name === customerRetentionTitle, "/customer-retention: wrong WebPage name");
    assert(webpage?.description === customerRetentionDescription, "/customer-retention: wrong WebPage description");
    assert(webpage?.inLanguage === "he-IL", "/customer-retention: wrong WebPage language");
    assert(webpage?.isPartOf?.["@id"] === `${canonicalOrigin}/#website`, "/customer-retention: wrong WebSite reference");
    assert(webpage?.publisher?.["@id"] === `${canonicalOrigin}/#organization`, "/customer-retention: wrong Organization reference");
    assert(!nodes.some((node) => ["Organization", "WebSite", "FAQPage", "ItemList", "Product", "Offer"].includes(node?.["@type"])), "/customer-retention: unsupported schema node");
    const productCards = matches(body, /<a\b[^>]*data-retention-product(?:="")?[^>]*>[\s\S]*?<\/a>/g);
    assert(productCards.length === 6, `/customer-retention: expected six product cards, got ${productCards.length}`);
    for (const { path, label } of productLinks) {
      const matching = productCards.filter(([card]) =>
        card.includes(`href="${path}"`) && includesIgnoringWhitespace(textContent(card), label),
      );
      assert(matching.length === 1, `/customer-retention: wrong or duplicate product link ${path}`);
    }
    assert(/<a\b[^>]*href="#comparison"[^>]*>/.test(body), "/customer-retention: missing comparison anchor");
    assert(/id="comparison"/.test(body), "/customer-retention: missing comparison target");
    for (const path of ["/about", "/how-it-works", "/support", "/terms", "/privacy"]) {
      assert(body.includes(`href="${path}"`), `/customer-retention: missing ${path} link`);
    }
    assert(body.includes('href="/terms#terms-8"'), "/customer-retention: missing verified subscription terms link");
    for (const claim of ["החל מ־79 ₪ לחודש", "החל מ־49 ₪ לחודש", "3 חודשים", "הצעה אישית", "עמלות סליקה", "היתרים נדרשים", "הזמנה המאושרת"]) {
      assert(visible.includes(claim), `/customer-retention: missing approved commercial qualification ${claim}`);
    }
    const contactLinks = matches(body, /<a\b[^>]*href="https:\/\/wa\.me\/[^\"]+"[^>]*>/g).map((match) => match[0]);
    const message = encodeURIComponent("היי, הגעתי מהעמוד על מועדון לקוחות דיגיטלי ואשמח לעזרה בבחירת הכלים לעסק שלי.");
    assert(contactLinks.length === 3, `/customer-retention: expected three WhatsApp CTAs, got ${contactLinks.length}`);
    for (const location of ["hero", "mid_page_cta", "final_cta"]) {
      assert(contactLinks.some((link) => link.includes(`data-analytics-location="${location}"`) && link.includes(`href="https://wa.me/972552639957?text=${message}"`)), `/customer-retention: wrong WhatsApp CTA ${location}`);
    }
  }

  if (productRoutes.has(pathname) || ["/support", "/how-it-works", "/customer-retention"].includes(pathname)) {
    assert(/<a\b[^>]*href="\/about"[^>]*>אודות וייבי<\/a>/.test(html), `${pathname}: missing About footer link`);
  }

  if (productRoutes.has(pathname)) {
    assert(/<a\b[^>]*href="\/customer-retention"[^>]*>מועדון לקוחות דיגיטלי לעסקים<\/a>/.test(html), `${pathname}: missing customer-retention footer link`);
    if (pathname === "/") {
      for (const route of industryExpectations.keys()) {
        assert(html.includes(`href="${route}"`), `${pathname}: missing industry footer link ${route}`);
      }
      assert(html.includes(`href="${englishCafePath}"`), `${pathname}: missing English café footer link`);
    }
    const contextualLink = /<a\b[^>]*href="\/customer-retention"[^>]*>איך לבחור מועדון לקוחות דיגיטלי לעסק<\/a>/.test(html);
    assert(contextualLink === (pathname === "/"), `${pathname}: homepage contextual link has wrong scope`);
  }
  if (pathname === "/about") {
    assert(/<a\b[^>]*href="\/customer-retention"[^>]*>המדריך לבחירת מועדון לקוחות דיגיטלי לעסק<\/a>/.test(html), "/about: missing contextual customer-retention link");
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
    await access(`${buildDirectory}/BUILD_ID`);
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

    const logoResponse = await fetch(`${origin}/icon.png`);
    assert(logoResponse.status === 200, `Organization logo: expected 200, got ${logoResponse.status}`);
    assert(logoResponse.headers.get("content-type")?.includes("image/png"), "Organization logo: wrong content type");
    const logoBytes = new Uint8Array(await logoResponse.arrayBuffer());
    const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
    assert(pngSignature.every((byte, index) => logoBytes[index] === byte), "Organization logo: invalid PNG signature");
    if (logoBytes.length >= 24) {
      const dimensions = new DataView(logoBytes.buffer, logoBytes.byteOffset, logoBytes.byteLength);
      assert(dimensions.getUint32(16) >= 112 && dimensions.getUint32(20) >= 112, "Organization logo: smaller than 112 × 112 pixels");
    }

    const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
    for (const route of routes) {
      assert(sitemap.includes(`<loc>${expectedCanonical(route)}</loc>`), `sitemap: missing ${route}`);
    }
    const sitemapEntries = matches(sitemap, /<url>([\s\S]*?)<\/url>/g).map((match) => match[1]);
    for (const route of routes) {
      const canonical = expectedCanonical(route);
      const entry = sitemapEntries.find((candidate) => candidate.includes(`<loc>${canonical}</loc>`));
      const lastModified = entry?.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
      const expectedLastModified = ["/terms", "/privacy"].includes(route)
        ? legalReleaseLastModified
        : route === "/"
        ? brandReleaseLastModified
        : route === "/customer-retention"
          ? customerRetentionLastModified
        : route === "/about"
          ? aboutLastModified
        : productRoutes.has(route) || route === "/how-it-works"
          ? commercialLastModified
          : undefined;
      if (expectedLastModified) {
        assert(
          lastModified === expectedLastModified,
          `sitemap: ${route} lastmod is ${lastModified ?? "missing"}`,
        );
      } else {
        assert(!lastModified, `sitemap: ${route} has a fabricated lastmod`);
      }
      if (lastModified) {
        assert(/^\d{4}-\d{2}-\d{2}$/.test(lastModified), `sitemap: ${route} lastmod is not ISO date-only`);
        assert(
          lastModified <= todayInIsrael,
          `sitemap: ${route} lastmod is in the future`,
        );
      }
    }
    assert(
      sitemapEntries.filter((entry) => entry.includes(`<loc>${canonicalOrigin}/about</loc>`)).length === 1,
      "sitemap: /about must occur exactly once",
    );
    assert(
      sitemapEntries.filter((entry) => entry.includes(`<loc>${canonicalOrigin}/customer-retention</loc>`)).length === 1,
      "sitemap: /customer-retention must occur exactly once",
    );
    for (const route of industryExpectations.keys()) {
      assert(
        sitemapEntries.filter((entry) => entry.includes(`<loc>${expectedCanonical(route)}</loc>`)).length === 1,
        `sitemap: ${route} must occur exactly once`,
      );
    }
    assert(sitemapEntries.length === routes.length, `sitemap: expected ${routes.length} public URLs, got ${sitemapEntries.length}`);

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
