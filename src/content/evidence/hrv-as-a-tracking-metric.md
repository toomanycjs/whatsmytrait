---
title: "HRV as a tracking metric — what it tells you and what it doesn't"
description: "An accessible review of what heart rate variability actually measures, why it's relevant to dysautonomia and post-viral conditions, and the limits of using it as a personal tracking tool."
pubDate: 2026-03-20
---

Heart rate variability (HRV) is one of the most talked-about metrics in wearable health technology and, separately, in autonomic medicine. The two conversations don't always align. This is my attempt to bridge them — to explain what HRV actually measures, why it's genuinely relevant to people with post-viral dysautonomia, and where the hype outstrips the evidence.

## What HRV is measuring

Your heart doesn't beat at perfectly regular intervals. Even at rest, the time between successive beats varies from moment to moment. This variation — heart rate variability — is driven largely by the constant interplay between your sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) nervous systems. When you breathe in, sympathetic activity briefly increases and your heart rate rises slightly. When you breathe out, parasympathetic tone predominates and your heart rate slows slightly. This respiratory-linked oscillation is called respiratory sinus arrhythmia (RSA) and is the major source of HRV in healthy people.

Higher HRV generally indicates that your autonomic nervous system is flexible and responsive — it can modulate heart rate appropriately in response to changing demands. Lower HRV indicates reduced parasympathetic tone, which can reflect chronic stress, illness, poor recovery, or, in people like us, pathological autonomic dysfunction.

## The metrics: what RMSSD actually is

There are several ways to quantify HRV:

**RMSSD** (root mean square of successive differences) is the most commonly used metric in personal health tracking. It's calculated from the differences between consecutive RR intervals (the time between beats) and primarily reflects parasympathetic activity, specifically via the vagus nerve.

**SDNN** (standard deviation of NN intervals) captures total autonomic variability, including both sympathetic and parasympathetic components. It's more commonly used in clinical research and cardiac risk stratification.

**LF/HF ratio** — the ratio of low-frequency to high-frequency power in the HRV frequency spectrum — was once thought to represent the sympathetic/parasympathetic balance. This interpretation has been substantially revised; the LF/HF ratio is not a reliable index of sympathovagal balance in most contexts and I'd ignore it in consumer apps.

For day-to-day personal tracking, RMSSD is the metric to use. It's reproducible, physiologically interpretable, and what most modern consumer devices (Polar, Garmin, Whoop, Apple Watch) are actually measuring when they report "HRV."

## Why it's relevant in dysautonomia

In autonomic dysfunction, the vagus nerve's ability to regulate heart rate is impaired. This manifests as:

- Reduced baseline RMSSD
- Blunted or absent RSA (the breath-linked oscillation)
- Poor heart rate recovery after exertion
- Exaggerated resting sympathetic tone (reflected in elevated resting heart rate)

Several studies have confirmed reduced HRV in POTS patients compared to healthy controls. A 2021 paper by Ormiston et al. in *Frontiers in Physiology* found that POTS patients had significantly lower RMSSD than controls, and that HRV metrics correlated with symptom severity on standardised questionnaires.

For those of us tracking our own condition over time, this means RMSSD gives us a proxy measure of our autonomic state — not a perfect one, but a sensitive and consistent one.

## My own data

My pre-Nurosym baseline RMSSD, measured over 4 weeks using a Polar H10 in the morning, was **18.4 ms** (SD 4.2 ms). For context, age-matched population norms are typically 35–45 ms. The normative database in the HRV4Training app suggests my RMSSD is in approximately the 10th percentile for my demographic.

This is consistent with clinically significant autonomic dysfunction, which aligns with my diagnosis. It's also a useful starting point: if any intervention improves my parasympathetic tone, I'd expect to see RMSSD rise. I've set a threshold of >2 ms (about half a standard deviation) sustained over 4 weeks as my "meaningful change" criterion.

## The limits: what HRV doesn't tell you

**Day-to-day variability is high.** My standard deviation is 4.2 ms. That means on any given day, my RMSSD could be 14 or 23 without any real change in my underlying autonomic state. A single reading tells you almost nothing. Weekly or monthly medians are what matters.

**Alcohol, illness, and poor sleep all suppress HRV.** Dramatically. A night of broken sleep or a glass of wine the evening before can drop RMSSD by 20–40% in healthy individuals. In dysautonomia patients, the baseline is already low, which may mean the ceiling effects are different — but the principle holds. Any analysis needs to control for these confounds.

**Consumer devices have measurement error.** Optical (PPG) sensors — the kind in watches and fitness trackers on the wrist — are less accurate than chest ECG straps for HRV measurement, particularly for short recordings. Wrist-based devices use algorithms to estimate RMSSD that vary in accuracy between manufacturers. For serious tracking, a Polar H10 or equivalent chest strap is more reliable.

**HRV reflects autonomic state, not symptom severity directly.** Your RMSSD might be low and improving while your fatigue remains high, or vice versa. HRV is one data point among several, not a proxy for overall health or wellbeing.

**"HRV training" products are largely unsupported.** There's an entire industry of apps, devices, and interventions claiming to "train" or "improve" your HRV. Most of these have limited or no rigorous evidence behind them. HRV as a readiness metric (used in elite sport) has reasonably good evidence; HRV as a training target for dysautonomia is much less established.

## What I use it for

I use RMSSD as:

1. A baseline biomarker for my autonomic state — a way of quantifying objectively how impaired my parasympathetic tone is
2. A long-term trend marker — to detect sustained changes in response to interventions
3. A morning readiness check — on days when my RMSSD is particularly low, I treat it as a signal to be cautious about exertion

I don't use it to micromanage my daily activity, and I don't make decisions about individual sessions based on a single reading. The signal-to-noise ratio at that timescale is too poor.

---

**Further reading:**
- Shaffer F, Ginsberg JP. *An Overview of Heart Rate Variability Metrics and Norms.* Front Public Health. 2017.
- Ormiston CK, et al. *Postural tachycardia syndrome (POTS): State of the science and clinical care from a 2019 National Institutes of Health Expert Consensus Meeting.* Auton Neurosci. 2022.
- Electrophysiology TFotESoC. *Heart rate variability: standards of measurement, physiological interpretation, and clinical use.* Circulation. 1996.
