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

    const business = 'theonlineyards@outlook.com';
    const paypalUrl = `https://sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${amount}&item_name=Prime Forge ${cmd.toUpperCase()} NFT&currency_code=USD`;

    res.status(200).json({
      success: true,
      depositUrl: paypalUrl,
      amount: amount,
      cmd: cmd,
      business: business,
      autonomous: true,
      message: 'Click depositUrl → sandbox.paypal.com (theonlineyards@outlook.com login) → Approve deposit'
    });
  });
}
export const config = { runtime: 'nodejs22.x' };
