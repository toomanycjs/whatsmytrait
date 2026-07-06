// @ts-check
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MANIFEST = 'indexnow-manifest.json';

/**
 * Submits new and updated pages to IndexNow (Bing, Yandex, and other
 * participating engines) at the end of each production build.
 *
 * Change detection works without any persistent build state: every build
 * writes a manifest of page-URL → HTML-hash into dist, which gets deployed
 * with the site. The next build fetches that manifest from the live site and
 * submits only the URLs whose hash is new or different.
 *
 * Submission only happens on Vercel production builds (VERCEL_ENV=production)
 * or when INDEXNOW_SUBMIT=1 is set; other builds log a dry run.
 *
 * @param {{ key: string }} options - IndexNow key. The key file Bing checks
 *   (/<key>.txt) is generated into dist automatically, so the key in
 *   astro.config.mjs is the single source of truth.
 * @returns {import('astro').AstroIntegration}
 */
export default function indexNow({ key }) {
	/** @type {URL | undefined} */
	let site;

	return {
		name: 'indexnow',
		hooks: {
			'astro:config:done': ({ config }) => {
				if (config.site) site = new URL(config.site);
			},
			'astro:build:done': async ({ dir, logger }) => {
				if (!site) {
					logger.warn('`site` is not set in astro.config; skipping IndexNow');
					return;
				}
				const distDir = fileURLToPath(dir);

				await writeFile(path.join(distDir, `${key}.txt`), key);

				const manifest = {};
				for (const file of await htmlFiles(distDir)) {
					const rel = path.relative(distDir, file).split(path.sep).join('/');
					if (rel === '404.html') continue;
					const urlPath = rel === 'index.html' ? '/' : '/' + rel.replace(/index\.html$/, '');
					const html = await readFile(file);
					manifest[new URL(urlPath, site).href] = createHash('sha256').update(html).digest('hex');
				}

				let previous = {};
				try {
					const res = await fetch(new URL(`/${MANIFEST}`, site), { signal: AbortSignal.timeout(10_000) });
					if (res.ok) {
						previous = await res.json();
					} else {
						logger.warn(`no previous manifest on the live site (HTTP ${res.status}); treating all pages as new`);
					}
				} catch (err) {
					logger.warn(`could not fetch previous manifest (${err.message}); treating all pages as new`);
				}

				await writeFile(path.join(distDir, MANIFEST), JSON.stringify(manifest, null, '\t'));

				const changed = Object.keys(manifest).filter((url) => previous[url] !== manifest[url]);
				if (changed.length === 0) {
					logger.info('no new or updated pages; nothing to submit');
					return;
				}

				const isProduction = process.env.VERCEL_ENV === 'production' || process.env.INDEXNOW_SUBMIT === '1';
				if (!isProduction) {
					logger.info(`dry run (not a production build): ${changed.length} page(s) would be submitted:`);
					for (const url of changed) logger.info(`  ${url}`);
					return;
				}

				try {
					const res = await fetch(ENDPOINT, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json; charset=utf-8' },
						body: JSON.stringify({
							host: site.hostname,
							key,
							keyLocation: new URL(`/${key}.txt`, site).href,
							urlList: changed,
						}),
						signal: AbortSignal.timeout(15_000),
					});
					if (res.ok) {
						logger.info(`submitted ${changed.length} URL(s) to IndexNow (HTTP ${res.status})`);
					} else {
						logger.warn(`IndexNow submission failed: HTTP ${res.status} ${await res.text()}`);
					}
				} catch (err) {
					logger.warn(`IndexNow submission failed: ${err.message}`);
				}
			},
		},
	};
}

/**
 * @param {string} dirPath
 * @param {string[]} out
 * @returns {Promise<string[]>}
 */
async function htmlFiles(dirPath, out = []) {
	for (const entry of await readdir(dirPath, { withFileTypes: true })) {
		const full = path.join(dirPath, entry.name);
		if (entry.isDirectory()) await htmlFiles(full, out);
		else if (entry.name.endsWith('.html')) out.push(full);
	}
	return out;
}
