import { describe, expect, it } from 'vitest';
import type { NormTable } from '../src/instrument';
import { geometry, strip, stripText } from '../src/strip';

// Ten people on scale E (10 to 50 collapsed to a few bins for the test).
const table: NormTable = {
	instrument: 'demo',
	version: 1,
	source: { name: 'made up', url: 'https://example.org', inputSha256: 'x', generated: '2026-11-03', script: 'none' },
	groups: { all: { label: 'Everyone', n: 10, scales: { E: { min: 1, counts: [1, 2, 4, 2, 1] } } } },
};
const base = { name: 'Extraversion', min: 1, max: 5, norms: table, scale: 'E', group: 'all' };

describe('strip geometry and text', () => {
	it('places the marker by raw score and labels it with the percentile', () => {
		const g = geometry({ ...base, raw: 3 });
		expect(g).toEqual({ percentile: 50, left: 50, labelRight: true });
		expect(stripText({ ...base, raw: 3 })).toBe('You scored 3 out of 5, the 50th percentile for extraversion.');
	});

	it('moves the label to the left near the right edge', () => {
		expect(geometry({ ...base, raw: 5 }).labelRight).toBe(false);
		expect(geometry({ ...base, raw: 4 }).labelRight).toBe(true);
	});

	it('describes a population strip and a strip without norms', () => {
		expect(stripText({ name: 'Extraversion', min: 1, max: 5, norms: table, scale: 'E', group: 'all' })).toBe('The spread of extraversion scores in the norm sample, from 1 to 5.');
		expect(stripText({ name: 'Patience', min: 10, max: 50, raw: 32 })).toBe('You scored 32 out of 50 for patience. No published norms exist for this scale, so there is no percentile.');
	});
});

describe('strip markup', () => {
	it('holds only the band in the SVG and the marker and label as positioned HTML', () => {
		const html = strip({ ...base, raw: 3, hue: 'var(--hue-extraversion)' });
		expect(html).toContain('<figure class="strip strip-domain">');
		expect(html).toContain('aria-label="You scored 3 out of 5, the 50th percentile for extraversion."');
		expect(html).toContain('<path class="density"');
		expect(html).toContain('class="iqr" clip-path="url(#clip-e-all)"');
		expect(html).toContain('fill="var(--hue-extraversion)"');
		expect(html).toContain('<span class="marker" style="left:50.00%"></span>');
		expect(html).toContain('<span class="pct" style="left:50.00%">50th</span>');
		expect(html).toContain('<div class="strip-axis"><span>1</span><span>5</span></div>');
		expect(html).not.toContain('<text');
	});

	it('draws a second marker as an outline and omits the hue on facets', () => {
		const html = strip({ ...base, raw: 3, second: 4, size: 'facet', hue: 'red' });
		expect(html).toContain('strip-facet');
		expect(html).toContain('<span class="marker marker-outline" style="left:75.00%"></span>');
		expect(html).not.toContain('fill="red"');
	});

	it('draws no density, marker or label when there are no norms or no score', () => {
		const none = strip({ name: 'Patience', min: 10, max: 50, raw: 32 });
		expect(none).toContain('strip-no-norms');
		expect(none).not.toContain('density');
		expect(none).toContain('class="marker"');
		expect(none).not.toContain('class="pct');
		const population = strip({ ...base });
		expect(population).toContain('density');
		expect(population).not.toContain('class="marker"');
	});

	it('escapes names', () => {
		expect(strip({ ...base, name: 'A & <B>', raw: 2 })).toContain('<span class="strip-name">A &amp; &lt;B&gt;</span>');
	});
});
