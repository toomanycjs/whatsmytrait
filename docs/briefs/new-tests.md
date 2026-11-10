# Claude Code brief: new tests for What's My Trait

Nov 10, 2026 · Craig

> Saved from the brief the owner pasted into a session on 10 November 2026. If the owner's own Markdown export differs, the export wins. Notes from building T1 are at the end.

A working brief for Claude Code to add twelve new tests (thirteen pages) to whatsmytrait.com, every one from an instrument that is free for any use. It runs alongside the content brief (`docs/briefs/next-releases.md`): one content release and one test release a week.

## How to use this brief

Export this doc as Markdown to `docs/briefs/new-tests.md` in the repo. Each test release is a separate Claude Code session that ends with a review stop, so the two briefs never collide: content releases from the other brief, test releases from this one.

Kickoff prompt for the first test release:

```
Read CLAUDE.md, then docs/briefs/new-tests.md in full.

Do test release T1 only, as specified, then stop for my review.

Rules:
- Only the instruments named in the brief. Never substitute another scale
  without asking.
- Items come from the IPIP (or O*NET) source pages, copied exactly into the
  instrument JSON, with the source URL and the date copied recorded in the file.
  Write the item-count and keying tests before the page.
- Reliability figures and item counts come from the source pages only. Never
  invent or estimate norms; these scales show raw score bands unless the brief
  names a norm source.
- Use the existing single-trait test template and components.
- If a source page cannot be reached, stop and ask me to save it for you.
- Finish with the checks in "Checks before each test release" and a short
  summary: URLs to review, anything unverified, the queries the page targets.
```

For later releases: "Read docs/briefs/new-tests.md and do test release TN, then stop for review."

Some IPIP pages block automated fetching. If Code cannot read one, open it in a browser, save it as HTML into `docs/sources/ipip/`, and point Code at the saved copy.

## The new tests and release order

Ten test releases, one a week, each paired with that week's content release. The order puts the likely highest-demand tests first and lines each one up with a page it can link to.

| Release | Test | URL | Instrument | Pairs with |
|---|---|---|---|---|
| T1 | Am I a perfectionist? | /tests/perfectionism/ | IPIP-HEXACO perfectionism facet, 10 items | Orderliness and perfectionism guide |
| T2 | Empathy test | /tests/empathy/ | IPIP empathy scale keyed to the JPI-R, 10 items | Agreeableness and sympathy pages |
| T3 | Big Five aspects test | /tests/big-five-aspects/ | Big Five Aspect Scales, 100 items | The 30 facets guide (content release 3) |
| T4 | Am I shy? | /tests/shyness/ | IPIP social-discomfort scale keyed to the TCI, or social-confidence keyed to the JPI-R (see spec) | Introversion is not shyness guide |
| T5 | Am I a leader? | /tests/leadership/ | IPIP leadership scale keyed to the VIA (see spec) | Character strengths test, assertiveness test |
| T6 | Optimism test | /tests/optimism/ | IPIP hope and optimism scale keyed to Scheier and colleagues (1994) | Character strengths test |
| T7 | Locus of control, need for cognition and self-monitoring tests | /tests/locus-of-control/, /tests/need-for-cognition/, /tests/self-monitoring/ | IPIP single-construct scales | The 30 facets guide and the students, teachers and researchers page |
| T8 | HEXACO test, full and short | /tests/hexaco/, /tests/hexaco/short/ | IPIP-HEXACO: 24 facet scales (240 items) and 6 domain scales (60 items) | Big Five vs HEXACO compare page |
| T9 | 16-factor personality test | /tests/16-factor/ | IPIP scales for constructs similar to the 16PF, 163 items | The which-test router |
| T10 | Work values test | /tests/work-values/ | O*NET Work Importance Locator, used unmodified | Career interests test and careers section |

If a week is short of time, skip the test release rather than the content release; the content plan is driven by searches already reaching the site.

## Rules for every new test

These apply to all thirteen pages, on top of the house rules in CLAUDE.md.

Licence and credit

