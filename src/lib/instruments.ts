// Every instrument data file and norms table, loaded and validated once at
// build time, for the pages that list them all (methodology, licences,
// for teachers and researchers).
import { loadInstrument, loadNorms, type Instrument, type NormTable } from '@site/instruments';

const dataFiles = import.meta.glob<{ default: unknown }>('/packages/instruments/data/*.json', { eager: true });
const normsFiles = import.meta.glob<{ default: unknown }>('/packages/instruments/data/norms/*.json', { eager: true });

export interface LoadedInstrument {
	instrument: Instrument;
	norms: NormTable | null;
}

export const INSTRUMENTS: LoadedInstrument[] = Object.entries(dataFiles)
	.map(([path, mod]) => {
		const instrument = loadInstrument(mod.default);
		const normsPath = instrument.norms ? `/packages/instruments/data/${instrument.norms.file}` : null;
		const normsMod = normsPath ? normsFiles[normsPath] : undefined;
		if (instrument.norms && !normsMod) throw new Error(`${path}: norms file ${instrument.norms.file} not found`);
		return { instrument, norms: normsMod ? loadNorms(normsMod.default, instrument) : null };
	})
	.sort((a, b) => a.instrument.name.localeCompare(b.instrument.name));

/** The test page that uses an instrument, by instrument id. */
export const TEST_PATHS: Record<string, string> = {
	'ipip-neo-120': '/tests/big-five/',
	'ipip-50': '/tests/big-five/short/',
	tipi: '/tests/quick/',
	rosenberg: '/tests/self-esteem/',
	'onet-ip-short': '/tests/career-interests/',
	'ipip-extraversion-20': '/tests/introvert-or-extrovert/',
	'ipip-assertiveness': '/tests/assertiveness/',
	'ipip-patience': '/tests/patience/',
	'ipip-perfectionism': '/tests/perfectionism/',
	'ipip-curiosity': '/tests/curiosity/',
	'ipip-perseverance': '/tests/perseverance/',
	'ipip-orderliness': '/tests/orderliness/',
	'ipip-creativity': '/tests/creativity/',
	'ipip-courage': '/tests/courage/',
	'ipip-trust': '/tests/trust/',
	'ipip-emotional-stability-20': '/tests/emotional-stability/',
	'ipip-ei': '/tests/emotional-intelligence/',
	'ipip-ipc': '/tests/interpersonal-style/',
	'ipip-via-r': '/tests/character-strengths/',
};
