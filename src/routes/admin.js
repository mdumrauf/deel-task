const express = require('express');
const app = express();

const Controller = require('../controllers/admin');

app.post('/best-profession', (req, res, next) => Controller.getBestProfession(req, res, next));

module.exports = app;
