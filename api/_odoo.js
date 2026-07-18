// api/_odoo.js
// Shared Odoo JSON-RPC session + call helpers.
//
// The Odoo instance sleeps when idle. Waking it back up requires a request
// that stays open long enough to receive the response once the app finishes
// booting (see pingOdoo() below) — short, frequently-retried requests never
// actually catch that response. authenticateOdoo() primes with one such
// long-held request, then logs in, so callers don't need their own wake-up
// logic.

const WAKE_DEADLINE_MS    = 50_000; // total time to keep trying while Odoo wakes up (stays under Hobby's 60s cap)
const AUTH_ATTEMPT_MS     = 15_000; // per-attempt timeout once we believe Odoo is warm
const AUTH_RETRY_DELAY_MS = 2_000;
const CALL_TIMEOUT_MS     = 20_000; // timeout for calls made after Odoo is confirmed awake
const PING_TIMEOUT_MS     = 55_000;

// Plain GET against the Odoo web app — the same kind of request a browser
// makes when someone reloads the page, which is the one thing confirmed to
// reliably wake this instance up. Important: this must be held open for as
// long as the caller's budget allows. A sleeping instance's proxy typically
// holds the connection open (not responding with a quick "still starting")
// until the app underneath is actually ready, then forwards the response —
// so a *short* per-attempt timeout (what this used to do) means every retry
// gets aborted before it can ever receive that response, no matter how many
// times it's retried. A manual browser reload works because the browser just
// waits; we have to do the same, for as long as our budget allows.
export async function pingOdoo(ODOO_URL, timeoutMs = PING_TIMEOUT_MS) {
  try {
    // /odoo/contacts specifically — confirmed to be the path that actually
    // wakes this instance when reloaded manually. Other paths (e.g.
    // /web/login) may not be wired through the same wake trigger.
    //
    // Browser-like headers are deliberate: a bare server-side fetch() sends
    // none of the headers a real browser reload does (User-Agent, Accept,
    // Accept-Language), and whatever fronts this instance may only route
    // browser-looking requests through to the actual wake trigger.
    const r = await fetch(`${ODOO_URL}/odoo/contacts`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8'
      },
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

  // Prime the wake-up with one long-held GET first, giving it nearly the
  // whole budget — this is the request that actually has to survive the
  // cold boot. Only fall through to the login retry loop once that returns
  // (successfully or not); by then Odoo should be warm if it's going to be.
  const pingBudget = Math.max(deadline - Date.now() - 5_000, 5_000);
  await pingOdoo(ODOO_URL, pingBudget);

  while (true) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      const errDetail = authData
        ? JSON.stringify(authData.error || authData.result || 'no uid')
        : 'Odoo did not respond in time (still waking up?)';
      throw new Error(`Odoo authentication failed: ${errDetail}`);
    }
    try {
      authRes = await fetch(`${ODOO_URL}/web/session/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', method: 'call', id: 1,
          params: { db: ODOO_DB, login: ODOO_USER, password: ODOO_PASS }
        }),
        signal: AbortSignal.timeout(Math.min(remaining, AUTH_ATTEMPT_MS))
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
