---
title: "HRV as a tracking metric: what it tells you and what it doesn't"
description: "An accessible review of what heart rate variability actually measures, why it's relevant to dysautonomia and post-viral conditions, and the limits of using it as a personal tracking tool."
pubDate: 2026-03-20
---

Heart rate variability is one of the most talked-about metrics in wearable health technology and, separately, in autonomic medicine. The two conversations don't always align. This is my attempt to bridge them.

## What HRV is measuring

Your heart doesn't beat at perfectly regular intervals. Even at rest, the time between successive beats varies from moment to moment. This variation is driven largely by the constant interplay between your sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) nervous systems. When you breathe in, sympathetic activity briefly increases and your heart rate rises slightly. When you breathe out, parasympathetic tone predominates and your heart rate slows. This breath-linked oscillation is called respiratory sinus arrhythmia and is the major source of HRV in healthy people.

Higher HRV generally indicates that your autonomic nervous system is flexible and responsive: it can modulate heart rate appropriately in response to changing demands. Lower HRV indicates reduced parasympathetic tone, which can reflect chronic stress, illness, poor recovery, or, in people like us, pathological autonomic dysfunction.

## The metrics

There are several ways to quantify HRV. The three you'll encounter most often:

**RMSSD** (root mean square of successive differences) is the standard metric in personal health tracking. It's calculated from the differences between consecutive RR intervals (the time between beats) and primarily reflects parasympathetic activity via the vagus nerve. This is what most consumer devices report when they say "HRV," including Fitbit, which is what I use.

**SDNN** (standard deviation of NN intervals) captures total autonomic variability, including both sympathetic and parasympathetic components. It's more commonly used in clinical research and cardiac risk stratification than in personal tracking.

**LF/HF ratio** (the ratio of low-frequency to high-frequency power in the HRV frequency spectrum) was once thought to represent sympathovagal balance. This interpretation has been substantially revised. The LF/HF ratio is not a reliable index of sympathetic vs parasympathetic activity in most contexts. If your app reports it, I'd ignore it.

For day-to-day personal tracking, RMSSD is the one to use. It's reproducible, physiologically interpretable, and what the research literature most commonly reports in studies of autonomic dysfunction.

## Why it matters in dysautonomia

In autonomic dysfunction, the vagus nerve's ability to regulate heart rate is impaired. This shows up as reduced baseline RMSSD, blunted or absent respiratory sinus arrhythmia, poor heart rate recovery after exertion, and exaggerated resting sympathetic tone (reflected in elevated resting heart rate).

Several studies have confirmed reduced HRV in POTS patients compared to healthy controls. A 2021 paper by Ormiston et al. in *Frontiers in Physiology* found that POTS patients had significantly lower RMSSD, and that HRV metrics correlated with symptom severity on standardised questionnaires. This fits the broader autonomic picture: the vagus nerve isn't doing its job properly, and RMSSD is a way of quantifying how much.

My own median RMSSD is around 16ms, measured overnight by a Fitbit. A typical value for someone my age would be 40–60ms. That puts me roughly in the bottom 10th percentile, consistent with clinically significant autonomic dysfunction.

## How I use it

I use RMSSD for three things. First, as a baseline measure of my autonomic state: a way of putting a number on how impaired my parasympathetic tone is. Second, as a long-term trend marker: if an intervention is genuinely improving my autonomic function, I'd expect to see RMSSD rise over weeks or months. Third, as a loose daily readiness signal: on mornings when my overnight RMSSD is particularly low, I treat that as a flag to be cautious about exertion.

I don't use it to micromanage my daily activity, and I don't make decisions about individual sessions based on a single reading. The signal-to-noise ratio at that timescale is too poor.

## The limits

**Day-to-day variability is high.** A single reading means almost nothing. My RMSSD can swing between 12 and 22 on consecutive nights without any real change in my underlying autonomic state. Weekly or monthly medians are what matter.

**Confounders are everywhere.** Alcohol, poor sleep, illness, and emotional stress all reduce HRV, sometimes dramatically. A bad night's sleep can drop RMSSD by 20–40% in healthy individuals. Any analysis of trends needs to account for these.

**Consumer wrist devices have measurement error.** Optical (PPG) sensors on the wrist are less accurate than chest strap ECGs, particularly for short recordings. Fitbit measures during sleep, which helps (less motion artefact), but the readings will have wider error bars than a Polar H10 or similar chest strap. For tracking trends over weeks this is acceptable. For interpreting a single night's number, it isn't.

**HRV reflects autonomic state, not symptom severity.** Your RMSSD might be low and improving while your fatigue remains high, or vice versa. It's one data point among several, not a proxy for how you feel on any given day.

**"HRV training" products are largely unsupported.** There is an entire industry of apps and devices claiming to "train" or "improve" your HRV. Most have limited or no rigorous evidence behind them. HRV as a readiness metric (used in elite sport) has reasonably good evidence; HRV as a training target for dysautonomia is much less established. I'll write separately about vagal nerve stimulation, which has a stronger (though still limited) evidence base.

## Summary

HRV — specifically RMSSD — is a genuinely useful metric for people with post-viral autonomic dysfunction. It gives you a reproducible, sensitive proxy for parasympathetic tone that you can track at home with a consumer device. But it's noisy, it's affected by confounders, and it doesn't directly measure how you feel. Treat it as one input among several, look at trends over weeks rather than individual readings, and don't let the number dictate your day.
