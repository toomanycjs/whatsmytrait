# What's My Trait

A static Astro site of free, open personality and interest tests. Every instrument is free for any use, scored on the person's own device, shown against published norms, with its reliability stated. No sign-up, no email capture, no tracking.

Live at https://www.whatsmytrait.com once deployed. The name and domain are set in `src/consts.ts` and `astro.config.mjs`.

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
| `npm test` | Run the vitest suites (engine, every instrument file against its key) |
| `npm run e2e` | Playwright: a full keyboard run of every test page |
| `npm run typecheck` | `astro check` |
| `npm run check` | Wordlist, and on the built site: orphans, sources boxes, licence lines, titles, trademarks |
| `npm run lighthouse` | Lighthouse on a throttled mobile profile for home, a test page before and after, a trait page |
| `npm run a11y` | axe-core on every built page |
| `npm run lastmod` | Refresh `src/data/lastmod.json` from git dates |

Norm tables are regenerated with `python -I scripts/norms/<id>.py <input file>` from the datasets in the gitignored `data-raw/` folder (see the methodology page for sources and hashes).

See `CLAUDE.md` for the rules that apply to every change.
