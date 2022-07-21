import { DescriptionType, HouseholdNameType, UUIDType } from './global';

export interface householdOptionalProps {
  id?: UUIDType;
  name?: HouseholdNameType;
  description?: DescriptionType;
  picture?: string;
  blocked_at?: Date;
  deactivated_at?: Date;
  created_at?: Date;
  deleted_at?: Date;
  updated_at?: Date;
  user?: any;
  user_household?: any[];
  user_household_visibility?: any[];
  household_event?: any[];
  household_history?: any;
}

export interface householdProps extends householdOptionalProps {
  id: UUIDType;
  name: HouseholdNameType;
  description: DescriptionType;
  picture: string;
  blocked_at: Date;
  deactivated_at: Date;
  created_at: Date;
  deleted_at: Date;
  updated_at: Date;
  user: any;
  user_household: any[];
  user_household_visibility: any[];
  household_event: any[];
  household_history: any;
}
export interface householdRequiredProps extends householdOptionalProps {
  name: HouseholdNameType;
}
