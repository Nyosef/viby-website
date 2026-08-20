# Hebrew SEO: Current Situation and Main Problems

**Audit date:** 12 August 2026  
**Website:** `https://joinviby.co.il`  
**Scope:** Hebrew organic-search readiness for the public marketing website  

**Status:** Living SEO problem and delivery tracker

**Last updated:** 16 August 2026

Checklist convention:

- `[x]` Developed and verified in the repository.
- `[ ]` Not yet completed or dependent on post-deployment/external work.

## 1. Executive summary

The website has a sound technical SEO foundation, especially for an implementation that was launched only a few days before this audit. The important commercial pages are publicly accessible, statically rendered, indexable, canonicalized, described with unique Hebrew metadata, and included in the sitemap. The canonical-host redirects, 404 behavior, preview protection, structured data, and automated SEO checks are also working.

The website should nevertheless be described as **SEO-ready, not yet SEO-performing**. The current implementation makes the pages eligible to be crawled and indexed, but eligibility alone does not create rankings. The tracked weaknesses are:

- [x] Connect the five product pages with normal, descriptive, crawlable HTML links.
- [x] Align visible Hebrew page content with the useful phrases currently targeted in metadata.
- [x] Expand product content beyond sales-landing-page depth to answer pre-purchase questions.
- [ ] Establish Search Console indexing and query-data visibility.
- [ ] Add stronger first-party evidence, authority, and trust content.
- [ ] Establish an operating process for choosing, measuring, and improving Hebrew search topics.

The highest-value first phase is therefore not a redesign and not more metadata. It is to improve page discovery, align each page with one clear Hebrew search intent, submit and inspect the URLs in Search Console, and add genuinely useful information to the commercial pages.

## 2. Audit method and limitations

This assessment used four evidence sources:

- Inspection of the Next.js source responsible for metadata, routing, sitemap generation, robots directives, structured data, visible content, and redirects.
- A production build followed by the repository's automated SEO audit.
- Direct inspection of the HTML and HTTP behavior returned by the live production domain.
- Sampled public web searches for the brand, indexed-domain results, and relevant Hebrew commercial queries.

The production build completed successfully. The automated audit passed all nine canonical routes and its redirect, robots, sitemap, schema, 404, and preview-host checks.

This assessment does **not** have access to the site's Google Search Console property. Consequently, it cannot confirm Google's exact index coverage, query impressions, average positions, clicks, CTR, manual actions, crawl history, or field Core Web Vitals. Sampled public searches did not surface `joinviby.co.il`, but that is an early-warning observation rather than definitive proof that Google has not indexed any URL.

Google advises that crawling and reprocessing changes can take from several days to several weeks. A site whose SEO was installed only days ago should therefore be judged first on technical readiness and then on Search Console evidence collected over time.

## 3. Current technical baseline

### 3.1 Commercial pages

The website currently has five dedicated commercial URLs:

| Product | Canonical URL | Current title |
|---|---|---|
| Digital punch card | `/` | `כרטיסייה דיגיטלית לעסק | Viby` |
| Smart wheel | `/smart-wheel` | `גלגל מזל דיגיטלי לעסקים | Viby` |
| Digital wallet / gift card | `/digital-wallet` | `כרטיס מתנה דיגיטלי לעסק | Viby` |
| Google review NFC card | `/viby-rate` | `כרטיס NFC לביקורות גוגל לעסק | Viby` |
| NFC links page | `/viby-tap` | `שלט NFC ועמוד קישורים לעסק | Viby` |

All five returned HTTP `200` during the audit. Completed technical foundations:

- [x] One unique Hebrew title per page.
- [x] One unique meta description per page.
- [x] One H1 per page.
- [x] A self-referencing absolute canonical URL.
- [x] `lang="he-IL"` and `dir="rtl"` on the document.
- [x] Index/follow instructions.
- [x] Open Graph and Twitter metadata.
- [x] Server-rendered Hebrew content in the initial HTML.
- [x] Valid JSON-LD serialization.

### 3.2 Crawl and canonical controls

