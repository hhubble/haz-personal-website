# AI Context

These notes are repository-level guidance for agents working on this site.
They do not replace tests, TypeScript types, or user instructions. Read this
file, `README.md`, and `git status` before making changes.

## Product Intent

- This is Harry "Haz" Hubble's personal website.
- The core concept is "the diary". The site IS the diary. Visitors write into
  a full-viewport tea-stained notebook page, and the diary writes back.
- The design reference is Tom Riddle's diary: writing sinks into the paper,
  and the answer bleeds back out of it. The site must feel like a found
  magical object, not a web product.
- Do not add Harry Potter trademarks, logos, character names, or literal
  franchise imagery. The reference is interaction and mood only.
- The site is a scaffold. Keep all biography and public claims as
  `[PLACEHOLDER COPY]` until Haz provides verified copy.
- KILL THE SAAS LOOK (founder direction, 2026-08-12). Never add: a nav bar, a
  header, a footer, cards, panels with rounded corners, pill buttons, chip
  rows, kicker labels, gradient hero sections, or marketing sections. If a
  change reads as a landing page, it is wrong.

## Design System

The direction below was set by the design lead on 2026-08-12. Treat it as the
contract for all visual work.

- One object on screen: a full-viewport spread of aged, tea-stained paper.
  The paper fills the viewport on every route. There is no page chrome around
  it.
- Paper surface: layered CSS gradients for tea stains, mottling, and an edge
  vignette, plus an SVG `feTurbulence` grain texture. Faint ruled lines fade
  toward the page edges. Keep the texture in CSS and inline SVG. Do not add
  image assets or texture libraries.
- Palette: warm paper neutrals (parchment base near `#e9dfc8`, stain tones
  toward `#c9b489`, scorched edges toward `#6b573f`) and iron-gall ink near
  `#2b2a33` with a faded-ink tone for old writing. No brand accent colors.
  At most one wax-seal red, used rarely.
- Typography: handwritten ink faces loaded through `next/font/google`. The
  diary writes in Caveat. The visitor's writing renders in Shadows Into Light
  Two. Long-form printed matter (entry bodies, structured bio) uses IM Fell
  English. No Inter, no geometric sans anywhere on the rendered page.
- The Riddle interaction on the homepage: the visitor writes onto the ruled
  lines in their own hand. On submit the words sink into the paper (fade,
  blur, slight downward drift). After a beat the reply bleeds up out of the
  paper word by word, from blurred ink to crisp. Loading state is a spreading
  ink blot, never a spinner.
- Navigation happens inside the diary. Use handwritten marginalia links in
  the page margins and a dog-eared corner that curls on hover to turn the
  page. Route changes play a page-turn transition (CSS 3D transforms, no
  animation libraries).
- Every route is another page of the same notebook: same paper, handwritten
  headings, ink-rule separators, marginalia to navigate back.
- Motion respects `prefers-reduced-motion`: replace sink, bleed, and
  page-turn animations with instant swaps.
- Keep semantics: one `h1` per page, labeled form controls, `aria-live` for
  diary replies, visible ink-colored focus styles.

### CSS Gotchas

- Never put a color (or a `var()` that resolves to a color) in a
  `background-image` layer list. A color is not an `<image>`, and with
  `var()` the failure is invalid-at-computed-value time: the browser
  silently drops the entire `background-image` stack, so every stain and
  vignette disappears with no console error. Set the base color with
  `background-color` and verify with
  `getComputedStyle(document.body).backgroundImage` in the browser, not by
  reading the stylesheet.
- Do not run `npm run build` or `npm run pages:build` while `next dev` is
  serving. They share `.next`, and the dev server keeps serving stale CSS
  afterward. Stop the dev server first, or restart it and delete `.next`.

## Architecture

- Next.js App Router with TypeScript and Tailwind CSS.
- The package pins Next 14 because Cloudflare Pages preview uses
  `@cloudflare/next-on-pages`.
- Public routes live under `app/`. Shared data lives under `lib/`. Shared
  React components live under `components/`. Static assets live under
  `public/`.
- `lib/diary.ts` owns the diary API response contract. The diary interaction
  calls `POST /api/diary`. The API route exports the Edge runtime so
  Cloudflare Pages can run it. The API currently returns a placeholder
  response.
- The future LLM integration must receive verified context from
  `lib/entries` or another explicit source. Do not let the API invent
  biography details.
- `scripts/deploy-cloudflare-pages.mjs` fetches the Cloudflare API token
  from AWS Secrets Manager and deploys through Wrangler.
  `scripts/build-cloudflare-pages.mjs` redirects Vercel CLI state into the
  system temp directory. Use `CLOUDFLARE_PAGES_BRANCH` for preview deploys.

## Placeholder Policy

