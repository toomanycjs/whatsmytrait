"""Write packages/instruments/data/ipip-neo-120.json from Johnson's item key.

Input: data-raw/osf-ipip-neo/IPIP-NEO-ItemKey.xls (OSF component ycvdk,
"Scoring Key for the IPIP-NEO-300 and IPIP-NEO-120"). The sheet lists the 300
items with Full#, Short# (the 120-item number, blank for items not in the
120), Sign (+N1 or -N1), Key (facet code), Facet (name) and Item (text).
Items are copied from the sheet character for character; the facet alphas
come from the IPIP key page and are typed in below with their source.

Usage: python -I scripts/instruments/ipip-neo-120-from-key.py <path-to-xls>
"""
import hashlib
import json
import sys

import pandas as pd

xls = sys.argv[1]
df = pd.read_excel(xls, header=0)
df = df[df['Short#'].notna()].copy()
df['Short#'] = df['Short#'].astype(int)
df = df.sort_values('Short#')
assert len(df) == 120, len(df)
assert list(df['Short#']) == list(range(1, 121))

DOMAINS = {
    'N': 'Neuroticism',
    'E': 'Extraversion',
    'O': 'Openness to experience',
    'A': 'Agreeableness',
    'C': 'Conscientiousness',
}

# Coefficient alpha per facet from https://ipip.ori.org/30FacetNEO-PI-RItems.htm
# (internet sample, N = 619,150), accessed 3 November 2026.
ALPHA = {
    'N1': 0.78, 'N2': 0.87, 'N3': 0.85, 'N4': 0.70, 'N5': 0.69, 'N6': 0.76,
    'E1': 0.81, 'E2': 0.79, 'E3': 0.85, 'E4': 0.69, 'E5': 0.73, 'E6': 0.79,
    'O1': 0.74, 'O2': 0.74, 'O3': 0.65, 'O4': 0.70, 'O5': 0.73, 'O6': 0.63,
    'A1': 0.85, 'A2': 0.74, 'A3': 0.73, 'A4': 0.71, 'A5': 0.73, 'A6': 0.72,
    'C1': 0.77, 'C2': 0.83, 'C3': 0.67, 'C4': 0.79, 'C5': 0.71, 'C6': 0.88,
}

facets = {}
items = []
for _, r in df.iterrows():
    code = str(r['Key']).strip()
    sign = str(r['Sign']).strip()[0]
    assert sign in '+-', sign
    assert code[0] in DOMAINS and code[1:].isdigit(), code
    text = str(r['Item']).strip()
    facets.setdefault(code, str(r['Facet']).strip())
    items.append({'n': int(r['Short#']), 'text': text, 'scale': code, 'key': 1 if sign == '+' else -1})

# One item differs by a word between the spreadsheet and the IPIP key page
# (https://ipip.ori.org/30FacetNEO-PI-RItems.htm, checked 3 November 2026):
# the spreadsheet has "right or wrong", the key page "right and wrong". The
# instrument file cites the key page as its key, so the key page wording is used.
VARIANTS = {'Believe that there is no absolute right or wrong.': 'Believe that there is no absolute right and wrong.'}
for it in items:
    if it['text'] in VARIANTS:
        it['text'] = VARIANTS[it['text']]

assert len(facets) == 30
for code in facets:
    assert sum(1 for it in items if it['scale'] == code) == 4, code

scales = []
for d, name in DOMAINS.items():
    scales.append({'id': d, 'name': name, 'facets': [f'{d}{i}' for i in range(1, 7)]})
for d in DOMAINS:
    for i in range(1, 7):
        code = f'{d}{i}'
        scales.append({'id': code, 'name': facets[code], 'parent': d})

sha = hashlib.sha256(open(xls, 'rb').read()).hexdigest()

instrument = {
    'id': 'ipip-neo-120',
    'version': 1,
    'name': 'IPIP-NEO-120',
    'shortName': 'IPIP-NEO-120',
    'items_note': (
        'Items copied character for character from Johnson\'s IPIP-NEO-ItemKey.xls '
        '(OSF component ycvdk, sha256 ' + sha + ') by scripts/instruments/ipip-neo-120-from-key.py '
        'on 3 November 2026, in the Short# administration order. Facet names are the authors\' own. '
        'One item (O6, item 58) reads "right or wrong" in the spreadsheet and "right and wrong" on the IPIP key page; the key page wording is used. '
        'tests/ipip-neo-120.test.ts asserts the file against the key page.'
    ),
    'source': {
        'paper': 'Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. Journal of Research in Personality, 51, 78-89',
        'doi': '10.1016/j.jrp.2014.05.003',
        'keyUrl': 'https://ipip.ori.org/30FacetNEO-PI-RItems.htm',
        'itemsUrl': 'https://osf.io/ycvdk/',
        'scoringUrl': 'https://ipip.ori.org/newScoringInstructions.htm',
        'accessed': '2026-11-03',
    },
    'licence': {
        'text': 'Public domain (IPIP). Permission is granted automatically for any person to use IPIP items for any purpose, commercial or non-commercial.',
        'url': 'https://ipip.ori.org/newPermission.htm',
        'credit': 'International Personality Item Pool, https://ipip.ori.org/; IPIP-NEO-120 by John A. Johnson',
    },
    'instructions': 'Describe yourself as you generally are now, not as you wish to be in the future. Describe yourself as you honestly see yourself, in relation to other people you know of the same sex as you are, and roughly your same age.',
    'response': {
        'type': 'likert',
        'points': 5,
        'labels': ['Very Inaccurate', 'Moderately Inaccurate', 'Neither Accurate Nor Inaccurate', 'Moderately Accurate', 'Very Accurate'],
    },
    'scales': scales,
    'items': items,
    'scoring': {'method': 'sum', 'reverse': 'points+1-x'},
    'norms': {
        'source': 'Johnson IPIP-NEO-120 public dataset, OSF component wxvth (IPIP120.dat, N = 619,150)',
        'groups': ['all', 'age-18-24', 'age-25-34', 'age-35-44', 'age-45-54', 'age-55-plus', 'uk'],
        'file': 'norms/ipip-neo-120.json',
    },
    'reliability': ALPHA,
    'reliabilitySource': 'Coefficient alpha per facet from the IPIP key page (https://ipip.ori.org/30FacetNEO-PI-RItems.htm, internet sample N = 619,150), accessed 3 November 2026. The key page gives no domain alphas; the norms file records domain alphas computed from the same public dataset by scripts/norms/ipip-neo-120.py.',
}

out = 'packages/instruments/data/ipip-neo-120.json'
with open(out, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(instrument, f, indent='\t', ensure_ascii=False)
    f.write('\n')
print('wrote', out, len(items), 'items,', len(scales), 'scales')
