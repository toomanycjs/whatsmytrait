// Layer 1 interpretation: the one to three sentences shown with a result.
// Each tool supplies only its config (bands, sub-score maxima, MIC).

import { changeText, findBand, formatDate, formatTotal, roundedDiff } from './format';
import type { ResultEntry, ScoreResult, ToolConfig } from './types';

const listJoin = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

/** The one or two domains that contributed most (or, for higher-better scales, scored lowest). */
export function topDomains(cfg: ToolConfig, subscores: Record<string, number>, n = 2): string[] {
	const better = cfg.direction === 'higher-better';
	return cfg.subscores
		.filter(s => s.max && subscores[s.key] !== undefined)
		.map(s => ({ label: s.label, rel: subscores[s.key] / s.max! }))
		.filter(s => (better ? s.rel < 1 : s.rel > 0))
		.sort((a, b) => (better ? a.rel - b.rel : b.rel - a.rel))
		.slice(0, n)
		.map(s => s.label.toLowerCase());
}

export function interpretResult(cfg: ToolConfig, r: ScoreResult, previous?: ResultEntry | null): string {
	const parts: string[] = [];

	const band = findBand(cfg, r.total);
	if (band && r.total !== null) {
		const t = formatTotal(cfg, r.total);
		parts.push(cfg.bandSentence ? cfg.bandSentence(t, band) : `A ${cfg.name} total of ${t} is in the ${band.label} range.`);
	}

	const top = topDomains(cfg, r.subscores);
	if (top.length) {
		parts.push(cfg.direction === 'higher-better'
			? `Your lowest ${top.length === 1 ? 'domain was' : 'domains were'} ${listJoin(top)}.`
			: `The largest ${top.length === 1 ? 'contribution came' : 'contributions came'} from ${listJoin(top)}.`);
	}

	if (cfg.mic && previous && previous.total !== null && r.total !== null) {
		const diff = roundedDiff(cfg, previous.total, r.total);
		const since = `Since your last result on ${formatDate(previous.date)}`;
		if (diff === 0) {
			parts.push(`${since} your total is unchanged.`);
		} else {
			const relation = Math.abs(diff) > cfg.mic.value ? 'larger' : 'not larger';
			parts.push(`${since} your total is ${changeText(cfg, diff)}, which is ${relation} than the published minimal important change of ${cfg.mic.value} points.`);
		}
	}

	return parts.join(' ');
}
