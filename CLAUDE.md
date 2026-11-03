# Project: What's My Trait, a free psychometric tests site

## What this is
A static Astro site of free, open personality and interest tests. Every instrument is free for any use.
Results are scored and stored on the person's device. No sign-up, no email capture, no tracking.

## Absolute rules
- Only these instrument families: IPIP (trait and interest scales), TIPI, Rosenberg Self-Esteem Scale,
  O*NET Interest Profiler. Nothing else without a written owner decision in docs/decisions/.
- No clinical screeners. No IPIP scale that measures a clinical state. The site measures traits.
- Items are copied exactly from the published key; a test asserts this. Never paraphrase an item.
- Never invent or estimate norms, reliability figures or sample sizes. Missing data is stated as missing.
- Results describe tendencies. They never diagnose and never give life advice.
- Trademarked names (MBTI, Myers-Briggs, 16Personalities, NEO, VIA) only in /compare/ articles.

## House style
- British English, sentence case, no em dashes, no all-caps labels, no arrows after links.
- Copy is plain and short. Active voice. Buttons say what happens (Start the test, Save as PDF).

## Design
- Follow docs/design-direction.md. The style tile in /design/ is the source of truth once approved.
- One font family (Familjen Grotesk), one marker colour, the strip as the results device.
- Avoid the generic defaults listed in docs/design-direction.md. Screenshot and critique before shipping any page.

## Engineering
- packages/instruments is a pure library: load, render, score, percentile. No DOM in scoring.
- Every instrument is a JSON file with source, licence, items, scoring and norms. Adding a test = file + page.
- Tests: vitest for scoring against worked examples; Playwright for one full run of each test;
  a build check for orphan pages, missing sources boxes and missing licence lines.
- Lighthouse on mobile for home, a test page and a trait page: accessibility and best practices 95+,
  performance 80+ (the Google Analytics tag costs the score; owner's choice, docs/decisions/0004-analytics.md).

## Commands
- npm run dev, npm run build, npm test (vitest), npm run e2e (Playwright full run of every test page),
  npm run typecheck, npm run check (wordlist, and on dist: orphans, sources boxes, licence lines, titles, trademarks),
  npm run lighthouse (mobile, four pages, performance 80 or above, the rest 95), npm run a11y (axe on every page). Build before check, lighthouse and a11y.
- This repository uses npm workspaces, not pnpm.

## Owner decisions
Recorded in docs/decisions/. In force at the time of writing:
- Site name What's My Trait, domain https://www.whatsmytrait.com (src/consts.ts, astro.config.mjs).
- Light mode only at launch.
- HEXACO and the 16-factor test are held back from the first release.
- The for-teachers-and-researchers page is printable HTML only, no generated PDFs.
