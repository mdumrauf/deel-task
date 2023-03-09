const express = require('express');
const app = express();

const Controller = require('../controllers/contracts');

app.get('/', (req, res, next) => Controller.findAllByProfileId(req, res, next));
app.get('/:id', (req, res, next) => Controller.findById(req, res, next));

module.exports = app;
