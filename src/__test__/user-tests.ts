import { UserService } from '../services';
import { userRequiredProps } from '../utils';

const userService = new UserService();
const createUser = async (
  userData: userRequiredProps = {
    email: 'default@user.com',
    first_name: 'Default',
    last_name: 'User',
  },
) => await userService.create(userData);

const deleteUser = async (userId: string) => await userService.delete(userId);

export { createUser, deleteUser };
