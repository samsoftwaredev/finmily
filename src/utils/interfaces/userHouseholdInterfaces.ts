import { ColorSchemeEnum } from '../enum';
import { UUIDType } from './global';
import { householdProps } from './householdInterfaces';
import { userProps } from './userInterfaces';

export interface userHouseholdOptionalProps {
  id?: UUIDType;
  is_admin?: boolean;
  looked_at?: Date;
  color?: ColorSchemeEnum;
  user?: userProps;
  household?: householdProps;
}

export interface userHouseholdProps extends userHouseholdOptionalProps {
  id: UUIDType;
  is_admin: boolean;
  looked_at: Date;
  color: ColorSchemeEnum;
  user: userProps;
  household: householdProps;
}

export interface userHouseholdRequiredProps extends userHouseholdOptionalProps {
  user: userProps;
  household: householdProps;
}
