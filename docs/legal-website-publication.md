# Viby marketing website legal update — publication checklist

Prepared 8 October 2026. Scope: joinviby.co.il and its marketing-site lead API.
The merchant application, payment collection, billing, customer enrollment and
actual AI messaging are outside this change.

## Confirmed commercial decisions

- All new paid tools: three consecutive monthly service periods starting when
  digital service is available and activation is communicated; monthly billing,
  then monthly continuation. No retrospective minimum or silent restart.
- Cancellation during the minimum stops renewal at its end; afterwards it stops
  at the end of the paid month. Preserve remedies for breach/non-delivery and
  mandatory rights; no separate sign/setup penalty.
- Punch cards: ₪79/month, ₪237 initial subscription total. Other fixed-price
  tools: from ₪49/month, from ₪147 initial subscription total. UP: personal quote.
  The business is an עוסק פטור: final prices, no VAT charged.
- Digital setup within three business days after required details/approvals.
  Sunday–Thursday excluding Israeli public holidays. Production/delivery separate.
- One standard branded sign per initial order, included at joining after payment
  verification. Delivery and approved extras cost extra and are quoted beforehand.

## Required before publication

1. Provide and verify public `NEXT_PUBLIC_LEGAL_BUSINESS_NAME`,
   `NEXT_PUBLIC_LEGAL_BUSINESS_NUMBER` (nine digits),
   `NEXT_PUBLIC_LEGAL_BUSINESS_ADDRESS` and `NEXT_PUBLIC_LEGAL_CONTACT_EMAIL`.
   Confirm the email is monitored for privacy and cancellation and that the
   existing 050-956-5137 WhatsApp number can handle these requests.
2. Review the concrete revised Hebrew documents, including liability, amendments,
   subscription/gift wording and the real ordering/acceptance practices. The source
   audit/draft recommend Israeli legal review; this implementation does not
   certify enforceability or implement acceptance/payment authorization elsewhere.
3. Validate provider and operating facts before relying on the broader platform
   notice: active website alert channels/authorized recipients, AI providers and
   training settings, access roles, processing countries/transfer arrangements,
   retention/deletion across inboxes and chat copies, voucher funds flow, campaign
   mechanics, and treatment of balances/printed links at termination. Unknown
   details have not been replaced with invented promises or numerical periods.
4. Confirm sign specification, delivery price/timing and the real sales offer
   agree with the website. Submitting the website form is a contact request only.
5. Confirm the release date/version matches the intended publication date; update
   the release identifier and corresponding validation expectations if publication
   is later. Set `LEGAL_PUBLICATION_REVIEWED=true` only after this checklist is met.

Production builds fail until identity fields and the review flag are supplied.
Preview builds permit review without publishing missing identity as final terms.
No production settings are changed by this PR.

## Technical behavior and maintenance

- `/terms` and `/privacy` serve current documents; prior published strings are
  preserved in `legal-history.ts`. Version pages have noindex/nofollow/noarchive,
  remain crawlable so noindex can be honoured, and are excluded from the sitemap. Existing title fragment
  anchors remain available alongside stable section IDs.
- When changing legal/commercial wording later, preserve the outgoing document
  as an immutable history entry and create a new version; never edit a published
  historical text in place.
- Analytics choices use `{ version: 1, value, savedAt }` with a 180-day lifetime.
  Legacy refusals migrate; legacy grants require a fresh choice. Invalid records
  cannot grant permission. Blocked storage falls back to in-memory choice.
  Withdrawal stops website events, sets the GA collection-disable flag and clears
  first-party GA cookies; it cannot remove already transmitted data.
- Vimeo previews use local artwork; no iframe loads before a deliberate click,
  regardless of analytics permission. The player uses `dnt=1`, which does not
  eliminate Vimeo's essential cookies or all external processing.
- The lead API preserves its request/response and configured delivery channels.
  No order-acceptance evidence is collected by the contact form. IP attempt keys
  are bounded to 10,000; expired entries are swept on subsequent requests.
- Browser tests mock external delivery. No live leads, notifications, payments,
  merchant records or provider settings are needed or changed during verification.
