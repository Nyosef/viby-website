# Viby SEO — business FAQ prelaunch evidence, 2026-10-27

**Scope:** `/business-faq`, `/business-faq/free-digital-punch-card`, `/business-faq/printable-vs-digital-punch-card` are local prelaunch pages. Their impressions, clicks, position, indexing state, and Google-selected canonicals are **not yet measurable**. This file records keyword-intent evidence, not search-volume estimates.

## Search Console baseline

- Source: connected Windsor.ai `searchconsole` account `sc-domain:joinviby.co.il`, Search Analytics, all countries/devices, Web query/page export; fetched 2026-10-27.
- Complete 28-day window: 2026-09-28 through 2026-10-25. Property total: **452 impressions, 32 clicks, 7.08% CTR**.
- Visible query/page response: 25 rows. `כרטיסיה דיגיטלית` had **2 impressions, 0 clicks, average position 9.5**, assigned to `/`. No visible query row contained the proposed free-punch-card or printable-punch-card phrases. A missing row is **not** a measured zero; Search Console may omit anonymized or low-volume queries.
- No Keyword Planner or GA4 data was accessible in this run. No search-volume or lead estimate is claimed.

## Search-result intent check

Searches on 2026-10-27: `כרטיסיה דיגיטלית חינם לעסק כרטיסיית ניקוב`, `כרטיסיה דיגיטלית לעסק בחינם`, `"כרטיסיית ניקוב להדפסה"`, and `כרטיס ניקובים לעסק להדפסה דיגיטלי`.

| FAQ intent | Evidence and interpretation |
|---|---|
| Free digital punch card | [Kartiya](https://kartiya.co.il/index.php) presents a free tier for business card programs; [Stampifi pricing](https://stampifi.app/he/pricing) distinguishes free setup from paid activation. This supports a genuine free-versus-managed pricing question. Some search results instead concern *digital business contact cards*; these are a different intent and must not be presented as punch-card competitors. |
| Printed versus digital | [Punchy](https://punchy-loyalty-cards.com/) answers whether a digital or printed punch card is better, and [Loyaly](https://www.loyalil.com/punch-card) presents a paper-versus-digital table. This supports the comparison intent, though it does not establish the exact phrase’s search volume. |

**Keyword ownership:** `/` retains broad `כרטיסיה דיגיטלית` and general punch-card terms. The new free FAQ owns the free-versus-paid question; the comparison FAQ owns the printing-versus-digital question. The hub organizes these two answers. Review actual query-to-page assignment after publication before changing content.

**Accuracy check:** `src/lib/commercial.ts` currently returns 79 ₪ monthly for the punch-card tool and a three-month initial period, totaling 237 ₪ for the subscription. Shipping and approved extras are separate. The FAQ renders these figures from that source.

## Local validation

The 2026-10-27 production build prerendered all three new routes as static HTML. The local SEO report passed for 20 canonical routes, including the three FAQ URLs, self-canonicals, indexability, sitemap count, schema, links, and answer word counts. The answers rendered at **118** and **119** whitespace-delimited words in four paragraphs each. Lint, TypeScript, and the full Playwright suite (**84/84**) passed. Desktop and mobile screenshots were inspected; they remain in the ignored local `test-results` directory. These checks establish local readiness, not live indexing or search performance.

## Post-publication comparison

After approval and publication, request indexing for all three URLs. At approximately four weeks, inspect each URL in Search Console for indexed status, Google-selected canonical, relevant non-branded queries, impressions, clicks, and position. If a page earns repeated relevant ranking signals, propose a focused content update that answers the observed queries and links to the relevant commercial page. Do not infer demand from absent query rows or automatically add pages, popups, or lead magnets.
