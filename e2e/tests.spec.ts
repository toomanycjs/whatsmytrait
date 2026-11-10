// A full run of each test page: start, answer every item with the keyboard,
// finish, see a strip per domain with a percentile, reload and see the
// result restored from this device, then start again. Add a line to TESTS
// for every test page.
import { expect, test, type Page } from '@playwright/test';

const TESTS = [
	{ path: '/tests/big-five/short/', items: 50, domains: 5, facets: 0 },
	{ path: '/tests/big-five/', items: 120, domains: 5, facets: 30 },
	{ path: '/tests/quick/', items: 10, domains: 5, facets: 0 },
	{ path: '/tests/self-esteem/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/introvert-or-extrovert/', items: 20, domains: 1, facets: 0 },
	{ path: '/tests/assertiveness/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/patience/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/perfectionism/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/perfectionism/', items: 10, domains: 1, facets: 0, phone: true },
	{ path: '/tests/shyness/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/shyness/', items: 10, domains: 1, facets: 0, phone: true },
	{ path: '/tests/empathy/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/empathy/', items: 10, domains: 1, facets: 0, phone: true },
	{ path: '/tests/leadership/', items: 7, domains: 1, facets: 0 },
	{ path: '/tests/leadership/', items: 7, domains: 1, facets: 0, phone: true },
	{ path: '/tests/optimism/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/optimism/', items: 10, domains: 1, facets: 0, phone: true },
	{ path: '/tests/locus-of-control/', items: 20, domains: 1, facets: 0 },
	{ path: '/tests/locus-of-control/', items: 20, domains: 1, facets: 0, phone: true },
	{ path: '/tests/need-for-cognition/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/need-for-cognition/', items: 10, domains: 1, facets: 0, phone: true },
	{ path: '/tests/self-monitoring/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/self-monitoring/', items: 10, domains: 1, facets: 0, phone: true },
	{ path: '/tests/curiosity/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/perseverance/', items: 8, domains: 1, facets: 0 },
	{ path: '/tests/orderliness/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/creativity/', items: 8, domains: 1, facets: 0 },
	{ path: '/tests/courage/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/trust/', items: 10, domains: 1, facets: 0 },
	{ path: '/tests/emotional-stability/', items: 20, domains: 1, facets: 0 },
	{ path: '/tests/emotional-intelligence/', items: 68, domains: 7, facets: 0 },
	{ path: '/tests/interpersonal-style/', items: 32, domains: 8, facets: 0 },
	{ path: '/tests/character-strengths/', items: 96, domains: 24, facets: 0 },
];

async function answerScreen(page: Page, count: number, key: string) {
	for (let i = 0; i < count; i++) await page.keyboard.press(key);
}

for (const t of TESTS as { path: string; items: number; domains: number; facets: number; phone?: boolean }[]) {
	test(`full run of ${t.path}${t.phone ? ' at phone width' : ''}`, async ({ page }) => {
		if (t.phone) await page.setViewportSize({ width: 375, height: 812 });
		await page.goto(t.path);
		await expect(page.locator('h1')).toBeVisible();
		await page.getByRole('button', { name: 'Start the test' }).click();
		const screens = Math.ceil(t.items / 10);
		for (let s = 1; s <= screens; s++) {
			await expect(page.locator('[data-screen-label]')).toHaveText(`Screen ${s} of ${screens}`);
			const onScreen = s === screens ? t.items - (screens - 1) * 10 : 10;
			await answerScreen(page, onScreen, String((s % 5) + 1));
			await expect(page.locator('[data-answered]')).toHaveText(`${Math.min(s * 10, t.items)} of ${t.items} answered`);
			await page.keyboard.press('Enter');
		}
		const results = page.locator('[data-results]');
		await expect(results).toBeVisible();
		await expect(results.locator('.result .strip-domain')).toHaveCount(t.domains);
		await expect(results.locator('.result .strip-facet')).toHaveCount(t.facets);
		if (t.path.startsWith('/tests/big-five')) await expect(results.locator('.strip-domain .pct').first()).toHaveText(/^\d+(st|nd|rd|th)$/);
		else await expect(results.locator('.strip-no-norms')).toHaveCount(t.domains);
		await expect(results.locator('.means em')).toHaveCount(t.domains);

		// The result is restored from this device on reload.
		await page.reload();
		await expect(page.locator('[data-results]')).toBeVisible();
		await expect(page.locator('[data-results] .result .strip-domain')).toHaveCount(t.domains);
		await expect(page.getByRole('button', { name: 'Take the test again' })).toBeVisible();

		// Start again clears the attempt and shows screen one.
		await page.getByRole('button', { name: 'Start again' }).click();
		await expect(page.locator('[data-screen-label]')).toHaveText(`Screen 1 of ${screens}`);
		await expect(page.locator('[data-answered]')).toHaveText(`0 of ${t.items} answered`);
	});
}

