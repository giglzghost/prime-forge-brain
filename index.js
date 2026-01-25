const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <h1>👑 Prime Forge Empire</h1>
    <p>Swarm: 16 Active | Uptime: 100%</p>
    <button onclick="testStatus()">Status</button>
    <button onclick="testPayPal()">PayPal $10</button>
    <button onclick="testBuy()">Buy NFT</button>
    <script>
      async function testStatus() { alert(await (await fetch('/api/status')).json()); }
      async function testPayPal() { alert(await (await fetch('/api/paypal', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:10,cmd:'test'})})).json()); }
      async function testBuy() { alert(await (await fetch('/api/buy', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({item:'nft1'})})).json()); }
    </script>
  `);
});

app.get('/api/status', (req, res) => {
  res.json({uptime: '100%', agents: 16, revenue24h: 2356, project: 'prime-forge-brain'});
});

app.post('/api/paypal', (req, res) => {
  const {amount = 10, cmd = 'test'} = req.body;
  if (cmd === 'test') {
    res.json({
      status: 'success',
      depositUrl: 'https://sandbox.paypal.com/cgi-bin/webscr?cmd=_flow&cid=TEST',
      business: 'theonlineyards@outlook.com',
      amount,
      message: 'Login sandbox → approve deposit'
    });
  } else {
    res.status(400).json({error: 'Invalid cmd'});
  }
});

app.post('/api/buy', (req, res) => {
  const {item = 'default-nft'} = req.body;
  res.json({
    status: 'NFT purchase initiated',
    tx: 'tx_' + Date.now(),
    item,
    next: 'Check PayPal for payment'
  });
});

app.listen(port, () => {
  console.log(`Prime Forge live on port ${port}`);
});
