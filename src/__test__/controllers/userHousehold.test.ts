import supertest from 'supertest';
import { HttpStatusCode } from '../../utils';
import { createHousehold, deleteHousehold } from '../household-tests';
import { app } from '../setup-tests';
import { createUser, deleteUser } from '../user-tests';

describe('user-household', () => {
  const HOUSEHOLD_API = '/api/household';
  describe('retrieve userhousehold route', () => {
    describe('given an incorrect household UUID', () => {
      it('should return a 400', async () => {
        const householdId = 'non-exiting-id';
        const userId = 'eab22204-69ff-417e-b870-b54a8f72baea';
        await supertest(app)
          .get(`${HOUSEHOLD_API}/${householdId}/user/${userId}`)
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });
    describe('given an incorrect user UUID', () => {
      it('should return a 400', async () => {
        const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';
        const userId = 'non-exiting-id';
        await supertest(app)
          .get(`${HOUSEHOLD_API}/${householdId}/user/${userId}`)
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });
    describe('given the household and user does not exits', () => {
      it('should return a 404', async () => {
        const householdId = 'eab22504-69ff-417e-b870-b54a8f72baea';
        const userId = 'eab22224-69ff-417e-b870-b54a8f72baea';
        await supertest(app)
          .get(`${HOUSEHOLD_API}/${householdId}/user/${userId}`)
          .expect(HttpStatusCode.NOT_FOUND);
      });
    });
    describe('given the userhousehold does exits', () => {
      it.skip('should return a 200', async () => {
        // TODO: "Userhousehold not found"
        const user = await createUser();
        const household = await createHousehold({
          name: 'Adams Family',
          description: 'This is a short description of the household',
          user: user,
        });
        await supertest(app)
          .get(`${HOUSEHOLD_API}/${household.id}/user/${user.id}`)
          .expect(HttpStatusCode.OK);
        await deleteHousehold(household.id);
        await deleteUser(user.id);
      });
    });
    describe('given the userhousehold does exits', () => {
      it.skip('should return a 200', async () => {
        // TODO: "Userhousehold not found"
        const user = await createUser();
        const household = await createHousehold({
          name: 'Adams Family',
          description: 'This is a short description of the household',
          user: user,
        });
        await supertest(app)
          .get(`${HOUSEHOLD_API}/${household.id}/user/${user.id}`)
          .expect(HttpStatusCode.OK);
        await deleteHousehold(household.id);
        await deleteUser(user.id);
      });
    });
  });

  describe('add userhousehold route', () => {
    describe('given an incorrect UUID', () => {
      describe('given an incorrect household UUID', () => {
        it('should return a 400', async () => {
          const householdId = 'non-exiting-id';
          const userId = 'eab22204-69ff-417e-b870-b54a8f72baea';
          await supertest(app)
            .post(`${HOUSEHOLD_API}/${householdId}/user/${userId}/add-admin`)
            .send({
              name: 'Family Dollar',
            })
            .expect(HttpStatusCode.BAD_REQUEST);
        });
      });
      describe('given an incorrect user UUID', () => {
        it('should return a 400', async () => {
          const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';
          const userId = 'non-exiting-id';
          await supertest(app)
            .post(`${HOUSEHOLD_API}/${householdId}/user/${userId}/add-admin`)
            .send({
              name: 'Family Dollar',
            })
            .expect(HttpStatusCode.BAD_REQUEST);
        });
      });
      describe('given the household does not exits', () => {
        it.skip('should return a 404', async () => {
          const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';
          const userId = 'eab22204-69ff-417e-b870-b54a8f72baea';
          await supertest(app)
            .post(`${HOUSEHOLD_API}/${householdId}/user/${userId}/add-admin`)
            .expect(HttpStatusCode.NOT_FOUND);
        });
      });
      describe('given the household does exits', () => {
        it.skip('should return a 200', async () => {
          const user = await createUser();
          const household = await createHousehold({
            name: 'Adams Family',
            description: 'This is a short description of the household',
            user: user,
          });
          await supertest(app)
            .post(`${HOUSEHOLD_API}/${household.id}/user/${user.id}/add-admin`)
            .set({ household, user })
            .expect(HttpStatusCode.OK);
        });
      });
    });
    // describe('given the household does exits', () => {
    //   it('should return a 200', async () => {
    //     const household = await createHousehold();
    //     const newHouseholdName = 'Family Dollar';
    //     const res = await supertest(app)
    //       .put(`${HOUSEHOLD_API}/${household.id}`)
    //       .send({
    //         name: newHouseholdName,
    //       })
    //       .expect(HttpStatusCode.OK);
    //     expect(res.body.name).toEqual(newHouseholdName);
    //     await deleteHousehold(household.id);
    //   });
    // });
  });

  describe('create household route', () => {
    // describe('given an incorrect UUID', () => {
    //   it('should return a 400', async () => {
    //     await supertest(app)
    //       .post(`${HOUSEHOLD_API}/create-household`)
    //       .send({
    //         invalidProp: 'Family Dollar',
    //       })
    //       .expect(HttpStatusCode.BAD_REQUEST);
    //   });
    // });
    // describe('given the household does not exits', () => {
    //   it('should return a 200', async () => {
    //     const householdData = {
    //       name: 'Family Dollar',
    //       description: 'Testing the description',
    //     };
    //     const res = await supertest(app)
    //       .post(`${HOUSEHOLD_API}/create-household`)
    //       .send(householdData)
    //       .expect(HttpStatusCode.OK);
    //     expect(res.body).toStrictEqual({
    //       name: householdData.name,
    //       description: householdData.description,
    //       picture: null,
    //       blocked_at: null,
    //       deactivated_at: null,
    //       deleted_at: null,
    //       id: res.body.id,
    //       created_at: res.body.created_at,
    //       updated_at: res.body.updated_at,
    //     });
    //     await deleteHousehold(res.body.id);
    //   });
    // });
  });

  describe('delete household route', () => {
    // describe('given an incorrect UUID', () => {
    //   it('should return a 400', async () => {
    //     const householdId = 'non-exiting-id';
    //     await supertest(app)
    //       .delete(`${HOUSEHOLD_API}/${householdId}`)
    //       .expect(HttpStatusCode.BAD_REQUEST);
    //   });
    // });
    // describe('given the household does not exits', () => {
    //   it('should return a 404', async () => {
    //     const householdId = 'eab32204-69ff-417e-b870-b54a8f72baea';
    //     await supertest(app)
    //       .delete(`${HOUSEHOLD_API}/${householdId}`)
    //       .expect(HttpStatusCode.NOT_FOUND);
    //   });
    // });
    // // describe('given the household does exits', () => {
    // // TODO: check why the  following doesn't work
    // //   it('should return a 200', async () => {
    // //     const household = await createHousehold();
    // //     await supertest(app)
    // //       .delete(`${HOUSEHOLD_API}/${household.id}`)
    // //       .expect(HttpStatusCode.OK);
    // //     await deleteHousehold(household.id);
    // //   });
    // // });
  });
});
