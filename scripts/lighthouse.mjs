// Lighthouse on a throttled mobile profile for the home page, a test page
// before and after completion, and a trait page. Accessibility and best
// practices must each be 95 or above; performance must be 80 or above. The
// performance floor was 95 until Google Analytics was added (docs/decisions/
// 0004-analytics.md): the tag's script costs 400 to 600 ms of blocking time
// on the simulated phone, which takes the score to the high 80s, and the
// owner chose to keep the tag. Run `npm run build` first;
// this serves dist/ on port 4324 for the duration.
//
// The completed state is audited through a share link: a results set encoded
// in the URL hash renders the results plate on load with no storage needed,
// so Lighthouse sees the page exactly as a person who has just finished does.
//
// Usage: node scripts/lighthouse.mjs

import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

const PORT = 4324;
const BASE = `http://127.0.0.1:${PORT}`;
const MIN = { performance: 80, accessibility: 95, 'best-practices': 95 };
const RUNS = 3;

function shareHash(tool, version, subscores) {
	const payload = JSON.stringify({ t: tool, e: [[String(version), '2026-11-03T10:00:00', null, subscores, null, 'Lighthouse sample']] });
	return '#r=' + Buffer.from(payload, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const PAGES = [
	{ label: 'home', url: '/' },
	{ label: 'test page, before', url: '/tests/big-five/short/' },
	{ label: 'test page, after completion', url: '/tests/big-five/short/' + shareHash('ipip-50', 1, { E: 38, A: 33, C: 30, S: 28, I: 35 }) },
	{ label: 'trait page', url: '/traits/extraversion/' },
];

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], { shell: true, stdio: 'ignore' });
async function waitForServer() {
	for (let i = 0; i < 60; i++) {
		try { const r = await fetch(`${BASE}/`); if (r.ok) return; } catch { /* not yet */ }
		await new Promise((r) => setTimeout(r, 500));
	}
	throw new Error('preview server did not start');
}

let failed = false;
try {
	await waitForServer();
	const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'], chromePath: chromium.executablePath() });
	const settings = {
		port: chrome.port,
		output: 'json',
		onlyCategories: ['performance', 'accessibility', 'best-practices'],
		formFactor: 'mobile',
		screenEmulation: { mobile: true, width: 375, height: 812, deviceScaleFactor: 2, disabled: false },
		throttlingMethod: 'simulate',
	};
	// One discarded warm-up run, then each page RUNS times; the run with the
	// median performance score is reported. Single local runs vary by ten
	// points or more with whatever else the machine is doing.
	await lighthouse(BASE + '/', settings);
	for (const page of PAGES) {
		const runs = [];
		for (let i = 0; i < RUNS; i++) runs.push(await lighthouse(BASE + page.url, settings));
		runs.sort((a, b) => a.lhr.categories.performance.score - b.lhr.categories.performance.score);
		const result = runs[Math.floor(RUNS / 2)];
		const cats = result.lhr.categories;
		const scores = { performance: Math.round(cats.performance.score * 100), accessibility: Math.round(cats.accessibility.score * 100), 'best-practices': Math.round(cats['best-practices'].score * 100) };
		const ok = Object.entries(scores).every(([k, s]) => s >= MIN[k]);
		if (!ok) failed = true;
		const m = (id) => result.lhr.audits[id]?.displayValue ?? '';
		const all = runs.map((r) => Math.round(r.lhr.categories.performance.score * 100)).join(', ');
		console.log(`${ok ? 'ok  ' : 'FAIL'} ${page.label}: performance ${scores.performance} (median of ${all}), accessibility ${scores.accessibility}, best practices ${scores['best-practices']} (FCP ${m('first-contentful-paint')}, LCP ${m('largest-contentful-paint')}, TBT ${m('total-blocking-time')}, CLS ${m('cumulative-layout-shift')}, SI ${m('speed-index')})`);
		if (!ok) {
			const audits = Object.values(result.lhr.audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative');
			for (const a of audits.slice(0, 12)) console.log(`      ${a.id}: ${a.title} (${Math.round((a.score ?? 0) * 100)})`);
		}
	}
	await chrome.kill();
} finally {
	server.kill();
}
process.exit(failed ? 1 : 0);
