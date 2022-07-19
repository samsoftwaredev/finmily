import { GenderEnum, UserRoleEnum } from '../enum';
import { EmailType, UserNameType, UUIDType } from './global';

export interface userOptionalProps {
  id?: UUIDType;
  email?: EmailType;
  first_name?: UserNameType;
  last_name?: UserNameType;
  middle_name?: UserNameType;
  gender?: GenderEnum;
  dob?: Date;
  blocked_at?: Date;
  deactivated_at?: Date;
  last_login?: Date;
  is_online?: boolean;
  phone_number?: string;
  country_code?: string;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  is_2fa_enabled?: boolean;
  role?: UserRoleEnum;
  created_at?: Date;
  deleted_at?: Date;
  updated_at?: Date;
  // TODO: find a better way to do this
  user_household?: any[];
  userHousehold_visibility?: any[];
  household?: any[];
  invited_by?: any[];
  address?: any[];
  reported_by?: any[];
  user_id_reported?: any[];
  user_id_invited?: any;
}

export interface userProps {
  id: UUIDType;
  email: EmailType;
  first_name: UserNameType;
  last_name: UserNameType;
  middle_name: UserNameType;
  gender: GenderEnum;
  dob: Date;
  blocked_at: Date;
  deactivated_at: Date;
  last_login: Date;
  is_online: boolean;
  phone_number: string;
  country_code: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_2fa_enabled: boolean;
  role: UserRoleEnum;
  created_at: Date;
  deleted_at: Date;
  updated_at: Date;
  // TODO: find a better way to do this
  user_household: any[];
  user_household_visibility: any[];
  household: any[];
  invited_by: any[];
  address: any[];
  reported_by: any[];
  user_id_reported: any[];
  user_id_invited: any;
}
export interface userRequiredProps extends userOptionalProps {
  email: EmailType;
  first_name: UserNameType;
  last_name: UserNameType;
}
