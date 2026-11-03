// Builds design/style-tile.html: tokens, type scale, one results plate, one
// question screen, the nav and the footer, as a single static page. Run with
// `node scripts/build-style-tile.mjs`, then serve the repository root
// (`python -m http.server 8765`) and open /design/style-tile.html.
//
// The strips here are drawn by the same rules the engine's strip renderer
// follows (docs/design-direction.md, "The strip"); the counts are a synthetic
// sum-of-ten-items distribution, labelled as such on the page.

import { writeFileSync } from 'node:fs';

// ── Synthetic norm data for the tile only ──
// A summed scale from `min` to `max`, roughly bell-shaped around `mean`.
function synthetic(min, max, mean, sd, n = 1000) {
	const counts = [];
	let total = 0;
	for (let s = min; s <= max; s++) {
		const z = (s - mean) / sd;
		const c = Math.round((n / (sd * 2.5)) * Math.exp(-0.5 * z * z));
		counts.push(c);
		total += c;
	}
	return { min, counts, n: total };
}

function percentile(norms, raw) {
	const i = raw - norms.min;
	let below = 0;
	for (let k = 0; k < i; k++) below += norms.counts[k] ?? 0;
	const at = norms.counts[i] ?? 0;
	return ((below + at / 2) / norms.n) * 100;
}

function scoreAt(norms, p) {
	let cum = 0;
	for (let k = 0; k < norms.counts.length; k++) {
		cum += norms.counts[k];
		if ((cum / norms.n) * 100 >= p) return norms.min + k;
	}
	return norms.min + norms.counts.length - 1;
}

const ordinal = (n) => {
	const r = Math.round(n);
	const m = r % 100;
	return `${r}${m >= 11 && m <= 13 ? 'th' : r % 10 === 1 ? 'st' : r % 10 === 2 ? 'nd' : r % 10 === 3 ? 'rd' : 'th'}`;
};

// ── The strip ──
// width 600 units; the band spans the raw range; marker at the raw score.
// Mirrors packages/instruments/src/strip.ts; that module is the implementation.
function strip({ name, min, max, norms, raw, hue, size = 'domain', second, caption }) {
	const W = 600;
	const H = size === 'domain' ? 28 : 16;
	const PAD = 6; // marker overhang
	const top = PAD;
	const x = (score) => ((score - min) / (max - min)) * W;
	const pct = percentile(norms, raw);
	const q1 = scoreAt(norms, 25), q3 = scoreAt(norms, 75);
	// Curve height is relative to a flat distribution over the same scores:
	// a score three times as common as the flat share fills the band, so
	// spread is comparable between strips of the same instrument.
	const flat = 1 / norms.counts.length;
	const h = (c) => Math.min(H, ((c / norms.n) / (flat * 3)) * H);

	const pts = norms.counts.map((c, k) => `${x(norms.min + k).toFixed(1)},${(top + H - h(c)).toFixed(1)}`);
	const area = `M${x(min).toFixed(1)},${top + H} L${pts.join(' L')} L${x(max).toFixed(1)},${top + H} Z`;

	const label = `${ordinal(pct)}`;
	const left = (score) => `${(((score - min) / (max - min)) * 100).toFixed(2)}%`;
	const side = (score) => ((score - min) / (max - min) < 0.85 ? '' : ' pct-left');
	const hueBar = hue && size === 'domain' ? `<rect x="0" y="${top + H}" width="${W}" height="2" fill="${hue}" />` : '';
	const clipId = `clip-${name.toLowerCase().replace(/[^a-z]+/g, '-')}`;
	const secondPct = second ? ordinal(percentile(norms, second.raw)) : '';
	const text = second
		? `${second.label}: ${second.raw} out of ${max}, the ${secondPct} percentile. ${caption ?? 'Today'}: ${raw} out of ${max}, the ${label} percentile for ${name.toLowerCase()}.`
		: `You scored ${raw} out of ${max}, the ${label} percentile for ${name.toLowerCase()}.`;

	// The SVG holds only the band (density in three clipped pieces so the
	// middle 50% is the band-mid token and nothing is layered, baseline, hue),
	// so it can stretch to any width. The markers and their numbers are HTML,
	// positioned by percentage, so they stay the same size on a phone as on a laptop.
	return `
<figure class="strip strip-${size}">
	<figcaption class="strip-head"><span class="strip-name">${name}</span></figcaption>
	<div class="strip-plot" role="img" aria-label="${text}">
		<svg viewBox="0 0 ${W} ${H + PAD * 2}" preserveAspectRatio="none" aria-hidden="true">
			<defs><clipPath id="${clipId}"><path d="${area}" /></clipPath></defs>
			<line class="baseline" x1="0" x2="${W}" y1="${top + H}" y2="${top + H}" />
			<rect class="density" clip-path="url(#${clipId})" x="0" y="${top}" width="${x(q1).toFixed(1)}" height="${H}" />
			<rect class="iqr" clip-path="url(#${clipId})" x="${x(q1).toFixed(1)}" y="${top}" width="${(x(q3) - x(q1)).toFixed(1)}" height="${H}" />
			<rect class="density" clip-path="url(#${clipId})" x="${x(q3).toFixed(1)}" y="${top}" width="${(W - x(q3)).toFixed(1)}" height="${H}" />
			${hueBar}
		</svg>
		${second ? `<span class="marker marker-outline" style="left:${left(second.raw)}"></span><span class="pct pct-second${side(second.raw)}" style="left:${left(second.raw)}">${secondPct}</span>` : ''}
		<span class="marker" style="left:${left(raw)}"></span>
		<span class="pct${side(raw)}" style="left:${left(raw)}">${label}</span>
	</div>
	<div class="strip-axis"><span>${min}</span><span>${max}</span></div>
	${second ? `<p class="strip-key">Outline: ${second.label}, ${secondPct}. Filled: ${caption ?? 'today'}, ${label}.</p>` : ''}
</figure>`;
}

