import express, { Request, Response } from 'express';
import cors from 'cors';
import { database } from './database';
import { log, variablesENV } from '../utils';
import { UserController, HouseholdController } from '../controllers';
import {
  errorHandlerMiddleware,
  requestListenerMiddleware,
} from '../middlewares';

const PORT = 3030;
// create and setup express app
class Server {
  private server: any;
  private app = express.application;
  private userController: UserController;
  private householdController: HouseholdController;

  constructor() {
    this.app = express();
    this.userController = new UserController();
    this.householdController = new HouseholdController();

    this.configuration();
    this.preMiddleware();
    this.routes();
    this.postMiddleware();
  }

  getApp = () => this.app;

  configuration = () => {
    log.debug('Env variables are set to: ' + !!variablesENV.PORT);
    this.app.set('port', variablesENV.PORT || PORT);
  };

  routes = () => {
    // register routes
    this.app.use('/api/users/', this.userController.router);
    this.app.use('/api/household/', this.householdController.router);
    this.app.get('/', function (req: Request, res: Response) {
      res.send(new Date().toString());
    });
  };

  preMiddleware = () => {
    this.app.use(express.json());
    this.app.use(cors());
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
    // start database
    await database.start();
    // start server
    const PORT = this.app.get('port');
    this.server = this.app.listen(PORT, () => {
      log.info('Server listening at port: ' + PORT);
    });
  };
}

export default Server;
