import { createUserProps } from "utils";

class UsersService {
  constructor() {}
  
  public index = () => {
    return "index";
  };

  public create = (props: createUserProps)=> {
    const {email, first_name, last_name} = props;
    return "create" + email + first_name + last_name;
  };

  public update = () => {
    return "update";
  };

  public delete = () => {
    return "delete";
  };
}

export default UsersService;
