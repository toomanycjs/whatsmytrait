// The thirty facet pages of the IPIP-NEO-120, built from their specs in
// domain order (N, E, O, A, C) as the data file lists them.
import ipip120 from '@site/instruments/data/ipip-neo-120.json';
import { facet, type FacetSpec } from './facet';
import { FACETS_A } from './facets-a';
import { FACETS_C } from './facets-c';
import { FACETS_E } from './facets-e';
import { FACETS_N } from './facets-n';
import { FACETS_O } from './facets-o';

export const FACET_SPECS: FacetSpec[] = [...FACETS_N, ...FACETS_E, ...FACETS_O, ...FACETS_A, ...FACETS_C];

export const FACETS = FACET_SPECS.map((spec) => facet(spec, FACET_SPECS, ipip120.items));

/** The facet pages of one domain, in the data file's order. */
export const facetsOf = (domain: FacetSpec['domain']) => FACETS.filter((_, i) => FACET_SPECS[i].domain === domain);
