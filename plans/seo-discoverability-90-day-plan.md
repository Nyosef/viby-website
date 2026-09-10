# Viby: 90-day SEO and discoverability roadmap

**Created:** 6 September 2026

**Status:** Planned; implementation tasks below are not yet completed.

**Audience:** Hebrew-speaking Israeli business owners researching Viby, its products, and customer-retention solutions.

## Purpose and delivery rules

Make Viby easier to find through Google and search-enabled AI answers, starting with the five mandatory Hebrew brand phrases. `joinviby.co.il` owns marketing discovery. `myviby.co.il` is the platform for customers, businesses, and administrators.

This document records future work only. Creating it does not authorize or perform website changes, redirects, analytics configuration, deployments, publication, or customer outreach. Implement and review each problem separately, starting with **Problem 1: Mandatory Hebrew branded discovery**.

Preserve the homepage's digital punch-card focus and existing product URLs. Use the existing Next.js site, SEO configuration, consent-aware analytics, and SEO audit. No new CMS, public API, or database is planned. New content can use typed repository-managed records.

Related documents:

- [Historical SEO audit and delivery tracker](./hebrew-seo-main-problems.md)
- [Indexing and measurement runbook](./hebrew-seo-indexing-measurement-runbook.md)
- [Dated baseline, including 30 August findings](./hebrew-seo-baseline-2026-08-17.md)

The roadmap numbers below are independent of the historical audit's problem numbers. Historical observations are not assertions about today's index coverage or rankings.

## Sequence and ownership

Day 1 is the start of implementation, not the creation date of this document. Evidence collection may proceed while other problems are implemented.

| Window | Problems | Deliverable |
|---|---|---|
| Days 1–14 | 1 and 2 | Branded phrase coverage and refreshed indexing/conversion evidence |
| Days 15–30 | 3 and 4 | Category page and clear marketing/platform domain roles |
| Days 31–60 | 5 and 6 | Verified company information and first measured customer story |
| Days 61–90 | 7 and 8 | Evidence-led content improvements and recurring discovery reporting |

Problem 8 establishes its baseline at the beginning and repeats checks at days 30, 60, and 90. Customer evidence collection can begin on day 1; it does not block branded phrase implementation.

Engineering owns implementation and technical checks. The Viby owner supplies company facts, customer identity, metrics, and publication permission. Marketing owns query reviews, public-profile consistency, customer-link requests, and reporting. Platform changes belong to a separate task in the platform repository.

## Problem 1: Mandatory Hebrew branded discovery

**Objective:** Connect the Hebrew name and product phrases to the correct Viby pages.

**Affected pages:** `/`, `/digital-wallet`, `/smart-wheel`, shared company copy and Organization structured data; `/customer-retention` after Problem 3.

**Dependencies:** None for the initial release. Problem 3 changes the preferred destination of the benefits-club phrase.

| Exact phrase | Initial destination | Destination after Problem 3 |
|---|---|---|
| `וייבי` | `/` | `/` |
| `וייבי כרטיסיות` | `/` | `/` |
| `וייבי ארנקים` | `/digital-wallet` | `/digital-wallet` |
| `וייבי גלגל` | `/smart-wheel` | `/smart-wheel` |
| `וייבי מועדון הטבות` | `/` | `/customer-retention` |

### Changes and tasks

- [ ] Record the mapping centrally in the SEO configuration, alongside existing non-branded product intents.
- [ ] Introduce `וייבי (Viby)` in visible company copy and add the assigned product phrases naturally to introductions or supporting headings.
- [ ] Explain that `וייבי ארנקים` describes digital gift cards and stored business credit, without implying banking services.
- [ ] Retain existing product titles and H1s; use branded phrases as supporting language.
- [ ] Add `וייבי` as the Organization `alternateName`, retaining the existing organization ID and matching visible copy.
- [ ] Extend the production HTML audit to check the exact phrases on their assigned pages, excluding scripts, metadata, comments, and image attributes from phrase evidence.
- [ ] Record initial Google and AI observations through Problems 2 and 8.

