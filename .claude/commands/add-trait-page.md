Scaffold a trait page with the distribution strip wired to the norms.

Arguments: `$ARGUMENTS` is the scale id as it appears in an instrument file, for example `E` or `E1`, optionally followed by the instrument id when the scale exists in more than one.

Steps:
1. Find the scale in `packages/instruments/data/` and its norms in `packages/instruments/data/norms/`. If no norms exist, the page draws the strip over the raw range with no density band and says so in one sentence.
2. Create `src/pages/traits/<slug>.astro` using the trait template, in this order: what the trait is in one paragraph; what high and low look like in daily life; the facets with one line each (for a domain), or the parent domain (for a facet); what the research says it predicts, with citations; what it does not mean, written before what it does; the population strip with no marker, and the saved-result marker with its one-line note when a result exists on the device; the button to take the test that measures it; links to the sibling traits.
3. No life advice anywhere on the page. No clinical words (`npm run check` enforces the wordlist).
4. Link the page from the test's results page and from at least one other page.
5. Run `npm run build`, `npm run check` and `npm run typecheck`, screenshot at phone and laptop widths, critique against docs/design-direction.md, then report.
