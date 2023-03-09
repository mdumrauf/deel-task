const request = require('supertest');
const app = require('../app');

describe('Contracts API', () => {
  describe('GET /contracts/:id', () => {
    it('returns a contract', (done) => {
      request(app)
        .get('/contracts/8')
        .set('Accept', 'application/json')
        .set('profile_id', '4')
        .expect(
          200,
          {
            id: 8,
            createdAt: '2023-03-08T01:27:43.794Z',
            updatedAt: '2023-03-08T01:27:43.794Z',
            status: 'in_progress',
            terms: 'bla bla bla',
            clientId: 4,
            client: 'Ash Kethcum',
            contractorId: 6,
            contractor: 'Linus Torvalds',
          },
          done
        );
    });

    it('fails with 404 if contract does not exist', (done) => {
      request(app)
        .get('/contracts/42')
        .set('Accept', 'application/json')
        .set('profile_id', '1')
        .expect(
          404,
          {
            error: 'Contract not found',
          },
          done
        );
    });
    it('fails with 404 if contract is not from the logged profile_id', (done) => {
      request(app)
        .get('/contracts/4') // Belongs to Client: 2
        .set('Accept', 'application/json')
        .set('profile_id', '1')
        .expect(
          404,
          {
            error: 'Contract not found',
          },
          done
        );
    });
  });

  describe('GET /contracts', () => {
    it('returns all non-terminated contracts for client', (done) => {
      request(app)
        .get('/contracts')
        .set('Accept', 'application/json')
        .set('profile_id', '1')
        .expect(
          200,
          [
            {
              id: 2,
              createdAt: '2023-03-08T01:27:43.794Z',
              updatedAt: '2023-03-08T01:27:43.794Z',
              status: 'in_progress',
              terms: 'bla bla bla',
              clientId: 1,
              client: 'Harry Potter',
              contractorId: 6,
              contractor: 'Linus Torvalds',
            },
          ],
          done
        );
    });

    it('returns all non-terminated contracts for contractor', (done) => {
      request(app)
        .get('/contracts')
        .set('Accept', 'application/json')
        .set('profile_id', '6')
        .expect(
          200,
          [
            {
              id: 2,
              createdAt: '2023-03-08T01:27:43.794Z',
              updatedAt: '2023-03-08T01:27:43.794Z',
              status: 'in_progress',
              terms: 'bla bla bla',
              clientId: 1,
              client: 'Harry Potter',
              contractorId: 6,
              contractor: 'Linus Torvalds',
            },
            {
              id: 3,
              createdAt: '2023-03-08T01:27:43.794Z',
              updatedAt: '2023-03-08T01:27:43.794Z',
              status: 'in_progress',
              terms: 'bla bla bla',
              clientId: 2,
              client: 'Mr Robot',
              contractorId: 6,
              contractor: 'Linus Torvalds',
            },
            {
              id: 8,
              createdAt: '2023-03-08T01:27:43.794Z',
              updatedAt: '2023-03-08T01:27:43.794Z',
              status: 'in_progress',
              terms: 'bla bla bla',
              clientId: 4,
              client: 'Ash Kethcum',
              contractorId: 6,
              contractor: 'Linus Torvalds',
            },
          ],
          done
        );
    });

    it('returns empty array when contractor has no non-terminated contracts', (done) => {
      request(app)
        .get('/contracts')
        .set('Accept', 'application/json')
        // Profile 5 has only one contract but is terminated.
        .set('profile_id', '5')
        .expect(200, [], done);
    });
  });
});
