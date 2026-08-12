# haz-personal-website

Personal website scaffold for Harry "Haz" Hubble.

## Structure

- `app/` contains the Next.js App Router pages and route handlers.
- `app/page.tsx` is the full-bleed interactive diary homepage.
- `app/api/diary/route.ts` is the placeholder diary API. It is structured for a
  future LLM call with verified Haz context.
- `lib/diary.ts` contains the diary request/response contract and placeholder
  response builder.
- `app/entries` and `app/entries/[slug]` render diary-style biography entries.
- `app/work` renders a conventional timeline/resume-style backpage.
- `app/about` renders the canonical structured-data bio placeholder.
- `app/sitemap.ts` and `app/robots.ts` provide lightweight SEO crawl routes.
- `components/` contains shared interface components.
- `lib/` contains route data, site metadata, social links, and JSON-LD schema.
- `wrangler.toml` and `npm run pages:deploy` deploy the current scaffold to
  Cloudflare Pages for live preview testing.
- `scripts/build-cloudflare-pages.mjs` keeps Cloudflare Pages builds from
  writing Vercel CLI state into the user Library directory.

## Placeholder Copy

This scaffold intentionally avoids final public biography copy.

Search for these markers before launch:

```sh
rg "TODO|PLACEHOLDER"
```

Important replacement points:

- `lib/site.ts`: canonical URL, Open Graph image, social URLs, Person JSON-LD.
- `lib/entries.ts`: diary entry dates, summaries, and body copy.
- `lib/work.ts`: conventional work timeline items.
- `components/canonical-bio-block.tsx`: canonical short biography block.
- `app/api/diary/route.ts`: placeholder response and future LLM integration.
- `lib/diary.ts`: diary API contract and future model response builder.

## Design Direction

The design layer follows the "diary" concept: sparse, text-forward, dark page
chrome, parchment panels, serif display type, and quiet brass, ember, and
verdigris accents. It should feel modern and referential, not literal or
trademarked.

## Development

Use Node 22 or newer.

```sh
npm install
npm run dev
```

Local verification:

```sh
npm run lint
npm run typecheck
npm run build
```

Cloudflare Pages preview deploy:

```sh
npm run pages:deploy
```

The deploy script reads the Cloudflare token from AWS Secrets Manager. It checks
`CLOUDFLARE_SECRET_ID` first, then falls back to the known Pally Cloudflare
secret names. It does not print the token.
Use `CLOUDFLARE_PAGES_BRANCH` for branch previews. The Pages production branch
defaults to `main`.

## Agent Context

Read `AI_CONTEXT.md` before future changes. It documents the site conventions,
placeholder policy, design system, SEO structure, and verification gate for
future coding agents.
