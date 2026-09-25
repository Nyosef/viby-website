# Viby refresh analytics — 25 September 2026

## Existing property and verification

- Property: `customer-retention-100` (`542902837`), account `Viby Israel` (`398957599`).
- Website stream: `Viby Website`, `15136665247`, measurement ID `G-YLFYE45LK7`.
- Verified in GA4 Admin: Enhanced Measurement is **off**. Its effective setting differs from the default capabilities listed in the downloaded Google tag. No stream settings were changed.
- The old implementation produced no page_view in the intercepted browser audit. The updated app configures GA once with `send_page_view: false` and sends one explicit page_view after consent and for each route change. A check using the real Google tag recorded exactly one page_view for initial entry and one for service navigation.
- The real-tag check recorded no automatic outbound click event or link_url payload, consistent with disabled Enhanced Measurement. Keep that setting unchanged unless separately reviewing privacy and duplicate pageview risks.
- Network verification intercepted requests to keep ordinary test traffic out of reports. Separate debug-mode UI checks received HTTP 204 from GA collection, but GA4 DebugView continued to show no development device/events. **DebugView acceptance remains outstanding; HTTP 204 is not proof of reporting ingestion.** Recheck after deployment using Tag Assistant and the website stream.

## Events

Existing consent gating applies. Calls fail safely and never include contact details, form values, message text, destination URLs, or raw errors.

| Event | Parameters | Frequency |
| --- | --- | --- |
| whatsapp_widget_shown | page_path, product_id | Once per tab visit after the widget is visible and consent granted |
| whatsapp_preview_opened | page_path, product_id, open_method | Each closed-to-open transition, click or hover |
| click_whatsapp | page_path, product_id, cta_location, contact_type, contact_method | Once per CTA activation through the existing delegated listener |
| service_chooser_opened | page_path, product_id, chooser_placement | Each closed-to-open transition |
| service_selected | page_path, previous_service, next_service, chooser_placement | Each selection of a different service |

The widget sets `cta_location=whatsapp_widget` and `contact_type=sales`, including on support pages. Existing support CTAs use `contact_type=support`. Pre-consent interactions are not replayed; consent granted while the icon is visible records its current exposure. The widget is independent of analytics consent and availability.

Existing `generate_lead` is retained. `view_item` now uses the standard `items` array. Form start/failure instrumentation is deferred; current Enhanced Measurement does not provide form starts because it is off.

## Reporting configured in GA4

- Existing event-scoped `product_id`, `cta_location`, `contact_method`, and `lead_type` dimensions retained.
- Added event-scoped `contact_type`, `open_method`, `chooser_placement`, `previous_service`, and `next_service`.
- Marked `click_whatsapp` as a key event; retained `generate_lead`. Unmarked aggregate `contact_intent` to avoid counting the same contact twice. Unrelated app/system key events are unchanged.
- Saved [Viby — Desktop WhatsApp funnel](https://analytics.google.com/analytics/web/#/analysis/a398957599p542902837/edit/B3TfFwk3QiK5ixq-buVPIQ).
- Closed funnel, indirectly followed steps: Visitor (`page_view`) → Widget shown (`whatsapp_widget_shown`) → Preview opened (`whatsapp_preview_opened`) → WhatsApp clicked (`click_whatsapp` AND `cta_location=whatsapp_widget` AND `contact_type=sales`).
- Filter: Device category exactly matches `desktop`. GA4 reports users per step, not event totals. Default date range: last 28 days. Data will populate after deployment and processing; this is contact intent, not proof a conversation occurred.

## Local checks

`npm run lint`, `npm run build`, `npm run seo:report`, `npm run test:refresh`.

Install a Playwright browser with `npx playwright install chromium` if needed. `PLAYWRIGHT_EXECUTABLE_PATH` optionally selects an existing Chromium executable. Tests start an isolated server on port 3100 with `.next-test` artifacts, leaving the ordinary development server untouched. Browser tests intercept Google requests and never submit actual leads or WhatsApp messages.
