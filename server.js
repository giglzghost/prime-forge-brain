require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { cmd } = req.body;
  // Prime Forge router logic here (expand with AI7 handlers)
  res.json({ response: `Prime Forge executed: ${cmd}`, status: 'live' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Prime Forge brain on ${port}`));
module.exports = app; // Vercel serverless export
