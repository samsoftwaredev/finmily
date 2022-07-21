import supertest from 'supertest';
import { HttpStatusCode } from '../../utils';
import { createHousehold, deleteHousehold } from '../household-tests';
import { app } from '../setup-tests';
import { createUser } from '../user-tests';

describe('household', () => {
  const API = '/api/household';

  describe('retrieve household route', () => {
    describe('given an incorrect UUID', () => {
      it('should return a 400', async () => {
        const householdId = 'non-exiting-id';

        await supertest(app)
          .get(`${API}/${householdId}`)
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });

    describe('given the household does not exits', () => {
      it('should return a 404', async () => {
        const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';

        await supertest(app)
          .get(`${API}/${householdId}`)
          .expect(HttpStatusCode.NOT_FOUND);
      });
    });

    describe('given the household does exits', () => {
      it('should return a 200', async () => {
        const household = await createHousehold();

        await supertest(app)
          .get(`${API}/${household.id}`)
          .expect(HttpStatusCode.OK);
        await deleteHousehold(household.id);
      });
    });
  });

  describe('update household route', () => {
    describe('given an incorrect UUID', () => {
      it('should return a 400', async () => {
        const householdId = 'non-exiting-id';

        await supertest(app)
          .put(`${API}/${householdId}`)
          .send({
            name: 'Family Dollar',
          })
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });

    describe('given the household does not exits', () => {
      it('should return a 404', async () => {
        const householdId = 'eab22204-69ff-417e-b870-b54a8f72baea';

        await supertest(app)
          .put(`${API}/${householdId}`)
          .send({
            name: 'Family Dollar',
          })
          .expect(HttpStatusCode.NOT_FOUND);
      });
    });

    describe('given the household does exits', () => {
      it('should return a 200', async () => {
        const household = await createHousehold();
        const newHouseholdName = 'Family Dollar';

        const res = await supertest(app)
          .put(`${API}/${household.id}`)
          .send({
            name: newHouseholdName,
          })
          .expect(HttpStatusCode.OK);
        expect(res.body.name).toEqual(newHouseholdName);
        await deleteHousehold(household.id);
      });
    });
  });

  describe('create household route', () => {
    describe('given an incorrect UUID', () => {
      it('should return a 400', async () => {
        await supertest(app)
          .post(`${API}/create-household`)
          .send({
            invalidProp: 'Family Dollar',
          })
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });

    describe('given the household does not exits', () => {
      it('should return a 200', async () => {
        const householdData = {
          name: 'Family Dollar',
          description: 'Testing the description',
        };

        const res = await supertest(app)
          .post(`${API}/create-household`)
          .send(householdData)
          .expect(HttpStatusCode.OK);
        expect(res.body).toStrictEqual({
          name: householdData.name,
          description: householdData.description,
          picture: null,
          blocked_at: null,
          deactivated_at: null,
          deleted_at: null,
          id: res.body.id,
          created_at: res.body.created_at,
          updated_at: res.body.updated_at,
        });

        await deleteHousehold(res.body.id);
      });
    });

    describe('given the household does not exits, create household for user', () => {
      it('should return a 200', async () => {
        const user = await createUser();
        await supertest(app)
          .post(`${API}/assign-created-household/${user.id}`)
          .send({
            name: 'Family Dollar',
          })
          .expect(HttpStatusCode.OK);
        // TODO: in order to remove household, you must first remove
        // the userHousehold first before
        // await deleteHousehold(res.body.household.id);
      });
    });
  });

  describe('delete household route', () => {
    describe('given an incorrect UUID', () => {
      it('should return a 400', async () => {
        const householdId = 'non-exiting-id';

        await supertest(app)
          .delete(`${API}/${householdId}`)
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    });

    describe('given the household does not exits', () => {
      it('should return a 404', async () => {
        const householdId = 'eab32204-69ff-417e-b870-b54a8f72baea';

        await supertest(app)
          .delete(`${API}/${householdId}`)
          .expect(HttpStatusCode.NOT_FOUND);
      });
    });

    describe('given the household does exits', () => {
      it('should return a 200', async () => {
        const household = await createHousehold();

        await supertest(app)
          .delete(`${API}/${household.id}`)
          .expect(HttpStatusCode.OK);
      });
    });
  });
});
