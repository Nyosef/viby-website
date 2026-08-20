# Hebrew SEO baseline — 17 August 2026

This is the Day 0 configuration snapshot for Problem 4. Publicly verifiable facts are recorded now. Authenticated Search Console, GA4 Admin, and Vercel dashboard fields remain explicitly pending rather than being guessed or treated as zero.

## Snapshot status

- Canonical production origin: `https://joinviby.co.il`.
- GA4 production measurement ID observed in production: `G-YLFYE45LK7`.
- GA4 remains gated by explicit consent.
- A Google site-verification DNS TXT record is published; ownership of the intended Search Console property is pending authenticated confirmation.
- `https://joinviby.co.il/sitemap.xml` responds with HTTP `200` and lists nine canonical public routes.
- Repository instrumentation for contact intent, successful leads, production SEO auditing, and commercial `lastmod` was added on 17 August 2026.
- Vercel Speed Insights was briefly enabled and then disabled on 17 August 2026. Vercel reports `hasData: false` and a recorded `disabledAt` value. Its package and component were removed from the repository.
- The read-only production audit still sees the prior deployment: explicit contact-link locations and the five product `lastmod` values are absent. Deploying this repository change and rerunning the production audit remain required.
- Public `site:` sampling returned no results, but it is not accepted as indexing evidence.

Status vocabulary: `Confirmed publicly`, `Confirmed in repository`, `Pending authenticated check`, `Insufficient data`, or the exact Search Console status.

## 1. Indexing

| URL | Indexed status | Last crawl | User canonical | Google canonical | Live test | Request date | Next review |
|---|---|---|---|---|---|---|---|
| `https://joinviby.co.il` | Pending authenticated check | Pending | Pending | Pending | Pending | Not requested in this record | After live test |
| `https://joinviby.co.il/smart-wheel` | Pending authenticated check | Pending | Pending | Pending | Pending | Not requested in this record | After live test |
| `https://joinviby.co.il/digital-wallet` | Pending authenticated check | Pending | Pending | Pending | Pending | Not requested in this record | After live test |
| `https://joinviby.co.il/viby-rate` | Pending authenticated check | Pending | Pending | Pending | Pending | Not requested in this record | After live test |
| `https://joinviby.co.il/viby-tap` | Pending authenticated check | Pending | Pending | Pending | Pending | Not requested in this record | After live test |

## 2. Sitemap and property health

| Metric | Day 0 value | Evidence or next action |
|---|---|---|
| Public sitemap response | HTTP `200` | Confirmed publicly |
| Public canonical URL count | 9 | Confirmed publicly |
| Search Console sitemap status | Pending authenticated check | Submit once and record status |
| Submission date | Pending | Search Console Sitemaps report |
| Last read | Pending | Search Console Sitemaps report |
| Discovered URLs | Pending | Expected public count: 9 |
| Indexed submitted URLs | Pending | Page Indexing filtered by sitemap |
| Manual actions | Pending | Manual Actions report |
| Security issues | Pending | Security Issues report |
| HTTPS status | Pending | HTTPS report |

## 3. Search performance

Use the latest complete period available in Search Console. Do not enter public-search estimates.

| Metric | Day 0 value | Notes |
|---|---|---|
| Clicks | Pending authenticated check | Search Console is authoritative |
| Impressions | Pending authenticated check | Search Console is authoritative |
| CTR | Pending authenticated check | Do not calculate without exported clicks/impressions |
| Average position | Pending authenticated check | Interpret as a trend, not a daily target |
| Branded/non-branded split | Pending | Define branded set when query rows exist |
| Top pages | Pending | Use canonical landing pages |
| Top Hebrew queries | Pending | Anonymized rows may be omitted |
| Device split | Pending | Mobile/desktop/tablet when available |
| Israel/other countries | Pending | Country report |

## 4. Conversions

| Metric | Day 0 value | Configuration status |
|---|---|---|
| Consented organic sessions | Pending authenticated check | Existing GA4 stream |
| WhatsApp clicks | Pending authenticated check | Existing `click_whatsapp`, now location/product aware |
| Phone clicks | No historical baseline recorded | New `click_phone` event |
| Contact-intent key events | No historical baseline recorded | Repository ready; GA4 key-event setting pending |
| Successful leads | Pending authenticated check | `generate_lead` fires only after API success |
| Contact-intent rate by landing page | Pending | Requires processed events and dimensions |
| Successful-lead rate by landing page | Pending | Keep separate from contact intent |

GA4 custom dimensions `product_id`, `contact_method`, `cta_location`, and `lead_type`, the two key-event settings, and 14-month retention are pending authenticated GA4 Admin confirmation. GA4 data covers consented users and will not match Search Console clicks exactly.

## 5. Performance

| Commercial route | Search Console mobile CWV | Search Console desktop CWV |
|---|---|---|
| `/` | Pending authenticated check | Pending authenticated check |
| `/smart-wheel` | Pending authenticated check | Pending authenticated check |
| `/digital-wallet` | Pending authenticated check | Pending authenticated check |
| `/viby-rate` | Pending authenticated check | Pending authenticated check |
| `/viby-tap` | Pending authenticated check | Pending authenticated check |

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

### Pending authenticated configuration

- [ ] Confirm primary and backup verified Search Console owners.
- [ ] Confirm sitemap status `Success` and record its report fields.
- [ ] Inspect and live-test all five commercial URLs.
- [ ] Request one recrawl per URL only after successful live tests.
- [ ] Record Page Indexing, Manual Actions, Security Issues, HTTPS, enhancements, and CWV states.
- [ ] Register four GA4 event-scoped custom dimensions.
- [ ] Mark `contact_intent` and `generate_lead` as separate key events.
- [ ] Set GA4 event-data retention to 14 months where permitted.
- [ ] Link the domain Search Console property to the production GA4 stream and publish both organic-search reports.
- [x] Speed Insights was disabled before collecting data; Vercel reports `hasData: false`.
- [ ] Deploy the instrumented build and obtain a passing `npm run seo:report:production` result.

## 7. Scheduled follow-up

- Day 7 — 24 August 2026: inspection-status recheck only.
- Day 14 — 31 August 2026: preliminary query and landing-page review.
- Day 28 — 14 September 2026: first complete post-change comparison.
- Monthly thereafter: latest complete 28 days versus previous 28 days.

Use [the operating runbook](./hebrew-seo-indexing-measurement-runbook.md) for every update to this baseline.
