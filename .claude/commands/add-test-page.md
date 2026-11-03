Scaffold a test page from the test template for an instrument that already has a data file.

Arguments: `$ARGUMENTS` is the instrument id, for example `ipip-50`.

Steps:
1. Load `packages/instruments/data/<id>.json` and confirm its test passes (`npm test`).
2. Decide the URL from the question the test answers, not the instrument name (`/tests/introvert-or-extrovert/`, not `/tests/ipip-extraversion/`), following the URL map in docs/design-direction.md and the brief. Lowercase, hyphenated, no dates, no trailing numbers.
3. Create the page under `src/pages/tests/` using the test template layout, in the order the template fixes: H1 named for the question with a one-line subtitle naming the instrument and its length; one paragraph on what it measures and the start button with "No sign-up, scored on your device, nothing stored online" under it; the test; results; Understanding your scores (80 to 120 words per scale for high and low, linking to the trait pages); How reliable is this test (reliability per scale from the data file, the norm sample and group, a test-retest note or the statement that none is published, honest limits); Related tests and comparisons (three hand-picked links); FAQ of five to seven people-also-ask questions with FAQPage schema; the sources and licence box pre-filled from the data file.
4. Title under 60 characters, written for the search; meta description one plain sentence with the item count and time. No trademarked test name (MBTI, Myers-Briggs, 16Personalities, NEO, VIA) in the title or H1.
5. Add the page to the tests index and link it from at least two other pages.
6. Run `npm run build`, `npm run check` and `npm run typecheck`. Screenshot the page at phone and laptop widths and critique it against docs/design-direction.md before reporting.
7. Stop and report. Flag any copy you were unsure of for the owner.
