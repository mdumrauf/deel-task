const request = require('supertest');
const app = require('../app');

describe('Admin API', () => {
  describe('GET /admin/best-profession', () => {
    it('returns 200 with best profession and total', (done) => {
      request(app)
        .get('/admin/best-profession')
        .set('Accept', 'application/json')
        // ClientId is 2 and ContractorId is 6
        .set('profile_id', '2')
        .expect(
          200,
          {
            profession: 'Programmer',
            total: 2683,
          },
          done
        );
    });
  });
});
