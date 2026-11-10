# Claude Code brief: What's My Trait next releases

Nov 10, 2026 · Craig

> Saved from the brief the owner pasted into a session on 10 November 2026. If the owner's own Markdown export differs, the export wins.

A working brief for Claude Code covering the next eight weekly releases on whatsmytrait.com, driven by the first week of Search Console data. Britain's personality map is already live; everything else here is still to do.

## How to use this brief

Export this doc and the article drafts doc as Markdown, put both in the repo, and start a Claude Code session with the prompt below. Code works through the fixes first, then one release at a time, stopping for your review at the end of each.

Inputs to put in the repo before starting:

- `docs/briefs/next-releases.md`: this doc, exported as Markdown.
- `docs/drafts/research-articles.md`: the doc "Six article drafts for What's My Trait", exported as Markdown. Britain's personality map is already live; the other five are still to publish.
- `docs/search-console/2026-11-10/`: the Search Console export you shared, unzipped, so Code can see the queries that drove these decisions.

Kickoff prompt to paste into Claude Code:

```
Read CLAUDE.md, then docs/briefs/next-releases.md in full.

Work in this order and stop for my review at the end of each step:

1. Go through "Fixes to verify first". For each item, check the repo and the built
   site, say whether it is already done, and fix it if not. Report a table of
   item, status before, what you changed.
2. Then release 1 only, as specified in the brief. Do not start release 2 until I
   say so.

Rules:
- Follow the house rules in CLAUDE.md and the checks in "Checks before each release".
- Never invent a figure, citation or item wording. Facet statements come from the
  instrument JSON files; research figures come from the drafts and their sources.
  If you cannot verify something, list it for me rather than guessing.
- Use the existing templates and components. Ask before adding a new page type.
- When a release is ready: run pnpm check, pnpm test and the Lighthouse budget,
  screenshot each new or changed page at phone and laptop widths, and give me a
  short summary with the list of URLs to review.
```

For each later release, start a session with: "Read docs/briefs/next-releases.md and do release N, then stop for review."

## Release order

One release a week, alternating research articles that earn links with pages built around searches the site is already appearing for. The facet statements roll out one domain per release so the work stays small and the effect can be seen in Search Console.

| Release | New or changed | Why now |
|---|---|---|
| 1 | Facet statements on the openness and agreeableness facet pages; percentile guide quick answer and table; publish Dog people vs cat people | Statement searches are ranking at positions 4 to 6 already; the percentile guide has 35 impressions and no clicks |
| 2 | Publish Did coal mining shape personality?; add a link to it from Britain's personality map; facet statements for conscientiousness | Pairs with the live Britain article so each can link to the other |
| 3 | New guide: the 30 facets of the Big Five, a full list; rename the teachers page; facet statements for extraversion | Answers "is a facet of" questions from students |
| 4 | Publish Does birth order shape personality?; facet statements for neuroticism | Completes the facet statements |
| 5 | New guide: how to score the Rosenberg Self-Esteem Scale; update the existing Rosenberg score guide to link to it | Scoring queries are landing at positions 60 to 90 on pages that do not answer them |
| 6 | Expand the existing self-esteem vs confidence guide to cover self-efficacy, keeping its URL | Comparison queries at 40 to 90 |
| 7 | Publish Do star signs predict personality? | |
| 8 | Publish What does your personality predict? | |

After release 8, export Search Console again and review before planning more.

## Fixes to verify first

These came from the audits on 3 and 4 November. Some may already be done; when last checked, the live site still showed several of them, which may mean the deploy is leaving old files in place. Code checks each one in the repo and on the built site, fixes what is outstanding, and asks the owner where the table says so.

