"""Generate packages/instruments/data/norms/ipip-neo-120.json from Johnson's
public IPIP-NEO-120 dataset.

Input: data-raw/osf-ipip-neo/IPIP120.dat (OSF component wxvth), fixed width
per DAT120.doc: CASE 1-6, SEX 7, AGE 8-9, SEC 10-11, MIN 12-13, HOUR 14-15,
DAY 16-17, MONTH 18-19, YEAR 20-22, COUNTRY 23-31 (A9), I1..I120 at 32-151,
one digit each, 0 = missing. Reverse-scored items were recoded at the time
of completion, so scale scores are plain sums of the stored values.

Rows with any missing item are dropped. Groups: everyone, five age bands,
and the United Kingdom by the COUNTRY field. Counts are per possible raw
score for each of the 35 scales (5 domains of 24 items, 30 facets of 4).
Cronbach's alpha per scale is computed from the same rows and recorded under
"computed", separately from the published figures in the instrument file.

Usage: python -I scripts/norms/ipip-neo-120.py <path-to-IPIP120.dat>
"""
import hashlib
import json
import sys
from collections import Counter, defaultdict
from datetime import date

path = sys.argv[1]
instrument = json.load(open('packages/instruments/data/ipip-neo-120.json', encoding='utf-8'))

# Which item positions (1-based) belong to each scale, from the instrument file.
facet_items = defaultdict(list)
for it in instrument['items']:
    facet_items[it['scale']].append(it['n'])
domain_items = {}
for s in instrument['scales']:
    if s.get('facets'):
        domain_items[s['id']] = [n for f in s['facets'] for n in facet_items[f]]
scales = {**{d: v for d, v in domain_items.items()}, **facet_items}
for sid, ns in scales.items():
    assert len(ns) in (4, 24), (sid, len(ns))

AGE_BANDS = [('age-18-24', 18, 24), ('age-25-34', 25, 34), ('age-35-44', 35, 44), ('age-45-54', 45, 54), ('age-55-plus', 55, 99)]
UK_LABELS = {'UK', 'United Ki', 'U.K.', 'England', 'Scotland', 'Wales', 'Northern'}

groups = {'all': 'Everyone in the sample'}
for g, lo, hi in AGE_BANDS:
    groups[g] = f'Aged {lo} to {hi}' if hi < 99 else f'Aged {lo} and over'
groups['uk'] = 'United Kingdom'

counts = {g: {sid: Counter() for sid in scales} for g in groups}
n_by_group = Counter()
# For alpha: per scale, sums and sums of squares of each item and of the total.
item_sum = {sid: [0.0] * len(ns) for sid, ns in scales.items()}
item_sq = {sid: [0.0] * len(ns) for sid, ns in scales.items()}
tot_sum = {sid: 0.0 for sid in scales}
tot_sq = {sid: 0.0 for sid in scales}
countries = Counter()
dropped = 0
total_rows = 0

sha = hashlib.sha256()
with open(path, 'rb') as f:
    for raw in f:
        sha.update(raw)
        line = raw.decode('ascii', errors='replace').rstrip('\r\n')
        if len(line) < 151:
            dropped += 1
            continue
        total_rows += 1
        items = line[31:151]
        if '0' in items or not items.isdigit():
            dropped += 1
            continue
        vals = [int(c) for c in items]
        age = int(line[7:9]) if line[7:9].strip().isdigit() else 0
        country = line[22:31].strip()
        countries[country] += 1
        member = ['all']
        for g, lo, hi in AGE_BANDS:
            if lo <= age <= hi:
                member.append(g)
        if country in UK_LABELS or country.startswith('United K'):
            member.append('uk')
        for g in member:
            n_by_group[g] += 1
        for sid, ns in scales.items():
            score = 0
            for k, n in enumerate(ns):
                v = vals[n - 1]
                score += v
                item_sum[sid][k] += v
                item_sq[sid][k] += v * v
            tot_sum[sid] += score
            tot_sq[sid] += score * score
            for g in member:
                counts[g][sid][score] += 1

n_all = n_by_group['all']


def alpha(sid):
    ns = scales[sid]
    k = len(ns)
    n = n_all
    var_items = sum((item_sq[sid][i] / n) - (item_sum[sid][i] / n) ** 2 for i in range(k))
    var_total = (tot_sq[sid] / n) - (tot_sum[sid] / n) ** 2
    return round(k / (k - 1) * (1 - var_items / var_total), 3)


table = {
    'instrument': instrument['id'],
    'version': instrument['version'],
    'source': {
        'name': 'Johnson, J. A. IPIP-NEO-120 public dataset (IPIP120.dat), OSF component wxvth of osf.io/tbmh5',
        'url': 'https://osf.io/wxvth/',
        'inputSha256': sha.hexdigest(),
        'generated': date.today().isoformat(),
        'script': 'scripts/norms/ipip-neo-120.py',
        'notes': (
            f'{total_rows} rows read; {dropped} dropped for a missing item response (coded 0) or a short line; '
            f'{n_all} kept. Age bands use the AGE field; the UK group uses the COUNTRY field. '
            'No licence is stated on the OSF component; the data are the public dataset the IPIP-NEO-120 paper describes.'
        ),
    },
    'computed': {
        'alpha': {sid: alpha(sid) for sid in scales},
        'note': f'Cronbach\'s alpha from the {n_all} complete rows, computed by the generating script. Published facet alphas are in the instrument file.',
    },
    'groups': {},
}

for g, label in groups.items():
    gs = {}
    for sid, ns in scales.items():
        lo, hi = len(ns), len(ns) * 5
        c = counts[g][sid]
        gs[sid] = {'min': lo, 'counts': [c.get(s, 0) for s in range(lo, hi + 1)]}
    table['groups'][g] = {'label': label, 'n': n_by_group[g], 'scales': gs}

out = 'packages/instruments/data/norms/ipip-neo-120.json'
with open(out, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(table, f, separators=(',', ':'))
    f.write('\n')
print('wrote', out)
print('rows', total_rows, 'dropped', dropped, 'kept', n_all)
print('groups', dict(n_by_group))
print('top countries', countries.most_common(12))
print('alpha', table['computed']['alpha'])
