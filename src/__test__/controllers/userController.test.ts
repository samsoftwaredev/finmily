import supertest from 'supertest';
import { HttpStatusCode } from '../../utils';
import { app } from '../setup-tests';
import { createUser, deleteUser } from '../user-tests';

describe('users', () => {
  const USER_API = '/api/user';

  describe('update user route', () => {
    describe('given an incorrect UUID', () => {
      it('should return a 400', async () => {
        const userId = 'non-exiting-id';
        await supertest(app)
          .put(`${USER_API}/${userId}`)
          .send({
            first_name: 'Samuel',
          })
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });

    describe('given the user does not exist', () => {
      it('should return a 404', async () => {
        const user = await createUser({
          first_name: 'Omar',
          last_name: 'Ruiz',
          email: 'omar_ruiz@gmail.com',
        });
        const userId = 'e5e51bf0-06ee-4d89-ae58-c9c92dc8a1d7';
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
            email: 'samuel_ruiz@gmail.com',
          })
          .expect(HttpStatusCode.OK);

        expect(updatedUser.body).toStrictEqual({
          blocked_at: null,
          country_code: null,
          created_at: updatedUser.body.created_at,
          deactivated_at: null,
          deleted_at: null,
          dob: null,
          email: 'samuel_ruiz@gmail.com',
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
    describe('given the user id is wrong', () => {
      it('should return a 400', async () => {
        const userId = 'non-exiting-id';
        await supertest(app)
          .get(`${USER_API}/${userId}`)
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });

    describe('given the user does not exist', () => {
      it('should return a 404', async () => {
        const userId = 'e5e51bf0-06ee-4d89-ae58-c9c92dc8a1d7';
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

  describe('create user route', () => {
    describe('given the user already exist', () => {
      it('should return a 500', async () => {
        const userData = {
          first_name: 'Dexter',
          last_name: 'Genius',
          email: 'dexter@lab.com',
        };
        const user = await createUser(userData);
        await supertest(app)
          .post(`${USER_API}/create-user`)
          .send(userData)
          .expect(HttpStatusCode.INTERNAL_SERVER_ERROR);
        await deleteUser(user.id);
      });
    });

    describe('given the user does not exist', () => {
      it('should return a 200', async () => {
        const userData = await supertest(app)
          .post(`${USER_API}/create-user`)
          .send({
            first_name: 'Dexter',
            last_name: 'Genius',
            email: 'dexter@lab.com',
          })
          .expect(HttpStatusCode.OK);
        expect(userData.body).toStrictEqual({
          blocked_at: null,
          country_code: null,
          created_at: userData.body.created_at,
          deactivated_at: null,
          deleted_at: null,
          dob: null,
          email: 'dexter@lab.com',
          first_name: 'Dexter',
          gender: null,
          id: userData.body.id,
          is_2fa_enabled: false,
          is_email_verified: false,
          is_online: false,
          is_phone_verified: false,
          last_login: userData.body.last_login,
          last_name: 'Genius',
          middle_name: null,
          phone_number: null,
          role: 'user',
          updated_at: userData.body.updated_at,
        });
        await deleteUser(userData.body.id);
      });
    });
  });

  describe('delete user route', () => {
    describe('given the id pass is wrong', () => {
      it('should return a 400', async () => {
        const user = await createUser();
        const userId = 'non-exiting-id';
        await supertest(app)
          .delete(`${USER_API}/${userId}`)
          .expect(HttpStatusCode.BAD_REQUEST);
        await deleteUser(user.id);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 200', async () => {
        const user = await createUser();
        await supertest(app)
          .delete(`${USER_API}/${user.id}`)
          .expect(HttpStatusCode.OK);
      });
    });

    describe('given the user does not exist', () => {
      it('should return a 404', async () => {
        const userId = 'e5e51bf0-06ee-4d89-ae58-c9c92dc8a1d7';
        await supertest(app)
          .delete(`${USER_API}/${userId}`)
          .expect(HttpStatusCode.NOT_FOUND);
      });
    });
  });
});
