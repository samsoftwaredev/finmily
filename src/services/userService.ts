import { Database } from "../config";
import { UserModel } from "../models";
import { HTTP500Error, log, userProps } from "../utils";

class UserService {
  constructor() {}

  public index = () => {
    return "index";
  };

  public create = async (props: userProps) => {
    const { email, first_name, last_name } = props;
    try {
      const newUser = Database.getManager().create(UserModel, {
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

export default UserService;
