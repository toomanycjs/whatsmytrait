# Free psychometric tests site

A static Astro site of free, open personality and interest tests. Every instrument is free for any use, scored on the person's own device, shown against published norms, with its reliability stated. No sign-up, no email capture, no tracking.

The site name and domain are placeholders until the owner decides them: see `SITE_TITLE` and `SITE_URL` in `src/consts.ts` and the `site` setting in `astro.config.mjs`.

## Layout

- `packages/instruments`: the pure engine (load an instrument file, render it, score a response set, look up percentiles) and the instrument data files.
- `src`: the Astro site. Layouts, components, pages and content collections.
- `docs`: the design direction and the owner's written decisions.
- `design`: the style tile, the source of truth for the visual design once approved.
- `scripts`: build-time checks.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies (npm workspaces) |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the build |
| `npm test` | Run the vitest suites |
| `npm run check` | Orphan, sources, licence and wordlist checks |
| `npm run lastmod` | Refresh `src/data/lastmod.json` from git dates |

See `CLAUDE.md` for the rules that apply to every change.
