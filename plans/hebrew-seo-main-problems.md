# Hebrew SEO: Current Situation and Main Problems

**Audit date:** 12 August 2026  
**Website:** `https://joinviby.co.il`  
**Scope:** Hebrew organic-search readiness for the public marketing website  
**Status:** Problem-definition document. This is not yet a PRD or implementation specification.

## 1. Executive summary

The website has a sound technical SEO foundation, especially for an implementation that was launched only a few days before this audit. The important commercial pages are publicly accessible, statically rendered, indexable, canonicalized, described with unique Hebrew metadata, and included in the sitemap. The canonical-host redirects, 404 behavior, preview protection, structured data, and automated SEO checks are also working.

The website should nevertheless be described as **SEO-ready, not yet SEO-performing**. The current implementation makes the pages eligible to be crawled and indexed, but eligibility alone does not create rankings. The main weaknesses are:

1. The five product pages are not connected by normal crawlable HTML links.
2. Several pages target useful Hebrew phrases in their metadata but do not use those phrases clearly in the visible page content.
3. Product content is still at sales-landing-page depth and does not answer enough pre-purchase questions.
4. Search Console indexing and query data have not been included in the audit, so actual Google visibility cannot yet be measured.
5. The website has limited first-party evidence, authority, and trust content.
6. There is not yet an operating process for choosing, measuring, and improving Hebrew search topics.

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
| Digital wallet / gift card | `/digital-wallet` | `כרטיס מתנה דיגיטלי וארנק דיגיטלי לעסק | Viby` |
| Google review NFC card | `/viby-rate` | `כרטיס NFC לביקורות Google לעסק | Viby` |
| NFC links page | `/viby-tap` | `כרטיס NFC ועמוד קישורים לעסק | Viby` |

All five returned HTTP `200` during the audit. Each returned:

- One unique Hebrew title.
- One unique meta description.
- One H1.
- A self-referencing absolute canonical URL.
- `lang="he-IL"` and `dir="rtl"` on the document.
- Index/follow instructions.
- Open Graph and Twitter metadata.
- Server-rendered Hebrew content in the initial HTML.
- Valid JSON-LD serialization.

### 3.2 Crawl and canonical controls

- `robots.txt` allows the public website and disallows `/api/`.
- `robots.txt` advertises `https://joinviby.co.il/sitemap.xml`.
- The sitemap contains the five product URLs plus support, how-it-works, terms, and privacy.
- `www.joinviby.co.il` redirects to the non-`www` canonical host with HTTP `308`.
- The Vercel production alias redirects to the canonical domain with HTTP `308`.
- Unknown URLs return HTTP `404` and include `noindex, nofollow`.
- Vercel preview hosts and API responses receive `X-Robots-Tag: noindex, nofollow, noarchive`.
- Product routes are statically generated, reducing dependence on JavaScript rendering for primary content.

These controls are strong and should be preserved during subsequent work.

## 4. Problem 1: Weak crawlable internal linking

**Severity:** High  
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

### 4.3 Recommended direction

- Make every service option a real Next.js `Link` or place a crawlable link inside the option.
- Preserve the current visual behavior while ensuring the URL is present in the initial HTML.
- Add a visible "פתרונות נוספים לעסק" section to every product page.
- Add all five product links to the global footer.
- Use descriptive Hebrew anchors, for example:
  - `כרטיסייה דיגיטלית לעסק`
  - `גלגל מזל דיגיטלי לעסקים`
  - `כרטיס מתנה דיגיטלי לעסק`
  - `כרטיס NFC לביקורות גוגל`
  - `כרטיס NFC ועמוד קישורים לעסק`
- Add a crawlable link to `/how-it-works` from the commercial-page navigation or footer.

### 4.4 Acceptance criteria for a future PRD

- Every commercial page contains normal anchors to every other commercial page in its server-rendered HTML.
- Link labels explain the subject of their destination without relying on surrounding JavaScript state.
- Links remain usable with JavaScript disabled.
- No new duplicate or query-string product URLs are created.
- The automated SEO report checks the expected product links.

## 5. Problem 2: Metadata and visible Hebrew terminology are not fully aligned

**Severity:** High  
**Effort to improve:** Low to medium  
**Affected URLs:** Primarily `/smart-wheel`, `/digital-wallet`, `/viby-rate`, and `/viby-tap`

### 5.1 Evidence by page

#### Homepage: digital punch cards

The page strongly uses `כרטיסיות דיגיטליות`, which is good. However, the adjacent target phrase `כרטיס ניקובים דיגיטלי` appears in SEO configuration but not in the visible body. The page should explain naturally that the product replaces a paper punch card and is also known as a digital punch/stamp card.

#### Smart wheel

The title targets `גלגל מזל דיגיטלי לעסקים`, while the H1 and body repeatedly use the branded phrase `גלגל חכם`. The exact phrase `גלגל מזל` was absent from the rendered body during the audit.

This creates a mismatch between the wording used by a potential searcher and the wording emphasized by the page. `גלגל חכם` can remain the product name, but the page should clearly explain that it is a digital prize or fortune wheel for businesses.

#### Digital wallet / gift card

The title targets `כרטיס מתנה דיגיטלי`, but the exact phrase was absent from the rendered body. The H1, `משלמים 200 ₪. מקבלים 230 ₪ לארנק.`, is persuasive campaign copy but does not independently describe the product.

