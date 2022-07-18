import { ColorSchemeEnum } from '../../utils';
import { UUIDType } from './global';

export interface userHouseholdProps {
  id?: UUIDType;
  is_admin?: boolean;
  looked_at?: Date;
  color?: ColorSchemeEnum;
}