- [x] `robots.txt` allows the public website and disallows `/api/`.
- [x] `robots.txt` advertises `https://joinviby.co.il/sitemap.xml`.
- [x] The sitemap contains the five product URLs plus support, how-it-works, terms, and privacy.
- [x] `www.joinviby.co.il` redirects to the non-`www` canonical host with HTTP `308`.
- [x] The Vercel production alias redirects to the canonical domain with HTTP `308`.
- [x] Unknown URLs return HTTP `404` and include `noindex, nofollow`.
- [x] Vercel preview hosts and API responses receive `X-Robots-Tag: noindex, nofollow, noarchive`.
- [x] Product routes are statically generated, reducing dependence on JavaScript rendering for primary content.

These controls are strong and should be preserved during subsequent work.

## 4. Problem 1: Weak crawlable internal linking

**Status:** Resolved in the repository on 12 August 2026 and verified in production on 13 August 2026

**Severity before resolution:** High

**Effort to improve:** Low  
**Affected URLs:** All five product pages

### 4.1 Evidence

The service selectors in `MultiServiceLanding` are implemented as buttons that call `router.push(...)`. The URL changes correctly for a user, but the initial HTML does not contain ordinary anchor links for the other product pages.

The rendered homepage exposes only a small set of internal anchors, primarily the logo/home link, privacy, support, and terms. Product pages follow the same pattern. In practical terms, the sitemap is doing nearly all of the work of exposing the product URLs to crawlers.

The homepage JSON-LD `ItemList` contains product URLs, but structured data should not replace visible, crawlable site navigation.

### 4.2 Why it matters

Internal links serve three separate SEO functions:

1. They help crawlers discover and recrawl pages.
2. Their anchor text helps search engines understand what the destination page is about.
3. They communicate the relative importance and relationship of pages inside the website.

Google states that it can generally crawl a link when it is an `<a>` element with an `href`, while links implemented only through script events may not be reliably extracted. The current product switcher is therefore a usability control, but not a strong SEO navigation system.

### 4.3 Implemented solution

- [x] Preserved both existing interactive service selectors and their visual, URL, scroll, and keyboard behavior.
- [x] Added a permanently rendered "פתרונות נוספים לעסק" section to every commercial product page.
- [x] Added four related-product cards on each page, excluding the current product.
- [x] Added all five product links to the commercial-page footer.
- [x] Split the footer into labelled `פתרונות Viby` and `קישורים שימושיים` navigation groups.
- [x] Marked the current footer product with `aria-current="page"`.
- [x] Centralized descriptive Hebrew link labels in the product SEO configuration:
  - `כרטיסייה דיגיטלית לעסק`
  - `גלגל מזל דיגיטלי לעסקים`
  - `כרטיס מתנה דיגיטלי לעסק`
  - `כרטיס NFC לביקורות גוגל`
  - `שלט NFC ועמוד קישורים לעסק`
- [x] Added a crawlable footer link to `/how-it-works`.
- [x] Added responsive four-, two-, and one-column related-card layouts.
- [x] Added visible keyboard focus states and reduced-motion handling.
- [x] Avoided invisible SEO-only navigation and legacy `?service=` product URLs.

### 4.4 Acceptance criteria

- [x] Every commercial page contains normal anchors to every other commercial page in its server-rendered HTML.
- [x] Link labels explain the subject of their destination without relying on surrounding JavaScript state.
- [x] Links remain usable without client-side JavaScript because they are present in the initial static HTML.
- [x] No new duplicate or query-string product URLs are created.
- [x] Product destinations resolve directly with HTTP `200` in the automated audit.
- [x] The automated SEO report checks all expected product labels and links.
- [x] The automated SEO report checks `/how-it-works` and rejects legacy service-query links.
- [x] ESLint, the production build, the SEO audit, and `git diff --check` pass.

### 4.5 Remaining external follow-up

- [x] Confirmed all five product links and `/how-it-works` in the deployed production HTML on every commercial page; no legacy `?service=` product links were present.
- [ ] Inspect one commercial URL in Google Search Console to confirm Google sees the rendered links.
- [ ] Request one recrawl for each of the five commercial pages after deployment.