- Mark unfinished public copy with `[PLACEHOLDER COPY]`.
- Mark metadata and structured-data fields that need verification with `TODO`
  comments near the source value.
- Search for `TODO` and `PLACEHOLDER` before release.
- Keep placeholder social links and schema URLs obviously fake until
  verified.

## SEO And Structured Data

- Root metadata lives in `app/layout.tsx` and `lib/site.ts`. JSON-LD Person
  schema lives in `lib/site.ts`.
- `app/sitemap.ts` and `app/robots.ts` define crawl routes. Keep canonical
  URLs derived from `siteMetadata.url`.
- Keep `/entries`, `/work`, and `/about` as real crawlable routes even though
  visual navigation is diegetic.
- Replace the placeholder domain and Open Graph image before production
  launch.

## Development Workflow

- Use Node 22 or newer. Install with `npm install`.
- Run these checks before pushing:

```sh
npm run lint
npm run typecheck
npm run build
npm run pages:build
```

- Keep changes scoped. Do not add dependencies unless they remove real
  complexity. The visual layer stays hand-built: no animation, texture, or
  component libraries.
- If a change touches routing, metadata, the design system, or the diary API
  contract, update this file and the README in the same change.

## Writing Style: ASD-STE100 Simplified Technical English

This convention mirrors the pally personal-agent repo (its `AI_CONTEXT.md`,
Writing Style section).

- Write all engineering artifacts in the style of ASD-STE100 Simplified
  Technical English: docs, PR descriptions, sub-agent briefs, agent reports,
  commit messages, code comments, and this file.
- Keep sentences short. Use at most 20 words for an instruction and at most
  25 words for a description.
- Put one instruction in one sentence. Put one topic in one paragraph.
- Use the active voice. Name the actor who does the action.
- Use one term for one concept across a document.
- Do not adopt the full STE controlled dictionary; the principles above are
  the rule.
- This rule governs writing ABOUT the product. The diary's on-page voice is a
  design decision and is exempt.

## Model Roles And Sub-Agent Orchestration

This section mirrors the pally personal-agent repo's orchestration
conventions, scaled to this small site.

- Claude Fable 5 (the interactive session) owns creative direction, plans,
  sub-agent briefs, diff review, root-level verification, and the push/PR.
- Codex GPT-5.6 Sol at high reasoning implements scoped tasks and makes the
  implementation commits. Delegate implementation to Sol by default. Invoke
  it as a non-interactive sub-agent:

```sh
codex exec --ignore-user-config -m gpt-5.6-sol \
  -c model_reasoning_effort='"high"' --sandbox workspace-write \
  -c sandbox_workspace_write.network_access=true \
  -C <repo-root> -o <report-file> --color never - < <prompt-file>
```

- Use the explicit `gpt-5.6-sol` model id, not the `gpt-5.6` alias.
- Write each task brief to a prompt file under `.context/` (gitignored) and
  capture the agent's report with `-o` next to it. Review the report and
  `git diff` before the next wave.
- Every sub-agent prompt must state: the agent IS the implementing Sol
  sub-agent and must not delegate further; the design-system rules that
  apply; an explicit file-scope boundary; a requirement to read `git status`
  and `git diff` first; the verification commands; and the required report
  format (files changed, decisions, verbatim check results).
- Fable-inline work is limited to: small seam fixes found in diff review,
  mechanical git operations, docs-only edits, and read-only investigation.
- NEVER kill processes by bare name or pattern (`pkill codex`,
  `pgrep -f "codex exec" | xargs kill`). Other workspaces run agents on this
  machine in parallel. Stop background work through the harness task-stop
  facility. If a shell kill is unavoidable, match on this workspace's
  absolute path and inspect `pgrep -fl` output before signalling.

## Release Workflow

- Do not push, deploy, or open a PR unless the user asks for it.
- Base PRs on `main`. Push and open PRs through the local git and `gh`
  CLIs, which are authenticated on this machine.
- Before a push, run the four checks in Development Workflow.
- `.github/workflows/deploy.yml` builds with `npm run pages:build` and
  deploys `.vercel/output/static` to the Cloudflare Pages project
  `haz-personal-website` with Wrangler on every push to `main` (plus
  manual `workflow_dispatch`). It needs the `CLOUDFLARE_API_TOKEN` and
  `CLOUDFLARE_ACCOUNT_ID` GitHub repo secrets. The Pages project has no
  native Cloudflare Git integration (`source: null`); this workflow is
  the only automatic deploy path. `npm run pages:deploy` remains for
  manual deploys and pulls credentials from AWS Secrets Manager.

## Agent Handoff

- Report changed files, key decisions, and exact verification commands.
- Do not replace placeholder copy with guessed facts.
- Do not commit `.env`, `.next`, `node_modules`, `.context/`, or worktree
  marker files.
