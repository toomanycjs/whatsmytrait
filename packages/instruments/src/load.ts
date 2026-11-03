// Validate an instrument file. Called at build time on every data file, so a
// malformed file fails the build rather than mis-scoring in a browser.

import type { Instrument, Item, NormTable, Scale } from './instrument';

class InstrumentError extends Error {
	constructor(id: string, message: string) {
		super(`instrument ${id}: ${message}`);
		this.name = 'InstrumentError';
	}
}

const isRecord = (x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object' && !Array.isArray(x);
const isString = (x: unknown): x is string => typeof x === 'string' && x.length > 0;

function fail(id: string, message: string): never {
	throw new InstrumentError(id, message);
}

export function loadInstrument(data: unknown): Instrument {
	if (!isRecord(data)) throw new InstrumentError('?', 'not an object');
	const id = isString(data.id) ? data.id : fail('?', 'id missing');
	if (!/^[a-z0-9-]+$/.test(id)) fail(id, 'id must be lowercase letters, digits and hyphens');
	if (!Number.isInteger(data.version) || (data.version as number) < 1) fail(id, 'version must be a positive integer');
	if (!isString(data.name)) fail(id, 'name missing');

	const source = data.source;
	if (!isRecord(source) || !isString(source.paper) || !isString(source.keyUrl) || !isString(source.accessed)) {
		fail(id, 'source needs paper, keyUrl and accessed');
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(source.accessed as string)) fail(id, 'source.accessed must be YYYY-MM-DD');
	const licence = data.licence;
	if (!isRecord(licence) || !isString(licence.text) || !isString(licence.url)) fail(id, 'licence needs text and url');

	const response = data.response;
	if (!isRecord(response) || response.type !== 'likert') fail(id, 'response.type must be likert');
	const points = response.points;
	if (!Number.isInteger(points) || (points as number) < 2) fail(id, 'response.points must be an integer of 2 or more');
	if (!Array.isArray(response.labels) || response.labels.length !== points || !response.labels.every(isString)) {
		fail(id, `response.labels must have exactly ${points} labels`);
	}

	if (!Array.isArray(data.scales) || data.scales.length === 0) fail(id, 'scales missing');
	const scales: Scale[] = data.scales.map((s: unknown, i: number) => {
		if (!isRecord(s) || !isString(s.id) || !isString(s.name)) fail(id, `scales[${i}] needs id and name`);
		const scale: Scale = { id: s.id, name: s.name };
		if (s.publishedName !== undefined) scale.publishedName = String(s.publishedName);
		if (s.facets !== undefined) {
			if (!Array.isArray(s.facets) || !s.facets.every(isString)) fail(id, `scale ${s.id}: facets must be a list of ids`);
			scale.facets = s.facets as string[];
		}
		if (s.parent !== undefined) scale.parent = String(s.parent);
		return scale;
	});
	const scaleIds = new Set(scales.map((s) => s.id));
	if (scaleIds.size !== scales.length) fail(id, 'scale ids must be unique');
	for (const s of scales) {
		if (s.parent && !scaleIds.has(s.parent)) fail(id, `scale ${s.id}: parent ${s.parent} does not exist`);
		for (const f of s.facets ?? []) {
			const facet = scales.find((x) => x.id === f);
			if (!facet) fail(id, `scale ${s.id}: facet ${f} does not exist`);
			if (facet.parent !== s.id) fail(id, `facet ${f} must name ${s.id} as its parent`);
		}
	}

	if (!Array.isArray(data.items) || data.items.length === 0) fail(id, 'items missing');
	const items: Item[] = data.items.map((it: unknown, i: number) => {
		if (!isRecord(it)) fail(id, `items[${i}] is not an object`);
		if (!Number.isInteger(it.n) || (it.n as number) < 1) fail(id, `items[${i}]: n must be a positive integer`);
		if (!isString(it.text)) fail(id, `item ${it.n}: text missing`);
		if (it.text !== it.text.trim()) fail(id, `item ${it.n}: text has leading or trailing space`);
		if (!isString(it.scale) || !scaleIds.has(it.scale)) fail(id, `item ${it.n}: scale ${String(it.scale)} does not exist`);
		if (it.key !== 1 && it.key !== -1) fail(id, `item ${it.n}: key must be 1 or -1`);
		return { n: it.n as number, text: it.text, scale: it.scale, key: it.key };
	});
	const ns = new Set(items.map((it) => it.n));
	if (ns.size !== items.length) fail(id, 'item numbers must be unique');
	for (let i = 1; i < items.length; i++) {
		if (items[i].n <= items[i - 1].n) fail(id, 'items must be in ascending published order');
	}
	// A domain made of facets has no items of its own; every other scale needs at least one.
	for (const s of scales) {
		if (!s.facets?.length && !items.some((it) => it.scale === s.id)) fail(id, `scale ${s.id} has no items`);
		if (s.facets?.length && items.some((it) => it.scale === s.id)) fail(id, `scale ${s.id} has facets and must not have items of its own`);
	}

	const scoring = data.scoring;
	if (!isRecord(scoring) || (scoring.method !== 'sum' && scoring.method !== 'mean')) fail(id, 'scoring.method must be sum or mean');
	if (scoring.reverse !== 'points+1-x') fail(id, 'scoring.reverse must be points+1-x');

	let norms: Instrument['norms'] = null;
	if (data.norms !== null && data.norms !== undefined) {
		const n = data.norms;
		if (!isRecord(n) || !isString(n.source) || !isString(n.file) || !Array.isArray(n.groups) || !n.groups.every(isString)) {
			fail(id, 'norms needs source, file and groups, or null');
		}
		norms = { source: n.source, file: n.file, groups: n.groups as string[] };
	}

	let reliability: Record<string, number> | undefined;
	if (data.reliability !== undefined) {
		if (!isRecord(data.reliability)) fail(id, 'reliability must be an object of scale id to figure');
		reliability = {};
		for (const [k, v] of Object.entries(data.reliability)) {
			if (!scaleIds.has(k)) fail(id, `reliability names unknown scale ${k}`);
			if (typeof v !== 'number' || v <= 0 || v > 1) fail(id, `reliability for ${k} must be between 0 and 1`);
			reliability[k] = v;
		}
		if (Object.keys(reliability).length && !isString(data.reliabilitySource)) fail(id, 'reliabilitySource must say where the figures come from');
	}

	const instrument: Instrument = {
		id,
		version: data.version as number,
		name: data.name,
		source: {
			paper: source.paper as string,
			keyUrl: source.keyUrl as string,
			accessed: source.accessed as string,
		},
		licence: { text: licence.text, url: licence.url },
		response: { type: 'likert', points: points as number, labels: response.labels as string[] },
		scales,
		items,
		scoring: { method: scoring.method, reverse: 'points+1-x' },
		norms,
	};
	if (isString(data.shortName)) instrument.shortName = data.shortName;
	if (isString(data.instructions)) instrument.instructions = data.instructions;
	if (isString(source.doi)) instrument.source.doi = source.doi;
	if (isString(source.itemsUrl)) instrument.source.itemsUrl = source.itemsUrl;
	if (isString(source.scoringUrl)) instrument.source.scoringUrl = source.scoringUrl;
	if (isString(licence.credit)) instrument.licence.credit = licence.credit;
	if (reliability) instrument.reliability = reliability;
	if (isString(data.reliabilitySource)) instrument.reliabilitySource = data.reliabilitySource;
	return instrument;
}

/** Validate a norms file against the instrument it belongs to. */
export function loadNorms(data: unknown, instrument: Instrument): NormTable {
	const id = instrument.id;
	if (!isRecord(data)) fail(id, 'norms file is not an object');
	if (data.instrument !== id) fail(id, `norms file is for ${String(data.instrument)}`);
	if (data.version !== instrument.version) fail(id, `norms file is for version ${String(data.version)}, instrument is ${instrument.version}`);
	const source = data.source;
	if (!isRecord(source) || !isString(source.name) || !isString(source.url) || !isString(source.inputSha256) || !isString(source.generated) || !isString(source.script)) {
		fail(id, 'norms source needs name, url, inputSha256, generated and script');
	}
	if (!isRecord(data.groups) || Object.keys(data.groups).length === 0) fail(id, 'norms groups missing');
	const groups: NormTable['groups'] = {};
	for (const [gid, g] of Object.entries(data.groups)) {
		if (!isRecord(g) || !isString(g.label) || !Number.isInteger(g.n) || (g.n as number) < 1 || !isRecord(g.scales)) {
			fail(id, `norms group ${gid} needs label, n and scales`);
		}
		const scales: Record<string, { min: number; step?: number; counts: number[] }> = {};
		for (const [sid, s] of Object.entries(g.scales)) {
			if (!instrument.scales.some((x) => x.id === sid)) fail(id, `norms group ${gid} names unknown scale ${sid}`);
			if (!isRecord(s) || typeof s.min !== 'number' || !Array.isArray(s.counts) || s.counts.length === 0) fail(id, `norms ${gid}/${sid} needs min and counts`);
			if (!s.counts.every((c) => Number.isInteger(c) && (c as number) >= 0)) fail(id, `norms ${gid}/${sid}: counts must be non-negative integers`);
			const total = (s.counts as number[]).reduce((a, b) => a + b, 0);
			if (total !== g.n) fail(id, `norms ${gid}/${sid}: counts sum to ${total}, group n is ${g.n}`);
			const entry: { min: number; step?: number; counts: number[] } = { min: s.min, counts: s.counts as number[] };
			if (s.step !== undefined) {
				if (typeof s.step !== 'number' || s.step <= 0) fail(id, `norms ${gid}/${sid}: step must be positive`);
				entry.step = s.step;
			}
			scales[sid] = entry;
		}
		groups[gid] = { label: g.label, n: g.n as number, scales };
	}
	if (instrument.norms) {
		for (const g of instrument.norms.groups) if (!groups[g]) fail(id, `instrument lists norms group ${g}, which the norms file lacks`);
	}
	const src = source as Record<string, string>;
	const table: NormTable = {
		instrument: id,
		version: instrument.version,
		source: { name: src.name, url: src.url, inputSha256: src.inputSha256, generated: src.generated, script: src.script, ...(src.notes ? { notes: src.notes } : {}) },
		groups,
	};
	if (data.computed !== undefined) {
		const c = data.computed;
		if (!isRecord(c) || !isRecord(c.alpha) || !isString(c.note)) fail(id, 'norms computed needs alpha and note');
		const alpha: Record<string, number> = {};
		for (const [k, v] of Object.entries(c.alpha)) {
			if (!instrument.scales.some((x) => x.id === k)) fail(id, `computed alpha names unknown scale ${k}`);
			if (typeof v !== 'number') fail(id, `computed alpha for ${k} must be a number`);
			alpha[k] = v;
		}
		table.computed = { alpha, note: c.note };
	}
	return table;
}
