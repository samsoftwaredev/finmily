import { Database } from "../config";
import { UserModel } from "../models";
import { HTTP500Error, log, userProps } from "../utils";

class UserService {
  constructor() {}

  public index = async (props) => {};

  public queryOne = async (user_id: string) => {
    log.info("Searching for user_id: " + user_id);
    try {
      const user = await Database.getManager().findBy(UserModel, {
        id: user_id,
      });
      const firstRes = user[0];
      log.info("User found", firstRes);
      return firstRes;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error("Unable to find user in database");
    }
  };

  public create = async (props: userProps) => {
    const { email, first_name, last_name } = props;
    log.info("Adding user to database");
    try {
      const newUser = Database.getManager().create(UserModel, {
        email: email,
        first_name: first_name,
        last_name: last_name,
      });
      log.info("User created", { user_id: newUser.id });
      await newUser.save();
      return newUser;
    } catch (error) {
      log.error(error);
      throw new HTTP500Error("Unable to create user in database");
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
