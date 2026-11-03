// The IPIP-NEO-120 data file (generated from Johnson's item key spreadsheet)
// against the IPIP key page, https://ipip.ori.org/30FacetNEO-PI-RItems.htm,
// accessed 3 November 2026. The key page lists, per facet, four items in
// order with + or - keying and an alpha. Those are copied here independently
// of the data file, so a mismatch between the spreadsheet and the key page,
// or a typo, fails this test.
import { describe, expect, it } from 'vitest';
import data from '../data/ipip-neo-120.json';
import { loadInstrument } from '../src/load';
import { score } from '../src/score';
import type { Responses } from '../src/instrument';

const instrument = loadInstrument(data);

type Keyed = [string, 1 | -1];
const k = (text: string, sign: '+' | '-'): Keyed => [text, sign === '+' ? 1 : -1];

/** Facet code, name, alpha and the four items with keys, from the key page. */
const KEY: Record<string, { name: string; alpha: number; items: Keyed[] }> = {
	N1: { name: 'Anxiety', alpha: 0.78, items: [k('Worry about things.', '+'), k('Fear for the worst.', '+'), k('Am afraid of many things.', '+'), k('Get stressed out easily.', '+')] },
	N2: { name: 'Anger', alpha: 0.87, items: [k('Get angry easily.', '+'), k('Get irritated easily.', '+'), k('Lose my temper.', '+'), k('Am not easily annoyed.', '-')] },
	N3: { name: 'Depression', alpha: 0.85, items: [k('Often feel blue.', '+'), k('Dislike myself.', '+'), k('Am often down in the dumps.', '+'), k('Feel comfortable with myself.', '-')] },
	N4: { name: 'Self-Consciousness', alpha: 0.70, items: [k('Find it difficult to approach others.', '+'), k('Am afraid to draw attention to myself.', '+'), k('Only feel comfortable with friends.', '+'), k('Am not bothered by difficult social situations.', '-')] },
	N5: { name: 'Immoderation', alpha: 0.69, items: [k('Go on binges.', '+'), k('Rarely overindulge.', '-'), k('Easily resist temptations.', '-'), k('Am able to control my cravings.', '-')] },
	N6: { name: 'Vulnerability', alpha: 0.76, items: [k('Panic easily.', '+'), k('Become overwhelmed by events.', '+'), k("Feel that I'm unable to deal with things.", '+'), k('Remain calm under pressure.', '-')] },
	E1: { name: 'Friendliness', alpha: 0.81, items: [k('Make friends easily.', '+'), k('Feel comfortable around people.', '+'), k('Avoid contacts with others.', '-'), k('Keep others at a distance.', '-')] },
	E2: { name: 'Gregariousness', alpha: 0.79, items: [k('Love large parties.', '+'), k('Talk to a lot of different people at parties.', '+'), k('Prefer to be alone.', '-'), k('Avoid crowds.', '-')] },
	E3: { name: 'Assertiveness', alpha: 0.85, items: [k('Take charge.', '+'), k('Try to lead others.', '+'), k('Take control of things.', '+'), k('Wait for others to lead the way.', '-')] },
	E4: { name: 'Activity Level', alpha: 0.69, items: [k('Am always busy.', '+'), k('Am always on the go.', '+'), k('Do a lot in my spare time.', '+'), k('Like to take it easy.', '-')] },
	E5: { name: 'Excitement-Seeking', alpha: 0.73, items: [k('Love excitement.', '+'), k('Seek adventure.', '+'), k('Enjoy being reckless.', '+'), k('Act wild and crazy.', '+')] },
	E6: { name: 'Cheerfulness', alpha: 0.79, items: [k('Radiate joy.', '+'), k('Have a lot of fun.', '+'), k('Love life.', '+'), k('Look at the bright side of life.', '+')] },
	O1: { name: 'Imagination', alpha: 0.74, items: [k('Have a vivid imagination.', '+'), k('Enjoy wild flights of fantasy.', '+'), k('Love to daydream.', '+'), k('Like to get lost in thought.', '+')] },
	O2: { name: 'Artistic Interests', alpha: 0.74, items: [k('Believe in the importance of art.', '+'), k('See beauty in things that others might not notice.', '+'), k('Do not like poetry.', '-'), k('Do not enjoy going to art museums.', '-')] },
	O3: { name: 'Emotionality', alpha: 0.65, items: [k('Experience my emotions intensely.', '+'), k("Feel others' emotions.", '+'), k('Rarely notice my emotional reactions.', '-'), k("Don't understand people who get emotional.", '-')] },
	O4: { name: 'Adventurousness', alpha: 0.70, items: [k('Prefer variety to routine.', '+'), k('Prefer to stick with things that I know.', '-'), k('Dislike changes.', '-'), k('Am attached to conventional ways.', '-')] },
	O5: { name: 'Intellect', alpha: 0.73, items: [k('Love to read challenging material.', '+'), k('Avoid philosophical discussions.', '-'), k('Have difficulty understanding abstract ideas.', '-'), k('Am not interested in theoretical discussions.', '-')] },
	O6: { name: 'Liberalism', alpha: 0.63, items: [k('Tend to vote for liberal political candidates.', '+'), k('Believe that there is no absolute right and wrong.', '+'), k('Tend to vote for conservative political candidates.', '-'), k('Believe that we should be tough on crime.', '-')] },
	A1: { name: 'Trust', alpha: 0.85, items: [k('Trust others.', '+'), k('Believe that others have good intentions.', '+'), k('Trust what people say.', '+'), k('Distrust people.', '-')] },
	A2: { name: 'Morality', alpha: 0.74, items: [k('Use others for my own ends.', '-'), k('Cheat to get ahead.', '-'), k('Take advantage of others.', '-'), k("Obstruct others' plans.", '-')] },
	A3: { name: 'Altruism', alpha: 0.73, items: [k('Am concerned about others.', '+'), k('Love to help others.', '+'), k('Am indifferent to the feelings of others.', '-'), k('Take no time for others.', '-')] },
	A4: { name: 'Cooperation', alpha: 0.71, items: [k('Love a good fight.', '-'), k('Yell at people.', '-'), k('Insult people.', '-'), k('Get back at others.', '-')] },
	A5: { name: 'Modesty', alpha: 0.73, items: [k('Believe that I am better than others.', '-'), k('Think highly of myself.', '-'), k('Have a high opinion of myself.', '-'), k('Boast about my virtues.', '-')] },
	A6: { name: 'Sympathy', alpha: 0.72, items: [k('Sympathize with the homeless.', '+'), k('Feel sympathy for those who are worse off than myself.', '+'), k("Am not interested in other people's problems.", '-'), k('Try not to think about the needy.', '-')] },
	C1: { name: 'Self-Efficacy', alpha: 0.77, items: [k('Complete tasks successfully.', '+'), k('Excel in what I do.', '+'), k('Handle tasks smoothly.', '+'), k('Know how to get things done.', '+')] },
	C2: { name: 'Orderliness', alpha: 0.83, items: [k('Like to tidy up.', '+'), k('Often forget to put things back in their proper place.', '-'), k('Leave a mess in my room.', '-'), k('Leave my belongings around.', '-')] },
	C3: { name: 'Dutifulness', alpha: 0.67, items: [k('Keep my promises.', '+'), k('Tell the truth.', '+'), k('Break rules.', '-'), k('Break my promises.', '-')] },
	C4: { name: 'Achievement-Striving', alpha: 0.79, items: [k("Do more than what's expected of me.", '+'), k('Work hard.', '+'), k('Put little time and effort into my work.', '-'), k('Do just enough work to get by.', '-')] },
	C5: { name: 'Self-Discipline', alpha: 0.71, items: [k('Am always prepared.', '+'), k('Carry out my plans.', '+'), k('Waste my time.', '-'), k('Have difficulty starting tasks.', '-')] },
	C6: { name: 'Cautiousness', alpha: 0.88, items: [k('Jump into things without thinking.', '-'), k('Make rash decisions.', '-'), k('Rush into things.', '-'), k('Act without thinking.', '-')] },
};

