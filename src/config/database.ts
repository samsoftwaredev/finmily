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
  connection = null;
  constructor() {}

  start = async () => {
    try {
      this.connection = await new DataSource({
        type: "postgres",
        host: databaseENV.DB_HOST,
        port: databaseENV.DB_PORT,
        password: databaseENV.DB_PASSWORD,
        username: databaseENV.DB_USERNAME,
        database: databaseENV.DB_DATABASE,
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
      });
      log.info("Connected to Postgres");
    } catch (error) {
      log.error(error);
      throw new Error("Unable to connect Postgres");
    }
  };
}

export default Database;
