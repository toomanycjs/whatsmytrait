// Every test page built from the test template by the dynamic route
// src/pages/tests/[...slug].astro: its content file and its data file(s).
// The two Big Five pages have their own files under src/pages/tests/big-five/.
import assertivenessData from '@site/instruments/data/ipip-assertiveness.json';
import courageData from '@site/instruments/data/ipip-courage.json';
import creativityData from '@site/instruments/data/ipip-creativity.json';
import curiosityData from '@site/instruments/data/ipip-curiosity.json';
import emotionalStabilityData from '@site/instruments/data/ipip-emotional-stability-20.json';
import extraversionData from '@site/instruments/data/ipip-extraversion-20.json';
import orderlinessData from '@site/instruments/data/ipip-orderliness.json';
import patienceData from '@site/instruments/data/ipip-patience.json';
import perseveranceData from '@site/instruments/data/ipip-perseverance.json';
import trustData from '@site/instruments/data/ipip-trust.json';
import rosenbergData from '@site/instruments/data/rosenberg.json';
import tipiData from '@site/instruments/data/tipi.json';
import onetData from '@site/instruments/data/onet-ip-short.json';
import eiData from '@site/instruments/data/ipip-ei.json';
import ipcData from '@site/instruments/data/ipip-ipc.json';
import viaData from '@site/instruments/data/ipip-via-r.json';
import type { TestContent } from './content';
import { careerInterests } from './career-interests';
import { characterStrengths } from './character-strengths';
import { emotionalIntelligence } from './emotional-intelligence';
import { interpersonalStyle } from './interpersonal-style';
import { quick } from './quick';
import { selfEsteem } from './self-esteem';
import { assertiveness, courage, creativity, curiosity, emotionalStability, introvertOrExtrovert, orderliness, patience, perseverance, trust } from './single-traits';

export interface RegisteredTest {
	content: TestContent;
	data: unknown;
	normsData?: unknown;
	/** Slot copy. */
	intro: string;
	limits: string;
}

