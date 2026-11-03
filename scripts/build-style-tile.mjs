// Builds design/style-tile.html: three composed pages (a test page header, a
// results plate, a question screen) on the reference-work grid, with the
// masthead and footer, and a short appendix of tokens and type. Run with
// `node scripts/build-style-tile.mjs`, then serve the repository root
// (`python -m http.server 8765`) and open /design/style-tile.html.
//
// The strips here follow the same rules as packages/instruments/src/strip.ts,
// which is the implementation. The norm distribution is synthetic and the
// page says so.

import { writeFileSync } from 'node:fs';

// ── Synthetic norm data for the tile only ──
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

// ── The strip plot (band, markers, labels); the name lives in the margin column ──
function plot({ name, min, max, norms, raw, hue, size = 'domain', second, caption }) {
	const W = 600;
	const H = size === 'domain' ? 28 : 16;
	const PAD = 6;
	const top = PAD;
	const x = (score) => ((score - min) / (max - min)) * W;
	const pct = percentile(norms, raw);
	const q1 = scoreAt(norms, 25), q3 = scoreAt(norms, 75);
	const flat = 1 / norms.counts.length;
	const h = (c) => Math.min(H, ((c / norms.n) / (flat * 3)) * H);
	const pts = norms.counts.map((c, k) => `${x(norms.min + k).toFixed(1)},${(top + H - h(c)).toFixed(1)}`);
	const area = `M${x(min).toFixed(1)},${top + H} L${pts.join(' L')} L${x(max).toFixed(1)},${top + H} Z`;
	const label = ordinal(pct);
	const left = (score) => `${(((score - min) / (max - min)) * 100).toFixed(2)}%`;
	const side = (score) => ((score - min) / (max - min) < 0.85 ? '' : ' pct-left');
	const hueBar = hue && size === 'domain' ? `<rect x="0" y="${top + H}" width="${W}" height="2" fill="${hue}" />` : '';
	const clipId = `clip-${name.toLowerCase().replace(/[^a-z]+/g, '-')}-${size}${second ? '-two' : ''}`;
	const secondPct = second ? ordinal(percentile(norms, second.raw)) : '';
	const text = second
		? `${second.label}: ${second.raw} out of ${max}, the ${secondPct} percentile. ${caption ?? 'Today'}: ${raw} out of ${max}, the ${label} percentile for ${name.toLowerCase()}.`
		: `You scored ${raw} out of ${max}, the ${label} percentile for ${name.toLowerCase()}.`;
	return `
<div class="strip strip-${size}">
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
</div>`;
}

// Results data: the IPIP-NEO-120. Domains 24 to 120, facets 4 to 20.
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

const resultRow = (d) => `
<div class="row result">
	<div class="aside">
		<p class="scale-name">${d.name}</p>
		<p class="scale-raw">${d.raw} of 120</p>
	</div>
	<div class="main wide">
		${plot({ name: d.name, min: 24, max: 120, norms: d.norms, raw: d.raw, hue: d.hue })}
		<p class="means"><em>${d.means}</em></p>
		${d.name === 'Extraversion' ? `
		<div class="facets">
			${facets.map((f) => `<div class="facet"><span class="facet-name">${f.name}</span>${plot({ name: f.name, min: 4, max: 20, norms: f.norms, raw: f.raw, size: 'facet' })}</div>`).join('')}
		</div>` : ''}
	</div>
</div>`;

const items = [
	'Am the life of the party.', 'Feel little concern for others.', 'Am always prepared.', 'Get stressed out easily.',
	'Have a rich vocabulary.', "Don't talk a lot.", 'Am interested in people.', 'Leave my belongings around.',
	'Am relaxed most of the time.', 'Have difficulty understanding abstract ideas.',
];
const sentence = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const labels = ['Very Inaccurate', 'Moderately Inaccurate', 'Neither Accurate Nor Inaccurate', 'Moderately Accurate', 'Very Accurate'].map(sentence);

