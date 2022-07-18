import 'dotenv/config';
import { database, Server } from '../config';

// used by supertest in order to access server endpoints
let app: any;

const cleanUpDatabase = async () => {
  // Clears the database
  await Promise.all(
    database.getEntities().map(async (entity) => {
      try {
        const repository = await database.getManager().getRepository(entity);
        const tableName = repository.metadata.tableName;
        await repository.query(`TRUNCATE TABLE \"${tableName}\" CASCADE;`);
      } catch (error) {
        throw new Error(`ERROR: Cleaning test db: ${error}`);
      }
    }),
  );
};

const startServer = async () => {
  // Starts the server before any test runs
  const server = new Server();
  await server.start();
  app = server.getApp();
};

beforeAll(async () => {
  // Jest will wait for this promise to resolve before running tests.
  await startServer();
});

afterAll(async () => {
  // Jest will wait for this promise to resolve before running tests.
  await cleanUpDatabase();
});

export { app };
