# Galactico United FC — Official Website

Static website for Galactico United FC, a youth football club in Johannesburg South (U6 – U15, SLFA Premier League).
Built and managed by Vuka Online (client C010, agreement VKO-GUFC-2026-001).

Built as plain HTML, CSS and JavaScript — no build step, no framework. One serverless function handles the enquiry forms.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Home |
| `about.html`, `teams.html`, `development.html`, `fixtures.html`, `news.html`, `gallery.html`, `join.html`, `contact.html` | Section pages |
| `article.html?id=<story-id>` | News story page (rendered from `js/data.js`) |
| `privacy.html`, `404.html` | POPIA privacy notice, not-found page |
| `css/site.css` | All styling |
| `js/data.js` | Club content: news stories, teams, gallery, results and fixtures — **edit this file to update content** |
| `js/site.js` | Navigation, overlays, lightbox, per-page rendering and form submission |
| `api/enquiry.js` | Vercel function: validates Join/Contact submissions and emails them via Resend |
| `assets/` | Crest and photography |
| `vercel.json` | Security and cache headers |
| `ops/` | Internal runbooks (not published — see `.vercelignore`) |

The shared header and footer are inlined in every page, so a change to either must be made in all of them.

Pages accept a few query parameters: `teams.html?team=U10`, `fixtures.html?tab=results`, `news.html?cat=CLUB%20NEWS`, `gallery.html?cat=MATCHDAY`, `article.html?id=champs`.

## Preview locally

Pages only: any static file server works, e.g. `python -m http.server 8080`, then open <http://localhost:8080/> (form submissions will fail without the API).

Pages and forms: `vercel dev`. Without `RESEND_API_KEY`, submissions are accepted and logged, not emailed.

## Hosting

Vercel, deploying `main` automatically. Every other branch gets a preview URL.

Environment variables (Vercel → Settings → Environment Variables):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend sending key |
| `ENQUIRY_TO` | Club inbox(es) that receive enquiries, comma-separated |
| `ENQUIRY_FROM` | Sender, e.g. `Galactico United FC <noreply@DOMAIN>` — must be on a Resend-verified domain |
| `TURNSTILE_SECRET` | Optional Cloudflare Turnstile secret. Pair it with `data-turnstile="<site key>"` on both forms |

Until the Vercel launch, the prototype is also published with GitHub Pages from `main` (`.nojekyll`).

## Runbooks

- `ops/LAUNCH-RUNBOOK.md` — the 7-day launch plan (DNS, SSL, email, forms, analytics, sign-off)
- `ops/CONTENT-REQUEST.md` — what the club still needs to supply, and where each item goes
- `ops/MATCHDAY-UPDATE.md` — the weekly fixtures/results/news/gallery routine
