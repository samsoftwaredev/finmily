import { Router , Request, Response } from "express";
import { HttpStatusCode, userProps } from "../utils";
import { UserService } from "../services";


class UsersController {
  public router: Router;
  private UserService: UserService

  constructor() {
    this.router = Router();
    this.UserService = new UserService();
    this.routes();
  }

  public index = (req: Request, res: Response) => {
    res.send(this.UserService.index());
  };

  public create = async (req: Request, res: Response) => {
    const props: userProps = req.body;
    // try{
      const newUser = await this.UserService.create(props)
      res.status(HttpStatusCode.OK).send(newUser);
    // } catch (error) {
    //   res.status(error.httpCode).json({
    //     name: error.name,
    //     message: error.message
    //   })
    // }
  };

  public update = (req: Request, res: Response) => {
    res.send(this.UserService.update());
  };
  public delete = (req: Request, res: Response) => {
    res.send(this.UserService.delete());
  };

  public routes = () => {
    this.router.get("/", this.index);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  };
}

export default UsersController;
