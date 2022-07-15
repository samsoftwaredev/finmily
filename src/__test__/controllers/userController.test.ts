import { UserController } from '../../controllers';

const userController = new UserController();

describe('users', () => {
  describe('get user route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404', () => {});
    });
  });
});
