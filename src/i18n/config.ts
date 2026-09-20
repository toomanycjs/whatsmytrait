// Site-wide locale configuration and the UI strings for the page chrome
// (header, footer, post layout). Page content is translated per page.
//
// URL scheme: English is unprefixed (/tools/compass-31/); every other locale
// is prefixed (/de/tools/compass-31/). Content-collection entries follow the
// same convention in their id (src/content/testing/de/foo.md → /de/testing/foo/).

export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['en', 'de', 'nl', 'it', 'sv', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const NON_DEFAULT_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE) as Locale[];

export function isLocale(value: string | undefined): value is Locale {
	return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Open Graph locale codes. hreflang uses the bare language codes in LOCALES. */
export const OG_LOCALES: Record<Locale, string> = {
	en: 'en_GB',
	de: 'de_DE',
	nl: 'nl_NL',
	it: 'it_IT',
	sv: 'sv_SE',
	es: 'es_ES',
};

/** Each language named in itself, for the switcher. Never flags, never English names. */
export const LANGUAGE_NAMES: Record<Locale, string> = {
	en: 'English',
	de: 'Deutsch',
	nl: 'Nederlands',
	it: 'Italiano',
	sv: 'Svenska',
	es: 'Español',
};

/** Locale of a URL path, from its first segment. */
export function localeFromPath(pathname: string): Locale {
	const first = pathname.replace(/^\/+/, '').split('/')[0];
	return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}

/** Remove a locale prefix from a URL path: /de/tools/x/ → /tools/x/. */
export function stripLocale(pathname: string): string {
	const locale = localeFromPath(pathname);
	if (locale === DEFAULT_LOCALE) return pathname;
	const rest = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '');
	return rest || '/';
}

/** Split a content-collection id into its locale and the remainder. */
export function localeOfId(id: string): { locale: Locale; rest: string } {
	const [first, ...others] = id.split('/');
	if (isLocale(first) && first !== DEFAULT_LOCALE && others.length > 0) {
		return { locale: first, rest: others.join('/') };
	}
	return { locale: DEFAULT_LOCALE, rest: id };
}

/** True for content entries that belong on the English routes. */
export function isDefaultLocaleId(id: string): boolean {
	return localeOfId(id).locale === DEFAULT_LOCALE;
}

export type Section = 'testing' | 'evidence' | 'tools' | 'nhs';

export interface UiStrings {
	nav: Record<Section | 'about' | 'contact', string>;
	skipLink: string;
	mainNav: string;
	languageLabel: string;
	updated: string;
	footer: {
		tagline: string;
		disclaimer: string;
		signupLabel: string;
		emailPlaceholder: string;
		subscribe: string;
		signupNote: string;
	};
}