## 5. Problem 2: Metadata and visible Hebrew terminology are not fully aligned

**Status:** Resolved in the repository on 13 August 2026

**Severity before resolution:** High

**Effort to improve:** Low to medium

**Affected URLs:** All five commercial pages

### 5.1 Search-intent decisions

Each commercial route now owns one distinct primary Hebrew intent. Supporting terminology is included only where it accurately describes the same product.

| Route | Primary intent | Supporting terminology | Intentionally excluded positioning |
|---|---|---|---|
| `/` | `כרטיסייה דיגיטלית לעסק` | `כרטיס ניקוב דיגיטלי`, `כרטיסיית נאמנות דיגיטלית`, `כרטיסיית נייר` | Broad ownership of `מועדון לקוחות לעסק` |
| `/smart-wheel` | `גלגל מזל דיגיטלי לעסקים` | `משחק פרסים לעסק`, `משחק שיווקי לעסק`, `גלגל חכם`, `QR` | Event wheels, ecommerce popups, and generic raffle software |
| `/digital-wallet` | `כרטיס מתנה דיגיטלי לעסק` | `מערכת כרטיסי מתנה לעסק`, `יתרה עם בונוס`, `Apple Wallet`, `Google Wallet` | Generic financial or payment-wallet searches |
| `/viby-rate` | `כרטיס NFC לביקורות גוגל` | `שלט NFC לביקורות גוגל`, `כרטיס ביקורות גוגל לעסק`, `Google Reviews` | Purchased, incentivized, filtered, or guaranteed reviews |
| `/viby-tap` | `שלט NFC לעסק` | `עמוד קישורים לעסק`, `מדבקת NFC לעסק`, `QR לעסק` | `כרטיס ביקור דיגיטלי`, because VibyTap is an in-store sign or sticker |

### 5.2 Implemented alignment

- [x] Replaced the general intent arrays with a documented `primaryIntent` and `supportingIntents` for every product.
- [x] Aligned every metadata title and description with its page's approved primary intent.
- [x] Rewrote every H1 as a hybrid category-and-benefit heading.
- [x] Added the primary intent and accurate supporting variants to the visible hero and section copy.
- [x] Kept the selector labels `גלגל חכם`, `ארנק דיגיטלי`, `VibyRate`, and `VibyTap` as short product names rather than competing search targets.
- [x] Positioned the wallet as a digital gift-card system supporting both gifts and self-purchased credit with a bonus.
- [x] Positioned VibyTap as an in-store NFC/QR sign and links page, not a digital business card.
- [x] Standardized VibyRate's primary Hebrew wording on `גוגל` while retaining `Google Reviews` naturally in supporting content.
- [x] Preserved VibyRate's honest-review language and its explicit statement that the product does not promise ratings.
- [x] Updated the VibyTap internal-link label to `שלט NFC ועמוד קישורים לעסק` across related cards and the footer.

### 5.3 Structured-data alignment

- [x] Changed each `Service` schema name from the short selector label to the matching unbranded SEO title.
- [x] Preserved the short product label as `alternateName`.
- [x] Changed each `Service` schema description to the matching meta description.
- [x] Updated the homepage product `ItemList` to use the centralized internal-link labels and SEO descriptions.

### 5.4 Automated regression coverage

- [x] Added exact per-route expectations for the title, meta description, H1, primary intent, supporting terms, internal-link label, and structured-data fields.
- [x] Required every approved term to appear in visible body text after scripts, styles, JSON-LD, comments, and markup are excluded.
- [x] Added a guard preventing VibyTap from being described as `כרטיס ביקור דיגיטלי`.
- [x] Preserved all metadata, canonical, internal-link, redirect, sitemap, robots, preview, schema-serialization, and 404 checks.
- [x] Kept the audit focused on term presence rather than phrase density or keyword repetition.

### 5.5 Acceptance criteria