// Results plate data: one named instrument, the IPIP-NEO-120, whose domains
// have 24 items (24 to 120) and whose facets have 4 (4 to 20). Facets sit
// under their own domain. The specimen table is generated from the same data.
const E = synthetic(24, 120, 76, 16), A = synthetic(24, 120, 88, 12), C = synthetic(24, 120, 84, 14), S = synthetic(24, 120, 72, 17), I = synthetic(24, 120, 86, 12);
const domains = [
	{ name: 'Openness', norms: I, raw: 108, hue: 'var(--hue-openness)', means: 'You tend to enjoy new ideas and ways of doing things more than most people do.' },
	{ name: 'Conscientiousness', norms: C, raw: 78, hue: 'var(--hue-conscientiousness)', means: 'You are a little less organised and persistent than most people.' },
	{ name: 'Extraversion', norms: E, raw: 91, hue: 'var(--hue-extraversion)', means: 'You tend to seek company and conversation more than most people do.' },
	{ name: 'Agreeableness', norms: A, raw: 80, hue: 'var(--hue-agreeableness)', means: 'You are a little less inclined than most people to put others first.' },
	{ name: 'Emotional stability', norms: S, raw: 50, hue: 'var(--hue-stability)', means: 'You tend to feel stress and low mood more readily than most people do.' },
];
const facets = [
	{ name: 'Friendliness', raw: 17 }, { name: 'Gregariousness', raw: 14 }, { name: 'Assertiveness', raw: 12 },
	{ name: 'Activity level', raw: 15 }, { name: 'Excitement-seeking', raw: 11 }, { name: 'Cheerfulness', raw: 16 },
].map((f) => ({ ...f, norms: synthetic(4, 20, 13, 3) }));
const tableRows = domains.map((d) => `<tr><td>${d.name}</td><td class="n">${d.raw}</td><td class="n">${Math.round(percentile(d.norms, d.raw))}</td></tr>`).join('\n\t\t\t');

const items = [
	'Am the life of the party.', 'Feel little concern for others.', 'Am always prepared.', 'Get stressed out easily.',
	'Have a rich vocabulary.', "Don't talk a lot.", 'Am interested in people.', 'Leave my belongings around.',
	'Am relaxed most of the time.', 'Have difficulty understanding abstract ideas.',
];
// The published labels are title case; the page shows them in sentence case.
// Only letter case changes, never a word.
const sentence = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const labels = ['Very Inaccurate', 'Moderately Inaccurate', 'Neither Accurate Nor Inaccurate', 'Moderately Accurate', 'Very Accurate'].map(sentence);

