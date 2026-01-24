export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed - POST only' });
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    let amount = 10;
    let cmd = 'independence';
    try {
      const data = JSON.parse(body);
      amount = parseFloat(data.amount) || 10;
      cmd = data.cmd || 'test';
    } catch (e) {
      console.error('PayPal parse error:', e);
    }

    const businessEmail = 'theonlineyards@outlook.com';
    const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(businessEmail)}&amount=${amount}&item_name=Prime Forge Brain ${cmd}&custom=${encodeURIComponent(cmd)}&currency_code=USD&return=https://prime-forge-brain.vercel.app/&cancel_return=https://prime-forge-brain.vercel.app/`;

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      depositUrl: paypalUrl,
      amount: amount,
      cmd: cmd,
      autonomous: true,
      message: 'Prime Forge Brain self-fund to theonlineyards@outlook.com - sandbox live'
    });
  });
}
