// Serve dist/ with `astro preview` for a check script, and stop it properly.
//
// On Windows, killing the spawned process does not stop the server under it:
// the preview server lives on, holds its port, and the next run either hangs
// waiting for it or reuses a stale one. stop() kills the whole process tree.

import { execFileSync, spawn } from 'node:child_process';

export async function serve(port) {
	const base = `http://127.0.0.1:${port}`;
	const child = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'preview', '--port', String(port), '--host', '127.0.0.1'], { stdio: 'ignore' });
	const stop = () => {
		if (child.exitCode !== null || child.pid === undefined) return;
		if (process.platform === 'win32') {
			try { execFileSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' }); } catch { /* already gone */ }
		} else {
			child.kill('SIGTERM');
		}
	};
	for (let i = 0; i < 120; i++) {
		try { const r = await fetch(`${base}/`); if (r.ok) return { base, stop }; } catch { /* not yet */ }
		await new Promise((r) => setTimeout(r, 500));
	}
	stop();
	throw new Error(`preview server on port ${port} did not start`);
}