const question = (text, i) => `
<div class="item" role="group" aria-labelledby="q${i + 1}-text">
	<p class="item-text" id="q${i + 1}-text"><span class="item-n">${i + 1}</span>${text}</p>
	<div class="options">
		${labels.map((l, k) => `<label class="opt"><input type="radio" name="q${i + 1}" value="${k + 1}"${i === 0 && k === 3 ? ' checked' : ''} aria-label="${l}" /><span class="opt-n">${k + 1}</span><span class="opt-label">${l}</span></label>`).join('\n\t\t')}
	</div>
	<div class="ends" aria-hidden="true"><span>${labels[0]}</span><span>${labels[4]}</span></div>
</div>`;

const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Style tile</title>
<link rel="stylesheet" href="tokens.css" />
<style>
@font-face { font-family: "Familjen Grotesk"; src: url("../public/fonts/familjen-grotesk-latin-wght-normal.woff2") format("woff2"); font-weight: 400 700; font-style: normal; font-display: swap; }
@font-face { font-family: "Familjen Grotesk"; src: url("../public/fonts/familjen-grotesk-latin-wght-italic.woff2") format("woff2"); font-weight: 400 700; font-style: italic; font-display: swap; }

*, *::before, *::after { box-sizing: border-box; }
html { font-size: 16px; }
body {
	margin: 0; background: var(--page); color: var(--ink);
	font-family: var(--font); font-size: var(--body); line-height: 1.55;
	font-variant-numeric: tabular-nums; -webkit-font-smoothing: antialiased;
}
h1, h2, h3 { margin: 0; font-weight: 600; text-wrap: balance; }
h1 { font-size: var(--display); line-height: 1.1; letter-spacing: -0.015em; }
h2 { font-size: var(--heading); line-height: 1.2; }
h3 { font-size: var(--body); line-height: 1.3; }
p { margin: 0 0 var(--s3); }
a { color: var(--ink); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.15em; }
a:hover { text-decoration-thickness: 2px; }
small, .small { font-size: var(--small); line-height: 1.45; }
.quiet { color: var(--quiet); }
em { font-style: italic; }
:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.wrap { max-width: var(--plate); margin: 0 auto; padding: 0 var(--s3); }
.prose { max-width: var(--measure); }
section.tile { padding: var(--s6) 0; border-top: 1px solid var(--hair); }
section.tile:first-of-type { border-top: 0; }
.tile-label { font-size: var(--small); color: var(--quiet); margin: 0 0 var(--s4); }

/* Nav and footer */
header.site { border-bottom: 1px solid var(--hair); }
header.site .wrap { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: var(--s2) var(--s4); padding-top: var(--s4); padding-bottom: var(--s3); }
.site-title { font-weight: 600; text-decoration: none; font-size: var(--body); }
.site-title:hover { text-decoration: underline; }
nav.main ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: var(--s2) var(--s4); }
nav.main a { text-decoration: none; color: var(--quiet); }
nav.main a:hover, nav.main a[aria-current] { color: var(--ink); text-decoration: underline; }
@media (max-width: 600px) { nav.main ul { gap: var(--s2) var(--s3); } }
footer.site { border-top: 1px solid var(--hair); margin-top: 0; }
footer.site .wrap { padding-top: var(--s4); padding-bottom: var(--s5); font-size: var(--small); color: var(--quiet); }
footer.site p { margin: 0 0 var(--s2); }
footer.site nav { display: flex; flex-wrap: wrap; gap: var(--s2) var(--s3); margin-bottom: var(--s2); }
footer.site a { color: var(--quiet); }

/* Swatches */
.swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr)); gap: var(--s3); list-style: none; padding: 0; margin: 0 0 var(--s4); }
.swatch { font-size: var(--small); }
.swatch i { display: block; height: 3.5rem; border: 1px solid var(--hair); margin-bottom: var(--s1); }
.swatch b { font-weight: 600; display: block; }
.hues { display: flex; gap: var(--s3); flex-wrap: wrap; font-size: var(--small); }
.hues span { display: inline-flex; align-items: center; gap: var(--s2); }
.hues i { display: inline-block; width: 2.5rem; height: 2px; }

