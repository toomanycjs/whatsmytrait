# 0004: analytics

Date: 3 November 2026. The owner asked for analytics and Search Console after launch.

The brief said no analytics at launch and, if counts were wanted later, a cookieless page-count service stated on the privacy page. Vercel Web Analytics is that: it sets no cookies, stores no IP address, does not identify or follow visitors, and reports page views with coarse country and browser data. The site loads its script from the same host (`/_vercel/insights/script.js`), so there is still no third-party script and no consent banner is needed. The privacy page describes it in plain words.

Later the same day the owner asked for Google Analytics as well (measurement id G-HCF4G9DD98, in `src/consts.ts`). It is loaded in Google's consent mode with every storage type denied by default and no banner: GA4 then receives cookieless pings, sets no cookies and reports modelled traffic with less detail (no returning-visitor counts). This keeps the site's no-cookie promise. If the owner wants full GA4 data, a consent banner is required in the UK before analytics storage is granted; that would be a further decision. The gtag script is a third-party script from googletagmanager.com, a departure from the brief's rule, made at the owner's request and stated on the privacy page.

Later the owner said they were not interested in Vercel Web Analytics, so its script was removed and Google Analytics is the only counting.

Search Console is verified by a DNS record or an HTML tag, both of which need a token from the owner's Google account; the sitemap to submit is https://www.whatsmytrait.com/sitemap-index.xml.

Later the same day the Lighthouse check showed what the tag costs: on the simulated mobile profile the gtag script adds 400 to 600 ms of main-thread blocking time on every page, and the performance score falls from 95 to 100 (with the tag blocked) to 83 to 90 (with it loaded). Deferring the script until the page is idle did not change the score. The owner's other site, postviralrecovery.com, loads the same tag and scores the same. The owner chose to keep Analytics, so the performance floor in `scripts/lighthouse.mjs` is now 80; accessibility and best practices stay at 95. Loading the tag only after a first scroll or tap would restore the score but would stop counting visitors who leave without touching the page, and was not taken.
