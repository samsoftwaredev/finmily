import { Router , Request, Response } from "express";
import { HttpStatusCode, userProps } from "../utils";
import { UsersService } from "../services";


class UsersController {
  public router: Router;
  private usersService: UsersService

  constructor() {
    this.router = Router();
    this.usersService = new UsersService();
    this.routes();
  }

  public index = (req: Request, res: Response) => {
    res.send(this.usersService.index());
  };

  public create = async (req: Request, res: Response) => {
    const props: userProps = req.body;
    try{
      const newUser = await this.usersService.create(props)
      res.status(HttpStatusCode.OK).send(newUser);
    } catch (error) {
      res.status(error.httpCode).json({
        name: error.name,
        message: error.message
      })
    }
  };

  public update = (req: Request, res: Response) => {
    res.send(this.usersService.update());
  };
  public delete = (req: Request, res: Response) => {
    res.send(this.usersService.delete());
  };

  public routes = () => {
    this.router.get("/", this.index);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  };
}

export default UsersController;
