# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests.spec.ts >> the career interests check list counts ticks per area
- Location: e2e\tests.spec.ts:62:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('[data-screen-label]')
Expected: "Screen 2 of 6"
Received: "Screen 1 of 6"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('[data-screen-label]') with timeout 5000ms
  - waiting for locator('[data-screen-label]')
    14 × locator resolved to <span data-screen-label="">Screen 1 of 6</span>
       - unexpected value "Screen 1 of 6"

```

```yaml
- text: Screen 1 of 6
```

# Test source

```ts
  1   | // A full run of each test page: start, answer every item with the keyboard,
  2   | // finish, see a strip per domain with a percentile, reload and see the
  3   | // result restored from this device, then start again. Add a line to TESTS
  4   | // for every test page.
  5   | import { expect, test, type Page } from '@playwright/test';
  6   | 
  7   | const TESTS = [
  8   | 	{ path: '/tests/big-five/short/', items: 50, domains: 5, facets: 0 },
  9   | 	{ path: '/tests/big-five/', items: 120, domains: 5, facets: 30 },
  10  | 	{ path: '/tests/quick/', items: 10, domains: 5, facets: 0 },
  11  | 	{ path: '/tests/self-esteem/', items: 10, domains: 1, facets: 0 },
  12  | 	{ path: '/tests/introvert-or-extrovert/', items: 20, domains: 1, facets: 0 },
  13  | 	{ path: '/tests/assertiveness/', items: 10, domains: 1, facets: 0 },
  14  | 	{ path: '/tests/patience/', items: 10, domains: 1, facets: 0 },
  15  | 	{ path: '/tests/curiosity/', items: 10, domains: 1, facets: 0 },
  16  | 	{ path: '/tests/perseverance/', items: 8, domains: 1, facets: 0 },
  17  | 	{ path: '/tests/orderliness/', items: 10, domains: 1, facets: 0 },
  18  | 	{ path: '/tests/creativity/', items: 8, domains: 1, facets: 0 },
  19  | 	{ path: '/tests/courage/', items: 10, domains: 1, facets: 0 },
  20  | 	{ path: '/tests/trust/', items: 10, domains: 1, facets: 0 },
  21  | 	{ path: '/tests/emotional-stability/', items: 20, domains: 1, facets: 0 },
  22  | ];
  23  | 
  24  | async function answerScreen(page: Page, count: number, key: string) {
  25  | 	for (let i = 0; i < count; i++) await page.keyboard.press(key);
  26  | }
  27  | 
  28  | for (const t of TESTS) {
  29  | 	test(`full run of ${t.path}`, async ({ page }) => {
  30  | 		await page.goto(t.path);
  31  | 		await expect(page.locator('h1')).toBeVisible();
  32  | 		await page.getByRole('button', { name: 'Start the test' }).click();
  33  | 		const screens = Math.ceil(t.items / 10);
  34  | 		for (let s = 1; s <= screens; s++) {
  35  | 			await expect(page.locator('[data-screen-label]')).toHaveText(`Screen ${s} of ${screens}`);
  36  | 			const onScreen = s === screens ? t.items - (screens - 1) * 10 : 10;
  37  | 			await answerScreen(page, onScreen, String((s % 5) + 1));
  38  | 			await expect(page.locator('[data-answered]')).toHaveText(`${Math.min(s * 10, t.items)} of ${t.items} answered`);
  39  | 			await page.keyboard.press('Enter');
  40  | 		}
  41  | 		const results = page.locator('[data-results]');
  42  | 		await expect(results).toBeVisible();
  43  | 		await expect(results.locator('.result .strip-domain')).toHaveCount(t.domains);
  44  | 		await expect(results.locator('.result .strip-facet')).toHaveCount(t.facets);
  45  | 		if (t.path.startsWith('/tests/big-five')) await expect(results.locator('.strip-domain .pct').first()).toHaveText(/^\d+(st|nd|rd|th)$/);
  46  | 		else await expect(results.locator('.strip-no-norms')).toHaveCount(t.domains);
  47  | 		await expect(results.locator('.means em')).toHaveCount(t.domains);
  48  | 
  49  | 		// The result is restored from this device on reload.
  50  | 		await page.reload();
  51  | 		await expect(page.locator('[data-results]')).toBeVisible();
  52  | 		await expect(page.locator('[data-results] .result .strip-domain')).toHaveCount(t.domains);
  53  | 		await expect(page.getByRole('button', { name: 'Take the test again' })).toBeVisible();
  54  | 
  55  | 		// Start again clears the attempt and shows screen one.
  56  | 		await page.getByRole('button', { name: 'Start again' }).click();
  57  | 		await expect(page.locator('[data-screen-label]')).toHaveText(`Screen 1 of ${screens}`);
  58  | 		await expect(page.locator('[data-answered]')).toHaveText(`0 of ${t.items} answered`);
  59  | 	});
  60  | }
  61  | 
  62  | test('the career interests check list counts ticks per area', async ({ page }) => {
  63  | 	await page.goto('/tests/career-interests/');
  64  | 	await page.getByRole('button', { name: 'Start the test' }).click();
  65  | 	// Tick every item on screen 1 (the ten realistic activities) and nothing else.
  66  | 	for (let n = 1; n <= 10; n++) await page.locator(`label.check:has(input[name="q${n}"])`).click();
  67  | 	for (let s = 1; s <= 6; s++) {
> 68  | 		await expect(page.locator('[data-screen-label]')).toHaveText(`Screen ${s} of 6`);
      |                                                     ^ Error: expect(locator).toHaveText(expected) failed
  69  | 		await page.keyboard.press('Enter');
  70  | 	}
  71  | 	const results = page.locator('[data-results]');
  72  | 	await expect(results).toBeVisible();
  73  | 	await expect(results.locator('.result')).toHaveCount(6);
  74  | 	await expect(results.locator('.result').first().locator('.scale-raw')).toHaveText('10 of 10');
  75  | 	await expect(results.locator('.result').nth(1).locator('.scale-raw')).toHaveText('0 of 10');
  76  | });
  77  | 
  78  | test('an unanswered item stops the screen and names it', async ({ page }) => {
  79  | 	await page.goto('/tests/big-five/short/');
  80  | 	await page.getByRole('button', { name: 'Start the test' }).click();
  81  | 	await answerScreen(page, 9, '3');
  82  | 	await page.keyboard.press('Enter');
  83  | 	await expect(page.locator('[data-test-status]')).toHaveText('Answer item 10 to continue.');
  84  | 	await expect(page.locator('[data-item="10"]')).toHaveClass(/missing/);
  85  | });
  86  | 
  87  | test('a saved attempt offers to carry on after a reload', async ({ page }) => {
  88  | 	await page.goto('/tests/big-five/short/');
  89  | 	await page.getByRole('button', { name: 'Start the test' }).click();
  90  | 	await answerScreen(page, 10, '4');
  91  | 	await page.keyboard.press('Enter');
  92  | 	await answerScreen(page, 3, '2');
  93  | 	await page.reload();
  94  | 	await page.getByRole('button', { name: 'Start the test' }).click();
  95  | 	await expect(page.locator('[data-resume]')).toBeVisible();
  96  | 	await page.getByRole('button', { name: 'Carry on' }).click();
  97  | 	await expect(page.locator('[data-screen-label]')).toHaveText('Screen 2 of 5');
  98  | 	await expect(page.locator('[data-answered]')).toHaveText('13 of 50 answered');
  99  | });
  100 | 
  101 | test('a trait page draws the saved marker', async ({ page }) => {
  102 | 	await page.goto('/tests/big-five/short/');
  103 | 	await page.getByRole('button', { name: 'Start the test' }).click();
  104 | 	for (let s = 1; s <= 5; s++) {
  105 | 		await answerScreen(page, 10, '4');
  106 | 		await page.keyboard.press('Enter');
  107 | 	}
  108 | 	await expect(page.locator('[data-results]')).toBeVisible();
  109 | 	await page.goto('/traits/extraversion/');
  110 | 	const row = page.locator('[data-strip-index="1"]');
  111 | 	await expect(row.locator('.marker')).toHaveCount(1);
  112 | 	await expect(row.locator('[data-strip-note]')).toHaveText(/Your score from .* sits here, at the \d+(st|nd|rd|th) percentile\./);
  113 | 	await expect(page.locator('[data-strip-index="0"] .marker')).toHaveCount(0);
  114 | });
  115 | 
```