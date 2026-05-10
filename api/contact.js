export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  const ODOO_URL = process.env.ODOO_URL;
  const ODOO_DB = process.env.ODOO_DB;
  const ODOO_USER = process.env.ODOO_USER;
  const ODOO_PASS = process.env.ODOO_PASS;

  try {

    // Authenticate
    const authRes = await fetch(`${ODOO_URL}/web/session/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          db: ODOO_DB,
          login: ODOO_USER,
          password: ODOO_PASS
        }
      })
    });

    const auth = await authRes.json();

    if (!auth.result?.uid) {
      throw new Error('Authentication failed');
    }

    // Extract session cookie reliably (Odoo 16+ returns session_id in body)
    const sessionId = auth.result?.session_id;
    const rawCookie = authRes.headers.get('set-cookie') || '';
    const sessionMatch = rawCookie.match(/session_id=[^;]+/);
    const cookieHeader = sessionId
      ? `session_id=${sessionId}`
      : (sessionMatch ? sessionMatch[0] : '');

    // Create CRM Lead
    const leadRes = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'crm.lead',
          method: 'create',
          args: [{
            name: `Contato via site: ${name}`,
            contact_name: name,
            email_from: email,
            description: message,
            type: 'lead'
          }],
          kwargs: {}
        }
      })
    });

    const leadData = await leadRes.json();
    if (leadData.error) throw new Error(JSON.stringify(leadData.error));

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Contact Odoo error:', err.message);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
}
