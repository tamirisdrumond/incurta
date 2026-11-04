// api/_odoo.js
// Shared Odoo connection helpers — used by submit.js, contact.js, etc.

const RETRY_DELAYS = [3000, 8000, 15000]; // ms; Odoo SaaS cold-start can take 30-45s

/**
 * Discover the live database name automatically.
 * Odoo SaaS renames the technical DB on every migration (main-xxxx).
 * Calling /web/database/list means ODOO_DB never needs to be updated.
 * Falls back to the ODOO_DB env var if discovery fails.
 */
async function discoverDatabase(odooUrl, fallback) {
  try {
    const r = await fetch(`${odooUrl}/web/database/list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'call', id: 0, params: {} }),
      signal: AbortSignal.timeout(10000)
    });
    const d = await r.json();
    const dbs = Array.isArray(d.result) ? d.result : [];
    if (dbs.length === 0) throw new Error('Empty database list');
    // Prefer main-* (Odoo SaaS naming); fall back to the first DB listed
    const db = dbs.find(n => /^main-/i.test(n)) || dbs[0];
    console.log(`Odoo DB discovered: ${db} (available: ${dbs.join(', ')})`);
    return db;
  } catch (err) {
    if (fallback) {
      console.warn(`DB discovery failed (${err.message}), using ODOO_DB fallback: ${fallback}`);
      return fallback;
    }
    throw new Error(`DB discovery failed and ODOO_DB not set: ${err.message}`);
  }
}

/**
 * Authenticate with Odoo. Retries on failure to handle cold-start wakeups.
 * Returns { cookieHeader, uid }.
 */
export async function authenticateOdoo(odooUrl, odbFallback, login, password) {
  const db = await discoverDatabase(odooUrl, odbFallback);

  for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
    try {
      const r = await fetch(`${odooUrl}/web/session/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', method: 'call', id: 1,
          params: { db, login, password }
        }),
        signal: AbortSignal.timeout(30000)
      });
      const data = await r.json();
      if (!data.result?.uid) {
        throw new Error(`Auth rejected: ${JSON.stringify(data.error || data.result || 'no uid')}`);
      }
      const sessionId = data.result.session_id;
      const rawCookie = r.headers.get('set-cookie') || '';
      const sessionMatch = rawCookie.match(/session_id=[^;]+/);
      const cookieHeader = sessionId
        ? `session_id=${sessionId}`
        : (sessionMatch ? sessionMatch[0] : rawCookie);
      return { cookieHeader, uid: data.result.uid };
    } catch (err) {
      if (attempt < RETRY_DELAYS.length) {
        console.warn(`Odoo auth attempt ${attempt + 1} failed (${err.message}), retrying in ${RETRY_DELAYS[attempt]}ms…`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS[attempt]));
      } else {
        throw err;
      }
    }
  }
}

/**
 * Returns a bound odooCall(model, method, args, kwargs) function.
 */
export function makeOdooCall(odooUrl, cookieHeader) {
  return async function odooCall(model, method, args, kwargs = {}) {
    const r = await fetch(`${odooUrl}/web/dataset/call_kw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call', id: 2,
        params: { model, method, args, kwargs }
      }),
      signal: AbortSignal.timeout(30000)
    });
    const d = await r.json();
    if (d.error) throw new Error(JSON.stringify(d.error));
    return d.result;
  };
}
