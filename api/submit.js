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

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Odoo submission error:', err.message);
    return res.status(500).json({ error: 'Submission failed', detail: err.message });
  }
}
