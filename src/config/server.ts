import express, { Request, Response } from "express";

// create and setup express app
class Server {
  app = express.application;

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
    this.middleware();
  }

  configuration = () => {
    this.app.set("port", process.env.PORT || 3030);
  };

  routes = () => {
    // register routes
    this.app.get("/", function (req: Request, res: Response) {
      // here we will have logic to return all users
      res.send(new Date().toString());
    });
  };

  middleware = () => {
    this.app.use(express.json());
  }

  start = () => {
    // used to start the server
    const PORT = this.app.get("port");
    this.app.listen(PORT, () => {
      console.log("Server listening in port:" + PORT);
    });
  };
}

export default Server;
