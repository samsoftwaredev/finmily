import express, { Request, Response } from "express";
import cors from "cors";
import Database from "./database";
import { log } from "../utils";
import { UsersController } from "../controllers";
import { listenMiddleware } from "../middlewares";

const PORT = 3030;
// create and setup express app
class Server {
  app = express.application;
  usersController: UsersController;
  db: Database;

  constructor() {
    this.app = express();
    this.db = new Database();
    this.usersController = new UsersController();

    this.configuration();
    this.middleware();
    this.routes();
  }

  configuration = () => {
    log.debug("Env variables are set to: " + !!process.env.PORT)
    this.app.set("port", process.env.PORT || PORT);
  };

  routes = () => {
    // register routes
    this.app.use("/api/users/", this.usersController.router);
    this.app.get("/", function (req: Request, res: Response) {
      // here we will have logic to return all users
      res.send(new Date().toString());
    });
  };

  middleware = async () => {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(listenMiddleware);
  };

  start = async () => {
    // start database
    await this.db.start();
    // start server
    const PORT = this.app.get("port");
    this.app.listen(PORT, () => {
      log.info("Server listening at port: " + PORT);
    });
  };
}

export default Server;
