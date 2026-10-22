# Viby SEO Phase 1, Part 2 — 22 October 2026

## Source and measurement window

This project record transcribes the supplied **Viby SEO — Phase 1, Part 2: Brand & Keyword Audit** dated 22 October 2026. The Search Console window is **20 September–19 October 2026** (30 calendar days). The authenticated Search Console and profile settings described in that audit were not independently accessible during this project update. The audit references a five-sheet workbook, but the workbook itself was not attached. Obtain its full export before query-level decisions; this report preserves only the supplied summary.

The site-level Search Console total was **339 impressions and 28 clicks**. Israel accounted for **324 impressions**; mobile accounted for **21 of 28 clicks**. The visible query `viby` had **15 clicks**. The other 13 clicks **cannot be classified as non-branded**: low-volume queries may be anonymized and missing query rows cannot be assigned an intent. A missing page row also does not prove a page is unindexed or had zero impressions.

## Page ownership and observed rows

| Page | Primary target or role | Impressions | Clicks | Reading |
|---|---|---:|---:|---|
| `/` | `כרטיסייה דיגיטלית לעסק` | 114 | 21 | Keep the homepage focused on digital punch cards; visible queries are heavily branded. |
| `/customer-retention` | `מועדון לקוחות דיגיטלי לעסקים` | — | — | Comparison page for loyalty tools; check indexing after release. |
| `/smart-wheel` | `גלגל מזל דיגיטלי לעסקים` | 38 | 1 | Some visibility, mostly generic terms. |
| `/digital-wallet` | `כרטיס מתנה דיגיטלי לעסק` | 136 | 1 | Broad consumer-query mismatch; examine after recrawl. |
| `/viby-rate` | `כרטיס NFC לביקורות גוגל` | 49 | 1 | More relevant query evidence needed. |
| `/viby-tap` | `שלט NFC לעסק` | 26 | 1 | More relevant query evidence needed. |
| `/viby-up` | `קשרי לקוחות ב־WhatsApp בעזרת AI` | — | — | No performance row returned. |
| `/about` | `וייבי / Viby` | — | — | Newly published identity page. |
| `/how-it-works` | `איך Viby עובדת` | — | — | Informational support page. |
| `/support` | `תמיכה Viby` | 25 | 3 | Appropriate support intent. |

The supplied audit attributes **96 impressions** for `ארנק דיגיטלי` to `/digital-wallet`, at average position approximately **52.3**. That query can represent a consumer payment wallet rather than business gift-card software. The page title already targets digital gift cards. Keep its copy for now; review business-intent queries after Google recrawls the October release. If the mismatch persists, consider a concise distinction between gift cards and payment wallets based on those queries.

## Company identity and domain separation

The existing Organization and WebSite nodes use `https://joinviby.co.il/#organization` and `https://joinviby.co.il/#website`, with `Viby` and `וייבי` as names. The audited official profiles are Instagram `https://www.instagram.com/viby.il/` and LinkedIn `https://www.linkedin.com/company/vibyil/`. The website update adds LinkedIn to the existing Organization `sameAs` and visible links, and points the schema logo to the existing 512 × 512 `icon.png` for legibility on a light background. The hero artwork remains separate.

The audit found that the public root of `myviby.co.il` describes overlapping product families and links to the `www` marketing address. The platform root may also serve login or customer entry. Investigate both domains' Search Console traffic, overlapping queries, Google-selected canonicals, and platform-route dependencies before deciding whether to change content, indexing, canonicals, or redirects. Correct the platform's marketing link to `https://joinviby.co.il` in its own project.

## Follow-up gates

- **28–30 October 2026:** In Search Console, inspect `/about`, `/customer-retention`, and commercial URLs. Record indexing status, last crawl, Google-selected canonical, and sitemap processing. These are verification checks, not an early ranking verdict.
- **20 November 2026 onward:** Compare a complete 28-day post-release period with its prior equivalent, considering actual recrawl dates. Use the full five-sheet workbook or its export to inspect query-to-page changes. Change product copy only if a persistent mismatch is supported by business-intent query evidence.
- **External profile settings:** Confirm the LinkedIn public URL; set its Website and Visit Website fields to `https://joinviby.co.il`, add accurate Hebrew `וייבי (Viby)` copy and specialties, and add founding year/city only after confirming them. Check Instagram's logo, business-focused name and bio, and canonical website link. Proposed LinkedIn tagline and first post are optional.
- **Measurement:** Complete a consent-granted GA4 Realtime/DebugView check while keeping `contact_intent` distinct from successful `generate_lead` events.

Google's [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization) describes official profile URLs and logo requirements. Its [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) supports deciding between overlapping URLs from evidence rather than assuming a redirect.
