// Accessibility audit of every built page with axe-core, through Playwright's
// Chromium. Run `npm run build` first; serves dist/ on port 4325 for the
// duration. Fails on any violation of the WCAG 2.1 A and AA rules.
//
// Usage: node scripts/a11y.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { serve } from './lib/serve.mjs';
import { chromium } from '@playwright/test';

const PORT = 4325;
const BASE = `http://127.0.0.1:${PORT}`;
const axeSource = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

function pages(dir = 'dist', out = []) {
	for (const d of readdirSync(dir, { withFileTypes: true })) {
		const p = join(dir, d.name);
		if (d.isDirectory()) pages(p, out);
		else if (d.name === 'index.html') out.push('/' + p.slice('dist'.length).replace(/\\/g, '/').replace(/^\/|index\.html$/g, ''));
	}
	return out;
}

let total = 0;
const { stop } = await serve(PORT);
try {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	for (const path of pages()) {
		await page.goto(BASE + path);
		await page.addScriptTag({ content: axeSource });
		const results = await page.evaluate(async () => await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }));
		if (results.violations.length) {
			total += results.violations.length;
			console.log(`FAIL ${path}`);
			for (const v of results.violations) console.log(`      ${v.id} (${v.impact}): ${v.help}; ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target?.[0]}`);
		} else {
			console.log(`ok   ${path}`);
		}
	}
	await browser.close();
} finally {
	stop();
}
process.exit(total ? 1 : 0);
