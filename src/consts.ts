// Site-wide constants. The name and domain are placeholders until the owner
// decides them (docs/decisions/0001-first-release-scope.md); change them here
// and in astro.config.mjs, nowhere else. The .example top-level domain is
// reserved for placeholders.

export const SITE_TITLE = 'Personality Tests';
export const SITE_URL = 'https://personality-tests.example';
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

/** Header links. Empty until the section index pages are built; the link check fails on links to missing pages. */
export const NAV: { path: string; label: string }[] = [];

/** Footer links. Empty until the trust pages exist. */
export const FOOTER_NAV: { path: string; label: string }[] = [];
