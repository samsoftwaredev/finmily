import { ColorScheme } from '../../utils';
import { UserHouseholdModel } from '../../models';

// used by create household endpoint
export interface userHouseholdProps {
  is_admin?: boolean;
  looked_at?: Date;
  color?: ColorScheme;
}
// used by update household endpoint
export interface userHouseholdWithIdProps extends UserHouseholdModel {
  id: string;
}
