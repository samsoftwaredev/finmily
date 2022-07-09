import { createConnection } from "typeorm";
import {log} from "../utils";

const DB_TYPE = "postgres";
const DB_HOST = "localhost";
const DB_PORT = 5432;
const DB_PASSWORD = "123123";
const DB_USERNAME = "postgres";
const DB_DATABASE = "finmily";

class Database {
  connection = null;
  constructor() {}

  start = async () => {
    try {
      this.connection = await createConnection({
        type: DB_TYPE,
        host: DB_HOST,
        port: DB_PORT,
        password: DB_PASSWORD,
        username: DB_USERNAME,
        database: DB_DATABASE,
      });
      log.debugger("Connected to Postgres");
    } catch (error) {
      log.error(error);
      throw new Error("Unable to connect Postgres");
    }
  };
}

export default Database;