/* Type specimen */
.spec { display: grid; grid-template-columns: 7rem 1fr; gap: var(--s2) var(--s3); align-items: baseline; }
.spec dt { font-size: var(--small); color: var(--quiet); margin: 0; }
.spec dd { margin: 0; }
table.pct { border-collapse: collapse; margin: var(--s4) 0 0; font-size: var(--body); }
table.pct th, table.pct td { text-align: left; padding: var(--s2) var(--s4) var(--s2) 0; border-bottom: 1px solid var(--hair); font-weight: 400; }
table.pct th { font-weight: 600; }
table.pct td.n, table.pct th.n { text-align: right; }

/* Buttons */
.btn { display: inline-block; font: inherit; font-weight: 600; padding: 0.7em 1.25em; border: 1.5px solid var(--ink); border-radius: 3px; background: var(--ink); color: var(--page); text-decoration: none; cursor: pointer; line-height: 1.2; }
.btn:hover { background: var(--page); color: var(--ink); }
.btn.secondary { background: transparent; color: var(--ink); }
.btn.secondary:hover { background: var(--panel); }
.actions { display: flex; flex-wrap: wrap; gap: var(--s2) var(--s3); align-items: center; }
.under-button { font-size: var(--small); color: var(--quiet); margin: var(--s2) 0 0; }

/* Plate */
.plate { background: var(--panel); padding: var(--s5) var(--s4); }
.plate-note { font-size: var(--small); color: var(--quiet); margin: 0 0 var(--s4); }
.links { display: flex; flex-wrap: wrap; gap: var(--s2) var(--s4); margin: var(--s3) 0 0; }
@media (max-width: 600px) { .plate { padding: var(--s4) var(--s3); margin: 0 calc(-1 * var(--s3)); border-radius: 0; } }

/* Strips */
.strip { margin: 0 0 var(--s4); }
.strip-domain { margin-bottom: var(--s5); }
.strip-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--s1); }
.strip-name { font-weight: 600; }
.strip-facet .strip-name { font-weight: 400; font-size: var(--small); }
.strip-plot { position: relative; }
.strip svg { display: block; width: 100%; }
.strip-domain svg { height: 40px; }
.strip-facet svg { height: 28px; }
.strip .baseline { stroke: var(--hair); stroke-width: 1; vector-effect: non-scaling-stroke; }
.strip .density { fill: var(--band); }
.strip .iqr { fill: var(--band-mid); }
.strip .marker { position: absolute; top: 1px; bottom: 1px; width: 10px; margin-left: -5px; border-radius: 3px; background: var(--marker); border: 1.5px solid var(--ink); }
.strip .marker-outline { background: transparent; }
.strip .pct { position: absolute; top: 50%; transform: translateY(-50%); margin-left: 12px; font-variant-numeric: tabular-nums; line-height: 1; white-space: nowrap; }
.strip .pct-left { margin-left: 0; transform: translate(calc(-100% - 12px), -50%); }
.strip .pct-second { color: var(--quiet); }
.strip-facet .pct { font-size: var(--small); }
.strip-axis { display: flex; justify-content: space-between; font-size: var(--small); color: var(--quiet); margin-top: 2px; }
.strip-key { font-size: var(--small); color: var(--quiet); margin: var(--s2) 0 0; }
.strip-means { margin: calc(-1 * var(--s3)) 0 var(--s5); max-width: var(--measure); }
.strip-means em { font-style: italic; }
.facets { padding-left: var(--s4); margin: calc(-1 * var(--s3)) 0 var(--s5); }
.facets .strip-facet { margin-bottom: var(--s3); }
.facets h3 { margin: 0 0 var(--s3); font-size: var(--small); font-weight: 600; }

/* Draw-in: once, 200ms, respects reduced motion. */
@keyframes draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes appear { from { opacity: 0; } to { opacity: 1; } }
.strip svg { transform-origin: 0 50%; animation: draw 200ms ease-out both; }
.strip .marker, .strip .pct { animation: appear 200ms ease-out 150ms both; }
@media (prefers-reduced-motion: reduce) { .strip * { animation: none !important; } }

