import { database } from '../config';
import { UserHouseholdModel } from '../models';
import {
  HTTP500Error,
  log,
  HTTP404Error,
  Nullable,
  ORMEntity,
  userHouseholdProps,
  householdProps,
  userProps,
  userHouseholdRequiredProps,
  userHouseholdOptionalProps,
  HttpStatusCode,
  APIError,
} from '../utils';

class UserHouseholdService {
  constructor() {}

  public queryByUserHousehold = async (
    household: householdProps,
    user: userProps,
  ): Promise<userHouseholdProps> => {
    log.info(
      `Searching for userhousehold with household id ${household.id} and user id ${user.id}`,
    );
    try {
      const userHousehold: Nullable<userHouseholdProps> = await database
        .getManager()
        .getRepository(UserHouseholdModel)
        .findOne({
          relations: { user: true, household: true },
          where: { user: { id: user.id }, household: { id: household.id } },
        });
      if (!userHousehold) throw new HTTP404Error('Userhousehold not found');
      log.info(`Userhousehold found with id: ${userHousehold.id}`);
      return userHousehold;
    } catch (error) {
      log.error(error);
      if (error.httpCode === HttpStatusCode.NOT_FOUND)
        throw new APIError(error.name, error.description, error.httpCode);
      throw new HTTP500Error('Unable to find userhousehold in database');
    }
  };

  public create = async ({
    household,
    user,
  }: userHouseholdRequiredProps): Promise<userHouseholdProps> => {
    log.info('Creating userhousehold in database');
    try {
      const newUserHousehold: ORMEntity<userHouseholdRequiredProps> = database
        .getManager()
        .create(UserHouseholdModel, { user: user, household: household });
      const userHousehold: userHouseholdProps = await newUserHousehold.save();
      log.info('Userhousehold was created with id: ' + newUserHousehold.id);
      return userHousehold;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to create userhousehold in database');
    }
  };

  public update = async (
    userHouseholdData: userHouseholdOptionalProps,
    household: householdProps,
    user: userProps,
  ): Promise<userHouseholdProps> => {
    log.info(`Updating userhousehold data with id: ${household.id}`);
    const userHousehold: userHouseholdProps = await this.queryByUserHousehold(
      household,
      user,
    );
    try {
      const updatedUserHousehold = { ...userHousehold, ...userHouseholdData };
      await database
        .getManager()
        .save(UserHouseholdModel, updatedUserHousehold);
      log.info(
        'Userhousehold data was updated. Userhousehold id: ' +
          updatedUserHousehold.id,
      );
      return updatedUserHousehold;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to update userhousehold in database');
    }
  };

  public softDelete = async (
    household: householdProps,
    user: userProps,
  ): Promise<void> => {
    const userHousehold: userHouseholdProps = await this.queryByUserHousehold(
      household,
      user,
    );
    const userHouseholdId = userHousehold.id;
    log.info('Removing userhousehold with id: ' + userHouseholdId);
    try {
      await database
        .getManager()
        .softDelete(UserHouseholdModel, userHouseholdId);
      log.info('Userhousehold removed with id: ' + userHouseholdId);
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to remove userhousehold from database');
    }
  };

  public delete = async (
    household: householdProps,
    user: userProps,
  ): Promise<void> => {
    // WARNING: household will be permanently removed from the database
    const userHousehold: userHouseholdProps = await this.queryByUserHousehold(
      household,
      user,
    );
    const userHouseholdId = userHousehold.id;
    log.info('Removing userhousehold with id: ' + userHouseholdId);
    try {
      await database.getManager().delete(UserHouseholdModel, userHouseholdId);
      log.info('Userhousehold removed with id: ' + userHouseholdId);
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to remove userhousehold from database');
    }
  };
}

export default UserHouseholdService;