- IPIP items are in the public domain. Every IPIP test page's sources box names the IPIP, the source page for the scale, and the paper describing it.
- The O*NET Work Importance Locator is used under CC BY-ND 4.0, unmodified, with the credit line in its spec.
- Add each new instrument to /licences/ in the same release.

Items

- Copy items exactly from the source page into a new instrument JSON file, with the source URL and the date copied. Keying (+ or −) comes from the same page.
- If a published item contains an obvious misspelling (the JPI-R empathy key on the IPIP site reads spiritally for spiritually), correct the spelling only and record the correction in the instrument file.
- Use the site's existing IPIP response scale (very inaccurate to very accurate, five points) and the standard IPIP instruction to describe yourself as you generally are now.
- Keep the published item order unless the source gives none, in which case use the order on the key page.

Scoring and results

- Score by summing items after reversing the − keyed ones (6 minus the answer on a five-point scale). Record the method in the instrument file and test it.
- None of these scales has published norms the site can use, except where a spec says otherwise. Show the raw score against the possible range on the strip, exactly as the patience test does, with the FAQ entry Why is there no percentile on this test?
- Reliability is the coefficient alpha reported on the IPIP page, with its sample: for most IPIP scales, about 500 adults in the Eugene-Springfield Community Sample. Never round a figure up.
- Minutes come from the instrument file (item count at about ten seconds an item, rounded up), never typed into a page.

Titles and wording

- H1s are the question people type where that reads naturally (Am I a perfectionist?), otherwise the plain name (Empathy test).
- Commercial inventory names (JPI-R, TCI, VIA, 16PF, HPI) appear only in the sources box and in /compare/, never in a title, H1 or meta description. O*NET appears as an adjective with its trademark notice, as on the career interests page.
- Trait language only. A shyness page never says social anxiety; a perfectionism page never refers to any disorder; an empathy page does not use the word empath. Results describe tendencies and never diagnose.

Page structure

- Use the existing single-trait test template: H1, instrument subtitle, stats panel, start button, results strip, understanding your scores, how reliable is this test, related tests, guides that cover this, questions people ask, sources and licence.
- Add The statements, explained after Understanding your scores, in the same format as the facet pages in the content brief: each statement, its scoring direction, and one plain line on what it asks.
- Every test gets at least three FAQ entries, with FAQPage schema: Why is there no percentile on this test? Is a high or low score better? Where do my answers go? Add test-specific questions from its spec.

## Single-trait tests

Five short tests on the existing single-trait template. Item counts and alphas marked as checked come from the IPIP pages listed; Code confirms the rest from the source before building.

### T1: Am I a perfectionist?

| Detail | Value |
|---|---|
| URL | /tests/perfectionism/ |
| Title tag | Am I a perfectionist? A free 10-item test, 2 minutes |
| Meta description | Ten public-domain statements on how carefully you check details and how much mistakes bother you. Scored on your device in two minutes. |
| Instrument | IPIP-HEXACO perfectionism facet (Ashton, Lee and Goldberg, 2007): 10 items, alpha .72 (checked) |
| Source | IPIP-HEXACO table and key on the IPIP site |

- Framing: in the HEXACO model, perfectionism is a facet of conscientiousness about thoroughness and attention to detail. Say so in the first paragraph, and that this is the everyday trait, not a clinical idea.
- State the alpha plainly in How reliable is this test: .72 is acceptable but lower than most scales on the site, so treat the score as a rough guide.
- Do not use IPIP's other perfectionism scales; they come from clinical and personality-disorder inventories.
- Extra FAQ: Is perfectionism good or bad? How is perfectionism different from orderliness?
- Links: /guides/orderliness-and-perfectionism/, /traits/orderliness/, /tests/orderliness/, and the HEXACO test once T8 is live.

### T2: Empathy test

