import { defineConfig, devices } from '@playwright/test';

// One full run of every test page, against the built site: `npm run e2e`
// (builds first via the webServer command).
export default defineConfig({
	testDir: './e2e',
	timeout: 60_000,
	fullyParallel: false,
	reporter: 'list',
	use: {
		baseURL: 'http://127.0.0.1:4323',
		...devices['Desktop Chrome'],
	},
	webServer: {
		// Astro's own entry point rather than `npx astro`: on Windows the npx
		// wrapper leaves the server running when Playwright shuts it down, and
		// the run never exits after the last test.
		command: 'node node_modules/astro/bin/astro.mjs preview --port 4323 --host 127.0.0.1',
		url: 'http://127.0.0.1:4323/',
		reuseExistingServer: true,
		timeout: 60_000,
	},
});
