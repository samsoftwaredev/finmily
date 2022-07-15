import { Database } from '../config';
import { UserModel } from '../models';
import {
  HTTP500Error,
  log,
  userWithIdProps,
  userRequiredProps,
  userProps,
  userListProps,
  HTTP404Error,
} from '../utils';

class UserService {
  constructor() {}

  public getAll = async (): Promise<userListProps> => {
    log.info('Getting all users');
    try {
      const allUsers = await Database.getManager().find(UserModel);
      log.info('Got all users');
      if (allUsers.length === 0) throw new HTTP404Error('No users found');
      return allUsers;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to retrieve all users from database');
    }
  };

  public queryById = async (userId: string): Promise<userWithIdProps> => {
    log.info('Searching for user with id: ' + userId);
    try {
      const user: userWithIdProps = await Database.getManager().findOne(
        UserModel,
        {
          where: {
            id: userId,
          },
        },
      );
      log.info('User found with id: ' + user.id);
      return user;
    } catch (error) {
      log.error(error);
      throw new HTTP404Error('Unable to find user in database');
    }
  };

  public create = async (
    userData: userRequiredProps,
  ): Promise<userWithIdProps> => {
    log.info('Creating user in database');
    try {
      const newUser = Database.getManager().create(UserModel, userData);
      await newUser.save();
      log.info('User was created with id: ' + newUser.id);
      return newUser;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to create user in database');
    }
  };

  public update = async (
    userData: userProps,
    userId: string,
  ): Promise<userWithIdProps> => {
    log.info('Updating user data with id: ' + userId);
    try {
      const user: userWithIdProps = await this.queryById(userId);
      const userUpdated: userWithIdProps = { ...user, ...userData };
      await Database.getManager().save(userUpdated);
      log.info('User data was updated. User id: ' + userUpdated.id);
      return userUpdated;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to update user in database');
    }
  };

  // TODO: function to soft-delete a user

  public delete = async (userId: string): Promise<void> => {
    log.info('Removing user with id: ' + userId);
    try {
      await Database.getManager().delete(UserModel, userId);
      log.info('User removed with id' + userId);
    } catch (error) {
      log.error(error);
      throw new HTTP500Error('Unable to remove user from database');
    }
  };
}

export default UserService;
