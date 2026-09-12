// Virtual page views for multi-page tools.
//
// BaseHead loads gtag.js and fires the real page_view on load. Astro bundles
// that inline script as a module, so its `gtag` helper is not a global. gtag.js
// only reads `window.dataLayer`, though, so pushing an `arguments` object onto
// it from here works the same way. Each questionnaire step is reported as its
// own page view at `<path>?step=N`, so a three-page survey counts as three
// page views rather than one.

declare global {
	interface Window {
		dataLayer?: unknown[];
	}
}

function gtag(..._args: unknown[]) {
	window.dataLayer = window.dataLayer || [];
	// gtag.js expects the Arguments object, not an array.
	// eslint-disable-next-line prefer-rest-params
	window.dataLayer.push(arguments);
}

let lastStep: string | null = null;

/**
 * Record a virtual page view for step `step` of the current tool.
 * The first step is the real page load, so callers normally start at 2.
 * Repeated calls for the same step (e.g. going back and forward) are collapsed.
 */
export function trackStep(step: number | string, label?: string) {
	const key = String(step);
	if (key === lastStep) return;
	lastStep = key;
	const path = `${location.pathname}?step=${encodeURIComponent(key)}`;
	const baseTitle = document.title.replace(/\s*[–|-]\s*step .*$/i, '');
	gtag('event', 'page_view', {
		page_title: label ? `${baseTitle} – ${label}` : `${baseTitle} – step ${key}`,
		page_location: `${location.origin}${path}`,
		page_path: path,
	});
}
