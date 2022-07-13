import { UserRoleType } from '../enum';

// used by create user endpoint
export interface userProps {
  email?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  gender?: string;
  dob?: string;
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

// used by update user endpoint
export interface userWithIdProps extends userProps {
  id: string;
}

export interface userNecessaryProps extends userProps {
  email: string;
  first_name: string;
  last_name: string;
}

export interface userListProps extends userProps {
  id: string;
}
[];
