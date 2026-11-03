# Style tile review, 3 November 2026

An outside critique of `design/style-tile.html` against `docs/design-direction.md`, run as a separate reviewer before the owner saw the tile, and what was done about each point.

## Verdict

The marker is the memorable element and the register is a reference work. Three things pulled it towards a survey tool: fifty identical rounded option boxes with hairlines between items, a toolbar of five outlined buttons under the results, and a plate radius. The tile's own numbers did not agree with each other.

## Must fix, and the outcome

1. Label the outline marker and date both markers in the two-marker strip. Done: each marker carries its percentile, the second in Quiet; a key line under the strip names both; the text equivalent describes both.
2. Make the numbers agree: one named instrument, axes matching its item counts, the specimen table matching the plate, no 100th percentile. Done: the plate is the IPIP-NEO-120, domains run 24 to 120, facets 4 to 20, and the table is generated from the same data.
3. Switch the percentile label to the left of the marker past about 85%. Already in the renderer; the tile now shows it (Openness, 97th).
4. Fill the middle 50% with the band-mid token and stop layering it over the density. Done: the density is drawn as three clipped pieces, so the middle 50% is the token itself.
5. Sentence-case the five anchor labels. Done on the page; the data file keeps the published title case and only letter case changes.
6. Remove the plate and option radius and the per-item hairlines. Done.
7. Hide the keyboard hint on phones and replace the legend with the two end labels. Done: "Very inaccurate" and "Very accurate" sit under boxes 1 and 5 on phones.
8. Percentile label at weight 400. Done.
9. Footer margin. Done.

## Worth considering, and the outcome

10. Demote share and reminder to links. Done.
11. Facets under their own domain. Done.
12. Nav gap on phones. Done; five links fit one row at 375 px.
13. Hanging indent for wrapped item text. Done.
14. Comparable curve heights. Done: height is relative to a flat distribution over the same scores, and the plate says "Curve height shows how common each score is".
15. Remove the Alpha column; reliability belongs in the sources box. Done.
16. H2 tracking. Removed.
17. "Introvert or extrovert?" keeps the popular spelling on purpose; the URL in the brief uses it.

Noted and kept: ochre under Extraversion is close in hue to the Marker. It is a 2 px band and the marker has an ink edge, so the marker still reads as the one saturated element; revisit if it bothers the owner.
