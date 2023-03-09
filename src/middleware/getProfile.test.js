const express = require('express');
const request = require('supertest');

const { sequelize } = require('../model');

const { getProfile } = require('./getProfile');

describe('Middleware - getProfile', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.set('sequelize', sequelize);
    app.set('models', sequelize.models);
  });

  it('fails with 401 if header is missing or profile is invalid', (done) => {
    app.use('/', getProfile);

    request(app).get('/').expect(401, { error: 'Unauthorized' }, done);
  });
});