/* Question screen */
.progress { height: 2px; background: var(--hair); margin: 0 0 var(--s4); }
.progress i { display: block; height: 100%; width: 20%; background: var(--ink); }
.progress-text { font-size: var(--small); color: var(--quiet); margin: 0 0 var(--s4); display: flex; justify-content: space-between; gap: var(--s3); }
.item { padding: 0 0 var(--s5); margin: 0; }
.item-text { margin: 0 0 var(--s3); padding-left: 1.8em; text-indent: -1.8em; }
.item-n { display: inline-block; width: 1.8em; color: var(--quiet); font-variant-numeric: tabular-nums; text-indent: 0; }
.options { display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--s2); }
.ends { display: none; justify-content: space-between; font-size: var(--small); color: var(--quiet); margin-top: var(--s1); }
.opt { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: var(--s1); min-height: 3rem; padding: var(--s2) var(--s1); border: 1.5px solid var(--hair); background: var(--page); cursor: pointer; text-align: center; }
.opt input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; }
.opt-n { font-weight: 600; font-size: var(--body); line-height: 1; }
.opt-label { font-size: var(--small); line-height: 1.25; color: var(--quiet); }
.opt:hover { border-color: var(--ink); }
.opt:has(input:checked) { background: var(--ink); border-color: var(--ink); color: var(--page); }
.opt:has(input:checked) .opt-label { color: var(--page); }
.opt:has(input:focus-visible) { outline: 3px solid var(--ink); outline-offset: 2px; }
@media (max-width: 700px) {
	.ends { display: flex; }
	.keys { display: none; }
	.opt-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
	.opt { min-height: 3rem; justify-content: center; }
}
.screen-foot { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--s3); padding-top: var(--s4); border-top: 1px solid var(--hair); }
.screen-foot .btn { white-space: nowrap; }
.keys { font-size: var(--small); color: var(--quiet); }
.table-scroll { overflow-x: auto; }

/* Glyph */
.glyph { width: 3rem; height: 3rem; }
.glyph rect { fill: var(--ink); }
.glyph .m { fill: var(--marker); stroke: var(--ink); stroke-width: 1; }
</style>
</head>
<body>

<header class="site">
	<div class="wrap">
		<a class="site-title" href="#">Personality Tests</a>
		<nav class="main" aria-label="Main">
			<ul>
				<li><a href="#" aria-current="page">Tests</a></li>
				<li><a href="#">Traits</a></li>
				<li><a href="#">Careers</a></li>
				<li><a href="#">Compare</a></li>
				<li><a href="#">Guides</a></li>
			</ul>
		</nav>
	</div>
</header>

<main class="wrap">

<section class="tile">
	<p class="tile-label">Style tile. Tokens, type, one results plate, one question screen, the nav and the footer. The norm distribution drawn here is synthetic and labelled as such; real strips use committed norm tables.</p>
	<ul class="swatches">
		<li class="swatch"><i style="background:var(--page)"></i><b>Page</b> #F2F4F1</li>
		<li class="swatch"><i style="background:var(--panel)"></i><b>Panel</b> #E3E8E1</li>
		<li class="swatch"><i style="background:var(--ink)"></i><b>Ink</b> #23282D</li>
		<li class="swatch"><i style="background:var(--quiet)"></i><b>Quiet</b> #55606A</li>
		<li class="swatch"><i style="background:var(--marker)"></i><b>Marker</b> #F2C230</li>
		<li class="swatch"><i style="background:var(--band-mid)"></i><b>Band</b> Ink 8%, 16%</li>
	</ul>
	<p class="hues">
		<span><i style="background:var(--hue-openness)"></i>Openness</span>
		<span><i style="background:var(--hue-conscientiousness)"></i>Conscientiousness</span>
		<span><i style="background:var(--hue-extraversion)"></i>Extraversion</span>
		<span><i style="background:var(--hue-agreeableness)"></i>Agreeableness</span>
		<span><i style="background:var(--hue-stability)"></i>Emotional stability</span>
	</p>
</section>

<section class="tile">
	<dl class="spec">
		<dt>Display 40</dt><dd><h1>Introvert or extrovert?</h1></dd>
		<dt>Heading 26</dt><dd><h2>Understanding your scores</h2></dd>
		<dt>Body 18</dt><dd class="prose">The IPIP Extraversion scale has 20 items and takes about three minutes. It is scored on your device and compared with a published sample of 3,467 adults. Links are <a href="#">underlined, not arrowed</a>.</dd>
		<dt>Italic</dt><dd><em>You tend to seek company and conversation more than most people do.</em></dd>
		<dt>Small 14</dt><dd class="small quiet">Source: Goldberg (1992), Psychological Assessment, 4(1), 26-42. Public domain (IPIP).</dd>
	</dl>
	<div class="table-scroll"><table class="pct">
		<thead><tr><th>Scale</th><th class="n">Score out of 120</th><th class="n">Percentile</th></tr></thead>
		<tbody>
			${tableRows}
		</tbody>
	</table></div>
	<div class="actions" style="margin-top:var(--s4)">
		<a class="btn" href="#">Start the test</a>
		<a class="btn secondary" href="#">Save as PDF</a>
		<a class="btn secondary" href="#">Copy as text</a>
	</div>
	<p class="under-button">No sign-up, scored on your device, nothing stored online.</p>
