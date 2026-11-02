// "Summary for your clinician" printouts: the per-tool text for the one-page
// sheet built by ClinicianSummary.astro and filled in by
// src/scripts/results/clinicianSummary.ts. A tool gets the printout only when
// it has an entry here, so the rollout is one entry at a time.
//
// Rules for every entry (see the tool's "Understanding your score" section and
// its sources, which this must match):
// - bands and MICs only where that section already sources one; otherwise say
//   none is established;
// - band wording as the authors or validation papers put it, attributed;
// - no item wording.

import type { ScoreResult } from '../scripts/results/types';
import { SUMMARIES_AUTONOMIC } from './summaries/autonomic';
import { SUMMARIES_MECFS } from './summaries/mecfs';
import { SUMMARIES_OTHER } from './summaries/other';

export interface SummaryConfig {
	/** Full instrument name as the site or the source paper gives it, e.g. "Composite Autonomic Symptom Score 31". */
	fullName: string;
	/** Only an abbreviation the site or the source already uses; leave out rather than coin one. */
	abbreviation?: string;
	/** Two to four short lines: what it measures, who it was validated in, the MIC. */
	about: string[];
	/**
	 * The band or criteria line for a result, worded and attributed as the
	 * source does. Return a "none established" line when there are no bands.
	 */
	outcome: (r: ScoreResult) => string;
	/** Full citation of the scoring or validation paper, without the DOI. */
	citation: string;
	doi: string;
	/** Attribution the copyright holder requires on reproductions, if any. */
	attribution?: string;
	/** Sub-score keys shown as columns in the history table. Defaults to all table sub-scores, up to six. */
	historySubscores?: string[];
	/** Words before the total, e.g. "Mean score" or "Leisure Score Index". Defaults to "Total". */
	totalLabel?: string;
	/** First column heading of the sub-score table, e.g. "Scale" or "Subscale". Defaults to "Domain". */
	subscoreHeading?: string;
	/** Sub-score keys left out of the result table (e.g. internal 0/1 flags already worded in the outcome). */
	hideSubscores?: string[];
	/**
	 * Sub-score keys for the result table, in order, when it should differ from
	 * the history-table set (inTable), e.g. all eight RAND-36 scales.
	 */
	resultSubscores?: string[];
}

export const SUMMARIES: Record<string, SummaryConfig> = {
	'compass-31': {
		fullName: 'Composite Autonomic Symptom Score 31',
		abbreviation: 'COMPASS-31',
		about: [
			'31 questions on autonomic symptoms in six weighted domains, giving a total from 0 (none) to 100; higher means more symptoms.',
			'Derived at the Mayo Clinic from the answers of 405 healthy controls (Sletten et al. 2012); validated in 66 people assessed for small fibre polyneuropathy, with two-week test-retest rs = 0.886 (Treister et al. 2015).',
			'No minimal important change has been published.',
		],
		outcome: () => 'Bands: none established. The developers published no normal range or severity bands (Sletten et al. 2012).',
		citation: 'Sletten DM, Suarez GA, Low PA, Mandrekar J, Singer W. COMPASS 31: a refined and abbreviated Composite Autonomic Symptom Score. Mayo Clin Proc. 2012;87(12):1196–1201.',
		doi: '10.1016/j.mayocp.2012.10.013',
		// REVIEW: Mayo lists COMPASS-31 among its licensable copyrighted
		// materials with no published free-use terms; confirm with Mayo before
		// this goes live.
		attribution: 'COMPASS-31 © Mayo Foundation for Medical Education and Research.',
	},
	...SUMMARIES_MECFS,
	...SUMMARIES_AUTONOMIC,
	...SUMMARIES_OTHER,
};
