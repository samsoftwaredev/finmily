import { Router, Request, Response } from "express";
import {  HttpStatusCode, userProps } from "../utils";
import { UserService } from "../services";

class UsersController {
  public router: Router;
  private UserService: UserService;

  constructor() {
    this.router = Router();
    this.UserService = new UserService();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const props = req.body;
    this.UserService.index(props);
  };

  public queryOne = async (req: Request, res: Response) => {
    const user_id: string = req.params.id;
    try {
      const user = await this.UserService.queryOne(user_id);
      res.status(HttpStatusCode.OK).send(user);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public create = async (req: Request, res: Response) => {
    const props: userProps = req.body;
    try {
      const newUser = await this.UserService.create(props);
      res.status(HttpStatusCode.OK).send(newUser);
    } catch (error) {
      res.status(error.httpCode).json(error);
    }
  };

  public update = async (req: Request, res: Response) => {
    res.send(this.UserService.update());
  };

  public delete = async (req: Request, res: Response) => {
    res.send(this.UserService.delete());
  };

  public routes = () => {
    this.router.get("/:id", this.queryOne);
    this.router.post("/create-user", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
    this.router.get("/", this.index);
  };
}

export default UsersController;
