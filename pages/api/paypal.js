export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount = 10, cmd = 'test deposit' } = req.body;
    // Sandbox PayPal (replace your creds)
    const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=your-sandbox-business@example.com&amount=${amount}&item_name=Prime Forge Autonomy Test&custom=${cmd}`;
    return res.json({ success: true, deposit: paypalUrl, status: 'Autonomous fund unlocked' });
  }
  res.status(405).json({ error: 'POST only' });
}