| Item | How to check | Fix if not done |
|---|---|---|
| http and non-www versions | Search Console shows http://whatsmytrait.com/ as its own page. Request http://whatsmytrait.com/, https://whatsmytrait.com/ and http://www.whatsmytrait.com/ and check each returns a single 301 to https://www.whatsmytrait.com/ | Add the redirects in the host config. Then the owner runs URL Inspection on the http version |
| Old facet URLs | /traits/depression/ and /traits/anxiety/ were still live beside /traits/low-mood/ and /traits/worry/, and the traits index still linked the old ones | 301 each old URL to its new one, update every internal link, remove the old URLs from the sitemap, and check the deploy deletes files that are no longer built |
| Home page | Title tag was "What's My Trait" (19 characters), with no og:image and an H1 without the words personality test | Title: What's My Trait: free personality tests, scored on your device. Add an og:image. Keep the current H1 line if preferred, but make the subtitle start with Free personality tests |
| Author and bylines | About named nobody and gave no contact; guides showed no byline; Article schema credited an Organization | Add the owner's name, background and a contact address to About (owner to supply). Add a byline component to guides, compare, trait and test pages linking to About. Change Article schema author to a Person with a url to /about/ |
| How this site is made | Nothing disclosed AI assistance | Add the section below to About, edited by the owner to be accurate |
| Dates | Tests and guides showed dates; trait and career pages did not | Show Published and Updated on every content page type from frontmatter. Updated changes only when someone edits the frontmatter, never at build. Sitemap lastmod reads the same field |
| Methodology | Age bands summed to 339,977 against a sample of 410,376, unexplained; no review date | Add one sentence explaining the 70,399 without a usable age (check the norms script for the real reason). Add a Last reviewed date |
| Open Psychometrics norms | Facet pages cite the Open Psychometrics IPIP Big-Five Factor Markers dataset; no licence was found for it | Search the source for a licence statement and report. If none, raise it with the owner. Do not change norms in this session |
| Analytics | GA4 was loading while the privacy page said nothing is collected | If GA4 still loads, ask the owner: remove it, replace it with a cookieless counter, or rewrite the privacy page to match |
| Results display | 0th percentile showed for very low scores; single-scale reliability showed as 0.91 to 0.91; the Big Five 120 reliability table had no rows; minute counts disagreed between pages | Floor the display at 1st and cap at 99th; show one figure when min equals max; wire the table to the instrument data; take minutes from the instrument file everywhere |
| Link text | Facet pages had two links both reading Take this test | Make the second one specific, for example Take the full Big Five test |

Draft for the About page, for the owner to correct before publishing:

> How this site is made. I build and run this site myself. I'm not a psychologist; I've spent the last few years building validated health questionnaires at postviralrecovery.com, and this site applies the same approach to personality. I use AI tools to help write code and draft text. Every test is copied from its published scoring key and checked by automated tests, and I check every figure in the guides against the paper it cites before publishing.

## Spec: the statements, explained, on every facet page

People are taking IPIP-based tests on other sites, getting stuck on a statement, and searching for it word for word. In the first week, four statements brought impressions at positions 4 to 11. Each facet page gets a short section listing its statements, with a plain line on what each one asks. This changes existing pages and adds none.

Statements seen in Search Console so far (Code confirms the facet against the scoring key):

| Search | Likely facet | Position |
|---|---|---|
| enjoy wild flights of fantasy meaning in personality test | Imagination | 4.25 |
| boast about my virtues meaning in personality test | Modesty | 5 |
| has few artistic interests meaning | Artistic interests | 6.33 |
| rarely overindulge | Immoderation | 11 |

What to build

- A new section on the facet template, placed straight after High and low in daily life, with the H2 The statements, explained.
- One row per statement used for that facet in the IPIP-NEO-120 (four per facet), drawn from the instrument JSON, never retyped. Each row shows the statement exactly as published, in quotation marks, which way it scores (Agreeing raises your imagination score, or Agreeing lowers your modesty score), and one plain sentence on what it is asking.
- Under the rows, a short list headed Other statements you may see, holding statements for the same facet from the 300-item IPIP-NEO, but only where Search Console shows someone searching for one. Copy them exactly from the IPIP key, and record the source in the instrument data, not in the page.
- Use the site's existing list or table styles. On phones each row must read as statement, direction, explanation, top to bottom.
- Keep the explanations in a content file per facet (for example `src/content/facet-statements/imagination.json`), keyed by item number, so the text is reviewable and the template does not change when wording does.

How to write the explanations

