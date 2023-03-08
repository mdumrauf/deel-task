const express = require('express');
const app = express();

const Controller = require('../controllers/jobs');

app.get('/unpaid', (req, res, next) => Controller.getAllUnpaid(req, res, next));

module.exports = app;
