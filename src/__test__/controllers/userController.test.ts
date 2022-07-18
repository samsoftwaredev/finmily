import supertest from 'supertest';
import { HttpStatusCode } from '../../utils';
import { app } from '../setup-tests';

describe('users', () => {
  describe('get user route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404', async () => {
        const userId = 'non-exiting-id';
        await supertest(app)
          .get(`/api/users/${userId}`)
          .expect(HttpStatusCode.NOT_FOUND);
      });
    });
  });
});
