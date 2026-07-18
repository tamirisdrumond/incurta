// api/wake-odoo.js
// Wake ping — called by the client while a questionnaire is being filled
// out, so Odoo has minutes (not seconds) to wake up before submit time.
//
// Each call holds one GET open for up to ~55s (see pingOdoo() in
// api/_odoo.js) rather than failing fast, because a sleeping instance's
// proxy holds the connection open until the app is actually ready instead
// of responding quickly. Needs its own maxDuration — Vercel's function
// default (10s on Hobby) would otherwise kill this long before Odoo has a
// chance to respond, no matter how long pingOdoo() is willing to wait.
import { pingOdoo } from './_odoo.js';

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ODOO_URL = process.env.ODOO_URL;
  if (!ODOO_URL) return res.status(200).json({ awake: false });

  const awake = await pingOdoo(ODOO_URL);
  return res.status(200).json({ awake });
}
