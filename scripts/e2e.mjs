// `npm run e2e`: serve dist/ on port 4323, run Playwright against it, then
// stop the server. Playwright's own webServer option starts the server fine
// but on Windows never exits after the last test, so this script owns the
// server and Playwright reuses it (reuseExistingServer in playwright.config.ts).
// Run `npm run build` first.

import { spawnSync } from 'node:child_process';
import { serve } from './lib/serve.mjs';

const { stop } = await serve(4323);
let status = 1;
try {
	const result = spawnSync(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', ...process.argv.slice(2)], { stdio: 'inherit' });
	status = result.status ?? 1;
} finally {
	stop();
}
process.exit(status);
