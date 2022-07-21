import { Router, Request, Response } from 'express';
import {
  householdOptionalProps,
  householdProps,
  householdRequiredProps,
  HttpStatusCode,
  userHouseholdProps,
  userProps,
} from '../utils';
import {
  HouseholdService,
  UserHouseholdService,
  UserService,
} from '../services';
import { validateSchema } from '../middlewares';
import _schema from '../_schema';
import { validateIdParamUUID } from '../middlewares';

class HouseholdController {
  public router: Router;
  private householdService: HouseholdService;
  private userHouseholdService: UserHouseholdService;
  private userService: UserService;

  constructor() {
    this.router = Router();
    this.householdService = new HouseholdService();
    this.userHouseholdService = new UserHouseholdService();
    this.userService = new UserService();
    this.routes();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const household: householdProps[] = await this.householdService.getAll();
      res.status(HttpStatusCode.OK).send(household);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public queryById = async (req: Request, res: Response) => {
    const householdId: string = req.params.id;

    try {
      const household: householdProps = await this.householdService.queryById(
        householdId,
      );
      res.status(HttpStatusCode.OK).send(household);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public create = async (req: Request, res: Response) => {
    const householdData: householdRequiredProps = req.body;

    try {
      const newHousehold: householdProps = await this.householdService.create(
        householdData,
      );
      res.status(HttpStatusCode.OK).send(newHousehold);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public createHouseholdForUser = async (req: Request, res: Response) => {
    // TODO: this endpoint can only be used by admin
    const householdData: householdRequiredProps = req.body;
    const userId: string = req.params.id;

    try {
      const user: userProps = await this.userService.queryById(userId);
      const household: householdProps = await this.householdService.create({
        ...householdData,
        user,
      });
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

  public update = async (req: Request, res: Response) => {
    const householdId: string = req.params.id;
    const householdData: householdOptionalProps = req.body;

    try {
      const householdUpdated: householdProps =
        await this.householdService.update(householdData, householdId);
      res.status(HttpStatusCode.OK).send(householdUpdated);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const householdId: string = req.params.id;

    try {
      await this.householdService.delete(householdId);
      res.status(HttpStatusCode.OK).send();
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public routes = () => {
    this.router.get('/:id', validateIdParamUUID, this.queryById);

    this.router.post(
      '/create-household',
      validateSchema(_schema['householdRequiredProps']),
      this.create,
    );

    this.router.post(
      '/assign-created-household/:id',
      validateSchema(_schema['householdRequiredProps']),
      validateIdParamUUID,
      this.createHouseholdForUser,
    );

    this.router.put(
      '/:id',
      validateSchema(_schema['householdOptionalProps']),
      validateIdParamUUID,
      this.update,
    );

    this.router.delete('/:id', validateIdParamUUID, this.delete);

    this.router.get('/', this.getAll);
  };
}

export default HouseholdController;
