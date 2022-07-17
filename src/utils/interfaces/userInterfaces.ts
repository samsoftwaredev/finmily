import { GenderType, UserRoleType } from '../enum';
import { EmailType, UserNameType } from './global';

// used by create user endpoint
export interface userProps {
  email?: EmailType;
  first_name?: UserNameType;
  last_name?: UserNameType;
  middle_name?: UserNameType;
  gender?: GenderType;
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
  role?: UserRoleType;
}

export interface userRequiredProps {
  /**
   * @TJS-format email
   */
  email: EmailType;
  first_name: UserNameType;
  last_name: UserNameType;
}