| Detail | Value |
|---|---|
| URL | /tests/empathy/ |
| Title tag | Empathy test: how strongly do you feel others' emotions? |
| Meta description | Ten public-domain statements on how strongly other people's feelings affect you. A free empathy test, scored on your device in two minutes. |
| Instrument | IPIP empathy scale keyed to the JPI-R: 10 items (7 positively keyed, 3 negatively), alpha .80 (checked) |
| Source | IPIP key page for scales similar to the JPI-R |

- Framing: the items are about feeling and being moved by other people's emotions, so this measures emotional empathy, not the ability to work out what others think. The subtitle and first paragraph say so.
- The IPIP also has empathy scales keyed to the TCI and to Barchard (2001). Use the JPI-R scale unless Code finds a clearly better fit, and ask before switching.
- Extra FAQ: Is empathy the same as sympathy? Does this measure emotional or cognitive empathy?
- Links: /traits/sympathy/, /traits/agreeableness/, /tests/emotional-intelligence/, /guides/trait-vs-ability-emotional-intelligence/.

### T4: Am I shy?

| Detail | Value |
|---|---|
| URL | /tests/shyness/ |
| Title tag | Am I shy? A free shyness test, scored on your device |
| Meta description | Public-domain statements on how comfortable you feel with people you do not know. A free shyness test that takes about two minutes. |
| Instrument | Preferred: IPIP social-discomfort scale keyed to the TCI. Fallback: IPIP social-confidence scale keyed to the JPI-R, 10 items, alpha .87 (checked), scored so that a higher result means shyer |
| Source | IPIP index of scale labels, and the key page for each |

- Choosing: read both scales' items. Use the TCI-keyed scale if its alpha is .75 or above and its items are about discomfort with strangers and social situations. Otherwise use the JPI-R social-confidence scale, noting that two of its items are about influencing people. Ask the owner before building.
- Framing: shyness is wariness or discomfort with unfamiliar people. It is not the same as introversion, which is about preferring less stimulation. Never use the words social anxiety.
- Extra FAQ: Is shyness the same as introversion? Can you be shy and outgoing?
- Links: /guides/introversion-is-not-shyness/, /tests/introvert-or-extrovert/, /traits/self-consciousness/.

### T5: Am I a leader?

| Detail | Value |
|---|---|
| URL | /tests/leadership/ |
| Title tag | Am I a leader? A free leadership test |
| Meta description | Public-domain statements on how readily you take charge, organise people and encourage a group. Scored on your device in about two minutes. |
| Instrument | IPIP leadership scale keyed to the VIA strength of leadership, from the original IPIP-VIA (about 10 items) |
| Source | IPIP key page for the IPIP-VIA scales |

- Do not use the IPIP scale keyed to the 6FPQ dominance facet. Its alpha is .85, but two of its items are about manipulating others and needing power, so it measures dominance rather than leadership and would mislead people asking am I a leader.
- Confirm the VIA leadership scale's alpha is .75 or above before building; report it to the owner if not.
- The character strengths test already includes leadership as one of 24 strengths, with four items. Say on the page that this is a longer, more reliable measure of the same strength, and link both ways.
- Framing: it measures a tendency to take charge and bring a group together, not a leadership style. Say so in the FAQ.
- Extra FAQ: Does this tell me my leadership style? Do extraverts make better leaders? (Answer from Judge and colleagues, 2002, already cited on the jobs for introverts guide: extraversion predicts who emerges as a leader more than who performs well.)
- Links: /tests/character-strengths/, /tests/assertiveness/, /traits/assertiveness/, /guides/jobs-for-introverts/.

### T6: Optimism test

| Detail | Value |
|---|---|
| URL | /tests/optimism/ |
| Title tag | Optimism test: are you an optimist or a pessimist? |
| Meta description | Public-domain statements on how much you expect things to turn out well. A free optimism test, scored on your device in about two minutes. |
| Instrument | IPIP hope and optimism scale keyed to Scheier, Carver and Bridges (1994) |
| Source | IPIP single-construct scoring keys (this page blocks automated fetching; the owner saves it for Code) |

