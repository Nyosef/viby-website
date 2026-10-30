# Homepage Release A Search Console baseline — 30 October 2026

Source: connected Windsor.ai `searchconsole` account `sc-domain:joinviby.co.il`, Search Analytics, search type `web`, 29 September–26 October 2026 inclusive (28 days). Exported before Release A site edits. Metrics are clicks, impressions, CTR, and average position. The connector returned no query/page rows for the three exact Hebrew queries below; this is **insufficient data**, not a measured zero or proof of ranking position.

| Exact query | Intended page | Query/page row | Clicks | Impressions | CTR | Average position |
|---|---|---|---:|---:|---:|---:|
| `כרטיסייה דיגיטלית לעסק` | `https://joinviby.co.il/` | No row returned | — | — | — | — |
| `כרטיסיית ניקוב דיגיטלית לבית קפה` | `https://joinviby.co.il/industries/cafes` | No row returned | — | — | — | — |
| `כרטיסיות ניקוב דיגיטליות` | All URLs, to identify query ownership | No row returned | — | — | — | — |

Page totals for the same Web window, without a query filter:

| Page | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| `https://joinviby.co.il/` | 25 | 168 | 14.88% | 5.5893 |
| `https://joinviby.co.il/industries/cafes` | 0 | 1 | 0% | 1 |

The page totals cover all visible and anonymized queries and do not establish a position for any of the exact phrases. The supplied report that both phrases currently rank #1 remains an owner observation, not verified by this Search Console export. Since the main target query has no returned page row, Release A should use conservative, context-specific industry anchors and should not claim a measured homepage query owner.

Release B remains on hold until its separate gate is met: a latest complete seven-day query/page window with at least 10 impressions for `כרטיסייה דיגיטלית לעסק` on `/` and average position #3 or better.

**Update, 30 October 2026:** Release B was combined with Release A. The title keeps `כרטיסייה דיגיטלית לעסק` first, and the old slogan H1 contained neither phrase, so nothing protected was removed. Monitoring and rollback rules are in `plans/seo/release-b-homepage-title-h1.md`.
