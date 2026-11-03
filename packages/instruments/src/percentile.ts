// Percentiles against a committed norms table. The table holds a count per
// possible raw score for each scale and group; nothing is fitted or smoothed.
//
// A percentile rank is the share of the norm group scoring below the person,
// plus half the share scoring the same, times 100: the usual mid-rank
// definition, so a score in the middle of a symmetric sample is the 50th.

import type { GroupNorms, NormTable, ScaleNorms } from './instrument';

function bin(norms: ScaleNorms, raw: number): number {
	const step = norms.step ?? 1;
	return Math.round((raw - norms.min) / step);
}

export function groupNorms(table: NormTable, group: string): GroupNorms {
	const g = table.groups[group];
	if (!g) throw new RangeError(`no norms group ${group}`);
	return g;
}

export function scaleNorms(table: NormTable, scale: string, group: string): ScaleNorms {
	const s = groupNorms(table, group).scales[scale];
	if (!s) throw new RangeError(`no norms for scale ${scale} in group ${group}`);
	return s;
}

/** Percentile rank, 0 to 100, of a raw score against a group. */
export function percentile(table: NormTable, scale: string, group: string, raw: number): number {
	const norms = scaleNorms(table, scale, group);
	const n = norms.counts.reduce((a, b) => a + b, 0);
	if (n === 0) throw new RangeError(`norms for ${scale}/${group} are empty`);
	const i = bin(norms, raw);
	let below = 0;
	for (let k = 0; k < Math.min(i, norms.counts.length); k++) below += norms.counts[k];
	const at = i >= 0 && i < norms.counts.length ? norms.counts[i] : 0;
	if (i < 0) return 0;
	return ((below + at / 2) / n) * 100;
}

/** The raw score at a given percentile (0 to 100): the smallest score whose cumulative share reaches it. */
export function scoreAtPercentile(table: NormTable, scale: string, group: string, p: number): number {
	const norms = scaleNorms(table, scale, group);
	const n = norms.counts.reduce((a, b) => a + b, 0);
	const step = norms.step ?? 1;
	let cum = 0;
	for (let k = 0; k < norms.counts.length; k++) {
		cum += norms.counts[k];
		if ((cum / n) * 100 >= p) return norms.min + k * step;
	}
	return norms.min + (norms.counts.length - 1) * step;
}

/** The share of the group at each raw score, lowest first, for drawing a density band. */
export function density(table: NormTable, scale: string, group: string): { score: number; share: number }[] {
	const norms = scaleNorms(table, scale, group);
	const n = norms.counts.reduce((a, b) => a + b, 0);
	const step = norms.step ?? 1;
	return norms.counts.map((c, k) => ({ score: norms.min + k * step, share: n ? c / n : 0 }));
}

/** The middle 50% of the group: scores at the 25th and 75th percentiles. */
export function interquartile(table: NormTable, scale: string, group: string): { q1: number; median: number; q3: number } {
	return {
		q1: scoreAtPercentile(table, scale, group, 25),
		median: scoreAtPercentile(table, scale, group, 50),
		q3: scoreAtPercentile(table, scale, group, 75),
	};
}

/** "72nd", for the text equivalent of a strip. */
export function ordinal(n: number): string {
	const r = Math.round(n);
	const mod100 = r % 100;
	const suffix = mod100 >= 11 && mod100 <= 13 ? 'th' : r % 10 === 1 ? 'st' : r % 10 === 2 ? 'nd' : r % 10 === 3 ? 'rd' : 'th';
	return `${r}${suffix}`;
}
