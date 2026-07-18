// api/wake-odoo.js
// Lightweight, single-attempt wake ping — meant to be called repeatedly by
// the client (short interval, background) while a client fills out a
// questionnaire, so Odoo has minutes to wake up instead of racing a single
// request's time budget at submit time. See pingOdoo() in api/_odoo.js.

import { pingOdoo } from './_odoo.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ODOO_URL = process.env.ODOO_URL;
  if (!ODOO_URL) return res.status(200).json({ awake: false });

  const awake = await pingOdoo(ODOO_URL);
  return res.status(200).json({ awake });
}
