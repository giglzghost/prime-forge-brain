require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const winston = require('winston');
const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');
const axios = require('axios');

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

// DB
const db = new sqlite3.Database('primeforge.db');
db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, cmd TEXT, status TEXT, created DATETIME DEFAULT CURRENT_TIMESTAMP)');

// App
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(express.json());

// REST endpoints
app.get('/api/status', (req, res) => res.json({ uptime: process.uptime(), tasks: 'ready' }));
app.post('/api/chat', (req, res) => {
  const { cmd } = req.body;
  logger.info(`Chat cmd: ${cmd}`);
  res.json({ reply: `Executed: ${cmd}` });
});
app.get('/api/self-test', async (req, res) => {
  try {
    await axios.get(process.env.AZURE_SITE || 'https://primeforge.vercel.app');
    res.json({ github: 'synced', azure: 'OK', paypal
