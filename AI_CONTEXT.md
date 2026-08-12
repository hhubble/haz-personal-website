# AI Context

These notes are repository-level guidance for future agents working on this
site. They do not replace tests, TypeScript types, or user instructions.

## Product Intent

- This is Harry "Haz" Hubble's personal website.
- The core concept is "the diary": visitors write into a full-bleed diary
  surface, and the site writes back.
- The current site is a scaffold only. Keep all biography and public claims as
  `[PLACEHOLDER COPY]` until Haz provides verified copy.
- Do not add Harry Potter trademarks, logos, names, or literal themed imagery.
  The visual direction is modern, sparse, dark, and parchment-like.

## Design System

- Use a restrained diary aesthetic: dark page chrome, parchment panels, serif
  display type, and quiet brass, ember, and verdigris accents.
- Keep the homepage as the product surface. Do not turn it into a marketing
  landing page.
- Use semantic HTML. Each page must have one `h1`.
- Keep cards and panels simple. Use rounded corners only where they frame real
  content.
- The visual layer should stay lightweight. Prefer Tailwind utilities and small
  local CSS rules over component libraries.

## Architecture

- This is a Next.js App Router site with TypeScript and Tailwind CSS.
- The package is pinned to Next 14 because the Cloudflare Pages preview path
  uses `@cloudflare/next-on-pages`.
- Public routes live under `app/`.
- Shared data lives under `lib/`.
- `lib/diary.ts` owns the diary API response contract.
- Shared React components live under `components/`.
- Static assets live under `public/`.
- The diary interaction calls `POST /api/diary`.
- The diary API currently returns a placeholder response.
- The API route exports the Edge runtime so Cloudflare Pages can run it.
- `scripts/deploy-cloudflare-pages.mjs` fetches the Cloudflare API token from
  AWS Secrets Manager and deploys through Wrangler.
- `scripts/build-cloudflare-pages.mjs` redirects Vercel CLI state into the
  system temp directory so Pages builds do not write into `~/Library`.
- Use `CLOUDFLARE_SECRET_ID` only when the default Pally secret names are not
  correct.
- Use `CLOUDFLARE_PAGES_BRANCH` for preview deployments. Keep
  `CLOUDFLARE_PAGES_PRODUCTION_BRANCH` as `main` unless the production branch
  changes.
- The future LLM integration should receive verified context from `lib/entries`
  or another explicit source. Do not let the API invent biography details.

## Placeholder Policy

- Mark unfinished public copy with `[PLACEHOLDER COPY]`.
- Mark metadata and structured-data fields that need verification with `TODO`
  comments near the source value.
- Search for `TODO` and `PLACEHOLDER` before release.
- Keep placeholder social links and schema URLs obviously fake until verified.

## SEO And Structured Data

- Root metadata lives in `app/layout.tsx` and `lib/site.ts`.
- JSON-LD Person schema lives in `lib/site.ts`.
- `app/sitemap.ts` and `app/robots.ts` define crawl routes.
- Keep canonical URLs derived from `siteMetadata.url`.
- Replace the placeholder domain and Open Graph image before production launch.

## Development Workflow

- Use Node 22 or newer.
- Install with `npm install`.
- Run these checks before pushing:

```sh
npm run lint
npm run typecheck
npm run build
npm run pages:build
```

- Keep changes scoped. Do not add dependencies unless they remove real
  complexity.
- If a change touches routing, metadata, or the diary API contract, update this
  file and the README in the same change.

## Agent Handoff

- Read `AI_CONTEXT.md`, `README.md`, and `git status` before making changes.
- Report changed files, key decisions, and exact verification commands.
- Do not replace placeholder copy with guessed facts.
- Do not commit `.env`, `.next`, `node_modules`, or worktree marker files.
