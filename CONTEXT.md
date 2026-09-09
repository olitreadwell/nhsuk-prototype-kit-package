# nhsuk/nhsuk-prototype-kit-package context
> refreshed 2026-09-09 | upstream default: main @ d690049

## Identity & policies
- upstream: nhsuk/nhsuk-prototype-kit-package, default branch main, primary language JavaScript, English-first yes (all docs/comments in English)
- CLA/DCO: none (CONTRIBUTING.md has no CLA/DCO requirement)
- AI-assisted PR policy: unstated (no mention in CONTRIBUTING.md)
- signed commits required: no (no branch protection signature requirement)
- PR template: none (no .github/PULL_REQUEST_TEMPLATE.md; no nhsuk/.github org default found)
- external tracker: github

## Conventions (verified from merged PRs)
- branch naming: `<verb>-<description>` kebab-case for human PRs (e.g. add-unreleased-release-notes, update-link-in-docs, release-8.4.0); dependabot uses dependabot/npm_and_yarn/...
- commit style: plain imperative, no Conventional Commits prefix observed
- test command: `npm run test` (node --test); lint: `npm run lint` (types + eslint + prettier)
- CI checks that gate merge: Code style checks (lint) + Tests (node 22/24) workflows on pull_request
- outside PRs get merged: responsive, frequent external merges (16 in 60d)

## Maintainer picture
- active maintainer: Frankie Roberto (contributor in package.json); responsive, merges small PRs quickly
- areas actively worked: release notes, dependency bumps, docs links

## Issue-area health
- small young repo (2 stars), few issues; issue #644 referenced in code lives in the template repo nhsuk/nhsuk-prototype-kit, not here

## Gap ledger (dedupe — READ FIRST, never re-pick)
- `2026-08-26` issue #330 (formatTime filter) — pr-opened (fork PR #1, feat/format-time-filter) — feature request, distinct from trivial pass

## Mined gaps (discovered, not yet attempted)
- `2026-09-09` typo "guidlines" in docs/releasing.md — proposed
- `2026-09-09` dead link to nhsuk-prototype-kit-package/issues/644 in lib/express-settings/query-parser.js (correct issue is in nhsuk/nhsuk-prototype-kit) — proposed
- `2026-09-09` wrong JSDoc param description in lib/nunjucks-filters/log.js ("the NHS number to format" copy-paste) — proposed

## Run 2026-09-09 (trivial-fix pass)
- pr-opened: fork PR #7 (fix-typos-and-doc-cleanup) — 3 genuine fixes: "guidlines"→"guidelines" (docs/releasing.md), "nestee"→"nested" (auto-routes.test.js), wrong JSDoc param in log.js. Verified locally (178 tests pass, tsc/eslint pass). Fork Actions disabled, no fork CI. Note: query-parser.js issue #644 link was already correct (points to nhsuk/nhsuk-prototype-kit) — NOT a fix.
