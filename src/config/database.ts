import { DataSource } from 'typeorm';
import { databaseENV, log } from '../utils';
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
} from '../models';

class Database {
  // appDataSource has to be a static value in order for the
  // "./services" methods to manipulate the DB
  appDataSource: DataSource;

  entityList = [
    UserModel,
    UserHouseholdModel,
    UserHouseholdVisibilityModel,
    SuspiciousActivityModel,
    InvitationModel,
    HouseholdModel,
    HouseholdHistoryModel,
    HouseholdEventModel,
    AddressModel,
  ];

  constructor() {}

  public getManager = () => this.appDataSource.manager;

  public getEntities = () => this.entityList;

  public start = async () => {
    try {
      this.appDataSource = await new DataSource({
        type: 'postgres',
        host: databaseENV.DB_HOST,
        port: +databaseENV.DB_PORT,
        password: databaseENV.DB_PASSWORD,
        username: databaseENV.DB_USERNAME,
        database: databaseENV.DB_DATABASE,
        entities: this.entityList,
        synchronize: true,
        // logging: isDevEnvironment(),
      });
      log.info('Connected to Postgres a port: ' + databaseENV.DB_PORT);
    } catch (error) {
      log.error(error);
      throw new Error('Unable to connect Postgres');
    }

    try {
      await this.appDataSource.initialize();
      log.info('Data Source has been initialized');
    } catch (error) {
      log.error(error);
      console.log(error);
      throw new Error('Error during Data Source initialization');
    }
  };
}

const database: Database = new Database();
export { database, Database };
