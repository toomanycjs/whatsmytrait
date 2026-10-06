// JSON-LD for tool pages: breadcrumb plus FAQPage. FAQ answers must be the
// same strings the page renders in its "Understanding your score" section.

const SITE = 'https://www.postviralrecovery.com';

export interface FaqPair {
	q: string;
	a: string;
}

export function toolJsonLd(crumbName: string, path: string, faqs: FaqPair[]) {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
					{ '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE}/tools/` },
					{ '@type': 'ListItem', position: 3, name: crumbName, item: `${SITE}${path}` },
				],
			},
			{
				'@type': 'FAQPage',
				mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
			},
		],
	};
}
