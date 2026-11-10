"""Write packages/instruments/data/ipip-bfas.json, the Big Five Aspect Scales.

Items copied character for character from https://ipip.ori.org/BFASKeys.htm
on 10 November 2026 (saved in docs/sources/ipip/BFASKeys.htm), including the
page's curly apostrophes and quotation marks and its "other’s" in "Can’t be
bothered with other’s needs." Four items carry footnote letters (a to d) on
the key page marking items not given to the Eugene-Springfield sample; the
letters are not part of the items. Alphas are from the IPIP table,
https://ipip.ori.org/BFASTable.htm.

The key page lists items by aspect with no administration order. Taking them
in that order would put each aspect's ten items on one screen, so they are
interleaved across the ten aspects in round-robin order, as the site does for
its other multi-scale IPIP instruments.

Usage: python -I scripts/instruments/build-bfas.py
"""
import json
from itertools import zip_longest

ASPECTS = [
    # (domain id, domain published name, domain alpha, [(aspect id, name, alpha, plus, minus), (...)])
    ('N', 'Neuroticism', 0.89, [
        ('NV', 'Volatility', 0.85,
         ['Get angry easily.', 'Get upset easily.', 'Change my mood a lot.', 'Am a person whose moods go up and down easily.', 'Get easily agitated.', 'Can be stirred up easily.'],
         ['Rarely get irritated.', 'Keep my emotions under control.', 'Rarely lose my composure.', 'Am not easily annoyed.']),
        ('NW', 'Withdrawal', 0.84,
         ['Am filled with doubts about things.', 'Feel threatened easily.', 'Worry about things.', 'Am easily discouraged.', 'Become overwhelmed by events.', 'Am afraid of many things.'],
         ['Seldom feel blue.', 'Feel comfortable with myself.', 'Rarely feel depressed.', 'Am not embarrassed easily.']),
    ]),
    ('A', 'Agreeableness', 0.84, [
        ('AC', 'Compassion', 0.84,
         ['Feel others’ emotions.', 'Inquire about others’ well-being.', 'Sympathize with others’ feelings.', 'Take an interest in other people’s lives.', 'Like to do things for others.'],
         ['Am not interested in other people’s problems.', 'Can’t be bothered with other’s needs.', 'Am indifferent to the feelings of others.', 'Take no time for others.', 'Don’t have a soft side.']),
        ('AP', 'Politeness', 0.75,
         ['Respect authority.', 'Hate to seem pushy.', 'Avoid imposing my will on others.', 'Rarely put people under pressure.'],
         ['Insult people.', 'Believe that I am better than others.', 'Take advantage of others.', 'Seek conflict.', 'Love a good fight.', 'Am out for my own personal gain.']),
    ]),
    ('C', 'Conscientiousness', 0.84, [
        ('CI', 'Industriousness', 0.81,
         ['Carry out my plans.', 'Finish what I start.', 'Get things done quickly.', 'Always know what I am doing.'],
         ['Waste my time.', 'Find it difficult to get down to work.', 'Mess things up.', 'Don’t put my mind on the task at hand.', 'Postpone decisions.', 'Am easily distracted.']),
        ('CO', 'Orderliness', 0.80,
         ['Like order.', 'Keep things tidy.', 'Follow a schedule.', 'Want everything to be “just right.”', 'See that rules are observed.', 'Want every detail taken care of.'],
         ['Leave my belongings around.', 'Am not bothered by messy people.', 'Am not bothered by disorder.', 'Dislike routine.']),
    ]),
    ('E', 'Extraversion', 0.85, [
        ('EE', 'Enthusiasm', 0.81,
         ['Make friends easily.', 'Warm up quickly to others.', 'Show my feelings when I’m happy.', 'Have a lot of fun.', 'Laugh a lot.'],
         ['Am hard to get to know.', 'Keep others at a distance.', 'Reveal little about myself.', 'Rarely get caught up in the excitement.', 'Am not a very enthusiastic person.']),
        ('EA', 'Assertiveness', 0.85,
         ['Take charge.', 'Have a strong personality.', 'Know how to captivate people.', 'See myself as a good leader.', 'Can talk others into doing things.', 'Am the first to act.'],
         ['Do not have an assertive personality.', 'Lack the talent for influencing people.', 'Wait for others to lead the way.', 'Hold back my opinions.']),
    ]),
    ('O', 'Openness/Intellect', 0.85, [
        ('OI', 'Intellect', 0.84,
         ['Am quick to understand things.', 'Can handle a lot of information.', 'Like to solve complex problems.', 'Have a rich vocabulary.', 'Think quickly.', 'Formulate ideas clearly.'],
         ['Have difficulty understanding abstract ideas.', 'Avoid philosophical discussions.', 'Avoid difficult reading material.', 'Learn things slowly.']),
        ('OO', 'Openness', 0.78,
         ['Enjoy the beauty of nature.', 'Believe in the importance of art.', 'Love to reflect on things.', 'Get deeply immersed in music.', 'See beauty in things that others might not notice.', 'Need a creative outlet.'],
         ['Do not like poetry.', 'Seldom get lost in thought.', 'Seldom daydream.', 'Seldom notice the emotional aspects of paintings and pictures.']),
    ]),
]

