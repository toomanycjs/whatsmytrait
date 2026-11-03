// Project checks that run before any page ships: `npm run check`.
//
// Today: the wordlist check. The site measures traits, not states, so clinical
// vocabulary must not appear in copy, component names, CSS classes or content
// schemas. The one permitted use is the plain statement that results are not a
// diagnosis, listed in ALLOWED_PHRASES.
//
// Later steps add: orphan pages (every test, trait, career, compare and guide
// page linked from at least two others), a sources and licence box on every
// test page, a licence line per instrument, and spelling.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['src', 'packages/instruments/src', 'packages/instruments/data'];
const EXTENSIONS = /\.(astro|ts|mjs|js|css|md|mdx|json)$/;

const BANNED = [
	'symptom', 'clinical', 'clinician', 'patient', 'diagnos', 'severity', 'screener', 'screening',
	'disorder', 'depress', 'anxiety', 'medical', 'illness', 'treatment', 'therapy',
];
const ALLOWED_PHRASES = ['not a diagnosis', 'never diagnose', 'does not diagnose', 'do not diagnose', 'never diagnoses'];

function walk(dir) {
	let out = [];
	for (const d of readdirSync(dir, { withFileTypes: true })) {
		const p = join(dir, d.name);
		if (d.isDirectory()) out = out.concat(walk(p));
		else if (EXTENSIONS.test(d.name)) out.push(p);
	}
	return out;
}

const problems = [];
for (const root of ROOTS) {
	let files = [];
	try { files = walk(root); } catch { continue; }
	for (const file of files) {
		const lines = readFileSync(file, 'utf8').split(/\r?\n/);
		lines.forEach((line, i) => {
			let text = line.toLowerCase();
			for (const phrase of ALLOWED_PHRASES) text = text.split(phrase).join('');
			for (const word of BANNED) {
				if (text.includes(word)) problems.push(`${file}:${i + 1}: "${word}" in: ${line.trim().slice(0, 100)}`);
			}
		});
	}
}

if (problems.length) {
	console.error(`wordlist check failed (${problems.length}):\n  ${problems.join('\n  ')}`);
	process.exit(1);
}
console.log('wordlist check passed');
