# Galactico United FC — Launch Runbook (C010)

Agreement **VKO-GUFC-2026-001** · Option 01 · R349/month · 12-month term.
The clock starts on the **Commencement Date** (first invoice paid in full). Launch is due **7 working days** later (§6).
Nothing in this runbook should be started before payment clears, except gathering content (see `CONTENT-REQUEST.md`).

Stack (§3): static HTML/CSS/JS · Vercel (hosting + `api/enquiry.js`) · Resend (email) · Cloudflare (DNS, Email Routing, Turnstile) · GA4 + Search Console · private GitHub repo.

---

## Status log
- **2026-10-05** — Proposal accepted. Waiting on the signed agreement. A WhatsApp group was set up for all website communication. Domain/access meeting with Moe Tmr at 11:00.
- **2026-10-06** — Domain confirmed: `galacticounitedfc.co.za` (matches the site; the agreement wording says `galacticounited.co.za`). Registrar HostAfrica, account holder Mohamed Gaus (Moe). Vuka has access to Domains/DNS. The domain has a HostAfrica hosting package; check for existing email before any DNS change. Sitemap and robots updated.
- **2026-10-06** — DNS checked. Name servers: HostAfrica (dan1/dan2.host-ww.net). All A records (`@`, `www`, `mail`, `ftp`, `pop`, `smtp`) point to 102.209.117.236 (HostAfrica cPanel). MX = `mail.galacticounitedfc.co.za`. SPF: `v=spf1 +a +mx +include:spf.host-ww.net +include:spf.antispamcloud.com ip4:102.209.117.236 ~all`. No DKIM, no DMARC. The website is the HostAfrica "coming soon" placeholder, so there is no live site to protect. Still to confirm whether any cPanel mailboxes are in use.

## Before Day 1 — ready now
- [x] Form backend (`api/enquiry.js`), POPIA consent checkbox, privacy notice, sitemap, robots, 404, `vercel.json` — on branch `launch-prep`
- [ ] Send the club the content request (`CONTENT-REQUEST.md`)
- [ ] First invoice raised in Zoho (R349, due in 7 days) — payment date = Commencement Date: ____________

## Day 1 — Discover & Content
- [ ] Receive the club's content. Log what arrived and what's still outstanding in `CONTENT-REQUEST.md`
- [ ] **Confirm the domain** (the agreement says `galacticounited.co.za`, the site uses `galacticounitedfc.co.za`) and the registrar
- [ ] Ask for registrar admin access, or agree the club will action DNS changes within 2 business days (§7)
- [ ] Create the Vercel project from the repo (Vercel dashboard → Add New → Project → import `0824622148/Galactico`)
  - Framework preset: **Other**. Build command: none. Output directory: `.` (root)
  - Production branch: `main`. `launch-prep` gets a preview URL automatically
- [ ] Merge `launch-prep` → `main` only once the preview is checked (this also updates the Pages prototype)

## Days 2–4 — Design & Build
- [ ] Load the club's content into `js/data.js` and the pages listed in `CONTENT-REQUEST.md`
- [ ] Replace `DOMAIN` in `sitemap.xml` and `robots.txt` with the confirmed domain
- [ ] Update `info@galacticounitedfc.co.za` in all pages if the domain changes (`grep -l galacticounitedfc *.html`). Header and footer are inlined in every page
- [ ] Fill in the `[...]` placeholders in `privacy.html` (NPO no., Information Officer, contact, launch date)
- [ ] Search placeholder: follow the club's decision (remove it from the nav on all pages, or quote it)
- [ ] Final design pass and mobile check at 375px

## Day 5 — Integrations
**Cloudflare DNS**
- [ ] Cloudflare → Add site → the confirmed domain (Free plan). Import the existing records and **keep any existing MX records** if the club already uses email
- [ ] At the club's registrar, change name servers to the two Cloudflare name servers. Wait for Cloudflare to show "Active"

**Vercel domain + SSL**
- [ ] Vercel → Project → Settings → Domains → add `DOMAIN` and `www.DOMAIN` (redirect www → apex)
- [ ] In Cloudflare, add the records Vercel shows: apex `A 76.76.21.21` and `www CNAME cname.vercel-dns.com`. Set both to **DNS only (grey cloud)** so Vercel can issue SSL
- [ ] Confirm `https://DOMAIN` loads with a valid certificate. HSTS is sent by `vercel.json`

