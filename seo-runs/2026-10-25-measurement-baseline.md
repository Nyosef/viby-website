# SEO measurement baseline — 25 October 2026

## Purpose and scope

This is the starting scorecard for `https://joinviby.co.il`. It preserves the last recorded observations and defines how to judge later changes. It is **not** a claim that Search Console or GA4 were freshly queried on 25 October. Record `not collected`, `no row returned`, and `insufficient data` separately from a measured zero.

**Property:** `sc-domain:joinviby.co.il` for Google Search; GA4 production web stream `G-YLFYE45LK7` for consented on-site actions. Use the canonical `joinviby.co.il` URLs. Keep `myviby.co.il` platform traffic separate.

## Recorded starting observations

| Subject | Last recorded observation | Window / source | What remains unknown |
|---|---|---|---|
| Technical SEO | **Pass:** 14 canonical routes, redirects, robots, sitemap, schema, and 404 behavior | 25 Oct 2026, [production report](./2026-10-25-production-technical-seo-report.txt), exit code 0 | This does not show whether Google has indexed the routes. |
| Whole-site Google Search | **339 impressions, 28 clicks**; Israel **324 impressions**; mobile **21 clicks** | 20 Sep–19 Oct 2026, [brand and keyword audit](./2026-10-22-brand-keyword-audit.txt) | No newer complete site-wide export saved here. The visible branded query `viby` had 15 clicks; the other clicks cannot all be classified as non-branded. |
| Homepage | **114 impressions, 21 clicks** | Same 30-day audit window as above | Query intent for all clicks is not known. |
| Homepage, industry expansion snapshot | **132 impressions, 21 clicks** | 25 Sep–22 Oct 2026, 28-day Search Console snapshot in the [SEO plan](../plans/seo-discoverability-90-day-plan.md) | Different window from the 30-day audit; do not call the difference growth. |
| Café and car-wash pages | No pre-publication page data; the routes did not exist in the 28-day snapshot | Same industry expansion snapshot | Confirm each actual publication date, index state, queries, clicks, impressions, and consented contact actions independently. |
| Indexing | Historical sitemap check: **4 indexed / 9 submitted**; five `Discovered – currently not indexed` | Search Console report last updated 21 Aug, recorded [30 Aug](../plans/hebrew-seo-baseline-2026-08-17.md#2-sitemap-and-property-health) | Current indexed count and every new URL's URL Inspection state. Do not treat the August state as current. |
| Conversions | `contact_intent` and `generate_lead` key events configured separately | [30 Aug configuration record](../plans/hebrew-seo-baseline-2026-08-17.md#4-conversions) | Current consented organic sessions, qualified contact actions, successful leads, and event quality by landing page. |
| Field experience | Mobile and desktop Core Web Vitals had insufficient data | [30 Aug record](../plans/hebrew-seo-baseline-2026-08-17.md#5-performance) | Current LCP, INP, CLS at the 75th percentile, if Search Console has enough field data. |

The 20 Sep–19 Oct audit's page rows included `/smart-wheel` 38 impressions/1 click, `/digital-wallet` 136/1, `/viby-rate` 49/1, `/viby-tap` 26/1, and `/support` 25/3. `/customer-retention`, `/about`, `/how-it-works`, and `/viby-up` had no returned page row in that supplied summary. The 96 impressions for `ארנק דיגיטלי` on `/digital-wallet` were noted as a likely consumer-intent mismatch, not proof that the gift-card page is wrongly targeted. See the [original audit](./2026-10-22-brand-keyword-audit.txt) for context.

## Fixed criteria for every review

| Subject | Measure and evidence | Improvement / health criterion |
|---|---|---|
| Technical access | Production SEO report exit code and failed checks; canonical HTTP response, indexability, robots, sitemap inclusion, title/H1, structured data, internal links | Report passes and the same expected canonical routes remain accessible. Any new failure is a technical regression, even if traffic rises. |
| Google indexing | URL Inspection for each priority canonical: indexed state, last crawl, Google-selected canonical, sitemap discovery, exclusion reason | Expected URLs become indexed with their own canonicals; investigate exclusions after recrawl. Record status rather than scoring a missing row as failure. |
| Relevant discovery | Search Console Web impressions and **visible business-intent non-branded query** coverage, by canonical landing page | More relevant impressions and distinct relevant query families over matched windows. Track branded queries separately. Do not infer all non-branded traffic by subtracting visible branded rows from totals. |
| Search traffic | Google Search clicks, CTR, and query-to-page fit, by page and query family | Relevant non-branded clicks improve without a persistent shift toward consumer-only queries. Interpret CTR only with its impression count and query mix; average position is secondary context. |
| Qualified contact | GA4 consented Google-organic sessions and `contact_intent`; retain the event's canonical `page_path`, `contact_method`, and `product_id` where available | More qualified WhatsApp/phone actions, or stable actions as relevant traffic grows. A landing-page rate needs the same session cohort for its action count and session denominator; otherwise report event-page counts without a rate. |
| Successful lead | `generate_lead` after a successful API response, by landing page | Track separately from contact intent. A lead is desirable but is not required to judge the first eight weeks of a new page. Never add intent clicks to leads as one total. |
| User experience | Search Console mobile and desktop field LCP, INP, CLS at p75 | Good where data exists: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. `Insufficient data` is neither pass nor fail. |
| Search identity and safety | Branded query variants, official profile links, manual actions, Security Issues, HTTPS status | Stable recognition of `וייבי`/`Viby`; no manual action, security issue, or HTTPS regression. A profile or schema change alone is not a ranking result. |
| AI/search answer visibility | Fixed, dated prompts in Google and other search experiences; cited URL, answer accuracy, locale, screenshot | Record whether the correct official page is cited and facts are accurate. Treat this as a diagnostic sample, not a deterministic rank or lead metric. |

## Comparison rules

1. Save the exact **last complete 28-day** Search Console Web window and compare it with the immediately preceding non-overlapping 28 days. Keep property, country, device, search type, page set, and query classification the same. Add a same-season comparison when a prior year exists. Record the export date and any known Google processing lag.
2. Report **site totals and canonical page rows separately**. Their aggregation can differ. Always give numerator and denominator for CTR and rates; preserve raw exports and the exact filters used.
3. Classify visible queries as `branded`, `business-intent non-branded`, `consumer/irrelevant`, or `ambiguous`. Keep the query-to-canonical owner table stable; document every classification change. Search Console hides some queries and truncates rows, so visible-query coverage is a lower-bound sample.
4. For a newly published URL, log publication date and first confirmed Google crawl. Review indexing at week 2, query relevance at week 4, and technical health plus impressions, clicks, query coverage, and contact actions at week 8. Compare the page with its own post-publication windows; do not merge it into the older Phase 1 baseline.
5. Annotate each release, title/copy change, indexing request, tracking change, seasonality, and major campaign. An increase after a change is an association, not proof of causation. Avoid retargeting from a short or pre-recrawl window.
6. State one of `improved`, `stable`, `declined`, or `insufficient evidence` per subject, with the observed counts and limitations. Technical failures can require immediate repair; content expansion requires relevant search or customer evidence. Do not create more pages automatically.
7. For `contact_intent` per 100 organic landing sessions, count only actions in sessions that began on that landing page and divide by those same sessions, then multiply by 100. If the available GA4 report only groups events by the event's `page_path`, report those counts separately; a CTA page is not necessarily the session landing page. Keep GA4 consent and attribution settings consistent across periods.

## Sources and interpretation

- [Google Search Console performance counting and aggregation](https://support.google.com/webmasters/answer/17011364?hl=en) and [query omissions](https://support.google.com/webmasters/answer/17011259?hl=en).
- [Google Search Console indexing and performance guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start?hl=en).
- [GA4 key-event reporting](https://support.google.com/analytics/answer/9267568?hl=en).
- [Google Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds).
