import supertest from 'supertest';
import { HttpStatusCode } from '../../utils';
import { app } from '../setup-tests';
import { createUser, deleteUser } from '../user-tests';

describe('users', () => {
  const USER_API = '/api/users';

  describe('update user route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404', async () => {
        const user = await createUser({
          first_name: 'Omar',
          last_name: 'Ruiz',
          email: 'omar_ruiz@gmail.com',
        });
        const userId = 'non-exiting-id';
        await supertest(app)
          .put(`${USER_API}/${userId}`)
          .send({
            first_name: 'Samuel',
          })
          .expect(HttpStatusCode.NOT_FOUND);
        await deleteUser(user.id);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 200', async () => {
        const user = await createUser({
          first_name: 'Omar',
          last_name: 'Ruiz',
          email: 'omar_ruiz@gmail.com',
        });
        const updatedUser = await supertest(app)
          .put(`${USER_API}/${user.id}`)
          .send({
            first_name: 'Samuel',
          })
          .expect(HttpStatusCode.OK);

        expect(updatedUser.body).toStrictEqual({
          blocked_at: null,
          country_code: null,
          created_at: updatedUser.body.created_at,
          deactivated_at: null,
          deleted_at: null,
          dob: null,
          email: 'omar_ruiz@gmail.com',
          first_name: 'Samuel',
          gender: null,
          id: updatedUser.body.id,
          is_2fa_enabled: false,
          is_email_verified: false,
          is_online: false,
          is_phone_verified: false,
          last_login: updatedUser.body.last_login,
          last_name: 'Ruiz',
          middle_name: null,
          phone_number: null,
          role: 'user',
          updated_at: updatedUser.body.updated_at,
        });
        await deleteUser(user.id);
      });
    });
  });

  describe('get user route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404', async () => {
        const userId = 'non-exiting-id';
        await supertest(app)
          .get(`${USER_API}/${userId}`)
          .expect(HttpStatusCode.NOT_FOUND);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 200', async () => {
        const user = await createUser();
        const userData = await supertest(app)
          .get(`${USER_API}/${user.id}`)
          .expect(HttpStatusCode.OK);
        expect(userData.body).toStrictEqual({
          blocked_at: null,
          country_code: null,
          created_at: userData.body.created_at,
          deactivated_at: null,
          deleted_at: null,
          dob: null,
          email: 'default@user.com',
          first_name: 'Default',
          gender: null,
          id: userData.body.id,
          is_2fa_enabled: false,
          is_email_verified: false,
          is_online: false,
          is_phone_verified: false,
          last_login: userData.body.last_login,
          last_name: 'User',
          middle_name: null,
          phone_number: null,
          role: 'user',
          updated_at: userData.body.updated_at,
        });
        await deleteUser(user.id);
      });
    });
  });
});
