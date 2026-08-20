# Changelog

All notable changes to the Viby website are documented here.

## [Search baseline and organic conversion measurement] — 2026-08-17

### Organic conversion instrumentation

- Added consent-gated `click_phone` and `contact_intent` events while preserving the historical `click_whatsapp` event.
- Added controlled CTA locations, canonical product IDs, contact method, and canonical page paths to contact events without sending phone numbers, message text, query strings, form contents, or external URLs.
- Expanded successful `generate_lead` events with the punch-card product, lead-form location, and canonical page path while retaining API-success-only behavior.
- Documented the required GA4 custom dimensions, key events, retention setting, validation procedure, and the distinction between consented GA4 sessions and Search Console clicks.

### Sitemap freshness and performance baseline

- Added accurate `2026-08-16` modification dates to the five commercial sitemap entries while leaving support, legal, and how-it-works routes undated.
- Kept real-user performance reporting limited to Search Console Core Web Vitals; no paid performance-monitoring service is included in this release.

### Audit and operations

- Added a read-only production SEO audit command with validated HTTPS-origin handling and the existing page, link, redirect, sitemap, schema, robots, preview, API, and 404 checks.
- Added regression checks for commercial sitemap dates, non-product date omission, future dates, and explicit analytics locations on contact links.
- Added a Search Console/GA4/Vercel operating runbook and a dated Day 0 baseline with indexing, property health, search, conversion, and Core Web Vitals tables.
- Kept Problem 4 open until authenticated Search Console, GA4 Admin, and Vercel acceptance work is completed.

## [Hebrew SEO buying-journey content] — 2026-08-16

### Product buying guides

- Added a detailed, server-rendered Hebrew buying guide to all five commercial product pages.
- Added product definitions, best-fit business categories, exact deliverables, and separate customer, employee, and owner workflows.
- Added purchase facts covering starting price, guided setup, app requirements, Wallet/NFC/QR compatibility, customer details, changes, support, phone replacement, and multiple branches.
- Added a factual comparison between each Viby product and its simpler paper, manual, printed, or static-QR alternative.
- Preserved the existing customer-logo strip without introducing unverified testimonials, metrics, or product attribution.

### Pricing, setup, and physical products

- Preserved the 69 ₪ monthly starting price for the digital punch card and the 49 ₪ monthly starting price for each other tool.
- Added the approved guided setup commitment for launching the digital product by the next business day after receiving all required business details, branding, and settings.
- Clarified that VibyRate and VibyTap physical format, quantity, production cost, and delivery timing are confirmed separately from digital setup.
- Avoided implying that extra branches, physical products, payment-processing costs, or shipping are included in the displayed monthly starting price.

### Product FAQs and accessibility

- Added six unique Hebrew pre-purchase FAQs to each commercial page using native `details` and `summary` elements.
- Kept every question and answer in the initial HTML and usable without client-side JavaScript.
- Added visible keyboard focus, responsive one-, two-, and three-column layouts, and bidirectional isolation for mixed Hebrew and LTR product terminology.
- Linked relevant data explanations to the privacy policy and operational-recovery answers to support.
- Did not add product FAQ structured data because these FAQs are intended as visible buying information rather than rich-result markup.

### SEO validation and tracking

- Extended the automated SEO report with per-route buying-guide headings, prices, operational roles, compatibility, customer-data, comparison, and exact FAQ assertions.
- Added checks for six non-empty native FAQ entries, required privacy/support links, physical-delivery separation, VibyRate review-integrity language, and the absence of product `FAQPage` schema.
- Recorded Problem 3 as resolved in the repository while leaving production verification, Search Console inspection, and post-deployment measurement open.

## [Hebrew SEO terminology alignment] — 2026-08-13

### Search intent and visible copy

- Assigned one distinct primary Hebrew search intent and supporting terminology set to each of the five commercial pages.
- Aligned every product title, meta description, H1, hero introduction, and supporting heading around the same product category.
- Preserved conversion-focused messaging while making every H1 descriptive without relying on metadata alone.
- Positioned the digital wallet as a gift-card system for gifts or self-purchased credit with a bonus.
- Positioned VibyTap as an in-store NFC/QR sign and links page rather than a digital business card.
- Standardized VibyRate's primary terminology on “ביקורות גוגל” while retaining a natural “Google Reviews” variant and honest-review language.

### Internal links and structured data

- Updated VibyTap's centralized crawlable label to “שלט NFC ועמוד קישורים לעסק”.
- Aligned each `Service` schema name and description with its page metadata while preserving the product label as `alternateName`.
- Updated the homepage product `ItemList` to use the same descriptive product labels and SEO descriptions.

### SEO validation and tracking

- Extended the automated SEO report with exact per-route title, meta-description, H1, visible-term, internal-link, and structured-data assertions.
- Added visible-text extraction so approved phrases must exist outside scripts, styles, and JSON-LD.
- Added a regression guard preventing VibyTap from being misclassified as a digital business card.
- Recorded the approved search-intent matrix and implementation status in `plans/hebrew-seo-main-problems.md`.
- Confirmed PR 1's crawlable product links are present on every live commercial page, including `/how-it-works`, without legacy `?service=` links.

## [Hebrew SEO internal linking] — 2026-08-12

### Crawlable product navigation

- Added permanent, server-rendered links between all five commercial product pages.
- Added a visible “פתרונות נוספים לעסק” section to every product page with four related-solution cards.
- Used descriptive Hebrew anchor text aligned with each product’s search intent.
- Kept product URLs canonical and free of tracking parameters or legacy `?service=` query strings.
- Preserved the existing animated service selectors, client-side URL updates, keyboard controls, and active-service announcements.

