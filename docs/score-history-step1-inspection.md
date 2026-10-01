# Score interpretation and history: step 1 inspection note

1 October 2026. This covers COMPASS-31, DSQ-2, Bell, FUNCAP and the fibromyalgia survey, plus the head, JSON-LD and GA wiring. No code has been changed yet.

## What exists

**No shared tool components.** Every tool is one self-contained `.astro` page (`src/pages/tools/<slug>.astro`, 300 to 900 lines). Each page has its own form, its own `#results` div, an inline `<script>` with the scoring, and scoped styles. There is no shared results panel, so "reuse the pattern the results panel already uses" means matching the markup these pages repeat: `div#results.results[hidden]`, `.total-score`, `.score-interp`, `.results-disclaimer`, `.back-btn`. It does not mean an existing component.

**Page flow.** On submit, every page hides the form (`form.hidden = true`) and shows the hidden results panel in the same place. The fibromyalgia survey works differently: it switches between `.screen` divs (intro with the H1, WPI, SSS, duration, results) and scrolls to the top each time. DSQ-2 is multi-step, saves progress in `localStorage` under its own keys, and calls `trackStep` for virtual page views.

**Head and JSON-LD.** `layouts/Page.astro` → `components/BaseHead.astro` owns every meta, OG, canonical and hreflang tag. Each tool page hand-writes one `<script type="application/ld+json">` in the `head` slot holding an `@graph` of BreadcrumbList and FAQPage (1 to 3 questions). The tool pages do not use `components/JsonLd.astro` (MedicalWebPage). The only change Part 1 needs here is extra FAQPage entries in that existing block. No new head blocks.

**GA.** gtag.js is loaded inline in `BaseHead.astro`. Astro bundles that inline script as a module, so `gtag` is not a global. `scripts/pageview.ts` gets around this by pushing `arguments` onto `window.dataLayer` itself. New events will use the same approach, through a small `track(name, params)` helper.

**Storage precedent.** `scripts/hrv-store.ts` and `scripts/exercise-store.ts` use a versioned key, try/catch on every access and validate on read. `resultsStore.ts` will follow the same style and sit next to them.

**Theme.** There is one light theme and no dark mode. Colour tokens live in `styles/global.css` (`--accent`, `--accent-light`, `--gray*`, `--tools`). The SVG line chart will use these.

**Tests.** There is no test runner. I plan to add `vitest` as a dev dependency, and nothing else, for the store and .ics tests.

**Sitemap.** `@astrojs/sitemap` is configured in `astro.config.mjs`. I will add a `filter` there to exclude `/tools/my-results/`.

## How the new pieces attach

- **Per-tool config** at `src/tools/<id>.ts`: id, version, display name, bands, sub-score labels, MIC (or null), and the Layer 2 FAQ pairs as data. The FAQPage JSON-LD and the visible Layer 2 text are both generated from that one source, so they cannot drift apart.
- **Layer 1 (`ResultInterpretation`)** will be a client function that returns the band sentence, the top domains and the MIC sentence. It writes into the existing `.score-interp` paragraph in place of each page's current `interpret()`.
- **Layer 2** will be an `.astro` partial per instrument (`src/components/interpretation/Compass31.astro` etc.), placed *after* `#results` and outside it. It is therefore built into the static HTML, always visible, and below the form. The existing "Understanding your score" block inside the hidden results panel will be removed, so the page does not have two versions of that text.
- **`ScoreHistory` + `ResultExport` + `CalendarReminder`** will be one `.astro` component (markup and styles) with a client module. It goes inside `#results`, after the existing breakdown. Because it renders synchronously in the same submit handler that reveals the panel, it adds no layout shift of its own; the form-to-results swap already happens on user input, which CLS excludes. The one exception is a share-link fragment on page load. In that case the shared block renders in a reserved container under the form, and only when a fragment is present.
- **Each page's submit handler** gains one call, `recordResult(config, { total, subscores, band, summary })`, which saves the result, shows the notice and renders history. This adds a few lines per page; the scoring logic itself is not restructured.

