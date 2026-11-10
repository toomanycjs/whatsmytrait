"""Write packages/instruments/data/ipip-16-factor.json, the sixteen IPIP scales
measuring constructs similar to those in Cattell's 16 Personality Factor
Questionnaire.

Items are read row by row from https://ipip.ori.org/new16PFKey.htm, saved on
10 November 2026 as docs/sources/ipip/new16PFKey.htm: each scale heading is
followed by a small table, one item per row, with "+ keyed" or "- keyed" in
the left cell where the keying changes. The script checks every scale's item
count and keying against the IPIP comparison table (new16PFTable.htm, saved
alongside), which also gives the alphas: 501 adults in the Eugene-Springfield
Community Sample.

The key page gives no administration order, so the 163 items are interleaved
across the sixteen scales in round-robin order, +keyed items of each scale
first.

Usage: python -I scripts/instruments/build-16-factor.py
"""
import html
import json
import re
from itertools import zip_longest

SRC = 'docs/sources/ipip/new16PFKey.htm'

# (id, anchor name on the key page (not always the heading; unused), site name, IPIP name as published, Cattell factor, +keyed, -keyed, IPIP alpha)
SCALES = [
    ('A', 'Warmth', 'Warmth', 'Warmth', 'Warmth (A)', 7, 3, 0.80),
    ('B', 'Intellect', 'Intellect', 'Intellect', 'Reasoning (B)', 8, 5, 0.76),
    ('C', 'Emotional-Stability', 'Emotional stability', 'Emotional Stability', 'Emotional Stability (C)', 5, 5, 0.85),
    ('E', 'Assertiveness', 'Assertiveness', 'Assertiveness', 'Dominance (E)', 6, 4, 0.81),
    ('F', 'Gregariousness', 'Gregariousness', 'Gregariousness', 'Liveliness (F)', 6, 4, 0.78),
    ('G', 'Dutifulness', 'Dutifulness', 'Dutifulness', 'Rule-Consciousness (G)', 5, 5, 0.84),
    ('H', 'Friendliness', 'Friendliness', 'Friendliness', 'Social Boldness (H)', 5, 5, 0.80),
    ('I', 'Sensitivity', 'Sensitivity', 'Sensitivity', 'Sensitivity (I)', 6, 4, 0.73),
    ('L', 'Trust', 'Distrust', 'Distrust', 'Vigilance (L)', 6, 4, 0.80),
    ('M', 'Imagination', 'Imagination', 'Imagination', 'Abstractedness (M)', 7, 3, 0.80),
    ('N', 'Reserve', 'Reserve', 'Reserve', 'Privateness (N)', 5, 5, 0.86),
    ('O', 'Self-Esteem', 'Worry', 'Anxiety', 'Apprehension (O)', 7, 3, 0.80),
    ('Q1', 'Complexity', 'Complexity', 'Complexity', 'Openness to Change (Q1)', 5, 5, 0.82),
    ('Q2', 'Sociability', 'Introversion', 'Introversion', 'Self-Reliance (Q2)', 7, 3, 0.73),
    ('Q3', 'Orderliness', 'Orderliness', 'Orderliness', 'Perfectionism (Q3)', 5, 5, 0.81),
    ('Q4', 'Calmness', 'Emotionality', 'Emotionality', 'Tension (Q4)', 7, 3, 0.76),
]


def text(cell):
    t = re.sub(r'<[^>]+>', ' ', cell)
    t = html.unescape(t).replace('\xa0', ' ')
    return re.sub(r'\s+', ' ', t).strip()


raw = open(SRC, 'rb').read().decode('cp1252')
# Split the page at each scale heading: <font size="4">NAME</font> (Factor X: ...).
# (Not at the <a name> anchors: the last heading has none before it.)
starts = [(m.start(), m.group(1).strip()) for m in re.finditer(r'<font size="4">(?:<a name="[^"]*"></a>)?([A-Z][A-Z ]+)</font>\s*\((?:16PF\s+)?Factor', raw)]
chunks = {}
for k, (pos, name) in enumerate(starts):
    end = starts[k + 1][0] if k + 1 < len(starts) else len(raw)
    chunks[name] = raw[pos:end]
assert len(chunks) == 16, list(chunks)

items_by = {}
for sid, anchor, name, pub, *_ in SCALES:
    chunk = chunks[pub.upper()]
    key, its = None, []
    for left, right in re.findall(r'<tr>\s*<td[^>]*>(.*?)</td>\s*<td[^>]*>(.*?)</td>\s*</tr>', chunk, re.S):
        l, r = text(left), text(right)
        if re.match(r'^\+\s*keyed', l):
            key = 1
        elif re.match(r'^[-–−]\s*keyed', l):
            key = -1
        if r and key is not None:
            its.append((r, key))
    items_by[sid] = its

scales, reliability = [], {}
for sid, _, name, pub, cattell, plus, minus, alpha in SCALES:
    its = items_by[sid]
    got = (sum(1 for _, k in its if k > 0), sum(1 for _, k in its if k < 0))
    assert got == (plus, minus), (sid, got, (plus, minus), its)
    scales.append({'id': sid, 'name': name, 'publishedName': f'{pub.upper()} (Factor {cattell})'})
    reliability[sid] = alpha

order = [s[0] for s in SCALES]
items, n = [], 1
for row in zip_longest(*[items_by[sid] for sid in order]):
    for sid, it in zip(order, row):
        if it is None:
            continue
        items.append({'n': n, 'text': it[0], 'scale': sid, 'key': it[1]})
        n += 1

inst = {
    'id': 'ipip-16-factor',
    'version': 1,
    'name': 'IPIP 16-factor scales',
    'shortName': 'IPIP 16PF',
    'items_note': 'Items read row by row from https://ipip.ori.org/new16PFKey.htm, 10 November 2026 (saved in docs/sources/ipip/), by scripts/instruments/build-16-factor.py, which checks each scale\'s count of +keyed and -keyed items against the IPIP comparison table. The key page gives no administration order; the items here are interleaved across the sixteen scales in round-robin order, +keyed items of each scale first. The scale published under the name of an apprehension-type trait (Factor O) is shown as Worry, following docs/decisions/0003; published names are kept in publishedName.',
    'source': {
        'paper': "IPIP scales measuring constructs similar to those in Cattell's 16 Personality Factor Questionnaire (Conn & Rieke, 1994), International Personality Item Pool",
        'keyUrl': 'https://ipip.ori.org/new16PFKey.htm',
        'itemsUrl': 'https://ipip.ori.org/new16PFTable.htm',
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
    'reliabilitySource': 'Coefficient alpha of each IPIP scale from the IPIP comparison table, https://ipip.ori.org/new16PFTable.htm, accessed 10 November 2026: 501 adults in the Eugene-Springfield Community Sample. The key page gives the same figures.',
}
out = 'packages/instruments/data/ipip-16-factor.json'
with open(out, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(inst, f, indent='\t', ensure_ascii=False)
    f.write('\n')
print('wrote', out, len(items), 'items')
