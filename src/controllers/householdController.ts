import { Router, Request, Response } from 'express';
import {
  householdRequiredProps,
  HttpStatusCode,
  householdWithIdProps,
  householdProps,
  householdListProps,
} from '../utils';
import { HouseholdService } from '../services';

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
      const household: householdListProps =
        await this.HouseholdService.getAll();
      res.status(HttpStatusCode.OK).send(household);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public queryById = async (req: Request, res: Response) => {
    const householdId: string = req.params.id;
    try {
      const household: householdWithIdProps =
        await this.HouseholdService.queryById(householdId);
      res.status(HttpStatusCode.OK).send(household);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public create = async (req: Request, res: Response) => {
    const householdData: householdRequiredProps = req.body;
    try {
      const newHousehold: householdWithIdProps =
        await this.HouseholdService.create(householdData);
      res.status(HttpStatusCode.OK).send(newHousehold);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public update = async (req: Request, res: Response) => {
    const householdId: string = req.params.id;
    const householdData: householdProps = req.body;
    try {
      const householdUpdated: householdWithIdProps =
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
    this.router.get('/:id', this.queryById);
    this.router.post('/create-household', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
    this.router.get('/', this.getAll);
  };
}

export default HouseholdController;
