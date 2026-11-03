Build the site, screenshot one page at phone and laptop widths, and write a critique against docs/design-direction.md and its list of defaults not to fall back to.

Arguments: `$ARGUMENTS` is the page path, for example `/tests/big-five/short/`.

Steps:
1. Run `npm run build`. Stop if it fails.
2. Serve `dist/` (for example `npx astro preview`) and open the page in the browser pane at 375 px and 1280 px wide. Take screenshots of the whole page at both widths, scrolling as needed, and of the results state if the page is a test (complete the test with the keyboard).
3. Read docs/design-direction.md in full.
4. Write the critique: does the page read as a reference work; is the strip the one memorable element; typography (sizes, measure, the single italic, tabular figures); layout (space and hairlines, not boxes); copy (British English, sentence case, no em dashes, no all-caps labels, no arrows, buttons that say what happens); colour (one marker colour, hues as thin bands only, nothing coded good or bad); accessibility (keyboard operation, visible focus, text equivalents for strips, reduced motion); every item on the defaults list, checked one by one; phone width.
5. End with a numbered list of concrete fixes, most important first, split into must-fix and worth-considering. Save it as `docs/reviews/<date>-<slug>.md` and report the must-fix list.
