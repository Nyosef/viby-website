# PR 3 — Approved Hebrew About Copy & Codex Unblock

**Repository:** `vibyWebsite`  
**New route:** `/about`  
**Status:** Approved editorial copy from Viby owner. Leave implementation unstaged, uncommitted and undeployed.  
**Purpose:** Supply the verbatim content missing from the implementation plan; this file is the source of truth for page copy and metadata.

## Important instructions to Codex

1. Use the approved Hebrew copy below, in the given section order. No fabricated or substitute copy. Only make the minimal changes necessary for safe formatting or an explicitly failed factual-claim review, and report exact omissions.
2. **Do not ask for the founders' names or job titles.** The owner explicitly decided not to publish identities. The approved factual text describes an anonymous team of four, with two founders.
3. Mention Microsoft, Wix, Unity and Mastercard **only as past professional experience of team members**, not as endorsements, customers, partners, or investors. Do not add employer logos. The owner authorizes the general public claim, subject to a final factual accuracy check; if verification fails, omit only the affected phrase and flag it for review.
4. The reserve-duty wording is the exact wording below: `חלק מחברי הצוות גם משרתים במילואים`. Do not add names, units, deployment details, or additional military claims.
5. User-confirmed facts: founded late 2025; based in Herzliya; serves businesses from the Golan Heights to Eilat; four-person team, including two founders. Do not invent customer counts, other credentials, business-registration details or precise street addresses.
6. Use the existing site's configured contact channels, privacy/terms/support URLs, analytics and consent conventions. Do not hardcode phone or WhatsApp URLs. Keep `PrivacyPreferencesButton` if the existing footer patterns support it.
7. Follow the separate approved PR 3 implementation plan for SEO reporting, sitemap, responsive Playwright checks and scope restrictions. This addendum resolves the copy/claim/route questions, not architectural constraints.

## Exact SEO metadata

- **Path:** `/about`
- **Final rendered title:** `אודות וייבי | Viby` (if `createPageMetadata()` appends `| Viby`, pass only `אודות וייבי` as the title input)
- **Exact meta description:** `הכירו את וייבי (Viby), מערכת ישראלית שמנגישה טכנולוגיה מתקדמת לעסקים קטנים ובינוניים. כרטיסיות דיגיטליות, גלגל מזל, כרטיסי מתנה, NFC וקשרי לקוחות.`
- **H1:** `טכנולוגיה של הגדולים. בשביל כולם.`
- **Canonical:** `https://joinviby.co.il/about`
- **Language / direction:** `he-IL` / `rtl`
- **Structured data:** one `AboutPage` entity at `https://joinviby.co.il/about#webpage` referencing the existing `https://joinviby.co.il/#organization` and `https://joinviby.co.il/#website` IDs; do not duplicate conflicting global entities.

## Six product-card routes (one card per destination)

| Card title | Path |
|---|---|
| כרטיסיות דיגיטליות | `/` |
| גלגל מזל חכם | `/smart-wheel` |
| כרטיסי מתנה דיגיטליים | `/digital-wallet` |
| Viby Tap | `/viby-tap` |
| Viby Rate | `/viby-rate` |
| Viby UP | `/viby-up` |

Other navigation links may point to the same routes; only the six solution cards should be counted as cards. Verify destinations against the existing product registry; do not create a seventh product.

---

## 2. Approved Hebrew page copy (publish-ready draft)

The labels “Eyebrow,” “H1,” etc. are implementation instructions; headings and body copy are customer-facing. The linked text should render as real Next.js links, not Markdown on the website.

### Section A — Hero

**Eyebrow:** אודות וייבי (Viby)

**H1:** טכנולוגיה של הגדולים. בשביל כולם.

**Lead:** נעים להכיר, אנחנו וייבי (Viby). אנחנו עוזרים לעסקים קטנים ובינוניים בישראל ליהנות מטכנולוגיה מתקדמת לשימור לקוחות, לנאמנות ולחוויות שכיף לחזור אליהן — בדרך פשוטה, נגישה ועם אנשים אמיתיים שמלווים אתכם.