- Confirm the item count and alpha from the key; if the alpha is below .75, compare with the IPIP scale keyed to the VIA strength of hope and ask the owner.
- Framing: dispositional optimism is a general expectation that things will turn out well. A low score means more cautious expectations, nothing more.
- Extra FAQ: Is optimism the same as cheerfulness? Is optimism a personality trait?
- Links: /traits/cheerfulness/, /tests/character-strengths/, /guides/the-24-character-strengths-explained/.

## Coursework tests: locus of control, need for cognition, self-monitoring

Three classic constructs from psychology courses, released together in T7 because each page is small and they share an audience: the students already reaching the site. Each uses an IPIP single-construct scale; the scoring keys page blocks automated fetching, so the owner saves it to `docs/sources/ipip/` for Code.

| Test | URL | Title tag | IPIP scale keyed to | Extra FAQ |
|---|---|---|---|---|
| Locus of control | /tests/locus-of-control/ | Locus of control test: internal or external? | Levenson (1981) | Is an internal locus of control better? What is the difference between internal and external? |
| Need for cognition | /tests/need-for-cognition/ | Need for cognition test: do you enjoy thinking hard? | Cacioppo and Petty (1982) | Is need for cognition the same as intelligence? How does it relate to openness? |
| Self-monitoring | /tests/self-monitoring/ | Self-monitoring test: how much do you adapt to the room? | Snyder (1974) | Is high self-monitoring the same as being fake? How does it relate to extraversion? |

Notes for Code:

- Locus of control: Levenson's model has three parts (internality, powerful others and chance), and the IPIP index also lists a second locus of control scale. Check whether the IPIP Levenson-keyed scale is one scale or three, and build the results to match. Many searchers will expect Rotter's single internal-versus-external scale, which the IPIP does not provide; the page explains the difference in one paragraph.
- Need for cognition: the tendency to engage in and enjoy effortful thinking. Say clearly that it is about enjoyment, not ability.
- Self-monitoring: how much people watch and adjust how they come across to fit the situation. Describe both ends without judgement.
- Each page gets a short box headed Using this in coursework: the items are public domain, cite the IPIP and the original construct paper, and link to the students, teachers and researchers page.
- Original construct papers for the sources box (Code confirms each citation): Cacioppo, J. T., & Petty, R. E. (1982), The need for cognition, Journal of Personality and Social Psychology, 42(1), 116-131. Snyder, M. (1974), Self-monitoring of expressive behavior, Journal of Personality and Social Psychology, 30(4), 526-537. Levenson, H. (1981), Differentiating among internality, powerful others, and chance, in H. M. Lefcourt (Ed.), Research with the locus of control construct, volume 1.
- Link all three from the 30 facets guide's closing section and from the students, teachers and researchers page.

## T3: Big Five aspects test

The Big Five Aspect Scales split each of the five traits into two aspects, giving ten. The scales are built entirely from IPIP items and listed on the IPIP site. This test goes live the same week as the 30 facets guide, which explains aspects, so each can link to the other.

| Detail | Value |
|---|---|
| URL | /tests/big-five-aspects/ |
| Title tag | Big Five aspects test: 10 aspects, 100 items, free |
| H1 | The Big Five aspects test |
| Subtitle | Big Five Aspect Scales, 100 items |
| Meta description | Each Big Five trait splits into two aspects, such as compassion and politeness. A free 100-item test of all ten, scored on your device. |
| Instrument | Big Five Aspect Scales (DeYoung, Quilty and Peterson, 2007): 100 items, 10 per aspect (checked) |
| Source | IPIP table and key for the Big Five Aspect Scales |

The ten aspects (checked against the IPIP table):

| Trait | Aspects |
|---|---|
| Neuroticism | Volatility, withdrawal |
| Agreeableness | Compassion, politeness |
| Conscientiousness | Industriousness, orderliness |
| Extraversion | Enthusiasm, assertiveness |
| Openness/intellect | Intellect, openness |

Build notes:

