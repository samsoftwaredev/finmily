import { HouseholdService } from '../services';
import { householdRequiredProps } from '../utils';

const householdService = new HouseholdService();
const createHousehold = async (
  householdData: householdRequiredProps = {
    name: 'Adams Family',
    description: 'This is a short description of the household',
    user: null,
  },
) => await householdService.create(householdData);

const deleteHousehold = async (householdId: string) =>
  await householdService.delete(householdId);

export { createHousehold, deleteHousehold };
