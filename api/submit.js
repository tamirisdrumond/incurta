// api/submit.js
// Vercel serverless function.
// Required environment variables (set in Vercel Dashboard):
//   ODOO_URL   — e.g. https://incurta-odoo19.com
//   ODOO_DB    — e.g. Main
//   ODOO_USER  — e.g. admin
//   ODOO_PASS  — Odoo user password

import { authenticateOdoo, makeOdooCall } from './_odoo.js';

// Odoo can be asleep and take up to ~45s to wake up — give the function room to wait it out.
export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, name, email, note } = req.body || {};

  if (!type || !name || !email || !note) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const ODOO_URL  = process.env.ODOO_URL;
  const ODOO_DB   = process.env.ODOO_DB;
  const ODOO_USER = process.env.ODOO_USER;
  const ODOO_PASS = process.env.ODOO_PASS;

  if (!ODOO_URL || !ODOO_DB || !ODOO_USER || !ODOO_PASS) {
    console.error('One or more Odoo environment variables are not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    // 1. Authenticate (retries/waits while Odoo wakes up from sleep)
    const { cookieHeader } = await authenticateOdoo(ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASS);
    const odooCall = makeOdooCall(ODOO_URL, cookieHeader);

    // 2. Find or create partner
    const found = await odooCall(
      'res.partner', 'search_read',
      [[['email', '=', email]]],
      { fields: ['id', 'name', 'email'], limit: 1 }
    );
    let partnerId;
    if (found.length > 0) {
      partnerId = found[0].id;
    } else {
      partnerId = await odooCall('res.partner', 'create', [{
        name,
        email,
        customer_rank: 1,
        comment: 'Cliente in.curta — criado via questionário online'
      }]);
    }

    // 3. Attach note
    const subject = type === 'fisica'
      ? `Definição Física — ${name}`
      : type === 'qfa'
      ? `QFA — Frequência Alimentar — ${name}`
      : `Definição Emocional — ${name}`;

    await odooCall('mail.message', 'create', [{
      model: 'res.partner',
      res_id: partnerId,
      message_type: 'comment',
      subject,
      body: note
    }]);

    // 4. Backup copy — Odoo's HTML sanitizer runs on mail.message.body and can
    // silently strip/alter table content (seen intermittently on the QFA food
    // table). An ir.attachment's `datas` field is binary, never sanitized, so
    // this guarantees an exact, recoverable copy of what was submitted even if
    // the chatter note above gets mangled. Failure here must never fail the
    // request — the chatter note is already saved by this point.
    try {
      const safeName = name.replace(/[^a-z0-9]+/gi, '_').slice(0, 40);
      await odooCall('ir.attachment', 'create', [{
        name: `${type}-backup-${safeName}-${Date.now()}.html`,
        type: 'binary',
        datas: Buffer.from(note, 'utf-8').toString('base64'),
        res_model: 'res.partner',
        res_id: partnerId,
        mimetype: 'text/html'
      }]);
    } catch (backupErr) {
      console.error('Backup attachment failed (non-fatal):', backupErr.message);
    }

    // Also log the raw submitted content server-side as a last-resort audit
    // trail, independent of Odoo entirely.
    console.log(`Submission received [${type}] ${email}:`, note);

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Odoo submission error:', err.message);
    return res.status(500).json({ error: 'Submission failed', detail: err.message });
  }
}
