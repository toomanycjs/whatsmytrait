// The strip: the site's one results device, as an HTML string with an inline
// SVG band. Pure: no DOM, so the same function renders on the server (trait
// pages, the style tile) and in the browser (results). The CSS lives in the
// site (design/tokens.css and the strip styles); this module only produces
// the markup those styles dress.
//
// Geometry follows docs/design-direction.md, "The strip": the horizontal
// axis is the raw score; the SVG holds only the density band, the middle 50%
// (clipped to the density) and the baseline, so it can stretch to any width;
// the marker and the percentile label are positioned HTML so they keep their
// size at every width.

import type { NormTable } from './instrument';
import { density, interquartile, ordinal, percentile } from './percentile';

export interface StripInput {
	/** Scale name as shown, e.g. "Extraversion". */
	name: string;
	/** Lowest and highest possible raw score. */
	min: number;
	max: number;
	/** Raw score to mark; omit for a population strip with no marker. */
	raw?: number;
	/** A second raw score, drawn as an outline marker (another attempt or another person). */
	second?: number;
	/** Norms to draw the density from; omit when none are published. */
	norms?: NormTable;
	scale?: string;
	group?: string;
	/** Domain hue as a CSS colour or custom property; drawn as a 2 px band under a domain strip. */
	hue?: string;
	size?: 'domain' | 'facet';
	/** Used in the text equivalent: "for extraversion". Defaults to the name in lower case. */
	label?: string;
}

export interface StripGeometry {
	/** Percentile rank, or null without norms. */
	percentile: number | null;
	/** Left offset of the marker as a percentage of the strip width. */
	left: number;
	/** Whether the label sits to the right of the marker. */
	labelRight: boolean;
}

const W = 600;
const PAD = 6;

export function escapeHtml(s: string): string {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function geometry(input: StripInput): StripGeometry {
	const { min, max, raw } = input;
	const hasNorms = !!(input.norms && input.scale && input.group);
	const pct = hasNorms && raw !== undefined ? percentile(input.norms!, input.scale!, input.group!, raw) : null;
	const frac = raw === undefined ? 0 : (raw - min) / (max - min);
	return { percentile: pct, left: Math.round(frac * 10000) / 100, labelRight: frac < 0.85 };
}

/** "You scored 38 out of 50, the 72nd percentile for extraversion." */
export function stripText(input: StripInput): string {
	const g = geometry(input);
	const label = input.label ?? input.name.toLowerCase();
	if (input.raw === undefined) return `The spread of ${label} scores in the norm sample, from ${input.min} to ${input.max}.`;
	if (g.percentile === null) return `You scored ${input.raw} out of ${input.max} for ${label}. No published norms exist for this scale, so there is no percentile.`;
	return `You scored ${input.raw} out of ${input.max}, the ${ordinal(g.percentile)} percentile for ${label}.`;
}

function band(input: StripInput, size: 'domain' | 'facet'): string {
	const H = size === 'domain' ? 28 : 16;
	const top = PAD;
	const x = (score: number) => ((score - input.min) / (input.max - input.min)) * W;
	const baseline = `<line class="baseline" x1="0" x2="${W}" y1="${top + H}" y2="${top + H}" />`;
	const hue = input.hue && size === 'domain' ? `<rect x="0" y="${top + H}" width="${W}" height="2" fill="${escapeHtml(input.hue)}" />` : '';

	let shape = '';
	if (input.norms && input.scale && input.group) {
		const d = density(input.norms, input.scale, input.group);
		const peak = Math.max(...d.map((p) => p.share)) || 1;
		const pts = d.map((p) => `${x(p.score).toFixed(1)},${(top + H - (p.share / peak) * H).toFixed(1)}`);
		const area = `M${x(input.min).toFixed(1)},${top + H} L${pts.join(' L')} L${x(input.max).toFixed(1)},${top + H} Z`;
		const { q1, q3 } = interquartile(input.norms, input.scale, input.group);
		const id = `clip-${input.scale.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${input.group.replace(/[^a-z0-9]+/gi, '-')}`;
		shape = `<defs><clipPath id="${id}"><path d="${area}" /></clipPath></defs>${baseline}<path class="density" d="${area}" /><rect class="iqr" clip-path="url(#${id})" x="${x(q1).toFixed(1)}" y="${top}" width="${(x(q3) - x(q1)).toFixed(1)}" height="${H}" />`;
	} else {
		shape = baseline;
	}
	return `<svg viewBox="0 0 ${W} ${H + PAD * 2}" preserveAspectRatio="none" aria-hidden="true">${shape}${hue}</svg>`;
}

/** One strip as HTML. */
export function strip(input: StripInput): string {
	const size = input.size ?? 'domain';
	const g = geometry(input);
	const text = stripText(input);
	const left = (score: number) => `${(((score - input.min) / (input.max - input.min)) * 100).toFixed(2)}%`;
	const marker = input.raw === undefined ? '' : `<span class="marker" style="left:${left(input.raw)}"></span>`;
	const second = input.second === undefined ? '' : `<span class="marker marker-outline" style="left:${left(input.second)}"></span>`;
	const label = input.raw === undefined || g.percentile === null
		? ''
		: `<span class="pct${g.labelRight ? '' : ' pct-left'}" style="left:${left(input.raw)}">${ordinal(g.percentile)}</span>`;
	return [
		`<figure class="strip strip-${size}${input.norms ? '' : ' strip-no-norms'}">`,
		`<figcaption class="strip-head"><span class="strip-name">${escapeHtml(input.name)}</span></figcaption>`,
		`<div class="strip-plot" role="img" aria-label="${escapeHtml(text)}">${band(input, size)}${second}${marker}${label}</div>`,
		`<div class="strip-axis"><span>${input.min}</span><span>${input.max}</span></div>`,
		`</figure>`,
	].join('');
}
