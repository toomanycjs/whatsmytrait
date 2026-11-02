// Every tool that saves results, in the order of the tools hub. Used by the
// my-results page and the hub's saved-results count.

import type { ToolConfig } from '../scripts/results/types';
import { audit } from './audit';
import { beightonScore } from './beighton-score';
import { bellScale } from './bell-scale';
import { briefResilienceScale } from './brief-resilience-scale';
import { chalderFatigueScale } from './chalder-fatigue-scale';
import { cognitiveFailuresQuestionnaire } from './cognitive-failures-questionnaire';
import { compass31 } from './compass-31';
import { dsq2 } from './dsq-2';
import { dsqBrief } from './dsq-brief';
import { dsqPem } from './dsq-pem';
import { fibromyalgiaSurvey } from './fibromyalgia-survey';
import { fivePartQuestionnaire } from './five-part-questionnaire';
import { fss } from './fss';
import { funcap } from './funcap';
import { godinShephard } from './godin-shephard-leisure-time-exercise-questionnaire';
import { hedsCriteria } from './heds-criteria';
import { ipaqShortForm } from './ipaq-short-form';
import { malmoPotsScore } from './malmo-pots-score';
import { nasaLeanTest } from './nasa-lean-test';
import { nijmegen } from './nijmegen';
import { orthostaticGradingScale } from './orthostatic-grading-scale';
import { pcfs } from './pcfs';
import { rand36 } from './rand-36';
import { satisfactionWithLifeScale } from './satisfaction-with-life-scale';
import { selfEvaluationOfBreathingQuestionnaire } from './self-evaluation-of-breathing-questionnaire';
import { vanderbiltOrthostaticSymptomScore } from './vanderbilt-orthostatic-symptom-score';
import { who5 } from './who-5';

export const TOOL_CONFIGS: ToolConfig[] = [
	dsqBrief, dsq2, dsqPem, funcap, compass31, malmoPotsScore, cognitiveFailuresQuestionnaire,
	vanderbiltOrthostaticSymptomScore, orthostaticGradingScale, nijmegen, chalderFatigueScale, fss,
	selfEvaluationOfBreathingQuestionnaire, bellScale, pcfs, rand36, who5, fibromyalgiaSurvey,
	satisfactionWithLifeScale, briefResilienceScale, audit, ipaqShortForm, godinShephard, beightonScore,
	fivePartQuestionnaire, hedsCriteria, nasaLeanTest,
];
