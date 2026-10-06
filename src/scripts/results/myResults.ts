// Client side of /tools/my-results/: every saved result on this device,
// grouped by tool, with copy-all, CSV-all and delete-all. Like the tool pages,
// everything is read from localStorage and inserted with textContent.

import { trackEvent } from '../pageview';
import { csvFilename, toCsv, toTextAll } from './export';
import { comparisonSentence, formatDate, outcomeText } from './format';
import { deleteAll, deleteEntry, deleteTool, isAvailable, readAll } from './resultsStore';
import { confirmControl, copyText, download, h, previousComparable, renderChart, renderTable } from './scoreHistory';
import type { ResultEntry, ToolConfig } from './types';

export function mountMyResults(configs: ToolConfig[]) {
	const root = document.querySelector<HTMLElement>('.my-results');
	if (!root) return;
	const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
	const status = q('.mr-status');
	const actions = q('.mr-actions');
	const exportStatus = q('.mr-export-status');
	const list = q('.mr-tools');
	const deleteAllSlot = q('.mr-delete-all');

	if (!isAvailable()) {
		status.textContent = 'This browser is not keeping saved results (it may be a private window, or site data may be blocked), so there is nothing to show here.';
		return;
	}

	const known = new Set(configs.map(c => c.id));
	const entries = () => readAll().filter(e => known.has(e.tool));

	function toolSection(cfg: ToolConfig, mine: ResultEntry[]): HTMLElement {
		const section = h('section', 'mr-tool');
		section.id = `tool-${cfg.id}`;
		const heading = h('h2');
		heading.tabIndex = -1;
		const link = h('a', undefined, cfg.name);
		link.href = cfg.path;
		heading.append(link);
		const n = mine.length;
		const prev = n >= 2 ? previousComparable(cfg, mine, n - 1) : undefined;
		const last = mine[n - 1];
		section.append(
			heading,
			h('p', 'sh-comparison', prev ? comparisonSentence(cfg, prev, last) : `${formatDate(last.date)}: ${outcomeText(cfg, last)}.`),
			renderTable(cfg, mine, {
				caption: `Your saved ${cfg.name} results, newest first`,
				onDelete: id => { deleteEntry(id); render(); focusAfterDelete(cfg); },
			}),
		);
		const chart = renderChart(cfg, mine);
		if (chart) section.append(chart);
		const foot = h('p', 'mr-tool-foot');
		const retake = h('a', undefined, `Retake the ${cfg.name}`);
		retake.href = cfg.path;
		foot.append(retake, ' ', confirmControl(
			`Delete all ${cfg.name} results`,
			`Delete all ${n} saved ${cfg.name} ${n === 1 ? 'result' : 'results'} from this device?`,
			'Yes, delete',
			() => { deleteTool(cfg.id); render(); focusAfterDelete(cfg); },
		));
		section.append(foot);
		return section;
	}

	/** After a delete, keep focus on the same tool's heading, or the page status if the tool is gone. */
	function focusAfterDelete(cfg: ToolConfig) {
		const heading = list.querySelector<HTMLElement>(`#tool-${cfg.id} h2`);
		(heading ?? status).focus();
	}

	function render() {
		const all = entries();
		const tools = configs
			.map(cfg => ({ cfg, mine: all.filter(e => e.tool === cfg.id) }))
			.filter(x => x.mine.length);

		actions.hidden = all.length === 0;
		status.textContent = all.length
			? `${all.length} saved ${all.length === 1 ? 'result' : 'results'} from ${tools.length} ${tools.length === 1 ? 'tool' : 'tools'} on this device.`
			: 'No results are saved on this device. When you complete a questionnaire, your result is saved here automatically.';
		list.replaceChildren(...tools.map(x => toolSection(x.cfg, x.mine)));

		deleteAllSlot.replaceChildren();
		if (all.length) {
			deleteAllSlot.append(confirmControl(
				'Delete all saved results',
				`Delete all ${all.length} saved ${all.length === 1 ? 'result' : 'results'}, for every tool, from this device? This cannot be undone.`,
				'Yes, delete everything',
				() => { deleteAll(); render(); status.focus(); },
			));
		}
		return all.length;
	}

	q('[data-export="text"]').addEventListener('click', async () => {
		const ok = await copyText(toTextAll(configs, entries()));
		exportStatus.textContent = ok ? 'Copied. You can paste it into an email or message.' : 'Copying was blocked by your browser.';
		if (ok) trackEvent('result_exported', { tool: 'all', format: 'text' });
	});
	q('[data-export="csv"]').addEventListener('click', () => {
		download(csvFilename('postviralrecovery'), toCsv(entries(), configs, true), 'text/csv;charset=utf-8');
		exportStatus.textContent = 'CSV downloaded.';
		trackEvent('result_exported', { tool: 'all', format: 'csv' });
	});

	const count = render();
	if (count) trackEvent('history_viewed', { tool: 'all', entry_count: count });
}
