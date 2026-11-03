import { describe, expect, it } from 'vitest';
import { csvFilename, decodeShare, encodeShare, MAX_SHARE_CHARS, shareUrl, toCsv, toText } from '../src/share';
import type { ResultEntry, ToolConfig } from '../src/types';

const cfg: ToolConfig = {
	id: 'big-five', version: '2', name: 'Big Five', path: '/tests/big-five/', decimals: 1,
	subscores: [{ key: 'extraversion', label: 'Extraversion' }, { key: 'openness', label: 'Openness' }],
};
const entries: ResultEntry[] = [
	{ id: 'a', tool: 'big-five', toolVersion: '2', date: '2026-07-02T09:00:00', total: 34, subscores: { extraversion: 20, openness: 7.5 }, band: null, summary: 'Big Five 34 out of 100' },
	{ id: 'b', tool: 'big-five', toolVersion: '2', date: '2026-10-05T11:30:00', total: 23.4, subscores: { extraversion: 12 }, band: 'a "quoted", band', summary: 'Big Five 23.4 out of 100 – ünïcode' },
];

describe('text export', () => {
	it('lists each result on its own line with the source URL', () => {
		expect(toText(cfg, entries)).toBe([
			'Big Five results', '',
			'2 July 2026: Big Five 34 out of 100',
			'5 October 2026: Big Five 23.4 out of 100 – ünïcode', '',
			'Source: https://personality-tests.example/tests/big-five/',
		].join('\n'));
	});
});

describe('CSV export', () => {
	it('has a BOM, CRLF rows, a column per sub-score and escaped cells', () => {
		const csv = toCsv(entries, [cfg]);
		expect(csv.startsWith('﻿')).toBe(true);
		const lines = csv.slice(1).split('\r\n');
		expect(lines[0]).toBe('date,total,Extraversion,Openness,band,tool_version');
		expect(lines[1]).toBe('2026-07-02 09:00:00,34,20,7.5,,2');
		expect(lines[2]).toBe('2026-10-05 11:30:00,23.4,12,,"a ""quoted"", band",2');
	});
	it('adds a tool column for the all-tools export', () => {
		expect(toCsv(entries, [cfg], true).split('\r\n')[0]).toBe('﻿tool,date,total,Extraversion,Openness,band,tool_version');
	});
	it('names the file by tool and date', () => {
		expect(csvFilename('big-five', new Date(2026, 9, 5))).toBe('big-five-results-2026-10-05.csv');
	});
});

describe('share links', () => {
	it('round-trips through the fragment', () => {
		const url = shareUrl(cfg, entries);
		expect(url.startsWith('https://personality-tests.example/tests/big-five/#r=')).toBe(true);
		const decoded = decodeShare(new URL(url).hash, 'big-five')!;
		expect(decoded.map(({ id, ...rest }) => rest)).toEqual(entries.map(({ id, ...rest }) => rest));
	});
	it('rejects malformed, oversized and other-tool fragments without throwing', () => {
		const good = '#r=' + encodeShare('big-five', entries);
		expect(decodeShare(good, 'self-esteem')).toBeNull();
		for (const bad of ['', '#', '#r=', '#r=!!!', '#r=abc', '#x=' + good.slice(3), '#r=' + 'A'.repeat(MAX_SHARE_CHARS + 1), '#r=' + btoa('{"t":"big-five","e":"nope"}')]) {
			expect(decodeShare(bad, 'big-five')).toBeNull();
		}
	});
	it('drops invalid rows and treats markup as plain data', () => {
		const payload = { t: 'big-five', e: [['2', '2026-07-02T09:00:00', 10, {}, null, '<img src=x onerror=alert(1)>'], ['2', 'not a date', 5, {}, null, ''], 'junk'] };
		const enc = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
		const decoded = decodeShare('#r=' + enc, 'big-five')!;
		expect(decoded).toHaveLength(1);
		expect(decoded[0].summary).toBe('<img src=x onerror=alert(1)>');
	});
});
