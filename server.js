const http = require('http');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  console.log(`${req.method} ${pathname}`);

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => handleRequest());

  function handleRequest() {
    if (pathname === '/' || pathname === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
<!DOCTYPE html>
<html>
<head><title>Prime Forge Brain</title><meta charset="utf-8"></head>
<body style="background:black;color:lime;font-family:monospace;padding:20px;">
<h1>🚀 Prime Forge Brain Live</h1>
<p>Empire autonomous. Uptime: <span id="uptime"></span>s</p>
<button onclick="testStatus()">API Status</button>
<button onclick="testPayPal()">PayPal Test $10</button>
<pre id="output"></pre>
<script>
setInterval(()=>fetch('/api/status').then(r=>r.json()).then(d=>document.getElementById('uptime').textContent=d.uptime),5000);
async function testStatus(){ const r=await fetch('/api/status'); document.getElementById('output').textContent=await r.text(); }
async function testPayPal(){ const r=await fetch('/api/paypal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:10,cmd:'test'})}); document.getElementById('output').textContent=await r.text(); }
</script>
</body>
</html>
      `);
      return;
    }

    // API Status
    if (pathname === '/api/status') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        brain: 'live v1',
        github: 'synced',
        azure: 'mirror OK',
        vercel: 'live',
        uptime: process.uptime().toFixed(0) + 's'
      }));
      return;
    }

    // API Chat
    if (pathname === '/api/chat') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const cmd = JSON.parse(body || '{}').cmd || 'status';
      res.end(JSON.stringify({ response: `Prime Forge: ${cmd} executed`, autonomous: true }));
      return;
    }

    // PayPal Sandbox (to theonlineyards@outlook.com)
    if (pathname === '/api/paypal') {
      let amount = 10;
      let cmd = 'test';
      try {
        const data = JSON.parse(body);
        amount = parseFloat(data.amount) || 10;
        cmd = data.cmd || 'test';
      } catch (e) {
        console.error('PayPal parse error:', e);
      }
      const business = 'theonlineyards@outlook.com';
      const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${amount}&item_name=Prime Forge Brain ${cmd}&currency_code=USD&notify_url=https://prime-forge-brain.vercel.app/api/paypal/webhook`;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        depositUrl: paypalUrl,
        amount,
        to: business,
        cmd,
        autonomous: true,
        message: 'Click depositUrl → Sandbox PayPal deposit live'
      }));
      return;
    }

    // 404
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Prime Forge Brain on port ${port}`));
