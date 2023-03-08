const express = require('express');
const app = express();

const Controller = require('../controllers/balances');

app.post('/deposits/:userId', (req, res, next) => Controller.depositMoneyForUser(req, res, next));

module.exports = app;
