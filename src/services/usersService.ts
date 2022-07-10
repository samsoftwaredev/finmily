import { UserModel } from "../models";
import { log, userProps, HTTP500Error } from "../utils";

class UsersService {
  constructor() {}

  public index = () => {
    return "index";
  };

  public create = async (props: userProps) => {
    const { email, first_name, last_name } = props;
    try {
      const newUser = UserModel.create({
        email: email,
        first_name: first_name,
        last_name: last_name,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error("Unable to create user in database")
    }
  };

  public update = () => {
    return "update";
  };

  public delete = () => {
    return "delete";
  };
}

export default UsersService;
