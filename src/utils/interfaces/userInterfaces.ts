import { GenderEnum, UserRoleEnum } from '../enum';
import { EmailType, UserNameType, UUIDType } from './global';

export interface userProps {
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
}

export interface userRequiredProps extends userProps {
  email: EmailType;
  first_name: UserNameType;
  last_name: UserNameType;
}
