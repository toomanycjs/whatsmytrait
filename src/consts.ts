// Site-wide constants. The name and domain were chosen by the owner on
// 3 November 2026 (docs/decisions/0001-first-release-scope.md); change them
// here and in astro.config.mjs, nowhere else.

export const SITE_TITLE = "What's My Trait";
export const SITE_URL = 'https://www.whatsmytrait.com';
/** Google Analytics 4 measurement id, loaded in consent mode with storage denied (docs/decisions/0004-analytics.md). */
export const GA_MEASUREMENT_ID = 'G-HCF4G9DD98';
export const SITE_DESCRIPTION =
	'Free personality and interest tests from published, openly licensed instruments. Scored on your device, shown against real norms, with the reliability stated.';

/** Sections, in nav order, keyed by their URL segment. */
export const SECTIONS: Record<string, string> = {
	tests: 'Tests',
	traits: 'Traits',
	careers: 'Careers',
	compare: 'Compare',
	guides: 'Guides',
};

/** Header links. A section joins the nav once its index page exists; the link check fails on links to missing pages. */
export const NAV: { path: string; label: string }[] = [
	{ path: '/tests/', label: 'Tests' },
	{ path: '/traits/', label: 'Traits' },
	{ path: '/careers/', label: 'Careers' },
	{ path: '/compare/', label: 'Compare' },
	{ path: '/guides/', label: 'Guides' },
];

/** Footer links: the trust pages. */
export const FOOTER_NAV: { path: string; label: string }[] = [
	{ path: '/methodology/', label: 'Methodology' },
	{ path: '/licences/', label: 'Licences' },
	{ path: '/about/', label: 'About' },
	{ path: '/privacy/', label: 'Privacy' },
];
