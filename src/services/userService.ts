import { database } from '../config';
import { UserModel } from '../models';
import {
  log,
  HTTP500Error,
  HTTP404Error,
  Nullable,
  userProps,
  userRequiredProps,
  ORMEntity,
  userOptionalProps,
} from '../utils';

class UserService {
  constructor() {}

  public getAll = async (): Promise<userProps[]> => {
    log.info('Getting all users');
    try {
      const allUsers: userProps[] = await database.getManager().find(UserModel);
      log.info('Got all users' + allUsers.length);
      if (allUsers.length === 0) throw new HTTP404Error('No users found');
      return allUsers;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to retrieve all users from database');
    }
  };

  public queryById = async (userId: string): Promise<userProps> => {
    log.info('Searching for user with id: ' + userId);
    try {
      const user: Nullable<UserModel> = await database
        .getManager()
        .findOne(UserModel, {
          where: {
            id: userId,
          },
        });
      if (!user) throw new HTTP404Error('User not found');
      log.info('User found with id: ' + user.id);
      return user;
    } catch (error) {
      log.error(error);
      throw new HTTP404Error('Unable to find user in database');
    }
  };

  public create = async (userData: userRequiredProps): Promise<userProps> => {
    log.info('Creating user in database');
    try {
      const user: ORMEntity<userRequiredProps> = database
        .getManager()
        .create(UserModel, userData);
      const newUser: userProps = await user.save();
      log.info('User was created with id: ' + newUser.id);
      return newUser;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to create user in database');
    }
  };

  public update = async (
    userData: userOptionalProps,
    userId: string,
  ): Promise<userProps> => {
    log.info('Updating user data with id: ' + userId);
    try {
      const user: ORMEntity<userProps> = await this.queryById(userId);
      await database.getManager().save(UserModel, { ...user, ...userData });
      log.info('User data was updated. User id: ' + user.id);
      return user;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to update user in database');
    }
  };

  // TODO: function to soft-delete a user

  public delete = async (userId: string): Promise<void> => {
    log.info('Removing user with id: ' + userId);
    try {
      await database.getManager().delete(UserModel, userId);
      log.info('User removed with id' + userId);
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to remove user from database');
    }
  };
}

export default UserService;
