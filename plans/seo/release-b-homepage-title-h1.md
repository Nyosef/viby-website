# Release B — homepage title and H1

Release B now ships together with Release A (content, FAQ, schema, images, links). The original plan held B back to protect `כרטיסייה דיגיטלית לעסק` on `/`. The final title keeps that phrase first, exactly where it was. The old H1, the slogan, contained neither phrase, so no existing signal is removed. The Search Console baseline (`seo-runs/2026-10-30-homepage-release-a-baseline.md`) returned no query rows, so a data gate could not have been met.

## What shipped

- Title: `כרטיסייה דיגיטלית לעסק | כרטיסיות ניקוב דיגיטליות | וייבי Viby`. It keeps the site-wide ` | וייבי Viby` suffix that `scripts/seo-report.mjs` enforces for `/`.
- One visible H1 on every viewport: `כרטיסיות ניקוב דיגיטליות לעסק`, from `productSeoByService["punch-card"].homeHeadings.hero`.
- The slogan is the `.v2-hero-slogan` paragraph, with its responsive wording and headline styling unchanged.
- Signals still carrying the protected phrase: first position in the title, the FAQ heading `שאלות נפוצות על כרטיסייה דיגיטלית לעסק`, the site-wide footer label, visible copy, the meta description, and schema `alternateName`.

Record the production publication date here: `____`. Then request indexing once for `https://joinviby.co.il/` with Search Console URL Inspection. Watching starts when the crawled page shows the new H1 and the section `מה זה כרטיס ניקוב דיגיטלי?`. Record that date: `____`.

## Monitoring

Use the best evidence available, in this order:

1. **Exact query/page rows.** Property `sc-domain:joinviby.co.il`, Search type **Web**, page `https://joinviby.co.il/`, latest complete seven days. Use a row only when it has at least **10 impressions**.
2. **Phrase family trend.** When the exact rows are missing, use the regex query filter `כרטיסי.*דיגיט|כרטיס ניקוב` on page `/`. Rare queries are anonymized individually but often appear together. Use this for direction only, not position.
3. **Manual ranking check.** Run it weekly whenever option 1 has no qualifying row. Search `כרטיסייה דיגיטלית לעסק` and `כרטיסיות ניקוב דיגיטליות` on google.co.il. Use a logged-out incognito window, the same location and the same device every time. Record the position of `/` and save a dated screenshot under `seo-runs/`.

A low-cost rank tracker set to Google Israel in Hebrew can replace option 3. Use it if one is subscribed.

Also track page totals for `/`. The baseline is 25 clicks and 168 impressions per 28 days, 29 September–26 October 2026.

## Rollback (title and H1 only)

Revert only the title and H1 if either condition holds. Release A content stays.

- The protected phrase `כרטיסייה דיגיטלית לעסק` falls below #3 for `/`. The drop must show in two consecutive weekly checks, or as a qualifying seven-day query/page row.
- Clicks or impressions for `/` over 14 days fall more than 30% below the baseline rate.

Do not roll back on a single day's data or on missing rows. Record insufficient data as insufficient data.

To revert, restore `metadataTitle` to `כרטיסייה דיגיטלית לעסק | וייבי Viby`. Render the slogan as the H1 again and remove `.v2-home-h1`. Update the title and H1 expectations in `scripts/seo-report.mjs` and the homepage tests.

## Next step, only if needed

Consider swapping the title order after 4–6 weeks of crawled data, and only if both hold: the protected phrase is stable in the top 3, and `כרטיסיות ניקוב דיגיטליות` is still not on page 1 for `/`. The new title would be `כרטיסיות ניקוב דיגיטליות | כרטיסייה דיגיטלית לעסק | וייבי Viby`. Ship the swap on its own, with no other copy changes, and use the same monitoring and rollback rules.

If the target SERP is dominated by comparison or provider-list pages, a dedicated comparison guide is a better next step than more homepage changes. Do not retarget `/industries/cafes` at the generic query.

## Café page

The café query/page pair is monitored separately. Any future Phase 2 café copy is limited to additions below its hero. Its URL, title, H1, metadata, canonical, hero, and existing links stay unchanged. A persistent qualifying drop after that release triggers rollback of the café additions only.
