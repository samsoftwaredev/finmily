import { HouseholdNameType, UUIDType } from './global';

export interface householdProps {
  id?: UUIDType;
  name?: HouseholdNameType;
  created_by?: UUIDType;
  description?: string;
  picture?: string;
  blocked_at?: Date;
  deactivated_at?: Date;
  created_at?: Date;
  deleted_at?: Date;
  updated_at?: Date;
}
export interface householdRequiredProps extends householdProps {
  name: HouseholdNameType;
  created_by: UUIDType;
}
