const request = require('supertest');
const app = require('../app');

describe('Jobs API', () => {
  describe('GET /jobs/unpaid', () => {
    it('returns all jobs for currently active contracts for a logged client', async () => {
      const { body: jobs } = await request(app)
        .get('/jobs/unpaid')
        .set('Accept', 'application/json')
        .set('profile_id', '1');
      expect(jobs).toStrictEqual([
        {
          id: 2,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          description: 'work',
          price: 201,
          contractId: 2,
          contractTerms: 'bla bla bla',
          clientId: 1,
          client: 'Harry Potter',
          contractorId: 6,
          contractor: 'Linus Torvalds',
        },
      ]);
    });

    it('returns all jobs for currently active contracts for a logged contractor', async () => {
      const { body: jobs } = await request(app)
        .get('/jobs/unpaid')
        .set('Accept', 'application/json')
        .set('profile_id', '6');
      expect(jobs).toStrictEqual([
        {
          id: 2,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          description: 'work',
          price: 201,
          contractId: 2,
          contractTerms: 'bla bla bla',
          clientId: 1,
          client: 'Harry Potter',
          contractorId: 6,
          contractor: 'Linus Torvalds',
        },
        {
          id: 3,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          description: 'work',
          price: 202,
          contractId: 3,
          contractTerms: 'bla bla bla',
          clientId: 2,
          client: 'Mr Robot',
          contractorId: 6,
          contractor: 'Linus Torvalds',
        },
      ]);
    });

    it('returns empty array when contractor has no non-unpaid jobs', (done) => {
      request(app)
        .get('/jobs/unpaid')
        .set('Accept', 'application/json')
        // Profile 5 has three contracts: one terminated, and two paid (and terminated).
        .set('profile_id', '5')
        .expect(200, [], done);
    });
  });

  describe('POST /jobs/:id/pay', () => {
    it('returns 201 if payment was sucessful', async () => {
      //
    });

    it('returns 403 if the one trying to pay is not the client', (done) => {
      request(app)
        .post('/jobs/3/pay')
        .set('Accept', 'application/json')
        // ClientId is 2 and ContractorId is 6
        .set('profile_id', '6')
        .expect(
          403,
          {
            error: 'Only the client can pay for the job',
          },
          done
        );
    });

    it('returns 404 if job is not found', (done) => {
      request(app)
        .post('/jobs/42/pay')
        .set('Accept', 'application/json')
        .set('profile_id', '1')
        .expect(
          404,
          {
            error: 'Job not found',
          },
          done
        );
    });

    it('returns 404 if job is not being accessed by its client or contractor', (done) => {
      request(app)
        .post('/jobs/3/pay')
        .set('Accept', 'application/json')
        // ClientId is 2 and ContractorId is 6
        .set('profile_id', '1')
        .expect(
          404,
          {
            error: 'Job not found',
          },
          done
        );
    });

    it('returns 409 if job cannot be paid because client does not have money', (done) => {
      request(app)
        .post('/jobs/5/pay')
        .set('Accept', 'application/json')
        // ClientId is 4 and ContractorId is 7
        .set('profile_id', '4')
        .expect(
          409,
          {
            error: 'Not enough funds to pay for the job. Needed $200, but balance is $1.3.',
          },
          done
        );
    });
  });
});
