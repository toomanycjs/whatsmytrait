# 0004: analytics

Date: 3 November 2026. The owner asked for analytics and Search Console after launch.

The brief said no analytics at launch and, if counts were wanted later, a cookieless page-count service stated on the privacy page. Vercel Web Analytics is that: it sets no cookies, stores no IP address, does not identify or follow visitors, and reports page views with coarse country and browser data. The site loads its script from the same host (`/_vercel/insights/script.js`), so there is still no third-party script and no consent banner is needed. The privacy page describes it in plain words.

Later the same day the owner asked for Google Analytics as well (measurement id G-HCF4G9DD98, in `src/consts.ts`). It is loaded in Google's consent mode with every storage type denied by default and no banner: GA4 then receives cookieless pings, sets no cookies and reports modelled traffic with less detail (no returning-visitor counts). This keeps the site's no-cookie promise. If the owner wants full GA4 data, a consent banner is required in the UK before analytics storage is granted; that would be a further decision. The gtag script is a third-party script from googletagmanager.com, a departure from the brief's rule, made at the owner's request and stated on the privacy page.

Enabling it is a toggle on the Vercel project (Analytics tab); the script is harmless until then.

Search Console is verified by a DNS record or an HTML tag, both of which need a token from the owner's Google account; the sitemap to submit is https://www.whatsmytrait.com/sitemap-index.xml.
