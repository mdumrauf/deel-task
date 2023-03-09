const express = require('express');
const app = express();

const Controller = require('../controllers/admin');

app.get('/best-profession', (req, res, next) => Controller.getBestProfession(req, res, next));
app.get('/best-clients', (req, res, next) => Controller.getBestClients(req, res, next));

module.exports = app;