const question = (text, i) => `
<div class="row q" role="group" aria-labelledby="q${i + 1}-text">
	<div class="aside"><span class="q-n">${String(i + 1).padStart(2, '0')}</span></div>
	<div class="main wide">
		<p class="q-text" id="q${i + 1}-text">${text}</p>
		<div class="cells">
			${labels.map((l, k) => `<label class="cell"><input type="radio" name="q${i + 1}" value="${k + 1}"${i === 0 && k === 3 ? ' checked' : ''} aria-label="${l}" /><span class="cell-n">${k + 1}</span><span class="cell-label">${l}</span></label>`).join('\n\t\t\t')}
		</div>
		<div class="ends" aria-hidden="true"><span>${labels[0]}</span><span>${labels[4]}</span></div>
	</div>
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
:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* The grid: a margin column and a main column. */
.wrap { max-width: var(--container); margin: 0 auto; padding: 0 var(--s3); }
.row { display: grid; grid-template-columns: var(--margin-col) minmax(0, 1fr); column-gap: var(--s5); align-items: start; }
.aside { font-size: var(--small); color: var(--quiet); }
.aside p { margin: 0 0 var(--s1); }
.main { max-width: var(--measure); min-width: 0; }
.main.wide { max-width: none; }
@media (max-width: 760px) {
	.row { grid-template-columns: 1fr; row-gap: var(--s2); }
}

/* Masthead and footer */
.mast { border-bottom: 1px solid var(--hair); padding: var(--s4) 0 var(--s3); }
.mast .row { align-items: baseline; }
.site-title { font-weight: 600; font-size: var(--body); color: var(--ink); text-decoration: none; }
.site-title:hover { text-decoration: underline; }
nav.main-nav ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: var(--s2) var(--s4); }
nav.main-nav a { text-decoration: none; color: var(--quiet); }
nav.main-nav a:hover, nav.main-nav a[aria-current] { color: var(--ink); text-decoration: underline; }
@media (max-width: 760px) {
	.mast .row { grid-template-columns: 1fr; row-gap: var(--s2); }
	nav.main-nav ul { gap: var(--s2) var(--s3); font-size: var(--small); }
}
footer.site { border-top: 1px solid var(--hair); padding: var(--s4) 0 var(--s6); font-size: var(--small); color: var(--quiet); }
footer.site p { margin: 0 0 var(--s2); }
footer.site nav { display: flex; flex-wrap: wrap; gap: var(--s2) var(--s3); margin-bottom: var(--s2); }
footer.site a { color: var(--quiet); }

/* Tile scaffolding: a label for each composed page, outside the design. */
.tile-label { font-size: var(--small); color: var(--quiet); padding: var(--s5) 0 var(--s3); border-top: 1px solid var(--hair); }
.tile-label:first-child { border-top: 0; }

/* Page head: section name and facts in the margin column; on phones the facts drop under the text. */
.page-head { padding: var(--s6) 0 var(--s5); }
.page-head .row { grid-template-areas: "side main" "facts main"; }
.page-head .aside { grid-area: side; }
.page-head .main { grid-area: main; }
.page-head .facts { grid-area: facts; font-size: var(--small); color: var(--quiet); }
@media (max-width: 760px) {
	.page-head .row { grid-template-areas: "side" "main" "facts"; }
	.page-head .facts { margin-top: var(--s4); max-width: 24rem; }
}
.section-name { margin: 0 0 var(--s4); }
.section-name a { color: var(--quiet); text-decoration: none; }
.section-name a:hover { text-decoration: underline; }
.subtitle { font-size: var(--body); color: var(--quiet); margin: var(--s2) 0 var(--s4); }
.meta { display: grid; grid-template-columns: auto 1fr; column-gap: var(--s3); margin: 0; }
.meta dt { color: var(--quiet); padding: var(--s1) 0; border-top: 1px solid var(--hair); }
.meta dd { margin: 0; color: var(--ink); padding: var(--s1) 0; border-top: 1px solid var(--hair); font-variant-numeric: tabular-nums; }
.meta dt:first-of-type, .meta dd:first-of-type { border-top: 0; }
@media (max-width: 760px) { .meta { grid-template-columns: auto auto; column-gap: var(--s4); row-gap: 0; } }

/* Buttons */
.btn { display: inline-block; font: inherit; font-weight: 600; padding: 0.7em 1.25em; border: 1.5px solid var(--ink); background: var(--ink); color: var(--page); text-decoration: none; cursor: pointer; line-height: 1.2; white-space: nowrap; }
.btn:hover { background: var(--page); color: var(--ink); }
.btn.secondary { background: transparent; color: var(--ink); }
.btn.secondary:hover { background: var(--panel); }
.actions { display: flex; flex-wrap: wrap; gap: var(--s2) var(--s3); align-items: center; }
.under-button { font-size: var(--small); color: var(--quiet); margin: var(--s2) 0 0; }
.links { display: flex; flex-wrap: wrap; gap: var(--s2) var(--s4); margin: var(--s3) 0 0; font-size: var(--small); }

/* Plate: a full-bleed band of Panel with the grid inside. */
.plate { background: var(--panel); padding: var(--s5) 0; }
.plate-head { padding-bottom: var(--s3); }
.plate-head h2 { margin-bottom: var(--s1); }
.plate-note { font-size: var(--small); color: var(--quiet); margin: 0; }
.plate .result { padding: var(--s4) 0; border-top: 1px solid var(--hair); }
.plate .result:first-of-type { border-top: 0; }
.scale-name { font-size: var(--body); font-weight: 600; color: var(--ink); }
.scale-raw { font-variant-numeric: tabular-nums; }
.means { margin: var(--s2) 0 0; max-width: var(--measure); }
.plate-foot { padding-top: var(--s4); border-top: 1px solid var(--hair); }

/* Strips */
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

/* Facets: small multiples in a name/strip grid under the domain. */
.facets { margin-top: var(--s4); display: grid; grid-template-columns: 9rem minmax(0, 1fr); column-gap: var(--s3); row-gap: var(--s2); align-items: center; }
.facets .facet { display: contents; }
.facet-name { font-size: var(--small); color: var(--quiet); }
.facets .strip-facet { margin: 0; }
.facets .strip-axis { display: none; }
@media (max-width: 760px) {
	.facets { grid-template-columns: 1fr; row-gap: var(--s1); }
	.facet-name { margin-top: var(--s2); }
}

/* Draw-in: once, 200ms, respects reduced motion. */
@keyframes draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes appear { from { opacity: 0; } to { opacity: 1; } }
.strip svg { transform-origin: 0 50%; animation: draw 200ms ease-out both; }
.strip .marker, .strip .pct { animation: appear 200ms ease-out 150ms both; }
@media (prefers-reduced-motion: reduce) { .strip * { animation: none !important; } }

/* Question screen */
.progress { height: 2px; background: var(--hair); margin: 0 0 var(--s2); }
.progress i { display: block; height: 100%; width: 20%; background: var(--ink); }
.screen-head { font-size: var(--small); color: var(--quiet); padding-bottom: var(--s4); }
.screen-head p { margin: 0; }
.q { padding: var(--s4) 0; }
.q-n { font-size: var(--heading); line-height: 1; color: var(--quiet); font-variant-numeric: tabular-nums; }
.q-text { margin: 0 0 var(--s3); }
.cells { display: grid; grid-template-columns: repeat(5, 1fr); border-top: 1px solid var(--hair); border-bottom: 1px solid var(--hair); }
.cell { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--s1); min-height: 3.25rem; padding: var(--s2) var(--s1); border-left: 1px solid var(--hair); cursor: pointer; text-align: center; }
.cell:first-child { border-left: 0; }
.cell input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; }
.cell-n { font-weight: 600; line-height: 1; }
.cell-label { font-size: var(--small); line-height: 1.25; color: var(--quiet); }
.cell:hover { background: var(--page); }
.cell:has(input:checked) { background: var(--ink); color: var(--page); }
.cell:has(input:checked) .cell-label { color: var(--page); }
.cell:has(input:focus-visible) { outline: 3px solid var(--ink); outline-offset: -3px; }
.ends { display: none; justify-content: space-between; font-size: var(--small); color: var(--quiet); margin-top: var(--s1); }
.screen-foot { padding-top: var(--s4); border-top: 1px solid var(--hair); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--s3); }
.keys { font-size: var(--small); color: var(--quiet); }
@media (max-width: 760px) {
	.ends { display: flex; }
	.keys { display: none; }
	.cell-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
	.cell { justify-content: center; }
	.q-n { font-size: var(--small); }
}

/* Appendix: tokens and type */
.appendix { padding: var(--s5) 0 var(--s6); }
.appendix .row { padding: var(--s3) 0; border-top: 1px solid var(--hair); }
.swatches { display: flex; flex-wrap: wrap; gap: var(--s3) var(--s4); list-style: none; padding: 0; margin: 0; font-size: var(--small); }
.swatch { display: flex; align-items: center; gap: var(--s2); }
.swatch i { display: inline-block; width: 2rem; height: 2rem; border: 1px solid var(--hair); }
.hues { display: flex; flex-wrap: wrap; gap: var(--s2) var(--s4); font-size: var(--small); }
.hues span { display: inline-flex; align-items: center; gap: var(--s2); }
.hues i { display: inline-block; width: 2rem; height: 2px; }
.spec > * { margin: 0 0 var(--s2); }
table.pct { border-collapse: collapse; }
table.pct th, table.pct td { text-align: left; padding: var(--s1) var(--s4) var(--s1) 0; border-bottom: 1px solid var(--hair); font-weight: 400; }
table.pct th { font-weight: 600; }
table.pct .n { text-align: right; }
.glyph { width: 2.5rem; height: 2.5rem; vertical-align: middle; margin-right: var(--s3); }
.glyph rect { fill: var(--ink); }
.glyph .m { fill: var(--marker); stroke: var(--ink); stroke-width: 1; }
</style>
</head>
<body>

<header class="mast">
	<div class="wrap row">
		<a class="site-title" href="#">What's My Trait</a>
		<nav class="main-nav" aria-label="Main">
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

<main>

<div class="wrap"><p class="tile-label">Style tile, page one: the top of a test page.</p></div>

<section class="page-head">
	<div class="wrap row">
		<div class="aside">
			<p class="section-name"><a href="#">Tests</a></p>
		</div>
		<div class="main">
			<h1>Introvert or extrovert?</h1>
			<p class="subtitle">IPIP Extraversion scale, 20 items, 3 minutes</p>
			<p>Extraversion is the tendency to seek company, conversation and stimulation. This scale asks how accurately twenty short statements describe you, scores them on your device, and shows where you fall among 3,467 adults who answered the same items.</p>
			<div class="actions"><a class="btn" href="#">Start the test</a></div>
			<p class="under-button">No sign-up, scored on your device, nothing stored online.</p>
		</div>
		<div class="facts">
			<dl class="meta">
				<dt>Items</dt><dd>20</dd>
				<dt>Time</dt><dd>3 minutes</dd>
				<dt>Norms</dt><dd>3,467 adults</dd>
				<dt>Reliability</dt><dd>0.91</dd>
				<dt>Licence</dt><dd>Public domain</dd>
			</dl>
		</div>
	</div>
</section>

<div class="wrap"><p class="tile-label">Page two: results.</p></div>

<section class="plate">
	<div class="wrap">
		<div class="row plate-head">
			<div class="aside"><p>Saved on this device<br />3 November 2026</p></div>
			<div class="main wide">
				<h2>Your results</h2>
				<p class="plate-note">IPIP-NEO-120, compared with all adults in the norm sample. Curve height shows how common each score is.</p>
			</div>
		</div>
		${domains.map(resultRow).join('\n')}
		<div class="row result">
			<div class="aside">
				<p class="scale-name">Extraversion</p>
				<p class="scale-raw">Two attempts</p>
			</div>
			<div class="main wide">
				${plot({ name: 'Extraversion', min: 24, max: 120, norms: E, raw: 91, hue: 'var(--hue-extraversion)', second: { raw: 70, label: '14 October' }, caption: 'today' })}
			</div>
		</div>
		<div class="row plate-foot">
			<div class="aside"></div>
			<div class="main wide">
				<div class="actions">
					<a class="btn secondary" href="#">Copy as text</a>
					<a class="btn secondary" href="#">Save as PDF</a>
					<a class="btn secondary" href="#">Start again</a>
				</div>
				<p class="links"><a href="#">Share a comparison link</a><a href="#">Set a retake reminder</a></p>
			</div>
		</div>
	</div>
</section>

<div class="wrap"><p class="tile-label">Page three: a question screen.</p></div>

<section class="plate">
	<div class="wrap">
		<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="50" aria-valuenow="10" aria-label="Progress"><i></i></div>
		<div class="row screen-head">
			<div class="aside"><p>Screen 1 of 5</p></div>
			<div class="main wide"><p>10 of 50 answered. Rate how accurately each statement describes you.</p></div>
		</div>
		<form>
			${items.map(question).join('\n')}
			<div class="row">
				<div class="aside"></div>
				<div class="main wide screen-foot">
					<span class="keys">Keys 1 to 5 answer, Enter continues.</span>
					<button type="button" class="btn">Next screen</button>
				</div>
			</div>
		</form>
	</div>
</section>

<div class="wrap"><p class="tile-label">Appendix: tokens, type and glyphs.</p></div>

<section class="appendix">
	<div class="wrap">
		<div class="row">
			<div class="aside">Colour</div>
			<div class="main wide">
				<ul class="swatches">
					<li class="swatch"><i style="background:var(--page)"></i>Page #F2F4F1</li>
					<li class="swatch"><i style="background:var(--panel)"></i>Panel #E3E8E1</li>
					<li class="swatch"><i style="background:var(--ink)"></i>Ink #23282D</li>
					<li class="swatch"><i style="background:var(--quiet)"></i>Quiet #55606A</li>
					<li class="swatch"><i style="background:var(--marker)"></i>Marker #F2C230</li>
					<li class="swatch"><i style="background:var(--band-mid)"></i>Band, Ink 8% and 16%</li>
				</ul>
				<p class="hues" style="margin-top:var(--s3)">
					<span><i style="background:var(--hue-openness)"></i>Openness</span>
					<span><i style="background:var(--hue-conscientiousness)"></i>Conscientiousness</span>
					<span><i style="background:var(--hue-extraversion)"></i>Extraversion</span>
					<span><i style="background:var(--hue-agreeableness)"></i>Agreeableness</span>
					<span><i style="background:var(--hue-stability)"></i>Emotional stability</span>
				</p>
			</div>
		</div>
		<div class="row">
			<div class="aside">Type</div>
			<div class="main spec">
				<h1>Display 40, tight</h1>
				<h2>Heading 26</h2>
				<p>Body 18 on 1.55, Familjen Grotesk, one family for everything. Links are <a href="#">underlined, not arrowed</a>.</p>
				<p><em>Italic has one job: the plain-language sentence under each result.</em></p>
				<p class="small quiet">Small 14 in Quiet for meta, axis labels and the sources box.</p>
				<table class="pct">
					<thead><tr><th>Scale</th><th class="n">Score</th><th class="n">Percentile</th></tr></thead>
					<tbody>${domains.map((d) => `<tr><td>${d.name}</td><td class="n">${d.raw}</td><td class="n">${Math.round(percentile(d.norms, d.raw))}</td></tr>`).join('')}</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="aside">Glyphs</div>
			<div class="main wide">
				<svg class="glyph" viewBox="0 0 48 48" aria-hidden="true">
					<rect x="4" y="7" width="40" height="2"/><rect x="4" y="15" width="40" height="2"/><rect x="4" y="23" width="40" height="2"/><rect x="4" y="31" width="40" height="2"/><rect x="4" y="39" width="40" height="2"/>
					<rect class="m" x="30" y="4" width="4" height="8" rx="1"/><rect class="m" x="14" y="12" width="4" height="8" rx="1"/><rect class="m" x="36" y="20" width="4" height="8" rx="1"/><rect class="m" x="22" y="28" width="4" height="8" rx="1"/><rect class="m" x="10" y="36" width="4" height="8" rx="1"/>
				</svg><svg class="glyph" viewBox="0 0 48 48" aria-hidden="true">
					<rect x="4" y="23" width="40" height="2"/><rect class="m" x="30" y="17" width="4" height="14" rx="1"/>
				</svg><span class="small quiet">Five strips for the Big Five, one for a single trait.</span>
			</div>
		</div>
	</div>
</section>

</main>

<footer class="site">
	<div class="wrap row">
		<div class="aside"><p>What's My Trait</p></div>
		<div class="main">
			<p>Free, open tests. Scored on your device. Results describe tendencies and are not a diagnosis.</p>
			<nav aria-label="Site"><a href="#">Methodology</a><a href="#">Licences</a><a href="#">About</a><a href="#">Privacy</a><a href="#">For teachers and researchers</a></nav>
			<p>&copy; 2026 What's My Trait</p>
		</div>
	</div>
</footer>

</body>
</html>
`;

writeFileSync('design/style-tile.html', html);
console.log('wrote design/style-tile.html');
