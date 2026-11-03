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
		command: 'npx astro preview --port 4323 --host 127.0.0.1',
		url: 'http://127.0.0.1:4323/',
		reuseExistingServer: true,
		timeout: 60_000,
	},
});
