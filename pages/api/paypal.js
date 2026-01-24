export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error: 'POST only'});
  const {amount = 10, cmd = 'test'} = req.body;
  const business = 'theonlineyards@outlook.com'; // Your sandbox business
  const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${amount}&item_name=Prime Forge Brain ${cmd}&currency_code=USD&return=https://prime-forge-brain.vercel.app&cancel=https://prime-forge-brain.vercel.app`;
  res.json({
    success: true,
    depositUrl: paypalUrl,
    amount,
    cmd,
    autonomous: true,
    message: 'Click depositUrl → Login sandbox business → $10 fake deposit'
  });
}
