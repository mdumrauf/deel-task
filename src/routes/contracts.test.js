const request = require('supertest');
const app = require('../app');

describe('Contracts API', () => {
  describe('GET /contracts/:id', () => {
    it('returns a contract', (done) => {
      request(app)
        .get('/contracts/8')
        .set('Accept', 'application/json')
        .set('profile_id', '1')
        .expect(
          200,
          {
            id: 8,
            createdAt: '2023-03-08T01:27:43.794Z',
            updatedAt: '2023-03-08T01:27:43.794Z',
            status: 'in_progress',
            terms: 'bla bla bla',
            client: 'Ash Kethcum',
            contractor: 'Ash Kethcum',
          },
          done
        );
    });
  });
});
