import { database } from '../config';
import { HouseholdModel } from '../models';
import { HTTP500Error, log, HTTP404Error, Nullable } from '../utils';

class HouseholdService {
  constructor() {}

  public getAll = async (): Promise<HouseholdModel[]> => {
    log.info('Getting all households');
    try {
      const allHouseholds: HouseholdModel[] = await database
        .getManager()
        .find(HouseholdModel);
      log.info('Got all households' + allHouseholds.length);
      if (allHouseholds.length === 0)
        throw new HTTP404Error('No households found');
      return allHouseholds;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to retrieve all household from database');
    }
  };

  public queryById = async (householdId: string): Promise<HouseholdModel> => {
    log.info('Searching for household with id: ' + householdId);
    try {
      const household: Nullable<HouseholdModel> = await database
        .getManager()
        .findOne(HouseholdModel, {
          where: {
            id: householdId,
          },
        });
      if (!household) throw new HTTP404Error('Household not found');
      log.info('Household found with id: ' + household.id);
      return household;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to find household in database');
    }
  };

  public create = async (
    householdData: HouseholdModel,
  ): Promise<HouseholdModel> => {
    log.info('Creating household in database');
    try {
      const newHousehold = database
        .getManager()
        .create(HouseholdModel, householdData);
      await newHousehold.save();
      log.info('Household was created with id: ' + newHousehold.id);
      return newHousehold;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to create household in database');
    }
  };

  public update = async (
    householdData: HouseholdModel,
    householdId: string,
  ): Promise<HouseholdModel> => {
    log.info('Updating household data with id: ' + householdId);
    try {
      const household: HouseholdModel = await this.queryById(householdId);
      await database.getManager().save({
        ...household,
        ...householdData,
      });
      log.info('Household data was updated. Household id: ' + household.id);
      return household;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to update household in database');
    }
  };

  // TODO: function to soft-delete a household

  public delete = async (householdId: string): Promise<void> => {
    log.info('Removing household with id: ' + householdId);
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
