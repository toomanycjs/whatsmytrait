# Design direction

The source of truth for how the site looks. The style tile in `design/` is built from this document; once the owner approves the tile, the tile's tokens and components are what every page uses. Anything visual that is not in this document or the approved tile is a mistake to fix, not a choice to keep.

## The idea

The identity comes from the subject: a distribution with you marked on it. Every result on the site is a horizontal strip showing where people fall and a single marker showing where you fall. That marker is the one memorable element. Everything else is quiet.

The feel is a well-made reference work that happens to be interactive: calm, exact, warm in tone but not decorated. Not a quiz app, not a wellness brand, not a startup landing page.

## Tokens

The brief proposed these. The refinements column records what changed after checking them and why; the final column is what the tile uses.

| Token | Proposed | Role | Refinement | Final |
| :-- | :-- | :-- | :-- | :-- |
| Page | `#F2F4F1` | Background everywhere; never pure white, never cream | Kept. | `#F2F4F1` |
| Panel | `#E3E8E1` | The test area and results plates | Kept. | `#E3E8E1` |
| Ink | `#23282D` | Text, rules, markers | Kept. 13:1 on Page, 11:1 on Panel. | `#23282D` |
| Quiet | `#5F6872` | Secondary text, axis labels | Darkened. At 14 px on Panel the proposal is 4.5:1, the edge of AA. The final is 5.8:1 on Page and 5.1:1 on Panel. | `#55606A` |
| Marker | `#F2C230` | The you marker on every strip, and nothing else | Kept as the fill, but a yellow can never reach the 3:1 non-text contrast on a pale ground (1.5:1 here). The marker is therefore a Marker fill with a 1.5 px Ink edge, and the percentile number beside it is set in Ink. The edge carries the contrast; the yellow carries the warmth. | `#F2C230` fill, Ink edge |
| Hairline | not proposed | The one rule weight | Added. Rules are 1 px of Ink at 18% over Page, which reads as a line without becoming a box. | `rgba(35, 40, 45, 0.18)` |
| Focus | not proposed | Keyboard focus ring | Added. 3 px of Ink, offset 2 px. Never the Marker colour, which would make focus look like a result. | Ink |

Domain hues, Big Five only, used as thin bands under a strip and never as fills behind text. Muted, close in saturation, spaced in hue and lightness so they separate for the common forms of colour-blindness; and because every strip is labelled in words, colour is never the only carrier of meaning.

| Domain | Hue | Hex |
| :-- | :-- | :-- |
| Openness | slate blue | `#5B6E8C` |
| Conscientiousness | moss | `#6B7F5A` |
| Extraversion | ochre | `#B8923A` |
| Agreeableness | brick | `#A85A48` |
| Emotional stability | plum | `#7B5C7E` |

No other colours exist. Links are Ink, underlined. Buttons are Ink on Page (primary) or Ink outline (secondary). There is no success green, no warning red, no good and bad.

Dark mode: not at launch (owner decision 0001). Tokens are CSS custom properties on `:root` so a dark set can be added behind `prefers-color-scheme` later without touching components.

## Typography

One family, used with intent: Familjen Grotesk (OFL), self-hosted from the `@fontsource-variable/familjen-grotesk` package, latin subset, variable weight 400 to 700.

| Role | Size | Weight | Notes |
| :-- | :-- | :-- | :-- |
| Display | 40 px (32 px under 600 px) | 600 | H1 only. Tight: line-height 1.1, letter-spacing -0.015em. Left-aligned. |
| Heading | 26 px (22 px under 600 px) | 600 | H2. Line-height 1.2. |
| Body | 18 px | 400 | Line-height 1.55. Measure 62 to 68 characters (`max-width: 66ch`). |
| Small | 14 px | 400 | Meta, axis labels, sources box. Line-height 1.45. |

Italic has one job: the plain-language what this means sentence under each result. Nothing else is italic.

Figures: percentiles must align in tables, so the body sets `font-variant-numeric: tabular-nums`. Checked on 3 November 2026 with fontTools against the shipped latin woff2 (version 5.3.0): Familjen Grotesk has the `tnum` feature and its default digits are already a single width (680 units), so figures align without any fallback family.