**Acceptance criteria:** Each phrase appears naturally in its assigned page's server-rendered visible text. Destinations are canonical, indexable, and internally linked. Cross-page links may contain the same phrases; one preferred destination does not mean a ban on mentioning a product elsewhere. Existing product navigation, non-branded intent, and conversion flows pass regression checks.

**Outcome to monitor:** Correct landing pages for all five branded searches; top-three Google visibility is a target, not a release guarantee.

## Problem 2: Indexing and measurement follow-up

**Objective:** Establish current evidence for indexing and consented organic conversions.

**Affected pages/systems:** All five product pages, subsequently published content pages, Search Console, and the existing GA4 production stream.

**Dependencies:** Authenticated access to the established properties; Problem 1 deployment for post-change evaluation. Measurement setup is already documented as completed on 30 August 2026.

### Changes and tasks

- [ ] Refresh the dated baseline using authenticated Search Console results; retain historical observations with their dates.
- [ ] Inspect all five commercial URLs and capture status, exact exclusion reason, last crawl, declared canonical, and Google-selected canonical where available.
- [ ] Complete or document the indexing recheck previously scheduled for 6 September 2026.
- [ ] Verify sitemap processing, property health, and outstanding consent-granted Realtime/DebugView event validation.
- [ ] Confirm consent denial prevents analytics loading; confirm consented contact actions and successful lead submissions use the existing event contract without personal information.
- [ ] Report `contact_intent` separately from `generate_lead`; failed submissions must not count as successful leads.
- [ ] Record branded and non-branded queries, landing pages, clicks, impressions, CTR, position, and consented contact actions.
- [ ] After publication and successful live checks, request indexing once for new or substantially changed pages and record the date.

**Acceptance criteria:** Current inspection evidence and event-validation results are recorded. Unknowns remain explicitly unavailable, pending, or insufficient data. Public search sampling is not substituted for Google URL Inspection. Technical or access failures have a recorded next action.

**Outcome to monitor:** Indexed canonical pages, correct landing-page selection, and reliable consented conversion reporting. Analytics sessions and Search Console clicks are not expected to match exactly.

## Problem 3: Customer-retention category page

**Objective:** Give broad Viby and customer-retention searches a dedicated marketing destination.

**Affected pages:** New `/customer-retention`, homepage, product footers, sitemap, and SEO audit.

**Dependencies:** Verified product capabilities and current commercial terms. The page can launch before the case study, with a story link added when Problem 6 is published.

### Changes and tasks

- [ ] Create a statically rendered page with title `מערכת שימור לקוחות לעסקים — וייבי מועדון הטבות | Viby` and H1 `מערכת שימור לקוחות לעסקים`.
- [ ] Cover `מועדון לקוחות לעסק`, `מועדון לקוחות דיגיטלי`, `מועדון הטבות לעסק`, and `תוכנית נאמנות לעסק` naturally as supporting phrases.
- [ ] Explain what Viby is, suitable business types, and customer/staff/owner workflows.
- [ ] Compare punch cards, prize wheels, and digital gift cards by business need; present VibyRate and VibyTap as complementary review/contact tools.
- [ ] Explain setup, current starting-price expectations, product limitations, and measurement of visits and redemptions; include a demonstration CTA.
- [ ] Answer the differences between a customer club and punch card, which product to choose, app requirements, setup/cost, and how activity is measured.
- [ ] Add unique metadata, self-canonical, structured data referencing the existing Organization, and a sitemap entry.
- [ ] Link the page from each product footer and a relevant homepage section; link back to all five products.
- [ ] Move the preferred target for `וייבי מועדון הטבות` to this page. Retain a short homepage introduction with a descriptive link.
- [ ] Replace the SEO audit's universal product modification-date expectation with maintained per-page dates, updating only genuinely changed content.

