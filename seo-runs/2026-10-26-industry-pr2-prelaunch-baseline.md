# Viby SEO review — 2026-10-26: industry PR 2 prelaunch

**Reviewer:** Codex
**Production deployment / commit:** Existing production site; bakery and salon pages are local drafts, not deployed
**Canonical origin:** `https://joinviby.co.il`
**Search Console property:** `sc-domain:joinviby.co.il` via connected Windsor Search Console
**Search type:** Web
**Current complete 28-day window:** 2026-09-27–2026-10-24
**Previous non-overlapping 28-day window:** not collected for this prelaunch snapshot
**Country/device filters:** All countries and devices
**Export date and raw export filenames:** 2026-10-26; connector response inspected during this run, no raw file export
**Releases, recrawls, campaigns, or tracking changes affecting interpretation:** Bakery and salon URLs are unpublished. Café and car-wash URLs are live; no Search Console page row was returned for either in this query. This is a prelaunch baseline for the two new URLs, measured separately from Phase 1.

Use the definitions in [the existing measurement baseline](./2026-10-25-measurement-baseline.md). A missing page or query row is **not** a measured zero. Search Console anonymizes some queries and its page totals need not sum to property totals.

## Technical and index health

| Check | Current result | Previous result | Evidence / affected URL |
|---|---|---|---|
| Local SEO report | Passed: 16 canonical routes, sitemap, schema, metadata, links, redirects, robots, and 404 checks | not collected | `npm run seo:report` against local production build on 2026-10-26 |
| Production sitemap and URL Inspection | New URLs unpublished; URL Inspection not accessible through the connector | not collected | `/industries/bakeries`, `/industries/hair-salons` |
| Manual actions, Security Issues, HTTPS | not collected | not collected | No account-level inspection access in this run |
| Core Web Vitals | not collected | not collected | No field-data export in this run |

## Search performance

| Segment | Current impressions | Previous impressions | Current clicks | Previous clicks | Current CTR | Previous CTR | Relevant visible query families / notes |
|---|---:|---:|---:|---:|---:|---:|---|
| Whole property, Web | 426 | not collected | 32 | not collected | 7.5% | not collected | Search Console site total |
| Branded visible queries | not aggregated | not collected | not aggregated | not collected | unavailable | unavailable | `viby` alone: 71 impressions, 16 clicks on `/`; other brand variants exist |
| Business-intent non-branded visible queries | not aggregated | not collected | not aggregated | not collected | unavailable | unavailable | `כרטיסיה דיגיטלית` on `/`: 2 impressions, 0 clicks |
| `/` | 157 | not collected | 24 | not collected | 15.3% | not collected | Generic punch-card intent remains assigned here |
| `/customer-retention` | no row returned | not collected | no row returned | not collected | unavailable | unavailable | No page row returned in this response |
| `/industries/cafes` | no row returned | not collected | no row returned | not collected | unavailable | unavailable | Existing published route |
| `/industries/car-washes` | no row returned | not collected | no row returned | not collected | unavailable | unavailable | Existing published route |
| `/industries/bakeries` | not applicable prelaunch | not collected | not applicable prelaunch | not collected | unavailable | unavailable | New URL not published |
| `/industries/hair-salons` | not applicable prelaunch | not collected | not applicable prelaunch | not collected | unavailable | unavailable | New URL not published |
| Other returned pages | see note | not collected | see note | not collected | unavailable | unavailable | `/digital-wallet` 166/1; `/smart-wheel` 39/2; `/viby-rate` 42/1; `/viby-tap` 26/1; `/support` 25/2; `/about` 34/1; `/privacy` 17/0 |

The accessible query/page response contained 25 rows and no visible bakery or salon term. This does not establish zero demand or zero visibility. Keyword Planner was unavailable, and no search-volume estimate is claimed.

**Query-to-page ownership:** `/` owns generic digital punch-card terms. `/industries/bakeries` owns `כרטיסייה דיגיטלית למאפייה` plus bakery, pastry-shop, punch-card, and loyalty variants. `/industries/hair-salons` owns `כרטיסייה דיגיטלית למספרה` plus salon, barbershop, punch-card, and loyalty variants. The salon page covers earned rewards on completed eligible visits, not booking or prepaid treatment packages.

**Intent evidence:** [Hakartisia bakery page](https://app.hakartisia.com/industries/bakeries), [Punchy bakery page](https://punchy-loyalty-cards.com/digital-loyalty-card/bakery), [Punchy salon positioning](https://punchy-loyalty-cards.com/), [Loyaly beauty-clinic page](https://loyalil.com/he/for/beauty-clinics). These support separate business intents, not volume estimates.

## Consented organic actions

GA4 is not connected in the accessible data sources. Organic landing sessions, `contact_intent`, `generate_lead`, and qualified contact rates are **unavailable**, not zero. Existing consent and `page_path` instrumentation was verified locally for both routes. Compare each URL separately after publication.

Local browser verification passed on 2026-10-26: 14 focused Playwright tests, including granted and denied consent attribution for both new URLs, image loading, 320/390px overflow, and existing commercial-page loading. Desktop and mobile screenshots are in the ignored `test-results` directory.

## Publication and follow-up

| Page | Customer use and imagery | Reward demonstration | Publication status |
|---|---|---|---|
| Bakery | Existing bakery customer photos and Oren Or logo are candidates only; actual Viby punch-card use, image rights, and placement permission unverified | Neutral generated bakery image and explicitly illustrative “אחרי 8 קניות — מאפה לבחירה במתנה” | **Not ready for publication** pending review |
| Hair salon | Customer-specific punch-card use and image placement permission unverified | Neutral generated salon image and explicitly illustrative “אחרי 5 ביקורים — טיפול שיער במתנה” | **Not ready for publication** pending review |

Set each sitemap `lastModified` to its actual publication date only after approval for deployment. At week 2 check indexing and canonical; at week 4 inspect relevant queries and page ownership; at week 8 review technical health, relevant non-branded impressions, query coverage, clicks, and qualified contact actions. Leads are desirable but not required. Do not automatically create more pages.

**Later review on 26 October 2026:** The site owner approved the neutral illustrative image and reward approach for both bakery and salon. The earlier “not ready” rows above record the state when this prelaunch snapshot was taken. See the [publication review](../plans/seo-industry-pr2-release-review-2026-10-26.md) for the current page-by-page decision and final verification results. Deployment remains pending separate authorization.

**Later route revision:** The owner also requested restoration of the English café route under its original slug. It was absent from the 16-route snapshot above; the later local SEO report checks 17 routes. Preserve this snapshot as the earlier measurement point and measure the English URL separately after publication.
