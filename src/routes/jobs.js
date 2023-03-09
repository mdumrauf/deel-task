const express = require('express');
const app = express();

const Controller = require('../controllers/jobs');

app.get('/unpaid', (req, res, next) => Controller.getAllUnpaid(req, res, next));
app.post('/:id/pay', (req, res, next) => Controller.pay(req, res, next));

module.exports = app;
