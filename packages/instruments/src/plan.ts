// How an instrument is presented: items in groups of ten per screen, in the
// published order, plus the time estimate shown under the title.

import type { Instrument, Item } from './instrument';

export const ITEMS_PER_SCREEN = 10;

export interface Screen {
	/** 1-based screen number. */
	index: number;
	items: Item[];
}

export function screens(instrument: Instrument, perScreen = ITEMS_PER_SCREEN): Screen[] {
	const out: Screen[] = [];
	for (let i = 0; i < instrument.items.length; i += perScreen) {
		out.push({ index: out.length + 1, items: instrument.items.slice(i, i + perScreen) });
	}
	return out;
}

/** Minutes to complete, at about six seconds an item, never under one. */
export function minutes(instrument: Instrument): number {
	return Math.max(1, Math.round(instrument.items.length / 10));
}
