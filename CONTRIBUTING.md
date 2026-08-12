# Contributing

This repository is intentionally small. Keep changes direct and easy to review.

## Commit Style

- Use short, imperative commit messages.
- Keep each commit focused on one site change.
- Mention placeholder or SEO changes explicitly when they affect public output.

## Checks

Run the full local gate before pushing:

```sh
npm run lint
npm run typecheck
npm run build
```

## Copy Rules

- Keep unverified biography copy marked as `[PLACEHOLDER COPY]`.
- Keep fields that need real public values near a `TODO` comment.
- Do not add final claims about Haz, Pally, dates, or roles without verified
  source copy from Haz.