**Resend (form email)**
- [ ] Resend → Domains → add `DOMAIN` (or a subdomain such as `mail.DOMAIN`) → add its SPF/DKIM (and optional DMARC) records in Cloudflare → Verify
- [ ] Create an API key with sending access only
- [ ] Vercel → Settings → Environment Variables (Production + Preview):
  - `RESEND_API_KEY` = the key
  - `ENQUIRY_FROM` = `Galactico United FC <noreply@DOMAIN>`
  - `ENQUIRY_TO` = the club's nominated inbox (comma-separate for several)
- [ ] Redeploy so the variables take effect

**Cloudflare Turnstile (spam protection)**
- [ ] Cloudflare → Turnstile → Add widget → hostname `DOMAIN` (plus the `*.vercel.app` preview host if wanted), mode **Managed**
- [ ] Vercel env var `TURNSTILE_SECRET` = the secret key
- [ ] Add `data-turnstile="<site key>"` to the `<form data-enquiry ...>` tag in `join.html` and `contact.html`. `js/site.js` renders the widget automatically
- [ ] Order matters: without the site-key attribute the widget never shows, and once `TURNSTILE_SECRET` is set every submission would fail. Deploy the attribute before, or together with, the secret

**Cloudflare Email Routing (up to 10 aliases, §2.4)**
- [ ] Cloudflare → Email → Email Routing → enable (it adds its own MX and SPF records. Check they don't clash with an existing mail provider)
- [ ] Add each destination inbox and have the owner click the verification email
- [ ] Create the aliases the club asked for (e.g. `info@`, `registrations@`, `coaches@`, `accounts@`, `chairman@`) and record them in the client file
- [ ] If Resend sends from the same apex domain, merge SPF into **one** TXT record (e.g. `v=spf1 include:_spf.mx.cloudflare.net include:amazonses.com ~all`). Two SPF records break both

**WhatsApp, Google**
- [ ] WhatsApp links: confirm the club's WhatsApp Business number and replace `27837352271` everywhere (`grep -rn 27837352271 .`)
- [ ] GA4: create a property, then add the `gtag.js` snippet (Measurement ID `G-…`) to the `<head>` of **every** page, just before `</head>`
- [ ] Search Console: add a Domain property → verify with a DNS TXT record in Cloudflare → submit `https://DOMAIN/sitemap.xml`

## Day 6 — Testing & Sign-off
- [ ] Join form, real submission: the club inbox gets the notification (reply-to = parent), and the parent gets the acknowledgement
- [ ] Join form without consent ticked: blocked in the browser
- [ ] Contact form: same checks
- [ ] Turnstile widget renders, and submissions pass
- [ ] Vercel → Logs: no `[ENQUIRY]` errors
- [ ] Every alias forwards (send a test to each)
- [ ] Every page works on mobile (Android Chrome and iPhone Safari) and desktop (Chrome, Edge, Firefox)
- [ ] `tel:` and WhatsApp links open correctly. The map shows the right location
- [ ] Unknown URL shows the 404 page. `/sitemap.xml` and `/robots.txt` are live
- [ ] Club reviews and signs off in writing (WhatsApp is fine): ____________

## Day 7 — Launch
- [ ] Final merge to `main` → production deploy
- [ ] **Make the repo private** (GitHub → Settings → General → Danger Zone → Change visibility). Only do this now, because it turns off the free GitHub Pages prototype at `0824622148.github.io/Galactico`
- [ ] Turn off GitHub Pages (Settings → Pages) if it's still enabled
- [ ] Confirm the Vercel ↔ GitHub integration still deploys after the switch to private
- [ ] Send the handover message with the live URL. Log the launch date in the client file and tracker (C010)

## After launch — weekly
- Weekly Matchday Update: see `MATCHDAY-UPDATE.md` (published within 2 business days of receiving content, §2.5)
- Photo removal requests are **priority** and free, separate from the weekly update (§10.3)
- Check form delivery (Vercel logs / club confirmation) as part of monitoring (§2.5)
