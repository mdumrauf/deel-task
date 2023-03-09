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
});