**Supporting paragraph:** אנחנו מאמינים שכל עסק, לא משנה מה הגודל שלו, צריך לקבל הזדמנות ליצור קשר טוב יותר עם הלקוחות שלו. בלי מערכות מסובכות ובלי להפוך את הטכנולוגיה לעוד משימה ברשימה.

**Primary CTA:** דברו איתנו ב־WhatsApp

**Secondary link:** הכירו את הפתרונות שלנו (anchor to solutions section)

### Section B — What is Viby?

**H2:** מה זה וייבי?

וייבי (Viby) היא מערכת ישראלית לעסקים שרוצים לשמור על קשר עם הלקוחות שלהם ולתת להם סיבה לחזור. אנחנו יוצרים כלים דיגיטליים לנאמנות לקוחות, כרטיסיות ניקוב, הטבות ומשחקי פרסים, כרטיסי מתנה, פתרונות NFC ו־QR וכלים חכמים לתקשורת עם לקוחות.

הפתרונות שלנו מיועדים לעסקים קטנים ובינוניים ממגוון תחומים — מבתי קפה, מסעדות וחנויות ועד מספרות, קליניקות, סטודיואים ועסקי שירות. כל עסק בוחר את הכלים שמתאימים לו וללקוחות שלו.

### Section C — Origin story and mission

**H2:** רצינו להביא לעסקים בישראל משהו אחר.

הסיפור שלנו התחיל מתוך סקרנות ואהבה לטכנולוגיה. במהלך מסעות בעולם הכרנו חוויות ורעיונות שהפכו פעולות יומיומיות לפשוטות, חכמות ומהנות יותר. כשחזרנו לישראל, רצינו שגם העסקים המקומיים יוכלו ליהנות מהאפשרויות האלה.

בסוף 2025 הקמנו את וייבי בהרצליה, עם מטרה אחת ברורה: להפוך טכנולוגיה מתקדמת לנגישה גם לעסקים שאין להם מחלקת טכנולוגיה או תקציב ענק. להוריד את המורכבות, להוסיף קצת יותר כיף ולהפוך כל מפגש עם לקוח להזדמנות לקשר מתמשך.

### Section D — Values

**H2:** טכנולוגיה טובה צריכה לעבוד בשבילכם.

**מתקדמת, אבל פשוטה.** אנחנו בונים חוויות דיגיטליות שקל ללקוחות להשתמש בהן ולעסקים לנהל אותן.

**נגישה גם לעסקים קטנים.** אנחנו שואפים להציע פתרונות במחיר ברור ונגיש, כדי שעסק לא יצטרך להיות רשת גדולה כדי להשתמש בטכנולוגיה איכותית. העלות והתנאים תלויים בשירות שבוחרים.

**עם אנשים שאכפת להם.** מבחינתנו השירות לא מסתיים בהקמה. אנחנו מלווים את העסק, עונים על שאלות ומסייעים גם בהמשך הדרך.

### Section E — Six solutions

**H2:** הפתרונות של וייבי

אין דרך אחת שמתאימה לכל עסק. לכן בנינו כמה כלים שונים, שכל אחד מהם פותר צורך אחר.

**כרטיסיות דיגיטליות** — הלקוחות מצטרפים בסריקה, צוברים ניקובים והטבות ושומרים את הכרטיסייה ב־Apple Wallet או ב־Google Wallet. כך קל להמשיך את הקשר גם אחרי הביקור.  
**Link:** `/`

**גלגל מזל חכם** — משחק פרסים דיגיטלי שמוסיף רגע של הפתעה אחרי הקנייה, עם הטבות שהעסק מגדיר וסיבה לחזור ולממש אותן.  
**Link:** `/smart-wheel`

**כרטיסי מתנה דיגיטליים** — כרטיסי מתנה ויתרות דיגיטליות שניתן לרכוש, לשמור בארנק שבטלפון ולממש בעסק.  
**Link:** `/digital-wallet`

**Viby Tap** — שלט או מדבקה עם NFC ו־QR שפותחים עמוד אחד עם הקישורים החשובים של העסק: ביקורות, רשתות חברתיות, WhatsApp, ניווט ועוד.  
**Link:** `/viby-tap`

