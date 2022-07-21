import { database } from '../config';
import { HouseholdModel } from '../models';
import {
  HTTP500Error,
  log,
  HTTP404Error,
  Nullable,
  householdProps,
  householdOptionalProps,
  householdRequiredProps,
  ORMEntity,
  HttpStatusCode,
  APIError,
} from '../utils';

class HouseholdService {
  constructor() {}

  public getAll = async (): Promise<householdProps[]> => {
    log.info('Getting all households');
    try {
      const allHouseholds: householdProps[] = await database
        .getManager()
        .find(HouseholdModel);
      log.info('Got all households' + allHouseholds.length);
      if (allHouseholds.length === 0)
        throw new HTTP404Error('No households found');
      return allHouseholds;
    } catch (error) {
      log.error(error);
      if (error.httpCode === HttpStatusCode.NOT_FOUND)
        throw new APIError(error.name, error.description, error.httpCode);
      throw new HTTP500Error('Unable to retrieve all household from database');
    }
  };

  public queryById = async (householdId: string): Promise<householdProps> => {
    log.info('Searching for household with id: ' + householdId);
    try {
      const household: Nullable<householdProps> = await database
        .getManager()
        .findOne(HouseholdModel, { where: { id: householdId } });
      if (!household) throw new HTTP404Error('Household not found');
      log.info('Household found with id: ' + household.id);
      return household;
    } catch (error) {
      log.error(error);
      if (error.httpCode === HttpStatusCode.NOT_FOUND)
        throw new APIError(error.name, error.description, error.httpCode);
      throw new HTTP500Error('Unable to find household in database');
    }
  };

  public create = async (
    householdData: householdRequiredProps,
  ): Promise<householdProps> => {
    log.info('Creating household in database');
    try {
      const household: ORMEntity<householdRequiredProps> = database
        .getManager()
        .create(HouseholdModel, householdData);
      const newHousehold: householdProps = await household.save();
      log.info('Household was created with id: ' + newHousehold.id);
      return newHousehold;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to create household in database');
    }
  };

  public update = async (
    householdData: householdOptionalProps,
    householdId: string,
  ): Promise<householdProps> => {
    log.info('Updating household data with id: ' + householdId);
    const household: householdProps = await this.queryById(householdId);
    try {
      const updatedHousehold = { ...household, ...householdData };
      await database.getManager().save(HouseholdModel, updatedHousehold);
      log.info(
        'Household data was updated. Household id: ' + updatedHousehold.id,
      );
      return updatedHousehold;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to update household in database');
    }
  };

  public softDelete = async (householdId: string): Promise<void> => {
    log.info('Removing household with id: ' + householdId);
    await this.queryById(householdId);
    try {
      await database.getManager().softDelete(HouseholdModel, householdId);
      log.info('Household removed with id: ' + householdId);
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to remove household from database');
    }
  };

  public delete = async (householdId: string): Promise<void> => {
    // WARNING: household will be permanently removed from the database
    log.info('Removing household with id: ' + householdId);
    await this.queryById(householdId);
    try {
      await database.getManager().delete(HouseholdModel, householdId);
      log.info('Household removed with id' + householdId);
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to remove household from database');
    }
  };
}

export default HouseholdService;
