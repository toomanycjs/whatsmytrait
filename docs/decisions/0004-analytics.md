# 0004: analytics

Date: 3 November 2026. The owner asked for analytics and Search Console after launch.

The brief said no analytics at launch and, if counts were wanted later, a cookieless page-count service stated on the privacy page. Vercel Web Analytics is that: it sets no cookies, stores no IP address, does not identify or follow visitors, and reports page views with coarse country and browser data. The site loads its script from the same host (`/_vercel/insights/script.js`), so there is still no third-party script and no consent banner is needed. The privacy page describes it in plain words.

Google Analytics was not used: it sets cookies and identifies visitors, which would break the site's promise and require a consent banner.

Enabling it is a toggle on the Vercel project (Analytics tab); the script is harmless until then.

Search Console is verified by a DNS record or an HTML tag, both of which need a token from the owner's Google account; the sitemap to submit is https://www.whatsmytrait.com/sitemap-index.xml.