**Viby Rate** — פתרון NFC ו־QR שמקל על לקוחות להגיע לעמוד הביקורות של העסק ב־Google ולשתף את החוויה האמיתית שלהם.  
**Link:** `/viby-rate`

**Viby UP** — כלי לתקשורת עם לקוחות ב־WhatsApp בעזרת AI, בכפוף להרשאות המתאימות, שמסייע להקשיב למשוב, לזהות מצבים שדורשים תשומת לב ולהמשיך את השיחה אחרי הביקור.  
**Link:** `/viby-up`

### Section F — How we work

**H2:** אתם מתמקדים בעסק. אנחנו עוזרים בכל השאר.

**01 — מכירים את העסק.** אנחנו מקשיבים לצרכים שלכם ובוחרים יחד את הפתרון המתאים.

**02 — מקימים ומגדירים.** הצוות שלנו מלווה את ההקמה וההתאמה לעסק, כדי שתוכלו להתחיל להשתמש בכלים בצורה ברורה ופשוטה.

**03 — נשארים בקשר.** גם אחרי ההפעלה אנחנו כאן לשאלות, לתמיכה טכנית ולסיוע בשינויים שצריך לעשות לאורך הדרך.

אופן ההקמה, הציוד הפיזי, המשלוח, תנאי המנוי ומאפייני השימוש תלויים בשירות ובהזמנה שאושרה. לפרטים המלאים אפשר לעיין בתנאי ההצטרפות או לדבר איתנו.

### Section G — People and credibility

**H2:** מאחורי הטכנולוגיה יש אנשים.

מאחורי וייבי עומד צוות ישראלי של ארבעה אנשים, בהם שני מייסדים, עם ניסיון מקצועי בחברות טכנולוגיה מובילות כמו Microsoft, Wix, Unity ו־Mastercard. חלק מחברי הצוות גם משרתים במילואים. אנחנו מביאים לעסק קטן את הידע, הניסיון ותשומת הלב שהיינו רוצים לקבל בעצמנו.

אנחנו פועלים מהרצליה ומלווים עסקים ברחבי ישראל — מרמת הגולן ועד אילת. מבחינתנו, גם אם הטכנולוגיה מתקדמת, השירות צריך להישאר נגיש, אישי ואנושי.

**Factual approval gate:** The company names are former team-member employment experience, not Viby customers, endorsements, current employers, investors, or partnerships. Verify member-by-member accuracy and permission before production. Verify the current four-person team size and reserve-duty wording. If any portion cannot be validated or cleared, omit only that sentence/portion without blocking the rest of the page.

### Section H — Contact and footer

**H2:** יש עם מי לדבר.

רוצים לשמוע איך זה יכול לעבוד בעסק שלכם? אנחנו זמינים לשיחה, לשאלות ולעזרה בבחירת פתרון מתאים. ואם אתם כבר משתמשים בוייבי — התמיכה שלנו כאן גם בשבילכם.

**Facts:** וייבי (Viby) | הרצליה, ישראל | שירות לעסקים ברחבי ישראל | האתר הרשמי: joinviby.co.il

**Links:** WhatsApp (existing official link), תמיכה (`/support`), Instagram (official site-config URL), מדיניות פרטיות, תנאי שימוש. Do not invent an operator name, email, office visit address, phone number or support hours. Render public operator identity only if reviewed and approved.

### Section I — Final call to action

**H2:** רוצים להכניס קצת יותר וייב לעסק?

בואו נספר לכם מה אפשר לעשות, נשמע מה חשוב לכם ונעזור לבחור את הכלים שמתאימים לעסק שלכם. בלי לסבך את הדברים — ועם אנשים שבאמת אכפת להם.

**Primary CTA:** דברו איתנו ב־WhatsApp

---

## Final editorial instruction

Render the Hebrew text and approved headings faithfully. Product links, CTA actions, contact, support, legal and privacy controls are functional UI, not literal Markdown. If a material claim cannot be verified during implementation, omit only that claim, preserve the rest of the About page, and disclose the exact omission in the implementation report. Do not block implementation for founder names or invent them.
