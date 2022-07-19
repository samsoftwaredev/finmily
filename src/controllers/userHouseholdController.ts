import { Router, Request, Response } from 'express';
import {
  householdOptionalProps,
  householdProps,
  householdRequiredProps,
  HttpStatusCode,
} from '../utils';
import { UserHouseholdService } from '../services';
import { validateSchema } from '../middlewares';
// to resolve "Cannot find module ../_schema" execute "npm run schema"
import _schema from '../_schema';
import {
  validateIdParamUUID,
  validateUserHouseholdParamUUID,
} from '../middlewares';

class UserHouseholdController {
  public router: Router;
  private userHouseholdService: UserHouseholdService;

  constructor() {
    this.router = Router();
    this.userHouseholdService = new UserHouseholdService();
    this.routes();
  }

  public addUserToHousehold = async (req: Request, res: Response) => {};

  public removeUserFromHousehold = async (req: Request, res: Response) => {};

  public routes = () => {
    this.router.post(
      '/:householdId/user/:userId/add-user',
      validateUserHouseholdParamUUID,
      this.addUserToHousehold,
    );
    this.router.post(
      '/:householdId/user/:userId/remove-user',
      validateUserHouseholdParamUUID,
      this.removeUserFromHousehold,
    );
  };
}

export default UserHouseholdController;
