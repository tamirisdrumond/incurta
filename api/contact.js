import { authenticateOdoo, makeOdooCall } from './_odoo.js';

// Odoo can be asleep and take up to ~45s to wake up — give the function room to wait it out.
export const config = { maxDuration: 60 };

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
    // 1. Authenticate (retries/waits while Odoo wakes up from sleep)
    const { uid: userId, cookieHeader } = await authenticateOdoo(ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASS);
    const odooCall = makeOdooCall(ODOO_URL, cookieHeader);

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

    // 3. Create CRM lead
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

    // 4. Get res_model_id — the integer ID of 'crm.lead' in ir.model
    const irModels = await odooCall(
      'ir.model', 'search_read',
      [[['model', '=', 'crm.lead']]],
      { fields: ['id'], limit: 1 }
    );
    if (!irModels.length) throw new Error('Could not find ir.model for crm.lead');
    const resModelId = irModels[0].id;

    // 5. Get activity type
    const activityTypes = await odooCall(
      'mail.activity.type', 'search_read',
      [[['name', 'in', ['Email', 'To-Do', 'Todo']]]],
      { fields: ['id', 'name'], limit: 3 }
    );
    const actType = activityTypes.find(t => t.name.toLowerCase() === 'email')
      || activityTypes.find(t => t.name.toLowerCase().includes('todo') || t.name.toLowerCase().includes('to-do'))
      || activityTypes[0];

    if (!actType) throw new Error('No activity type found');

    // 6. Create activity with both res_model_id (int) AND res_model (string)
    const today = new Date().toISOString().slice(0, 10);
    await odooCall('mail.activity', 'create', [{
      res_model_id: resModelId,
      res_model: 'crm.lead',
      res_id: leadId,
      activity_type_id: actType.id,
      summary: `Responder a ${name}`,
      note: `<p>Mensagem recebida via site:</p><p>${message.replace(/\n/g, '<br>')}</p>`,
      date_deadline: today,
      user_id: userId
    }]);

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Contact Odoo error:', err.message);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
}
