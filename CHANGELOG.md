# Changelog

All notable changes to the Viby website are documented here.

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
