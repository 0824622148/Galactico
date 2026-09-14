# Galactico United FC — Official Website

Static website for Galactico United FC, a youth football club in Johannesburg South (U6 – U15, SLFA Premier League).

Built as plain HTML, CSS and JavaScript — no build step, no framework.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Home |
| `about.html`, `teams.html`, `development.html`, `fixtures.html`, `news.html`, `gallery.html`, `join.html`, `contact.html` | Section pages |
| `article.html?id=<story-id>` | News story page (rendered from `js/data.js`) |
| `css/site.css` | All styling |
| `js/data.js` | Club content: news stories, teams, gallery, results and fixtures — **edit this file to update content** |
| `js/site.js` | Navigation, overlays, lightbox and per-page rendering |
| `assets/` | Crest and photography |

Pages accept a few query parameters: `teams.html?team=U10`, `fixtures.html?tab=results`, `news.html?cat=CLUB%20NEWS`, `gallery.html?cat=MATCHDAY`, `article.html?id=champs`.

## Preview locally

Any static file server works, e.g.

```
python -m http.server 8080
```

then open <http://localhost:8080/>.

## Hosting

Published with GitHub Pages from the `main` branch root. All paths are relative, so the site also works from any sub-folder or host.

## Notes

- The enquiry and contact forms are front-end only (no backend is wired up yet).
- Search is a placeholder.
- Coach profiles, the map and confirmed fixture venues/times are marked TBC pending information from the club.