describe('IPIP-NEO-120 data file against the key page', () => {
	it('has 120 items numbered 1 to 120 and 30 facets under 5 domains', () => {
		expect(instrument.items.map((it) => it.n)).toEqual(Array.from({ length: 120 }, (_, i) => i + 1));
		const facets = instrument.scales.filter((s) => s.parent);
		const domains = instrument.scales.filter((s) => s.facets);
		expect(facets).toHaveLength(30);
		expect(domains.map((d) => d.id)).toEqual(['N', 'E', 'O', 'A', 'C']);
		for (const d of domains) expect(d.facets).toEqual([1, 2, 3, 4, 5, 6].map((i) => `${d.id}${i}`));
	});

	it('names each facet as the key page does', () => {
		for (const [code, f] of Object.entries(KEY)) {
			expect([code, instrument.scales.find((s) => s.id === code)?.name]).toEqual([code, f.name]);
		}
	});

	it('has exactly the four items the key page lists for each facet, with the same keys', () => {
		for (const [code, f] of Object.entries(KEY)) {
			const items = instrument.items.filter((it) => it.scale === code);
			expect(items).toHaveLength(4);
			const fromFile = new Map(items.map((it) => [it.text, it.key]));
			for (const [text, key] of f.items) {
				expect([code, text, fromFile.get(text)]).toEqual([code, text, key]);
			}
		}
	});

	it('reverse-keys 55 items, per domain 7, 6, 12, 17 and 13', () => {
		const neg = (d: string) => instrument.items.filter((it) => it.scale.startsWith(d) && it.key === -1).length;
		expect(['N', 'E', 'O', 'A', 'C'].map(neg)).toEqual([7, 6, 12, 17, 13]);
		expect(instrument.items.filter((it) => it.key === -1)).toHaveLength(55);
	});

	it('cycles facets through the domains in administration order: N1, E1, O1, A1, C1, N2, ...', () => {
		for (const it of instrument.items) {
			const expected = `${['N', 'E', 'O', 'A', 'C'][(it.n - 1) % 5]}${Math.floor((it.n - 1) / 5) % 6 + 1}`;
			expect([it.n, it.scale]).toEqual([it.n, expected]);
		}
	});

	it('carries the facet alphas from the key page and names their source', () => {
		for (const [code, f] of Object.entries(KEY)) expect([code, instrument.reliability?.[code]]).toEqual([code, f.alpha]);
		expect(instrument.reliability?.N).toBeUndefined();
		expect(instrument.reliabilitySource).toContain('30FacetNEO-PI-RItems');
		expect(instrument.norms?.file).toBe('norms/ipip-neo-120.json');
	});
});

describe('IPIP-NEO-120 scoring', () => {
	const all = (v: number): Responses => Object.fromEntries(instrument.items.map((it) => [it.n, v]));

	it('scores facets 4 to 20 and domains 24 to 120', () => {
		const r = score(instrument, all(3));
		expect([r.scales.N1.min, r.scales.N1.max, r.scales.N1.raw]).toEqual([4, 20, 12]);
		expect([r.scales.N.min, r.scales.N.max, r.scales.N.raw]).toEqual([24, 120, 72]);
		expect(r.complete).toBe(true);
	});

	it('scores all Very Accurate as 5 per +keyed and 1 per -keyed item', () => {
		const r = score(instrument, all(5));
		expect(r.scales.N5.raw).toBe(5 + 1 + 1 + 1);
		expect(r.scales.C6.raw).toBe(4);
		expect(r.scales.E5.raw).toBe(20);
		expect(r.scales.A.raw).toBe(7 * 5 + 17 * 1);
	});
});