- 15 to 25 words each, British English, sentence case, no em dashes.
- Say what the statement asks about, not what agreeing says about the person. Write Whether you like letting your imagination run into vivid, unlikely scenarios, not You are a dreamer.
- Where a word has an older or unusual sense, explain it plainly. Virtues in Boast about my virtues means good qualities.
- No judgement of either end, and no clinical vocabulary.
- For the low mood, worry and vulnerability facets, write about everyday mood and stress only. The owner reviews every line on those pages before release, and no line refers to crisis, self-harm or any condition.

Two examples in the house style, for Code to match:

| Statement | Direction | What it asks |
|---|---|---|
| "Enjoy wild flights of fantasy." | Agreeing raises your imagination score | Whether you like letting your mind run into vivid, unlikely scenarios, just for the pleasure of it |
| "Boast about my virtues." | Agreeing lowers your modesty score | Whether you tell people about your good qualities and achievements, rather than waiting for them to notice |

Rollout

| Release | Domain | Facet pages |
|---|---|---|
| 1 | Openness and agreeableness | 12 |
| 2 | Conscientiousness | 6 |
| 3 | Extraversion | 6 |
| 4 | Neuroticism | 6, with owner review |

After release 4, check Search Console for queries containing meaning in personality test or a quoted statement, and add any missing 300-item statements to Other statements you may see.

## Spec: percentile guide quick answer and table

The percentile guide (/guides/what-a-percentile-means/) had 35 impressions at an average position of 7.4 in its first week and no clicks. The searches name a number: 72nd percentile meaning, what does 72nd percentile mean, what does 72 percentile mean. The answer to that exact question should appear in the snippet and in the first two lines.

Changes:

- Opening two sentences, replacing the current lead: A percentile tells you what share of people in a comparison group scored below you. The 72nd percentile means you scored higher than about 72 out of every 100 people, and lower than about 28. Code checks the wording against the definition on /methodology/ under How percentiles are calculated (below, or below plus half of those tied) and matches it exactly.
- Meta description: The 72nd percentile means you scored higher than about 72 in 100 people. What percentiles mean on a personality test, and why higher is not better. Keep the title tag unless it exceeds 60 characters.
- A table straight after the lead, headed Common percentiles at a glance:

| Percentile | What it means |
|---|---|
| 10th | Higher than about 10 in 100 people |
| 25th | Higher than about a quarter of people |
| 50th | Right in the middle |
| 72nd | Higher than about 72 in 100 people |
| 75th | Higher than about three quarters of people |
| 90th | Higher than about 90 in 100 people |
| 99th | Higher than almost everyone in the group |

- A short paragraph headed Percentile is not percentage: the 72nd percentile is not 72% correct, and a personality test has no right answers; it is a position in a group.
- A short paragraph headed Higher is not better: on a trait, the 72nd percentile is a description, not a grade, and either end of each trait has advantages. Link to the trait pages.
- Three FAQ entries added to the page's FAQ and its FAQPage schema: What does the 72nd percentile mean? Is the 50th percentile average? Does my percentile change if I compare with a different group? The last answer links to the Compare with selector on the results.

Do not change the URL. Leave the rest of the guide as it is unless it repeats what the new opening says.

## Spec: publishing the five research drafts

The drafts are in `docs/drafts/research-articles.md`. Each H2 there is one guide page, with a page details table at its top giving the URL, title tag, meta description, test button and read next links. Britain's personality map is already live; the other five go out in releases 1, 2, 4, 7 and 8.

| Release | Draft | URL | Inbound links to add from live pages |
|---|---|---|---|
| 1 | Dog people vs cat people | /guides/dog-people-vs-cat-people/ | /guides/what-the-big-five-measures/, /traits/extraversion/ |
| 2 | Did coal mining shape personality? | /guides/coal-mining-and-personality/ | /guides/britain-personality-map/ (in the Why places might differ section), /traits/neuroticism/ |
| 4 | Does birth order shape personality? | /guides/birth-order-and-personality/ | /guides/can-personality-change/ |
| 7 | Do star signs predict personality? | /guides/star-signs-and-personality/ | /guides/are-personality-tests-accurate/, /compare/is-16personalities-accurate/ (where it discusses descriptions people recognise themselves in) |
| 8 | What does your personality predict? | /guides/what-personality-predicts/ | /guides/are-personality-tests-accurate/, /guides/how-reliable-is-the-big-five/, /guides/high-conscientiousness-at-work/ |

