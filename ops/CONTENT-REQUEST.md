# Galactico United FC — Content & Access Request (C010)

Everything the club needs to supply under agreement §7, plus every TBC still in the site.
Status: ☐ outstanding · ☑ received. Once an item arrives, update the file shown next to it.

## 1. Decisions & access — needed first
| ☐ | Item | Why / where it's used |
|---|------|------------------------|
| ☐ | **Confirm the domain.** The agreement names `galacticounited.co.za`, the site uses `info@galacticounitedfc.co.za` | DNS, email, `sitemap.xml`, `robots.txt`, every page's email links |
| ☐ | Domain registrar name and admin access (or agreement to action DNS changes within 2 business days) | §7, Day 5 integrations |
| ☐ | Primary committee contact: name, role, email, WhatsApp | §7. Agreement parties block, approvals |
| ☐ | Registered club name and NPO / registration no. | Agreement, invoices, `privacy.html` |
| ☐ | Billing email | Zoho invoices |
| ☐ | POPIA Information Officer: name, role, email | `privacy.html` placeholders |
| ☐ | Search box: remove from the nav (free) or quote a working search | §2.6. Search overlay in all pages |

## 2. Contact channels
| ☐ | Item | Where it's used |
|---|------|------------------|
| ☐ | WhatsApp Business number (currently `27837352271` in the prototype) | `wa.me` links (`join.html:128` and others). `grep -rn 27837352271 .` |
| ☐ | Phone numbers to publish (currently +27 83 735 2271, +27 83 453 9745) | `contact.html:91` and the footer on every page |
| ☐ | Inbox that enquiries should reach | Vercel env `ENQUIRY_TO` |
| ☐ | Email addresses to create (up to 10) and where each forwards | Cloudflare Email Routing |
| ☐ | Social handles and URLs: Instagram (`@galactico_united_fc_za`?), Facebook, YouTube, TikTok | `contact.html:94`. Footer icons currently `href="#"` in every page |

## 3. Location
| ☐ | Item | Where it's used |
|---|------|------------------|
| ☐ | GSSI Ormonde full street address | `contact.html:93` ("full address TBC") and footer |
| ☐ | Google Maps pin or share link | `contact.html:96-99` map placeholder → embed iframe |

## 4. People
| ☐ | Item | Where it's used |
|---|------|------------------|
| ☐ | Head of coaching: name, role, short profile, photo | `about.html:127` |
| ☐ | Technical staff profiles | `about.html:128` |
| ☐ | Club management profiles | `about.html:129` |
| ☐ | Coach per age group (U6–U15) | `teams.html:106` ("Profile TBC") |

## 5. Fixtures & results
| ☐ | Item | Where it's used |
|---|------|------------------|
| ☐ | Confirmed SLFA fixture list: date, age group, opponent, **venue, kick-off time** | `js/data.js` `FIXTURES` (lines ~120-125, all "Venue TBC") |
| ☐ | Latest results round | `js/data.js` `RESULTS` |
| — | After this, remove the placeholder notes | `fixtures.html:100`, `js/site.js` (home fixtures note, around the `'Placeholder fixture list'` string) |

## 6. Brand & media
| ☐ | Item | Where it's used |
|---|------|------------------|
| ☐ | Crest in high resolution (SVG or 1000px+ PNG, transparent) | `assets/crest.png` (header, footer, favicon) |
| ☐ | Squad photo per age group | `js/data.js` `TEAMS[].img` |
| ☐ | Current match and training photography | `js/data.js` `GALLERY`, `NEWS` |
| ☐ | Written confirmation that parent/guardian image consent is held for every minor pictured | §7, §10.3. Keep on file |
| ☐ | Partner / sponsor names and logos, or confirm the slots stay "Available" | `index.html:253-254` |

---
**Rule from §7:** if coach profiles, fixture venues/times or the map location aren't supplied, the site launches without them, and they're added later at no charge.
