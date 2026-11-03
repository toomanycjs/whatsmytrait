// The shape of an instrument file (packages/instruments/data/<id>.json) and
// of a norms file (data/norms/<id>.json). The engine never contains
// instrument-specific logic: everything it needs is in these two files.

export interface InstrumentSource {
	/** Full reference to the paper the instrument comes from. */
	paper: string;
	doi?: string;
	/** Where the scoring key was copied from. */
	keyUrl: string;
	itemsUrl?: string;
	scoringUrl?: string;
	/** Date the key was last checked, YYYY-MM-DD. */
	accessed: string;
}

export interface InstrumentLicence {
	text: string;
	url: string;
	/** The credit line shown on the page, where the licence asks for one. */
	credit?: string;
}

export interface ResponseScale {
	type: 'likert';
	/** Number of response options; values run 1..points. */
	points: number;
	/** One label per option, lowest first, exactly as published. */
	labels: string[];
}

export interface Scale {
	id: string;
	/** Name used on the site. */
	name: string;
	/** Name as the authors give it, for the sources box. */
	publishedName?: string;
	/** Facet ids, for domains made of facets. */
	facets?: string[];
	/** Domain id, for a facet. */
	parent?: string;
}

export interface Item {
	/** Published item number; also the administration order. */
	n: number;
	/** Exactly as published. */
	text: string;
	scale: string;
	/** 1 for a positively keyed item, -1 for a reverse-keyed one. */
	key: 1 | -1;
}

export interface Scoring {
	method: 'sum' | 'mean';
	/** How a reverse-keyed response x is scored; the only supported rule. */
	reverse: 'points+1-x';
}

export interface NormsRef {
	source: string;
	groups: string[];
	file: string;
}

export interface Instrument {
	id: string;
	/** Bumped whenever a change would alter scoring, so old saved attempts are never mis-scored. */
	version: number;
	name: string;
	shortName?: string;
	source: InstrumentSource;
	licence: InstrumentLicence;
	instructions?: string;
	response: ResponseScale;
	scales: Scale[];
	items: Item[];
	scoring: Scoring;
	/** Null when no published norms exist; the page then shows raw score bands and says so. */
	norms: NormsRef | null;
	/** Reliability per scale id, from the source paper. Absent scales are reported as unpublished. */
	reliability?: Record<string, number>;
	reliabilitySource?: string;
}

/** Raw responses keyed by item number, each 1..points. */
export type Responses = Record<number, number>;

export interface ScaleScore {
	/** Sum (or mean) of keyed item values over the answered items. */
	raw: number;
	/** Items answered out of items in the scale. */
	answered: number;
	of: number;
	/** Lowest and highest possible raw score for this scale. */
	min: number;
	max: number;
}

export interface ScoreResultSet {
	instrument: string;
	version: number;
	scales: Record<string, ScaleScore>;
	/** True when every item was answered. */
	complete: boolean;
}

// ── Norms ──

export interface ScaleNorms {
	/** Lowest raw score with a bin. */
	min: number;
	/** Bin width; 1 for summed scales. */
	step?: number;
	/** counts[i] is the number of people in the group scoring min + i * step. */
	counts: number[];
}

export interface GroupNorms {
	label: string;
	n: number;
	scales: Record<string, ScaleNorms>;
}

export interface NormTable {
	instrument: string;
	version: number;
	source: {
		name: string;
		url: string;
		/** SHA-256 of the input file the table was generated from. */
		inputSha256: string;
		generated: string;
		script: string;
		notes?: string;
	};
	/** Figures the generating script computed from the same rows, kept apart from published figures. */
	computed?: {
		/** Cronbach's alpha per scale. */
		alpha: Record<string, number>;
		note: string;
	};
	groups: Record<string, GroupNorms>;
}
