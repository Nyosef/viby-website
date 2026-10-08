# Viby Website

Initial marketing website for Viby.

## Development

```bash
npm install
npm run dev
```

## SEO Configuration

Production uses one canonical Hebrew/Israel marketing origin:

```bash
NEXT_PUBLIC_SITE_URL=https://joinviby.co.il
```

Production builds fail when this variable points at another origin. The app uses
the canonical origin for metadata, Open Graph URLs, structured data, `robots.txt`,
and `sitemap.xml`. Preview deployments keep production canonicals and receive an
`X-Robots-Tag: noindex, nofollow` response header.

Optional Google integrations are configured without committing identifiers:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

GA4 is loaded only after the visitor explicitly approves analytics. No form
names, phone numbers, or form contents are included in analytics events.

## SEO verification

```bash
npm run build
npm run seo:report
```

The report starts the production build locally and checks every canonical route,
metadata uniqueness, JSON-LD, sitemap and robots behavior, legacy query redirects,
404 indexing, and internal links.

## Legal website publication

The website now shares commercial disclosures across its six products and keeps
prior terms/privacy documents at their version URLs. See the
[publication checklist](docs/legal-website-publication.md) before publishing.

Production Vercel builds require the confirmed public `NEXT_PUBLIC_LEGAL_*`
identity/contact fields and `LEGAL_PUBLICATION_REVIEWED=true`. Development and
preview builds remain available with clearly marked draft identity fields.
Supply these public values before building; they are compiled into client notices.

Run `npm run test:legal-runtime` (Node 22.19+) for rate-limit and publication
guard checks, and `npm run test:refresh` for browser verification. Browser tests
isolate Google/Vimeo traffic and mock callback delivery; they do not create leads
or send team notifications.
