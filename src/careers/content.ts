// The shape of a career type page's content file (src/careers/<type>.ts).

export interface UkJob {
	/** UK job title as the National Careers Service names it. */
	title: string;
	/** National Careers Service job profile slug (nationalcareers.service.gov.uk/job-profiles/<slug>). */
	ncs: string;
	/** The O*NET occupation it was mapped from. */
	onet: string;
}

export interface CareerTypeContent {
	/** R, I, A, S, E or C. */
	code: string;
	path: string;
	title: string;
	description: string;
	name: string;
	subtitle: string;
	breadcrumb: string;
	/** What the type is, in one paragraph. */
	summary: string;
	/** The activities it describes. */
	activities: string[];
	/** Twenty UK job titles mapped from O*NET occupations with this type as the first letter of their code. */
	jobs: UkJob[];
	/** Which other types combine with it, and what that looks like. */
	combines: { code: string; name: string; path: string; line: string }[];
}

export const NCS = 'https://nationalcareers.service.gov.uk/job-profiles/';
export const ONET_CREDIT = 'This page includes information from the O*NET Career Exploration Tools by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the CC BY-ND 4.0 license. O*NET® is a trademark of USDOL/ETA.';
