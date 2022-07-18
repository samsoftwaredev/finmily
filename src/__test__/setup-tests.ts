import dotenv from 'dotenv';
import { Server } from '../config';

dotenv.config({ path: '../../.env.test.local' });

let app: any;
// const cleanUpDatabase = async () => {
//   // NOTE: Purge Database, only for testing purposes.
//   database.getEntities().forEach(async (entity) => {
//     await database.getManager().getRepository(entity).clear();
//   });
// };

beforeAll(async () => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  const server = new Server();
  await server.start();
  app = server.getApp();
});

afterAll(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  // cleanUpDatabase()
});

// describe('config', () => {
//   describe('given the server has start', () => {
//     it('should be defined', async () => {
//       expect(app).not.toBe(null);
//     });
//   });
// });

export { app };
