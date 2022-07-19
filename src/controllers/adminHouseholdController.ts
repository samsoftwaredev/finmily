import { Router, Request, Response } from 'express';

import { UserHouseholdService } from '../services';
// to resolve "Cannot find module ../_schema" execute "npm run schema"
import _schema from '../_schema';
import { validateUserHouseholdParamUUID } from '../middlewares';

class AdminHouseholdController {
  public router: Router;
  private adminHouseholdService: UserHouseholdService;

  constructor() {
    this.router = Router();
    this.adminHouseholdService = new UserHouseholdService();
    this.routes();
  }

  public addAdminUserToHousehold = async (req: Request, res: Response) => {
    // They cannot make themselves admins
    // Only admin can make other admins
  };
  public removeAdminUserFromHousehold = async (req: Request, res: Response) => {
    // They cannot remove themselves as admins
  };

  public routes = () => {
    // USER_HOUSEHOLD_ADMIN endpoints
    this.router.post(
      '/:householdId/user/:userId/add-admin',
      validateUserHouseholdParamUUID,
      this.addAdminUserToHousehold,
    );

    this.router.post(
      '/:householdId/user/:userId/remove-admin',
      validateUserHouseholdParamUUID,
      this.removeAdminUserFromHousehold,
    );
  };
}

export default AdminHouseholdController;
