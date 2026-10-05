// DSQ-2 case-definition scoring, following DePaul's official rules: Jason LA,
// Sunnquist M. The development of the DePaul Symptom Questionnaire. Front
// Pediatr 2018;6:330, Supplementary Data Sheet 2 ("Case definition scoring
// rules" and "SPSS Case Definition Syntax"). Question numbers below are DSQ-2
// question numbers.
//
// One deliberate difference from the published SPSS syntax: its ME-ICC
// temperature-intolerance line assigns to a misspelt variable (MEIC_Temp), so
// the syntax as printed never credits that domain. The written rules include
// it, and so does this code.

import { FACTOR_DOMAINS } from './dsq-2.items';

export interface DsqAnswers {
	/** Frequency and severity (0-4) per symptom question number. */
	freq: Record<number, number>;
	sev: Record<number, number>;
	/** Official codes for the non-symptom questions (q63a, q92, q93, q94, q106, q127, q128, q129). */
	codes: Record<string, number>;
	/** Hours per week for q119a and q119d. */
	hours: { q119a: number; q119d: number };
	/** RAND-36 items 13-16, 20, 23, 27, 29, 31, 32: 1-based response position. */
	rand: Record<number, number>;
}

export interface Criterion {
	label: string;
	met: boolean;
}

export interface CaseDefinition {
	key: 'fukuda' | 'ccc' | 'meicc' | 'iom';
	name: string;
	met: boolean;
	criteria: Criterion[];
}

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// ── SF-36 subscales via RAND scoring ──

const RECODE: Record<number, Record<number, number>> = {
	// Role physical 13-16: yes 0, no 100.
	13: { 1: 0, 2: 100 }, 14: { 1: 0, 2: 100 }, 15: { 1: 0, 2: 100 }, 16: { 1: 0, 2: 100 },
	// Social functioning: 20 not at all 100 ... extremely 0; 32 all of the time 0 ... none 100.
	20: { 1: 100, 2: 75, 3: 50, 4: 25, 5: 0 },
	32: { 1: 0, 2: 25, 3: 50, 4: 75, 5: 100 },
	// Vitality: 23 and 27 all of the time 100 ... none 0; 29 and 31 reversed.
	23: { 1: 100, 2: 80, 3: 60, 4: 40, 5: 20, 6: 0 },
	27: { 1: 100, 2: 80, 3: 60, 4: 40, 5: 20, 6: 0 },
	29: { 1: 0, 2: 20, 3: 40, 4: 60, 5: 80, 6: 100 },
	31: { 1: 0, 2: 20, 3: 40, 4: 60, 5: 80, 6: 100 },
};

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

export function sf36Subscales(rand: Record<number, number>) {
	const score = (items: number[]) => mean(items.map(n => RECODE[n][rand[n]]));
	return {
		rolePhysical: score([13, 14, 15, 16]),
		socialFunctioning: score([20, 32]),
		vitality: score([23, 27, 29, 31]),
	};
}

// ── Helpers ──

