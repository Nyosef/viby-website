# Viby SEO runs

Keep dated, immutable audit inputs and run results here so future reviews can compare like with like. The two original audit texts below were copied byte-for-byte from the Codex attachments; their originals remain in attachment storage. The production technical report is the command output from a read-only run.

| Date | Record | What it is |
|---|---|---|
| 2026-10-19 | [Full SEO and AI Search audit](./2026-10-19-full-seo-ai-audit.txt) | Original supplied audit; recommendations are historical, not automatically current. |
| 2026-10-22 | [Brand and keyword audit](./2026-10-22-brand-keyword-audit.txt) | Original supplied Phase 1, Part 2 audit, including a 20 Sep–19 Oct Search Console window. |
| 2026-10-25 | [Production technical SEO report](./2026-10-25-production-technical-seo-report.txt) | `npm run seo:report:production` from commit `8269a2f`; exit code 0; 14 canonical routes passed. |

Start comparisons with the [measurement baseline](./2026-10-25-measurement-baseline.md). For each subsequent review, copy the [run template](./RUN_TEMPLATE.md) to a dated file such as `YYYY-MM-DD-monthly-review.md`. Keep reviewed summaries and technical report output in Git. Store raw Search Console and GA4 exports under `seo-runs/raw/`, which Git ignores, and record their filenames and filters in the dated summary. Do not overwrite a prior run; add a correction note if a recorded figure was wrong.

The [existing operating runbook](../plans/hebrew-seo-indexing-measurement-runbook.md) remains the source for Search Console inspection and GA4 event definitions. A successful technical report confirms crawl-facing implementation checks; it does not establish Google indexing, ranking, traffic, or leads.