scales, reliability, per_aspect = [], {}, []
for did, dname, dalpha, aspects in ASPECTS:
    scales.append({'id': did, 'name': dname, 'facets': [a[0] for a in aspects]})
    reliability[did] = dalpha
for did, _, _, aspects in ASPECTS:
    for aid, aname, aalpha, plus, minus in aspects:
        scales.append({'id': aid, 'name': aname, 'parent': did})
        reliability[aid] = aalpha
        per_aspect.append((aid, [(t, 1) for t in plus] + [(t, -1) for t in minus]))

items, n = [], 1
for row in zip_longest(*[a[1] for a in per_aspect]):
    for (aid, _), it in zip(per_aspect, row):
        if it is None:
            continue
        text, key = it
        items.append({'n': n, 'text': text, 'scale': aid, 'key': key})
        n += 1

inst = {
    'id': 'ipip-bfas',
    'version': 1,
    'name': 'Big Five Aspect Scales',
    'shortName': 'BFAS',
    'items_note': 'Items copied character for character from https://ipip.ori.org/BFASKeys.htm, 10 November 2026, including its curly apostrophes and quotation marks and "other’s" in "Can’t be bothered with other’s needs." Footnote letters a to d on the key page, which mark four items not given to the Eugene-Springfield sample, are not part of the items. The key page lists items by aspect without an administration order; the items here are interleaved across the ten aspects in round-robin order, +keyed items of each aspect first.',
    'source': {
        'paper': 'DeYoung, C. G., Quilty, L. C., & Peterson, J. B. (2007). Between facets and domains: 10 aspects of the Big Five. Journal of Personality and Social Psychology, 93(5), 880-896',
        'doi': '10.1037/0022-3514.93.5.880',
        'keyUrl': 'https://ipip.ori.org/BFASKeys.htm',
        'scoringUrl': 'https://ipip.ori.org/newScoringInstructions.htm',
        'accessed': '2026-11-10',
    },
    'licence': {
        'text': 'Public domain (IPIP). Permission is granted automatically for any person to use IPIP items for any purpose, commercial or non-commercial.',
        'url': 'https://ipip.ori.org/newPermission.htm',
        'credit': 'International Personality Item Pool, https://ipip.ori.org/',
    },
    'instructions': 'Describe yourself as you generally are now, not as you wish to be in the future. Describe yourself as you honestly see yourself, in relation to other people you know of the same sex as you are, and roughly your same age.',
    'response': {'type': 'likert', 'points': 5, 'labels': ['Very Inaccurate', 'Moderately Inaccurate', 'Neither Accurate Nor Inaccurate', 'Moderately Accurate', 'Very Accurate']},
    'scales': scales,
    'items': items,
    'scoring': {'method': 'sum', 'reverse': 'points+1-x'},
    'norms': None,
    'reliability': reliability,
    'reliabilitySource': 'Coefficient alpha for each 10-item aspect scale and each combined 20-item domain scale from the IPIP table for the Big Five Aspect Scales, https://ipip.ori.org/BFASTable.htm, accessed 10 November 2026. The table gives no sample size; the key page notes that four items (two politeness, one enthusiasm, one assertiveness) were not given to the Eugene-Springfield sample.',
}
out = 'packages/instruments/data/ipip-bfas.json'
with open(out, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(inst, f, indent='\t', ensure_ascii=False)
    f.write('\n')
print('wrote', out, len(items), 'items')
