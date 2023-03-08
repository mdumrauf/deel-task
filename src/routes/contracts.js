const express = require('express');
const app = express();

const Controller = require('../controllers/contracts');

app.get('/:id', (req, res, next) => Controller.findById(req, res, next));

module.exports = app;
