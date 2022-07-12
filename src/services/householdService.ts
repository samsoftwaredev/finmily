import { Database } from "../config";
import { HouseholdModel } from "../models";
import { HTTP500Error, log, householdWithIdProps, householdNecessaryProps, householdProps, householdListProps } from "../utils";

class HouseholdService {
  constructor() {}

  public getAll = async (): Promise<householdListProps> => {
    log.info("Getting all households");
    try {
      const allHouseholds = await Database.getManager().find(HouseholdModel)
      log.info("Got all households");
      return allHouseholds;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error("Unable to retrieve all household from database");
    }
  };

  public queryById = async (householdId: string): Promise<householdWithIdProps> => {
    log.info("Searching for household with id: " + householdId);
    try {
      const household: householdWithIdProps = await Database.getManager().findOne(HouseholdModel, {
        where: {
          id: householdId,
        }
      }); 
      log.info("Household found with id: " +  household.id);
      return household;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error("Unable to find household in database");
    }
  };

  public create = async (householdData: householdNecessaryProps): Promise<householdWithIdProps> => {
    log.info("Creating household in database");
    try {
      const newHousehold = Database.getManager().create(HouseholdModel, householdData);
      await newHousehold.save();
      log.info("Household was created with id: " + newHousehold.id);
      return newHousehold;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error("Unable to create household in database");
    }
  };

  public update = async (householdData: householdProps, householdId: string): Promise<householdWithIdProps> => {
    log.info("Updating household data with id: " + householdId);
    try {
      const household: householdWithIdProps = await this.queryById(householdId);
      const householdUpdated: householdWithIdProps = { ...household, ...householdData };
      await Database.getManager().save(householdUpdated);
      log.info("Household data was updated. Household id: " + householdUpdated.id);
      return householdUpdated;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error("Unable to update household in database");
    }
  };

  // TODO: function to soft-delete a user

  public delete = async (householdId: string): Promise<void> => {
    log.info("Removing household with id: " + householdId);
    try {
      await Database.getManager().delete(HouseholdModel, householdId);
      log.info("Household removed with id" + householdId);
    } catch (error) {
      log.error(error);
      throw new HTTP500Error("Unable to remove household from database");
    }
  };
}

export default HouseholdService;
