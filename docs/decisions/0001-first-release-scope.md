# 0001: first release scope

Date: 3 November 2026. Decided by the owner in answer to the questions the build brief asked before starting.

- Site name and domain: not decided yet. The code uses placeholders (`SITE_TITLE` and `SITE_URL` in `src/consts.ts`, `site` in `astro.config.mjs`) and the folder is `psychometric-tests`. Replace them in one commit when the name is chosen. The `.example` top-level domain is reserved for placeholders and can never resolve.
- Dark mode: not at launch. Light only. Tokens are written so a dark variant can be added later behind `prefers-color-scheme`.
- HEXACO (IPIP-HEXACO, Mini-IPIP6) and the 16-factor test (IPIP 16PF): held back from the first release. They remain approved instruments and can be added later via the usual commands.
- For-teachers-and-researchers page: printable HTML with print styles and scoring keys. No PDFs generated at build.