- [x] Every product page has one documented, distinct primary Hebrew intent and accurate supporting variants.
- [x] Titles, H1s, introductions, supporting headings, internal links, descriptions, and `Service` schema describe the same core product.
- [x] Approved phrases are present in the initial server-rendered visible HTML.
- [x] Copy remains natural Hebrew and retains the strongest conversion benefit in each hero.
- [x] No page is deliberately assigned another Viby page's primary intent.
- [x] Existing routes, canonical URLs, interactive selectors, CTA behavior, and crawlable product navigation remain unchanged.
- [x] ESLint, the production build, the SEO audit, static-HTML inspection, and `git diff --check` pass.

### 5.6 Remaining post-deployment follow-up

- [ ] Confirm the revised metadata, H1s, visible phrases, internal labels, and structured data in production HTML.
- [ ] Inspect the five revised URLs in Google Search Console and request one recrawl after deployment.
- [ ] Review query impressions, title rewrites, CTR, and cannibalization after 14–28 days of data.

## 6. Problem 3: Commercial pages do not yet answer the full buying journey

**Status:** Resolved in the repository on 16 August 2026

**Severity:** Medium to high  
**Effort to improve:** Medium  
**Affected URLs:** All five product pages

### 6.1 Evidence

The product pages contain roughly 360-460 Hebrew word tokens in the rendered body. They explain the basic experience, benefits, steps, and price, but remain primarily short sales pages.

Important questions are absent or answered only indirectly:

- What exactly does the business receive?
- How long does setup take?
- What hardware or printed material is included?
- Which phones and wallet products are supported?
- Does the customer or staff need an app?
- How does the employee validate a punch, reward, gift balance, or review action?
- Does the solution work for multiple branches?
- What customer information is collected?
- Can designs, rewards, destinations, or links be changed later?
- What happens if a customer changes phones?
- How are abuse, duplicate claims, or mistaken redemptions handled?
- What is included in the monthly price and what has a one-time cost?
- Which business categories are the best fit?
- How is this better than paper cards, generic QR codes, or another loyalty platform?

Competitors visible for relevant Hebrew searches provide longer explanations, FAQs, pricing details, product specifications, and use cases. Word count itself is not a ranking objective, but unanswered questions make a page less complete and less useful.

### 6.2 Implemented solution

- [x] Added one centralized buying-guide model to the shared product-content configuration.
- [x] Added a product definition and explicit best-fit business categories to every commercial page.
- [x] Added a visible "מה העסק מקבל" section describing the digital and physical deliverables.
- [x] Documented the customer, authorized employee, and owner workflow for every product.
- [x] Added purchase facts covering starting price, guided setup, compatibility, customer registration or data, support, changes, and multiple branches.
- [x] Published the approved guided setup promise: after all required business details, branding, and settings are received, the digital product is launched by the next business day.
- [x] Kept physical production and delivery timing separate from the digital setup promise for VibyRate and VibyTap.
- [x] Preserved the starting prices of 69 ₪ per month for the punch card and 49 ₪ per month for each other tool, without implying that physical products, processing fees, or extra branches are included.
- [x] Added a factual comparison with the simpler alternative for each product without naming competitors or adding performance claims.
- [x] Added six unique Hebrew pre-purchase FAQs to every product page.
- [x] Used native `details` and `summary` elements so questions and answers remain available in the initial HTML without JavaScript.
- [x] Linked data explanations to the privacy policy and operational-recovery answers to support.
- [x] Kept phone-recovery language conditional on the device and Wallet provider rather than promising automatic restoration.
- [x] Kept punch, reward, and balance actions staff-controlled and described correction as support-assisted without claiming automatic fraud prevention.
- [x] Preserved the existing customer-logo strip as the only first-party proof and did not introduce testimonials or unsupported results.
- [x] Did not add product `FAQPage` structured data because the content is intended for buyers rather than rich-result eligibility.

### 6.3 Product-specific coverage

