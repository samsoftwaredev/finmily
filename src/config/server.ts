import express, { Request, Response } from 'express';
// import cors from 'cors';
import { database } from './database';
import { log } from '../utils';
import {
  UserController,
  HouseholdController,
  UserHouseholdController,
} from '../controllers';
import {
  errorHandlerMiddleware,
  requestListenerMiddleware,
} from '../middlewares';

class Server {
  private server: any;
  private app = express.application;
  private userController: UserController;
  private householdController: HouseholdController;
  private userHouseholdController: UserHouseholdController;

  constructor() {
    this.app = express();
    this.userController = new UserController();
    this.householdController = new HouseholdController();
    this.userHouseholdController = new UserHouseholdController();

    this.preMiddleware();
    this.routes();
    this.postMiddleware();
  }

  getApp = () => this.app;

  routes = () => {
    // register routes
    this.app.use('/api/user/', this.userController.router);
    this.app.use('/api/household/', this.householdController.router);
    this.app.use('/api/household/', this.userHouseholdController.router);
    this.app.get('/', function (req: Request, res: Response) {
      res.send(new Date().toString());
    });
  };

  preMiddleware = () => {
    this.app.use(express.json());
    // this.app.use(cors());
    this.app.use(requestListenerMiddleware);
  };

  postMiddleware = () => {
    // NOTE: errorHandlerMiddleware must execute after the routes method
    this.app.use(errorHandlerMiddleware);
  };

  stop = () => {
    this.server.close();
  };

  start = async () => {
    await database.start();
    const PORT = process.env.APP_PORT || process.env.PORT;
    this.server = this.app.listen(PORT, () => {
      log.info('Server listening at port: ' + PORT);
    });
  };
}

export default Server;