For each draft:

1. Create the guide from the existing guide template. The H2 becomes the page H1; the page details table becomes frontmatter (title, description, slug, test button, read next) and does not appear on the page. Published and Updated are the release date.
2. Keep the draft's section order and wording. Edit only for house style, broken links, or a figure that fails the check in step 3.
3. Check every number, name, date and citation against the linked source. Where a source cannot be opened, or a detail (volume, issue, pages) is not shown in it, list it for the owner rather than keeping or removing it silently. In particular, confirm the journal volume and page numbers for Soto (2019), Obschonka and colleagues (2018) and Gosling, Sandy and Potter (2010).
4. Read next links point only to pages that are live. Where a draft links to a later article, leave that link out, record it in `docs/briefs/pending-links.md`, and add it in the release that publishes the target.
5. Add the inbound links in the table above as a single sentence in context, not a list of related links. Show the owner each new sentence in the release summary.
6. If the clinical-word check flags terms that describe research findings (for example heart disease, criminal behaviour or substance misuse in the predictions article), do not reword automatically. List them for the owner to decide.
7. Add the page to the guides index, generate its OG image, and confirm the Article schema carries the Person author from the fixes above.

The drafts contain one deliberate correction worth keeping: the coal article explains that press reports of 33% higher neuroticism misread the paper's standardised coefficients as percentages. Do not reintroduce the percentage figures.

## Spec: new guide, the 30 facets of the Big Five

The search "modesty is considered a facet of:" had 17 impressions at position 6 in the first week. It reads like a quiz or coursework question, and desktop made up 72% of impressions, which fits students. This guide answers every question of that shape on one page and acts as a hub linking to all 30 facet pages.

| Page detail | Value |
|---|---|
| URL | /guides/big-five-facets-list/ |
| Title tag | The 30 facets of the Big Five: a full list |
| H1 | The 30 facets of the Big Five |
| Meta description | All 30 facets of the Big Five, six under each trait, with a one-line description of each and the other names they go by in textbooks. |
| Test button | The Big Five, with the facets (/tests/big-five/) |

Content

1. Lead, two sentences: Each of the Big Five traits divides into six narrower facets, giving 30 in all. Modesty, for example, is a facet of agreeableness, and orderliness a facet of conscientiousness.
2. One H2 per domain, in the site's usual order, each with a table: Facet (linked to its facet page) | Also called | In one line. The facet names and order come from the IPIP-NEO-120 instrument file. The one-line descriptions come from the first sentence of each facet page's content, not newly written, so the two cannot drift apart.
3. The Also called column holds the names students often meet in textbooks, which come from a different, commercially published inventory. Do not name that inventory on this page (the house rule keeps trademarked test names to /compare/). Say only: Textbooks often use the names from another widely used inventory, shown here where they differ. Where the site has renamed a facet, show the published name too (Worry: published as Anxiety; Low mood: published as Depression).
4. A short H2, Between traits and facets: the ten aspects, explaining that DeYoung, Quilty and Peterson (2007) found each trait splits naturally into two aspects, with a small table. The facet pages already cite this paper.
5. A short H2, Do all tests use the same facets? No: different inventories carve traits differently, and the six-factor HEXACO model has its own facets. Link to /compare/big-five-vs-hexaco/.
6. FAQ, four questions with FAQPage schema: How many facets does the Big Five have? Why six facets per trait? Can you score high on a trait but low on one of its facets? What is the difference between a facet and an aspect?

The Also called values, for Code to check against the IPIP site's documentation of the IPIP-NEO before publishing:

