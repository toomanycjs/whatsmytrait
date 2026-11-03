// Retake reminders as a calendar event created on the user's device: an .ics
// file or a pre-filled Google Calendar link. Nothing is collected or sent.

import { SITE } from './share';
import type { ToolConfig } from './types';

export interface Reminder {
	title: string;
	description: string;
	url: string;
	/** Floating local times. */
	start: Date;
	end: Date;
	intervalMonths: number;
	count: number;
}

export function buildReminder(cfg: ToolConfig, now = new Date()): Reminder {
	const intervalMonths = cfg.reminderMonths ?? 6;
	// A year of reminders: 2 six-monthly, 4 three-monthly, and so on.
	const count = Math.max(1, Math.round(12 / intervalMonths));
	// Clamp the day to 28 so the series never lands on a day some months lack.
	const start = new Date(now.getFullYear(), now.getMonth() + intervalMonths, Math.min(now.getDate(), 28), 10, 0, 0);
	const end = new Date(start.getTime() + 15 * 60 * 1000);
	const url = `${SITE}${cfg.path}?utm_source=calendar&utm_medium=reminder&utm_campaign=retake`;
	return {
		title: `Retake the ${cfg.name}`,
		description: [
			url,
			'Your previous results are saved in the browser you used last time, so open this link in the same browser to see the change.',
			'Free, no account needed. Delete this event to stop the reminders.',
		].join('\n'),
		url,
		start,
		end,
		intervalMonths,
		count,
	};
}

export const rrule = (r: Reminder) =>
	`FREQ=MONTHLY;${r.intervalMonths > 1 ? `INTERVAL=${r.intervalMonths};` : ''}COUNT=${r.count}`;

const pad = (n: number) => String(n).padStart(2, '0');

/** Floating local time: 20261105T100000 (no TZID, no Z). */
export const floating = (d: Date) =>
	`${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;

const utcStamp = (d: Date) =>
	`${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

/** RFC 5545 TEXT escaping. */
export const escapeText = (s: string) =>
	s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Fold a content line at 75 octets, continuation lines starting with a space. Never splits a character. */
export function foldLine(line: string): string {
	const enc = new TextEncoder();
	const out: string[] = [];
	let current = '';
	let bytes = 0;
	for (const ch of line) {
		const n = enc.encode(ch).length;
		const limit = out.length === 0 ? 75 : 74; // continuation lines carry the leading space
		if (bytes + n > limit) {
			out.push(current);
			current = '';
			bytes = 0;
		}
		current += ch;
		bytes += n;
	}
	out.push(current);
	return out.join('\r\n ');
}

export function toIcs(r: Reminder, uid: string, now = new Date()): string {
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		"PRODID:-//What's My Trait//Retake reminder//EN",
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:${uid}@whatsmytrait.com`,
		`DTSTAMP:${utcStamp(now)}`,
		`DTSTART:${floating(r.start)}`,
		`DTEND:${floating(r.end)}`,
		`RRULE:${rrule(r)}`,
		`SUMMARY:${escapeText(r.title)}`,
		`DESCRIPTION:${escapeText(r.description)}`,
		`URL:${r.url}`,
		'BEGIN:VALARM',
		'TRIGGER:-PT0M',
		'ACTION:DISPLAY',
		`DESCRIPTION:${escapeText(r.title)}`,
		'END:VALARM',
		'END:VEVENT',
		'END:VCALENDAR',
	];
	return lines.map(foldLine).join('\r\n') + '\r\n';
}

export function googleCalendarUrl(r: Reminder): string {
	const params: [string, string][] = [
		['action', 'TEMPLATE'],
		['text', r.title],
		['dates', `${floating(r.start)}/${floating(r.end)}`],
		['details', r.description],
		['location', ''],
		['recur', `RRULE:${rrule(r)}`],
	];
	return `https://calendar.google.com/calendar/render?${params.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}`;
}
