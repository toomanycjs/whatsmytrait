// Writes src/data/lastmod.json: the date of the last commit that touched each
// page's source file, keyed by URL path. Run `npm run lastmod` and commit the
// result whenever you commit page changes. Vercel only clones part of the git
// history, so the build reads this file rather than asking git itself.
//
// The build prefers dates set in the page (lastModified or updatedDate
// frontmatter, or a tool page's lastReviewed) and only falls back to these.
// See src/lib/lastmod.mjs.

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { sourcePages } from '../src/lib/lastmod.mjs';

const gitDate = (file) =>
	execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim();

const dates = {};
for (const { path, file } of sourcePages()) {
	const date = gitDate(file);
	if (date) dates[path] = date;
}

const sorted = Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync('src/data/lastmod.json', JSON.stringify(sorted, null, '\t') + '\n');
console.log(`lastmod: wrote ${Object.keys(sorted).length} dates to src/data/lastmod.json`);
