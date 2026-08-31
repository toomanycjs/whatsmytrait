// Shared client-side storage for the exercise tools:
// /tools/exercise-readiness/, /tools/pacing-and-heart-rate/, /tools/exercise-progression/
//
// Everything lives in localStorage on the user's device. Nothing is sent anywhere.

export const STORE_KEY = 'pvr-exercise-v1';
export const DSQ_PEM_KEY = 'pvr-dsq-pem-result';

export type ScreenOutcome = 'redflag' | 'pem-positive' | 'pem-negative';

export interface ScreenResult {
	completedAt: string; // ISO datetime
	outcome: ScreenOutcome;
	pemSource: 'dsq-pem' | 'self-yes' | 'self-no' | 'self-unsure' | 'none';
	heds: boolean;
	mcas: boolean;
}

export interface FollowUp {
	due: string; // YYYY-MM-DD
	completedAt?: string;
	verdict?: 'better' | 'same' | 'worse';
	score?: number; // 0-10 symptom impact at the 48h check
	note?: string;
}

export interface Session {
	id: string;
	date: string; // YYYY-MM-DD
	context: 'pacing' | 'progression';
	tier?: number;
	activity: string;
	minutes?: number;
	feltAfter: number; // 0-10 symptom impact on the day, higher is worse
	notes?: string;
	followUp: FollowUp;
}

export interface Decision {
	date: string;
	action: 'start' | 'advance' | 'repeat' | 'stepback';
	fromTier: number | null;
	toTier: number;
}

export interface Store {
	v: 1;
	screen?: ScreenResult;
	prefs: {
		rhr?: number;
		hrMeds?: boolean;
		warmup?: number;
		work?: number;
		cooldown?: number;
		ceiling?: number;
		perWeek?: number;
	};
	sessions: Session[];
	progression: {
		tier: number | null;
		weekStarted?: string; // YYYY-MM-DD
		decisions: Decision[];
		stepbackAck?: string; // ISO datetime of last acknowledged step-back notice
	};
}

const EMPTY: Store = { v: 1, prefs: {}, sessions: [], progression: { tier: null, decisions: [] } };

export function loadStore(): Store {
	try {
		const raw = localStorage.getItem(STORE_KEY);
		if (!raw) return structuredClone(EMPTY);
		const parsed = JSON.parse(raw);
		if (!parsed || parsed.v !== 1) return structuredClone(EMPTY);
		return { ...structuredClone(EMPTY), ...parsed, prefs: { ...parsed.prefs }, progression: { ...EMPTY.progression, ...parsed.progression } };
	} catch {
		return structuredClone(EMPTY);
	}
}

export function saveStore(store: Store): boolean {
	try {
		localStorage.setItem(STORE_KEY, JSON.stringify(store));
		return true;
	} catch {
		return false;
	}
}

export function clearStore(): void {
	try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
}

export function readDsqPemResult(): { date: string; pemIndicated: boolean } | null {
	try {
		const raw = localStorage.getItem(DSQ_PEM_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed?.pemIndicated !== 'boolean' || typeof parsed?.date !== 'string') return null;
		return parsed;
	} catch {
		return null;
	}
}

// ── Dates ─────────────────────────────────────────────────────────────────────

