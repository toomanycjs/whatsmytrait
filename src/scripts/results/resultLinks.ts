// Score-dependent links in a tool's results panel, and the rule that keeps
// exercise pages out of results panels when the person's results point to
// PEM or low function. Called from ScoreHistory's record(), so every tool
// that saves a result gets both without its own wiring.
//
// Thresholds come from each tool's interpretation section; nothing here is a
// new cut-off except where noted:
// - Bell: 40 or below, as specified for this feature (the scale has no bands).
// - FUNCAP: no published bands. "Low" reads the score against the 0 to 6
//   answer scale, as the interpretation section does: a score that rounds to 3
//   or below means activities leave you able to do little else that day, or
//   worse. Confirmed by Craig, November 2026.
// - PCFS: grades 3 and 4 (moderate and severe functional limitations).
// - Chalder: no published Likert bands, so the high band is the bimodal
//   cut-off of 4 or more.
// - FSS: the upper band, 4 or more.
// - DSQ-PEM: PEM indicated. DSQ-Brief: screen positive (all four symptoms).

import { readTool } from './resultsStore';
import type { ResultEntry, ScoreResult } from './types';

export interface ResultLink {
	href: string;
	label: string;
	note: string;
}

const LOW_SPOON: ResultLink = {
	href: '/low-spoon-cooking/',
	label: 'Low Spoon Cooking',
	note: 'If cooking takes more than you have, these recipes are built for low-energy days.',
};
const PACING: ResultLink = {
	href: '/tools/pacing-and-heart-rate/',
	label: 'Pacing and heart rate ceiling',
	note: 'The energy envelope in plain language, with a heart rate ceiling worked out from your resting heart rate.',
};
const PEM: ResultLink = {
	href: '/evidence/post-exertional-malaise/',
	label: 'Post-exertional malaise explained',
	note: 'What PEM is, and why pushing through tends to make it worse.',
};
const DSQ2: ResultLink = {
	href: '/tools/dsq-2/',
	label: 'Take the full DSQ-2',
	note: 'Your screen is positive. The full questionnaire checks your symptoms against four ME/CFS case definitions.',
};

/** Never linked from a results panel while exerciseLinksBlocked() is true. */
export const EXERCISE_HREFS = ['/evidence/chop-levine-protocol-pots/', '/tools/exercise-readiness/', '/tools/exercise-progression/'];

/** FUNCAP scores that round to 3 or below on the 0 to 6 answer scale. */
export const FUNCAP_LOW_BELOW = 3.5;

const bellLow = (r: Pick<ScoreResult, 'total'>) => r.total !== null && r.total <= 40;
const funcapLow = (v: number | null | undefined) => v != null && v < FUNCAP_LOW_BELOW;
const pemIndicated = (r: Pick<ScoreResult, 'subscores'>) => r.subscores.pem === 1;

/** The score-dependent links for a just-produced result, in display order. */
export function resultLinksFor(tool: string, r: ScoreResult): ResultLink[] {
	const links: ResultLink[] = [];
	switch (tool) {
		case 'bell-scale':
			if (bellLow(r)) links.push(PACING, PEM, LOW_SPOON);
			break;
		case 'funcap':
			if (funcapLow(r.total)) links.push(PACING, PEM);
			if (funcapLow(r.subscores.home)) links.push(LOW_SPOON);
			break;
		case 'pcfs':
			if (r.total !== null && r.total >= 3) links.push(LOW_SPOON);
			break;
		case 'chalder-fatigue-scale':
			if ((r.subscores.bimodal ?? 0) >= 4) links.push(LOW_SPOON);
			break;
		case 'fss':
			if (r.total !== null && r.total >= 4) links.push(LOW_SPOON);
			break;
		case 'dsq-pem':
			if (pemIndicated(r)) links.push(PACING, PEM);
			break;
		case 'dsq-brief':
			if (r.subscores.met === 4) links.push(DSQ2);
			break;
	}
	return links;
}

/**
 * True when the current result, or the latest saved result of DSQ-PEM, Bell or
 * FUNCAP, indicates PEM or low function. The current result stands in for its
 * own tool's saved one.
 */
export function exerciseLinksBlocked(tool: string, r: ScoreResult, latest: (tool: string) => Pick<ResultEntry, 'total' | 'subscores'> | null): boolean {
	const get = (t: string) => (t === tool ? r : latest(t));
	const pem = get('dsq-pem');
	const bell = get('bell-scale');
	const funcap = get('funcap');
	return (!!pem && pemIndicated(pem)) || (!!bell && bellLow(bell)) || (!!funcap && funcapLow(funcap.total));
}

const latestSaved = (tool: string) => {
	const all = readTool(tool);
	return all[all.length - 1] ?? null;
};

/**
 * Fill the page's result-links block for this result, and swap any exercise
 * links in the results panel (marked data-exercise-link) for their
 * alternative (data-exercise-alt) when they should not be shown.
 */
export function applyResultLinks(tool: string, r: ScoreResult) {
	const blocked = exerciseLinksBlocked(tool, r, latestSaved);
	document.querySelectorAll<HTMLElement>('[data-exercise-link]').forEach(el => { el.hidden = blocked; });
	document.querySelectorAll<HTMLElement>('[data-exercise-alt]').forEach(el => { el.hidden = !blocked; });

	const root = document.querySelector<HTMLElement>(`.result-links[data-tool="${tool}"]`);
	if (!root) return;
	const links = resultLinksFor(tool, r).filter(l => !blocked || !EXERCISE_HREFS.includes(l.href));
	root.replaceChildren();
	root.hidden = links.length === 0;
	if (!links.length) return;
	const list = document.createElement('ul');
	for (const l of links) {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = l.href;
		a.textContent = l.label;
		const note = document.createElement('span');
		note.className = 'related-note';
		note.textContent = l.note;
		li.append(a, note);
		list.append(li);
	}
	const heading = document.createElement('h3');
	heading.textContent = 'Related to your result';
	root.append(heading, list);
}
