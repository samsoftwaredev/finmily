import { Server } from '../config';

function startServer() {
  const server = new Server();
  server.start();
}

// const cleanUpDatabase = async () => {
//   // NOTE: Purge Database, only for testing purposes.
//   database.getEntities().forEach(async (entity) => {
//     await database.getManager().getRepository(entity).clear();
//   });
// };

beforeAll(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  startServer();
});

afterAll(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  // cleanUpDatabase()
});
