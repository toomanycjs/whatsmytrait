import type { CareerTypeContent } from './content';
import { conventional, investigative, realistic, social } from './types';
import { artistic, enterprising } from './types-ae';

/** The six types in RIASEC order. */
export const CAREER_TYPES: CareerTypeContent[] = [realistic, investigative, artistic, social, enterprising, conventional];
