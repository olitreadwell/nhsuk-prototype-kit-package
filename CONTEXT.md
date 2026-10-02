# nhsuk/nhsuk-prototype-kit-package context
> refreshed 2026-10-03 | upstream default: main @ 68ee38e (unchanged since 2026-09-30)

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
- 2026-10-02: no maintainer-engaged, unclaimed, non-feature open issue survives (open issues are Frankie's filter requests #331/#304/#293/#292/#291 plus open-ended enhancements #397/#392/#384/#289/#288/#251/#214/#182/#169/#222/#221/#59 and assigned #219/#223) — used the repo-audit self-found path

## Gap ledger (dedupe — READ FIRST, never re-pick)
- `2026-08-26` issue #330 (formatTime filter) — pr-opened (fork PR #1, feat/format-time-filter) — upstream then merged its own add-format-time-filter (#383), so #1 is now redundant
- `2026-09-09` trivial pass — pr-opened (fork PR #7, fix-typos-and-doc-cleanup) — 3 genuine fixes
- `2026-09-30` self-found bug: formatPostcode mangles partial postcodes — pr-opened (fork PR #15, fix-format-postcode)
- `2026-10-02` self-found packaging gap: published npm tarball includes the CommonJS test lib/index.test.cjs — pr-opened (fork PR #16, fix-published-test-files)
- `2026-10-03` trivial pass (docs links + typos) — pr-opened (fork PR #17, fix-docs-links-and-typos) — 4 genuine fixes
- `2026-09-27` and `2026-09-29` engine/run.sh exited 1 with no trace for this repo — logged as engine-failure rows in tried-repos.jsonl

## Mined gaps (discovered, not yet attempted)
- `2026-09-09` typo "guidlines" in docs/releasing.md — attempted (PR #7)
- `2026-09-09` dead link to nhsuk-prototype-kit-package/issues/644 in lib/express-settings/query-parser.js — dropped (link was already correct)
- `2026-09-09` wrong JSDoc param in lib/nunjucks-filters/log.js — attempted (PR #7)
- `2026-09-30` formatPostcode mangles partial postcodes ("M1" -> " M1", "SW1A" -> "S W1A") — attempted (PR #15)
- `2026-10-02` package.json "files" only excluded lib/**/*.test.js, so lib/index.test.cjs is published in the npm tarball — attempted (PR #16)
- `2026-10-02` lib/views/500.html renders the error message with `nl2br | nl2br`, which doubles every line break (nunjucks replaces each newline with `<br />`) — discovered, not attempted (present since #84, intent unclear)

## Run 2026-09-30 (bug-fix pass)
- pr-opened: fork PR #15 (fix-format-postcode) — self-found bug in lib/nunjucks-filters/format-postcode.js: the regex made the inward code optional, so a partial postcode passed the format check and was then split 3 characters from the end ("M1" -> " M1" with a leading space; "SW1A" -> "S W1A"). Fix requires both the outward and inward codes, so a partial postcode is returned unchanged. Reproduced the bug on upstream main @ 68ee38e before fixing. Added 2 tests (upper + lower case partial postcodes). Verified locally on Node 24.21.0: npm test 220 pass / 0 fail; npm run lint green (tsc + eslint + prettier). Dedupe: no upstream issue and no open/closed PR fixes this; the only postcode PR is #248 (added the filter). Fork CI: Actions were off for this fork (0 runs ever) — enabled them, then a close/reopen of the PR triggered Tests + Code style checks, both green (runs 36736587305 / 36736587252).

## Run 2026-10-02 (repo-audit self-found pass)
- pr-opened: fork PR #16 (fix-published-test-files) — self-found packaging gap in package.json. The `"files"` exclusion added in #94 (Fixes #93) only matched `!lib/**/*.test.js`, so the co-located CommonJS test `lib/index.test.cjs` (added later in #148) was included in the published npm tarball. Reproduced on upstream main @ 68ee38e: `npm pack --dry-run` listed `lib/index.test.cjs` (3.8 kB) while every `.test.js` file was excluded. Fix: change the pattern to `!lib/**/*.test.{js,cjs}`. After the fix `npm pack --dry-run` reports 56 files with no test artifacts; `lib/index.cjs` and `lib/index.js` are still present. Dedupe: `gh search issues/prs` for npm pack / test.cjs / tarball / files publish returned nothing; no upstream or fork PR touches this. Verified locally on Node 24.21.0 (npx node@24): npm test 218 pass / 0 fail; npm run lint green (tsc + eslint + prettier). Fork CI on PR #16: Tests (Node 22 + 24) and Code style checks all green; mergeStateStatus CLEAN. PR body uses the pipeline 3-section fallback (repo has no PR template; nhsuk/.github 404). de-ai-text gate script could not run (skills/de-ai-text/rules/tells.json missing), so the body was checked manually for AI mentions (clean).

## Run 2026-10-03 (trivial-fix pass, engine/loop-trivial.sh)
- pr-opened: fork PR #17 (fix-docs-links-and-typos) — 4 genuine, meaning-preserving fixes across 4 files (+7/-7): (1) README.md:3 broken sentence "the NHS prototype kit is distributed..." -> "...the NHS prototype kit, which is distributed..."; (2) SECURITY.md:24 and :34 invalid link `[cybersecurity@nhs.net](cybersecurity@nhs.net)` -> `mailto:` target (relative path 404s; other mailto links in repo work); (3) CONTRIBUTING.md:17 stale `?template=BUG_REPORT.md` query dropped (no issue template in repo or nhsuk/.github, so query is ignored); (4) lib/middleware/redirect-post-to-get.test.js:33,41,47 removed stray leftover "adds " prefix from three it() titles (present since the test was added in #107). Exhaustive search first: cspell/typos clean apart from what PR #7 already fixed; 728 extracted URLs live-checked (all external 200; only false positives); no stale command references found. Dedupe: prior fork PRs #1/#7/#15/#16 touch different files/content. Verified locally on Node 24.21.0 (npx node@24): npm ci OK; npm test 218 pass / 0 fail; npm run lint green (tsc + eslint + prettier). Fork CI on PR #17: Tests (Node 22 + 24) and Code style checks all green. PR body uses the pipeline 3-section fallback (repo has no PR template; nhsuk/.github 404). de-ai-text gate script could not run (skills/de-ai-text/rules/tells.json missing), so the body was checked manually for AI mentions (clean).