export function scoreCaseDefinitions(a: DsqAnswers): CaseDefinition[] {
	const at = (n: number, min: number) => (a.freq[n] ?? 0) >= min && (a.sev[n] ?? 0) >= min;
	const any = (items: number[], min = 2) => items.some(n => at(n, min));
	const count = (items: number[], min = 2) => items.filter(n => at(n, min)).length;
	const code = (id: string) => a.codes[id];

	// Shared non-symptom rules (Fukuda, CCC, IOM).
	const sf = sf36Subscales(a.rand);
	const reduction = [sf.rolePhysical <= 50, sf.socialFunctioning <= 62.5, sf.vitality <= 35].filter(Boolean).length >= 2;
	const sixMonths = [2, 3, 4, 5].includes(code('q94'));
	const lifelong = code('q92') === 1 && code('q94') === 5 && code('q106') === 7;
	const exertion = a.hours.q119a + a.hours.q119d >= 60;
	const fatigueRules = sixMonths && !lifelong && !exertion;

	const reductionLabel = 'Substantial reduction in functioning (2 of 3 SF-36 cut-offs)';
	const fatigueLabel = 'Fatigue for 6 months or more, not lifelong, not explained by heavy activity';
	const pemItems = [...range(14, 18), 75, 76, 77];

	// Fukuda 1994: minor symptoms count at frequency and severity of 1 or more.
	const headacheNew = code('q93') === 1;
	const fukudaDomains = [
		any([36, 37, 38, 39, 44, 45], 1),
		at(19, 1),
		at(26, 1),
		at(65, 1),
		at(25, 1),
		any(pemItems, 1),
		at(31, 1) && headacheNew,
		at(64, 1),
	].filter(Boolean).length;
	const fukuda: Criterion[] = [
		{ label: reductionLabel, met: reduction },
		{ label: fatigueLabel, met: fatigueRules },
		{ label: `At least 4 of 8 symptom groups (you had ${fukudaDomains})`, met: fukudaDomains >= 4 },
	];

	// Canadian Consensus Criteria 2003.
	const cccPain = any([25, 26, 27, 28, 29, 30, 82, 83]) || (at(31, 2) && headacheNew);
	const cccNeuro = count([...range(32, 45), 78, 85, 86]);
	const cccAreas = [
		any([...range(46, 52), 69, 70, 71, 88, 89, 90]),
		any([...range(53, 63), 73, 91]) || code('q63a') === 1,
		any(range(64, 68)),
	].filter(Boolean).length;
	const ccc: Criterion[] = [
		{ label: reductionLabel, met: reduction },
		{ label: `${fatigueLabel}, at least half the time and at least moderate`, met: fatigueRules && at(13, 2) },
		{ label: 'Post-exertional malaise', met: any(pemItems) },
		{ label: 'Sleep problems', met: any([...range(19, 24), 84]) },
		{ label: 'Pain', met: cccPain },
		{ label: `At least 2 neurological or cognitive symptoms (you had ${cccNeuro})`, met: cccNeuro >= 2 },
		{ label: `Symptoms in at least 2 of the autonomic, neuroendocrine and immune areas (you had ${cccAreas})`, met: cccAreas >= 2 },
	];

	// ME International Consensus Criteria 2011.
	const neuro = [
		any([...range(36, 45), 78, 79, 80]),
		any([25, 26, 27, 28, 31, 81, 82, 83]),
		any([...range(19, 24), 84]),
		any([32, 33, 34, 35, 49, 85, 86]),
	].filter(Boolean).length;
	const igg = [
		any([64, 65, 66, 67, 87]),
		any([29, 30, 47, 48]),
		any([46, 88, 89]),
		at(63, 2) || code('q63a') === 1 || at(68, 2),
		at(74, 2) || code('q128') === 1,
	].filter(Boolean).length;
	const energy = [
		any([51, 52, 69, 70, 71, 90]),
		at(50, 2),
		any([...range(56, 62), 91]),
		at(73, 2) || code('q129') === 1,
	].filter(Boolean).length;
	const meicc: Criterion[] = [
		{ label: 'A 50% or greater reduction in activity level', met: code('q127') === 1 },
		{ label: 'Post-exertional neuroimmune exhaustion', met: any(pemItems) },
		{ label: `Neurological symptoms in at least 3 of 4 groups (you had ${neuro})`, met: neuro >= 3 },
		{ label: `Immune, gut or bladder symptoms in at least 3 of 5 groups (you had ${igg})`, met: igg >= 3 },
		{ label: 'At least 1 energy production or transport symptom', met: energy >= 1 },
	];

	// IOM / NAM 2015.
	const iom: Criterion[] = [
		{ label: reductionLabel, met: reduction },
		{ label: fatigueLabel, met: fatigueRules },
		{ label: 'Post-exertional malaise', met: any(pemItems) },
		{ label: 'Unrefreshing sleep', met: any([19, 20, 21, 22, 24]) },
		{ label: 'Cognitive impairment or orthostatic intolerance', met: any([...range(36, 40), 42, 44, 45, 78]) || any([...range(49, 52), 69, 70, 71, 90]) },
	];

	const def = (key: CaseDefinition['key'], name: string, criteria: Criterion[]): CaseDefinition =>
		({ key, name, criteria, met: criteria.every(c => c.met) });

	return [
		def('iom', 'IOM / NAM (2015)', iom),
		def('ccc', 'Canadian Consensus Criteria (2003)', ccc),
		def('meicc', 'ME International Consensus Criteria (2011)', meicc),
		def('fukuda', 'Fukuda (1994)', fukuda),
	];
}

/** Per-item composite, 0-100: ((frequency + severity) / 2) x 25 (Bedree et al. 2019). */
export const composite = (f: number, s: number) => ((f + s) / 2) * 25;

/**
 * This site's domain summary: the mean composite of the items in each of the
 * eight Bedree 2019 factors, plus how many met the 2/2 threshold. Not an
 * official DSQ-2 score.
 */
export function domainScores(a: DsqAnswers) {
	return FACTOR_DOMAINS.map(d => ({
		key: d.key,
		name: d.name,
		avg: mean(d.items.map(n => composite(a.freq[n] ?? 0, a.sev[n] ?? 0))),
		met: d.items.filter(n => (a.freq[n] ?? 0) >= 2 && (a.sev[n] ?? 0) >= 2).length,
		total: d.items.length,
	}));
}