| Route | Definition and comparison | Key purchase coverage |
|---|---|---|
| `/` | Digital loyalty card compared with a paper punch card | 69 ₪ starting price, staff punches, Wallet compatibility, name and phone, phone recovery |
| `/smart-wheel` | Configurable digital prize game compared with a generic discount or manual raffle | 49 ₪ starting price, prizes and probabilities, staff validation, browser use, customer details |
| `/digital-wallet` | Digital gifts and stored value compared with a printed voucher or manual balance | 49 ₪ starting price, gifting and self-purchase, payments, Wallet storage, staff balance updates |
| `/viby-rate` | Branded NFC/QR review product compared with manual search or a generic QR | Separate physical cost and delivery, NFC fallback, no battery, no registration, honest-review safeguards |
| `/viby-tap` | Editable branded links hub compared with a single static QR | Separate physical cost and delivery, editable links, NFC/QR compatibility, branch-specific pages |

### 6.4 Repository acceptance criteria

- [x] Every commercial page answers the main questions raised before purchase.
- [x] Claims use approved Viby facts and avoid unsupported performance, delivery, payment-processing, compatibility, or fraud-prevention guarantees.
- [x] Buying content is unique to each product and does not copy competitor text.
- [x] Every page exposes exactly six visible FAQs in its server-rendered HTML.
- [x] Pricing, compatibility, data, setup, comparison, operational roles, and FAQ questions are protected by the automated SEO audit.
- [x] Existing metadata, schema, routes, selectors, CTAs, crawlable internal links, sitemap, redirects, robots, preview protection, and 404 behavior remain intact.
- [x] ESLint, the production build, the SEO audit, static-HTML inspection, and `git diff --check` pass.

Pricing, setup, compatibility, and operational copy are owned by the product and marketing team and must be reviewed whenever the product changes and at least quarterly.

### 6.5 Remaining post-deployment follow-up

- [ ] Confirm all five buying guides, purchase facts, comparisons, and FAQs in production HTML.
- [ ] Inspect the five revised URLs in Google Search Console and request one recrawl after deployment.
- [ ] Review question-based queries, supporting terms, CTR, title rewrites, organic lead actions, and cannibalization after 14–28 days.

## 7. Problem 4: Indexing and performance cannot yet be measured reliably

**Severity:** High for measurement, unknown for actual indexing  
**Effort to improve:** Low if Search Console access exists

### 7.1 Evidence

- Sampled public searches did not surface the domain for `site:` or selected branded/product searches.
- The site has a valid public sitemap, but this audit cannot confirm that it has been submitted in Google Search Console.
- The live page includes GA4, but analytics alone does not provide index coverage, impressions, average position, or Google query data.
- No Search Console export was available for this report.
- Field Core Web Vitals and Page Experience were not available. A PageSpeed API attempt was quota-limited, so no score is recorded here.

### 7.2 Recommended direction

- Verify a domain-level Search Console property, preferably using DNS verification.
- Submit `https://joinviby.co.il/sitemap.xml`.
- Use URL Inspection for the five product pages.
- Request indexing once for each page after verifying that the live HTML is correct.
- Record whether each URL is:
  - Discovered
  - Crawled
  - Indexed
  - Selected as canonical
  - Excluded, and for what reason
- Connect Search Console to GA4 if operationally useful.
- Define conversion events for WhatsApp clicks, telephone clicks, and lead submissions.
- Capture mobile Core Web Vitals from Search Console once enough field data exists.

Repeated indexing requests should not be used as a substitute for internal links, useful content, or authority. Google states that repeated requests do not make crawling faster and that indexing is not guaranteed.

### 7.3 Acceptance criteria for a future PRD

- [ ] Search Console domain ownership and a backup Viby-controlled owner are confirmed.
- [ ] The sitemap shows a successful Search Console fetch.
- [ ] All five product URLs have a documented inspection result and successful live test.
- [ ] Search Console is linked to the production GA4 stream.
- [ ] GA4 custom dimensions and the separate `contact_intent` and `generate_lead` key events are confirmed in the property.
- [x] The briefly enabled Vercel Speed Insights service was disabled before collecting data and removed from the repository; Search Console remains the field-performance source.
- [x] Organic contact and successful-lead instrumentation is implemented in the repository.
- [x] Accurate commercial sitemap modification dates and a read-only production audit are implemented.
- [x] A detailed operating runbook and dated Day 0 baseline exist for indexing, search, conversions, and Core Web Vitals.

