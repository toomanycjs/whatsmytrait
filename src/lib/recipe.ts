// Recipe data for Low Spoon Cooking posts. The ingredient groups and method
// steps live in the post's frontmatter (`recipe:`) and are rendered on the
// page by RecipeIngredients and RecipeMethod, so the visible lists and the
// Recipe JSON-LD come from the same source and cannot drift apart.

export interface IngredientGroup {
	/** Sub-heading above the list, e.g. "The base". */
	heading?: string;
	/** Short line between the heading and the list. */
	intro?: string;
	items: string[];
	/** Short line after the list. */
	note?: string;
}

export interface Step {
	text: string;
	/** Bullet points under the step, e.g. the sardines or tuna alternatives. */
	options?: string[];
}

export interface RecipeData {
	/** Active time, in minutes. */
	prepMinutes: number;
	/** Hands-off time, in minutes. */
	cookMinutes: number;
	/** What the recipe makes, e.g. "about 6 portions". */
	yield: string;
	/** Photo of the finished dish, an absolute path under /public. Falls back to the share image. */
	image?: string;
	category?: string;
	cuisine?: string;
	keywords?: string[];
	ingredients: IngredientGroup[];
	steps: (string | Step)[];
}

const escapeHtml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * The small subset of Markdown used in ingredient and step text: **bold**,
 * *italic*, [links](/path/). Apostrophes become curly, as the Markdown
 * renderer does for the rest of the post.
 */
export function inline(md: string): string {
	return escapeHtml(md)
		.replace(/(\w)'(\w)/g, '$1’$2')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

/** The same text with the Markdown removed, for JSON-LD. */
export function plain(md: string): string {
	return md
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]+)\*/g, '$1')
		.replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1');
}

export const asStep = (s: string | Step): Step => (typeof s === 'string' ? { text: s } : s);

/** Minutes to an ISO 8601 duration, e.g. 540 → PT9H. */
export function duration(minutes: number): string {
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return `PT${h ? `${h}H` : ''}${m || !h ? `${m}M` : ''}`;
}

export const slug = (s: string) =>
	s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
