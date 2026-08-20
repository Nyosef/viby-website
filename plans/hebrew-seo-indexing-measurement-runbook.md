# Hebrew SEO indexing and measurement runbook

- **Owner:** Viby marketing/product owner
- **Technical owner:** Viby website maintainer
- **Started:** 17 August 2026
**Review cadence:** Monthly, with a quarterly access and instrumentation review

## 1. Purpose and sources of truth

This runbook defines how Viby measures Google discovery, Hebrew organic-search performance, contact intent, successful leads, and real-user page performance.

- Google Search Console is authoritative for Google indexing, impressions, clicks, CTR, queries, and average position.
- GA4 is authoritative for consented on-site behavior and conversion events. It will not equal Search Console because consent, blockers, session attribution, and processing differ.
- Search Console is the source for field LCP, INP, and CLS. Insufficient traffic is recorded as unavailable data rather than replaced with a paid monitoring service.
- Public `site:` searches are diagnostic hints only and must never replace URL Inspection or Page Indexing data.
- Contact intent and a successful form lead are separate funnel stages. Never add them together as one “lead” total.

No process in this document guarantees crawling, indexing, rankings, traffic, or conversion volume.

## 2. Production identifiers and required access

| Item | Required value |
|---|---|
| Canonical origin | `https://joinviby.co.il` |
| Search Console property | `sc-domain:joinviby.co.il` |
| Sitemap | `https://joinviby.co.il/sitemap.xml` |
| GA4 measurement ID | `G-YLFYE45LK7` |
| GA4 web-stream URL | `https://joinviby.co.il` |
| Vercel project | `viby-website` |

Before changing configuration, confirm:

- The responsible Viby Google account is a verified owner of the domain property.
- A second Viby-controlled account is a verified backup owner.
- The DNS verification token remains present and is not controlled only by a former employee or agency.
- The operator linking GA4 has Editor or Administrator access.
- The chosen GA4 stream has the production URL and measurement ID above; never use a preview or Vercel-alias stream.

Record owners by role in the private company access register. Do not put personal email addresses or credentials in this repository.

## 3. Analytics event contract

GA4 remains disabled until explicit analytics consent. No additional performance-monitoring vendor is enabled by this implementation.

| Event | Trigger | Status in GA4 |
|---|---|---|
| `view_item` | A commercial product route is viewed | Ordinary event |
| `click_whatsapp` | A `wa.me` contact link is deliberately clicked | Ordinary continuity event |
| `click_phone` | A `tel:` link is deliberately clicked | Ordinary event |
| `contact_intent` | The same WhatsApp or telephone contact action | Key event |
| `generate_lead` | Punch-card API returns a successful lead result | Key event |
| `click_demo` | External product demo is opened | Ordinary event |
| `click_business_login` | External business login is opened | Ordinary event |

`contact_intent` contains only:

- `contact_method`: `whatsapp` or `phone`.
- `product_id`: canonical product service ID, or `none` outside a commercial page.
- `cta_location`: one approved controlled location.
- `page_path`: canonical path without query parameters.

`generate_lead` contains:

- `lead_type`: `punch_card_payment_link`.
- `product_id`: `punch-card`.
- `cta_location`: `punch_card_lead_form`.
- `page_path`: `/`.

Approved `cta_location` values are `header`, `hero`, `price_strip`, `mid_page_cta`, `final_cta`, `footer`, `buying_guide`, `support_page`, `how_it_works`, and `punch_card_lead_form`.

Never send a name, phone number, form field, WhatsApp prefilled message, query string, or full external URL. A failed validation, Turnstile check, API request, or notification must not emit `generate_lead`.

### GA4 administration checklist

1. In Admin, create event-scoped custom dimensions named `product_id`, `contact_method`, `cta_location`, and `lead_type`, using the identically named event parameters.
2. Mark `contact_intent` and `generate_lead` as key events. Do not mark channel-specific click events as additional key events.
3. Do not assign currency or monetary value until Viby approves a lead-value model.
4. Set event-data retention to 14 months where the property permits it.
5. With consent granted, validate events and parameters in Realtime and DebugView. Repeat with consent denied and confirm that GA4 does not load or emit events.
6. Recheck custom dimensions after 24–48 hours; this processing delay is normal.

## 4. Search Console setup

### Sitemap

1. Open `sc-domain:joinviby.co.il` and select **Sitemaps**.
2. Submit `https://joinviby.co.il/sitemap.xml` once.
3. Record submission date, status, last-read date, discovered URL count, and any errors in the dated baseline.
4. Confirm the sitemap discovers all nine canonical public routes.
5. Do not resubmit an unchanged sitemap after a successful fetch.

### Commercial URL inspection

Inspect exactly:

- `https://joinviby.co.il`
- `https://joinviby.co.il/smart-wheel`
- `https://joinviby.co.il/digital-wallet`
- `https://joinviby.co.il/viby-rate`
- `https://joinviby.co.il/viby-tap`

