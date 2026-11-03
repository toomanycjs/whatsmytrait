"""Generate packages/instruments/data/norms/ipip-50.json from the Open-Source
Psychometrics Project's IPIP Big-Five Factor Markers dataset.

Input: data-raw/openpsychometrics-ipip-ffm/IPIP-FFM-data-8Nov2018.zip, whose
data-final.csv (tab separated) has the 50 items as EXT1..EXT10, EST1..EST10,
AGR1..AGR10, CSN1..CSN10, OPN1..OPN10, raw responses 1 to 5 (0 = missing),
plus timing, IPC (records from the same IP address) and country columns.

The codebook says the items were shown as "I am the life of the party."
etc. in the order EXT1, AGR1, CSN1, EST1, OPN1, EXT2, ... (the IPIP 50-item
administration order), rated on a scale labelled 1 = Disagree, 3 = Neutral,
5 = Agree. The site presents the same items with the IPIP labels (Very
Inaccurate to Very Accurate), so these norms are from the same items on a
differently labelled scale; the methodology page says so.

Rows are kept only when all 50 responses are 1 to 5 and IPC is 1. Items are
keyed with the instrument file's keys (the dataset stores raw responses).
Groups: everyone, United Kingdom and United States by the country column.

Usage: python -I scripts/norms/ipip-50.py <path-to-zip>
"""
import csv
import hashlib
import io
import json
import sys
import zipfile
from collections import Counter
from datetime import date

path = sys.argv[1]
instrument = json.load(open('packages/instruments/data/ipip-50.json', encoding='utf-8'))
POINTS = instrument['response']['points']

# Dataset column for each instrument item: item n is factor (n-1) % 5 in the
# order EXT, AGR, CSN, EST, OPN, and number ceil(n / 5) within that factor.
PREFIX = {'E': 'EXT', 'A': 'AGR', 'C': 'CSN', 'S': 'EST', 'I': 'OPN'}
ORDER = ['E', 'A', 'C', 'S', 'I']
column_of = {}
for it in instrument['items']:
    n = it['n']
    factor = ORDER[(n - 1) % 5]
    assert factor == it['scale'], (n, factor, it['scale'])
    column_of[n] = f"{PREFIX[factor]}{(n - 1) // 5 + 1}"

scale_items = {s['id']: [it for it in instrument['items'] if it['scale'] == s['id']] for s in instrument['scales']}

groups = {'all': 'Everyone in the sample', 'gb': 'United Kingdom', 'us': 'United States'}
counts = {g: {sid: Counter() for sid in scale_items} for g in groups}
n_by_group = Counter()
item_sum = {sid: [0.0] * 10 for sid in scale_items}
item_sq = {sid: [0.0] * 10 for sid in scale_items}
tot_sum = {sid: 0.0 for sid in scale_items}
tot_sq = {sid: 0.0 for sid in scale_items}
total_rows = 0
dropped_missing = 0
dropped_ipc = 0

sha = hashlib.sha256(open(path, 'rb').read()).hexdigest()
z = zipfile.ZipFile(path)
with z.open('IPIP-FFM-data-8Nov2018/data-final.csv') as raw:
    reader = csv.DictReader(io.TextIOWrapper(raw, encoding='utf-8', errors='replace'), delimiter='\t')
    for row in reader:
        total_rows += 1
        if row.get('IPC', '').strip() != '1':
            dropped_ipc += 1
            continue
        try:
            responses = {n: int(row[col]) for n, col in column_of.items()}
        except (ValueError, KeyError):
            dropped_missing += 1
            continue
        if any(v < 1 or v > POINTS for v in responses.values()):
            dropped_missing += 1
            continue
        country = row.get('country', '').strip()
        member = ['all']
        if country == 'GB':
            member.append('gb')
        if country == 'US':
            member.append('us')
        for g in member:
            n_by_group[g] += 1
        for sid, items in scale_items.items():
            score = 0
            for k, it in enumerate(items):
                x = responses[it['n']]
                v = x if it['key'] == 1 else POINTS + 1 - x
                score += v
                item_sum[sid][k] += v
                item_sq[sid][k] += v * v
            tot_sum[sid] += score
            tot_sq[sid] += score * score
            for g in member:
                counts[g][sid][score] += 1

n_all = n_by_group['all']


def alpha(sid):
    k = 10
    n = n_all
    var_items = sum((item_sq[sid][i] / n) - (item_sum[sid][i] / n) ** 2 for i in range(k))
    var_total = (tot_sq[sid] / n) - (tot_sum[sid] / n) ** 2
    return round(k / (k - 1) * (1 - var_items / var_total), 3)


table = {
    'instrument': instrument['id'],
    'version': instrument['version'],
    'source': {
        'name': 'Open-Source Psychometrics Project, IPIP Big-Five Factor Markers responses (IPIP-FFM-data-8Nov2018.zip), 1,015,342 responses collected 2016 to 2018',
        'url': 'https://openpsychometrics.org/_rawdata/',
        'inputSha256': sha,
        'generated': date.today().isoformat(),
        'script': 'scripts/norms/ipip-50.py',
        'notes': (
            f'{total_rows} rows read; {dropped_ipc} dropped because more than one record came from the same IP address (IPC not 1); '
            f'{dropped_missing} dropped for a response outside 1 to 5; {n_all} kept. '
            'The dataset presented the same 50 items with an "I" prefix on a scale labelled 1 = Disagree, 3 = Neutral, 5 = Agree, '
            'not the IPIP accuracy labels the site uses. The country groups use the dataset\'s technically determined country column. '
            'No age is recorded. The dataset page states that all data are anonymous and released for general public edification.'
        ),
    },
    'computed': {
        'alpha': {sid: alpha(sid) for sid in scale_items},
        'note': f'Cronbach\'s alpha from the {n_all} kept rows, computed by the generating script. Published alphas are in the instrument file.',
    },
    'groups': {},
}
for g, label in groups.items():
    gs = {}
    for sid in scale_items:
        c = counts[g][sid]
        gs[sid] = {'min': 10, 'counts': [c.get(s, 0) for s in range(10, 51)]}
    table['groups'][g] = {'label': label, 'n': n_by_group[g], 'scales': gs}

out = 'packages/instruments/data/norms/ipip-50.json'
with open(out, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(table, f, separators=(',', ':'))
    f.write('\n')
print('wrote', out)
print('rows', total_rows, 'dropped ipc', dropped_ipc, 'dropped missing', dropped_missing, 'kept', n_all)
print('groups', dict(n_by_group))
print('alpha', table['computed']['alpha'])
