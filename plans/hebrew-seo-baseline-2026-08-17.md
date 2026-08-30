# Hebrew SEO baseline — 17 August 2026

This is the dated baseline for Problem 4. Publicly verifiable facts and authenticated checks completed on 30 August 2026 are recorded below. Fields that require later processing or traffic remain explicitly pending or insufficient rather than being guessed or treated as zero.

## Snapshot status

- Canonical production origin: `https://joinviby.co.il`.
- GA4 property: `customer-retention-100` under the Viby Israel account.
- GA4 production web stream: `Viby Website`, `https://joinviby.co.il`, stream ID `15136665247`, measurement ID `G-YLFYE45LK7`.
- GA4 remains gated by explicit consent.
- A durable DNS-verified owner of `sc-domain:joinviby.co.il` was confirmed through the domain provider and Search Console on 30 August 2026.
- `https://joinviby.co.il/sitemap.xml` responds with HTTP `200` and lists nine canonical public routes.
- Repository instrumentation for contact intent, successful leads, production SEO auditing, and commercial `lastmod` was added on 17 August 2026.
- Vercel Speed Insights was briefly enabled and then disabled on 17 August 2026. Vercel reports `hasData: false` and a recorded `disabledAt` value. Its package and component were removed from the repository.
- The instrumented build is deployed. On 30 August 2026, `npm run seo:report:production` passed against `https://joinviby.co.il`, including the explicit contact-link locations, five product `lastmod` values, nine canonical routes, redirects, robots, sitemap, schema, and 404 behavior.
- GA4 event-data retention is 14 months; the four event-scoped custom dimensions and the separate `contact_intent` and `generate_lead` key events were created on 30 August 2026 without default monetary values.
- `sc-domain:joinviby.co.il` was linked to the production GA4 web stream on 30 August 2026. The Queries and Google organic search traffic reports are published and return data.
- Public `site:` sampling returned no results, but it is not accepted as indexing evidence.

Status vocabulary: `Confirmed publicly`, `Confirmed in repository`, `Pending authenticated check`, `Insufficient data`, or the exact Search Console status.

## 1. Indexing

| URL | Indexed status | Last crawl | User canonical | Google canonical | Live test | Request date | Next review |
|---|---|---|---|---|---|---|---|
| `https://joinviby.co.il` | URL is on Google | Fresh crawl confirmed 30 Aug 2026; exact timestamp not recorded | Pending detail | Pending detail | Available to Google | Not requested | 6 Sep 2026 |
| `https://joinviby.co.il/smart-wheel` | Not indexed at inspection | Pending detail | Pending detail | Not available until indexed | Available to Google | 30 Aug 2026 | 6 Sep 2026 |
| `https://joinviby.co.il/digital-wallet` | Not indexed at inspection | Pending detail | Pending detail | Not available until indexed | Available to Google | 30 Aug 2026 | 6 Sep 2026 |
| `https://joinviby.co.il/viby-rate` | Not indexed at inspection | Pending detail | Pending detail | Not available until indexed | Available to Google | 30 Aug 2026 | 6 Sep 2026 |
| `https://joinviby.co.il/viby-tap` | URL is on Google | Pending detail | Pending detail | Pending detail | Available to Google | Recrawl requested 30 Aug 2026 | 6 Sep 2026 |

The exact inspection fields that were not captured during the authenticated session remain `Pending detail`; they must not be inferred from the successful live test or public search sampling.

## 2. Sitemap and property health

| Metric | Day 0 value | Evidence or next action |
|---|---|---|
| Public sitemap response | HTTP `200` | Confirmed publicly |
| Public canonical URL count | 9 | Confirmed publicly |
| Search Console sitemap status | Success | Confirmed in Search Console on 30 Aug 2026 |
| Submission date | 10 Aug 2026 | Search Console Sitemaps report |
| Last read | 24 Aug 2026 | Search Console Sitemaps report |
| Discovered URLs | 9 | Matches the public canonical count; zero discovered videos |
| Indexed submitted URLs | 4 indexed; 5 not indexed | Sitemap-filtered Page Indexing; last update 21 Aug 2026. All five exclusions are `Discovered - currently not indexed`; this report predates the 30 Aug requests. |
| Manual actions | No issues detected | Confirmed 30 Aug 2026 |
| Security issues | No issues detected | Confirmed 30 Aug 2026 |
| HTTPS status | 3 HTTPS; 0 non-HTTPS | No issues detected in the prior 90 days; report last updated 29 Aug 2026 |
| Enhancements | Videos: 0 valid, 0 invalid | No unparseable structured-data report was present |

## 3. Search performance

The first authenticated baseline uses the selected 28-day Search Console period. Available data spans 9–27 August 2026 because the property is new and Search Console processing lags.

