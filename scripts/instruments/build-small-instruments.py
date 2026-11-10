"""Write the smaller first-release instrument files from their published keys.

Every item below was copied character for character from the page named in
each instrument's source on 3 November 2026. Where a key page lists items by
scale without an administration order, the items are interleaved across the
scales in round-robin order (the usual IPIP practice) and the file says so.

Usage: python -I scripts/instruments/build-small-instruments.py
"""
import json
from itertools import zip_longest

IPIP_LICENCE = {
    'text': 'Public domain (IPIP). Permission is granted automatically for any person to use IPIP items for any purpose, commercial or non-commercial.',
    'url': 'https://ipip.ori.org/newPermission.htm',
    'credit': 'International Personality Item Pool, https://ipip.ori.org/',
}
IPIP_LABELS = ['Very Inaccurate', 'Moderately Inaccurate', 'Neither Accurate Nor Inaccurate', 'Moderately Accurate', 'Very Accurate']
IPIP_INSTRUCTIONS = 'Describe yourself as you generally are now, not as you wish to be in the future. Describe yourself as you honestly see yourself, in relation to other people you know of the same sex as you are, and roughly your same age.'
ACCESSED = '2026-11-03'
INTERLEAVED = 'The key page lists items by scale without an administration order; the items here are interleaved across the scales in round-robin order.'


def interleave(scales):
    """scales: list of (scale_id, [(text, key), ...]) -> items in round-robin order."""
    items = []
    n = 1
    for row in zip_longest(*[s[1] for s in scales]):
        for (sid, _), it in zip(scales, row):
            if it is None:
                continue
            text, key = it
            items.append({'n': n, 'text': text, 'scale': sid, 'key': key})
            n += 1
    return items


def plus_minus(plus, minus):
    return [(t, 1) for t in plus] + [(t, -1) for t in minus]


