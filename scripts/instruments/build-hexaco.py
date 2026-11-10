"""Write packages/instruments/data/ipip-hexaco.json, the IPIP-HEXACO scales.

Items are read row by row from the IPIP-HEXACO scoring key page,
https://ipip.ori.org/newHEXACO_PI_key.htm, saved on 10 November 2026 as
docs/sources/ipip/newHEXACO_PI_key.htm: each row holds one item, and the left
cell says "+ keyed" or "- keyed" where the keying changes. Every facet must
come out with exactly ten items, or the script stops.

Alphas are the IPIP scales' own, from the comparison table,
https://ipip.ori.org/newHEXACO_PI_table.htm (saved alongside). The bracketed
alpha beside each facet on the key page belongs to the HEXACO-PI scale, not
to these items. Domain alphas in the table are for each domain's 40 facet
items; the key page has no separate domain scales.

The key page gives no administration order, so the 240 items are interleaved
across the 24 facets in round-robin order, +keyed items of each facet first.

Usage: python -I scripts/instruments/build-hexaco.py
"""
import html
import json
import re
from itertools import zip_longest

SRC = 'docs/sources/ipip/newHEXACO_PI_key.htm'

# (domain id, site name, published name, IPIP alpha, [(facet id, abbreviation, site name, published name, IPIP alpha)])
DOMAINS = [
    ('HH', 'Honesty-humility', 'Honesty-Humility', 0.90, [
        ('HH1', 'H:Sinc', 'Sincerity', 'Sincerity', 0.76),
        ('HH2', 'H:Fair', 'Fairness', 'Fairness', 0.79),
        ('HH3', 'H:Gree', 'Greed avoidance', 'Greed Avoidance', 0.79),
        ('HH4', 'H:Mode', 'Modesty', 'Modesty', 0.81),
    ]),
    ('EM', 'Emotionality', 'Emotionality', 0.87, [
        ('EM1', 'E:Fear', 'Fearfulness', 'Fearfulness', 0.78),
        ('EM2', 'E:Anxi', 'Worry', 'Anxiety', 0.80),
        ('EM3', 'E:Depe', 'Dependence', 'Dependence', 0.77),
        ('EM4', 'E:Sent', 'Sentimentality', 'Sentimentality', 0.80),
    ]),
    ('EX', 'Extraversion', 'Extraversion', 0.91, [
        ('EX1', 'X:Expr', 'Expressiveness', 'Expressiveness', 0.84),
        ('EX2', 'X:SocB', 'Social boldness', 'Social Boldness', 0.85),
        ('EX3', 'X:Soci', 'Sociability', 'Sociability', 0.79),
        ('EX4', 'X:Live', 'Liveliness', 'Liveliness', 0.79),
    ]),
    ('AG', 'Agreeableness', 'Agreeableness', 0.89, [
        ('AG1', 'A:Forg', 'Forgiveness', 'Forgiveness', 0.82),
        ('AG2', 'A:Gent', 'Gentleness', 'Gentleness', 0.78),
        ('AG3', 'A:Flex', 'Flexibility', 'Flexibility', 0.67),
        ('AG4', 'A:Pati', 'Patience', 'Patience', 0.80),
    ]),
    ('CO', 'Conscientiousness', 'Conscientiousness', 0.88, [
        ('CO1', 'C:Orga', 'Organisation', 'Organization', 0.88),
        ('CO2', 'C:Dili', 'Diligence', 'Diligence', 0.79),
        ('CO3', 'C:Perf', 'Perfectionism', 'Perfectionism', 0.72),
        ('CO4', 'C:Prud', 'Prudence', 'Prudence', 0.77),
    ]),
    ('OP', 'Openness to experience', 'Openness to Experience', 0.90, [
        ('OP1', 'O:AesA', 'Aesthetic appreciation', 'Aesthetic Appreciation', 0.80),
        ('OP2', 'O:Inqu', 'Inquisitiveness', 'Inquisitiveness', 0.78),
        ('OP3', 'O:Crea', 'Creativity', 'Creativity', 0.80),
        ('OP4', 'O:Unco', 'Unconventionality', 'Unconventionality', 0.79),
    ]),
]
ABBR = {f[1]: f[0] for _, _, _, _, fs in DOMAINS for f in fs}


