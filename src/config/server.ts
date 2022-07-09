import { UsersController } from "../controllers";
import express, { Request, Response } from "express";
import Database from "./database";

const PORT = 3030;
// create and setup express app
class Server {
  app = express.application;
  usersController: UsersController
  db: Database

  constructor() {
    this.app = express();
    this.db = new Database();
    this.usersController = new UsersController();
    
    this.configuration();
    this.middleware();
    this.routes();
  }

  configuration = () => {
    this.app.set("port", process.env.PORT || PORT);
  };

  routes = () => {
    // register routes
    this.app.use('/api/users/', this.usersController.router)
    this.app.get("/", function (req: Request, res: Response) {
      // here we will have logic to return all users
      res.send(new Date().toString());
    });
  };

  middleware = () => {
    this.app.use(express.json());
  };
  
  start = async () => {
    // used to start the server
    await this.db.start();
    
    const PORT = this.app.get("port");
    this.app.listen(PORT, () => {
      console.log("Server listening in port:" + PORT);
    });
  };
}

export default Server;