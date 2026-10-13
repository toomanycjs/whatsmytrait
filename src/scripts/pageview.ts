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

/**
 * Send a GA4 event through the same dataLayer route as the page views above.
 * Callers must never pass score values: only ids, counts and formats.
 */
export function trackEvent(name: string, params: Record<string, string | number>) {
	try {
		gtag('event', name, params);
	} catch { /* analytics must never break the page */ }
}

// Multi-step tools reveal their pages by toggling the `hidden` attribute on
// a step container (.step, .flow-step, .screen, .panel) and finally on a
// results container (#results, #screen-results, .result-panel). Watching
// those toggles from one place means every tool counts each page and its
// results screen as a page view without each script having to remember to.
// Tools that already call trackStep themselves still work: trackStep
// collapses consecutive calls with the same key.
const STEP_SELECTOR = '.step, .flow-step, .screen, .panel';

function isResults(el: HTMLElement): boolean {
	return el.id === 'results' || el.id.startsWith('screen-results') || el.id.startsWith('result-')
		|| el.classList.contains('results') || el.classList.contains('result-panel');
}

function stepLabel(el: HTMLElement, n: number): string {
	const explicit = el.dataset.stepLabel;
	if (explicit) return explicit;
	const heading = el.querySelector('h2, h3, legend, .step-kicker, .manoeuvre-step, .flow-question');
	const text = heading?.textContent?.replace(/\s+/g, ' ').trim();
	return text && text.length <= 60 ? text : `Step ${n}`;
}

export function observeToolSteps(root: HTMLElement | null = document.querySelector('main')) {
	if (!root || typeof MutationObserver === 'undefined') return;
	// Panels revealed by script on load (a restored result, a first step that
	// starts hidden) are part of the page view gtag already counted. Only
	// reveals after the visitor has done something count as new pages.
	let interacted = false;
	const markInteracted = () => { interacted = true; };
	for (const type of ['pointerdown', 'keydown', 'touchstart', 'click']) {
		window.addEventListener(type, markInteracted, { once: true, capture: true, passive: true });
	}
	const observer = new MutationObserver((records) => {
		if (!interacted) return;
		for (const r of records) {
			const el = r.target as HTMLElement;
			if (!(el instanceof HTMLElement) || el.hidden) continue;
			if (isResults(el)) {
				trackStep('results', 'Results');
				continue;
			}
			if (!el.matches(STEP_SELECTOR)) continue;
			const siblings = Array.from(root.querySelectorAll<HTMLElement>(STEP_SELECTOR)).filter((s) => !isResults(s));
			const index = siblings.indexOf(el);
			// Index 0 is the page as loaded, which gtag already counted.
			if (index > 0) trackStep(index + 1, stepLabel(el, index + 1));
		}
	});
	observer.observe(root, { attributes: true, attributeFilter: ['hidden'], subtree: true });
}
