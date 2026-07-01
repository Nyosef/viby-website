# Viby Website

Initial marketing website for Viby.

## Development

```bash
npm install
npm run dev
```

## SEO Configuration

Set `NEXT_PUBLIC_SITE_URL` in production to the final canonical domain, for example:

```bash
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

The app uses this value for canonical metadata, Open Graph URLs, structured data,
`robots.txt`, and `sitemap.xml`.
