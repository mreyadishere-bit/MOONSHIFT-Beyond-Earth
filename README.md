# MOONSHIFT: BEYOND EARTH — 2D Game

The Side Quest Squad — NASA Space Apps Challenge 2026.

This release candidate is based on the existing V7 2D production source, with V8 recorded dialogue replacement mapping for Eyad (12 lines) and Rawan (13 lines), audio normalization and an intro replay guard. It is **not** a claim that every item in the outstanding fix list is resolved.

## Local

Serve the `game/` directory with a static server, for example `cd game && python -m http.server 8080`, and open `http://localhost:8080`. Don't open `index.html` with file:// because the loader fetches chunks.

## Tests

Run `npm test` (Node.js 20+). Browser/audio/microphone and full mission playthrough must also be performed before final competition submission.

## Vercel deployment

Import this repository in Vercel, framework `Other`, root directory `game`, output directory `.`, no build command. Do not publish source with secrets. `api/live-token.js` is intentionally not part of this archive: recover and audit the original Live Voice backend from the existing production deployment, and configure its runtime credentials through encrypted Vercel environment variables before enabling live AI conversation. Without that serverless endpoint, recorded game dialogues still work but optional Live Voice is unavailable.

## Latest change scope

- Keeps all existing three 2D world assets, tasks and mission architecture.
- Preserves original character portraits and sprite atlas.
- Replaces only Eyad and Rawan's 25 known recorded lines.
- Adds a one-session guard against accidental automatic prologue reopening; manual replay remains explicit.
- Preserves opt-in persistent progress code from V7.

## Attribution and integrity

This source builds upon earlier versions; retain actual original development dates and disclose pre-existing resources and AI-assisted work accurately. NASA name/data references do not imply NASA endorsement. Audit any bundled media licensing before submission.
