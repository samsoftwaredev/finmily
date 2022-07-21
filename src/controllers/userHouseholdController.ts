import { Router, Request, Response } from 'express';
import {
  householdProps,
  HttpStatusCode,
  userHouseholdOptionalProps,
  userHouseholdProps,
  userProps,
} from '../utils';
import {
  HouseholdService,
  UserHouseholdService,
  UserService,
} from '../services';
import { validateSchema } from '../middlewares';
// to resolve "Cannot find module ../_schema" execute "npm run schema"
import _schema from '../_schema';
import {
  validateIdParamUUID,
  validateUserHouseholdParamUUID,
} from '../middlewares';

class UserHouseholdController {
  public router: Router;
  private householdService: HouseholdService;
  private userService: UserService;
  private userHouseholdService: UserHouseholdService;

  constructor() {
    this.router = Router();
    this.householdService = new HouseholdService();
    this.userService = new UserService();
    this.userHouseholdService = new UserHouseholdService();
    this.routes();
  }

  public addUserToHousehold = async (req: Request, res: Response) => {
    // TODO: check if user already exist
    // if user doesn't exist
    // if user does exist
    const householdId: string = req.params.id;
    const invitationData = req.body;
    try {
      // TODO: create user invite
      // TODO: send email to user
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public addUserToHouseholdById = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;
    const householdId: string = req.params.householdId;

    try {
      const user: userProps = await this.userService.queryById(userId);
      const household: householdProps = await this.householdService.queryById(
        householdId,
      );
      const userHousehold: userHouseholdProps =
        await this.userHouseholdService.create({
          household,
          user,
        });
      res.status(HttpStatusCode.OK).send(userHousehold);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public removeUserFromHousehold = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;
    const householdId: string = req.params.householdId;

    try {
      const user: userProps = await this.userService.queryById(userId);
      const household: householdProps = await this.householdService.queryById(
        householdId,
      );
      await this.userHouseholdService.softDelete(household, user);
      res.status(HttpStatusCode.OK).send(household);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public addAdminUserToHousehold = async (req: Request, res: Response) => {
    // TODO: They cannot make themselves admins
    // TODO: Only admin can make other admins
    const userId: string = req.params.userId;
    const householdId: string = req.params.householdId;

    try {
      const user: userProps = await this.userService.queryById(userId);
      const household: householdProps = await this.householdService.queryById(
        householdId,
      );
      const userHousehold: userHouseholdProps =
        await this.userHouseholdService.update(
          { is_admin: true },
          household,
          user,
        );
      res.status(HttpStatusCode.OK).send(userHousehold);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public removeAdminUserFromHousehold = async (req: Request, res: Response) => {
    // TODO: They cannot remove themselves as admins
    // TODO: Only admin can make other admins
    const userId: string = req.params.userId;
    const householdId: string = req.params.householdId;

    try {
      const user: userProps = await this.userService.queryById(userId);
      const household: householdProps = await this.householdService.queryById(
        householdId,
      );
      const userHousehold: userHouseholdProps =
        await this.userHouseholdService.update(
          { is_admin: false },
          household,
          user,
        );
      res.status(HttpStatusCode.OK).send(userHousehold);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  updateHouseholdSetting = async (req: Request, res: Response) => {
    // TODO: block user from making themselves admins
    const updatedData: userHouseholdOptionalProps = req.body;
    const userId: string = req.params.userId;
    const householdId: string = req.params.householdId;

    try {
      const user: userProps = await this.userService.queryById(userId);
      const household: householdProps = await this.householdService.queryById(
        householdId,
      );
      const userHousehold: userHouseholdProps =
        await this.userHouseholdService.update(updatedData, household, user);
      res.status(HttpStatusCode.OK).send(userHousehold);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  getUserHousehold = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;
    const householdId: string = req.params.householdId;

    try {
      const user: userProps = await this.userService.queryById(userId);
      const household: householdProps = await this.householdService.queryById(
        householdId,
      );
      const userHousehold: userHouseholdProps =
        await this.userHouseholdService.queryByUserHousehold(household, user);
      res.status(HttpStatusCode.OK).send(userHousehold);
      return userHousehold;
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public routes = () => {
    this.router.get(
      '/:householdId/user/:userId',
      validateUserHouseholdParamUUID,
      this.getUserHousehold,
    );

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

    this.router.post(
      '/:householdId/add-user',
      validateIdParamUUID,
      // doesn't user the user's id
      this.addUserToHousehold,
    );

    this.router.post(
      '/:householdId/user/:userId/add-user',
      validateUserHouseholdParamUUID,
      // user the user's id
      this.addUserToHouseholdById,
    );

    this.router.post(
      '/:householdId/user/:userId/remove-user',
      validateUserHouseholdParamUUID,
      this.removeUserFromHousehold,
    );

    this.router.put(
      '/:householdId/update-settings',
      validateIdParamUUID,
      validateSchema(_schema['userHouseholdOptionalProps']),
      this.updateHouseholdSetting,
    );
  };
}

export default UserHouseholdController;
