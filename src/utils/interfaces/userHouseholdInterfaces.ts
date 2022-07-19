import { ColorSchemeEnum } from '../../utils';
import { UUIDType } from './global';

export interface userHouseholdOptionalProps {
  id?: UUIDType;
  is_admin?: boolean;
  looked_at?: Date;
  color?: ColorSchemeEnum;
  user?: any;
  household?: any;
}

export interface userHouseholdProps extends userHouseholdOptionalProps {
  id: UUIDType;
  is_admin: boolean;
  looked_at: Date;
  color: ColorSchemeEnum;
  user: any;
  household: any;
}

export interface userHouseholdRequiredProps extends userHouseholdOptionalProps {
  user: any;
  household: any;
}
