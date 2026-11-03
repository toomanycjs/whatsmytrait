Run the project checks and report.

Steps:
1. Run `npm test` (scoring against worked examples and the instrument files against their keys).
2. Run `npm run typecheck`.
3. Run `npm run check` (the wordlist of clinical terms, and once built: orphan pages, sources and licence boxes, licence lines, spelling).
4. Run `npm run build` (the link check runs inside the build: no slashless internal links, no links to pages that were not built).
5. Report each check's result in one line each. For any failure, quote the failing lines and say what change would fix them; do not make the change unless asked.