export function todayISO(): string {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function addDays(dateISO: string, days: number): string {
	const d = new Date(dateISO + 'T12:00:00');
	d.setDate(d.getDate() + days);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function daysBetween(fromISO: string, toISO: string): number {
	return Math.round((new Date(toISO + 'T12:00:00').getTime() - new Date(fromISO + 'T12:00:00').getTime()) / 86400000);
}

export function fmtDate(dateISO: string, withWeekday = false): string {
	const d = new Date(dateISO + 'T12:00:00');
	return d.toLocaleDateString('en-GB', withWeekday
		? { weekday: 'long', day: 'numeric', month: 'long' }
		: { day: 'numeric', month: 'short', year: 'numeric' });
}

export function screenAgeDays(store: Store): number | null {
	if (!store.screen) return null;
	return daysBetween(store.screen.completedAt.slice(0, 10), todayISO());
}

// ── Sessions and follow-ups ───────────────────────────────────────────────────

export function newId(): string {
	try { return crypto.randomUUID(); } catch { return `s${Date.now()}${Math.floor(Math.random() * 1e6)}`; }
}

export function addSession(store: Store, s: Omit<Session, 'id' | 'followUp'>): Session {
	const session: Session = { ...s, id: newId(), followUp: { due: addDays(s.date, 2) } };
	store.sessions.push(session);
	store.sessions.sort((a, b) => a.date.localeCompare(b.date));
	return session;
}

export function dueFollowUps(store: Store): Session[] {
	const today = todayISO();
	return store.sessions.filter(s => !s.followUp.completedAt && s.followUp.due <= today);
}

export function sessionScore(s: Session): number {
	return s.followUp.score ?? s.feltAfter;
}

// Average symptom score in 7-day buckets counting back from today.
// bucket 0 = the last 7 days, bucket 1 = the 7 days before that, and so on.
export function weeklyAverages(store: Store, buckets: number): { count: number; avg: number | null }[] {
	const today = todayISO();
	const out: { count: number; avg: number | null }[] = [];
	for (let b = 0; b < buckets; b++) {
		const end = addDays(today, -7 * b);
		const start = addDays(today, -7 * (b + 1) + 1);
		const inBucket = store.sessions.filter(s => s.date >= start && s.date <= end);
		out.push(inBucket.length
			? { count: inBucket.length, avg: inBucket.reduce((sum, s) => sum + sessionScore(s), 0) / inBucket.length }
			: { count: 0, avg: null });
	}
	return out;
}

// Two consecutive weeks of rising logged symptoms, with at least two sessions
// in each week so a single bad day cannot fire it.
export function risingTwoWeeks(store: Store): boolean {
	const [w0, w1, w2] = weeklyAverages(store, 3);
	if (w0.count < 2 || w1.count < 2 || w2.count < 2) return false;
	return (w0.avg as number) > (w1.avg as number) && (w1.avg as number) > (w2.avg as number);
}

// ── Progression week logic ────────────────────────────────────────────────────

export interface AdvanceCheck {
	eligible: boolean;
	weekDays: number;
	sessionsThisWeek: number;
	target: number;
	checksOutstanding: number;
	anyWorse: boolean;
	reasons: string[];
}

export function advanceCheck(store: Store): AdvanceCheck {
	const target = store.prefs.perWeek || 3;
	const started = store.progression.weekStarted;
	const reasons: string[] = [];
	if (!started) {
		return { eligible: false, weekDays: 0, sessionsThisWeek: 0, target, checksOutstanding: 0, anyWorse: false, reasons: ['No week in progress yet. Pick a tier to start one.'] };
	}
	const weekDays = daysBetween(started, todayISO());
	const weekSessions = store.sessions.filter(s => s.context === 'progression' && s.date >= started);
	const outstanding = weekSessions.filter(s => !s.followUp.completedAt);
	const worse = weekSessions.filter(s => s.followUp.verdict === 'worse');

	if (weekDays < 6) reasons.push(`This week started ${weekDays === 0 ? 'today' : `${weekDays} day${weekDays === 1 ? '' : 's'} ago`}. A full week is 7 days.`);
	if (weekSessions.length < target) reasons.push(`${weekSessions.length} of ${target} planned sessions logged this week.`);
	if (outstanding.length > 0) reasons.push(`${outstanding.length} session${outstanding.length === 1 ? ' still needs its' : 's still need their'} 48-hour check.`);
	if (worse.length > 0) reasons.push(`${worse.length} 48-hour check${worse.length === 1 ? '' : 's'} this week reported feeling worse.`);

	return {
		eligible: reasons.length === 0,
		weekDays,
		sessionsThisWeek: weekSessions.length,
		target,
		checksOutstanding: outstanding.length,
		anyWorse: worse.length > 0,
		reasons,
	};
}

// ── Export ────────────────────────────────────────────────────────────────────

function csvField(v: unknown): string {
	const s = v == null ? '' : String(v);
	return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildCSV(store: Store): string {
	const header = ['date', 'context', 'tier', 'activity', 'minutes', 'felt_after_0to10', 'followup_due', 'followup_verdict', 'followup_score_0to10', 'followup_note', 'notes'];
	const rows = store.sessions.map(s => [
		s.date, s.context, s.tier ?? '', s.activity, s.minutes ?? '', s.feltAfter,
		s.followUp.due, s.followUp.verdict ?? '', s.followUp.score ?? '', s.followUp.note ?? '', s.notes ?? '',
	].map(csvField).join(','));
	return [header.join(','), ...rows].join('\r\n');
}

export function downloadCSV(store: Store): void {
	const blob = new Blob([buildCSV(store)], { type: 'text/csv;charset=utf-8' });
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = `exercise-log-${todayISO()}.csv`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(a.href);
}
