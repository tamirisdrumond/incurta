export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const ODOO_URL  = process.env.ODOO_URL;
  const ODOO_DB   = process.env.ODOO_DB;
  const ODOO_USER = process.env.ODOO_USER;
  const ODOO_PASS = process.env.ODOO_PASS;

  if (!ODOO_URL || !ODOO_DB || !ODOO_USER || !ODOO_PASS) {
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    // 1. Authenticate
    const authRes = await fetch(`${ODOO_URL}/web/session/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call', id: 1,
        params: { db: ODOO_DB, login: ODOO_USER, password: ODOO_PASS }
      })
    });
    const auth = await authRes.json();
    if (!auth.result?.uid) throw new Error('Authentication failed');

    const sessionId = auth.result?.session_id;
    const rawCookie = authRes.headers.get('set-cookie') || '';
    const sessionMatch = rawCookie.match(/session_id=[^;]+/);
    const cookieHeader = sessionId
      ? `session_id=${sessionId}`
      : (sessionMatch ? sessionMatch[0] : '');
    const userId = auth.result.uid;

    async function odooCall(model, method, args, kwargs = {}) {
      const r = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
        body: JSON.stringify({
          jsonrpc: '2.0', method: 'call', id: 2,
          params: { model, method, args, kwargs }
        })
      });
      const d = await r.json();
      if (d.error) throw new Error(JSON.stringify(d.error));
      return d.result;
    }

    // 2. Find or create contact (res.partner)
    const existing = await odooCall(
      'res.partner', 'search_read',
      [[['email', '=', email]]],
      { fields: ['id', 'name'], limit: 1 }
    );
    let partnerId;
    if (existing.length > 0) {
      partnerId = existing[0].id;
    } else {
      partnerId = await odooCall('res.partner', 'create', [{
        name,
        email,
        customer_rank: 1,
        comment: 'Criado via formulário de contato — in.curta'
      }]);
    }

    // 3. Create CRM lead (no `type` field — removed in Odoo 17+)
    const leadId = await odooCall('crm.lead', 'create', [{
      name: `Contato via site: ${name}`,
      contact_name: name,
      email_from: email,
      description: message,
      partner_id: partnerId
    }]);

    if (!leadId || typeof leadId !== 'number') {
      throw new Error(`crm.lead create returned invalid id: ${JSON.stringify(leadId)}`);
    }

    // 4. Schedule activity using mail.activity.schedule method on the lead
    //    This is the correct Odoo 17+ approach — avoids res_model_id lookup
    try {
      const activityTypes = await odooCall(
        'mail.activity.type', 'search_read',
        [[['name', 'in', ['Email', 'To-Do', 'Todo']]]],
        { fields: ['id', 'name'], limit: 3 }
      );
      const actType = activityTypes.find(t => t.name.toLowerCase() === 'email')
        || activityTypes.find(t => t.name.toLowerCase().includes('todo') || t.name.toLowerCase().includes('to-do'))
        || activityTypes[0];

      if (actType) {
        const today = new Date().toISOString().slice(0, 10);
        // Use activity_schedule on the lead record — Odoo handles res_model internally
        await odooCall('crm.lead', 'activity_schedule', [
          [leadId],
          actType.id
        ], {
          summary: `Responder a ${name}`,
          note: `<p>Mensagem recebida via site:</p><p>${message.replace(/\n/g, '<br>')}</p>`,
          date_deadline: today,
          user_id: userId
        });
      }
    } catch (actErr) {
      // Log activity error but don't fail the whole request — lead was created successfully
      console.warn('Activity creation failed (non-fatal):', actErr.message);
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Contact Odoo error:', err.message);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
}
