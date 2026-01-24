export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed - POST only' });
  }

  let body = '';
  req.on('data', chunk => { body += chunk });
  req.on('end', () => {
    let amount = 10;
    let cmd = 'test';
    try {
      const data = JSON.parse(body);
      amount = parseFloat(data.amount) || 10;
      cmd = data.cmd || 'test';
    } catch (e) {
      console.error('Parse error:', e);
    }

    const business = 'theonlineyards@outlook.com'; // Your sandbox business
    const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${amount}&item_name=Prime Forge Brain ${cmd}&currency_code=USD&return=https://prime-forge-brain.vercel.app&cancel=https://prime-forge-brain.vercel.app`;

    res.status(200).json({
      success: true,
      depositUrl: paypalUrl,
      amount: amount,
      cmd: cmd,
      business: business,
      autonomous: true,
      message: 'Click depositUrl → sandbox.paypal.com (business login) → Approve deposit'
    });
  });
}
