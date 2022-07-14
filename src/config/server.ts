import express, { Request, Response } from 'express';
import cors from 'cors';
import Database from './database';
import { log } from '../utils';
import { UserController, HouseholdController } from '../controllers';
import {
  errorHandlerMiddleware,
  requestListenerMiddleware,
} from '../middlewares';

const PORT = 3030;
// create and setup express app
class Server {
  private app = express.application;
  private userController: UserController;
  private householdController: HouseholdController;
  private db: Database;

  constructor() {
    this.app = express();
    this.db = new Database();
    this.userController = new UserController();
    this.householdController = new HouseholdController();

    this.configuration();
    this.middleware();
    this.routes();
  }

  configuration = () => {
    log.debug('Env variables are set to: ' + !!process.env.PORT);
    this.app.set('port', process.env.PORT || PORT);
  };

  routes = () => {
    // register routes
    this.app.use('/api/users/', this.userController.router);
    this.app.use('/api/household/', this.householdController.router);
    this.app.get('/', function (req: Request, res: Response) {
      // here we will have logic to return all users
      res.send(new Date().toString());
    });
    // NOTE: errorHandlerMiddleware live be after the routes
    this.app.use(errorHandlerMiddleware);
  };

  middleware = () => {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(requestListenerMiddleware);
  };

  start = async () => {
    // start database
    await this.db.start();
    // start server
    const PORT = this.app.get('port');
    this.app.listen(PORT, () => {
      log.info('Server listening at port: ' + PORT);
    });
  };
}

export default Server;
