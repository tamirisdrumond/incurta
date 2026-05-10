// api/test-odoo.js
// Diagnostic endpoint — tests Odoo connectivity step by step.
// REMOVE THIS FILE after confirming submissions work.
// Access: POST /api/test-odoo with { "password": "YOUR_CLIENT_PASSWORD" }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body || {};
  if (password !== process.env.CLIENT_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const ODOO_URL  = process.env.ODOO_URL;
  const ODOO_DB   = process.env.ODOO_DB;
  const ODOO_USER = process.env.ODOO_USER;
  const ODOO_PASS = process.env.ODOO_PASS;

  const steps = [];

  steps.push({
    step: 'env_vars',
    ODOO_URL:  ODOO_URL  ? '✓ set' : '✗ MISSING',
    ODOO_DB:   ODOO_DB   ? '✓ set' : '✗ MISSING',
    ODOO_USER: ODOO_USER ? '✓ set' : '✗ MISSING',
    ODOO_PASS: ODOO_PASS ? '✓ set' : '✗ MISSING',
  });

  if (!ODOO_URL || !ODOO_DB || !ODOO_USER || !ODOO_PASS) {
    return res.status(200).json({ steps, error: 'Missing env vars' });
  }

  // Step 1: Can we reach Odoo at all?
  try {
    const pingRes = await fetch(`${ODOO_URL}/web/database/list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params: {} }),
      signal: AbortSignal.timeout(8000),
    });
    const pingData = await pingRes.json();
    steps.push({ step: 'reach_odoo', status: pingRes.status, result: pingData?.result || pingData?.error });
  } catch (e) {
    steps.push({ step: 'reach_odoo', error: e.message });
    return res.status(200).json({ steps, error: 'Cannot reach Odoo' });
  }

  // Step 2: Authenticate
  let cookieHeader = '';
  try {
    const authRes = await fetch(`${ODOO_URL}/web/session/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call', id: 1,
        params: { db: ODOO_DB, login: ODOO_USER, password: ODOO_PASS }
      }),
      signal: AbortSignal.timeout(8000),
    });
    const authData = await authRes.json();
    const uid = authData.result?.uid;
    const sessionId = authData.result?.session_id;
    const rawCookie = authRes.headers.get('set-cookie') || '';
    const sessionMatch = rawCookie.match(/session_id=[^;]+/);
    cookieHeader = sessionId
      ? `session_id=${sessionId}`
      : (sessionMatch ? sessionMatch[0] : '');

    steps.push({
      step: 'authenticate',
      uid,
      session_id: sessionId ? '✓ in body' : (sessionMatch ? '✓ in header' : '✗ not found'),
      cookie_header_built: cookieHeader ? '✓' : '✗ empty',
      error: authData.error ? JSON.stringify(authData.error) : null,
    });

    if (!uid) {
      return res.status(200).json({ steps, error: 'Auth failed — check ODOO_DB, ODOO_USER, ODOO_PASS' });
    }
  } catch (e) {
    steps.push({ step: 'authenticate', error: e.message });
    return res.status(200).json({ steps, error: 'Auth request failed' });
  }

  // Step 3: Search for a test partner
  try {
    const r = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call', id: 3,
        params: {
          model: 'res.partner', method: 'search_read',
          args: [[['id', '>', 0]]],
          kwargs: { fields: ['id', 'name'], limit: 1 }
        }
      }),
      signal: AbortSignal.timeout(8000),
    });
    const d = await r.json();
    steps.push({ step: 'search_partner', result: d.result, error: d.error ? JSON.stringify(d.error) : null });
  } catch (e) {
    steps.push({ step: 'search_partner', error: e.message });
  }

  return res.status(200).json({ steps, status: 'done' });
}