| Trait | Facet on this site | Also called |
|---|---|---|
| Neuroticism | Worry | Anxiety |
| Neuroticism | Anger | Angry hostility |
| Neuroticism | Low mood | Depression |
| Neuroticism | Immoderation | Impulsiveness |
| Extraversion | Friendliness | Warmth |
| Extraversion | Activity level | Activity |
| Extraversion | Cheerfulness | Positive emotions |
| Openness | Imagination | Fantasy |
| Openness | Artistic interests | Aesthetics |
| Openness | Emotionality | Feelings |
| Openness | Adventurousness | Actions |
| Openness | Intellect | Ideas |
| Openness | Liberalism | Values |
| Agreeableness | Morality | Straightforwardness |
| Agreeableness | Cooperation | Compliance |
| Agreeableness | Sympathy | Tender-mindedness |
| Conscientiousness | Self-efficacy | Competence |
| Conscientiousness | Orderliness | Order |
| Conscientiousness | Cautiousness | Deliberation |

The other eleven facets have the same name in both (self-consciousness, vulnerability, gregariousness, assertiveness, excitement-seeking, trust, altruism, modesty, dutifulness, achievement-striving, self-discipline).

The ten aspects (DeYoung, Quilty and Peterson, 2007): neuroticism splits into volatility and withdrawal; agreeableness into compassion and politeness; conscientiousness into industriousness and orderliness; extraversion into enthusiasm and assertiveness; openness into intellect and openness. Code checks these against the paper before publishing.

Links

- Link to this guide from /traits/, from each of the five domain pages (one sentence near the facet list), and from the teachers page.
- In the same release, rename the teachers page to For students, teachers and researchers, keeping its URL, and update its nav and footer labels.

## Spec: new guide, how to score the Rosenberg Self-Esteem Scale

Searches such as rosenberg self esteem scale scoring and rosenberg self esteem scale scoring interpretation are landing at positions 60 to 90 on pages that explain what a score means but not how to calculate one. The scale is public domain, so the site can show the statements, the reverse scoring and a worked example in full.

| Page detail | Value |
|---|---|
| URL | /guides/rosenberg-scale-scoring/ |
| Title tag | Rosenberg Self-Esteem Scale scoring: a worked example |
| H1 | How to score the Rosenberg Self-Esteem Scale |
| Meta description | Score each of the 10 statements, reverse five of them, and add them up. The two scoring conventions, a worked example, and why there are no official cut-offs. |
| Test button | The self-esteem test (/tests/self-esteem/) |

Facts to use (checked against the sources listed)

- Ten statements, each answered strongly agree, agree, disagree or strongly disagree.
- Two scoring conventions are in use: 1 to 4 per statement, giving totals of 10 to 40, or 0 to 3, giving 0 to 30. To convert, subtract 10 from a 10 to 40 total. Higher totals mean higher self-esteem.
- In the standard item order, statements 2, 5, 6, 8 and 9 are negatively worded and are reverse scored before adding up. Code confirms the site's instrument file uses the standard order before stating item numbers.
- There is no published, validated cut-off for low or high self-esteem, and the scale is not diagnostic.
- Schmitt and Allik (2005) gave the scale to 16,998 people in 53 nations in 28 languages. Average scores in every nation sat above the scale's midpoint. The cross-national average was 30.85 (standard deviation 4.82) on the 10 to 40 convention, which is 20.85 on 0 to 30. They also found people agreed less readily with the negatively worded statements than with the positive ones.
- The scale is in the public domain. The Rosenberg family, through the University of Maryland's sociology department, asks that users cite Rosenberg (1965).

Content

1. Lead, two sentences: Score each statement from 0 to 3 (or 1 to 4), reverse the five negatively worded ones, and add them up. Totals run from 0 to 30 (or 10 to 40), higher means higher self-esteem, and there are no official cut-offs.
2. The ten statements: a table of statement | worded | how it is scored, drawn from the instrument file, never retyped.
3. Points per answer: a small table for both conventions, positive and reverse-scored.
4. A worked example: one made-up set of ten answers, scored step by step. Compute it with the site's own scoring function at build time, so the arithmetic on the page is produced by the same code the test uses.
5. Which convention this site uses, with the conversion, so people comparing with another source are not confused.
6. What the total means: no validated cut-offs; the cross-national average above as a reference point; a link to /guides/what-a-rosenberg-score-means/ for interpretation. Add a sentence noting that some websites describe 15 to 25 as a normal range on the 0 to 30 convention, and that those bands are not part of Rosenberg's scale and have not been validated as cut-offs. Do not name any site.
7. Common mistakes: forgetting the reverse scoring; using a five-point answer scale, which changes the totals; reading a total as a diagnosis.
8. Using it in coursework or research: free to use, cite Rosenberg (1965), with a link to the students, teachers and researchers page.
9. FAQ with FAQPage schema: Is the Rosenberg scale free to use? Which items are reverse scored? What is a normal score? Can I use a five-point scale?

