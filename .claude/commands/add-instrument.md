Add an instrument data file from its published scoring key, then stop for review before any page is made.

Arguments: `$ARGUMENTS` is `<id> <key-url>`, for example `ipip-neo-120 https://ipip.ori.org/30FacetNEO-PI-RItems.htm`.

Rules that apply (see CLAUDE.md): only the approved families (IPIP trait and interest scales, TIPI, Rosenberg, O*NET Interest Profiler); no clinical state scales; items copied character for character; never invent norms or reliability.

Steps:
1. Fetch the key page at the URL given. Also fetch the instrument's administration-order page if the key page does not give item numbers, and the licence page for the family. Record each URL and today's date.
2. Confirm the instrument is in an approved family and measures a trait or an interest. If it is not, stop and say why.
3. Draft `packages/instruments/data/<id>.json` in the shape of `packages/instruments/src/instrument.ts`: id, version 1, name as the authors name it, source (paper, doi, keyUrl, itemsUrl, scoringUrl, accessed), licence (text, url, credit where the licence asks for one), instructions, response scale with the published labels, scales (with facets and parents where the instrument has them), items in published order with scale and key, scoring, norms null, reliability per scale with reliabilitySource naming the page or paper.
4. Write `packages/instruments/tests/<id>.test.ts` that asserts, independently of the data file: the item count, the set of reverse-keyed item numbers, the +keyed and -keyed counts per scale from the key page, the response labels, a few item texts verbatim, and worked scoring examples (all highest, all lowest, all neutral, and the pattern that reaches the maximum on every scale).
5. Run `npm test` and `npm run check`. Both must pass.
6. Stop. Report what was added, which figures came from where, and anything the key page left unclear. Do not scaffold a page; that is `/add-test-page`.
