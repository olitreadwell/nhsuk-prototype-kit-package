# nhsuk/nhsuk-prototype-kit-package context
> refreshed 2026-09-30 | upstream default: main @ 68ee38e

## Identity & policies
- upstream: nhsuk/nhsuk-prototype-kit-package, default branch main, primary language JavaScript, English-first yes (all docs/comments in English)
- CLA/DCO: none (CONTRIBUTING.md has no CLA/DCO requirement)
- AI-assisted PR policy: unstated (no mention of AI anywhere; bans_ai:false, ai_disclosure_required:false)
- signed commits required: no (no branch protection on main — the API returns "Not Found")
- PR template: none (no PULL_REQUEST_TEMPLATE.md in any case/location; nhsuk/.github does not exist, so no org default) — use the pipeline 3-section fallback body
- external tracker: github

## Conventions (verified from merged PRs)
- branch naming: `<verb>-<description>` kebab-case for human PRs (merged heads: add-format-time-filter, add-unreleased-release-notes, update-link-in-docs, update-security-info, update-dependencies, prepare-8.5.0-release, release-8.4.0); dependabot uses dependabot/npm_and_yarn/...
- commit style: plain imperative, no Conventional Commits prefix (eg "Add formatTime and formatTime24Hour filter", "Prepare 8.5.0 release")
- test command: `npm test` (== `node --test`); lint: `npm run lint` (tsc types + eslint + prettier)
- toolchain: required Node is in `.nvmrc` (^24); Node 20 fails the pre-existing formatTime tests and the prettier plugin, so use Node 24
- CI that gates merge: .github/workflows/code-style-checks.yml (lint) and tests.yml (node 22/24), both `on: pull_request`
- outside PRs get merged: responsive; frequent external merges; maintainer merges small PRs quickly
- CONTRIBUTING: "Please raise feature requests as issues before contributing any code." — feature requests need an issue first; bug fixes do not.

## Maintainer picture
- active maintainer: Frankie Roberto (frankieroberto); responsive, merges small PRs quickly
- areas actively worked: release notes, dependency bumps, docs links, new Nunjucks filters
- open maintainer PRs (avoid overlap): #385 Add device frame view; open issues #331 (date/time range filter), #384/#392/#397
- long-open external PRs (avoid overlap): #212 Add new Nunjucks filters (colinrotherham; adds format-phone-number/format-currency/format-number/is-numeric — does NOT touch format-postcode), #264/#265 (colinrotherham)

## Issue-area health
- open issues are mostly Frankie's filter feature requests (#331, #304, #293, #292, #291) — avoid re-picking those
- no open issue about format-postcode correctness; the partial-postcode bug is a self-found gap

## Gap ledger (dedupe — READ FIRST, never re-pick)
- `2026-08-26` issue #330 (formatTime filter) — pr-opened (fork PR #1, feat/format-time-filter) — upstream then merged its own add-format-time-filter (#383), so #1 is now redundant
- `2026-09-09` trivial pass — pr-opened (fork PR #7, fix-typos-and-doc-cleanup) — 3 genuine fixes
- `2026-09-30` self-found bug: formatPostcode mangles partial postcodes — pr-opened (fork PR #15, fix-format-postcode)
- `2026-09-27` and `2026-09-29` engine/run.sh exited 1 with no trace for this repo — logged as engine-failure rows in tried-repos.jsonl

## Mined gaps (discovered, not yet attempted)
- `2026-09-09` typo "guidlines" in docs/releasing.md — attempted (PR #7)
- `2026-09-09` dead link to nhsuk-prototype-kit-package/issues/644 in lib/express-settings/query-parser.js — dropped (link was already correct)
- `2026-09-09` wrong JSDoc param in lib/nunjucks-filters/log.js — attempted (PR #7)
- `2026-09-30` formatPostcode mangles partial postcodes ("M1" -> " M1", "SW1A" -> "S W1A") — attempted (PR #15)

## Run 2026-09-30 (bug-fix pass)
- pr-opened: fork PR #15 (fix-format-postcode) — self-found bug in lib/nunjucks-filters/format-postcode.js: the regex made the inward code optional, so a partial postcode passed the format check and was then split 3 characters from the end ("M1" -> " M1" with a leading space; "SW1A" -> "S W1A"). Fix requires both the outward and inward codes, so a partial postcode is returned unchanged. Reproduced the bug on upstream main @ 68ee38e before fixing. Added 2 tests (upper + lower case partial postcodes). Verified locally on Node 24.21.0: npm test 220 pass / 0 fail; npm run lint green (tsc + eslint + prettier). Dedupe: no upstream issue and no open/closed PR fixes this; the only postcode PR is #248 (added the filter). Fork CI: Actions were off for this fork (0 runs ever) — enabled them, then a close/reopen of the PR triggered Tests + Code style checks, both green (runs 36736587305 / 36736587252).
