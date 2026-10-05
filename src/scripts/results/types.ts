// Shared types for saved questionnaire results, score history, export and
// calendar reminders. Each tool page supplies a ToolConfig; everything else is
// generic.

export interface ResultEntry {
	id: string;
	/** Stable instrument id, e.g. "compass-31". */
	tool: string;
	/** Scoring version of the tool when the result was saved. */
	toolVersion: string;
	/** Local date-time, ISO 8601 without offset: 2026-10-05T14:03:00. */
	date: string;
	/** Null for instruments with no single total (DSQ-2 case definitions). */
	total: number | null;
	subscores: Record<string, number>;
	/** The Layer 1 band label at the time, if the instrument has bands. */
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
	/** Maximum possible value; ranks higher-better domains relative to their maximum. */
	max?: number;
	/** Show as a column in the history table and CSV. Defaults to true. */
	inTable?: boolean;
}

export interface ToolConfig {
	id: string;
	version: string;
	/** Display name, e.g. "COMPASS-31". */
	name: string;
	/** Site path of the tool page, with slashes: "/tools/compass-31/". */
	path: string;
	totalMin?: number;
	totalMax?: number;
	/** Decimal places for the total. Defaults to 0. */
	decimals?: number;
	/** Whether a higher total means more symptoms or more function. Defaults to higher-worse. */
	direction?: 'higher-worse' | 'higher-better';
	bands?: Band[];
	/** Override the default "A X total of N is in the Y range." sentence. */
	bandSentence?: (total: string, band: Band) => string;
	subscores: SubscoreDef[];
	/** Published minimal important change, in total-score points, with its source. */
	mic?: { value: number; source: string } | null;
	/** Text for the outcome column when total is null (criteria-based instruments). */
	outcome?: (entry: Pick<ResultEntry, 'total' | 'subscores' | 'band'>) => string;
	/** Reminder repeat interval in months. Defaults to 1 (monthly, 12 occurrences). */
	reminderMonths?: number;
}