For each URL:

1. Record the indexed status or exact exclusion reason, discovery source, referring sitemap, last crawl, crawler device, fetch status, indexing permission, user-declared canonical, Google-selected canonical, and enhancements.
2. Run **Test Live URL**. Confirm availability and inspect tested HTML or screenshot for the current Hebrew H1, buying guide, FAQs, and descriptive product anchors.
3. Request indexing once only after the live test passes, and record the date.
4. Recheck after seven days and, if unresolved, after 14 days.
5. Record Google’s selected canonical only from indexed data; the live test cannot establish it.

### Property health

At setup and monthly thereafter, record Page Indexing filtered to the sitemap, Manual Actions, Security Issues, HTTPS, mobile and desktop Core Web Vitals, enhancements, and unparseable structured data. The target is no manual action, no security issue, healthy HTTPS, and all five commercial canonical URLs indexed without `www`, preview, query-string, or alternate-route variants.

### GA4 linkage

Create one link from `sc-domain:joinviby.co.il` to the production GA4 web stream `G-YLFYE45LK7`. Publish **Google Organic Search Queries** and **Google Organic Search Traffic** in the GA4 Reports library. Record the linkage date and do not create a second link to a preview stream.

## 5. Indexing troubleshooting matrix

| Search Console state | Required response |
|---|---|
| URL is on Google | Record crawl and canonical details; no repeated request. |
| Discovered – currently not indexed | Confirm sitemap discovery, direct HTTP `200`, crawl allowance, and visible internal links; recheck at the scheduled date. |
| Crawled – currently not indexed | Wait at least seven days after the single request, then review uniqueness, buyer usefulness, internal links, and genuine external discovery. |
| Duplicate or canonical mismatch | Compare Google-selected and declared canonicals, redirects, sitemap, and internal links before changing any URL. |
| Blocked, `noindex`, or fetch failure | Treat as a technical defect; fix and pass the live test before requesting again. |
| No data yet | Record “insufficient data”; do not infer a failure from public search results. |
| Wrong host or query URL indexed | Verify its redirect/canonical and all internal links, then inspect both the unwanted and canonical URLs. |

## 6. Performance monitoring

Use Search Console Core Web Vitals for mobile and desktop field performance. Do not enable a paid monitoring service without separate, explicit approval of its account-specific price.

Review commercial routes at the 75th percentile:

- LCP: good at or below 2.5 seconds.
- INP: good at or below 200 milliseconds.
- CLS: good at or below 0.1.

“Not enough data” is a valid state for a new or low-traffic page, not a failed Core Web Vitals result.

## 7. Production and release checks

Before deployment:

```bash
npm run lint
npm run build
npm run seo:report
git diff --check
```

After deployment:

```bash
npm run seo:report:production
```

The production audit is read-only. It validates canonical pages, HTML content, internal links, sitemap dates, redirects, robots, preview protection, API protection, schemas, and 404 behavior. It never submits Search Console requests. A custom target may be supplied only as an HTTPS origin:

```bash
SEO_REPORT_ORIGIN=https://joinviby.co.il node scripts/seo-report.mjs
```

The five commercial sitemap `lastmod` dates are maintained in the centralized product SEO configuration. Change a date only after a substantial content change; do not date routine deployments. Support, how-it-works, terms, and privacy deliberately have no invented modification date.

## 8. Reporting process

- Day 0: configuration and indexing snapshot.
- Day 7: inspection-status recheck only.
- Day 14: preliminary query and page review.
- Day 28: first complete post-change comparison.
- Monthly: latest complete 28 days versus previous 28 days.
- Quarterly: owners, GA4 event definitions, sitemap health, query-to-page mapping, and product modification dates.

Monthly reporting must include indexing, sitemap/property health, search performance, conversions, and route-level performance using the tables in the dated baseline template.

Use Search Console for clicks, impressions, CTR, queries, and position; use GA4 for consented organic sessions and on-site actions. Compare products at landing-page level. Prioritize clicks and impressions over daily position movement. Do not treat anonymized or absent queries as zero demand, and do not retarget a page using less than 14 days of post-recrawl data unless there is a clear technical indexing defect.

API automation and Looker Studio are deferred until monthly manual work becomes burdensome.

## 9. Official references

- [Google URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en)
- [Google Sitemaps report](https://support.google.com/webmasters/answer/7451001?hl=en)
- [Link Search Console and GA4](https://support.google.com/analytics/answer/10737381?hl=en)
- [GA4 custom dimensions](https://support.google.com/analytics/answer/14239696?hl=en)
- [GA4 key events](https://support.google.com/analytics/answer/12966437?hl=en)
- [Search Console performance interpretation](https://support.google.com/webmasters/answer/17010961?hl=en)
- [Search Console API limitations](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