### 7.4 Repository implementation completed on 17 August 2026

- [x] Preserved explicit GA4 consent and added `click_phone` plus a channel-neutral `contact_intent` event.
- [x] Added controlled CTA locations and canonical product/page parameters without analytics PII or WhatsApp message data.
- [x] Preserved `click_whatsapp` history and successful-API-only `generate_lead` behavior.
- [x] Kept paid performance monitoring out of the implementation; Search Console insufficient-data states are documented without substituting a paid service.
- [x] Added product-only `2026-08-16` sitemap dates and prevented fabricated non-product dates.
- [x] Added `npm run seo:report:production` for repeatable, non-mutating production verification.
- [x] Added `plans/hebrew-seo-indexing-measurement-runbook.md` and `plans/hebrew-seo-baseline-2026-08-17.md`.

Problem 4 remains **open** until the authenticated Search Console and GA4 acceptance items above are complete. Repository instrumentation is not evidence that Google has indexed a URL or that account-level configuration is active.

## 8. Problem 5: Limited authority, proof, and company trust content

**Severity:** Medium  
**Effort to improve:** Medium  
**Affected URLs:** Site-wide

### 8.1 Evidence

The site contains a customer-logo strip and Organization structured data, but it does not currently provide substantial evidence explaining who Viby is, what has been implemented, or what customers achieved.

Notable gaps include:

- No dedicated About page.
- No named team or company background.
- No detailed customer case study.
- No customer quotes with context.
- No implementation screenshots tied to a real business story.
- No visible first-party results such as adoption, repeat visits, redemption, or review-volume change.
- No evidence in this audit of links from customers, partners, press, directories, or other relevant Israeli websites.

### 8.2 Why it matters

For a new commercial domain, good metadata is not enough to outrank established sites. Useful first-party information differentiates the website from generic product copy and gives customers and external sites something worth referencing.

### 8.3 Recommended direction

- Create an `אודות Viby` page with real company and contact information.
- Publish one detailed customer story before creating a large generic blog.
- Use only verified metrics and explain the measurement period and context.
- Link customer logos to relevant case studies when permission exists.
- Ask customers and partners to link to the most relevant Viby product page when there is a genuine relationship.
- Ensure the business name, domain, phone, and social profiles are consistent across external profiles.

### 8.4 Acceptance criteria for a future PRD

- The site contains a credible About page linked from global navigation or footer.
- At least one real case study explains the problem, setup, experience, and result.
- Testimonials include a customer or business identity when permission is available.
- Unsupported marketing statistics are not introduced.
- External-link activity is relationship-based and does not involve purchased or manipulative link schemes.

## 9. Problem 6: No documented Hebrew keyword and iteration process

**Severity:** Medium  
**Effort to improve:** Low to establish; ongoing thereafter

### 9.1 Current starting clusters

The following are hypotheses for investigation, not claims about search volume:

| Page | Primary starting topic | Supporting variants to investigate |
|---|---|---|
| `/` | `כרטיסייה דיגיטלית לעסק` | `כרטיס ניקובים דיגיטלי`, `כרטיסיית נאמנות`, `מועדון לקוחות לעסק`, `מערכת שימור לקוחות` |
| `/smart-wheel` | `גלגל מזל דיגיטלי לעסקים` | `גלגל מזל לעסק`, `משחק שיווקי לעסק`, `משחק פרסים לעסק` |
| `/digital-wallet` | `כרטיס מתנה דיגיטלי לעסק` | `גיפט קארד לעסק`, `שובר מתנה דיגיטלי`, `כרטיס הטבות בארנק דיגיטלי` |
| `/viby-rate` | `כרטיס NFC לביקורות גוגל` | `שלט NFC לביקורות`, `כרטיס ביקורות גוגל`, `איך להגדיל ביקורות בגוגל` |
| `/viby-tap` | To be validated | `כרטיס NFC לעסק`, `כרטיס ביקור דיגיטלי`, `עמוד קישורים לעסק`, `כרטיס ביקור NFC` |

