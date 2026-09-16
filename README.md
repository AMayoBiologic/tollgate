# Tollgate

Self-study app for the IASSC Certified Lean Six Sigma Green Belt. One HTML file, no server, works on a phone.

## Run it
`python3 build.py` builds `dist/index.html`. Open it in a browser. Dependencies: `pip install -r requirements.txt`.

## Publish
Push to `main` on GitHub with Pages set to "GitHub Actions". The workflow builds and publishes `dist/`.

## Add content
See `CONTENT_FORMAT.md` for the lesson, glossary and question formats and `CLAUDE.md` for the batch plan and review procedure. Every change: `python3 build.py` must pass.

## Test the app
```
npm i playwright && npx playwright install chromium
node tests/smoke.mjs
```
Screenshots land in `tests/shots/`.

## Design
The visual design came from a Claude Design handoff (token sheet and 12 screens). Tokens live at the top of `app/index.html`.
