export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
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
    } catch(e) {}
    const business = 'theonlineyards@outlook.com';
    const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${amount}&item_name=Prime Forge ${cmd}&currency_code=USD`;
    res.status(200).json({
      success: true,
      depositUrl: paypalUrl,
      amount,
      cmd,
      business,
      autonomous: true,
      message: 'Click → sandbox.paypal.com business login → approve deposit'
    });
  });
}
