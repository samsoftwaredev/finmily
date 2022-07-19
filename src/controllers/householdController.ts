import { Router, Request, Response } from 'express';
import {
  householdOptionalProps,
  householdProps,
  householdRequiredProps,
  HttpStatusCode,
} from '../utils';
import { HouseholdService } from '../services';
import { validateSchema } from '../middlewares';
// to resolve "Cannot find module ../_schema" execute "npm run schema"
import _schema from '../_schema';
import { validateParamUUID } from '../middlewares';

class HouseholdController {
  public router: Router;
  private HouseholdService: HouseholdService;

  constructor() {
    this.router = Router();
    this.HouseholdService = new HouseholdService();
    this.routes();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const household: householdProps[] = await this.HouseholdService.getAll();
      res.status(HttpStatusCode.OK).send(household);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public queryById = async (req: Request, res: Response) => {
    const householdId: string = req.params.id;
    try {
      const household: householdProps = await this.HouseholdService.queryById(
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
      const newHousehold: householdProps = await this.HouseholdService.create(
        householdData,
      );
      res.status(HttpStatusCode.OK).send(newHousehold);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public update = async (req: Request, res: Response) => {
    const householdId: string = req.params.id;
    const householdData: householdOptionalProps = req.body;
    try {
      const householdUpdated: householdProps =
        await this.HouseholdService.update(householdData, householdId);
      res.status(HttpStatusCode.OK).send(householdUpdated);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const householdId: string = req.params.id;
    try {
      await this.HouseholdService.delete(householdId);
      res.status(HttpStatusCode.OK).send();
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public routes = () => {
    this.router.get('/:id', validateParamUUID, this.queryById);
    this.router.post(
      '/create-household',
      validateSchema(_schema['householdRequiredProps']),
      this.create,
    );
    this.router.put(
      '/:id',
      validateSchema(_schema['householdOptionalProps']),
      validateParamUUID,
      this.update,
    );
    this.router.delete('/:id', validateParamUUID, this.delete);
    this.router.get('/', this.getAll);
  };
}

export default HouseholdController;
