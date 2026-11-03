// Autosave for an attempt in progress: the responses so far and the screen
// the person was on, in localStorage under a key that carries the instrument
// version, so a changed instrument file never resumes an old response set.
// Every access is wrapped in try/catch; without storage the test still runs,
// it just cannot be resumed.

import type { Instrument, Responses } from './instrument';
import type { StorageLike } from './store';

export interface Attempt {
	responses: Responses;
	/** 1-based screen the person was on. */
	screen: number;
	/** Local date-time the attempt was last saved, ISO 8601 without offset. */
	saved: string;
}

export const attemptKey = (instrument: Pick<Instrument, 'id' | 'version'>) => `tests:attempt:${instrument.id}:v${instrument.version}`;

function resolve(storage?: StorageLike | null): StorageLike | null {
	if (storage !== undefined) return storage;
	try {
		return globalThis.localStorage ?? null;
	} catch {
		return null;
	}
}

const pad = (n: number) => String(n).padStart(2, '0');
const localIso = (d = new Date()) =>
	`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

function isValid(instrument: Instrument, x: unknown): x is Attempt {
	if (!x || typeof x !== 'object' || Array.isArray(x)) return false;
	const a = x as Record<string, unknown>;
	if (!Number.isInteger(a.screen) || (a.screen as number) < 1) return false;
	if (typeof a.saved !== 'string') return false;
	if (!a.responses || typeof a.responses !== 'object' || Array.isArray(a.responses)) return false;
	const valid = new Set(instrument.items.map((it) => it.n));
	for (const [k, v] of Object.entries(a.responses as Record<string, unknown>)) {
		const n = Number(k);
		if (!valid.has(n)) return false;
		if (!Number.isInteger(v) || (v as number) < 1 || (v as number) > instrument.response.points) return false;
	}
	return true;
}

/** The saved attempt, or null if there is none or it is unusable. */
export function readAttempt(instrument: Instrument, storage?: StorageLike | null): Attempt | null {
	try {
		const raw = resolve(storage)?.getItem(attemptKey(instrument));
		if (!raw) return null;
		const parsed: unknown = JSON.parse(raw);
		if (!isValid(instrument, parsed)) return null;
		const responses: Responses = {};
		for (const [k, v] of Object.entries(parsed.responses)) responses[Number(k)] = v;
		return { responses, screen: parsed.screen, saved: parsed.saved };
	} catch {
		return null;
	}
}

/** Save after every answer. An attempt with no responses is removed instead, so a fresh render never clobbers progress. */
export function saveAttempt(instrument: Instrument, responses: Responses, screen: number, storage?: StorageLike | null, now = new Date()): boolean {
	try {
		const s = resolve(storage);
		if (!s) return false;
		if (Object.keys(responses).length === 0) {
			s.removeItem(attemptKey(instrument));
			return true;
		}
		s.setItem(attemptKey(instrument), JSON.stringify({ responses, screen, saved: localIso(now) }));
		return true;
	} catch {
		return false;
	}
}

export function clearAttempt(instrument: Pick<Instrument, 'id' | 'version'>, storage?: StorageLike | null): void {
	try {
		resolve(storage)?.removeItem(attemptKey(instrument));
	} catch {
		/* storage unavailable */
	}
}
