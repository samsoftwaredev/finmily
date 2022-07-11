import { DataSource } from "typeorm";
import { databaseENV, log } from "../utils";
import {
  UserModel,
  UserHouseholdModel,
  UserHouseholdVisibilityModel,
  SuspiciousActivityModel,
  InvitationModel,
  HouseholdModel,
  HouseholdHistoryModel,
  HouseholdEventModel,
  AddressModel,
} from "../models";

class Database {
  private static appDataSource = null;

  constructor() {}

  static getManager = () => Database.appDataSource.manager;

  public start = async () => {
    try {
      Database.appDataSource = await new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        database: process.env.DB_DATABASE,
        entities: [
          UserModel,
          UserHouseholdModel,
          UserHouseholdVisibilityModel,
          SuspiciousActivityModel,
          InvitationModel,
          HouseholdModel,
          HouseholdHistoryModel,
          HouseholdEventModel,
          AddressModel,
        ],
        synchronize: true,
        // logging: isDevEnvironment(),
      });
      log.info("Connected to Postgres a port: " + databaseENV.DB_PORT);
    } catch (error) {
      log.error(error);
      throw new Error("Unable to connect Postgres");
    }

    try {
      await Database.appDataSource.initialize();
      log.info("Data Source has been initialized");
    } catch (error) {
      log.error(error);
      throw new Error("Error during Data Source initialization");
    }
  };
}

export default Database;
