require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express(); app.use(cors()); app.use(express.json());

// AI7, Perplexity, Archive routes here [SHORTENED FOR SPACE - USE FULL FROM PRIOR]
const port = process.env.PORT || 3000;
http.createServer(app).listen(port);
module.exports = app;
