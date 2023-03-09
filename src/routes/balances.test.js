const request = require('supertest');
const app = require('../app');
const { Profile } = require('../model');

describe('Balances API', () => {
  describe('POST /balances/deposit/:userId', () => {
    it('returns 201 if deposit was sucessful', async () => {
      await request(app)
        .post('/balances/deposit/2')
        .set('Accept', 'application/json')
        // ClientId is 2 and ContractorId is 6
        .set('profile_id', '2')
        .send({ amount: 50 })
        .expect(201);

      // Check Client's balance
      const client = await Profile.findByPk(2);
      expect(client.balance).toBe(281.11);
    });

    it('returns 404 if client does not exist', (done) => {
      request(app)
        .post('/balances/deposit/42')
        .set('Accept', 'application/json')
        .set('profile_id', '1')
        .send({ amount: 50 })
        .expect(
          404,
          {
            error: 'Client not found',
          },
          done
        );
    });

    it('returns 404 if userId is not a client', (done) => {
      request(app)
        .post('/balances/deposit/6')
        .set('Accept', 'application/json')
        // ClientId is 2 and ContractorId is 6
        .set('profile_id', '1')
        .send({ amount: 50 })
        .expect(
          404,
          {
            error: 'Client not found',
          },
          done
        );
    });

    it('returns 400 if deposit amount is zero', (done) => {
      request(app)
        .post('/balances/deposit/1')
        .set('Accept', 'application/json')
        .set('profile_id', '1')
        .send({ amount: 0 })
        .expect(
          400,
          {
            error: 'Amount to deposit must be positive',
          },
          done
        );
    });

    it('returns 400 if deposit amount is negative', (done) => {
      request(app)
        .post('/balances/deposit/1')
        .set('Accept', 'application/json')
        .set('profile_id', '1')
        .send({ amount: -10 })
        .expect(
          400,
          {
            error: 'Amount to deposit must be positive',
          },
          done
        );
    });

    it('returns 400 if deposit is more than 25% of all jobs to pay', (done) => {
      request(app)
        .post('/balances/deposit/1')
        .set('Accept', 'application/json')
        .set('profile_id', '1')
        .send({ amount: 100 })
        .expect(
          400,
          {
            error: 'Cannot deposit more than 25% of all your jobs',
          },
          done
        );
    });
  });
});