**Acceptance criteria:** One indexable canonical category page answers the broader buying intent, exposes its primary content without JavaScript, and has reciprocal product links. The homepage continues to target digital punch cards. New CTA tracking respects consent and uses controlled locations without fabricating a product ID.

**Outcome to monitor:** Impressions and qualified visits for the category phrases, with the category page becoming their preferred landing page.

## Problem 4: Marketing and platform domain separation

**Objective:** Direct marketing discovery to `joinviby.co.il` while retaining all platform functionality on `myviby.co.il`.

**Affected pages/systems:** Public platform root, platform entry navigation, authentication flows, marketing links, and platform indexing controls.

**Dependencies:** A separate platform-repository task with access to route configuration and authentication behavior. Root-route dependencies must be inspected before a redirect is implemented.

### Changes and tasks

- [ ] Inventory uses of the platform root, including authenticated entry, login redirects, customer entry URLs, and navigation.
- [ ] Preserve or relocate any platform entry behavior to its explicit application route before redirecting the public root.
- [ ] Redirect only the public marketing root `https://myviby.co.il/` to `https://joinviby.co.il/` once route dependencies are resolved.
- [ ] Preserve login, business/admin screens, customer-facing routes, APIs, and authentication callbacks; update navigation that depended on the old marketing root.
- [ ] Confirm private screens require authentication and are excluded from search. Do not apply domain-wide blocking to customer-facing pages.
- [ ] Align public marketing links with `joinviby.co.il` and retain explicit platform login links.

**Acceptance criteria:** The marketing root reaches the marketing site without loops. Business, administrator, and customer entry scenarios continue to work. Private data remains protected by authentication; crawler directives are not treated as access control. If root dependencies cannot yet be resolved, record that subtask as pending and proceed with independent roadmap problems.

**Outcome to monitor:** Marketing searches select `joinviby.co.il` while operational platform access remains intact.

## Problem 5: Company identity and trust

**Objective:** Explain who Viby is using verifiable company information.

**Affected pages:** New `/about`, public footers, Organization structured data, and existing public company profiles.

**Dependencies:** Owner-confirmed company background, people, contact information, and approved profile links.

### Changes and tasks

- [ ] Collect and approve the company description, audience, background, people, location/contact facts, and profile URLs.
- [ ] Publish `/about` using the existing Hebrew visual design and consistent `וייבי (Viby)` naming.
- [ ] Link to the category page, relevant products, and contact options.
- [ ] Add unique metadata, self-canonical, suitable structured data, public footer links, and a sitemap entry.
- [ ] Align structured-data company facts and approved profile references with the visible content.
- [ ] Have the marketing owner review existing public profiles for consistent company name, domain, and contact details.

**Acceptance criteria:** The page is linked, crawlable, and uses approved facts without invented history, credentials, addresses, or team identities. Profile edits and publication are tracked separately from repository implementation.

**Outcome to monitor:** Consistent Viby identification in branded results and AI answers, plus visits from the About page to commercial pages or contact actions.

## Problem 6: First customer case study

**Objective:** Demonstrate actual product use and measured customer outcomes.

**Affected pages:** New `/customers/[slug]`, homepage, category page, relevant product page, and sitemap.

**Dependencies:** An approved named customer, usable metrics with dates and definitions, screenshots, and publication permission. Default story focus is punch-card repeat visits; the actual customer and evidence must be supplied before publication.

### Changes and tasks

- [ ] Collect customer identity, business type, original problem, selected product, setup, and day-to-day experience.
- [ ] Collect approved screenshots, remove personal customer information, and obtain an attributed quotation when available.
- [ ] Document metric definitions, measurement periods, sample sizes, and sources for active cards, visits, punches, or redemptions.
- [ ] Report observed outcomes; claim improvement only with comparable before/after evidence and avoid unsupported causal claims.
- [ ] Create typed repository-managed story content with identity, product, narrative, evidence, images, slug, and publication/update dates.
- [ ] Publish the approved story with metadata, canonical, appropriate structured data, product links, and a demonstration CTA.
- [ ] Keep unapproved content unpublished and out of static public routes and the sitemap.
- [ ] Link the story from the homepage, category page, and relevant product page.
- [ ] Have the marketing owner request a voluntary link from the featured customer after publication.