test('the career interests check list counts ticks per area', async ({ page }) => {
	await page.goto('/tests/career-interests/');
	await page.getByRole('button', { name: 'Start the test' }).click();
	// Tick every item on screen 1 (the ten realistic activities) and nothing else.
	for (let n = 1; n <= 10; n++) await page.locator(`label.check:has(input[name="q${n}"])`).click();
	for (let s = 1; s <= 6; s++) {
		await expect(page.locator('[data-screen-label]')).toHaveText(`Screen ${s} of 6`);
		await page.keyboard.press('Enter');
	}
	const results = page.locator('[data-results]');
	await expect(results).toBeVisible();
	await expect(results.locator('.result')).toHaveCount(6);
	await expect(results.locator('.result').first().locator('.scale-raw')).toHaveText('10 of 10');
	await expect(results.locator('.result').nth(1).locator('.scale-raw')).toHaveText('0 of 10');
});

test('an unanswered item stops the screen and names it', async ({ page }) => {
	await page.goto('/tests/big-five/short/');
	await page.getByRole('button', { name: 'Start the test' }).click();
	await answerScreen(page, 9, '3');
	await page.keyboard.press('Enter');
	await expect(page.locator('[data-test-status]')).toHaveText('Answer item 10 to continue.');
	await expect(page.locator('[data-item="10"]')).toHaveClass(/missing/);
});

test('a saved attempt offers to carry on after a reload', async ({ page }) => {
	await page.goto('/tests/big-five/short/');
	await page.getByRole('button', { name: 'Start the test' }).click();
	await answerScreen(page, 10, '4');
	await page.keyboard.press('Enter');
	await answerScreen(page, 3, '2');
	await page.reload();
	await page.getByRole('button', { name: 'Start the test' }).click();
	await expect(page.locator('[data-resume]')).toBeVisible();
	await page.getByRole('button', { name: 'Carry on' }).click();
	await expect(page.locator('[data-screen-label]')).toHaveText('Screen 2 of 5');
	await expect(page.locator('[data-answered]')).toHaveText('13 of 50 answered');
});

test('a trait page draws the saved marker', async ({ page }) => {
	await page.goto('/tests/big-five/short/');
	await page.getByRole('button', { name: 'Start the test' }).click();
	for (let s = 1; s <= 5; s++) {
		await answerScreen(page, 10, '4');
		await page.keyboard.press('Enter');
	}
	await expect(page.locator('[data-results]')).toBeVisible();
	await page.goto('/traits/extraversion/');
	const row = page.locator('[data-strip-index="1"]');
	await expect(row.locator('.marker')).toHaveCount(1);
	await expect(row.locator('[data-strip-note]')).toHaveText(/Your score from .* sits here, at the \d+(st|nd|rd|th) percentile\./);
	await expect(page.locator('[data-strip-index="0"] .marker')).toHaveCount(0);
});