export const TESTS: RegisteredTest[] = [
	{ content: introvertOrExtrovert, data: extraversionData, intro: 'Extraversion is the tendency to seek company, conversation and stimulation; introversion is the low end of the same scale, not a separate type. These twenty statements are the public-domain IPIP markers of extraversion. Rate how accurately each describes you and the strip shows where you fall along the possible range.', limits: 'Limits worth knowing: this is a self-report of how you see yourself, and it is one broad scale, so it cannot tell warmth from assertiveness from thrill-seeking; the 120-item Big Five test scores those facets separately. No norm sample is published for this scale on its own, so there is no percentile.' },
	{ content: assertiveness, data: assertivenessData, intro: 'Assertiveness is the readiness to take charge, speak up and try to influence what happens, as opposed to waiting for others to lead. It is one facet of extraversion. These ten statements are the public-domain IPIP-NEO assertiveness facet.', limits: 'Limits worth knowing: ten items on one facet, self-reported. No norm sample is published for the facet on its own, so there is no percentile; the 120-item Big Five test scores the same facet with four items against a norm sample.' },
	{ content: patience, data: patienceData, intro: 'Patience, as measured here, is how much it takes to make you angry or irritated, and how rarely you lose your temper. These ten statements are the public-domain IPIP scale for the patience facet of the HEXACO model\'s agreeableness.', limits: 'Limits worth knowing: this scale measures the slow-to-anger sense of patience, not how well you wait or persist; ten items, self-reported, with no published norm sample for the scale on its own.' },
	{ content: curiosity, data: curiosityData, intro: 'Curiosity is finding the world interesting: being drawn to many activities, rarely bored, and keen to hear about places and ideas you do not know. These ten statements are the public-domain IPIP scale for the curiosity strength.', limits: 'Limits worth knowing: ten items, self-reported, with no published norm sample for the scale on its own. Curiosity overlaps with openness to experience; the Big Five tests measure that broader trait against norms.' },
	{ content: perseverance, data: perseveranceData, intro: 'Perseverance is finishing what you start, despite obstacles and distractions. These eight statements are the public-domain IPIP scale for the industry, perseverance and persistence strength.', limits: 'Limits worth knowing: eight items, self-reported, with no published norm sample for the scale on its own. Perseverance sits inside conscientiousness, which the Big Five tests measure against norms.' },
	{ content: orderliness, data: orderlinessData, intro: 'Orderliness is liking things tidy, planned and in their place. It is one facet of conscientiousness, and the one people usually mean by perfectionism about surroundings. These ten statements are the public-domain IPIP-NEO orderliness facet.', limits: 'Limits worth knowing: ten items on one facet, self-reported, with no published norm sample for the facet on its own. The 120-item Big Five test scores the same facet with four items against a norm sample.' },
	{ content: creativity, data: creativityData, intro: 'Creativity, as a trait, is seeing yourself as someone who comes up with new ideas and new ways of doing things. These eight statements are the public-domain IPIP scale for the originality and creativity strength.', limits: 'Limits worth knowing: this is self-rated originality, not a measure of creative output or talent; eight items with no published norm sample for the scale on its own.' },
	{ content: courage, data: courageData, intro: 'Courage, as a trait, is taking a stand, speaking an unpopular opinion and facing fears rather than avoiding awkward situations. These ten statements are the public-domain IPIP scale for the valour, bravery and courage strength.', limits: 'Limits worth knowing: ten items, self-reported, with no published norm sample for the scale on its own. It measures a disposition to speak up and face discomfort, not physical bravery.' },
	{ content: trust, data: trustData, intro: 'Trust is the tendency to assume that other people mean well and tell the truth, rather than to suspect hidden motives. It is one facet of agreeableness. These ten statements are the public-domain IPIP-NEO trust facet.', limits: 'Limits worth knowing: ten items on one facet, self-reported, with no published norm sample for the facet on its own. The 120-item Big Five test scores the same facet with four items against a norm sample.' },
	{ content: emotionalStability, data: emotionalStabilityData, intro: 'Emotional stability is how steady your moods are and how readily stress, worry and irritation arise. It is the Big Five trait that neuroticism scales measure the other way up. These twenty statements are the public-domain IPIP markers of emotional stability.', limits: 'Limits worth knowing: a self-report of how you see yourself, with no published norm sample for the 20-item scale on its own. The Big Five tests measure the same trait with norms and, in the 120-item version, six facets.' },
	{ content: selfEsteem, data: rosenbergData, intro: 'Self-esteem, in Rosenberg\'s sense, is your overall sense of your own worth: whether, on the whole, you are satisfied with yourself and feel you have good qualities. These ten statements are the Rosenberg Self-Esteem Scale, the most widely used measure of it, in the public domain.', limits: 'Limits worth knowing: the scale measures global self-esteem at the moment you answer, and it does move with mood and circumstances; a change between attempts is usual. No percentile norm table is published by the scale\'s owner, so the marker is drawn against the possible range.' },
	{ content: quick, data: tipiData, intro: 'The Ten-Item Personality Inventory is the quickest measure of the Big Five that still works: two pairs of adjectives per trait, rated on a seven-point scale, in about a minute. It is for people who want a rough position fast; the fifty-item and 120-item tests are more precise.', limits: 'Limits worth knowing: two items per trait makes each scale coarse, and the published alphas are low, as the authors expected; judge it by its test-retest figures and take the longer tests when the result matters. No percentile norm table is published, so the marker is drawn against the one-to-seven range.' },
	{ content: emotionalIntelligence, data: eiData, intro: 'Emotional intelligence, as a trait, is how you handle feelings: whether you show them, notice them, decide by them, and catch them from other people. Barchard\'s analysis of the item pool found seven distinct components rather than one, and these 68 public-domain statements measure each.', limits: 'Limits worth knowing: this is self-reported emotional style, not emotional ability, and the two correlate only weakly. Several components have modest alphas, and no norm sample is published, so there are no percentiles.' },
	{ content: interpersonalStyle, data: ipcData, intro: 'Your interpersonal style is how you come across to other people, described as a position on a circle with two axes: how dominant or yielding you are, and how warm or cold. These 32 public-domain statements measure the eight styles around that circle.', limits: 'Limits worth knowing: four items per style is short, and the eight styles overlap by design, so read your highest two or three together rather than any one alone. No norm sample is published, so there are no percentiles.' },
	{ content: characterStrengths, data: viaData, intro: 'Character strengths are the positive traits a person uses most naturally: curiosity, kindness, perseverance, humour and twenty others. These 96 public-domain statements measure 24 of them with four balanced items each, so your highest strips show your signature strengths.', limits: 'Limits worth knowing: four items per strength is short and the strengths move between attempts; trust the order of your top few more than any single score. Some names (judgment, prudence, spirituality) carry the authors\' technical meaning. No norm sample is published, so there are no percentiles.' },
	{ content: careerInterests, data: onetData, intro: 'The Interest Profiler asks which of sixty work activities you would like to do, without worrying about training or pay, and counts your interest in six areas: realistic, investigative, artistic, social, enterprising and conventional. The three highest make your interest code, which the career pages map to UK job titles. It is the public-domain short form from the US Department of Labor\'s O*NET programme, reproduced without change.', limits: 'Limits worth knowing: an interest measure says what kinds of work you would like, not what you are good at or what is available near you. The activities were written for a US audience, so a few read a little American. There is no percentile: the form is self-scored as a count of ticks per area.' },
];

export const registeredBySlug = (slug: string) => TESTS.find((t) => t.content.path === `/tests/${slug}/`);
