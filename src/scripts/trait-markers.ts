// On a trait page: if a result for the strip's instrument is saved on this
// device, redraw the strip with the reader's marker and say when the score
// is from. Nothing is sent anywhere; this only reads localStorage.

import { ordinal, percentile, readTool, strip, type NormTable } from '@site/instruments';

interface StripSpec { instrument: string; scale: string; group: string; min: number; max: number; name: string }
interface TraitData { strips: StripSpec[]; norms: Record<string, NormTable | null> }

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const formatDate = (iso: string) => {
	const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
	return `${d} ${MONTHS[m - 1]} ${y}`;
};

export function mountTraitMarkers() {
	const dataEl = document.querySelector<HTMLScriptElement>('script[data-trait-data]');
	if (!dataEl) return;
	const data = JSON.parse(dataEl.textContent ?? '{}') as TraitData;
	data.strips.forEach((spec, i) => {
		const saved = readTool(spec.instrument);
		const latest = saved[saved.length - 1];
		if (!latest) return;
		const raw = latest.subscores[spec.scale];
		if (raw === undefined) return;
		const row = document.querySelector<HTMLElement>(`[data-strip-index="${i}"]`);
		if (!row) return;
		const norms = data.norms[spec.instrument];
		const hasNorms = !!norms && !!norms.groups[spec.group]?.scales[spec.scale];
		const plot = row.querySelector<HTMLElement>('[data-strip-plot]');
		if (plot) {
			plot.innerHTML = strip({ name: spec.name, min: spec.min, max: spec.max, raw, ...(hasNorms ? { norms: norms!, scale: spec.scale, group: spec.group } : {}) });
		}
		const note = row.querySelector<HTMLElement>('[data-strip-note]');
		if (note) {
			const p = hasNorms ? percentile(norms!, spec.scale, spec.group, raw) : null;
			note.textContent = p === null
				? `Your score from ${formatDate(latest.date)} sits here: ${raw} of ${spec.max}.`
				: `Your score from ${formatDate(latest.date)} sits here, at the ${ordinal(p)} percentile.`;
		}
	});
}
