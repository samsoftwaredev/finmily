import { UserHouseholdService } from '../services';
import {
  householdProps,
  userHouseholdRequiredProps,
  userProps,
} from '../utils';
import { createUser } from './user-tests';
import { createHousehold } from './household-tests';

const userHouseholdService = new UserHouseholdService();
const createUserHousehold = async (
  household: householdProps,
  user: userProps,
) => {
  const h: householdProps = household || (await createHousehold());
  const u: userProps = user || (await createUser());
  const data: userHouseholdRequiredProps = { household: h, user: u };
  const res = await userHouseholdService.create(data);
  return res;
};

const deleteUserHousehold = async (
  household: householdProps,
  user: userProps,
) => {
  const h: householdProps = household || (await createHousehold());
  const u: userProps = user || (await createUser());
  const res = await userHouseholdService.delete(h, u);
  return res;
};

export { createUserHousehold, deleteUserHousehold };