Links

- From /guides/what-a-rosenberg-score-means/: one sentence near the top linking to this guide for the calculation. Check that guide's title tag is about meaning, not scoring, so the two do not compete.
- From /tests/self-esteem/ (in How reliable is this test or the FAQ) and from the students, teachers and researchers page.

## Spec: self-efficacy vs self-esteem vs self-confidence

Three related searches appeared in the first week at positions 42 to 90: difference between self efficacy and self esteem, differentiate between self esteem and self confidence, and confidence vs. Rather than adding a page that competes with the existing self-esteem vs confidence guide, expand that guide in place to cover all three. It is a week old, so keeping its URL costs nothing and avoids a redirect.

| Page detail | Value |
|---|---|
| URL | /guides/self-esteem-vs-confidence/ (unchanged) |
| Title tag | Self-esteem, self-efficacy and confidence: the difference |
| H1 | Self-esteem, self-efficacy and self-confidence: what is the difference? |
| Meta description | Self-esteem is how you value yourself overall; self-efficacy is your belief you can do a particular thing. How they differ, how they overlap, and how each is measured. |
| Test button | The self-esteem test (/tests/self-esteem/), with a second link to the Big Five with facets for self-efficacy |

Facts to use

- Self-esteem is a person's overall evaluation of their own worth. The Rosenberg scale (1965) measures it as a single global judgement.
- Self-efficacy is a person's belief in their capability to carry out the actions a particular situation needs (Bandura, 1977). It is usually specific to a task or area: you can feel capable at work and unsure on a dance floor. Bandura described four sources of it: your own past successes, seeing people like you succeed, encouragement from others, and how you read your own physical and emotional state.
- General self-efficacy is a broad belief in your ability to cope across situations. The IPIP-NEO measures something close to it as the self-efficacy facet of conscientiousness (/traits/self-efficacy/).
- Self-confidence is an everyday word rather than a single research construct; in practice it usually means general self-efficacy, sometimes self-esteem.
- They overlap. Judge and colleagues (2002) argued that self-esteem, generalised self-efficacy, emotional stability and locus of control are markers of one broad trait they called core self-evaluations. In a later summary of that work (Judge, Van Vianen and De Pater, 2004), the corrected correlation between self-esteem and generalised self-efficacy was 0.85, and between self-esteem and emotional stability 0.64. Measured broadly, self-esteem and self-efficacy are close to the same thing; they separate when self-efficacy is about a specific task.

Content

1. Lead, two sentences: Self-esteem is how you value yourself overall; self-efficacy is your belief that you can do a particular thing. Self-confidence is the everyday word, and it usually means the second.
2. A comparison table: concept | what it is about | an example statement | how this site measures it. The example statements for self-esteem and the self-efficacy facet come from the instrument files, exactly as published. The specific self-efficacy example is clearly marked as an illustration, not a test item.
3. How they relate: the overlap finding above, in plain words, with what a correlation of 0.85 means.
4. Why the difference matters: specific self-efficacy can be low in one area while self-esteem is steady, and Bandura's four sources explain how self-efficacy changes with experience. Describe; do not advise.
5. What it does not mean: none of these scores is a diagnosis, and none is a grade.
6. What it means for your results, linking to the self-esteem test, the self-efficacy facet page and the emotional stability trait page.
7. FAQ with FAQPage schema: Is self-efficacy the same as confidence? Can you have high self-esteem and low self-efficacy? Which is easier to change?

Keep whatever in the current guide is still accurate; Code shows the owner a before and after of the full text. Add a link to this guide from /traits/self-efficacy/ and from /guides/what-a-rosenberg-score-means/.