- Results show five groups, each with its trait score (from its 20 items) and two aspect strips beneath. Reuse the Big Five 120 results layout so the two tests look like one family.
- Alphas per aspect come from the 2007 paper or the IPIP table; Code reports which.
- No norms: raw scores against the range, with the standard FAQ. If the owner later finds published aspect norms that are free to use, add them in a separate release.
- Use the site's renamed neuroticism wording in plain text where it helps (withdrawal covers low mood and worry), but keep the published aspect names as the labels.
- Extra FAQ: What is the difference between an aspect and a facet? Should I take this or the 120-item Big Five test? Why do some aspects share a name with facets?
- Links: the 30 facets guide, /tests/big-five/, /traits/, and a line on each Big Five trait page pointing to its two aspects.

## T8 and T9: HEXACO and 16-factor tests

Two larger inventories that round out the site for people who want more than the Big Five. Both use the multi-scale template of the Big Five 120, not the single-trait template.

### T8: HEXACO test, full and short

| Detail | Full | Short |
|---|---|---|
| URL | /tests/hexaco/ | /tests/hexaco/short/ |
| Title tag | HEXACO personality test: 6 traits and 24 facets, free | HEXACO test, short: the 6 traits in 60 items, free |
| Scales | 24 facet scales of 10 items each (240 items), alphas .67 to .88 (checked) | 6 domain scales of 10 items each (60 items), alphas .87 to .91 (checked) |

- Instrument: the IPIP-HEXACO scales (Ashton, Lee and Goldberg, 2007, Personality and Individual Differences, 42, 1515-1526), built by two of the HEXACO model's authors with the IPIP's founder.
- Check on the key page whether the domain scales reuse facet items. If they do, the full test scores domains from its own items and the short test uses the 60 domain items only; if they do not, ask the owner whether the full test should include the 60 domain items as well.
- The site's patience test already uses the IPIP-HEXACO patience facet. Its results should match the patience facet here; add a test that checks they share items and keying.
- State the lowest alphas plainly (flexibility .67, perfectionism .72) in How reliable is this test.
- No norms: the published HEXACO norms belong to the commercial HEXACO-PI-R and cannot be used. Raw scores, with the standard FAQ.
- Extra FAQ: What is honesty-humility? How is HEXACO different from the Big Five? Is this the official HEXACO-PI-R? (No: it is the free IPIP version, which measures the same constructs with different items.)
- Links: /compare/big-five-vs-hexaco/, /guides/honesty-humility-explained/, /tests/patience/, /tests/perfectionism/.

### T9: 16-factor personality test

| Detail | Value |
|---|---|
| URL | /tests/16-factor/ |
| Title tag | 16 personality factors test: free, 163 items |
| H1 | The 16-factor personality test |
| Meta description | Sixteen public-domain scales measuring traits from Cattell's model of personality, from warmth to perfectionism. Free, 163 items, scored on your device. |
| Instrument | IPIP scales measuring constructs similar to Cattell's 16 factors: 163 items, 15 scales of 10 items and one of 13; alphas .73 to .86 in 501 adults (checked) |

The sixteen IPIP scales, with the factor each corresponds to in Cattell's model (checked against the IPIP comparison table):

| IPIP scale | Similar to Cattell's |
|---|---|
| Warmth | Warmth |
| Intellect (13 items) | Reasoning |
| Emotional stability | Emotional stability |
| Assertiveness | Dominance |
| Gregariousness | Liveliness |
| Dutifulness | Rule-consciousness |
| Friendliness | Social boldness |
| Sensitivity | Sensitivity |
| Distrust | Vigilance |
| Imagination | Abstractedness |
| Reserve | Privateness |
| Anxiety | Apprehension |
| Complexity | Openness to change |
| Introversion | Self-reliance |
| Orderliness | Perfectionism |
| Emotionality | Tension |

- Label results with the IPIP names. Show the table above on the page under How these scales relate to Cattell's model; the commercial questionnaire's name appears only in the sources box.
- Cattell's reasoning factor is an ability measure, but the IPIP intellect scale is self-report. Say so beside that result.
- Several IPIP names here (anxiety, friendliness, orderliness, imagination) are also Big Five facet names but are different scales with different items. Note it in the FAQ so no one compares the numbers directly.
- Extra FAQ: Is this the same as the 16 personalities test? (No: sixteen scales, not sixteen types; link to /compare/is-16personalities-accurate/.) Why do some scale names differ from Cattell's?
- Links: /tests/which/, /compare/, /tests/big-five/.

