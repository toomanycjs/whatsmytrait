import ICAL from 'ical.js';
import { describe, expect, it } from 'vitest';
import { buildReminder, foldLine, googleCalendarUrl, toIcs } from '../src/scripts/results/calendar';
import type { ToolConfig } from '../src/scripts/results/types';

const cfg: ToolConfig = { id: 'compass-31', version: '2', name: 'COMPASS-31', path: '/tools/compass-31/', subscores: [] };
const URL_WITH_UTM = 'https://www.postviralrecovery.com/tools/compass-31/?utm_source=calendar&utm_medium=reminder&utm_campaign=retake';

describe('reminder event', () => {
	it('starts one month out at 10:00 for 15 minutes, day clamped to 28', () => {
		const r = buildReminder(cfg, new Date(2026, 9, 31, 16, 45));
		expect(r.start).toEqual(new Date(2026, 10, 28, 10, 0, 0));
		expect(r.end).toEqual(new Date(2026, 10, 28, 10, 15, 0));
		expect(r.count).toBe(12);
	});
	it('rolls over the year', () => {
		expect(buildReminder(cfg, new Date(2026, 11, 15)).start).toEqual(new Date(2027, 0, 15, 10));
	});
	it('supports a longer interval while still covering a year', () => {
		const r = buildReminder({ ...cfg, reminderMonths: 3 }, new Date(2026, 9, 5));
		expect(r.start).toEqual(new Date(2027, 0, 5, 10));
		expect(r.count).toBe(4);
	});
});

describe('.ics file', () => {
	const now = new Date(Date.UTC(2026, 9, 5, 9, 30));
	const ics = toIcs(buildReminder(cfg, new Date(2026, 9, 5, 14)), '1234-abcd', now);

	it('uses CRLF line endings and folds every line to 75 octets', () => {
		expect(ics.endsWith('\r\n')).toBe(true);
		expect(ics.replace(/\r\n/g, '')).not.toMatch(/[\r\n]/);
		for (const line of ics.split('\r\n')) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
	});

	it('parses, with the right title, floating start, recurrence, description, URL and alarm', () => {
		const comp = new ICAL.Component(ICAL.parse(ics));
		expect(comp.getFirstPropertyValue('prodid')).toBe('-//Post Viral Recovery//Retake reminder//EN');
		expect(comp.getFirstPropertyValue('method')).toBe('PUBLISH');
		const vevent = comp.getFirstSubcomponent('vevent')!;
		const event = new ICAL.Event(vevent);
		expect(event.summary).toBe('Retake the COMPASS-31 on Post Viral Recovery');
		expect(event.uid).toBe('1234-abcd@postviralrecovery.com');
		expect(event.startDate.toString()).toBe('2026-11-05T10:00:00');
		expect(event.startDate.zone?.tzid).toBe('floating');
		expect(event.endDate.toString()).toBe('2026-11-05T10:15:00');
		const rrule = vevent.getFirstPropertyValue('rrule') as ICAL.Recur;
		expect(rrule.freq).toBe('MONTHLY');
		expect(rrule.count).toBe(12);
		expect(event.description.split('\n')).toEqual([
			URL_WITH_UTM,
			'Your previous results are saved in the browser you used last time, so open this link in the same browser to see the change.',
			'Free, no account needed. Delete this event to stop the reminders.',
		]);
		expect(vevent.getFirstPropertyValue('url')).toBe(URL_WITH_UTM);
		expect(vevent.getFirstPropertyValue('dtstamp')!.toString()).toBe('2026-10-05T09:30:00Z');
		const alarm = vevent.getFirstSubcomponent('valarm')!;
		expect(alarm.getFirstPropertyValue('action')).toBe('DISPLAY');
		expect((alarm.getFirstPropertyValue('trigger') as ICAL.Duration).toSeconds() === 0).toBe(true);
		expect(ics).toContain('\r\nTRIGGER:-PT0M\r\n');
		// Event: the recurrence produces exactly twelve occurrences, the last a year on.
		const it = event.iterator();
		const dates: string[] = [];
		for (let next = it.next(); next; next = it.next()) dates.push(next.toString());
		expect(dates).toHaveLength(12);
		expect(dates[11]).toBe('2027-10-05T10:00:00');
	});

	it('escapes commas, semicolons and backslashes in text', () => {
		const ics2 = toIcs({ ...buildReminder(cfg), title: 'a, b; c \\ d' }, 'x');
		expect(ics2).toContain('SUMMARY:a\\, b\\; c \\\\ d');
	});

	it('never splits a multi-byte character when folding', () => {
		const folded = foldLine('DESCRIPTION:' + 'é'.repeat(80));
		for (const line of folded.split('\r\n')) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
		expect(folded.replace(/\r\n /g, '')).toBe('DESCRIPTION:' + 'é'.repeat(80));
	});
});

describe('Google Calendar link', () => {
	it('pre-fills the same event', () => {
		const url = new URL(googleCalendarUrl(buildReminder(cfg, new Date(2026, 9, 5))));
		expect(url.origin + url.pathname).toBe('https://calendar.google.com/calendar/render');
		const p = url.searchParams;
		expect(p.get('action')).toBe('TEMPLATE');
		expect(p.get('text')).toBe('Retake the COMPASS-31 on Post Viral Recovery');
		expect(p.get('dates')).toBe('20261105T100000/20261105T101500');
		expect(p.get('details')!.split('\n')[0]).toBe(URL_WITH_UTM);
		expect(p.get('location')).toBe('');
		expect(p.get('recur')).toBe('RRULE:FREQ=MONTHLY;COUNT=12');
	});
});