**Acceptance criteria:** One approved story is publicly readable and linked. Every numerical claim has a recorded source and context. Missing evidence blocks publication of that claim or story, not unrelated roadmap work. Customer outreach is a separate human/external task.

**Outcome to monitor:** Story visibility, referral traffic, product-page visits, and qualified contact actions.

## Problem 7: Broader Hebrew search coverage

**Objective:** Expand relevant discovery using search evidence and recurring customer questions.

**Affected pages:** Existing product/category pages and, where justified, up to two additional guides during the 90-day period.

**Dependencies:** Problem 2 reporting, published destination pages, and at least 14–28 days of useful post-change data for retargeting decisions. Sales questions may establish a need when query data is sparse.

| Preferred page | Phrase families to investigate |
|---|---|
| `/` | `כרטיס ניקובים דיגיטלי`, `כרטיסיית נאמנות`, `כרטיסייה דיגיטלית לבית קפה` |
| `/customer-retention` | `מערכת נאמנות לקוחות`, `איך להחזיר לקוחות לעסק`, `מועדון לקוחות ללא אפליקציה` |
| `/digital-wallet` | `גיפט קארד לעסק`, `שובר מתנה דיגיטלי`, `מערכת כרטיסי מתנה` |
| `/smart-wheel` | `גלגל מזל לעסק`, `גלגל פרסים דיגיטלי`, `משחק שיווקי לעסק` |
| `/viby-rate` | `שלט NFC לביקורות גוגל`, `כרטיס ביקורות גוגל`, `איך לבקש ביקורת בגוגל` |
| `/viby-tap` | `מדבקת NFC לעסק`, `עמוד קישורים לעסק`, `שלט NFC לעסק` |

These are investigation candidates, not verified search-volume claims. Keep VibyTap positioned as an in-store NFC/QR sign and links page rather than a digital business card. Keep VibyRate's honest-review safeguards.

### Changes and tasks

- [ ] Maintain a backlog with grouped spelling variants, intent, preferred page, query/customer evidence, proposed change, conversion relevance, and review date.
- [ ] Prioritize commercially relevant queries with impressions and positions around 8–30, then relevant queries with weak CTR.
- [ ] Improve an existing page when the intent matches; create a separate guide only for a distinct demonstrated need.
- [ ] Group transliterations and singular/plural variants without creating duplicate pages for each spelling.
- [ ] Publish at most two evidence-supported guides, with original examples, product links, metadata, and sitemap entries.
- [ ] Review each change after a complete measurement window, checking which page attracts the query and whether contact actions improve.

**Acceptance criteria:** Every implemented content change has documented query evidence or a recurring customer question, one intended destination, and a review date. No publishing quota overrides relevance or evidence.

**Outcome to monitor:** Relevant non-branded impressions, clicks, and qualified contact actions compared with the refreshed baseline.

## Problem 8: AI discoverability and ongoing reporting

**Objective:** Measure whether search-enabled AI systems can find, identify, and cite Viby accurately.

**Affected pages/systems:** Published marketing pages, robots/hosting controls, search-enabled ChatGPT, Google AI features where available, and consented referral analytics.

**Dependencies:** Public pages and access to the chosen search experiences. Start baseline observations immediately and repeat at days 30, 60, and 90.

### Changes and tasks