def cell_text(cell):
    t = re.sub(r'<[^>]+>', ' ', cell)
    t = html.unescape(t).replace('\xa0', ' ')
    return re.sub(r'\s+', ' ', t).strip()


raw = open(SRC, 'rb').read().decode('cp1252')
by_facet = {fid: [] for fid in ABBR.values()}
facet, key = None, None
for row in re.findall(r'<tr[^>]*>(.*?)</tr>', raw, re.S):
    cells = [cell_text(c) for c in re.findall(r'<td[^>]*>(.*?)</td>', row, re.S)]
    whole = ' '.join(cells)
    m = re.search(r'\(([HEXACO]:[A-Za-z]+)\)', whole)
    if m and 'Alpha' in whole:
        facet, key = ABBR[m.group(1)], None
        continue
    if facet is None or len(cells) < 2:
        continue
    left, right = cells[0], cells[-1]
    if re.match(r'^\+\s*keyed', left):
        key = 1
    elif re.match(r'^[-–−]\s*keyed', left):
        key = -1
    if right and key is not None and not re.search(r'\([HEXACO] \)|^Facets$', right):
        by_facet[facet].append((right, key))
    if re.search(r'\([HEXACO] \)', whole):
        facet, key = None, None  # a domain heading row ends the previous facet

for fid, its in by_facet.items():
    assert len(its) == 10, (fid, len(its), its)

scales, reliability = [], {}
for did, name, pub, alpha, fs in DOMAINS:
    scales.append({'id': did, 'name': name, 'publishedName': pub, 'facets': [f[0] for f in fs]})
    reliability[did] = alpha
for did, _, _, _, fs in DOMAINS:
    for fid, abbr, name, pub, alpha in fs:
        scales.append({'id': fid, 'name': name, 'publishedName': f'{pub} ({abbr})', 'parent': did})
        reliability[fid] = alpha

order = [fid for _, _, _, _, fs in DOMAINS for fid, *_ in fs]
items, n = [], 1
for row in zip_longest(*[sorted(by_facet[f], key=lambda x: -x[1]) for f in order]):
    for fid, it in zip(order, row):
        if it is None:
            continue
        items.append({'n': n, 'text': it[0], 'scale': fid, 'key': it[1]})
        n += 1

inst = {
    'id': 'ipip-hexaco',
    'version': 1,
    'name': 'IPIP-HEXACO',
    'shortName': 'IPIP-HEXACO',
    'items_note': 'Items read row by row from https://ipip.ori.org/newHEXACO_PI_key.htm, 10 November 2026 (saved in docs/sources/ipip/), by scripts/instruments/build-hexaco.py, which checks that every facet has ten items. The key page gives no administration order; the items here are interleaved across the 24 facets in round-robin order, +keyed items of each facet first. Site names: Worry for the second emotionality facet (docs/decisions/0003) and British spelling for Organisation; the published names are kept in publishedName.',
    'source': {
        'paper': 'Ashton, M. C., Lee, K., & Goldberg, L. R. (2007). The IPIP-HEXACO scales: An alternative, public-domain measure of the personality constructs in the HEXACO model. Personality and Individual Differences, 42(8), 1515-1526',
        'doi': '10.1016/j.paid.2006.10.027',
        'keyUrl': 'https://ipip.ori.org/newHEXACO_PI_key.htm',
        'itemsUrl': 'https://ipip.ori.org/newHEXACO_PI_table.htm',
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
    'reliabilitySource': 'Coefficient alpha of each IPIP scale from the IPIP comparison table for the IPIP-HEXACO scales, https://ipip.ori.org/newHEXACO_PI_table.htm, accessed 10 November 2026. Domain figures are for each domain scored from its four facets (40 items). The table gives no sample size. The bracketed alpha beside each facet on the scoring key page belongs to the published inventory, not to these items.',
}
out = 'packages/instruments/data/ipip-hexaco.json'
with open(out, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(inst, f, indent='\t', ensure_ascii=False)
    f.write('\n')
print('wrote', out, len(items), 'items')
