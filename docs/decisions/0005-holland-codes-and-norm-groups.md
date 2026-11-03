# 0005: the twenty Holland codes, the norms group picker and the strengths index

Date: 3 November 2026.

## Which twenty codes

The brief asked for a page of the twenty commonest three-letter Holland codes with UK jobs, and said not to invent frequency figures. O*NET OnLine's browse-by-interests pages (https://www.onetonline.org/explore/interests/Realistic/ and the other five) list every occupation with its interest code, so the six pages were fetched on 3 November 2026 and the three-letter codes counted across the 923 occupations listed: 490 carry a three-letter code, 413 a two-letter code and 20 a single letter. The twenty codes on `/careers/codes/` are the twenty with the most occupations. Five codes tied for the last two places (CIE, CSE, ECI, IRS, RCA, seven occupations each); CIE and IRS were taken because they had UK job profiles to show. The counts are kept in the comment at the top of `src/careers/codes.ts` and are not shown on the page: they describe O*NET's occupation list, not how common each code is among people, and the page says so.

Artistic and social codes are rare among three-letter codes in O*NET (most artistic and social occupations carry two-letter codes), so the page tells readers whose code is missing to use the type page for their first letter.

## UK jobs for each code

Each code lists UK job titles mapped by hand from O*NET occupations carrying that exact code, each linking to a National Careers Service job profile. The service publishes an explore-careers sitemap (https://nationalcareers.service.gov.uk/explore-careers/sitemap.xml, 731 profiles on 3 November 2026) and every slug used is in it. Guessed slugs that were not in the sitemap redirect to a 404 page with a 302 status, so a status check alone is not enough; the sitemap is the check. ISR has four jobs, not five: the UK profiles for its other O*NET occupations (obstetricians, urologists, ophthalmologists) do not exist as separate National Careers Service pages.

## The norms group picker

Both Big Five norm tables carry several groups (everyone, five age bands and the United Kingdom for the IPIP-NEO-120; everyone, the United Kingdom and the United States for the 50-item markers). The results plate now has a "Compare with" select listing every group with its size. Changing it redraws the same results against the chosen group and stores the choice on the device per instrument (`tests:norms-group:<id>`), so the trait pages and later visits use it. Nothing is sent anywhere. The default stays the page's `normsGroup` (everyone).

## The strengths index

`/strengths/` carries one entry per character strength: the site's name, the published name from the IPIP key page, Peterson and Seligman's virtue, the four public-domain items with reversed ones marked, and the test page's high and low copy, imported from `src/tests/character-strengths.ts` so the two never drift. It is linked from the character strengths test, the traits index and the four strengths guides' subjects.