- [ ] Verify Googlebot, Bingbot, and OAI-SearchBot are permitted by applicable robots and hosting controls. A spoofed user-agent fetch alone does not prove verified crawler access.
- [ ] Retain readable textual definitions, descriptive headings, accurate product facts, and evidence-backed examples. Validate current official crawler guidance when implementing any policy change.
- [ ] Test the five mandatory branded phrases in fresh search-enabled sessions, recording date, exact prompt, product/mode, Viby mention, cited URL, and factual accuracy.
- [ ] Repeat the same three questions: `מה זה וייבי?`, `איזו מערכת כרטיסיות דיגיטליות מתאימה לבית קפה בישראל?`, and `איך אפשר להפעיל מועדון לקוחות בלי שהלקוח יוריד אפליקציה?`.
- [ ] Record unavailable AI features as unavailable; distinguish mentions from citations and marketing citations from platform URLs.
- [ ] Report consented AI referral sessions and contact actions separately from Google organic traffic, noting unattributed or missing referrals.
- [ ] Review company/product inaccuracies against public source content and prioritize factual corrections.
- [ ] Produce day-30, day-60, and day-90 reports and continue monthly thereafter.

**Acceptance criteria:** Repeatable observations and referral reporting exist, with fixed prompts and dated results. Manual samples are not presented as universal AI rankings. No claim of guaranteed AI inclusion follows from crawler access or schema changes.

**Outcome to monitor:** Accurate company/product identification, citations to the appropriate marketing pages, and qualified referral visits when available.

## Verification and release gates

Apply these checks to each relevant implementation task rather than waiting for all eight problems to finish:

- [ ] Run lint, production build, local SEO audit, and `git diff --check` for website changes.
- [ ] Extend the existing audit for new routes, phrase coverage, unique metadata, one H1, canonicals, structured-data identity, sitemap entries, maintained modification dates, and working internal links.
- [ ] Verify affected layouts on mobile and desktop in RTL, including keyboard navigation and visible text without client-side JavaScript.
- [ ] Preserve consent behavior and event meanings; add controlled CTA locations for new pages without leaking personal information or inventing product attribution.
- [ ] After deployment, run the production SEO audit and inspect new or substantially changed URLs before the single indexing request.
- [ ] For platform-domain work, separately verify business login, administrator login, customer entry, callbacks, and absence of redirect loops.

New page URLs and internal content/configuration types are the planned interface additions. Existing product routes and public lead API behavior remain compatible.

## Measuring completion and results

An implementation checkbox means the work and its applicable verification are complete. It does not mean Google has indexed the page, granted a ranking, or an AI system has cited it. Track external outcomes separately with observation dates and exact statuses.

| Measure | Desired result | Evidence |
|---|---|---|
| Mandatory phrase coverage | Five phrases present on assigned canonical pages | Production HTML audit |
| Indexing | Five product pages and published new pages indexed | Search Console URL Inspection; exclusions documented with next actions |
| Branded Google discovery | Viby appears for all five phrases; top three is the target | Dated query observations and Search Console query/page data |
| Non-branded discovery | Growth in relevant impressions and clicks | Complete 28-day Search Console comparisons |
| Qualified interest | Growth in consented contact actions and successful leads | Existing GA4 event contract, reported separately |
| AI discovery | Correct identity and appropriate marketing citations when surfaced | Fixed-prompt observations and referral analytics |

Recheck indexing seven days after a release/request, review directional query data after fourteen days, and assess a complete twenty-eight-day window before routine retargeting. Compare complete periods and separate branded from non-branded queries. Treat missing/anonymized query rows and low traffic as insufficient evidence rather than zero demand. Set numerical growth targets after refreshing the baseline; do not invent them from the old small sample.

## Assumptions and boundaries

- The first implementation task is Problem 1; it does not wait for case-study material.
- The homepage remains the punch-card page; the new category page owns broad category intent.
- Company facts, customer identity, screenshots, and numerical evidence need owner approval before publication.
- A named customer with metrics is expected, but no particular customer or outcome is assumed to be verified yet.
- Changes to platform routes require a separately scoped platform task and dependency checks.
- Outreach and profile updates are tracked as external work, not silently executed with website changes.
- Dates are relative to implementation and individual release/request dates. No automatic scheduled task is created by this document.
