---
name: update-fixtures
description: Weekly Galactico United FC fixtures (and results) update. Reads the club's latest SLFA fixtures poster (and optional results poster), rewrites FIXTURES/RESULTS in js/data.js, previews, commits, pushes to main (Vercel deploys), verifies the live site and drafts the WhatsApp confirmation. Use when the user says "update the fixtures", "new fixtures poster", "weekly matchday update", or runs /update-fixtures [poster path].
---

# Update fixtures — Galactico United FC (C010)

The club posts a weekly **SLFA Prem League Matchday Fixtures** poster (and usually a **Matchday Results** poster) on WhatsApp. This skill turns the posters into site data and publishes them. The full weekly routine and the field rules live in `ops/MATCHDAY-UPDATE.md`. Read it on the first run of a session.

Paths are relative to the repo root (`galactico-site/`). The club's drop folder sits next to the repo:
- Fixtures posters: `../Galactico United Football Club Official Website/Upcoming Fixtures/`
- Results posters (optional): `../Galactico United Football Club Official Website/Results/`

## 1. Find the poster
- If the user passed a path, use it.
- Otherwise take the **newest** image (`.jpg`, `.jpeg`, `.png`) in `Upcoming Fixtures/`, and the newest in `Results/` if that folder exists.
- Compare the poster's match dates with the current `FIXTURES` in `js/data.js`. If they're the same weekend, the update is already done. Say so and stop.
- If the newest fixtures poster is for a weekend that has **already passed** (judged against today's date), stop and tell the user that a new poster is needed.

## 2. Read the poster
Open the image with the Read tool and transcribe every match. Then read it a second time and check each row: date, age group, both team names, kick-off time.
- **Home/away:** the team on the **left** is the home side. Galactico on the left means `vs <Opponent>`, `venue: 'Home'`. Galactico on the right means `at <Opponent>`, `venue: 'Away'`. If the poster names a ground, use the ground name as `venue` instead.
- **age:** upper case, as on the poster, keeping the squad name: `'U9 MAVERICKS'`, `'U13'`, `'U6 & U7'`.
- **time:** 24-hour `HH:MM`. The posters print "13:30PM", which means 13:30.
- **dow/date:** `'SAT'`, `'10 OCT'`.
- **crest:** two capital initials of the opponent (Hola Skoko Sporting → `HS`, Rietvlei FC A → `RV`, Robertsham Callies → `RC`, Linhill Celtic → `LC`, Mondeor Meteors → `MM`). Reuse the initials already in `js/data.js` for a known club.
- Opponent names exactly as printed, in title case (`Robertsham Callies FC A`).
- Anything unreadable or odd, such as one age group listed twice or a missing time: **don't guess**. Note it for the report and the WhatsApp draft.

## 3. Edit `js/data.js`
- **FIXTURES:** replace the whole array with this weekend's matches, ordered by day, then kick-off time. The first 4 show on the home page.
- **RESULTS** (only if there's a results poster newer than the top `RESULTS` group): add one group per match day at the **top**, `date: 'SAT 03 OCT 2026'`. Our team's name must start with `Galactico`. Scores are strings. Keep about 6 groups and trim the oldest from the bottom.
- Update the fixtures note so it shows the new weekend's dates. The same note text appears in two places:
  - `fixtures.html`: `SLFA Premier League matchday fixtures, <D> – <D> <Month> <YYYY>. Kick-off times as published by the league.`
  - `js/site.js` (home fixtures note): `'SLFA Premier League matchday fixtures, <D> – <D> <Month> <YYYY>.'`
- Don't touch anything else. News, gallery and page copy are separate work (see `ops/MATCHDAY-UPDATE.md`).

## 4. Check
```bash
node -e "const vm=require('vm');const g={};vm.runInNewContext(require('fs').readFileSync('js/data.js','utf8')+';this.f=FIXTURES;this.r=RESULTS',g);console.table(g.f)"
```
- The table must match the poster row for row. Fix anything that doesn't before going on.
- Optional visual check: serve with `python -m http.server 8765`, screenshot `fixtures.html` and `index.html` using headless Edge (`"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --window-size=1440,2400 --screenshot=<scratchpad>/fx.png http://localhost:8765/fixtures.html`), look at the result, then stop the server.

## 5. Publish
Production deploys from `main`. Work on `launch-prep`, then fast-forward `main`:
```bash
git checkout launch-prep && git pull --ff-only
git add js/data.js fixtures.html js/site.js
git commit -m "Fixtures: <D>–<D> <Mon> <YYYY>"     # add "+ results <date>" if results changed
git push origin launch-prep && git push origin launch-prep:main
```
End the commit message with the session's attribution line. Then poll until the live site serves the new data (about 20–60 s):
```bash
for i in $(seq 1 30); do curl -s "https://www.galacticounitedfc.co.za/js/data.js?$i" | grep -q "<a new opponent>" && break; sleep 10; done
```

## 6. Report
Reply with:
1. The fixtures table as published, plus results if updated, and the live link https://www.galacticounitedfc.co.za/fixtures.html
2. Anything flagged in step 2
3. A short WhatsApp message ready to paste into the club group, for example: "This weekend's fixtures are live on the website ⚽ https://www.galacticounitedfc.co.za/fixtures.html". Add a question for any flagged item.

Add one line to the status log in `ops/LAUNCH-RUNBOOK.md` only if something unusual happened.
