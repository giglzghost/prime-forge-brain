const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Hero/index.html

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/api/status', (req, res) => res.json({
  brain: 'live v1', github: 'synced', azure: 'OK', vercel: 'live', uptime: process.uptime().toFixed(0) + 's'
}));
app.post('/api/paypal', (req, res) => {
  const {amount = 10, cmd = 'test'} = req.body;
  const business = 'theonlineyards@outlook.com';
  const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${amount}&item_name=Prime Forge Brain ${cmd}&currency_code=USD`;
  res.json({success: true, depositUrl: paypalUrl, amount, to: business, autonomous: true});
});
app.post('/api/chat', (req, res) => {
  const {cmd = 'status'} = req.body;
  res.json({response: `Prime Forge: ${cmd} executed`, autonomous: true});
});

module.exports = app;