H3 is Body size at weight 600. There is no H4; a page that needs one is structured wrong.

## Layout

A single left-aligned column for reading (66ch), widening to a plate for the test and the results (a Panel block, `max-width: 44rem`). Structure is shown with space and one hairline rule weight, not boxes. Sections are not numbered unless they are a sequence. Links are underlined, not arrowed.

Spacing scale, in rem: 0.25, 0.5, 1, 1.5, 2, 3, 4.5. Sections are separated by 3; a page's top padding is 4.5 on desktop, 2 on phones. The page has a 16 px side gutter at phone width and no horizontal scroll.

Nav: the site name on the left, five section links on the right, one hairline under. Nothing sticky. On phones the links wrap to a second row; there is no hamburger.

Footer: one sentence, the trust links, the year. One hairline above.

## The strip

The results visual language, which is the product. Drawn in SVG by the engine, never by a charting library.

- Each scale is a strip: a faint density band showing how scores are distributed in the norm sample (Ink at 8%), the middle 50% shaded slightly darker (Ink at 16%), and the person's percentile as a marker with its number beside it.
- The marker is a vertical lozenge, Marker fill, Ink edge, 10 px wide and the band's full height plus 4 px top and bottom. The number sits to its right in Body size, Ink, tabular.
- The band is 28 px tall on a domain strip and 16 px on a facet strip. Facets are small multiples of the same strip under their domain, indented, labelled in Small.
- A domain strip has its domain hue as a 2 px band along the bottom edge. Facets have none.
- The horizontal axis is the raw score, lowest possible at the left and highest at the right, because a distribution drawn on a percentile axis is flat by definition. The density band is the share of the norm group at each raw score; the middle 50% runs from the 25th to the 75th percentile score; the marker sits at the person's raw score and is labelled with their percentile. Axis: the lowest and highest possible raw scores in Small Quiet at the ends, nothing in between. The strip's text equivalent is in the markup: You scored 38 out of 50, the 72nd percentile for extraversion.
- A scale without norms draws the same strip over the raw range with no density band, and the page says why.
- A trait page draws the strip with no marker unless a saved result exists; then the marker and a one-line note (Your score from 14 October sits here).
- Two people or two attempts on one strip: two markers, the second an Ink outline with no fill, labelled.
- The strips draw in once on first view, over about 200 milliseconds, and respect reduced motion. There is no other motion on the site.
- No radar charts, no gauges, no donuts, no colour-coded good and bad.

## Glyphs

Each test has a glyph derived from its structure: five strips for the Big Five, six segments for the interest profiler, one strip for a single trait. The glyphs are the only imagery: on the test index, the home page and the share image. Ink lines on Page, with the Marker colour used once. No stock photography, no illustrations of people, no icons in grids.

## Copy on the page

British English, sentence case, no em dashes, no all-caps labels, no arrows after links, no middle-dot meta strings. Buttons say what happens: Start the test, Save as PDF, Copy as text, Start again. Under every start button: no sign-up, scored on your device, nothing stored online. Results describe tendencies in plain language; the short statement that results describe tendencies and are not a diagnosis replaces any medical disclaimer.

## Defaults not to fall back to

- Cream backgrounds with a serif display and a terracotta accent.
- Dark pages with an acid accent.
- Hairline broadsheet layouts.
- Identical rounded cards with soft grey shadows.
- All-caps eyebrow labels.
- Middle-dot meta strings.
- Monospace for small labels.
- Arrows after link text.
- Testimonials, star ratings or trust badges.
- Radar charts, gauges, donuts, traffic-light colours.
- Hero images, stock photography, icon grids.
- Sticky headers, hamburger menus on a five-link nav.

## Process

Before writing page code: build the style tile (tokens, type scale, one results plate, one question screen, the nav and footer) as a single static page at `design/style-tile.html`, screenshot it at phone and laptop widths, critique it against this document and the defaults list, revise, and ask the owner to approve it. Only then build templates. Every page that ships is screenshotted and critiqued the same way.
