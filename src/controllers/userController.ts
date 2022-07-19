import { Router, Request, Response } from 'express';
import {
  HttpStatusCode,
  userOptionalProps,
  userProps,
  userRequiredProps,
} from '../utils';
import { UserService } from '../services';
import { validateBody } from '../middlewares';
// to resolve "Cannot find module ../_schema" execute "npm run schema"
import _schema from '../_schema';
class UserController {
  public router: Router;
  private UserService: UserService;

  constructor() {
    this.router = Router();
    this.UserService = new UserService();
    this.routes();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const users: userProps[] = await this.UserService.getAll();
      res.status(HttpStatusCode.OK).send(users);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public queryById = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    try {
      const user: userProps = await this.UserService.queryById(userId);
      res.status(HttpStatusCode.OK).send(user);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public create = async (req: Request, res: Response) => {
    const userData: userRequiredProps = req.body;
    try {
      const newUser: userProps = await this.UserService.create(userData);
      res.status(HttpStatusCode.OK).send(newUser);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public update = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const userData: userOptionalProps = req.body;
    try {
      const userUpdated: userProps = await this.UserService.update(
        userData,
        userId,
      );
      res.status(HttpStatusCode.OK).send(userUpdated);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    try {
      await this.UserService.delete(userId);
      res.status(HttpStatusCode.OK).send();
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public routes = () => {
    this.router.get('/:id', this.queryById);
    this.router.post(
      '/create-user',
      validateBody(_schema['userRequiredProps']),
      this.create,
    );
    this.router.put(
      '/:id',
      validateBody(_schema['userOptionalProps']),
      this.update,
    );
    this.router.delete('/:id', this.delete);
    this.router.get('/', this.getAll);
  };
}

export default UserController;
