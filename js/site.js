// Galactico United FC — site behaviour (navigation, overlays, lightbox and per-page rendering).
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const param = (n) => new URLSearchParams(location.search).get(n);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const arrow = (n) => '<svg class="arrow" width="' + n + '" height="' + n + '" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';
  const isGal = (name) => name.indexOf('Galactico') === 0;
  const setParam = (k, v) => {
    const u = new URL(location.href);
    u.searchParams.set(k, v);
    history.replaceState(null, '', u);
  };

  const page = document.body.dataset.page;

  /* ── Header / navigation ─────────────────────────────────────────────── */
  $$('[data-nav]').forEach((a) => { if (a.dataset.nav === page) a.classList.add('on'); });

  const mmenu = $('#mmenu');
  const searchOv = $('#search-ov');
  const openMenu = () => { mmenu.hidden = false; };
  const closeMenu = () => { mmenu.hidden = true; };
  const toggleSearch = () => { searchOv.hidden = !searchOv.hidden; if (!searchOv.hidden) { const i = $('input', searchOv); if (i) i.focus(); } };

  $('#menu-open').addEventListener('click', openMenu);
  $('#menu-close').addEventListener('click', closeMenu);
  $('#search-toggle').addEventListener('click', toggleSearch);
  searchOv.addEventListener('click', toggleSearch);
  $('.search-box', searchOv).addEventListener('click', (e) => e.stopPropagation());

  /* ── Lightbox (shared by home + gallery) ─────────────────────────────── */
  const lb = $('#lb');
  let lbIndex = -1;
  const showLb = () => {
    const g = GALLERY[lbIndex] || GALLERY[0];
    $('#lb-img').src = g.img;
    $('#lb-img').alt = g.caption;
    $('#lb-cap').textContent = g.caption;
    lb.hidden = false;
  };
  const openLb = (i) => { lbIndex = i; showLb(); };
  const closeLb = () => { lbIndex = -1; lb.hidden = true; };
  lb.addEventListener('click', closeLb);
  $('#lb-prev').addEventListener('click', (e) => { e.stopPropagation(); lbIndex = (lbIndex + GALLERY.length - 1) % GALLERY.length; showLb(); });
  $('#lb-next').addEventListener('click', (e) => { e.stopPropagation(); lbIndex = (lbIndex + 1) % GALLERY.length; showLb(); });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!lb.hidden) closeLb();
    else if (!searchOv.hidden) toggleSearch();
    else if (!mmenu.hidden) closeMenu();
  });

  /* ── Shared renderers ────────────────────────────────────────────────── */
  const pills = (container, cats, current, cls, onPick) => {
    container.innerHTML = cats.map((c) => '<button type="button" class="pill ' + cls + (c === current ? ' on' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>').join('');
    $$('button', container).forEach((b) => b.addEventListener('click', () => onPick(b.dataset.cat)));
  };
  const imgTag = (src, alt, pos) => '<img src="' + esc(src) + '" alt="' + esc(alt) + '" class="cover" style="object-position:' + esc(pos) + '">';

  /* ── Page modules ────────────────────────────────────────────────────── */
  const mods = {};

  mods.home = function () {
    // Hero slider
    let slide = 0;
    const imgs = $$('.hero-img[data-i]');
    const dots = $$('.slide-dot[data-i]');
    const paint = () => {
      imgs.forEach((im) => { im.style.opacity = Number(im.dataset.i) === slide ? 1 : 0; });
      dots.forEach((d) => d.classList.toggle('on', Number(d.dataset.i) === slide));
    };
    dots.forEach((d) => d.addEventListener('click', () => { slide = Number(d.dataset.i); paint(); }));
    $('#slide-next').addEventListener('click', () => { slide = (slide + 1) % 3; paint(); });
    setInterval(() => { slide = (slide + 1) % 3; paint(); }, 7000);
    paint();

    // Latest news (first three stories)
    $('#home-news').innerHTML = NEWS.slice(0, 3).map((n) =>
      '<a href="article.html?id=' + esc(n.id) + '">' +
        '<div class="img zoom">' + imgTag(n.img, n.title, n.pos) + '</div>' +
        '<div class="d">' + esc(n.date) + '</div>' +
        '<div class="t">' + esc(n.title) + '</div>' +
        '<div class="x">' + esc(n.excerpt) + '</div>' +
        '<div class="more">Read more' + arrow(13) + '</div>' +
      '</a>').join('');

    // Phase cards (U8 – U9 highlighted by default, as in the prototype)
    $('#home-phases').innerHTML = PHASES.map((p) =>
      '<a class="phase' + (p.team === 'U8' ? ' on' : '') + '" href="teams.html?team=' + esc(p.team) + '">' +
        '<div class="img zoom">' + imgTag(p.img, p.label, p.pos) + '</div>' +
        '<div class="b"><div class="l">' + esc(p.label) + '</div><div class="p">' + esc(p.phase) + '</div></div>' +
        '<div class="bar"></div>' +
      '</a>').join('');

    // Fixtures / results tabs
    let tab = 'fixtures';
    const list = $('#home-matches');
    const note = $('#home-note');
    const paintTab = () => {
      $$('.htab[data-tab]').forEach((t) => t.classList.toggle('on', t.dataset.tab === tab));
      const rows = tab === 'fixtures'
        ? FIXTURES.slice(0, 4).map((f) => ({ dow: f.dow, date: f.date, age: f.age, vs: f.vs, venue: f.venue, score: f.time, gold: false, crest: f.crest }))
        : RESULTS.flatMap((g) => g.rows.map((r) => Object.assign({ gd: g.date.split(' ') }, r))).slice(0, 4).map((r) => ({ dow: r.gd[0], date: r.gd[1] + ' ' + r.gd[2], age: r.age,
            vs: isGal(r.home) ? 'vs ' + r.away : 'at ' + r.home,
            venue: 'SLFA Prem League', score: r.hs + ' — ' + r.as, gold: true,
            crest: (isGal(r.home) ? r.away : r.home).replace(/[^A-Z]/g, '').slice(0, 2) }));
      list.innerHTML = rows.map((m) =>
        '<div class="hm">' +
          '<div class="dt"><div class="dow">' + esc(m.dow) + '</div><div class="d">' + esc(m.date) + '</div></div>' +
          '<div class="cr">' + esc(m.crest) + '</div>' +
          '<div class="mid"><div class="age">' + esc(m.age) + '</div><div class="vs">' + esc(m.vs) + '</div></div>' +
          '<div class="r"><div class="v">' + esc(m.venue) + '</div><div class="sc' + (m.gold ? ' g' : '') + '">' + esc(m.score) + '</div></div>' +
        '</div>').join('');
      note.textContent = tab === 'fixtures'
        ? 'SLFA Premier League matchday fixtures, 10 – 11 October 2026.'
        : 'SLFA Premier League — results as published by the club.';
    };
    $$('.htab[data-tab]').forEach((t) => t.addEventListener('click', () => { tab = t.dataset.tab; paintTab(); }));
    paintTab();

    // Gallery preview (first four, opens the lightbox)
    $('#home-gallery').innerHTML = GALLERY.slice(0, 4).map((g, i) =>
      '<button type="button" class="zoom zoom-b" style="--z:1.07" data-i="' + i + '" aria-label="' + esc(g.caption) + '">' + imgTag(g.img, g.caption, g.pos) + '</button>').join('');
    $$('#home-gallery button').forEach((b) => b.addEventListener('click', () => openLb(Number(b.dataset.i))));
  };

  mods.teams = function () {
    let team = param('team') || 'U8';
    if (!TEAMS.some((t) => t.age === team)) team = 'U8';
    const paint = () => {
      const t = TEAMS.filter((x) => x.age === team)[0] || TEAMS[2];
      pills($('#team-tabs'), TEAMS.map((x) => x.age), team, 'pill-team', pick);
      $('#team-img').innerHTML = imgTag(t.img, t.age + ' squad', t.pos);
      $('#team-age').textContent = t.age;
      $('#team-phase').textContent = t.phase;
      $('#team-note').textContent = t.note;
      $('#team-grid').innerHTML = TEAMS.map((x) =>
        '<button type="button" class="tcard" data-age="' + esc(x.age) + '">' +
          '<div class="img zoom">' + imgTag(x.img, x.age, x.pos) + '</div>' +
          '<div class="b"><div class="a">' + esc(x.age) + '</div><div class="p">' + esc(x.phase) + '</div></div>' +
        '</button>').join('');
      $$('#team-grid button').forEach((b) => b.addEventListener('click', () => pick(b.dataset.age)));
    };
    const pick = (age) => { team = age; setParam('team', age); paint(); };
    paint();
  };

  mods.fixtures = function () {
    let tab = param('tab') === 'results' ? 'results' : 'fixtures';
    const paint = () => {
      $$('.pill[data-tab]').forEach((p) => p.classList.toggle('on', p.dataset.tab === tab));
      $('#fx-fixtures').hidden = tab !== 'fixtures';
      $('#fx-results').hidden = tab !== 'results';
    };
    $$('.pill[data-tab]').forEach((p) => p.addEventListener('click', () => { tab = p.dataset.tab; setParam('tab', tab); paint(); }));

    $('#fx-list').innerHTML = FIXTURES.map((f) =>
      '<div class="fx">' +
        '<div class="dt"><div class="dow">' + esc(f.dow) + '</div><div class="d">' + esc(f.date) + '</div></div>' +
        '<div class="cr">' + esc(f.crest) + '</div>' +
        '<div class="mid"><div class="age">' + esc(f.age) + '</div><div class="vs">' + esc(f.vs) + '</div></div>' +
        '<div class="v">' + esc(f.venue) + '</div>' +
        '<div class="t">' + esc(f.time) + '</div>' +
      '</div>').join('');

    $('#r-groups').innerHTML = RESULTS.map((g) =>
      '<div class="rgroup">' +
        '<div class="rgroup-h"><div class="d">' + esc(g.date) + '</div><div class="ln"></div></div>' +
        '<div class="rlist">' + g.rows.map((r) => {
          const hs = Number(r.hs), as = Number(r.as);
          return '<div class="rr">' +
            '<div class="age">' + esc(r.age) + '</div>' +
            '<div class="h' + (isGal(r.home) ? ' g' : '') + '">' + esc(r.home) + '</div>' +
            '<div class="sc"><span' + (hs >= as ? ' class="w"' : '') + '>' + esc(r.hs) + '</span><span class="dash">—</span><span' + (as >= hs ? ' class="w"' : '') + '>' + esc(r.as) + '</span></div>' +
            '<div class="a' + (isGal(r.away) ? ' g' : '') + '">' + esc(r.away) + '</div>' +
          '</div>';
        }).join('') + '</div>' +
      '</div>').join('');
    paint();
  };

  mods.news = function () {
    let cat = param('cat') || 'ALL';
    if (NEWS_CATS.indexOf(cat) < 0) cat = 'ALL';
    const f = NEWS[0];
    $('#featured').href = 'article.html?id=' + f.id;
    $('#featured .img').innerHTML = imgTag(f.img, f.title, f.pos);
    $('#featured .c').textContent = f.cat;
    $('#featured .d').textContent = f.date;
    $('#featured h2').textContent = f.title;
    $('#featured p').textContent = f.excerpt;

    const paint = () => {
      pills($('#news-filters'), NEWS_CATS, cat, '', (c) => { cat = c; setParam('cat', c); paint(); });
      $('#news-grid').innerHTML = NEWS.filter((n) => cat === 'ALL' || n.cat === cat).map((n) =>
        '<a class="ncard" href="article.html?id=' + esc(n.id) + '">' +
          '<div class="img zoom" style="--z:1.05">' + imgTag(n.img, n.title, n.pos) + '</div>' +
          '<div class="b">' +
            '<div class="meta"><span class="c">' + esc(n.cat) + '</span><span class="d">' + esc(n.date) + '</span></div>' +
            '<div class="t">' + esc(n.title) + '</div>' +
            '<div class="x">' + esc(n.excerpt) + '</div>' +
            '<div class="more">Read more' + arrow(13) + '</div>' +
          '</div>' +
        '</a>').join('');
    };
    paint();
  };

  mods.article = function () {
    const id = param('id');
    const a = NEWS.filter((n) => n.id === id)[0] || NEWS[0];
    document.title = a.title + ' — Galactico United FC';
    $('#art-img').innerHTML = imgTag(a.img, a.title, a.pos).replace('class="cover"', 'class="hero-img"');
    $('#art-cat').textContent = a.cat;
    $('#art-date').textContent = a.date;
    $('#art-title').textContent = a.title;
    $('#art-lead').textContent = a.excerpt;
    $('#art-body').innerHTML = a.body.map((p) => '<p>' + esc(p) + '</p>').join('');
    $('#related').innerHTML = NEWS.filter((n) => n.id !== a.id).slice(0, 3).map((n) =>
      '<a class="rcard" href="article.html?id=' + esc(n.id) + '">' +
        '<div class="img">' + imgTag(n.img, n.title, n.pos) + '</div>' +
        '<div class="b"><div class="d">' + esc(n.date) + '</div><div class="t">' + esc(n.title) + '</div></div>' +
      '</a>').join('');
  };

  mods.gallery = function () {
    let cat = param('cat') || 'ALL';
    if (GALLERY_CATS.indexOf(cat) < 0) cat = 'ALL';
    const paint = () => {
      pills($('#gal-filters'), GALLERY_CATS, cat, '', (c) => { cat = c; setParam('cat', c); paint(); });
      $('#masonry').innerHTML = GALLERY.map((g, i) => ({ g: g, i: i })).filter((x) => cat === 'ALL' || x.g.cat === cat).map((x) =>
        '<button type="button" class="gitem" data-i="' + x.i + '">' +
          '<img src="' + esc(x.g.img) + '" alt="' + esc(x.g.caption) + '">' +
          '<div class="cap">' + esc(x.g.caption) + '</div>' +
        '</button>').join('');
      $$('#masonry button').forEach((b) => b.addEventListener('click', () => openLb(Number(b.dataset.i))));
    };
    paint();
  };

  // Enquiry forms post to api/enquiry (Vercel function). Set data-turnstile="<site key>" on the
  // form to add a Cloudflare Turnstile check; the server enforces it once TURNSTILE_SECRET is set.
  const enquiryForm = function () {
    const form = $('form[data-enquiry]');
    if (!form) return;
    const formView = $('#form-view');
    const sentView = $('#sent-view');
    const submit = $('button[type=submit]', form);
    const submitHtml = submit.innerHTML;
    const errBox = $('.form-err', form);
    const started = $('input[name=started]', form);
    const stamp = () => { started.value = String(Date.now()); };
    stamp();

    if (form.dataset.turnstile) {
      const slot = document.createElement('div');
      slot.className = 'cf-turnstile';
      slot.dataset.sitekey = form.dataset.turnstile;
      slot.dataset.theme = 'dark';
      errBox.before(slot);
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      document.head.appendChild(s);
    }

    const showError = (msg) => { errBox.textContent = msg; errBox.hidden = false; };
    const busy = (on) => { submit.disabled = on; submit.innerHTML = on ? 'Sending…' : submitHtml; };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errBox.hidden = true;
      const body = {};
      new FormData(form).forEach((v, k) => { body[k] = v; });
      busy(true);
      try {
        const res = await fetch('api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || !out.ok) {
          const first = out.errors ? Object.values(out.errors)[0] : out.error;
          throw new Error(first || 'Something went wrong.');
        }
        formView.hidden = true;
        sentView.hidden = false;
      } catch (err) {
        showError(err.message + ' You can also reach the club on WhatsApp.');
        if (window.turnstile) window.turnstile.reset();
      } finally {
        busy(false);
      }
    });
    const reset = $('#reset-form');
    if (reset) reset.addEventListener('click', () => { form.reset(); stamp(); sentView.hidden = true; formView.hidden = false; });
  };
  mods.join = enquiryForm;
  mods.contact = enquiryForm;

  if (mods[page]) mods[page]();
})();