### 9.2 Recommended decision process

After 14-28 days of Search Console data:

1. Export queries and landing pages.
2. Group query variants by meaning rather than treating every spelling as a separate topic.
3. Separate business-owner purchase intent from consumer searches and informational research.
4. Identify relevant queries with impressions and positions roughly 8-30; these are often the best early improvement candidates.
5. Identify pages with impressions but unusually low CTR and evaluate their title/snippet proposition.
6. Confirm that each commercial query cluster has one preferred landing page.
7. Prioritize topics that are both relevant to the offer and capable of producing a qualified lead.
8. Review results every two to four weeks, avoiding daily reaction to position volatility.

Potential spelling and vocabulary variants should include Hebrew wording, English product names, transliterations, singular/plural forms, and the language owners actually use in sales conversations.

## 10. Lower-priority observations

These items may be useful, but they should not displace the high-priority work above:

- All product pages currently share the same Open Graph image. Product-specific images could improve social-share clarity but are unlikely to materially change rankings.
- Self-referencing `hreflang="he-IL"` is valid but largely redundant while Hebrew is the only language version.
- The sitemap now publishes maintained `lastmod` dates for the five commercial pages only. Support, how-it-works, terms, and privacy remain undated so that the sitemap does not invent freshness.
- Terms and privacy pages are indexable and included in the sitemap. This is not a material problem for a website of this size, though the sitemap could eventually focus more narrowly on search-relevant pages.
- Structured data is technically sound, but it should not be treated as a substitute for visible content, internal links, or authority.
- The meta-keywords list has no Google ranking value and should not consume optimization time.

## 11. Recommended delivery sequence

### Phase 1: Discovery and alignment

- [ ] Search Console owner confirmation, sitemap submission, and URL inspection.
- [x] Crawlable product navigation and footer links.
- [x] One documented search intent per product page.
- [x] H1, introduction, and supporting-copy alignment.
- [x] Extend automated SEO checks to cover crawlable product links.

### Phase 2: Page usefulness and conversion evidence

- [x] Product-specific FAQs.
- [x] Operational and compatibility details.
- [x] Clearer pricing inclusions and purchase expectations.
- [ ] About/company page.
- [ ] First customer case study.
- [x] Organic conversion tracking instrumentation.
- [ ] GA4 custom dimensions, key events, retention, DebugView validation, and Search Console linkage.

### Phase 3: Data-led content and authority

- [ ] Review 14-28 days of Search Console query data.
- [ ] Refine page targets without creating internal competition.
- [ ] Publish only content that answers a demonstrated customer question or search opportunity.
- [ ] Build legitimate links through customers, partners, profiles, and original first-party material.
- [ ] Monitor Core Web Vitals and fix only evidence-backed performance problems.

## 12. Suggested PRD split

The problems are best converted into several focused PRDs rather than one broad SEO project:

- [x] **PRD: Crawlable service navigation and internal-link architecture**
- [x] **PRD: Hebrew query targeting and on-page copy alignment**
- [x] **PRD: Product FAQ and buying-information expansion**
- [ ] **PRD: Search Console baseline and organic conversion measurement**
- [ ] **PRD: About page, customer proof, and first case study**

The first two PRDs are the recommended starting point because they combine high expected impact with relatively low implementation effort.

## 13. Reference guidance

- Google Search Central: [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- Google Search Central: [SEO link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- Google Search Central: [Ask Google to recrawl URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- Google Search Central: [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Google Search Central: [Influencing title links](https://developers.google.com/search/docs/appearance/title-link)
- Google Search Central: [Meta description guidance](https://developers.google.com/search/docs/appearance/snippet)
- Google Search Central: [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google Search Central: [FAQ and HowTo rich-result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- Google Search Central: [Google does not use the meta-keywords tag](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)
