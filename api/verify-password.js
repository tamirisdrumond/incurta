// api/verify-password.js
// Vercel serverless function.
// Required environment variable: CLIENT_PASSWORD
// Set it in Vercel Dashboard → Project → Settings → Environment Variables.

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const correct = process.env.CLIENT_PASSWORD;

  if (!correct) {
    console.error('CLIENT_PASSWORD environment variable is not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  if (password === correct) {
    return res.status(200).json({ ok: true });
  }

  return res.status(200).json({ ok: false });
}
