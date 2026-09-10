# Viby UP implementation notes

Implemented locally on 10 September 2026: dedicated `/viby-up` marketing page, sixth-product navigation, scripted WhatsApp demonstration with two scenarios, visible AI interpretation, accessible transcripts, SEO metadata/schema/sitemap, and existing consent-aware contact attribution.

The demo uses fictional café/customer dialogue. It makes no external AI calls and sends no WhatsApp messages. Sales links open the existing Viby sales destination. Pricing is by enquiry; no setup timing or message allowance is assumed.

## Separate product follow-up

The confirmed platform flow currently invites only satisfied customers to leave Google reviews. Google's policy prohibits selectively soliciting positive reviews. Redesign that platform behavior in a separate product task. At the user's explicit follow-up request, the happy demo scenario now includes a warm Google-review invitation; the attention scenario is unchanged. This overrides the original marketing exclusion, but does not resolve the underlying policy concern. The demo and its server-rendered transcript share the updated copy; no real review destination or platform behavior was added. Keep this concern internal and do not promise Google rankings.

Reference: [Google Maps contribution policy](https://support.google.com/contributionpolicy/answer/7400114?hl=en-GB).

## Release follow-up

Local verification: lint, TypeScript/production build, and the SEO audit passed for all ten canonical routes. Headless Chromium checks covered desktop/mobile rendering, both selector routes and group order, scenario switching, the 15-second timeline, pause/resume, offscreen and hidden-tab pausing, reduced motion, and no-JavaScript transcripts. No page errors were observed. The consent test used a temporary build-only analytics ID with Google requests intercepted: contact events were absent before consent and correctly attributed to `viby-up`, `/viby-up`, and `hero` after consent, without emitting `generate_lead`. No messages were sent. The normal build configuration is restored after that test.

- [ ] Deploy the reviewed implementation.
- [ ] Run the production SEO audit and verify live responsive layouts, animation controls, contact links, canonical, and sitemap.
- [ ] Inspect `/viby-up` in Search Console after publication and record indexing separately from implementation completion.
