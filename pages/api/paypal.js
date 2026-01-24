// pages/api/paypal.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed - POST only' });
  }
  const { amount = 10, cmd = 'test' } = req.body;
  const business = 'theonlineyards@outlook.com'; // Matches your sandbox
  const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${amount}&item_name=Prime Forge ${cmd}&currency_code=USD`;
  res.status(200).json({
    success: true,
    depositUrl: paypalUrl,
    amount,
    business,
    message: 'Click depositUrl → sandbox.paypal.com login business → Approve $10 fake deposit'
  });
}