## T10: Work values test

The O*NET Work Importance Locator asks people to sort 20 statements about work by how much each matters to them, then reports their strongest work values and occupations that suit them. O*NET has retired it, but its materials are archived and still covered by the same licence as the Interest Profiler. The licence shapes the whole build, so read this section before starting.

| Detail | Value |
|---|---|
| URL | /tests/work-values/ |
| Title tag | Work values test: what matters most to you in a job? |
| H1 | Work values test |
| Subtitle | O*NET Work Importance Locator, 20 statements |
| Meta description | Sort 20 statements about work by how much they matter to you, and see your strongest work values. Free, for career exploration, scored on your device. |
| Source | The archived Work Importance Locator materials and user guide on the O*NET Resource Center |

How the tool works (checked against the user guide)

- 20 cards, each a statement about something a job can offer.
- They are sorted into five columns from most important (5) to least important (1), with exactly four cards in each column.
- Each card's column number is its score. Each value's score is the sum of its four cards; five of the six totals are then multiplied by a factor shown on the scoring worksheet, and working conditions is not. Code takes the factors from the worksheet.
- The six values: achievement, independence, recognition, relationships, support and working conditions. The results focus on the two highest.
- The score report lists occupations for each value, grouped into five job zones by how much education, training and experience they need, up to 20 occupations per value and zone.
- The guide says it is for career exploration and counselling only, not for hiring, selection or screening applicants, and that the link between results and job success has not been established. The page says the same.

The licence decision

- Under CC BY-ND 4.0 the tool may be shared only unmodified. Changing its format to work on a web page, such as tapping cards into columns instead of laying out paper cards, counts as a technical change and is allowed.
- Changing the statements, the instructions, the scoring or the occupation lists would make it a modified version under the O*NET Tools Developer Licence, which requires a validation study before release. That is not practical, so none of those may change: keep the American spelling and the American occupation titles exactly as published.
- The site's own content, such as a paragraph on what each value means for UK job hunting or links to the National Careers Service, goes outside the tool on the page, in a clearly separate section labelled as the site's own. If the owner is unsure that this separation keeps the tool unmodified, email O*NET before release.
- Credit line, matching the career interests page: This page includes information from the O*NET Career Exploration Tools by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the CC BY-ND 4.0 license. O*NET® is a trademark of USDOL/ETA. Link to the licence. Nothing on the page may suggest O*NET endorses the site.
- Say on the page that O*NET has retired the tool and that its occupation lists date from its last release; Code finds the version and date in the archive.

Build notes

- The sort needs a new interaction: tap or drag a card into a column, with each column's remaining capacity shown and finishing blocked until all 20 are placed, four per column.
- Provide an equivalent keyboard and screen-reader mode: one row per statement with a choice of column, the remaining capacity announced, and the same four-per-column rule.
- Results: six value scores with the top two highlighted, a job zone selector, and the occupation list for the person's top values in that zone, each linking to O*NET OnLine.
- Standard actions: copy as text, save as PDF, start again, save on this device.
- Extra FAQ: How is this different from the career interests test? (Interests are what you like doing; values are what you need from a job.) Can an employer use this? (No; O*NET says it is for career exploration only.) Why are the job titles American?
- Links: /tests/career-interests/, /careers/, /guides/career-change-interest-test/, /guides/interests-do-not-match-my-job/.

## Hub pages and internal links

Each test release also updates the pages that lead to it. No new guides are planned in this brief; after T5 and again after T10, review Search Console for questions the new tests are attracting and plan guides from those.

Every release:

- /tests/ index: add the test to its group. Single traits go under the existing group. Add two groups as they first fill: Go deeper than the Big Five (aspects, HEXACO, 16-factor) and For coursework (locus of control, need for cognition, self-monitoring). The work values test sits beside the career interests test.
- /tests/which/ router: add routes where they fit: more detail than the Big Five goes to the aspects or HEXACO test; a question about careers offers both career interests and work values.
- /licences/ and /methodology/: add the instrument, its licence, its source page, and its reliability figures.
- The students, teachers and researchers page: add each IPIP scale with a link to its IPIP key page. For the work values test, link to O*NET's own archive rather than hosting copies.
- Inbound links: at least two from existing pages, as one sentence in context, listed in the release summary for the owner.

Specific links to add:

| From | To | Release |
|---|---|---|
| /guides/orderliness-and-perfectionism/, /traits/orderliness/ | Perfectionism test | T1 |
| /traits/sympathy/, /tests/emotional-intelligence/ | Empathy test | T2 |
| The 30 facets guide (aspects section), each Big Five trait page | Aspects test | T3 |
| /guides/introversion-is-not-shyness/, /tests/introvert-or-extrovert/ | Shyness test | T4 |
| Character strengths results (the leadership row), /traits/assertiveness/ | Leadership test | T5 |
| Character strengths results (the hope row), /traits/cheerfulness/ | Optimism test | T6 |
| The 30 facets guide, the students, teachers and researchers page | The three coursework tests | T7 |
| /compare/big-five-vs-hexaco/, /guides/honesty-humility-explained/, /tests/patience/ | HEXACO tests | T8 |
| /compare/is-16personalities-accurate/, /tests/which/ | 16-factor test | T9 |
| /tests/career-interests/ results, /careers/ | Work values test | T10 |

Keep the home page's Most taken list as it is until Search Console shows one of the new tests outperforming a current entry.

## Checks before each test release

The content brief's release checks apply in full. These are the extra ones for tests.

- [ ] The instrument JSON records the source URL, the date copied, the item count, and the keying for every item.
- [ ] Unit tests confirm the item count and the set of reverse-keyed items against the source, and score at least one worked response set correctly.
- [ ] Any spelling correction to a published item is recorded in the instrument file.
- [ ] The alpha, sample and item count shown on the page match the source exactly, and the lowest alphas are stated plainly.
- [ ] Results show raw scores against the range, with the Why is there no percentile? FAQ, unless the spec names a norm source.
- [ ] The statements, explained section is present, with scoring directions that match the key.
- [ ] No commercial inventory name appears in a title, H1 or meta description; O*NET appears only with its trademark notice and credit line.
- [ ] The wording check finds no clinical terms, and the shyness page does not say social anxiety.
- [ ] /licences/, /methodology/, /tests/ and the router are updated.
- [ ] Every control works by keyboard and with a screen reader, including the work values card sort.
- [ ] The test runs end to end in a Playwright check at phone and laptop widths, and the screenshots have been reviewed.
- [ ] Lighthouse 95 or above on mobile for the test page before and after completion.
- [ ] `docs/briefs/release-log.md` records the release and the searches the page targets.

## Sources

- IPIP: alphabetical index of scale labels
- IPIP: scales similar to the JPI-R, items and alphas (empathy, social confidence)
- IPIP: IPIP-HEXACO scales compared with the HEXACO-PI (mirror)
- IPIP: scales similar to the 16PF
- IPIP: scales similar to the 6FPQ (leadership and dominance)
- IPIP: Big Five Aspect Scales
- IPIP: versions of the VIA scoring keys (mirror)
- IPIP: finding scales to measure particular constructs (mirror)
- O*NET Career Exploration Tools content licence
- O*NET Tools Developer Licence
- O*NET Career Exploration Tools list
- O*NET Work Importance Locator user guide
- Ashton, M. C., Lee, K., & Goldberg, L. R. (2007). The IPIP-HEXACO scales: An alternative, public-domain measure of the personality constructs in the HEXACO model. Personality and Individual Differences, 42, 1515-1526.
- DeYoung, C. G., Quilty, L. C., & Peterson, J. B. (2007). Between facets and domains: 10 aspects of the Big Five. Journal of Personality and Social Psychology, 93(5), 880-896.
- Scheier, M. F., Carver, C. S., & Bridges, M. W. (1994). Distinguishing optimism from neuroticism (and trait anxiety, self-mastery, and self-esteem): A reevaluation of the Life Orientation Test. Journal of Personality and Social Psychology, 67(6), 1063-1078. (Code confirms.)
- Judge, T. A., Bono, J. E., Ilies, R., & Gerhardt, M. W. (2002). Personality and leadership: A qualitative and quantitative review. Journal of Applied Psychology, 87(4), 765-780.

