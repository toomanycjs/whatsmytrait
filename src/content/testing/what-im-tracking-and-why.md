---
title: "What I'm tracking and why"
description: "My data tracking approach for post-viral dysautonomia: what I measure, how I measure it, and the reasoning behind the choices."
pubDate: 2026-03-18
---

Before writing about any specific intervention, it's worth explaining how I'm approaching measurement. I want a reasonably objective record of what's happening, good enough to detect real changes over time without becoming so elaborate that it creates its own burden or introduces noise. I aim to track consistently, introduce changes one at a time where possible, and be honest about what I can and can't conclude from the data.

## What I measure

### Heart rate variability (HRV)

Specifically, RMSSD: the root mean square of successive differences in inter-beat intervals. This is a measure of the variation in timing between consecutive heartbeats, and it primarily reflects parasympathetic (rest-and-digest) nervous system activity. Higher RMSSD generally indicates better autonomic flexibility. Lower RMSSD reflects reduced parasympathetic tone, which in dysautonomia patients is typically very low.

I use a Fitbit, which measures HRV automatically each night during my longest sleep period (it only considers sleep periods of more than three hours). Fitbit uses RMSSD as its calculation method, so I'm getting the right metric without needing to do a separate morning reading. The number appears in the Fitbit app each morning and I log it in a spreadsheet. The [HRV and resting heart rate tracker](/tools/trackers/hrv-tracker/) is a free browser-based tool for this purpose, and it imports a CSV if you already have history in a spreadsheet.

A Fitbit uses an optical (PPG) wrist sensor, which is less accurate for HRV measurement than a chest strap ECG like the Polar H10. Wrist-based readings introduce more motion artefact and have wider measurement error. I bought my Fitbit second-hand for relatively little money, and for my purposes, tracking trends over weeks and months rather than interpreting individual readings, it's good enough. The same device, the same measurement protocol, every night. If I see a sustained shift in my weekly or monthly median, that's real, even if any individual night's reading is noisy.

My current median RMSSD is around 16ms. For context, a typical value for someone my age would be somewhere in the range of 40–60ms. Mine is severely reduced, consistent with significant autonomic dysfunction.

### Resting heart rate (RHR)

Also captured by the Fitbit overnight. Before I became ill, my resting heart rate was in the low to mid 60s. It now sits in the low 80s. Like HRV, individual days bounce around, but the monthly median has been remarkably stable since October 2025: 81–83 bpm, every month.

### Symptom scores

I log two scores daily in a Google Sheet, each on a simple 0–10 scale: fatigue and breathlessness (which I track as a combined score because they're so intertwined for me) and head pain. I fill these in at the end of the day. In posts, I report weekly or monthly medians rather than daily scores, because day-to-day noise makes individual readings hard to interpret. The [symptom diary](/tools/trackers/symptom-diary/) is a free Google Sheets template for this kind of daily tracking.

### Orthostatic heart rate response

I've had one formal stand test conducted by a clinician in my post-COVID rehabilitation service (November 2025): resting heart rate 95 bpm, standing heart rate 120 bpm after 10 minutes. The 25 bpm rise was just below the formal POTS threshold of 30 bpm, though the absolute standing rate of 120 bpm meets an alternative diagnostic criterion. I don't do stand tests routinely at home, but I may start incorporating them periodically if I want to track the orthostatic response over time.

---

I'm working on a free Google Sheet version of my tracking setup that anyone can copy and use. When it's ready, I'll link to it from the [tools page](/tools/).

---

## Further reading

- [HRV as a tracking metric](/evidence/hrv-as-a-tracking-metric/)
- [NASA lean test: monitor your orthostatic response](/tools/nasa-lean-test/)
- [Symptom diary (Google Sheet)](/tools/trackers/symptom-diary/)
