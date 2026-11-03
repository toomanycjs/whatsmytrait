// Scoring: pure functions, no DOM. score(instrument, responses) returns the
// raw score per scale from the item keys and the scoring rule in the
// instrument file. Nothing here knows which instrument it is scoring.

import type { Instrument, Item, Responses, ScaleScore, ScoreResultSet } from './instrument';

/**
 * The keyed value of one response. For a likert scale: x for a +keyed item,
 * points+1-x for a -keyed one, where x counts from the lowest-scoring option
 * (so a scale published with its highest option first is flipped first). For
 * a check box: 1 when checked (response 2), 0 when not, inverted for a -keyed item.
 */
export function itemValue(instrument: Instrument, item: Item, response: number): number {
	const { points, type, highFirst } = instrument.response;
	if (!Number.isInteger(response) || response < 1 || response > points) {
		throw new RangeError(`item ${item.n}: response ${response} is not between 1 and ${points}`);
	}
	if (type === 'check') {
		const checked = response === 2 ? 1 : 0;
		return item.key === 1 ? checked : 1 - checked;
	}
	const x = highFirst ? points + 1 - response : response;
	return item.key === 1 ? x : points + 1 - x;
}

/** The items that count towards a scale: its own, or for a domain of facets, every facet's. */
export function itemsForScale(instrument: Instrument, scaleId: string): Item[] {
	const scale = instrument.scales.find((s) => s.id === scaleId);
	if (!scale) throw new RangeError(`unknown scale ${scaleId}`);
	if (scale.facets?.length) return instrument.items.filter((it) => scale.facets!.includes(it.scale));
	return instrument.items.filter((it) => it.scale === scaleId);
}

/** Lowest and highest possible raw score for a scale. */
export function scaleRange(instrument: Instrument, scaleId: string): { min: number; max: number } {
	const n = itemsForScale(instrument, scaleId).length;
	const { points, type } = instrument.response;
	if (type === 'check') return instrument.scoring.method === 'mean' ? { min: 0, max: 1 } : { min: 0, max: n };
	if (instrument.scoring.method === 'mean') return { min: 1, max: points };
	return { min: n, max: n * points };
}

/**
 * Raw scores for every scale. Unanswered items are left out of a sum, so an
 * incomplete scale's raw score is only meaningful when `answered === of`;
 * callers decide whether to show incomplete scales.
 */
export function score(instrument: Instrument, responses: Responses): ScoreResultSet {
	const scales: Record<string, ScaleScore> = {};
	let allAnswered = true;
	for (const scale of instrument.scales) {
		const items = itemsForScale(instrument, scale.id);
		let total = 0;
		let answered = 0;
		for (const item of items) {
			const r = responses[item.n];
			if (r === undefined || r === null) continue;
			total += itemValue(instrument, item, r);
			answered++;
		}
		if (answered < items.length) allAnswered = false;
		const raw = instrument.scoring.method === 'mean' ? (answered ? total / answered : 0) : total;
		scales[scale.id] = { raw, answered, of: items.length, ...scaleRange(instrument, scale.id) };
	}
	return { instrument: instrument.id, version: instrument.version, scales, complete: allAnswered };
}

/** Item numbers with no response, in published order. */
export function unanswered(instrument: Instrument, responses: Responses): number[] {
	return instrument.items.filter((it) => responses[it.n] === undefined || responses[it.n] === null).map((it) => it.n);
}
