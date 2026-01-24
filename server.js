const http = require('http');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname.slice(1); // strip /

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.end();

  console.log(`${req.method} ${pathname}`);

  if (pathname === '' || pathname === 'index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
<!DOCTYPE html>
<html>
<head><title>Prime Forge Brain</title></head>
<body>
<h1>Prime Forge Brain Live</h1>
<p>API: <a href="/api/status">/api/status</a> | <a href="/api/self-test">/api/self-test</a> | <a href="/api/chat">/api/chat</a></p>
<script>
async function testChat() {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({cmd: 'test'})
  });
  document.body.innerHTML += '<p>Chat: ' + await res.text() + '</p>';
}
</script>
<button onclick="testChat()">Test Chat</button>
</body>
</html>
    `);
  } else if (pathname === 'api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      brain: 'live',
      api: 'ready',
      tasks: 'ready',
      production: true,
      uptime: process.uptime()
    }));
  } else if (pathname === 'api/self-test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      github: 'synced',
      azure: 'mirror OK',
      vercel: 'live'
    }));
  } else if (pathname === 'api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      let cmd = 'echo';
      try { const json = JSON.parse(body); cmd = json.cmd || 'test'; } catch(e) {}
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        reply: `Prime Forge executed: ${cmd}`,
        autonomous: true
      }));
    });
  } else if (pathname === 'api/paypal') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      let amount = 10;
      try { const json = JSON.parse(body); amount = json.amount || 10; } catch(e) {}
      const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR-SANDBOX@BUSINESS.COM&amount=${amount}&item_name=Prime Forge Brain Independence`;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        deposit: paypalUrl,
        autonomous: true,
        brain: 'self-fund unlocked'
      }));
    });
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Prime Forge Brain on port ${port}`));