## Problems found that affect this work

These need your decision before step 3. All the history entries will carry a `toolVersion`, so any scoring fix should land before history goes live. Otherwise early saved results will not be comparable with later ones.

1. **COMPASS-31 bladder and pupillomotor weights are swapped.** The page gives bladder a maximum of 5 and pupillomotor a maximum of 10. Sletten et al. 2012, Table 3, gives [bladder 10 (×1.1111) and pupillomotor 5 (×0.3333)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3541923/). The item counts per domain (4/3/4/12/3/5) match the paper.
2. **COMPASS-31 raw scoring is not the published method.** The page scales each domain by (sum of answers ÷ sum of option maxima) × weight, with every item on a 0 to 4 scale. The paper's raw maxima are OI 10, VM 6, SM 7, GI 28, BL 9, PM 15, because items have different response sets (several are yes/no or frequency items). The item wording on the page also looks paraphrased rather than taken from the instrument. Matching the published scoring means checking the items against the instrument itself (Supplemental Appendix 2 of the paper). This is a bigger job than the brief, and I suggest we scope it separately but do it before history goes live.
3. **The current COMPASS-31 copy and FAQ have unsourced numbers.** "Healthy controls scored a mean of approximately 5 to 7" and "above 16 is commonly cited" are not in Sletten 2012 (no control means are reported there). The page's `interpret()` bands (5/16/30/50) also disagree with its own visible text (10/20/40). Part 1 will replace all of this with sourced figures or "not established".
4. **Fibromyalgia generalised pain may be over-counted.** As I understand Wolfe et al. 2016, jaw, chest and abdomen do not count towards the generalised pain (4 of 5 regions) criterion. The page counts them. I will verify this against the paper before touching it.
5. **Unsourced bands elsewhere.** These are FUNCAP's overall bands (5 / 3.5 / 2), the fibromyalgia FS score bands (6 / 12 / 20), and Bell's "a sustained shift of 10 or more points is generally considered meaningful". Each will be checked against the papers in Part 1.
6. **DSQ-2 has no single total**, so history stores `total: null` and the four case-definition outcomes, plus domain averages as sub-scores. The comparison sentence will describe changes in which definitions are met, with no total.
7. **Fibromyalgia survey: where Layer 2 goes.** Below the screens, it will show under whichever screen is active, intro included. That fits "beneath the results panel" and keeps the questionnaire where it is, but it is worth seeing on the page.
8. **No dark mode**, so the "reads in both themes" requirement does not apply yet. The SVG will still use tokens rather than hard-coded colours.

## Update, 1 October 2026: scoring corrected to the published sources

- **COMPASS-31.** The page has been rebuilt to the published items, answer options, skip rules and points, as given in the scoring table in Okdahl et al., BMJ Open 2021, supplement 3, which applies Sletten 2012. Weights are now OI 40, VM 5, SM 15, GI 25, BL 10, PM 5. The unsourced "5 to 7" and "above 16" claims and the bands have been removed. The Larsen 2022 figure (66% of 2,314 long COVID respondents scored above 20) was checked against the abstract. Question wording is a plain-English rendering, not the verbatim Mayo text.
- **Fibromyalgia.** Jaw, chest and abdomen are now excluded from the 4-of-5 regions count (Wolfe 2016, Table 3). The FS bands have been replaced with the polysymptomatic distress categories from Wolfe 2015 (0–3, 4–7, 8–11, 12–19, 20–31).
- **FUNCAP27.** The total is now the mean of the eight domain scores (Sommerfelt 2024, Tables 5 and 6). The unsourced bands have been replaced with the paper's reference means (ME/CFS 3.3, healthy controls 5.8). Item list checked: all 27 items match.
- **Bell.** The level descriptions have been restored to Bell 1995, pp 119–31. The unsourced "10 points is meaningful" claim has been replaced.
- **Not yet checked:** the DSQ-2 case-definition algorithms against Jason/Bedree.