The current page also combines two potentially different intents:

- A business looking for a system that sells and manages digital gift cards.
- A business looking for general Apple Wallet or Google Wallet capabilities.

The primary intent should be chosen explicitly. Based on the current offer, `כרטיס מתנה דיגיטלי לעסק` should probably be the lead topic, with wallet support as a major feature rather than a competing primary topic.

#### VibyRate

The page uses `ביקורות Google`, while many Israeli users will search with the Hebrew spelling `ביקורות גוגל`. Both forms should appear naturally. The page should also state `כרטיס NFC לביקורות גוגל` prominently in visible text rather than leaving most of that phrase to metadata.

#### VibyTap

The title targets `כרטיס NFC` and `עמוד קישורים לעסק`, but neither exact phrase appeared in the rendered body during the audit. The H1, `כל הקישורים החשובים של העסק במקום אחד.`, describes the benefit but not the product category.

This page may also overlap with the common category `כרטיס ביקור דיגיטלי`. The eventual keyword research should decide whether VibyTap is best positioned as:

- A digital business card.
- An NFC business card.
- An NFC links page.
- A link-in-bio page for physical customer touchpoints.

### 5.2 Why it matters

Google can understand synonyms and does not require exact-match repetition. Nevertheless, a commercial landing page should make its subject unambiguous in its title, H1, introductory paragraph, supporting headings, and internal anchor text. A large mismatch gives Google more reason to rewrite the title or rank a competitor whose page more directly answers the query.

### 5.3 Recommended direction

- Assign one primary Hebrew search intent and two to four supporting variants to every page.
- Make the H1 both persuasive and descriptive.
- Use the primary phrase naturally in the introduction and at least one supporting section.
- Include common Hebrew and English-brand spellings where users genuinely use both, such as `Google` and `גוגל`.
- Do not mechanically repeat phrases and do not optimize the meta-keywords tag; Google does not use it for web rankings.

### 5.4 Acceptance criteria for a future PRD

- Every product page has a documented primary intent and secondary query variants.
- The title, H1, introduction, section headings, and internal links describe the same core product.
- Copy remains natural Hebrew and does not read like a list of keywords.
- A page does not unintentionally compete with another Viby page for the same primary intent.
- Title and H1 changes are reviewed for conversion impact as well as search relevance.

## 6. Problem 3: Commercial pages do not yet answer the full buying journey

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

### 6.2 Recommended direction

Add four types of content to each product page:

1. **Product definition:** A plain-language paragraph stating what the product is, who it is for, and the main outcome.
2. **Operational detail:** What the owner, employee, and customer each do.
3. **Purchase questions:** Setup, price, compatibility, customization, support, and cancellation.
4. **Relevant proof:** A real business example, screenshot, testimonial, or measurable result.

Each page should also include four to six genuine Hebrew FAQs based on sales and support conversations. FAQs should be written for users, not primarily to obtain a rich result. Google generally limits visible FAQ rich results to authoritative government and health sites.

### 6.3 Acceptance criteria for a future PRD

- Each product page answers the questions most frequently asked before purchase.
- Claims are factual, supportable, and specific to Viby.
- Page content does not copy or lightly rewrite competitor content.
- FAQs are visible in the HTML and useful even without structured data.
- Any prices, compatibility claims, or operational promises have a defined owner and update process.

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

- Search Console domain ownership is confirmed.
- The sitemap shows a successful fetch.
- All five product URLs have a documented inspection result.
- Organic landing-page conversions are measurable.
- A baseline report exists for clicks, impressions, CTR, average position, indexed pages, and Core Web Vitals.

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
- The sitemap intentionally omits artificial `lastmod` timestamps. This is preferable to publishing inaccurate dates. Accurate modification dates may be added later if the content system can maintain them.
- Terms and privacy pages are indexable and included in the sitemap. This is not a material problem for a website of this size, though the sitemap could eventually focus more narrowly on search-relevant pages.
- Structured data is technically sound, but it should not be treated as a substitute for visible content, internal links, or authority.
- The meta-keywords list has no Google ranking value and should not consume optimization time.

## 11. Recommended delivery sequence

### Phase 1: Discovery and alignment

1. Search Console verification, sitemap submission, and URL inspection.
2. Crawlable product navigation and footer links.
3. One documented search intent per product page.
4. H1, introduction, and supporting-copy alignment.
5. Extend automated SEO checks to cover crawlable product links.

### Phase 2: Page usefulness and conversion evidence

1. Product-specific FAQs.
2. Operational and compatibility details.
3. Clearer pricing inclusions and purchase expectations.
4. About/company page.
5. First customer case study.
6. Organic conversion tracking.

### Phase 3: Data-led content and authority

1. Review 14-28 days of Search Console query data.
2. Refine page targets without creating internal competition.
3. Publish only content that answers a demonstrated customer question or search opportunity.
4. Build legitimate links through customers, partners, profiles, and original first-party material.
5. Monitor Core Web Vitals and fix only evidence-backed performance problems.

## 12. Suggested PRD split

The problems are best converted into several focused PRDs rather than one broad SEO project:

1. **PRD: Crawlable service navigation and internal-link architecture**
2. **PRD: Hebrew query targeting and on-page copy alignment**
3. **PRD: Product FAQ and buying-information expansion**
4. **PRD: Search Console baseline and organic conversion measurement**
5. **PRD: About page, customer proof, and first case study**

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
