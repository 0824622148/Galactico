# Galactico United FC — Weekly Matchday Update

Agreement §2.5: one update per week, 52 weeks a year. **Publish within 2 business days of receiving the club's content.** There's no submission deadline. A week with no content means no update, and unused weeks don't carry over.

Each update = **fixtures** (coming week) + **results** (latest round) + **one news post** + **one gallery batch**.
Anything else (coach details, contact numbers, page copy) is a Content Update and is quoted separately (§2.6). Exception: **photo removal requests are free and handled first** (§10.3).

All content lives in `js/data.js`. Nothing else needs editing for a normal week.

---

## 1. Fixtures: `FIXTURES`
Replace the list with the coming week's fixtures. The first 4 also appear on the home page.
```js
{ dow: 'SAT', date: '03 OCT', age: 'U10', vs: 'vs Linhill Celtic', venue: 'GSSI Ormonde', time: '10:00', crest: 'LC' },
```
- `vs`: use `vs Team` for home games and `at Team` for away games
- `crest`: 2-letter initials of the opponent (shown in the badge)
- `venue`: the ground if the club gives one, otherwise `Home` / `Away` (the home side is on the left of the SLFA poster)
- Shortcut: run `/update-fixtures` in Claude Code. It reads the newest poster in `../Galactico United Football Club Official Website/Upcoming Fixtures/`, updates the data, publishes and checks the live site

## 2. Results: `RESULTS`
Add the new round at the **top** of the array, one group per match day, newest first. The home page shows the first 4 rows across the top groups, with their dates.
```js
{ date: 'SAT 26 SEP 2026', rows: [
    { age: 'U10', home: 'Galactico United FC', hs: '3', as: '1', away: 'Rietvlei FC A' },
    { age: 'U8',  home: 'Linhill Celtic A', hs: '0', as: '2', away: 'Galactico United FC', tag: 'CHAMPIONS' } ] },
```
- `date` must be `DOW DD MON YYYY` (the home page splits it on spaces)
- Our team's name must **start with** `Galactico` so it's highlighted in gold
- Scores are strings. Optionally trim old rounds from the bottom once the list gets long (~6 groups)

## 3. News post: `NEWS`
Add the new story at the **top**. The first story is the featured one on the News page, and the first three show on the home page.
```js
{ id: 'u10-rietvlei-2026-09-26', cat: 'MATCH REPORTS', date: '26 SEP 2026', title: 'U10s Edge Rietvlei',
  img: 'assets/news/2026-09-26-u10.jpg', pos: '50% 30%',
  excerpt: 'One-sentence summary shown on cards.',
  body: ['Paragraph one.', 'Paragraph two.'] },
```
- `id`: unique and URL-safe, used as `article.html?id=…`. Never reuse or change a published id
- `cat`: one of `MATCH REPORTS`, `CLUB NEWS`, `DEVELOPMENT`, `COMMUNITY`
- `pos`: CSS `object-position` so faces aren't cropped. Check on mobile

## 4. Gallery batch: `GALLERY`
Add new photos at the **top**. The first 4 show on the home page.
```js
{ img: 'assets/gallery/2026-09-26-01.jpg', pos: '50% 40%', caption: 'U10s celebrate the opener', cat: 'MATCHDAY' },
```
- `cat`: one of `MATCHDAY`, `TRAINING`, `TEAMS`, `COMMUNITY`
- Captions double as alt text, so describe the photo

## 5. Images
- Folders: `assets/news/` and `assets/gallery/`, named `YYYY-MM-DD-<slug>.jpg`
- Resize to **max 1600px on the long edge**, JPG quality ~80, target under 300 KB each. Don't upload phone originals (5–10 MB)
- Only publish photos the club has sent for publication. The club warrants parental consent (§10.3)

## 6. Publish
```
python -m http.server 8080      # preview at http://localhost:8080 — check home, fixtures, news, gallery
git add -A
git commit -m "Matchday update — 26 Sep 2026"
git push                        # Vercel deploys main automatically in ~30s
```
Then check the live site on your phone, and send the club a WhatsApp confirmation with the link.

## Photo removal (priority, free)
1. Delete the entry from `GALLERY` / `NEWS` (and `TEAMS` if it's a squad photo). Delete the image file from `assets/`
2. Commit and push straight away, ahead of other work
3. Confirm to the club in writing. Note the date in the client file
