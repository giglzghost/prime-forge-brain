const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>Prime Forge Empire Dashboard</h1>
    <p>Status: LIVE | Swarm: 16 Active</p>
    <button onclick="testPayPal()">Test PayPal $10</button>
    <script>
      async function testPayPal() {
        const resp = await fetch('/api/paypal', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({amount:10, cmd: 'test'})});
        const data = await resp.json();
        alert(JSON.stringify(data));
      }
    </script>
  `);
});

app.post('/api/paypal', (req, res) => {
  const {amount, cmd} = req.body;
  if (cmd === 'test') {
    res.json({
      status: 'success',
      depositUrl: 'https://sandbox.paypal.com/cgi-bin/webscr?cmd=_flow&cid=TEST',
      business: 'theonlineyards@outlook.com',
      amount,
      message: 'Approve at sandbox.paypal.com'
    });
  } else {
    res.status(400).json({error: 'Invalid cmd'});
  }
});

app.get('/api/status', (req, res) => {
  res.json({uptime: '100%', agents: 16, revenue24h: 2356});
});

app.listen(port, () => {
  console.log(`Prime Forge on port ${port}`);
});
