const express = require('express');
const bodyParser = require('body-parser');

const { sequelize } = require('./model');
const { AdminRouter, BalancesRouter, ContractsRouter, JobsRouter } = require('./routes');

const app = express();

app.use(bodyParser.json());

app.set('sequelize', sequelize);
app.set('models', sequelize.models);

const { getProfile } = require('./middleware/getProfile');

const router = express.Router();

router.use('/admin', getProfile, AdminRouter);
router.use('/balances', getProfile, BalancesRouter);
router.use('/contracts', getProfile, ContractsRouter);
router.use('/jobs', getProfile, JobsRouter);

app.use('/', router);

module.exports = app;
