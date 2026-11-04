// api/submit.js
// Required env vars: ODOO_URL, ODOO_USER, ODOO_PASS
// ODOO_DB is optional — the DB name is discovered automatically via /web/database/list.
//          Set it only as a fallback if discovery ever fails.

import { authenticateOdoo, makeOdooCall } from './_odoo.js';

// Odoo can be asleep and take up to ~45s to wake — give the function room to wait it out.
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
  const ODOO_DB   = process.env.ODOO_DB;   // optional fallback
  const ODOO_USER = process.env.ODOO_USER;
  const ODOO_PASS = process.env.ODOO_PASS;

  if (!ODOO_URL || !ODOO_USER || !ODOO_PASS) {
    console.error('One or more Odoo environment variables are not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    // 1. Authenticate (auto-discovers DB; retries while Odoo wakes from sleep)
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

    // 3. Attach note as chatter message
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

    // 4. Backup attachment — Odoo's HTML sanitizer can silently strip table content
    // from mail.message.body. ir.attachment.datas is binary (never sanitized), so
    // this is an exact, recoverable copy. Failure here must never fail the request.
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

    // Server-side audit log, independent of Odoo
    console.log(`Submission received [${type}] ${email}:`, note);

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Odoo submission error:', err.message);
    return res.status(500).json({ error: 'Submission failed' });
  }
}
