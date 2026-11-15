# MOONSHIFT repository status — 2026-11-15

GitHub repository: https://github.com/mreyadishere-bit/MOONSHIFT-Beyond-Earth

The game source, world chunks, image assets, and recorded V8 dialogue are committed in `game/` at commit `acec464f8d1b19486f2553b8bbb8a15cebca9c79`.

The live Vercel production alias is https://moonshift-beyond-earth-v32.vercel.app (deployment `dpl_87XQFSeV65r8caaacm1VLvQnMm1a`).

A GitHub Actions workflow at `.github/workflows/sync-vercel.yml` was added to mirror the publicly served deployment files, but a complete 1:1 mirror has not yet been verified. The live API function source `api/live-token.js` is not in the committed candidate and must be recovered before claiming the Live Voice backend is included.

Do not mistake the candidate commit for a proven 1:1 Vercel production snapshot. The production site remains unchanged.
