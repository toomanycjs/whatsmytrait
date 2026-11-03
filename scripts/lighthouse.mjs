// Lighthouse on a throttled mobile profile for the home page, a test page
// before and after completion, and a trait page. Performance, accessibility
// and best practices must each be 95 or above. Run `npm run build` first;
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
const MIN = 95;

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
	for (const page of PAGES) {
		const result = await lighthouse(BASE + page.url, {
			port: chrome.port,
			output: 'json',
			onlyCategories: ['performance', 'accessibility', 'best-practices'],
			formFactor: 'mobile',
			screenEmulation: { mobile: true, width: 375, height: 812, deviceScaleFactor: 2, disabled: false },
			throttlingMethod: 'simulate',
		});
		const cats = result.lhr.categories;
		const scores = { performance: Math.round(cats.performance.score * 100), accessibility: Math.round(cats.accessibility.score * 100), 'best-practices': Math.round(cats['best-practices'].score * 100) };
		const ok = Object.values(scores).every((s) => s >= MIN);
		if (!ok) failed = true;
		const m = (id) => result.lhr.audits[id]?.displayValue ?? '';
		console.log(`${ok ? 'ok  ' : 'FAIL'} ${page.label}: performance ${scores.performance}, accessibility ${scores.accessibility}, best practices ${scores['best-practices']} (FCP ${m('first-contentful-paint')}, LCP ${m('largest-contentful-paint')}, TBT ${m('total-blocking-time')}, CLS ${m('cumulative-layout-shift')}, SI ${m('speed-index')})`);
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
