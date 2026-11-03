// Shared types for saved results, score history, export and calendar
// reminders. Each test page supplies a ToolConfig; everything else is generic.

export interface ResultEntry {
	id: string;
	/** Stable instrument id, e.g. "ipip-50". */
	tool: string;
	/** Scoring version of the tool when the result was saved. */
	toolVersion: string;
	/** Local date-time, ISO 8601 without offset: 2026-10-05T14:03:00. */
	date: string;
	/** Null for instruments with no single total. */
	total: number | null;
	subscores: Record<string, number>;
	/** The band label at the time, if the instrument has bands. */
	band: string | null;
	/** One-line human-readable summary, used in exports. */
	summary: string;
}

/** What a tool page hands over when a score is produced. */
export interface ScoreResult {
	total: number | null;
	subscores: Record<string, number>;
	band?: string | null;
	summary?: string;
}

export interface Band {
	/** Inclusive bounds. */
	min: number;
	max: number;
	label: string;
}

export interface SubscoreDef {
	key: string;
	/** Short column label for tables and CSV. */
	label: string;
	/** Longer name for use in sentences, if the label is abbreviated. */
	sentenceLabel?: string;
	/** Maximum possible value. */
	max?: number;
	/** Text for the history table cell, for coded values (e.g. a rating context). */
	format?: (value: number) => string;
	/** Show as a column in the history table and CSV. Defaults to true. */
	inTable?: boolean;
}

export interface ToolConfig {
	id: string;
	version: string;
	/** Display name, e.g. "IPIP Big Five markers". */
	name: string;
	/** Site path of the test page, with slashes: "/tests/big-five/short/". */
	path: string;
	totalMin?: number;
	totalMax?: number;
	/** Decimal places for the total. Defaults to 0. */
	decimals?: number;
	/** Always show all decimal places (4.0, not 4), to match how the page shows the score. */
	fixedDecimals?: boolean;
	bands?: Band[];
	/** Override the default "A X total of N is in the Y range." sentence. */
	bandSentence?: (total: string, band: Band) => string;
	subscores: SubscoreDef[];
	/** Text for the outcome column when total is null. */
	outcome?: (entry: Pick<ResultEntry, 'total' | 'subscores' | 'band'>) => string;
	/**
	 * Sub-score key that must match for two results to be compared. Comparisons
	 * and the change column then skip results taken under different conditions.
	 */
	comparableBy?: string;
	/** Reminder repeat interval in months. Defaults to 6 (two reminders a year). */
	reminderMonths?: number;
}
