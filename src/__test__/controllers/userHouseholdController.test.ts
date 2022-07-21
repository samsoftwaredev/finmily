import supertest from 'supertest';
import { HttpStatusCode } from '../../utils';
import { createHousehold, deleteHousehold } from '../household-tests';
import { app } from '../setup-tests';
import {
  createUserHousehold,
  deleteUserHousehold,
} from '../user-household-tests';
import { createUser, deleteUser } from '../user-tests';

describe('user-household', () => {
  const API = '/api/household';

  describe('retrieve userhousehold route', () => {
    describe('given an incorrect UUID', () => {
      it('should return a 400 if household UUID is invalid', async () => {
        const householdId = 'non-exiting-id';
        const userId = 'eab22204-69ff-417e-b870-b54a8f72baea';

        await supertest(app)
          .get(`${API}/${householdId}/user/${userId}`)
          .expect(HttpStatusCode.BAD_REQUEST);
      });
      it('should return a 400 if user UUID is invalid', async () => {
        const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';
        const userId = 'non-exiting-id';

        await supertest(app)
          .get(`${API}/${householdId}/user/${userId}`)
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });

    describe('given the household and user does not exist', () => {
      it('should return a 404 if household does not exist', async () => {
        const household = await createHousehold();
        const userId = 'eab22224-69ff-417e-b870-b54a8f72baea';

        await supertest(app)
          .get(`${API}/${household.id}/user/${userId}`)
          .expect(HttpStatusCode.NOT_FOUND);

        await deleteHousehold(household.id);
      });
      it('should return a 404 if user does not exist', async () => {
        const householdId = 'eab22504-69ff-417e-b870-b54a8f72baea';
        const user = await createUser();

        await supertest(app)
          .get(`${API}/${householdId}/user/${user.id}`)
          .expect(HttpStatusCode.NOT_FOUND);

        await deleteUser(user.id);
      });
    });

    describe('given the userhousehold does exits', () => {
      it('should return a 200', async () => {
        const user = await createUser();
        const household = await createHousehold();
        await createUserHousehold(household, user);

        await supertest(app)
          .get(`${API}/${household.id}/user/${user.id}`)
          .expect(HttpStatusCode.OK);

        await deleteUserHousehold(household, user);
        await deleteHousehold(household.id);
        await deleteUser(user.id);
      });
    });
  });

  describe('add userhousehold route', () => {
    describe('given an incorrect UUID', () => {
      it('should return a 400 given an incorrect household UUID', async () => {
        const householdId = 'non-exiting-id';
        const userId = 'eab22204-69ff-417e-b870-b54a8f72baea';

        await supertest(app)
          .post(`${API}/${householdId}/user/${userId}/add-admin`)
          .send({
            name: 'Family Dollar',
          })
          .expect(HttpStatusCode.BAD_REQUEST);
      });
      it('should return a 400 given an incorrect user UUID', async () => {
        const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';
        const userId = 'non-exiting-id';

        await supertest(app)
          .post(`${API}/${householdId}/user/${userId}/add-admin`)
          .send({
            name: 'Family Dollar',
          })
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });

    describe('given the household does not exits', () => {
      it('should return a 404', async () => {
        const userId = 'eab22204-69ff-417e-b870-b54a8f72baea';
        const household = await createHousehold();

        await supertest(app)
          .post(`${API}/${household.id}/user/${userId}/add-admin`)
          .expect(HttpStatusCode.NOT_FOUND);

        await deleteHousehold(household.id);
      });
      it('should return a 404', async () => {
        const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';
        const user = await createUser();

        await supertest(app)
          .post(`${API}/${householdId}/user/${user.id}/add-admin`)
          .expect(HttpStatusCode.NOT_FOUND);

        await deleteUser(user.id);
      });
    });

    describe('given the household does exits', () => {
      it('should return a 200', async () => {
        const user = await createUser();
        const household = await createHousehold();
        await createUserHousehold(household, user);

        const res = await supertest(app)
          .post(`${API}/${household.id}/user/${user.id}/add-admin`)
          .set({ household, user })
          .expect(HttpStatusCode.OK);
        expect(res.body.is_admin).toBeTruthy();

        await deleteUserHousehold(household, user);
        await deleteHousehold(household.id);
        await deleteUser(user.id);
      });
    });
  });

  describe('remove userhousehold route', () => {
    describe('given an incorrect UUID', () => {
      it('should return a 400 given an incorrect household UUID', async () => {
        const householdId = 'non-exiting-id';
        const userId = 'eab22204-69ff-417e-b870-b54a8f72baea';

        await supertest(app)
          .post(`${API}/${householdId}/user/${userId}/remove-admin`)
          .send({
            name: 'Family Dollar',
          })
          .expect(HttpStatusCode.BAD_REQUEST);
      });

      it('should return a 400 given an incorrect user UUID', async () => {
        const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';
        const userId = 'non-exiting-id';

        await supertest(app)
          .post(`${API}/${householdId}/user/${userId}/remove-admin`)
          .send({
            name: 'Family Dollar',
          })
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });

    describe('given the household does not exits', () => {
      it('should return a 404', async () => {
        const userId = 'eab22204-69ff-417e-b870-b54a8f72baea';
        const household = await createHousehold();

        await supertest(app)
          .post(`${API}/${household.id}/user/${userId}/remove-admin`)
          .expect(HttpStatusCode.NOT_FOUND);

        await deleteHousehold(household.id);
      });

      it('should return a 404', async () => {
        const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';
        const user = await createUser();

        await supertest(app)
          .post(`${API}/${householdId}/user/${user.id}/remove-admin`)
          .expect(HttpStatusCode.NOT_FOUND);

        await deleteUser(user.id);
      });
    });

    describe('given the household does exits', () => {
      it('should return a 200', async () => {
        const user = await createUser();
        const household = await createHousehold();
        await createUserHousehold(household, user);

        const res = await supertest(app)
          .post(`${API}/${household.id}/user/${user.id}/remove-admin`)
          .set({ household, user })
          .expect(HttpStatusCode.OK);
        expect(res.body.is_admin).toBeFalsy();

        await deleteUserHousehold(household, user);
        await deleteHousehold(household.id);
        await deleteUser(user.id);
      });
    });
  });
});