### Commercial-page footer

- Redesigned the commercial-page footer into separate “פתרונות Viby” and “קישורים שימושיים” navigation groups.
- Added crawlable footer links to all five products and the “איך Viby עובדת” page.
- Marked the current product link with `aria-current="page"`.
- Preserved the Viby logo, copyright, Instagram, support, legal, and business-login links.
- Added responsive desktop, tablet, and mobile layouts with visible keyboard focus and reduced-motion support.

### SEO configuration and validation

- Added centralized `internalLinkLabel` values to the product SEO configuration.
- Extended the automated SEO report to verify that every commercial page includes all five descriptive product links in its initial HTML.
- Added checks for a crawlable `/how-it-works` link, direct HTTP 200 product destinations, and the absence of legacy service-query links.
- Confirmed ESLint, the production build, the full SEO audit, and `git diff --check` succeed.
- Added the detailed Hebrew SEO problem report at `plans/hebrew-seo-main-problems.md` as the basis for subsequent SEO PRDs.

## [Unreleased] — 2026-08-05

### Punch Card purchase flow

- Added a new purchase-oriented section at the bottom of the landing page, after the existing final CTA and before the footer.
- Limited the section to the Punch Card (`punch-card`) tool so it does not appear for other Viby products.
- Added a short RTL lead form that collects only the customer’s name and Israeli phone number.
- Added clear messaging that a Viby representative will contact the customer and provide a personal secure-payment link.
- Added success, loading, validation, retry, and accessible error states.
- Added a consent notice linking to Viby’s Privacy Policy.
- Added responsive desktop and mobile styling consistent with the existing Viby design.

### Offer and payment messaging

- Updated the Punch Card offer to **₪69 per month**.
- Updated the earlier Punch Card price strip to display ₪69 while preserving the existing ₪49 pricing for other tools.
- Added Punch Card package highlights:
  - Branded digital punch card.
  - Apple Wallet and Google Wallet support.
  - Current Punch Card capabilities included.
- Added secure-payment messaging explaining that payment takes place on an Isracard payment page.
- Added an Isracard trust row and logo to the lead form.
- Updated the CTA to: “אני רוצה קישור לתשלום מאובטח”.
- Updated internal alert subjects to identify submissions as payment-link requests.

### Lead API

- Added `POST /api/punch-card-lead`.
- Added server-side name validation and Israeli phone normalization.
- Added HTML escaping and input sanitization for notification content.
- Added same-origin checks, a honeypot field, and basic request throttling.
- Added optional Cloudflare Turnstile verification.
- Added resilient notification handling: a submission succeeds when at least one configured notification channel succeeds.
- Avoided logging customer names and phone numbers.

### Telegram notifications

- Added immediate Telegram lead notifications containing:
  - Customer name.
  - Clickable international phone number.
  - Punch Card plan and ₪69 monthly price.
  - Submission date and time in the Israel timezone.
- Created and verified the private `@vibyleads_bot` Telegram bot.
- Connected and tested the private Telegram destination successfully.
- Added multi-chat delivery through `TELEGRAM_CHAT_IDS`.
- Added `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_IDS` as encrypted, Production-only environment variables in the Vercel `viby-website` project.
- Kept Telegram credentials out of tracked source files.

### Email notifications

- Reused Viby’s existing Gmail SMTP delivery configuration from the `customer-retention-100` Firebase Functions project.
- Configured lead emails to target `nyosef@gmail.com`, `vibyisrael@gmail.com`, and `baraassor@gmail.com`.
- Sends each recipient a separate message so recipient addresses are not exposed to one another.
- Added plain-text and RTL HTML email versions with a clickable phone number.
- Documented the required `VIBY_GMAIL_USER`, `VIBY_GMAIL_APP_PASSWORD`, and `LEAD_EMAIL_RECIPIENTS` variables.

### WhatsApp notifications

- Added Green API as an internal lead-alert channel.
- Configured alerts for exactly two fixed Viby team WhatsApp chats.
- Kept the Green API token server-side and outside tracked source files.
- Customer-facing copy does not promise an automatic customer WhatsApp message.

### Configuration

- Added `.env.example` containing variable names only.
- Added production configuration names for Gmail SMTP, multi-recipient email, Telegram, and Green API delivery.
- Linked the local workspace to the correct Vercel project:
  - Team: `nir-josephs-projects`
  - Project: `viby-website`
  - Production site: `www.joinviby.co.il`
- Added remote image configuration for the temporary Isracard logo source.

### Validation

- Confirmed the Next.js production build succeeds.
- Confirmed TypeScript compilation succeeds.
- Confirmed ESLint succeeds.
- Confirmed the Telegram Bot API connection and test-message delivery.
- Confirmed the Green API instance is authorized and accepted test messages for both configured WhatsApp chats.
- Confirmed Gmail SMTP accepted a separate test email for each of the three configured inboxes.
- Deployed the updated lead API to `www.joinviby.co.il`.
- Confirmed an end-to-end production lead submission returned HTTP 200 with no channel errors in the production function logs.
- Confirmed no secrets are included in tracked files.

### Required before production deployment

- Add Cloudflare Turnstile production site and secret keys.
- Replace the temporary externally hosted Isracard logo with a brand-approved local merchant asset.
- Review the Privacy Policy disclosure for lead data sent through Telegram, Green API, and Gmail.
