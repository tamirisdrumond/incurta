// api/_odoo.js
// Shared Odoo JSON-RPC session + call helpers.
//
// The Odoo instance sleeps when idle and can take up to ~45s to wake up and
// start responding. authenticateOdoo() retries the login call with backoff
// until Odoo answers (each attempt itself acts as a wake trigger) or the
// deadline is hit, so callers don't need their own wake-up logic.

const WAKE_DEADLINE_MS    = 45_000; // total time to keep retrying login while Odoo wakes up
const AUTH_ATTEMPT_MS     = 8_000;  // per-attempt timeout during the wake loop
const AUTH_RETRY_DELAY_MS = 2_000;
const CALL_TIMEOUT_MS     = 20_000; // timeout for calls made after Odoo is confirmed awake
const PING_TIMEOUT_MS     = 9_000;

// Plain GET against the Odoo web app — the same kind of request a browser
// makes when someone reloads the page, which is the one thing confirmed to
// reliably wake this instance up. Used both as a background keep-warm ping
// (see api/wake-odoo.js) and as a priming step before the JSON-RPC login below.
export async function pingOdoo(ODOO_URL, timeoutMs = PING_TIMEOUT_MS) {
  try {
    const r = await fetch(`${ODOO_URL}/web/login`, {
      method: 'GET',
      signal: AbortSignal.timeout(timeoutMs)
    });
    return r.ok;
  } catch (err) {
    return false;
  }
}

export async function authenticateOdoo(ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASS) {
  const deadline = Date.now() + WAKE_DEADLINE_MS;
  let authData = null;
  let authRes = null;

  // Prime the wake-up with a plain page-style GET first (mirrors what actually
  // wakes the instance when reloading it manually), then fall back to the
  // normal JSON-RPC retry loop below regardless of whether the ping succeeded.
  await pingOdoo(ODOO_URL);

  while (true) {
    try {
      authRes = await fetch(`${ODOO_URL}/web/session/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', method: 'call', id: 1,
          params: { db: ODOO_DB, login: ODOO_USER, password: ODOO_PASS }
        }),
        signal: AbortSignal.timeout(AUTH_ATTEMPT_MS)
      });
      authData = await authRes.json();
      if (authData.result?.uid) break;
    } catch (err) {
      authData = null; // network error/timeout — Odoo is likely still waking up
    }

    if (Date.now() >= deadline) {
      const errDetail = authData
        ? JSON.stringify(authData.error || authData.result || 'no uid')
        : 'Odoo did not respond in time (still waking up?)';
      throw new Error(`Odoo authentication failed: ${errDetail}`);
    }
    await new Promise(r => setTimeout(r, AUTH_RETRY_DELAY_MS));
  }

  const sessionId = authData.result?.session_id;
  const rawCookie = authRes.headers.get('set-cookie') || '';
  const sessionMatch = rawCookie.match(/session_id=[^;]+/);
  const cookieHeader = sessionId
    ? `session_id=${sessionId}`
    : (sessionMatch ? sessionMatch[0] : rawCookie);

  return { uid: authData.result.uid, cookieHeader };
}

export function makeOdooCall(ODOO_URL, cookieHeader) {
  return async function odooCall(model, method, args, kwargs = {}) {
    const r = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call', id: 2,
        params: { model, method, args, kwargs }
      }),
      signal: AbortSignal.timeout(CALL_TIMEOUT_MS)
    });
    const d = await r.json();
    if (d.error) throw new Error(JSON.stringify(d.error));
    return d.result;
  };
}