| Metric | Day 0 value | Notes |
|---|---|---|
| Clicks | 6 | Search Console 28-day total |
| Impressions | 46 | Search Console 28-day total |
| CTR | 13% | Search Console reported value |
| Average position | 10.8 | Interpret as a trend, not a daily target |
| Branded/non-branded split | Too little data for a reliable split | Six visible query rows; anonymized rows may be omitted |
| Top pages | `/`: 6 clicks / 37 impressions; `/viby-tap`: 1 / 7; `/support`: 0 / 8; `/privacy`: 0 / 3 | Page rows are recorded as displayed; Search Console aggregation can differ from headline totals |
| Top visible queries | `uuby` 0/4; `וורביי` 0/3; `viby` 0/2; `vibey אפליקציה`, `ויזבי`, and `ויבי` 0/1 each | Clicks/impressions; insufficient for retargeting decisions |
| Device split | Desktop 3 clicks / 25 impressions; mobile 3 / 21 | No tablet row |
| Israel/other countries | Israel 6 clicks / 35 impressions; other countries 0 / 11 | Other impressions: UK 5, US 2, UAE 1, Italy 1, Nepal 1, Cyprus 1 |

The newly linked GA4 Search Console reports use 2–29 August 2026 and currently display 7 clicks and 55 impressions. Search Console remains authoritative; the date boundary and processing lag explain why the linked report is not used as the headline baseline.

## 4. Conversions

| Metric | Day 0 value | Configuration status |
|---|---|---|
| Consented organic sessions | Insufficient processed data | Production stream is confirmed; linked organic traffic currently shows 2 active users and 0 engaged sessions |
| WhatsApp clicks | Pending authenticated check | Existing `click_whatsapp`, now location/product aware |
| Phone clicks | No historical baseline recorded | New `click_phone` event |
| Contact-intent key events | 0 processed in linked report | `contact_intent` is configured as a key event with no default value |
| Successful leads | 0 processed in linked report | `generate_lead` is configured as a key event and fires only after API success |
| Contact-intent rate by landing page | Pending | Requires processed events and dimensions |
| Successful-lead rate by landing page | Pending | Keep separate from contact intent |

GA4 custom dimensions `product_id`, `contact_method`, `cta_location`, and `lead_type`, both key-event settings, 14-month event retention, and the Search Console link were confirmed in GA4 Admin on 30 August 2026. The production stream reported no website data in the previous 48 hours. Consent-denied production validation confirmed that the Google tag does not load; consent-granted Realtime/DebugView processing remains a D+2 operational validation because the new definitions can take 24–48 hours to populate. GA4 covers consented users and will not match Search Console clicks exactly.

## 5. Performance

| Commercial route | Search Console mobile CWV | Search Console desktop CWV |
|---|---|---|
| `/` | Insufficient data | Insufficient data |
| `/smart-wheel` | Insufficient data | Insufficient data |
| `/digital-wallet` | Insufficient data | Insufficient data |
| `/viby-rate` | Insufficient data | Insufficient data |
| `/viby-tap` | Insufficient data | Insufficient data |

Good thresholds are LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 at the 75th percentile. Lack of field traffic is recorded as insufficient data, not failure.

## 6. Configuration acceptance checklist

### Confirmed in repository

- [x] Consent-gated `contact_intent` and `click_phone` instrumentation.
- [x] Explicit controlled CTA locations and canonical product IDs.
- [x] Successful-lead parameters with no failed-submission conversion.
- [x] No analytics payload contains contact values, form content, WhatsApp text, query strings, or full external URLs.
- [x] No paid performance-monitoring package or component remains in the repository.
- [x] Product sitemap dates set to `2026-08-16`; non-product routes remain undated.
- [x] Read-only production SEO audit command added.

### Authenticated configuration

- [x] Confirm at least one durable DNS-verified Viby Search Console owner; completed 30 August 2026.
- [x] Confirm sitemap status `Success` and record its report fields; submitted 10 August, last read 24 August, nine discovered URLs.
- [x] Inspect and live-test all five commercial URLs; completed 30 August 2026.
- [x] Request one indexing or recrawl action for each URL that needed it after successful live tests; completed 30 August 2026.
- [x] Record Page Indexing, Manual Actions, Security Issues, HTTPS, enhancements, and CWV states; completed 30 August 2026.
- [x] Register four GA4 event-scoped custom dimensions; completed 30 August 2026.
- [x] Mark `contact_intent` and `generate_lead` as separate key events without default monetary values; completed 30 August 2026.
- [x] Set GA4 event-data retention to 14 months; completed 30 August 2026.
- [x] Link the domain Search Console property to the production GA4 stream and publish both organic-search reports; completed 30 August 2026.
- [x] Speed Insights was disabled before collecting data; Vercel reports `hasData: false`.
- [x] Deploy the instrumented build and obtain a passing `npm run seo:report:production` result; confirmed 30 August 2026.

### Recommended operational resilience (non-blocking)

- [ ] Confirm a second independently verified Viby-controlled Search Console owner without replacing the current DNS verification token.

## 7. Scheduled follow-up

- The original calendar dates were not used because authenticated URL inspections and indexing requests were not completed on Day 0.
- D+2 from the actual request date: sitemap/indexing processing, GA4 custom-definition availability, consent-granted Realtime/DebugView validation, and linked-report availability.
- D+7 from the actual request date: inspection-status recheck only.
- D+14 from the actual request date: preliminary query and landing-page review.
- D+28 from the actual request date: first decision-quality query-to-page comparison.
- Monthly thereafter: latest complete 28 days versus previous 28 days.

Use [the operating runbook](./hebrew-seo-indexing-measurement-runbook.md) for every update to this baseline.
