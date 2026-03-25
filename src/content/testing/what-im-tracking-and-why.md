---
title: "What I'm tracking and why"
description: "My data tracking approach for post-viral dysautonomia — what I measure, how I measure it, and the reasoning behind the choices."
pubDate: 2026-03-18
---

Before writing about any specific intervention, it's worth explaining how I'm approaching measurement. The goal is to have a reasonably objective record of what's happening — good enough to detect real changes over time, without becoming so elaborate that it creates its own burden or introduces noise.

## The core problem

Post-viral conditions are particularly hard to track because:

1. **Symptoms fluctuate naturally** — day-to-day and week-to-week variability is high even without any intervention. A good day doesn't mean you're improving; a bad day doesn't mean you're getting worse.
2. **Placebo and regression to the mean** — if you start a new treatment when you're at your worst (which is when most people start anything), you'll naturally tend to improve a bit over the following weeks regardless of whether the treatment is doing anything. This is why controlled trials exist; it's also why single-person tracking needs to be careful about attribution.
3. **Multiple variables changing at once** — most people with post-viral conditions are trying multiple things simultaneously, making it very difficult to isolate causes.

My response to this is not to try to run a perfect experiment — I can't, and the attempt would be exhausting. Instead, I aim to track consistently, introduce changes one at a time where possible, and be honest about what I can and can't conclude from the data.

## What I measure

### Heart rate variability (HRV)

Specifically, RMSSD — the root mean square of successive differences in inter-beat intervals. This is a measure of the variation in timing between consecutive heartbeats. Higher RMSSD reflects greater parasympathetic (rest-and-digest) nervous system activity; lower RMSSD reflects sympathetic dominance or reduced autonomic flexibility.

In dysautonomia, RMSSD is typically low. Monitoring it over time gives me a window into my autonomic state that's more sensitive than resting heart rate alone.

**How:** Polar H10 chest strap, Elite HRV app, 5-minute morning recording taken supine before getting out of bed. This is the most consistent protocol I can maintain. I record the natural log of RMSSD (lnRMSSD) for statistical analysis but report raw RMSSD in posts for readability.

**Limitations:** HRV is noisy. Alcohol, poor sleep, illness, and emotional stress all reduce it. A single day's reading means little; trends over weeks matter.

### Resting heart rate

Captured at the same time as HRV, also supine. Less sensitive than RMSSD but more interpretable, and a useful cross-check.

### Orthostatic heart rate response

Periodically (not daily) I do a stand test: HR supine after 5 minutes, then standing at 2, 5, and 10 minutes. I'm looking at the orthostatic increment — the difference between supine HR and peak standing HR. A sustained increment of >30 bpm over 10 minutes meets the HR criterion for POTS.

### Symptom scores

Daily, on a simple 0–10 scale for: fatigue, head pain, breathlessness, and cognitive function (ability to concentrate and think clearly). I log these in the evening. I report weekly medians rather than daily scores in my posts because day-to-day noise makes daily data hard to interpret.

## What I don't measure (and why)

**Cortisol, inflammatory markers, microbiome** — these would require blood or stool tests, which I can't do conveniently and repeatedly at home. They'd also require interpretation I'm not qualified to provide.

**Activity and steps** — I've tried tracking steps and found it doesn't correlate well with how I feel in the way HRV does. It also encourages me to push harder on good days, which is counterproductive.

**Sleep stages** — I use a Garmin for sleep tracking but don't include it in formal analysis because consumer sleep staging is unreliable. I note subjectively whether sleep was good or poor in my daily log.

## How I'm reporting results

For each intervention I try, I'll report:

- My pre-intervention baseline for each metric (at least 3–4 weeks)
- Weekly medians during the intervention period
- Any notable correlations or confounds
- What I conclude and how confident I am in that conclusion

I won't claim something works unless I can see a sustained, meaningful change that's unlikely to be noise. "Meaningful" for me means an RMSSD change of >2 ms (roughly half a standard deviation in my baseline data) maintained for at least 4 weeks.

---

The [HRV and RHR Tracker spreadsheet](/tools) is available for free if you want to use the same approach.
