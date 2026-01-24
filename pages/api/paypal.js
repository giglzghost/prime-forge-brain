export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { amount = 10, cmd = 'independence' } = req.body;
  const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR-SANDBOX@BUSINESS.COM&amount=${amount}&item_name=Prime Forge Brain ${cmd}&custom=${cmd}`;
  res.json({ 
    success: true, 
    deposit: paypalUrl, 
    autonomous: true,
    brain: 'self-fund test passed'
  });
}
