// Galactico United FC — enquiry form delivery (Vercel serverless function).
// Handles both the Join (assessment enquiry) and Contact forms. No dependencies:
// email goes out through Resend's REST API.
//
// Set these in Vercel → Project → Settings → Environment Variables before launch:
//   RESEND_API_KEY=re_xxxxxxxxxxxx            (without it, submissions are logged and not emailed)
//   ENQUIRY_TO=registrations@DOMAIN           (club inbox; comma-separate for several)
//   ENQUIRY_FROM=Galactico United FC <noreply@DOMAIN>   (must be on a Resend-verified domain)
//   TURNSTILE_SECRET=0x...                    (optional — enables Cloudflare Turnstile checks)

const AGE_GROUPS = ['U6', 'U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15'];
const SUBJECTS = ['Player assessments', 'Teams & training', 'Partnerships', 'General enquiry'];
const MIN_FILL_MS = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORMS = {
  join: {
    label: 'Assessment enquiry',
    fields: {
      parent: { label: 'Parent / guardian', max: 120, required: true },
      player: { label: 'Player name', max: 120, required: true },
      dob: { label: 'Date of birth', max: 10, required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ },
      age: { label: 'Age group', max: 3, required: true, oneOf: AGE_GROUPS },
      phone: { label: 'Phone', max: 30, required: true, pattern: /^[+\d][\d\s()-]{6,}$/ },
      email: { label: 'Email', max: 160, required: true, pattern: EMAIL_RE },
      message: { label: 'Message', max: 2000 },
      consent: { label: 'Parent / guardian consent', max: 3, required: true, oneOf: ['yes'] }
    },
    replyName: (d) => d.parent,
    subject: (d) => 'Assessment enquiry — ' + d.player + ' (' + d.age + ')',
    ackSubject: 'We have received your assessment enquiry — Galactico United FC',
    ackBody: (d) => 'Thank you for your enquiry about ' + esc(d.player) + ' joining our ' + esc(d.age) +
      ' age group. The club will be in touch about the next assessment date at GSSI Ormonde.'
  },
  contact: {
    label: 'Contact message',
    fields: {
      name: { label: 'Name', max: 120, required: true },
      email: { label: 'Email', max: 160, required: true, pattern: EMAIL_RE },
      phone: { label: 'Phone', max: 30, required: true, pattern: /^[+\d][\d\s()-]{6,}$/ },
      subject: { label: 'Subject', max: 40, oneOf: SUBJECTS },
      message: { label: 'Message', max: 4000, required: true }
    },
    replyName: (d) => d.name,
    subject: (d) => 'Website message — ' + (d.subject || 'General enquiry') + ' — ' + d.name,
    ackSubject: 'We have received your message — Galactico United FC',
    ackBody: () => 'Thank you for getting in touch. The club will reply to you shortly.'
  }
};

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function validate(spec, body) {
  const data = {};
  const errors = {};
  for (const [key, f] of Object.entries(spec.fields)) {
    const raw = body[key] == null ? '' : String(body[key]).trim();
    if (!raw) {
      if (f.required) errors[key] = f.label + ' is required';
      continue;
    }
    if (raw.length > f.max) errors[key] = f.label + ' is too long';
    else if (f.pattern && !f.pattern.test(raw)) errors[key] = f.label + ' is not valid';
    else if (f.oneOf && f.oneOf.indexOf(raw) < 0) errors[key] = f.label + ' is not valid';
    else data[key] = raw;
  }
  return { data, errors };
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: String(token), remoteip: ip || '' })
  });
  const out = await res.json().catch(() => ({}));
  return out.success === true;
}

async function sendEmail(msg) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(msg)
  });
  if (!res.ok) throw new Error('Resend ' + res.status + ': ' + (await res.text()));
}

const shell = (inner) =>
  '<div style="font-family:Arial,sans-serif;background:#0A0A0A;color:#F2F0EC;padding:32px;">' +
  '<div style="border-top:3px solid #C9A961;padding-top:20px;max-width:600px;">' + inner + '</div></div>';

function notificationHtml(spec, data) {
  const rows = Object.entries(spec.fields)
    .filter(([key]) => data[key])
    .map(([key, f]) => '<tr><td style="padding:8px 16px 8px 0;color:#8A857D;white-space:nowrap;vertical-align:top;">' + esc(f.label) +
      '</td><td style="padding:8px 0;color:#F2F0EC;white-space:pre-wrap;">' + esc(data[key]) + '</td></tr>')
    .join('');
  return shell('<h2 style="color:#C9A961;margin:0 0 20px;text-transform:uppercase;">' + esc(spec.label) + '</h2>' +
    '<table style="border-collapse:collapse;width:100%;font-size:14px;">' + rows + '</table>' +
    '<p style="color:#6E6963;font-size:12px;margin-top:24px;">Sent from the Galactico United FC website. Reply to this email to respond directly.</p>');
}

function ackHtml(spec, data) {
  return shell('<h2 style="color:#C9A961;margin:0 0 16px;text-transform:uppercase;">Thank you, ' + esc(spec.replyName(data)) + '</h2>' +
    '<p style="font-size:14px;line-height:1.7;color:#B9B4AC;">' + spec.ackBody(data) + '</p>' +
    '<p style="font-size:14px;line-height:1.7;color:#B9B4AC;">Galactico United FC<br>Building Tomorrow\'s Galacticos Today</p>' +
    '<p style="color:#6E6963;font-size:12px;margin-top:24px;">This is an automated acknowledgement. Please do not reply to this email.</p>');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const spec = FORMS[body.form];
  if (!spec) return res.status(400).json({ ok: false, error: 'Unknown form' });

  // Spam traps: a filled honeypot or an instant submit is dropped silently, so bots see "success".
  const started = Number(body.started);
  if (body.website || !started || Date.now() - started < MIN_FILL_MS) {
    console.warn('[ENQUIRY] Dropped as spam', { form: body.form, honeypot: !!body.website });
    return res.status(200).json({ ok: true });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  if (!(await verifyTurnstile(body['cf-turnstile-response'], ip))) {
    return res.status(422).json({ ok: false, error: 'Spam check failed — please try again.' });
  }

  const { data, errors } = validate(spec, body);
  if (Object.keys(errors).length) return res.status(422).json({ ok: false, errors });

  if (!process.env.RESEND_API_KEY) {
    console.warn('[ENQUIRY] RESEND_API_KEY not set — submission logged, not emailed', { form: body.form, fields: Object.keys(data) });
    return res.status(200).json({ ok: true });
  }

  const from = process.env.ENQUIRY_FROM;
  const to = String(process.env.ENQUIRY_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!from || !to.length) {
    console.error('[ENQUIRY] ENQUIRY_FROM / ENQUIRY_TO not configured');
    return res.status(500).json({ ok: false, error: 'Form delivery is not configured' });
  }

  try {
    await sendEmail({ from, to, reply_to: data.email, subject: spec.subject(data), html: notificationHtml(spec, data) });
  } catch (err) {
    console.error('[ENQUIRY] Notification failed:', err.message);
    return res.status(500).json({ ok: false, error: 'Could not send — please try again.' });
  }

  // The club has the enquiry at this point; a failed acknowledgement is logged, not surfaced.
  try {
    await sendEmail({ from, to: [data.email], subject: spec.ackSubject, html: ackHtml(spec, data) });
  } catch (err) {
    console.error('[ENQUIRY] Acknowledgement failed:', err.message);
  }

  return res.status(200).json({ ok: true });
};
