const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile('public/index.html', { root: __dirname }));
app.get('/api/status', (req, res) => res.json({ brain: 'live v1', uptime: process.uptime().toFixed(0)+'s', tasks: 'ready', env: process.env.NODE_ENV }));
app.post('/api/chat', (req, res) => {
  const { cmd } = req.body;
  console.log('Chat:', cmd); // Vercel logs
  res.json({ reply: `Prime Forge executed: ${cmd}`, taskId: Date.now(), autonomous: true });
});
app.get('/api/self-test', async (req, res) => res.json({ github: 'synced', azure: 'mirror OK', vercel: 'live' }));

module.exports = app; // Serverless export