def write(instrument):
    out = f"packages/instruments/data/{instrument['id']}.json"
    with open(out, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(instrument, f, indent='\t', ensure_ascii=False)
        f.write('\n')
    print('wrote', out, len(instrument['items']), 'items')


# ── TIPI ──
write({
    'id': 'tipi',
    'version': 1,
    'name': 'Ten-Item Personality Inventory',
    'shortName': 'TIPI',
    'items_note': 'Items, response options and scoring copied from the TIPI PDF on the Gosling lab page (tipi.pdf), 3 November 2026. Each scale is the average of two items, one reverse scored.',
    'source': {
        'paper': 'Gosling, S. D., Rentfrow, P. J., & Swann, W. B., Jr. (2003). A very brief measure of the Big-Five personality domains. Journal of Research in Personality, 37(6), 504-528',
        'doi': '10.1016/S0092-6566(03)00046-1',
        'keyUrl': 'https://gosling.psy.utexas.edu/scales-weve-developed/ten-item-personality-measure-tipi/',
        'itemsUrl': 'https://gosling.psy.utexas.edu/wp-content/uploads/2014/09/tipi.pdf',
        'accessed': ACCESSED,
    },
    'licence': {
        'text': 'Free for any use. The author states on the TIPI page that anyone can use it for any purpose and need not ask permission.',
        'url': 'https://gosling.psy.utexas.edu/scales-weve-developed/ten-item-personality-measure-tipi/',
        'credit': 'Ten-Item Personality Inventory (TIPI), Gosling, Rentfrow and Swann (2003)',
    },
    'instructions': 'Here are a number of personality traits that may or may not apply to you. Please write a number next to each statement to indicate the extent to which you agree or disagree with that statement. You should rate the extent to which the pair of traits applies to you, even if one characteristic applies more strongly than the other. I see myself as:',
    'response': {'type': 'likert', 'points': 7, 'labels': ['Disagree strongly', 'Disagree moderately', 'Disagree a little', 'Neither agree nor disagree', 'Agree a little', 'Agree moderately', 'Agree strongly']},
    'scales': [
        {'id': 'E', 'name': 'Extraversion'},
        {'id': 'A', 'name': 'Agreeableness'},
        {'id': 'C', 'name': 'Conscientiousness'},
        {'id': 'S', 'name': 'Emotional stability', 'publishedName': 'Emotional Stability'},
        {'id': 'O', 'name': 'Openness to experiences', 'publishedName': 'Openness to Experiences'},
    ],
    'items': [
        {'n': 1, 'text': 'Extraverted, enthusiastic.', 'scale': 'E', 'key': 1},
        {'n': 2, 'text': 'Critical, quarrelsome.', 'scale': 'A', 'key': -1},
        {'n': 3, 'text': 'Dependable, self-disciplined.', 'scale': 'C', 'key': 1},
        {'n': 4, 'text': 'Anxious, easily upset.', 'scale': 'S', 'key': -1},
        {'n': 5, 'text': 'Open to new experiences, complex.', 'scale': 'O', 'key': 1},
        {'n': 6, 'text': 'Reserved, quiet.', 'scale': 'E', 'key': -1},
        {'n': 7, 'text': 'Sympathetic, warm.', 'scale': 'A', 'key': 1},
        {'n': 8, 'text': 'Disorganized, careless.', 'scale': 'C', 'key': -1},
        {'n': 9, 'text': 'Calm, emotionally stable.', 'scale': 'S', 'key': 1},
        {'n': 10, 'text': 'Conventional, uncreative.', 'scale': 'O', 'key': -1},
    ],
    'scoring': {'method': 'mean', 'reverse': 'points+1-x'},
    'norms': None,
    'reliability': {'E': 0.68, 'A': 0.40, 'C': 0.50, 'S': 0.73, 'O': 0.45},
    'reliabilitySource': 'Coefficient alpha per scale from Gosling, Rentfrow and Swann (2003), Table 1 (N = 1,813). The same table gives six-week test-retest reliabilities of .77, .71, .76, .70 and .62. Two-item scales are expected to have low alpha; the authors recommend judging the TIPI by its test-retest reliability and its correlations with longer Big Five measures.',
})

# ── Rosenberg Self-Esteem Scale ──
write({
    'id': 'rosenberg',
    'version': 1,
    'name': 'Rosenberg Self-Esteem Scale',
    'shortName': 'RSES',
    'items_note': 'Items and response options copied from the scale image on the University of Maryland Department of Sociology page, 3 November 2026. The published form presents Strongly agree first, so response.highFirst is true. The site scores options 1 to 4, giving 10 to 40, one of the options the page describes; the page\'s 0 to 30 scoring is the same minus 10.',
    'source': {
        'paper': 'Rosenberg, M. (1965). Society and the adolescent self-image. Princeton, NJ: Princeton University Press',
        'keyUrl': 'https://socy.umd.edu/about-us/using-rosenberg-self-esteem-scale',
        'itemsUrl': 'https://socy.umd.edu/sites/socy.umd.edu/files/Rosenberg%20SE%20Scale.jpg',
        'accessed': ACCESSED,
    },
    'licence': {
        'text': 'Public domain. The University of Maryland Department of Sociology states that the scale may be used without charge and without notifying the department, including translations or adaptations, consistent with traditional scholarly attribution.',
        'url': 'https://socy.umd.edu/about-us/using-rosenberg-self-esteem-scale',
        'credit': 'Rosenberg Self-Esteem Scale, Morris Rosenberg (1965)',
    },
    'instructions': 'Below is a list of statements dealing with your general feelings about yourself. If you strongly agree, circle SA. If you agree with the statement, circle A. If you disagree, circle D. If you strongly disagree, circle SD.',
    'response': {'type': 'likert', 'points': 4, 'labels': ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'], 'highFirst': True},
    'scales': [{'id': 'SE', 'name': 'Self-esteem'}],
    'items': [
        {'n': 1, 'text': "I feel that I'm a person of worth, at least on an equal plane with others.", 'scale': 'SE', 'key': 1},
        {'n': 2, 'text': 'I feel that I have a number of good qualities.', 'scale': 'SE', 'key': 1},
        {'n': 3, 'text': 'All in all, I am inclined to feel that I am a failure.', 'scale': 'SE', 'key': -1},
        {'n': 4, 'text': 'I am able to do things as well as most other people.', 'scale': 'SE', 'key': 1},
        {'n': 5, 'text': 'I feel I do not have much to be proud of.', 'scale': 'SE', 'key': -1},
        {'n': 6, 'text': 'I take a positive attitude toward myself.', 'scale': 'SE', 'key': 1},
        {'n': 7, 'text': 'On the whole, I am satisfied with myself.', 'scale': 'SE', 'key': 1},
        {'n': 8, 'text': 'I wish I could have more respect for myself.', 'scale': 'SE', 'key': -1},
        {'n': 9, 'text': 'I certainly feel useless at times.', 'scale': 'SE', 'key': -1},
        {'n': 10, 'text': 'At times I think I am no good at all.', 'scale': 'SE', 'key': -1},
    ],
    'scoring': {'method': 'sum', 'reverse': 'points+1-x'},
    'norms': None,
})

# ── IPIP emotional intelligence components (Barchard, 2001) ──
EI = [
    ('PE', 'Positive expressivity', 'POSITIVE EXPRESSIVITY', (0.81, 0.79),
     ['Express my affection physically.', 'Laugh out loud if something is funny.', 'Express my happiness in a childlike manner.', 'Sometimes laugh out loud when reading or watching TV.', 'Hug my close friends.', "Show my feelings when I'm happy."],
     ['Find it difficult showing people that I care about them.', 'Have difficulty showing affection.', 'Keep my happy feelings to myself.']),
    ('NE', 'Negative expressivity', 'NEGATIVE EXPRESSIVITY', (0.75, 0.74),
     ["Shout or scream when I'm angry.", "Can't help but look upset when something bad happens.", 'Show my fear.', 'Suspect that my facial expressions give me away when I feel sad.', 'Show my sadness.'],
     ['Keep my feelings to myself, regardless of how unhappy I am.', "Find it difficult showing people that I'm angry with them.", 'Keep my feelings to myself, regardless of how scared I am.', 'Rarely show my anger.', 'Wish I could more easily show my negative feelings.']),
    ('AE', 'Attending to emotions', 'ATTENDING TO EMOTIONS', (0.81, 0.83),
     ['Think about the causes of my emotions.', 'Pay a lot of attention to my feelings.', "Am usually aware of the way that I'm feeling.", 'Notice my emotions.', 'Often stop to analyze how I\'m feeling.'],
     ['Rarely think about how I feel.', 'Rarely analyze my emotions.', 'Am not in touch with my feelings.', 'Often ignore my feelings.', 'Rarely notice my emotional reactions.']),
    ('ED', 'Emotion-based decision-making', 'EMOTION-BASED DECISION-MAKING', (0.73, 0.67),
     ['Listen to my feelings when making important decisions.', 'Base my goals in life on inspiration, rather than logic.', 'Plan my life based on how I feel.', 'Believe emotions give direction to life.', 'Listen to my heart rather than my brain.'],
     ['Plan my life logically.', 'Believe important decisions should be based on logical reasoning.', 'Listen to my brain rather than my heart.', 'Make decisions based on facts, not feelings.']),
    ('RJ', 'Responsive joy', 'RESPONSIVE JOY', (0.73, 0.70),
     ['Like to watch children open presents.', 'Usually end up laughing if the people around me are laughing.', "Feel other people's joy.", 'Get caught up in the excitement when others are celebrating.', 'Am strongly influenced by the good moods of others.', 'Find it hard to stay in a bad mood if the people around me are happy.'],
     ["Dislike being around happy people when I'm feeling sad.", "Am unaffected by other people's happiness.", 'Rarely get caught up in the excitement.', "Dislike children's birthday parties."]),
    ('RD', 'Responsive distress', 'RESPONSIVE DISTRESS', (0.59, 0.63),
     ["Am deeply moved by others' misfortunes.", 'Am easily moved to tears.', "Suffer from others' sorrows.", 'Am upset by the misfortunes of strangers.', 'Would be upset if I saw an injured animal.'],
     ['Am calm even in tense situations.', 'Am not easily disturbed by events.', 'Am unaffected by the suffering of others.', 'Rarely cry during sad movies.', 'Remain calm during emergencies.']),
    ('EC', 'Empathic concern', 'EMPATHIC CONCERN', (0.64, 0.80),
     ['Am concerned about others.', 'Feel sympathy for those who are worse off than myself.', 'Sympathize with the homeless.', 'Believe that criminals should receive help rather than punishment.', 'Believe that the poor deserve our sympathy.'],
     ['Feel little concern for others.', 'Have no sympathy for criminals.', 'Look down on any weakness.', "Don't like to get involved in other people's problems.", 'Have little sympathy for the unemployed.']),
]
write({
    'id': 'ipip-ei',
    'version': 1,
    'name': 'IPIP emotional intelligence components',
    'shortName': 'IPIP EI',
    'items_note': 'Items copied from https://ipip.ori.org/newEmotionalIntelligenceKey.htm, 3 November 2026. ' + INTERLEAVED,
    'source': {
        'paper': 'Barchard, K. A. (2001). Emotional and social intelligence: Examining its place in the nomological network. Unpublished doctoral dissertation, University of British Columbia. Scales reproduced in the International Personality Item Pool',
        'keyUrl': 'https://ipip.ori.org/newEmotionalIntelligenceKey.htm',
        'scoringUrl': 'https://ipip.ori.org/newScoringInstructions.htm',
        'accessed': ACCESSED,
    },
    'licence': IPIP_LICENCE,
    'instructions': IPIP_INSTRUCTIONS,
    'response': {'type': 'likert', 'points': 5, 'labels': IPIP_LABELS},
    'scales': [{'id': sid, 'name': name, 'publishedName': pub} for sid, name, pub, _, _, _ in EI],
    'items': interleave([(sid, plus_minus(plus, minus)) for sid, _, _, _, plus, minus in EI]),
    'scoring': {'method': 'sum', 'reverse': 'points+1-x'},
    'norms': None,
    'reliability': {sid: min(a) for sid, _, _, a, _, _ in EI},
    'reliabilitySource': 'Coefficient alpha per scale from the IPIP key page, which gives two figures per scale (women and men); the lower of the two is stored here. Women/men: positive expressivity .81/.79, negative expressivity .75/.74, attending to emotions .81/.83, emotion-based decision-making .73/.67, responsive joy .73/.70, responsive distress .59/.63, empathic concern .64/.80.',
})

# ── IPIP interpersonal circumplex (Markey & Markey, 2009) ──
IPC = {
    'PA': ('Assured-dominant', 'PA (Assured-Dominant)', [(6, 'Demand to be the center of interest'), (14, 'Do most of the talking'), (22, 'Speak loudly'), (30, 'Demand attention')]),
    'BC': ('Arrogant-calculating', 'BC (Arrogant-Calculating)', [(7, 'Cut others to pieces'), (15, 'Contradict others'), (23, 'Snap at people'), (31, 'Have a sharp tongue')]),
    'DE': ('Cold-hearted', 'DE (Cold-Hearted)', [(8, 'Believe people should fend for themselves'), (16, "Don't fall for sob-stories"), (24, "Don't put a lot of thought into things"), (32, "Am not interested in other people's problems")]),
    'FG': ('Aloof-introverted', 'FG (Aloof-Introverted)', [(1, 'Am quiet around strangers'), (9, 'Am a very private person'), (17, "Don't talk a lot"), (25, 'Have little to say')]),
    'HI': ('Unassured-submissive', 'HI (Unassured-Submissive)', [(2, 'Speak softly'), (10, 'Let others finish what they are saying'), (18, 'Seldom toot my own horn'), (26, 'Dislike being the center of attention')]),
    'JK': ('Unassuming-ingenuous', 'JK (Unassuming-Ingenuous)', [(3, 'Tolerate a lot from others'), (11, 'Take things as they come'), (19, 'Think of others first'), (27, 'Seldom stretch the truth')]),
    'LM': ('Warm-agreeable', 'LM (Warm-Agreeable)', [(4, 'Am interested in people'), (12, 'Reassure others'), (20, "Inquire about others' well-being"), (28, 'Get along well with others')]),
    'NO': ('Gregarious-extraverted', 'NO (Gregarious-Extraverted)', [(5, 'Feel comfortable around people'), (13, 'Start conversations'), (21, 'Talk to a lot of different people at parties'), (29, 'Love large parties')]),
}
ipc_items = sorted([{'n': n, 'text': text, 'scale': sid, 'key': 1} for sid, (_, _, its) in IPC.items() for n, text in its], key=lambda x: x['n'])
write({
    'id': 'ipip-ipc',
    'version': 1,
    'name': 'IPIP Interpersonal Circumplex',
    'shortName': 'IPIP-IPC',
    'items_note': 'Items and their numbers (the administration order) copied from https://ipip.ori.org/newIPIP-IPCScoringKey.htm, 3 November 2026. The key page prints the items without a full stop; they are reproduced as printed. All 32 items are positively keyed.',
    'source': {
        'paper': 'Markey, P. M., & Markey, C. N. (2009). A brief assessment of the interpersonal circumplex: The IPIP-IPC. Assessment, 16(4), 352-361',
        'doi': '10.1177/1073191109340382',
        'keyUrl': 'https://ipip.ori.org/newIPIP-IPCScoringKey.htm',
        'scoringUrl': 'https://ipip.ori.org/newScoringInstructions.htm',
        'accessed': ACCESSED,
    },
    'licence': IPIP_LICENCE,
    'instructions': IPIP_INSTRUCTIONS,
    'response': {'type': 'likert', 'points': 5, 'labels': IPIP_LABELS},
    'scales': [{'id': sid, 'name': name, 'publishedName': pub} for sid, (name, pub, _) in IPC.items()],
    'items': ipc_items,
    'scoring': {'method': 'sum', 'reverse': 'points+1-x'},
    'norms': None,
})

# ── IPIP-VIA-R (Bluemke, Partsch, Saucier & Lechner, 2021) ──
VIA_R = [
    ('APP', 'Appreciation of beauty', 'Appreciation of Beauty [APP]', 0.54, ["Feel it's important to live in a world of beauty.", 'Experience deep emotions when I see beautiful things.'], ['Am rarely aware of the natural beauty in the environment.', 'Fail to notice beauty until others comment on it.']),
    ('LOV', 'Capacity for love', 'Capacity for Love [CAP (new: LOV)]', 0.61, ['Know that there are people in my life who care as much for me as for themselves.', 'Can express love to someone else.'], ['Do not easily share my feelings with others.', 'Have difficulty accepting love from anyone.']),
    ('TEA', 'Teamwork', 'Citizenship/Teamwork [CIT (new: TEA)]', 0.57, ['Am an extremely loyal person.', 'Support my teammates or fellow group members.'], ['Am not good at working with a group.', 'Prefer to do everything alone.']),
    ('CUR', 'Curiosity', 'Curiosity [CUR]', 0.56, ['Am excited by many different activities.', 'Can find something of interest in any situation.'], ['Am not all that curious about the world.', 'Have few interests.']),
    ('EQU', 'Fairness', 'Equity/Fairness [EQU]', 0.63, ['Treat all people equally.', "Believe that everyone's rights are equally important."], ['Take advantage of others.', "Treat others differently if I don't like them."]),
    ('FOR', 'Forgiveness', 'Forgiveness/Mercy [FOR]', 0.56, ['Try to respond with understanding when someone treats me badly.', 'Allow others to make a fresh start.'], ['Hold grudges.', 'Find it hard to forgive others.']),
    ('GRA', 'Gratitude', 'Gratitude [GRA]', 0.63, ['Express my thanks to those who care about me.', 'Am an extremely grateful person.'], ['Feel no gratitude to others.', 'Find few things in my life to be grateful for.']),
    ('HOP', 'Hope', 'Hope/Optimism [HOP]', 0.60, ['Can find the positive in what seems negative to others.', 'Remain hopeful despite challenges.'], ['Expect the worst.', 'Often think about the possibility of negative outcomes that are not likely to occur.']),
    ('HUM', 'Humour', 'Humor/Playfulness [HUM]', 0.61, ['Use laughter to brighten the days of others.', 'Keep my sense of humor even in gloomy situations.'], ['Am not known for my sense of humor.', 'Am not fun to be with.']),
    ('PEV', 'Perseverance', 'Industry/Perseverance/Persistence [IND (new: PEV)]', 0.63, ["Don't quit a task before it is finished.", 'Finish things despite obstacles in the way.'], ["Don't finish what I start.", 'Give up easily.']),
    ('INT', 'Honesty', 'Integrity/Honesty/Authenticity [INT]', 0.67, ['Am trusted to keep secrets.', 'Keep my promises.'], ['Lie to get myself out of trouble.', 'Cheat on people who have trusted me.']),
    ('JUD', 'Judgment', 'Judgment/Open-mindedness [JUD]', 0.55, ["Weigh the pro's and the con's.", 'Am valued by my friends for my good judgment.'], ["Don't tend to think things through critically.", "Don't think about different possibilities when making decisions."]),
    ('KIN', 'Kindness', 'Kindness/Generosity [KIN]', 0.59, ['Am never too busy to help a friend.', 'Go out of my way to cheer up people who appear down.'], ['Get impatient when others talk to me about their problems.', 'Am only kind to others if they have been kind to me.']),
    ('LEA', 'Leadership', 'Leadership [LEA]', 0.57, ['Am good at helping people work well together.', 'Am told that I am a strong but fair leader.'], ['Have difficulty getting others to work together.', 'Am not good at taking charge of a group.']),
    ('LER', 'Love of learning', 'Love of Learning [LOV (new: LER)]', 0.55, ['Am a true life-long learner.', 'Am thrilled when I learn something new.'], ["Don't like to learn new things.", "Don't read nonfiction books for fun."]),
    ('MOD', 'Modesty', 'Modesty/Humility [MOD]', 0.54, ["Don't brag about my accomplishments.", 'Would never be described as arrogant.'], ['Like to stand out in a crowd.', 'Like to talk about myself.']),
    ('ORI', 'Creativity', 'Originality/Creativity [ORI]', 0.62, ['Come up with new ways to do things.', 'Am an original thinker.'], ['Am not considered to have new and different ideas.', 'Have no special urge to do something original.']),
    ('PER', 'Perspective', 'Perspective/Wisdom [PER]', 0.56, ['Have a mature view on life.', 'Am considered to be a wise person.'], ['Am not good at figuring out what really matters.', 'Am rarely consulted for advice by others.']),
    ('PRU', 'Prudence', 'Prudence [PRU]', 0.45, ['Believe it is always better to be safe than sorry.', 'Make careful choices.'], ['Act before thinking through the consequences.', 'Like taking risks.']),
    ('REG', 'Self-regulation', 'Self-regulation/Self-control [SEL (new: REG)]', 0.42, ['Am a highly disciplined person.', 'Forego things that are bad for me in the long run even if they make me feel good in the short run.'], ['Let myself be taken over by urges to spend or eat too much.', 'Give in to my urges.']),
    ('SIQ', 'Social intelligence', 'Social/Personal/Emotional Intelligence [SOC (new: SIQ)]', 0.63, ['Am good at sensing what others are feeling.', 'Know what to say to make people feel good.'], ["Don't know how to handle myself in a new social situation.", 'Have trouble guessing how others will react.']),
    ('SPI', 'Spirituality', 'Spirituality/Religiousness [SPI]', 0.57, ['Am a spiritual person.', 'Believe that each person has a purpose in life.'], ['Feel that life has no meaning.', 'Do not believe in a universal power or a God.']),
    ('VAL', 'Bravery', 'Valor/Bravery/Courage [VAL]', 0.54, ['Have taken frequent stands in the face of strong opposition.', "Don't hesitate to express an unpopular opinion."], ['Do not stand up for my beliefs.', "Don't speak my mind freely when there might be negative results."]),
    ('ZES', 'Zest', 'Zest/Enthusiasm/Vitality [ZES]', 0.62, ["Awaken with a sense of excitement about the day's possibilities.", 'Look forward to each new day.'], ['Am described as grumpy.', "Don't have much energy."]),
]
write({
    'id': 'ipip-via-r',
    'version': 1,
    'name': 'IPIP-VIA-R',
    'shortName': 'IPIP-VIA-R',
    'items_note': 'Items copied from https://ipip.ori.org/IPIP-VIA-R_Key.html, 3 November 2026. ' + INTERLEAVED + ' The key page prints "Weigh the pro\'s and the con\'s ." with a space before the full stop; that space is dropped. Scale names on the site are the short forms of the published names, which are kept in publishedName.',
    'source': {
        'paper': 'Bluemke, M., Partsch, M. V., Saucier, G., & Lechner, C. M. (2021). Measuring cross-cultural supermodel strengths in a balanced way: The IPIP-VIA-R short scales. Assessment (as cited on the IPIP key page)',
        'keyUrl': 'https://ipip.ori.org/IPIP-VIA-R_Key.html',
        'scoringUrl': 'https://ipip.ori.org/newScoringInstructions.htm',
        'accessed': ACCESSED,
    },
    'licence': IPIP_LICENCE,
    'instructions': IPIP_INSTRUCTIONS,
    'response': {'type': 'likert', 'points': 5, 'labels': IPIP_LABELS},
    'scales': [{'id': sid, 'name': name, 'publishedName': pub} for sid, name, pub, _, _, _ in VIA_R],
    'items': interleave([(sid, plus_minus(plus, minus)) for sid, _, _, _, plus, minus in VIA_R]),
    'scoring': {'method': 'sum', 'reverse': 'points+1-x'},
    'norms': None,
    'reliability': {sid: a for sid, _, _, a, _, _ in VIA_R},
    'reliabilitySource': 'Coefficient alpha per scale for the UK sample (n = 474) from the IPIP key page, which gives Germany/UK figures for alpha, McDonald\'s omega and two-to-three-week test-retest reliability. The authors say alpha understates the reliability of these balanced four-item scales and recommend omega.',
})

# ── Single-trait tests ──
def single(id_, name, published, paper, key_url, alpha, plus, minus, note='', items_source=None, licence=IPIP_LICENCE, doi=None, accessed=ACCESSED, reliability_source=None):
    items = [{'n': i + 1, 'text': t, 'scale': 'T', 'key': k} for i, (t, k) in enumerate(plus_minus(plus, minus))]
    inst = {
        'id': id_,
        'version': 1,
        'name': name,
        'items_note': f'Items copied from {key_url}, {LONG_DATE[accessed]}, +keyed items first as the key page lists them. {note}'.strip(),
        'source': {'paper': paper, 'keyUrl': key_url, 'scoringUrl': 'https://ipip.ori.org/newScoringInstructions.htm', 'accessed': accessed, **({'doi': doi} if doi else {})},
        'licence': licence,
        'instructions': IPIP_INSTRUCTIONS,
        'response': {'type': 'likert', 'points': 5, 'labels': IPIP_LABELS},
        'scales': [{'id': 'T', 'name': name, 'publishedName': published}],
        'items': items,
        'scoring': {'method': 'sum', 'reverse': 'points+1-x'},
        'norms': None,
        'reliability': {'T': alpha},
        'reliabilitySource': reliability_source or f'Coefficient alpha as given on the key page, {key_url}, accessed 3 November 2026.',
    }
    write(inst)

LONG_DATE = {'2026-11-03': '3 November 2026', '2026-11-10': '10 November 2026'}

NEO_PAPER = 'Goldberg, L. R. (1999). A broad-bandwidth, public-domain, personality inventory measuring the lower-level facets of several five-factor models. In I. Mervielde, I. Deary, F. De Fruyt, & F. Ostendorf (Eds.), Personality psychology in Europe, Vol. 7 (pp. 7-28). Tilburg University Press'
VIA_PAPER = 'IPIP scales measuring constructs similar to those in the Values in Action Inventory of Strengths (Peterson & Seligman, 2004), International Personality Item Pool'
MARKERS_PAPER = 'Goldberg, L. R. (1992). The development of markers for the Big-Five factor structure. Psychological Assessment, 4(1), 26-42'
HEXACO_PAPER = 'IPIP scales measuring constructs similar to those in the HEXACO Personality Inventory (Lee & Ashton, 2004), International Personality Item Pool'

single('ipip-assertiveness', 'Assertiveness', 'E3: Assertiveness (IPIP-NEO facet)', NEO_PAPER, 'https://ipip.ori.org/newNEOKey.htm', 0.84,
       ['Take charge.', 'Try to lead others.', 'Can talk others into doing things.', 'Seek to influence others.', 'Take control of things.'],
       ['Wait for others to lead the way.', 'Keep in the background.', 'Have little to say.', "Don't like to draw attention to myself.", 'Hold back my opinions.'])
single('ipip-orderliness', 'Orderliness', 'C2: Orderliness (IPIP-NEO facet)', NEO_PAPER, 'https://ipip.ori.org/newNEOKey.htm', 0.82,
       ['Like order.', 'Like to tidy up.', 'Want everything to be "just right."', 'Love order and regularity.', 'Do things according to a plan.'],
       ['Often forget to put things back in their proper place.', 'Leave a mess in my room.', 'Leave my belongings around.', 'Am not bothered by messy people.', 'Am not bothered by disorder.'])
single('ipip-trust', 'Trust', 'A1: Trust (IPIP-NEO facet)', NEO_PAPER, 'https://ipip.ori.org/newNEOKey.htm', 0.82,
       ['Trust others.', 'Believe that others have good intentions.', 'Trust what people say.', 'Believe that people are basically moral.', 'Believe in human goodness.', 'Think that all will be well.'],
       ['Distrust people.', 'Suspect hidden motives in others.', 'Am wary of others.', 'Believe that people are essentially evil.'])
# IPIP-HEXACO alphas: the bracketed alpha beside each facet on the key page is
# the HEXACO-PI facet's, not the IPIP scale's. The IPIP scales' own alphas are
# in the comparison table (checked 10 November 2026). Patience: HEXACO-PI .88,
# IPIP .80; perfectionism: HEXACO-PI .80, IPIP .72.
HEXACO_TABLE = 'https://ipip.ori.org/newHEXACO_PI_table.htm'
HEXACO_REL = lambda: f'Coefficient alpha of the IPIP scale from the IPIP comparison table for the IPIP-HEXACO scales, {HEXACO_TABLE}, accessed 10 November 2026. The table gives no sample size. The bracketed alpha beside the facet on the scoring key page belongs to the corresponding HEXACO-PI scale, not to these items.'

single('ipip-patience', 'Patience', 'Patience (A:Pati), IPIP-HEXACO facet', HEXACO_PAPER, 'https://ipip.ori.org/newHEXACO_PI_key.htm', 0.80,
       ['Find that it takes a lot to make me feel angry at someone.', 'Rarely feel angry with people.', 'Am usually a patient person.', 'Rarely get irritated.', 'Seldom get mad.'],
       ['Am easily annoyed.', 'Get angry easily.', 'Get irritated easily.', 'Lose my temper.', 'Get upset easily.'],
       reliability_source=HEXACO_REL())
single('ipip-perfectionism', 'Perfectionism', 'Perfectionism (C:Perf), IPIP-HEXACO facet', 'Ashton, M. C., Lee, K., & Goldberg, L. R. (2007). The IPIP-HEXACO scales: An alternative, public-domain measure of the personality constructs in the HEXACO model. Personality and Individual Differences, 42(8), 1515-1526', 'https://ipip.ori.org/newHEXACO_PI_key.htm', 0.72,
       ['Pay attention to details.', 'Continue until everything is perfect.', 'Have an eye for detail.', 'Want every detail taken care of.', 'Dislike imperfect work.', 'Want everything to add up perfectly.', 'Detect mistakes.', 'Demand quality.'],
       ['Pay too little attention to details.', 'Prefer to just let things happen.'],
       doi='10.1016/j.paid.2006.10.027', accessed='2026-11-10', reliability_source=HEXACO_REL())
single('ipip-curiosity', 'Curiosity', 'Curiosity [Cur], IPIP-VIA scale', VIA_PAPER, 'https://ipip.ori.org/newVIAKey.htm', 0.78,
       ['Find the world a very interesting place.', 'Am never bored.', 'Am always busy with something interesting.', 'Am excited by many different activities.', 'Can find something of interest in any situation.', 'Think that my life is extremely interesting.', 'Love to hear about other countries and cultures.'],
       ['Am not all that curious about the world.', 'Find it difficult to entertain myself.', 'Have few interests.'])
single('ipip-perseverance', 'Perseverance', 'Industry/Perseverance/Persistence [Ind], IPIP-VIA scale', VIA_PAPER, 'https://ipip.ori.org/newVIAKey.htm', 0.81,
       ["Don't quit a task before it is finished.", 'Am a goal-oriented person.', 'Finish things despite obstacles in the way.', 'Am a hard worker.', "Don't get sidetracked when I work."],
       ["Don't finish what I start.", 'Give up easily.', 'Do not tend to stick with what I decide to do.'],
       note='The key page lists two further items as omitted from the scale; they are not included.')
single('ipip-creativity', 'Creativity', 'Originality/Creativity [Ori], IPIP-VIA scale', VIA_PAPER, 'https://ipip.ori.org/newVIAKey.htm', 0.85,
       ['Am able to come up with new and different ideas.', 'Like to think of new ways to do things.', 'Come up with new ways to do things.', 'Am an original thinker.', 'Have an imagination that stretches beyond that of my friends.'],
       ["Don't pride myself on being original.", 'Am not considered to have new and different ideas.', 'Have no special urge to do something original.'],
       note='The key page lists two further items as omitted from the scale; they are not included.')
single('ipip-courage', 'Courage', 'Valor/Bravery/Courage [Val], IPIP-VIA scale', VIA_PAPER, 'https://ipip.ori.org/newVIAKey.htm', 0.75,
       ['Have taken frequent stands in the face of strong opposition.', "Don't hesitate to express an unpopular opinion.", 'Call for action while others talk.', 'Can face my fears.', 'Speak up in protest when I hear someone say mean things.', 'Am a brave person.'],
       ['Avoid dealing with uncomfortable emotions.', 'Avoid dealing with awkward situations.', 'Do not stand up for my beliefs.', "Don't speak my mind freely when there might be negative results."],
       note='The key page lists one further item as omitted from the scale; it is not included.')
single('ipip-emotional-stability-20', 'Emotional stability', 'Factor IV (Emotional Stability), 20-item scale, Big-Five Factor Markers', MARKERS_PAPER, 'https://ipip.ori.org/newBigFive5broadKey.htm', 0.91,
       ['Am relaxed most of the time.', 'Seldom feel blue.', 'Am not easily bothered by things.', 'Rarely get irritated.', 'Seldom get mad.'],
       ['Get stressed out easily.', 'Worry about things.', 'Am easily disturbed.', 'Get upset easily.', 'Change my mood a lot.', 'Have frequent mood swings.', 'Get irritated easily.', 'Often feel blue.', 'Get angry easily.', 'Panic easily.', 'Feel threatened easily.', 'Get overwhelmed by emotions.', 'Take offense easily.', 'Get caught up in my problems.', 'Grumble about things.'],
       doi='10.1037/1040-3590.4.1.26')
single('ipip-extraversion-20', 'Extraversion', 'Factor I (Surgency or Extraversion), 20-item scale, Big-Five Factor Markers', MARKERS_PAPER, 'https://ipip.ori.org/newBigFive5broadKey.htm', 0.91,
       ['Am the life of the party.', 'Feel comfortable around people.', 'Start conversations.', 'Talk to a lot of different people at parties.', "Don't mind being the center of attention.", 'Make friends easily.', 'Take charge.', 'Know how to captivate people.', 'Feel at ease with people.', 'Am skilled in handling social situations.'],
       ["Don't talk a lot.", 'Keep in the background.', 'Have little to say.', "Don't like to draw attention to myself.", 'Am quiet around strangers.', 'Find it difficult to approach others.', 'Often feel uncomfortable around others.', 'Bottle up my feelings.', 'Am a very private person.', 'Wait for others to lead the way.'],
       doi='10.1037/1040-3590.4.1.26')

# ── O*NET Interest Profiler Short Form ──
ONET = [
    ('R', 'Realistic', ['Build kitchen cabinets', 'Lay brick or tile', 'Repair household appliances', 'Raise fish in a fish hatchery', 'Assemble electronic parts', 'Drive a truck to deliver packages to offices and homes', 'Test the quality of parts before shipment', 'Repair and install locks', 'Set up and operate machines to make products', 'Put out forest fires']),
    ('I', 'Investigative', ['Develop a new medicine', 'Study ways to reduce water pollution', 'Conduct chemical experiments', 'Study the movement of planets', 'Examine blood samples using a microscope', 'Investigate the cause of a fire', 'Develop a way to better predict the weather', 'Work in a biology lab', 'Invent a replacement for sugar', 'Do laboratory tests to identify diseases']),
    ('A', 'Artistic', ['Write books or plays', 'Play a musical instrument', 'Compose or arrange music', 'Draw pictures', 'Create special effects for movies', 'Paint sets for plays', 'Write scripts for movies or television shows', 'Perform jazz or tap dance', 'Sing in a band', 'Edit movies']),
    ('S', 'Social', ['Teach an individual an exercise routine', 'Help people with personal or emotional problems', 'Give career guidance to people', 'Perform rehabilitation therapy', 'Do volunteer work at a non-profit organization', 'Teach children how to play sports', 'Teach sign language to people who are deaf or hard of hearing', 'Help conduct a group therapy session', 'Take care of children at a day-care center', 'Teach a high-school class']),
    ('E', 'Enterprising', ['Buy and sell stocks and bonds', 'Manage a retail store', 'Operate a beauty salon or barber shop', 'Manage a department within a large company', 'Start your own business', 'Negotiate business contracts', 'Represent a client in a lawsuit', 'Market a new line of clothing', 'Sell merchandise at a department store', 'Manage a clothing store']),
    ('C', 'Conventional', ['Develop a spreadsheet using computer software', 'Proofread records or forms', 'Install software across computers on a large network', 'Operate a calculator', 'Keep shipping and receiving records', 'Calculate the wages of employees', 'Inventory supplies using a hand-held computer', 'Record rent payments', 'Keep inventory records', 'Stamp, sort, and distribute mail for an organization']),
]
onet_items = []
n = 1
for sid, _, texts in ONET:
    for t in texts:
        onet_items.append({'n': n, 'text': t, 'scale': sid, 'key': 1})
        n += 1
write({
    'id': 'onet-ip-short',
    'version': 1,
    'name': 'O*NET Interest Profiler Short Form',
    'shortName': 'O*NET IP Short Form',
    'items_note': 'The 60 activities copied character for character from the paper-and-pencil O*NET Interest Profiler Short Form (Interest_Profiler.pdf, v1), 3 November 2026, in the order the form prints them: each interest area\'s ten activities in turn, reading across the form\'s two columns row by row. No wording has been changed. The form is a check box per activity; the site presents the same check box.',
    'source': {
        'paper': 'Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). O*NET Interest Profiler Short Form psychometric characteristics: Summary. National Center for O*NET Development',
        'keyUrl': 'https://www.onetcenter.org/dl_tools/ipsf/Interest_Profiler.pdf',
        'itemsUrl': 'https://www.onetcenter.org/IPSF.html',
        'scoringUrl': 'https://www.onetcenter.org/dl_files/IPSF_Psychometric.pdf',
        'accessed': ACCESSED,
    },
    'licence': {
        'text': 'Creative Commons Attribution-NoDerivatives 4.0 (CC BY-ND 4.0), for copying the tool without modification. This page includes information from the O*NET Career Exploration Tools by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the CC BY-ND 4.0 license. O*NET® is a trademark of USDOL/ETA.',
        'url': 'https://www.onetcenter.org/license_tools.html',
        'credit': 'This page includes information from the O*NET Career Exploration Tools by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the CC BY-ND 4.0 license. O*NET® is a trademark of USDOL/ETA.',
    },
    'instructions': 'Read the 60 work activities below. Place a check in the box by the activities you would like to do. Do not think about how much education/training is needed or how much money you will make!',
    'response': {'type': 'check', 'points': 2, 'labels': ['Not checked', 'Would like to do']},
    'scales': [{'id': sid, 'name': name} for sid, name, _ in ONET],
    'items': onet_items,
    'scoring': {'method': 'sum', 'reverse': 'points+1-x'},
    'norms': None,
})