## Checks before each release

A release is ready when every box below is ticked for every new or changed page. Code runs the automated ones and reports the rest in the release summary.

- [ ] pnpm check, pnpm test and the Lighthouse budget (95 or above on mobile) pass.
- [ ] Title tag under 60 characters and unique; meta description unique; one H1; canonical correct.
- [ ] Breadcrumb and Article schema present, with the Person author; FAQPage only where the page has a visible FAQ.
- [ ] Published and Updated dates shown and taken from frontmatter; sitemap lastmod matches.
- [ ] OG image generated.
- [ ] Every figure, name, date and citation checked against its source; anything unverifiable listed for the owner.
- [ ] Instrument statements and their scoring direction come from the instrument files and match the published keys.
- [ ] No trademarked test name outside /compare/.
- [ ] Clinical-word check run; any hits listed for the owner, not reworded automatically.
- [ ] At least three outbound internal links chosen by hand, at least two inbound; no link to an unpublished page or to a URL that redirects; `docs/briefs/pending-links.md` updated.
- [ ] Old URLs return a single 301; new URLs return 200 on the built site.
- [ ] Screenshots at phone and laptop widths reviewed.
- [ ] `docs/briefs/release-log.md` updated with the date, the pages added or changed, and the search queries each change targets, so the next Search Console review can compare before and after.

Release summary format for the owner: the URLs to review, any sentences added to existing pages, the list of anything unverified or flagged, and the queries to watch.

After each deploy the owner can use URL Inspection in Search Console to request indexing for new pages; this is optional, as the sitemap will be picked up anyway.

## Notes added on 10 November 2026, from checking the fixes

- The article drafts are not copied into the repo. They live in the owner's Claude Doc "Six article drafts for What's My Trait" (https://claude.ai/artifact/EjG1QmgCBrgay5FYdwNR2s); a release session reads the one draft it publishes from there with the docs tools.
- The byline credits "the What's My Trait team", linking to /about/, and the Article schema's author is an Organization with that url: the owner chose not to give a personal name (10 November 2026). Read "Person author" in this brief as that.
- The repository uses npm, not pnpm: the commands are `npm run check`, `npm test` and `npm run lighthouse`.
- The Lighthouse performance floor is 80, not 95, since the owner chose on 3 November to keep Google Analytics, whose script costs the score (`docs/decisions/0004-analytics.md`). Accessibility and best practices stay at 95.
- Facet statements went live on all 30 facet pages on 8 November, including neuroticism, before this brief's rollout. They live in `src/traits/facets-*.ts`, not in per-facet JSON files.
- Dates for pages that are not markdown articles live in `src/data/dates.json`, edited by hand; articles use `pubDate` and `updatedDate` in their frontmatter.

## Sources

- Search Console export for whatsmytrait.com, last 7 days to 8 November 2026 (supplied by the owner).
- Testable: Rosenberg Self-Esteem Scale, scoring and norms
- APA Monitor (2005): Schmitt and Allik's 53-nation self-esteem study
- University of Maryland: Rosenberg Self-Esteem Scale
- Rosenberg, M. (1965). Society and the adolescent self-image. Princeton University Press.
- Bandura, A. (1977). Self-efficacy: Toward a unifying theory of behavioral change. Psychological Review, 84(2), 191-215.
- Judge, T. A., Erez, A., Bono, J. E., & Thoresen, C. J. (2002). Are measures of self-esteem, neuroticism, locus of control, and generalized self-efficacy indicators of a common core construct? Journal of Personality and Social Psychology, 83, 693-710.
- Judge, T. A., Van Vianen, A. E. M., & De Pater, I. E. (2004). Emotional stability, core self-evaluations, and job outcomes. Human Performance, 17(3), 325-346.
- DeYoung, C. G., Quilty, L. C., & Peterson, J. B. (2007). Between facets and domains: 10 aspects of the Big Five. Journal of Personality and Social Psychology, 93(5), 880-896.
- IPIP: index of scale labels
- IPIP-NEO facet labels with alternative names
- The article drafts and their sources: the doc Six article drafts for What's My Trait.
