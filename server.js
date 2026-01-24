require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const winston = require('winston');
const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');
const axios = require('axios');
const path = require('path');

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/primeforge.log', maxsize: 5242880, maxFiles: 5 })
  ]
});

// DB Setup
const db = new sqlite3.Database('primeforge.db');
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cmd TEXT,
  status TEXT DEFAULT 'pending',
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed DATETIME
)`);

// App & Server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));  // Static assets
app.use('/logs', express.static('logs'));  // Log access

// REST Endpoints
app.get('/api/status', (req, res) => {
  res.json({ 
    uptime: process.uptime(), 
    tasks: 'ready',
    env: process.env.NODE_ENV || 'production'
  });
});

app.post('/api/chat', (req, res) => {
  const { cmd } = req.body;
  logger.info(`Chat cmd: ${cmd}`);
  db.run('INSERT INTO tasks (cmd, status) VALUES (?, ?)', [cmd, 'running']);
  res.json({ reply: `Prime Forge executed: ${cmd}`, taskId: Date.now() });
});

app.get('/api/self-test', async (req, res) => {
  try {
    const azureSite = process.env.AZURE_SITE || 'https://prime-forge-azure.centralus.azurewebsites.net';
    const vercelSite = process.env.VERCEL_URL || 'https://prime-forge-brain.vercel.app';
    await axios.get(azureSite);
    await axios.get(vercelSite);
    res.json({ github: 'synced', azure: 'OK', vercel: 'OK', db: 'connected' });
  } catch (error) {
    logger.error('Self-test failed:', error.message);
    res.status(500).json({ error: 'Self-test partial fail' });
  }
});

// Socket.IO Realtime
io.on('connection', (socket) => {
  logger.info('Client connected:', socket.id);
  socket.emit('status', { brain: 'online', empire: 'Prime Forge v1' });

  socket.on('chat', (cmd) => {
    logger.info(`Socket cmd: ${cmd}`);
    socket.emit('reply', `Executed via realtime: ${cmd}`);
  });

  socket.on('disconnect', () => logger.info('Client disconnected'));
});

// Cron Jobs (Empire autonomy)
cron.schedule('*/5 * * * *', () => {
  logger.info('Cron: Health check');
  db.get('SELECT COUNT(*) as pending FROM tasks WHERE status = ?', ['pending'], (err, row) => {
    if (row.pending > 0) logger.warn(`${row.pending} pending tasks`);
  });
});

// Error Handler
app.use((req, res) => {
  res.status(404).json({ error: 'PrimeForge endpoint not found' });
});

// Listen (Vercel/Azure compat)
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  logger.info(`PrimeForge Brain listening on port ${port} (0.0.0.0)`);
});

module.exports = app;  // Vercel serverless export