</section>

<section class="tile">
	<p class="tile-label">Results plate</p>
	<div class="plate">
		<h2 style="margin-bottom:var(--s2)">Your results</h2>
		<p class="plate-note">IPIP-NEO-120, compared with all adults in the norm sample. Saved on this device on 3 November 2026. Curve height shows how common each score is.</p>
		${domains.map((d) => strip({ name: d.name, min: 24, max: 120, norms: d.norms, raw: d.raw, hue: d.hue })
			+ `\n<p class="strip-means"><em>${d.means}</em></p>`
			+ (d.name === 'Extraversion' ? `\n<div class="facets"><h3>Facets of extraversion</h3>\n${facets.map((f) => strip({ name: f.name, min: 4, max: 20, norms: f.norms, raw: f.raw, size: 'facet' })).join('\n')}\n</div>` : '')).join('\n')}
		<p class="plate-note">Two attempts, or two people, on one strip: the earlier one is an outline.</p>
		${strip({ name: 'Extraversion', min: 24, max: 120, norms: E, raw: 91, hue: 'var(--hue-extraversion)', second: { raw: 70, label: '14 October' }, caption: 'today' })}
		<div class="actions" style="margin-top:var(--s4)">
			<a class="btn secondary" href="#">Copy as text</a>
			<a class="btn secondary" href="#">Save as PDF</a>
			<a class="btn secondary" href="#">Start again</a>
		</div>
		<p class="links"><a href="#">Share a comparison link</a><a href="#">Set a retake reminder</a></p>
	</div>
</section>

<section class="tile">
	<p class="tile-label">Question screen</p>
	<div class="plate">
		<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="50" aria-valuenow="10" aria-label="Progress"><i></i></div>
		<p class="progress-text"><span>Screen 1 of 5</span><span>10 of 50 answered</span></p>
		<form>
			${items.map(question).join('\n')}
			<div class="screen-foot">
				<span class="keys">Keys 1 to 5 answer, Enter continues.</span>
				<button type="button" class="btn">Next screen</button>
			</div>
		</form>
	</div>
</section>

<section class="tile">
	<p class="tile-label">Glyphs: five strips for the Big Five, one for a single trait.</p>
	<div class="actions">
		<svg class="glyph" viewBox="0 0 48 48" aria-hidden="true">
			<rect x="4" y="7" width="40" height="2"/><rect x="4" y="15" width="40" height="2"/><rect x="4" y="23" width="40" height="2"/><rect x="4" y="31" width="40" height="2"/><rect x="4" y="39" width="40" height="2"/>
			<rect class="m" x="30" y="4" width="4" height="8" rx="1"/><rect class="m" x="14" y="12" width="4" height="8" rx="1"/><rect class="m" x="36" y="20" width="4" height="8" rx="1"/><rect class="m" x="22" y="28" width="4" height="8" rx="1"/><rect class="m" x="10" y="36" width="4" height="8" rx="1"/>
		</svg>
		<svg class="glyph" viewBox="0 0 48 48" aria-hidden="true">
			<rect x="4" y="23" width="40" height="2"/><rect class="m" x="30" y="17" width="4" height="14" rx="1"/>
		</svg>
	</div>
</section>

</main>

<footer class="site">
	<div class="wrap">
		<p>Free, open tests. Scored on your device. Results describe tendencies and are not a diagnosis.</p>
		<nav aria-label="Site"><a href="#">Methodology</a><a href="#">Licences</a><a href="#">About</a><a href="#">Privacy</a><a href="#">For teachers and researchers</a></nav>
		<p>&copy; 2026 Personality Tests</p>
	</div>
</footer>

</body>
</html>
`;

writeFileSync('design/style-tile.html', html);
console.log('wrote design/style-tile.html');
