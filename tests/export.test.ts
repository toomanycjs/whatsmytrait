import { describe, expect, it } from 'vitest';
import { csvFilename, decodeShare, encodeShare, MAX_SHARE_CHARS, shareUrl, toCsv, toText } from '../src/scripts/results/export';
import type { ResultEntry, ToolConfig } from '../src/scripts/results/types';

const cfg: ToolConfig = {
	id: 'compass-31', version: '2', name: 'COMPASS-31', path: '/tools/compass-31/', decimals: 1,
	subscores: [{ key: 'orthostatic', label: 'Orthostatic intolerance' }, { key: 'gi', label: 'Gastrointestinal' }],
};
const entries: ResultEntry[] = [
	{ id: 'a', tool: 'compass-31', toolVersion: '2', date: '2026-07-02T09:00:00', total: 34, subscores: { orthostatic: 20, gi: 7.5 }, band: null, summary: 'COMPASS-31 34 out of 100' },
	{ id: 'b', tool: 'compass-31', toolVersion: '2', date: '2026-10-05T11:30:00', total: 23.4, subscores: { orthostatic: 12 }, band: 'a "quoted", band', summary: 'COMPASS-31 23.4 out of 100 – ünïcode' },
];

describe('text export', () => {
	it('lists each result on its own line with the source URL', () => {
		expect(toText(cfg, entries)).toBe([
			'COMPASS-31 results', '',
			'2 July 2026: COMPASS-31 34 out of 100',
			'5 October 2026: COMPASS-31 23.4 out of 100 – ünïcode', '',
			'Source: https://www.postviralrecovery.com/tools/compass-31/',
		].join('\n'));
	});
});

describe('CSV export', () => {
	it('has a BOM, CRLF rows, a column per sub-score and escaped cells', () => {
		const csv = toCsv(entries, [cfg]);
		expect(csv.startsWith('﻿')).toBe(true);
		const lines = csv.slice(1).split('\r\n');
		expect(lines[0]).toBe('date,total,Orthostatic intolerance,Gastrointestinal,band,tool_version');
		expect(lines[1]).toBe('2026-07-02 09:00:00,34,20,7.5,,2');
		expect(lines[2]).toBe('2026-10-05 11:30:00,23.4,12,,"a ""quoted"", band",2');
	});
	it('adds a tool column for the all-tools export', () => {
		expect(toCsv(entries, [cfg], true).split('\r\n')[0]).toBe('﻿tool,date,total,Orthostatic intolerance,Gastrointestinal,band,tool_version');
	});
	it('names the file by tool and date', () => {
		expect(csvFilename('compass-31', new Date(2026, 9, 5))).toBe('compass-31-results-2026-10-05.csv');
	});
});

describe('share links', () => {
	it('round-trips through the fragment', () => {
		const url = shareUrl(cfg, entries);
		expect(url.startsWith('https://www.postviralrecovery.com/tools/compass-31/#r=')).toBe(true);
		const decoded = decodeShare(new URL(url).hash, 'compass-31')!;
		expect(decoded.map(({ id, ...rest }) => rest)).toEqual(entries.map(({ id, ...rest }) => rest));
	});
	it('rejects malformed, oversized and other-tool fragments without throwing', () => {
		const good = '#r=' + encodeShare('compass-31', entries);
		expect(decodeShare(good, 'bell-scale')).toBeNull();
		for (const bad of ['', '#', '#r=', '#r=!!!', '#r=abc', '#x=' + good.slice(3), '#r=' + 'A'.repeat(MAX_SHARE_CHARS + 1), '#r=' + btoa('{"t":"compass-31","e":"nope"}')]) {
			expect(decodeShare(bad, 'compass-31')).toBeNull();
		}
	});
	it('drops invalid rows and treats markup as plain data', () => {
		const payload = { t: 'compass-31', e: [['2', '2026-07-02T09:00:00', 10, {}, null, '<img src=x onerror=alert(1)>'], ['2', 'not a date', 5, {}, null, ''], 'junk'] };
		const enc = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
		const decoded = decodeShare('#r=' + enc, 'compass-31')!;
		expect(decoded).toHaveLength(1);
		expect(decoded[0].summary).toBe('<img src=x onerror=alert(1)>');
	});
});