export const UI: Record<Locale, UiStrings> = {
	en: {
		nav: { testing: 'Testing', evidence: 'Evidence', tools: 'Tools', nhs: 'NHS', about: 'About', contact: 'Contact' },
		skipLink: 'Skip to content',
		mainNav: 'Main',
		languageLabel: 'Language',
		updated: 'Updated',
		footer: {
			tagline: "One person's documented experience of post-viral syndrome.",
			disclaimer: "Nothing here is medical advice. I'm not a clinician; I'm a patient trying to make sense of my own condition. Always discuss any intervention with your doctor.",
			signupLabel: 'Get new posts by email',
			emailPlaceholder: 'your@email.com',
			subscribe: 'Subscribe',
			signupNote: 'No spam. Unsubscribe any time.',
		},
	},
	de: {
		nav: { testing: 'Testberichte', evidence: 'Evidenz', tools: 'Tools', nhs: 'NHS', about: 'Über', contact: 'Kontakt' },
		skipLink: 'Zum Inhalt springen',
		mainNav: 'Hauptnavigation',
		languageLabel: 'Sprache',
		updated: 'Aktualisiert',
		footer: {
			tagline: 'Die dokumentierte Erfahrung einer Person mit postviralem Syndrom.',
			disclaimer: 'Nichts hier ist medizinischer Rat. Ich bin kein Arzt, sondern ein Patient, der seine eigene Erkrankung zu verstehen versucht. Besprechen Sie jede Maßnahme immer mit Ihrer Ärztin oder Ihrem Arzt.',
			signupLabel: 'Neue Beiträge per E-Mail erhalten (auf Englisch)',
			emailPlaceholder: 'name@example.com',
			subscribe: 'Abonnieren',
			signupNote: 'Kein Spam. Jederzeit abbestellbar.',
		},
	},
	nl: {
		nav: { testing: 'Testverslagen', evidence: 'Onderzoek', tools: 'Tools', nhs: 'NHS', about: 'Over', contact: 'Contact' },
		skipLink: 'Naar de inhoud',
		mainNav: 'Hoofdnavigatie',
		languageLabel: 'Taal',
		updated: 'Bijgewerkt',
		footer: {
			tagline: 'De gedocumenteerde ervaring van één persoon met het postviraal syndroom.',
			disclaimer: 'Niets hier is medisch advies. Ik ben geen arts, maar een patiënt die zijn eigen aandoening probeert te begrijpen. Bespreek elke interventie altijd met je arts.',
			signupLabel: 'Nieuwe berichten per e-mail ontvangen (in het Engels)',
			emailPlaceholder: 'naam@voorbeeld.nl',
			subscribe: 'Abonneren',
			signupNote: 'Geen spam. Op elk moment uitschrijven.',
		},
	},
	it: {
		nav: { testing: 'Test', evidence: 'Evidenze', tools: 'Strumenti', nhs: 'NHS', about: 'Chi sono', contact: 'Contatti' },
		skipLink: 'Vai al contenuto',
		mainNav: 'Navigazione principale',
		languageLabel: 'Lingua',
		updated: 'Aggiornato',
		footer: {
			tagline: "L'esperienza documentata di una persona con sindrome post-virale.",
			disclaimer: 'Niente di ciò che trovi qui è un consiglio medico. Non sono un medico, ma un paziente che cerca di capire la propria condizione. Parla sempre di qualsiasi intervento con il tuo medico.',
			signupLabel: 'Ricevi i nuovi articoli via e-mail (in inglese)',
			emailPlaceholder: 'nome@esempio.it',
			subscribe: 'Iscriviti',
			signupNote: 'Niente spam. Puoi annullare quando vuoi.',
		},
	},
	sv: {
		nav: { testing: 'Tester', evidence: 'Evidens', tools: 'Verktyg', nhs: 'NHS', about: 'Om', contact: 'Kontakt' },
		skipLink: 'Hoppa till innehållet',
		mainNav: 'Huvudmeny',
		languageLabel: 'Språk',
		updated: 'Uppdaterad',
		footer: {
			tagline: 'En persons dokumenterade erfarenhet av postviralt syndrom.',
			disclaimer: 'Inget här är medicinsk rådgivning. Jag är inte läkare utan en patient som försöker förstå sin egen sjukdom. Diskutera alltid varje åtgärd med din läkare.',
			signupLabel: 'Få nya inlägg via e-post (på engelska)',
			emailPlaceholder: 'namn@exempel.se',
			subscribe: 'Prenumerera',
			signupNote: 'Ingen skräppost. Avsluta när du vill.',
		},
	},
	es: {
		nav: { testing: 'Pruebas', evidence: 'Evidencia', tools: 'Herramientas', nhs: 'NHS', about: 'Acerca de', contact: 'Contacto' },
		skipLink: 'Saltar al contenido',
		mainNav: 'Navegación principal',
		languageLabel: 'Idioma',
		updated: 'Actualizado',
		footer: {
			tagline: 'La experiencia documentada de una persona con síndrome posviral.',
			disclaimer: 'Nada de lo que hay aquí es consejo médico. No soy médico; soy un paciente que intenta entender su propia enfermedad. Consulta siempre cualquier intervención con tu médico.',
			signupLabel: 'Recibe los nuevos artículos por correo (en inglés)',
			emailPlaceholder: 'nombre@ejemplo.es',
			subscribe: 'Suscribirse',
			signupNote: 'Sin spam. Cancela cuando quieras.',
		},
	},
};

export function ui(locale: string | undefined): UiStrings {
	return UI[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

/** Date formatting locale for toLocaleDateString. English keeps the site's existing US short format. */
export const DATE_LOCALES: Record<Locale, string> = {
	en: 'en-us',
	de: 'de-DE',
	nl: 'nl-NL',
	it: 'it-IT',
	sv: 'sv-SE',
	es: 'es-ES',
};