## Notes added on 10 November 2026, from building T1

- IPIP-HEXACO alphas: the bracketed alpha beside each facet on the IPIP-HEXACO scoring key page (`newHEXACO_PI_key.htm`) is the published inventory's own facet alpha, not the IPIP scale's. The IPIP scales' alphas are in the comparison table (`newHEXACO_PI_table.htm`, saved in `docs/sources/ipip/`), which gives no sample size. Perfectionism: key page .80, IPIP scale .72. Patience: key page .88, IPIP scale .80; the live patience test showed .88 and now shows .80. Use the table for every T8 figure.
- The table's notes say every IPIP-HEXACO scale has 10 items; the item counts in its first column are the published inventory's.
- `npm run e2e` starts and stops its own preview server (`scripts/e2e.mjs`); Playwright's own webServer never exited on Windows.
- The test template has an optional `statements` field (item number to plain line) that renders "The statements, explained" with each item's scoring direction from the instrument file.
- "Guides that cover this" now also lists guides that link to a page in their text.
- Minutes: the engine's estimate rounds 10 items to 1 minute; the single-trait tests state 2, as their titles do. T1 follows them.
- The Lighthouse floor for performance is 80, not 95 (Google Analytics; `docs/decisions/0004-analytics.md`).
- T2, T5, T6 and the need for cognition and self-monitoring tests of T7 were built on 10 November. The IPIP single-construct keys page (`newSingleConstructsKey.htm`) fetched without trouble and is saved in `docs/sources/ipip/`, with the JPI-R, VIA and TCI keys.
- The leadership scale (IPIP-VIA) has 7 items, not about 10: the key page lists three more as omitted. Alpha .78.
- The optimism scale's ten items include mood and self-regard (Dislike myself, Often feel blue, Am often in a bad mood); its page says the score reflects recent mood as well as outlook.
- Locus of control (T7): built on 10 November with the IPIP Total scale (internality minus powerful others and chance, 20 items, alpha .86), the owner's choice. The three subscales share items and would need an engine change.
- Shyness (T4): built on 10 November with the TCI-keyed Social Discomfort scale (HA3), the owner's choice: 10 items, alpha .86 in 501 adults (comparison table, newTCITable.htm).
- T3 (Big Five aspects): built on 10 November. Alphas are from the IPIP table (BFASTable.htm), which gives no sample size; the key page marks four items as not given to the Eugene-Springfield sample. Items keep the key page's curly apostrophes and its "other’s". The key page gives no administration order, so the items are interleaved across the aspects, as for the site's other multi-scale IPIP tests, rather than in key page order, which would have put each aspect on one screen. Minutes follow the brief's ten-seconds-an-item rule (17); the older 120-item page says 12 by one minute per ten items. The router is unchanged: it has no "more detail" question to route from.

- T8 (HEXACO): the full test was built on 10 November. The IPIP-HEXACO key page has only the 24 facet scales of 10 items; it has no 10-item domain scales. The .87 to .91 domain alphas in the brief are the comparison table's figures for each domain scored from its 40 facet items. So the short 60-item test cannot be built from published IPIP scales; owner to decide (a published short HEXACO from elsewhere that is free for any use, or leave it out). The facet published as Anxiety is shown as Worry, following decision 0003. The statement lines for 194 items were drafted by a helper and checked for length, form and the wordlist; 46 reuse lines from the site's other tests.
